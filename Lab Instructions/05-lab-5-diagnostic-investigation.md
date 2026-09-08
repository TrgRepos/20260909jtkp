# Lab 5 — Diagnostic Investigation: Issue, Schema & Source

**Program:** Cursor AI-Powered Engineering Program - Session 3.1: Monorepo Navigation and MCP Server Integration
**Duration:** 45 minutes
**Preceded by:** Demo D5 - Diagnosing Issue #142, Part 1 (instructor demonstrates this exact sequence first)
**Repo:** `project-forecasting-platform`

---

## Objective

Investigate the simulated staging issue in `ISSUE.md` by combining issue context, database schema, and source files - narrowing the search down to a single concrete, reproduced failure, without proposing any fix yet. Lab 6 tomorrow picks up exactly where this lab leaves off.

## Before You Start

- [ ] You watched Demo D5.
- [ ] You have completed Lab 4 (MCP sanity-check queries).
- [ ] `npm test` currently shows **1 skipped, 9 passed** - do not touch the skipped test until Step 4.

## Step 1 - Gather Issue Context

In **Ask mode**, using either the `sample-github` MCP tool or `ISSUE.md`:

```
Summarize issue #142. What's the exact reported symptom, and what has
support already ruled out? Do not modify any files.
```

Confirm your summary matches: 400 error, generic postal code message, US users unaffected, the same UK postcode accepted elsewhere.

## Step 2 - Gather Schema Context

In **Ask mode**, using either the `staging-postgres` MCP tool or `db/schema.md`:

```
Does the profiles table enforce any format constraint on postal_code at
the database level? Do not modify anything.
```

A correct answer should say no - there's no format `CHECK` constraint, which narrows the search to the application layer.

## Step 3 - Locate the Application-Layer Cause

In **Ask mode**, scoped to the relevant file:

```
In modules/profiles/src/validators/profiles.validator.ts, does postal
code validation account for the profile's country? Do not modify any
files.
```

This should surface that a single US ZIP regex is applied regardless of `country`.

## Step 4 - Confirm With the Skipped Test

Temporarily remove `.skip` from the GB postcode test in
`modules/profiles/tests/profiles.test.ts` and run:

```bash
npm test
```

Confirm it fails with `Expected: 201, Received: 400` - your own concrete evidence, not just Cursor's explanation. **Leave the test un-skipped** - Lab 6 tomorrow starts from this exact red state.

## Guardrails

- **Read-only credentials only** for both MCP tools throughout this lab.
- **No fix proposals** in this lab - investigation only, right up through reproducing the failure.
- **No fake or sample production data.**

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---|---|---|
| MCP tools unavailable | Local server not authenticated, or network restricted in this environment | Fall back to `db/schema.md` and `ISSUE.md` - the lab works identically |
| Un-skipped test still passes | The `.skip` wasn't actually removed, or you're looking at a different test | Re-check `modules/profiles/tests/profiles.test.ts` for the exact `it.skip(` line from `ISSUE.md`'s repro steps |

## Definition of Done

- [ ] You gathered context from both the issue tracker and the database schema (live MCP tools or static stand-ins).
- [ ] You confirmed the root cause is application-layer, not database-layer.
- [ ] You un-skipped the GB test and watched it fail for real, with the exact `npm test` output saved somewhere you can paste from tomorrow.
- [ ] The repo is left in a **red** state (1 failing test) - that's the correct, expected end state for this lab.

## Looking Ahead

Lab 6, immediately after this, picks up from this exact failing test and takes it through Plan mode and a scoped Agent fix.
