package handler

import (
	"database/sql"
	"log/slog"
	"net/http"
	"strconv"

	"rowetech/internal/database/models"
	"rowetech/internal/database/sqlc"
	"rowetech/templates/pages"

	"github.com/labstack/echo/v4"
)

// APICreateGalleryItem creates a new gallery item
func (h *Handler) APICreateGalleryItem(c echo.Context) error {
	ctx := c.Request().Context()

	title := c.FormValue("title")
	category := c.FormValue("category")
	imageURL := c.FormValue("image_url")
	description := c.FormValue("description")
	isFeatured := c.FormValue("is_featured") == "1"

	if title == "" || category == "" || imageURL == "" {
		return c.String(http.StatusBadRequest, "Title, category, and image URL are required")
	}

	// Get max sort order
	items, _ := h.db.Queries.ListGalleryItems(ctx)
	maxSortOrder := int64(len(items))

	featuredInt := int64(0)
	if isFeatured {
		featuredInt = 1
	}

	sqlcItem, err := h.db.Queries.CreateGalleryItem(ctx, sqlc.CreateGalleryItemParams{
		Title:       title,
		Category:    category,
		Description: sql.NullString{String: description, Valid: description != ""},
		ImageUrl:    imageURL,
		SortOrder:   sql.NullInt64{Int64: maxSortOrder, Valid: true},
		IsFeatured:  sql.NullInt64{Int64: featuredInt, Valid: true},
	})
	if err != nil {
		slog.Error("failed to create gallery item", "error", err)
		return c.String(http.StatusInternalServerError, "Failed to create item")
	}

	item := models.FromSqlcGalleryItem(sqlcItem)
	return pages.GalleryItemCardPartial(item).Render(ctx, c.Response().Writer)
}

// APIUpdateGalleryItem updates a gallery item
func (h *Handler) APIUpdateGalleryItem(c echo.Context) error {
	ctx := c.Request().Context()

	idStr := c.Param("id")
	itemID, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.String(http.StatusBadRequest, "Invalid ID")
	}

	title := c.FormValue("title")
	category := c.FormValue("category")
	imageURL := c.FormValue("image_url")
	description := c.FormValue("description")
	isFeatured := c.FormValue("is_featured") == "1"

	if title == "" || category == "" || imageURL == "" {
		return c.String(http.StatusBadRequest, "Title, category, and image URL are required")
	}

	// Get existing item for sort order
	existingItem, err := h.db.Queries.GetGalleryItem(ctx, itemID)
	if err != nil {
		return c.String(http.StatusNotFound, "Item not found")
	}

	featuredInt := int64(0)
	if isFeatured {
		featuredInt = 1
	}

	err = h.db.Queries.UpdateGalleryItem(ctx, sqlc.UpdateGalleryItemParams{
		Title:       title,
		Category:    category,
		Description: sql.NullString{String: description, Valid: description != ""},
		ImageUrl:    imageURL,
		SortOrder:   existingItem.SortOrder,
		IsFeatured:  sql.NullInt64{Int64: featuredInt, Valid: true},
		ID:          itemID,
	})
	if err != nil {
		slog.Error("failed to update gallery item", "error", err)
		return c.String(http.StatusInternalServerError, "Failed to update item")
	}

	// Fetch updated item
	sqlcItem, _ := h.db.Queries.GetGalleryItem(ctx, itemID)
	item := models.FromSqlcGalleryItem(sqlcItem)

	return pages.GalleryItemCardPartial(item).Render(ctx, c.Response().Writer)
}

// APIDeleteGalleryItem deletes a gallery item
func (h *Handler) APIDeleteGalleryItem(c echo.Context) error {
	ctx := c.Request().Context()

	idStr := c.Param("id")
	itemID, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.String(http.StatusBadRequest, "Invalid ID")
	}

	err = h.db.Queries.DeleteGalleryItem(ctx, itemID)
	if err != nil {
		slog.Error("failed to delete gallery item", "error", err)
		return c.String(http.StatusInternalServerError, "Failed to delete item")
	}

	return c.String(http.StatusOK, "")
}

// APIMarkContactRead marks a contact as read
func (h *Handler) APIMarkContactRead(c echo.Context) error {
	ctx := c.Request().Context()

	idStr := c.Param("id")
	contactID, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.String(http.StatusBadRequest, "Invalid ID")
	}

	err = h.db.Queries.MarkContactAsRead(ctx, contactID)
	if err != nil {
		slog.Error("failed to mark contact as read", "error", err)
		return c.String(http.StatusInternalServerError, "Failed to update contact")
	}

	// Fetch updated contact
	sqlcContact, err := h.db.Queries.GetContactSubmission(ctx, contactID)
	if err != nil {
		return c.String(http.StatusNotFound, "Contact not found")
	}
	contact := models.FromSqlcContactSubmission(sqlcContact)

	return pages.ContactCardPartial(contact).Render(ctx, c.Response().Writer)
}

// APIMarkContactUnread marks a contact as unread
func (h *Handler) APIMarkContactUnread(c echo.Context) error {
	ctx := c.Request().Context()

	idStr := c.Param("id")
	contactID, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.String(http.StatusBadRequest, "Invalid ID")
	}

	// Use raw SQL since we don't have a specific query for this
	_, err = h.db.Conn.ExecContext(ctx, "UPDATE contact_submissions SET is_read = 0 WHERE id = ?", contactID)
	if err != nil {
		slog.Error("failed to mark contact as unread", "error", err)
		return c.String(http.StatusInternalServerError, "Failed to update contact")
	}

	// Fetch updated contact
	sqlcContact, err := h.db.Queries.GetContactSubmission(ctx, contactID)
	if err != nil {
		return c.String(http.StatusNotFound, "Contact not found")
	}
	contact := models.FromSqlcContactSubmission(sqlcContact)

	return pages.ContactCardPartial(contact).Render(ctx, c.Response().Writer)
}

// APIDeleteContact deletes a contact submission
func (h *Handler) APIDeleteContact(c echo.Context) error {
	ctx := c.Request().Context()

	idStr := c.Param("id")
	contactID, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.String(http.StatusBadRequest, "Invalid ID")
	}

	err = h.db.Queries.DeleteContactSubmission(ctx, contactID)
	if err != nil {
		slog.Error("failed to delete contact", "error", err)
		return c.String(http.StatusInternalServerError, "Failed to delete contact")
	}

	return c.String(http.StatusOK, "")
}

// APIUpdateImageURL updates a page image URL
func (h *Handler) APIUpdateImageURL(c echo.Context) error {
	ctx := c.Request().Context()

	idStr := c.Param("id")
	imageID, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.String(http.StatusBadRequest, "Invalid ID")
	}

	var body struct {
		URL string `json:"url"`
	}
	if err := c.Bind(&body); err != nil {
		return c.String(http.StatusBadRequest, "Invalid request body")
	}

	err = h.db.Queries.UpdatePageImageURL(ctx, sqlc.UpdatePageImageURLParams{
		ImageUrl: body.URL,
		ID:       imageID,
	})
	if err != nil {
		slog.Error("failed to update image URL", "error", err)
		return c.String(http.StatusInternalServerError, "Failed to update image")
	}

	return c.JSON(http.StatusOK, map[string]string{"status": "ok"})
}

// APIUpdateImageAlt updates a page image alt text
func (h *Handler) APIUpdateImageAlt(c echo.Context) error {
	ctx := c.Request().Context()

	idStr := c.Param("id")
	imageID, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.String(http.StatusBadRequest, "Invalid ID")
	}

	var body struct {
		AltText string `json:"alt_text"`
	}
	if err := c.Bind(&body); err != nil {
		return c.String(http.StatusBadRequest, "Invalid request body")
	}

	err = h.db.Queries.UpdatePageImageAlt(ctx, sqlc.UpdatePageImageAltParams{
		AltText: body.AltText,
		ID:      imageID,
	})
	if err != nil {
		slog.Error("failed to update image alt text", "error", err)
		return c.String(http.StatusInternalServerError, "Failed to update image")
	}

	return c.JSON(http.StatusOK, map[string]string{"status": "ok"})
}

// APIUpdateImageSortOrder updates a page image sort order
func (h *Handler) APIUpdateImageSortOrder(c echo.Context) error {
	ctx := c.Request().Context()

	idStr := c.Param("id")
	imageID, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.String(http.StatusBadRequest, "Invalid ID")
	}

	var body struct {
		SortOrder int `json:"sort_order"`
	}
	if err := c.Bind(&body); err != nil {
		return c.String(http.StatusBadRequest, "Invalid request body")
	}

	// Use raw SQL since we don't have a specific query for this
	_, err = h.db.Conn.ExecContext(ctx, "UPDATE page_images SET sort_order = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", body.SortOrder, imageID)
	if err != nil {
		slog.Error("failed to update image sort order", "error", err)
		return c.String(http.StatusInternalServerError, "Failed to update image")
	}

	return c.JSON(http.StatusOK, map[string]string{"status": "ok"})
}

// APIUpdateGallerySortOrder updates a gallery item sort order
func (h *Handler) APIUpdateGallerySortOrder(c echo.Context) error {
	ctx := c.Request().Context()

	idStr := c.Param("id")
	itemID, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		return c.String(http.StatusBadRequest, "Invalid ID")
	}

	var body struct {
		SortOrder int `json:"sort_order"`
	}
	if err := c.Bind(&body); err != nil {
		return c.String(http.StatusBadRequest, "Invalid request body")
	}

	// Use raw SQL since we need to just update sort_order
	_, err = h.db.Conn.ExecContext(ctx, "UPDATE gallery_items SET sort_order = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", body.SortOrder, itemID)
	if err != nil {
		slog.Error("failed to update gallery sort order", "error", err)
		return c.String(http.StatusInternalServerError, "Failed to update sort order")
	}

	return c.JSON(http.StatusOK, map[string]string{"status": "ok"})
}
