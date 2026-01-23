-- +goose Up
ALTER TABLE contact_submissions ADD COLUMN newsletter_opt_in INTEGER DEFAULT 0;
ALTER TABLE contact_submissions ADD COLUMN agreed_to_terms INTEGER DEFAULT 0;

-- +goose Down
-- SQLite doesn't support DROP COLUMN in older versions, so we recreate the table
CREATE TABLE contact_submissions_backup AS SELECT id, name, company, email, phone, project_type, message, is_read, created_at FROM contact_submissions;
DROP TABLE contact_submissions;
CREATE TABLE contact_submissions (
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
INSERT INTO contact_submissions SELECT * FROM contact_submissions_backup;
DROP TABLE contact_submissions_backup;
