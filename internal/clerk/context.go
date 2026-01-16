package clerk

import (
	"context"
	"encoding/base64"
	"strings"

	"rowetech/internal/config"
	"rowetech/internal/ctxkeys"
)

type Config struct {
	PublishableKey string
	Enabled        bool
}

func FromConfig(cfg *config.Config) Config {
	return Config{
		PublishableKey: cfg.ClerkPublishableKey,
		Enabled:        cfg.HasClerk(),
	}
}

func FromCtx(ctx context.Context) Config {
	if cfg, ok := ctx.Value(ctxkeys.ClerkConfig).(Config); ok {
		return cfg
	}
	return Config{}
}

func PublishableKeyFromCtx(ctx context.Context) string {
	return FromCtx(ctx).PublishableKey
}

func EnabledFromCtx(ctx context.Context) bool {
	return FromCtx(ctx).Enabled
}

// FrontendAPIURLFromCtx extracts the Frontend API URL from the publishable key.
// Publishable keys are formatted as pk_test_BASE64$ or pk_live_BASE64$
// where the base64 part decodes to the Frontend API domain.
func FrontendAPIURLFromCtx(ctx context.Context) string {
	pk := FromCtx(ctx).PublishableKey
	return frontendAPIURLFromKey(pk)
}

func frontendAPIURLFromKey(pk string) string {
	if pk == "" {
		return ""
	}
	// Remove pk_test_ or pk_live_ prefix
	parts := strings.Split(pk, "_")
	if len(parts) < 3 {
		return ""
	}
	encoded := parts[2]
	// Decode base64
	decoded, err := base64.RawStdEncoding.DecodeString(encoded)
	if err != nil {
		return ""
	}
	// Remove trailing $ from decoded domain
	domain := strings.TrimSuffix(string(decoded), "$")
	return "https://" + domain
}

// ClerkJSURLFromCtx returns the full Clerk JS CDN URL.
func ClerkJSURLFromCtx(ctx context.Context) string {
	frontendAPI := FrontendAPIURLFromCtx(ctx)
	if frontendAPI == "" {
		return ""
	}
	return frontendAPI + "/npm/@clerk/clerk-js@5/dist/clerk.browser.js"
}
