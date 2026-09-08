# Lab 3 — Installing and Authenticating Approved MCP Servers

**Program:** Cursor AI-Powered Engineering Program - Session 3.1: Monorepo Navigation and MCP Server Integration
**Duration:** 40 minutes
**Preceded by:** Demo D3 - Configuring an MCP Server End to End (instructor demonstrates this exact sequence first)
**Repo:** `project-forecasting-platform`

---

## Objective

Configure two approved local MCP servers - a sample Postgres database and a sample GitHub/GitLab repository - using environment variables for credentials, and confirm Cursor can reach both with least-privilege access.

## Before You Start

- [ ] You watched Demo D3.
- [ ] You have completed Lab 2.
- [ ] You have the org-approved local Postgres staging instance details and a scoped, read-focused GitHub/GitLab personal access token, distributed by your instructor for this training environment only.

## Background: What MCP Actually Grants

Model Context Protocol servers can access external services and execute code on your machine. That means an MCP server is a genuine extension of what Cursor can read and do - not a passive "read-only browser tab." Treat adding one with the same scrutiny as adding a new dependency: verify the source, restrict the credential's scope, and review what tools it exposes before relying on it.

## Step 1 - Copy the MCP Config Template

```bash
cp .cursor/mcp.json.example .cursor/mcp.json
```

`.cursor/mcp.json` should reference environment variables for every credential - never a value typed directly into the file.

## Step 2 - Set Environment Variables

Copy `.env.example` to `.env` and fill in the two values your instructor provided:

```bash
cp .env.example .env
```

```
STAGING_DATABASE_URL=postgres://forecast_readonly:<password>@localhost:5432/project_forecasting_staging
GITHUB_MCP_TOKEN=<scoped read-only PAT>
```

**Never hardcode either value directly into `.cursor/mcp.json`.** Confirm `.env` is excluded by `.cursorignore` before continuing.

## Step 3 - Verify `.cursorignore` Covers the New File

In **Ask mode**:

```
Confirm whether .env is excluded from your context by .cursorignore.
Do not read its contents - just confirm whether the pattern matches.
```

A correct answer confirms exclusion without needing to open the file.

## Step 4 - Install and Authenticate Each Server

Follow your Cursor client's MCP settings UI (or your instructor's live walkthrough) to:
1. Register the `staging-postgres` server from `.cursor/mcp.json`.
2. Register the `sample-github` server from `.cursor/mcp.json`.
3. Confirm both show as connected/authenticated in the MCP settings panel.

## Step 5 - Sanity-Check Each Tool with a Read-Only Query

In **Ask mode** (or Agent, if your instructor's demo used Agent for read-only tool calls), try:

```
Using the staging-postgres MCP tool, list the columns on the profiles
table. Do not modify anything.
```

```
Using the sample-github MCP tool, fetch issue #142 from this repo and
summarize it in 3 sentences.
```

If either MCP server isn't available in your environment, use the static stand-ins instead: `db/schema.md` for the schema, and `ISSUE.md` for the issue - Lab 4 and Lab 5 work identically either way.

## Guardrails

- **Credentials only through environment variables** - never hardcoded in `.cursor/mcp.json`.
- **Read-only / least-privilege credentials only** for this training environment - no write-capable database roles, no PATs with repo-write scope.
- Confirm `.env` is excluded from AI context before moving on.
- Do not commit `.cursor/mcp.json` or `.env` if this repo is later pushed anywhere - both should stay local.

## Definition of Done

- [ ] `.cursor/mcp.json` exists locally, referencing environment variables only.
- [ ] Both MCP servers show as connected (or you've confirmed the static stand-in files as a fallback).
- [ ] You ran one successful read-only query against each source.
- [ ] You verified `.env` is excluded from AI context.

## Looking Ahead

Lab 4 uses both of these tools for the first time on real diagnostic questions. Lab 5 through Lab 7 then combine them with the source code to diagnose and resolve the staging issue in `ISSUE.md`.
