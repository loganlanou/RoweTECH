-- name: ListAllPageImages :many
SELECT * FROM page_images ORDER BY page_name, sort_order;

-- name: ListPageImagesByPage :many
SELECT * FROM page_images WHERE page_name = ? ORDER BY sort_order;

-- name: GetPageImage :one
SELECT * FROM page_images WHERE id = ? LIMIT 1;

-- name: UpdatePageImageURL :exec
UPDATE page_images SET image_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?;

-- name: UpdatePageImageAlt :exec
UPDATE page_images SET alt_text = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?;
