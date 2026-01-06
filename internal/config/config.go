package config

import (
	"log/slog"
	"os"
)

type SiteConfig struct {
	Name           string
	URL            string
	DefaultOGImage string
}

type Config struct {
	DatabaseURL          string
	Port                 string
	Env                  string
	Site                 SiteConfig
	ClerkSecretKey       string
	ClerkPublishableKey  string
}

func Load() *Config {
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

func getEnvOrDefault(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
