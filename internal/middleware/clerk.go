package middleware

import (
	"context"
	"crypto/rsa"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"log/slog"
	"math/big"
	"net/http"
	"strings"
	"sync"
	"time"

	"rowetech/internal/config"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

const clerkJWKSURL = "https://api.clerk.com/v1/jwks"

type jwksCache struct {
	mu        sync.Mutex
	keys      map[string]*rsa.PublicKey
	fetchedAt time.Time
}

var clerkJWKS jwksCache

func RequireAdminAccess(cfg *config.Config) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			if !cfg.HasClerk() {
				return next(c)
			}

			token, ok := sessionToken(c)
			if !ok {
				return c.Redirect(http.StatusFound, "/sign-in")
			}

			claims, err := verifyClerkSessionToken(c.Request().Context(), token)
			if err != nil {
				slog.Warn("clerk session verification failed", "error", err)
				return c.Redirect(http.StatusFound, "/sign-in")
			}

			if len(cfg.AdminEmails) == 0 {
				return next(c)
			}

			userEmail, err := fetchClerkUserEmail(c.Request().Context(), cfg.ClerkSecretKey, claims.Subject)
			if err != nil {
				slog.Error("failed to fetch clerk user", "error", err)
				return c.Redirect(http.StatusFound, "/unauthorized")
			}

			if !cfg.IsAdminEmail(userEmail) {
				return c.Redirect(http.StatusFound, "/unauthorized")
			}

			return next(c)
		}
	}
}

func sessionToken(c echo.Context) (string, bool) {
	authHeader := c.Request().Header.Get("Authorization")
	if strings.HasPrefix(authHeader, "Bearer ") {
		return strings.TrimSpace(strings.TrimPrefix(authHeader, "Bearer ")), true
	}
	if cookie, err := c.Cookie("__session"); err == nil && cookie.Value != "" {
		return cookie.Value, true
	}
	if cookie, err := c.Cookie("__clerk_db_jwt"); err == nil && cookie.Value != "" {
		return cookie.Value, true
	}
	return "", false
}

func verifyClerkSessionToken(ctx context.Context, token string) (*jwt.RegisteredClaims, error) {
	parser := jwt.NewParser(jwt.WithValidMethods([]string{"RS256"}))
	claims := &jwt.RegisteredClaims{}

	_, err := parser.ParseWithClaims(token, claims, func(t *jwt.Token) (interface{}, error) {
		kid, _ := t.Header["kid"].(string)
		return clerkPublicKey(ctx, kid)
	})
	if err != nil {
		return nil, err
	}

	if err := claims.Valid(); err != nil {
		return nil, err
	}
	if claims.Subject == "" {
		return nil, errors.New("missing subject")
	}

	return claims, nil
}

func clerkPublicKey(ctx context.Context, kid string) (*rsa.PublicKey, error) {
	if kid == "" {
		return nil, errors.New("missing key id")
	}

	clerkJWKS.mu.Lock()
	defer clerkJWKS.mu.Unlock()

	if clerkJWKS.keys != nil && time.Since(clerkJWKS.fetchedAt) < 12*time.Hour {
		if key, ok := clerkJWKS.keys[kid]; ok {
			return key, nil
		}
	}

	keys, err := fetchClerkJWKS(ctx)
	if err != nil {
		return nil, err
	}
	clerkJWKS.keys = keys
	clerkJWKS.fetchedAt = time.Now()

	key, ok := keys[kid]
	if !ok {
		return nil, fmt.Errorf("clerk jwk not found for kid %s", kid)
	}
	return key, nil
}

type clerkJWK struct {
	Kid string `json:"kid"`
	Kty string `json:"kty"`
	Alg string `json:"alg"`
	Use string `json:"use"`
	N   string `json:"n"`
	E   string `json:"e"`
}

type clerkJWKSResponse struct {
	Keys []clerkJWK `json:"keys"`
}

func fetchClerkJWKS(ctx context.Context) (map[string]*rsa.PublicKey, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, clerkJWKSURL, nil)
	if err != nil {
		return nil, err
	}
	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return nil, fmt.Errorf("clerk jwks fetch failed: %s", resp.Status)
	}

	var jwks clerkJWKSResponse
	if err := json.NewDecoder(resp.Body).Decode(&jwks); err != nil {
		return nil, err
	}

	keys := make(map[string]*rsa.PublicKey, len(jwks.Keys))
	for _, jwk := range jwks.Keys {
		if jwk.Kty != "RSA" || jwk.N == "" || jwk.E == "" || jwk.Kid == "" {
			continue
		}
		pub, err := jwkToPublicKey(jwk.N, jwk.E)
		if err != nil {
			continue
		}
		keys[jwk.Kid] = pub
	}
	if len(keys) == 0 {
		return nil, errors.New("no valid clerk jwk keys found")
	}
	return keys, nil
}

func jwkToPublicKey(n, e string) (*rsa.PublicKey, error) {
	nb, err := base64.RawURLEncoding.DecodeString(n)
	if err != nil {
		return nil, err
	}
	eb, err := base64.RawURLEncoding.DecodeString(e)
	if err != nil {
		return nil, err
	}
	eInt := 0
	for _, b := range eb {
		eInt = eInt<<8 + int(b)
	}
	if eInt == 0 {
		return nil, errors.New("invalid exponent")
	}
	return &rsa.PublicKey{
		N: new(big.Int).SetBytes(nb),
		E: eInt,
	}, nil
}

type clerkUserResponse struct {
	ID                    string `json:"id"`
	PrimaryEmailAddressID string `json:"primary_email_address_id"`
	EmailAddresses        []struct {
		ID           string `json:"id"`
		EmailAddress string `json:"email_address"`
	} `json:"email_addresses"`
}

func fetchClerkUserEmail(ctx context.Context, secretKey, userID string) (string, error) {
	if secretKey == "" || userID == "" {
		return "", errors.New("missing clerk credentials")
	}

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, fmt.Sprintf("https://api.clerk.com/v1/users/%s", userID), nil)
	if err != nil {
		return "", err
	}
	req.Header.Set("Authorization", "Bearer "+secretKey)

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return "", fmt.Errorf("clerk user fetch failed: %s", resp.Status)
	}

	var user clerkUserResponse
	if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
		return "", err
	}

	for _, addr := range user.EmailAddresses {
		if addr.ID == user.PrimaryEmailAddressID {
			return addr.EmailAddress, nil
		}
	}
	if len(user.EmailAddresses) > 0 {
		return user.EmailAddresses[0].EmailAddress, nil
	}
	return "", errors.New("no email address found")
}
