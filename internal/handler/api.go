package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type ContactRequest struct {
	Name        string `json:"name"`
	Company     string `json:"company"`
	Email       string `json:"email"`
	Phone       string `json:"phone"`
	ProjectType string `json:"projectType"`
	Message     string `json:"message"`
}

func (h *Handler) APIContactSubmit(c echo.Context) error {
	var req ContactRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
	}

	if req.Name == "" || req.Email == "" || req.Message == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Missing required fields"})
	}

	// TODO: Save to database once sqlc is generated
	_ = req

	return c.JSON(http.StatusOK, map[string]string{"status": "success"})
}

func (h *Handler) APIListGallery(c echo.Context) error {
	ctx := c.Request().Context()

	items, err := h.db.Queries.ListGalleryItems(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to load gallery"})
	}

	return c.JSON(http.StatusOK, items)
}
