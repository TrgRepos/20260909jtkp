-- 002_create_profiles.sql
-- Staging/local only. No production data is ever loaded through this path.

CREATE TABLE IF NOT EXISTS profiles (
    id            TEXT PRIMARY KEY,
    user_id       TEXT NOT NULL REFERENCES users(id),
    display_name  TEXT NOT NULL,
    country       CHAR(2) NOT NULL,
    postal_code   TEXT NOT NULL,
    bio           TEXT NOT NULL DEFAULT '',
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- NOTE: no format CHECK constraint on postal_code at the DB layer - the
-- product intentionally leaves postal-code *format* validation to the
-- application layer (see modules/profiles/src/validators/profiles.validator.ts),
-- since the correct format depends on `country`. That's exactly the file
-- Lab 3.1 traces the staging bug back to.
