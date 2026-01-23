-- +goose Up
-- Add more gallery items with diverse stock photos for RoweTech services

INSERT INTO gallery_items (title, category, description, image_url, sort_order, is_featured) VALUES
-- Mold Repair
('Injection Mold Repair', 'Mold Repair', 'Complete restoration of damaged injection molds to original specifications', 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80', 13, 1),
('Mold Polishing', 'Mold Repair', 'Mirror finish polishing for improved part quality', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80', 14, 0),
('Mold Welding Repair', 'Mold Repair', 'Precision TIG welding for mold surface restoration', 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80', 15, 0),

-- Custom Fixtures
('Assembly Fixture', 'Fixtures', 'Custom assembly fixtures for production efficiency', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80', 16, 1),
('Welding Fixture', 'Fixtures', 'Precision welding fixtures for consistent part alignment', 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80', 17, 0),
('Inspection Fixture', 'Fixtures', 'Quality control fixtures for dimensional verification', 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80', 18, 0),
('Machining Fixture', 'Fixtures', 'Work-holding fixtures for CNC operations', 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&q=80', 19, 0),

-- EOAT Tooling
('Robot Gripper', 'EOAT', 'Custom end-of-arm gripper for automated handling', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80', 20, 1),
('Vacuum End Effector', 'EOAT', 'Suction cup tooling for sheet material handling', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80', 21, 0),
('Multi-Part Gripper', 'EOAT', 'Complex gripper systems for multiple part pickup', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80', 22, 0),

-- CNC Machining
('5-Axis Machining', 'CNC Machining', 'Complex geometry machining with 5-axis capability', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80', 23, 0),
('Aluminum Machining', 'CNC Machining', 'High-speed machining of aluminum components', 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&q=80', 24, 0),
('Steel Machining', 'CNC Machining', 'Heavy-duty machining of steel and tool steel', 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80', 25, 0),
('Precision Boring', 'CNC Machining', 'Tight tolerance boring operations', 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&q=80', 26, 0),

-- General Manufacturing
('Quality Inspection', 'Quality', 'CMM and dimensional inspection services', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80', 27, 0),
('Surface Finishing', 'Finishing', 'Bead blasting and surface treatment', 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80', 28, 0),
('Assembly Services', 'Assembly', 'Complete mechanical assembly and testing', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80', 29, 0),
('EDM Services', 'EDM', 'Wire and sinker EDM for complex shapes', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', 30, 0);

-- +goose Down
DELETE FROM gallery_items WHERE sort_order >= 13 AND sort_order <= 30;
