# Staging Database Schema Reference

This mirrors what a real local/staging Postgres MCP server would return
if you queried it directly (`\d users`, `\d profiles`, or an MCP
`describe_table` tool call). It exists so Lab 3.1 works even in
environments where a live sample Postgres instance couldn't be
provisioned - trainers running a live DB should point participants at
the real MCP tool output instead of this file.

Built from `db/migrations/001_create_users.sql` and
`db/migrations/002_create_profiles.sql`.

## Table: users

| Column     | Type          | Constraints                  |
|---|---|---|
| id         | text          | PRIMARY KEY                  |
| email      | text          | NOT NULL, UNIQUE             |
| full_name  | text          | NOT NULL                     |
| country    | char(2)       | NOT NULL                     |
| created_at | timestamptz   | NOT NULL, DEFAULT now()      |

## Table: profiles

| Column        | Type          | Constraints                              |
|---|---|---|
| id            | text          | PRIMARY KEY                              |
| user_id       | text          | NOT NULL, REFERENCES users(id)           |
| display_name  | text          | NOT NULL                                 |
| country       | char(2)       | NOT NULL                                 |
| postal_code   | text          | NOT NULL (no format CHECK - see note)    |
| bio           | text          | NOT NULL, DEFAULT ''                     |
| created_at    | timestamptz   | NOT NULL, DEFAULT now()                  |

**Note on `postal_code`:** there is deliberately no database-level format
constraint, because valid postal-code shape depends on `country` (a US
ZIP is not shaped like a UK postcode or a German PLZ). Format validation
lives in the application layer. This is the detail Lab 3.1 asks
participants to confirm by comparing the schema against the running
application code.
