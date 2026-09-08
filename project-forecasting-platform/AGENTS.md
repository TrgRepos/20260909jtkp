# AGENTS.md - project-forecasting-platform

- This is a monorepo with two modules: `modules/users` and
  `modules/profiles`, plus `modules/shared`. Respect the boundaries in
  `.cursor/rules/*.mdc` - do not import across module `src/` folders
  directly.
- No fake or real production data in any file, including tests and
  migrations. Sample data is synthetic only.
- No new dependencies beyond what's already in `package.json` unless
  explicitly requested.
- Prefer the smallest useful workspace for a task: reference specific
  files/folders instead of a broad, unscoped question when the task is
  scoped to one module.
- Database changes go in `db/migrations/` as a new, sequentially
  numbered `.sql` file. Never edit a previously-applied migration file.
- All terminal command execution during training should use
  sandboxed or approval-required execution - never Cursor's fully
  unrestricted auto-run execution (the mode long nicknamed "YOLO
  mode"; current Cursor settings label the equivalent tier "Auto-run"
  or "Run Everything").
