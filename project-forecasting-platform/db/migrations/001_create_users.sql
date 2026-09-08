-- 001_create_users.sql
-- Staging/local only. No production data is ever loaded through this path.

CREATE TABLE IF NOT EXISTS users (
    id            TEXT PRIMARY KEY,
    email         TEXT NOT NULL UNIQUE,
    full_name     TEXT NOT NULL,
    country       CHAR(2) NOT NULL,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
