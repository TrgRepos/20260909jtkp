# Lab 1 — Scoped Navigation in a Monorepo

**Program:** Cursor AI-Powered Engineering Program - Session 3.1: Monorepo Navigation and MCP Server Integration
**Duration:** 20 minutes
**Preceded by:** Demo D1 - Broad vs. Scoped Navigation (instructor demonstrates this exact sequence first)
**Repo:** `project-forecasting-platform`

---

## Objective

Repeat the instructor's demo yourself: compare a broad `@codebase` question against a scoped, file-referenced question on the same repo, and feel the difference in answer quality and response time. This is the habit the rest of Session 3.1 depends on: open the smallest useful workspace for the task.

## Before You Start

- [ ] You watched Demo D1.
- [ ] You have `project-forecasting-platform` open as a Cursor workspace (root folder open).
- [ ] `npm install` has been run and `npm test` passes (1 skipped, 9 passed).
- [ ] You've skimmed the repo layout in `README.md`.

## Repo Reference

| Path | Purpose |
|---|---|
| `modules/users/` | Users module |
| `modules/profiles/` | Profiles module (contains this session's target defect) |
| `modules/shared/` | Cross-module helpers |

## Steps

1. In **Ask mode**, send this broad prompt exactly as written:

```
    How does postal code validation work in this repo?
```

2. Note how long it takes to respond and how much of the repo it appears to have pulled in (routes, controllers, tests, migrations, unrelated users-module files).

3. Start a **new chat** (don't just keep scrolling - a fresh thread avoids carrying the first answer's context into the second).

4. Send this scoped prompt instead:

```
In modules/profiles/src/validators/profiles.validator.ts, explain how
postal code validation works. Do not modify any files.
```

5. Compare the two answers side by side. The scoped answer should be faster, more specific, and grounded entirely in one file instead of a repo-wide guess.

## Guardrails

- **Ask mode only** - no file edits in this exercise.
- Use a **new chat** for the scoped prompt - don't let the first broad answer bias the second.

## Definition of Done

- [ ] You ran both the broad `@codebase` prompt and the scoped file-referenced prompt.
- [ ] You can explain, in your own words, why the scoped prompt is both cheaper and more accurate.

## Looking Ahead

Lab 2's rules and Lab 5-7's diagnostic workflow all lean on this same discipline - reference the smallest set of files that could plausibly answer the question, and only reach for `@codebase` when you genuinely need a repo-wide search.
