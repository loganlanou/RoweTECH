// Package models provides data types for templates
// These are simplified versions of sqlc types for static rendering
package models

import "rowetech/internal/database/sqlc"

// GalleryItem represents a gallery item for templates
type GalleryItem struct {
	ID          int64  `json:"id"`
	Title       string `json:"title"`
	Category    string `json:"category"`
	Description string `json:"description"`
	ImageUrl    string `json:"image_url"`
	SortOrder   int64  `json:"sort_order"`
	IsFeatured  bool   `json:"is_featured"`
}

// FromSqlcGalleryItems converts sqlc GalleryItems to models GalleryItems
func FromSqlcGalleryItems(items []sqlc.GalleryItem) []GalleryItem {
	result := make([]GalleryItem, len(items))
	for i, item := range items {
		result[i] = GalleryItem{
			ID:          item.ID,
			Title:       item.Title,
			Category:    item.Category,
			Description: item.Description.String,
			ImageUrl:    item.ImageUrl,
			SortOrder:   item.SortOrder.Int64,
			IsFeatured:  item.IsFeatured.Int64 == 1,
		}
	}
	return result
}

// ContactSubmission represents a contact form submission
type ContactSubmission struct {
	ID          int64  `json:"id"`
	Name        string `json:"name"`
	Company     string `json:"company"`
	Email       string `json:"email"`
	Phone       string `json:"phone"`
	ProjectType string `json:"project_type"`
	Message     string `json:"message"`
	IsRead      bool   `json:"is_read"`
	CreatedAt   string `json:"created_at"`
}

// FromSqlcContactSubmissions converts sqlc ContactSubmissions to models ContactSubmissions
func FromSqlcContactSubmissions(items []sqlc.ContactSubmission) []ContactSubmission {
	result := make([]ContactSubmission, len(items))
	for i, item := range items {
		createdAt := ""
		if item.CreatedAt.Valid {
			createdAt = item.CreatedAt.Time.Format("Jan 2, 2006 3:04 PM")
		}
		result[i] = ContactSubmission{
			ID:          item.ID,
			Name:        item.Name,
			Company:     item.Company.String,
			Email:       item.Email,
			Phone:       item.Phone.String,
			ProjectType: item.ProjectType.String,
			Message:     item.Message,
			IsRead:      item.IsRead.Int64 == 1,
			CreatedAt:   createdAt,
		}
	}
	return result
}

// FromSqlcContactSubmission converts a single sqlc ContactSubmission to models ContactSubmission
func FromSqlcContactSubmission(item sqlc.ContactSubmission) ContactSubmission {
	createdAt := ""
	if item.CreatedAt.Valid {
		createdAt = item.CreatedAt.Time.Format("Jan 2, 2006 3:04 PM")
	}
	return ContactSubmission{
		ID:          item.ID,
		Name:        item.Name,
		Company:     item.Company.String,
		Email:       item.Email,
		Phone:       item.Phone.String,
		ProjectType: item.ProjectType.String,
		Message:     item.Message,
		IsRead:      item.IsRead.Int64 == 1,
		CreatedAt:   createdAt,
	}
}

// FromSqlcGalleryItem converts a single sqlc GalleryItem to models GalleryItem
func FromSqlcGalleryItem(item sqlc.GalleryItem) GalleryItem {
	return GalleryItem{
		ID:          item.ID,
		Title:       item.Title,
		Category:    item.Category,
		Description: item.Description.String,
		ImageUrl:    item.ImageUrl,
		SortOrder:   item.SortOrder.Int64,
		IsFeatured:  item.IsFeatured.Int64 == 1,
	}
}

// PageImage represents a page image for templates
type PageImage struct {
	ID        int64  `json:"id"`
	PageName  string `json:"page_name"`
	ImageKey  string `json:"image_key"`
	ImageUrl  string `json:"image_url"`
	Label     string `json:"label"`
	AltText   string `json:"alt_text"`
	SortOrder int64  `json:"sort_order"`
}
