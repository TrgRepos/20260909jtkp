# Lab 4 — MCP Sanity-Check Queries

**Program:** Cursor AI-Powered Engineering Program - Session 3.1: Monorepo Navigation and MCP Server Integration
**Duration:** 30 minutes
**Preceded by:** Demo D4 - Reading Issue and Schema Context Live (instructor demonstrates this exact sequence first)
**Repo:** `project-forecasting-platform`

---

## Objective

Practice reading external context through your newly-configured MCP servers - without proposing a fix yet. This lab is deliberately read-only: it builds the habit of gathering evidence before touching any code, which Lab 5 depends on tomorrow.

## Before You Start

- [ ] You watched Demo D4.
- [ ] You have completed Lab 3 (MCP servers configured, or the static stand-in files confirmed as fallback).
- [ ] You've read `ISSUE.md` in full at least once.

## Step 1 - Query the Schema

In **Ask mode**, using the `staging-postgres` MCP tool (or `db/schema.md` as a fallback):

```
Does the profiles table enforce any format constraint on postal_code at
the database level? Do not modify anything.
```

Write down the answer in one sentence.

## Step 2 - Query the Issue Tracker

In **Ask mode**, using the `sample-github` MCP tool (or `ISSUE.md` as a fallback):

```
Summarize issue #142. What's the exact reported symptom, and what has
support already ruled out? Do not modify any files.
```

Write down the answer in two or three sentences.

## Step 3 - Cross-Check a Claim Against the Real Source

Pick one claim from either answer above (for example: "there's no
format constraint on postal_code") and verify it yourself by opening
the real file - `db/migrations/002_create_profiles.sql` or
`ISSUE.md` directly - rather than trusting the MCP tool's summary at
face value. This is the same "verify a claim against the real files"
discipline from Level 1's structural-breakdown lab, now applied to
external sources instead of just local ones.

## Guardrails

- **Read-only for the entire lab** - zero file edits, zero fix proposals.
- Every prompt should explicitly say "do not modify" where a tool could plausibly write.
- Write your answers down - Lab 5 tomorrow starts from what you found here.

## Definition of Done

- [ ] You have a one-sentence answer to the schema question, backed by an MCP query or `db/schema.md`.
- [ ] You have a two-to-three-sentence summary of issue #142, backed by an MCP query or `ISSUE.md`.
- [ ] You cross-checked at least one claim directly against the real file behind it.

## Looking Ahead

Lab 5 tomorrow is the same two questions, done for real, immediately followed by locating the cause in the source code - this lab is the rehearsal.
