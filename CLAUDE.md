# RoweTech Machine & Engineering

A Go web application for RoweTech Machine & Engineering, built with Go + Echo + Templ + HTMX + Tailwind CSS + SQLite.

## Critical Build Error

**ALWAYS** check `./tmp/air-combined.log` after making code changes. This log contains:
- Compilation errors
- Template generation errors
- SQL generation errors

Never assume code changes succeeded without checking this log.

## Development Workflow

`make dev` is always running during development. It automatically:
1. Kills existing process on port
2. Regenerates Templ templates
3. Regenerates sqlc queries
4. Runs go mod tidy
5. Rebuilds and restarts server

**You do NOT need to manually run:** `templ generate`, `sqlc generate`, `go build`, or `air`.

## Environment Setup

All configuration via `.envrc` (copy from `.envrc.example`):

```bash
export DATABASE_URL="./data/rowetech.db"
export PORT="3000"
export ENV="development"
export LOG_LEVEL="DEBUG"
export SITE_NAME="RoweTech Machine & Engineering"
export SITE_URL="http://localhost:3000"
export CLERK_SECRET_KEY="sk_test_..."
export CLERK_PUBLISHABLE_KEY="pk_test_..."
```

## Key Commands

| Command | Description |
|---------|-------------|
| `make dev` | Start with hot reload (main workflow) |
| `make build` | Build production binary |
| `make test` | Run tests with race detection |
| `make lint` | Run linters |
| `make generate` | Generate templ and sqlc code |
| `make css` | Build Tailwind CSS |
| `make css-watch` | Watch Tailwind (separate terminal) |
| `make migrate` | Run database migrations |
| `make setup` | Install development tools |

## Project Structure

```
rowetech/
├── cmd/server/         # Entry point (main.go, slog.go)
├── internal/
│   ├── config/         # Environment configuration
│   ├── ctxkeys/        # Context key types
│   ├── database/       # SQLite + sqlc generated code
│   ├── handler/        # Echo HTTP handlers
│   ├── meta/           # SEO/meta tag helpers
│   └── middleware/     # Echo middleware
├── templates/
│   ├── layouts/        # Base layout, header, footer
│   └── pages/          # Page templates
├── static/
│   ├── css/            # Tailwind input/output
│   ├── js/             # Client-side JavaScript
│   └── images/         # Static images
├── migrations/         # goose SQL migrations
├── sqlc/               # sqlc configuration and queries
├── data/               # SQLite database file
├── Makefile            # Build commands
├── .air.toml           # Hot reload config
└── go.mod              # Go dependencies
```

## Code Patterns

### Logging
Always use `slog`:
```go
slog.Info("message", "key", value)
slog.Error("failed to...", "error", err)
```

Never use `fmt.Printf` or `log.Printf`.

### Error Handling
Wrap errors with context:
```go
if err != nil {
    return fmt.Errorf("failed to load gallery: %w", err)
}
```

### Database Queries
Use sqlc-generated queries:
```go
items, err := h.db.Queries.ListGalleryItems(ctx)
```

### Templates (Templ)
Templates own their meta tags:
```templ
templ Home() {
    @layouts.Base(meta.New("Home", "Description")) {
        // page content
    }
}
```

### HTMX Patterns
Use `hx-*` attributes for dynamic updates:
```html
<div hx-get="/api/gallery" hx-trigger="load" hx-swap="innerHTML">
    Loading...
</div>
```

## Tech Stack

- **Backend**: Go 1.22+ with Echo v4
- **Templates**: Templ (type-safe, compiled)
- **Interactivity**: HTMX 2.0
- **Styling**: Tailwind CSS v4
- **Database**: SQLite with goose migrations + sqlc
- **Auth**: Clerk (optional)
- **Hot Reload**: Air

## First Time Setup

1. Install Go 1.22+
2. Install Node.js (for Tailwind)
3. Run `make setup` to install tools
4. Copy `.envrc.example` to `.envrc` and configure
5. Run `direnv allow` (or source .envrc)
6. Run `make migrate` to set up database
7. Run `make dev` to start development server

## Adding a New Page

1. Create handler in `internal/handler/`
2. Register route in `internal/handler/handler.go`
3. Create template in `templates/pages/`
4. Air will auto-rebuild

## Adding a Database Table

1. Create migration: `make migrate-create NAME=create_tablename`
2. Edit migration file in `migrations/`
3. Add queries in `sqlc/queries/`
4. Run `make migrate`
5. sqlc will regenerate on next build
