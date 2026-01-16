package config

import (
	"log/slog"
	"os"
	"strings"
)

type SiteConfig struct {
	Name           string
	URL            string
	DefaultOGImage string
}

type Config struct {
	DatabaseURL         string
	Port                string
	Env                 string
	Site                SiteConfig
	ClerkSecretKey      string
	ClerkPublishableKey string
	AdminEmails         []string
}

func Load() *Config {
	adminEmails := parseAdminEmails(os.Getenv("ADMIN_EMAILS"))
	if adminEmail := strings.TrimSpace(os.Getenv("ADMIN_EMAIL")); adminEmail != "" {
		adminEmails = append(adminEmails, strings.ToLower(adminEmail))
	}
	if len(adminEmails) == 0 {
		adminEmails = []string{"logan@lanou.com"}
	}

	cfg := &Config{
		DatabaseURL: getEnvOrDefault("DATABASE_URL", "./data/rowetech.db"),
		Port:        getEnvOrDefault("PORT", "3000"),
		Env:         getEnvOrDefault("ENV", "development"),
		Site: SiteConfig{
			Name:           getEnvOrDefault("SITE_NAME", "RoweTech Machine & Engineering"),
			URL:            getEnvOrDefault("SITE_URL", "http://localhost:3000"),
			DefaultOGImage: getEnvOrDefault("DEFAULT_OG_IMAGE", "/static/images/og-default.png"),
		},
		ClerkSecretKey:      os.Getenv("CLERK_SECRET_KEY"),
		ClerkPublishableKey: os.Getenv("CLERK_PUBLISHABLE_KEY"),
		AdminEmails:         adminEmails,
	}

	if cfg.DatabaseURL == "" {
		slog.Error("DATABASE_URL environment variable is required")
		os.Exit(1)
	}

	return cfg
}

func (c *Config) IsDevelopment() bool {
	return c.Env == "development"
}

func (c *Config) IsProduction() bool {
	return c.Env == "production"
}

func (c *Config) HasClerk() bool {
	return c.ClerkSecretKey != "" && c.ClerkPublishableKey != ""
}

func (c *Config) IsAdminEmail(email string) bool {
	if email == "" {
		return false
	}
	email = strings.ToLower(strings.TrimSpace(email))
	for _, allowed := range c.AdminEmails {
		if email == strings.ToLower(strings.TrimSpace(allowed)) {
			return true
		}
	}
	return false
}

func getEnvOrDefault(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func parseAdminEmails(raw string) []string {
	if raw == "" {
		return nil
	}
	parts := strings.Split(raw, ",")
	emails := make([]string, 0, len(parts))
	for _, part := range parts {
		email := strings.ToLower(strings.TrimSpace(part))
		if email != "" {
			emails = append(emails, email)
		}
	}
	return emails
}
