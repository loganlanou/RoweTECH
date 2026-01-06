-- +goose Up
CREATE TABLE IF NOT EXISTS gallery_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    is_featured INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    project_type TEXT,
    message TEXT NOT NULL,
    is_read INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default gallery items
INSERT INTO gallery_items (title, category, description, image_url, sort_order, is_featured) VALUES
('CNC Milling Operation', 'CNC Machining', 'Precision 5-axis CNC milling for complex geometries', 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&q=80', 1, 1),
('Laser Cutting', 'Laser', 'High-precision laser cutting and engraving', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 2, 0),
('Welding & Fabrication', 'Welding', 'Professional TIG and MIG welding services', 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80', 3, 0),
('3D Printing', '3D Printing', 'Rapid prototyping with industrial FDM and SLA', 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&q=80', 4, 0),
('CNC Lathe Work', 'CNC Machining', 'Precision turning for cylindrical components', 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&q=80', 5, 0),
('Plasma Cutting', 'Plasma', 'Heavy-duty plasma cutting for thick materials', 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80', 6, 0),
('Metal Fabrication', 'Welding', 'Custom metal fabrication and assembly', 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80', 7, 0),
('Industrial Automation', 'EOAT', 'End-of-arm tooling for robotics', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80', 8, 0),
('Precision Grinding', 'CNC Machining', 'Surface grinding to tight tolerances', 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80', 9, 0),
('Mold Components', 'Mold Repair', 'Precision mold inserts and components', 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80', 10, 0),
('Laser Engraving', 'Laser', 'Detailed marking and engraving services', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 11, 0),
('Prototyping', '3D Printing', 'Fast turnaround prototype development', 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&q=80', 12, 0);

-- +goose Down
DROP TABLE IF EXISTS gallery_items;
DROP TABLE IF EXISTS contact_submissions;
DROP TABLE IF EXISTS site_settings;
