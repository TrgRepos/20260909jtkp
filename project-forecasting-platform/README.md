# project-forecasting-platform

Shared starter repo for **Level 3** of the Cursor AI-Powered Engineering
Program (Session 3.1: Monorepo Navigation and MCP Server Integration;
Session 3.2: Autonomous Validation, Custom Tooling, and Enterprise
CI/CD). It's the Level 3 successor to the single-service
`project-forecasting-api` used in Level 1 - same conventions, now split
into modules so the monorepo-scoping and cross-module-boundary lessons
have something real to point at.

## Layout

```
project-forecasting-platform/
├── src/server.ts                 # Express entry point, mounts both modules
├── modules/
│   ├── users/                    # Users module (routes/controllers/validators/data/types/tests)
│   ├── profiles/                 # Profiles module (same shape) - contains the Lab 3.1 defect
│   └── shared/                   # Cross-module HTTP + type helpers only
├── db/
│   ├── migrations/                # Raw, sequentially-numbered SQL migrations
│   └── schema.md                  # Static schema reference for the Postgres MCP lab
├── .cursor/
│   ├── rules/*.mdc                # Module-boundary rules (Lab 3.1)
│   └── mcp.json.example           # MCP server template - copy to mcp.json, fill in env vars
├── AGENTS.md                      # Project-wide agent guidance
├── ISSUE.md                       # Simulated staging issue used in Lab 3.1
├── .cursorignore / .cursorindexingignore   # Carried forward unchanged from Level 1
└── .env.example
```

## Setup

```bash
npm install
cp .env.example .env      # fill in local values; never commit .env
cp .cursor/mcp.json.example .cursor/mcp.json   # fill in env vars for MCP servers
npm test
```

## MCP servers in this repo

`.cursor/mcp.json.example` defines two servers, using Cursor's `${env:NAME}`
config interpolation so no credential is ever written into the file itself:

- **staging-postgres** - a read-only connection to the local/staging
  Postgres instance for this project. Never point this at a production
  connection string.
- **sample-github** - the approved GitHub MCP server for the sample repo
  used starting in Lab 4. The token should be a scoped, read-focused personal
  access token stored outside version control (in `.env`, never
  committed).

`npm test` should pass cleanly out of the box (one test is intentionally
`.skip`ped - see `modules/profiles/tests/profiles.test.ts` - that's the
regression test Lab 3.1 activates and turns green).

## Known starting-state defect (by design)

`modules/profiles/src/validators/profiles.validator.ts` validates every
postal code with a US-only ZIP regex regardless of the profile's
`country`. This is the root cause behind `ISSUE.md` ("EU users cannot
save profiles") and is what Lab 3.1's multi-tool diagnostic workflow is
built to find and fix. Do not fix it before the lab - the starter state
should stay as-is.

## No real data, ever

All sample rows in `modules/*/src/data/*.ts` are synthetic. Never paste
real customer, user, or production data into any exercise using this
repo.
