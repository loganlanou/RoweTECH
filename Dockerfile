# Build stage
FROM golang:1.23-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache git nodejs npm

# Copy go mod files
COPY go.mod go.sum ./
RUN go mod download

# Install templ
RUN go install github.com/a-h/templ/cmd/templ@latest

# Copy source code
COPY . .

# Generate templ files
RUN templ generate

# Build CSS
RUN npm install && npm run css

# Build the Go binary
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/server ./cmd/server

# Runtime stage
FROM alpine:latest

WORKDIR /app

# Install ca-certificates for HTTPS
RUN apk --no-cache add ca-certificates

# Copy binary and static files
COPY --from=builder /app/server .
COPY --from=builder /app/static ./static
COPY --from=builder /app/migrations ./migrations

# Create data directory
RUN mkdir -p /app/data

# Expose port
EXPOSE 3000

# Set environment variables
ENV PORT=3000
ENV ENV=production
ENV DATABASE_URL=/app/data/rowetech.db

# Run the server
CMD ["./server"]
