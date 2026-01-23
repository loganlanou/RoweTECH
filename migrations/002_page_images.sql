-- +goose Up
CREATE TABLE IF NOT EXISTS page_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    page_name TEXT NOT NULL,
    image_key TEXT NOT NULL,
    image_url TEXT NOT NULL,
    label TEXT NOT NULL,
    alt_text TEXT NOT NULL,
    is_uploaded INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(page_name, image_key)
);

-- Create index for faster lookups by page
CREATE INDEX idx_page_images_page_name ON page_images(page_name);

-- Seed data: Home page (8 images)
INSERT INTO page_images (page_name, image_key, image_url, label, alt_text, sort_order) VALUES
('home', 'hero', 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80', 'Hero Background', 'Industrial manufacturing', 1),
('home', 'service-mold-repair', 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80', 'Mold Repair Service', 'Mold repair and maintenance', 2),
('home', 'service-fixtures', 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80', 'Custom Fixtures Service', 'Custom fixtures and tooling', 3),
('home', 'service-eoat', 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80', 'EOAT Service', 'End-of-arm tooling', 4),
('home', 'service-cnc', 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80', 'CNC Machining Service', 'CNC machining equipment', 5),
('home', 'why-us-1', 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80', 'Why Choose Us Image 1', 'CNC Machining', 6),
('home', 'why-us-2', 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80', 'Why Choose Us Image 2', 'Manufacturing', 7),
('home', 'cta', 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80', 'CTA Background', 'Industrial background', 8);

-- Seed data: About page (2 images)
INSERT INTO page_images (page_name, image_key, image_url, label, alt_text, sort_order) VALUES
('about', 'hero', 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&q=80', 'Hero Background', 'Manufacturing', 1),
('about', 'story', 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80', 'Our Story Image', 'CNC Workshop', 2);

-- Seed data: Services page (5 images)
INSERT INTO page_images (page_name, image_key, image_url, label, alt_text, sort_order) VALUES
('services', 'hero', 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80', 'Hero Background', 'CNC Machining', 1),
('services', 'mold-repair', 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80', 'Mold Repair Section', 'Plastic Injection Mold Repair', 2),
('services', 'fixtures', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80', 'Fixtures Section', 'Custom Fixtures and Tooling', 3),
('services', 'eoat', 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80', 'EOAT Section', 'EOAT Manufacturing', 4),
('services', 'cnc', 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80', 'CNC Section', 'CNC Machining Services', 5);

-- Seed data: Capabilities page (1 image)
INSERT INTO page_images (page_name, image_key, image_url, label, alt_text, sort_order) VALUES
('capabilities', 'hero', 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1920&q=80', 'Hero Background', 'CNC Equipment', 1);

-- Seed data: Gallery page (1 image)
INSERT INTO page_images (page_name, image_key, image_url, label, alt_text, sort_order) VALUES
('gallery', 'hero', 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80', 'Hero Background', 'Workshop', 1);

-- Seed data: Contact page (1 image)
INSERT INTO page_images (page_name, image_key, image_url, label, alt_text, sort_order) VALUES
('contact', 'hero', 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&q=80', 'Hero Background', 'Manufacturing', 1);

-- +goose Down
DROP INDEX IF EXISTS idx_page_images_page_name;
DROP TABLE IF EXISTS page_images;
