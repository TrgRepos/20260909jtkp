# Lab 2 — Module-Scoped Rules and Boundary Guardrails

**Program:** Cursor AI-Powered Engineering Program - Session 3.1: Monorepo Navigation and MCP Server Integration
**Duration:** 55 minutes
**Preceded by:** Demo D2 - Provoking and Rejecting a Cross-Module Import (instructor demonstrates this exact sequence first)
**Repo:** `project-forecasting-platform`

---

## Objective

Create module-specific `.cursor/rules/*.mdc` files that stop Agent from generating illegal cross-module imports, then prove they work by deliberately asking for one - the same sequence Demo D2 just showed you.

By the end of this lab you will have:
1. Confirmed the three existing rule files (`users-module-boundary.mdc`, `profiles-module-boundary.mdc`, `shared-module.mdc`) and understood their `globs`.
2. Deliberately provoked an illegal cross-module import request and watched Agent respect (or fail to respect) the boundary.
3. Tightened a rule if it didn't hold, and re-tested.

## Before You Start

- [ ] You watched Demo D2.
- [ ] You have completed Lab 1 (scoped navigation).
- [ ] `.cursor/rules/` already contains the three `.mdc` files shipped with the starter repo - open and read all three before continuing.

## Background: Why Module Boundaries Need Rules, Not Just Discipline

A single engineer can remember "profiles never imports from users directly." An Agent generating code across a 20-module repo cannot, unless that boundary is written down somewhere it will actually read. `.mdc` files with `globs` are how Cursor scopes a rule to only the files it's relevant to - the profiles rule never loads while you're editing users code, and vice versa.

## Step 1 - Read the Existing Rules

Open all three files in `.cursor/rules/`:

- `users-module-boundary.mdc`
- `profiles-module-boundary.mdc`
- `shared-module.mdc`

For each, note: what `globs` pattern scopes it, and what it explicitly forbids.

## Step 2 - Try to Provoke a Violation

In **Agent mode**, with `modules/profiles/src/controllers/profiles.controller.ts` open, send:

```
In modules/profiles/src/controllers/profiles.controller.ts, import the
User type directly from modules/users/src/types/user.types.ts and add a
field to the response that looks up the user's fullName by userId.
```

This is a deliberately non-compliant request - it asks for exactly the cross-module import the rule forbids.

## Step 3 - Evaluate What Came Back

A correctly-behaving Agent, respecting the rule, should do one of:
- Decline the direct import and propose routing through `modules/shared/src/**` instead, or
- Flag that this would require an HTTP call to the users module rather than a source import, or
- Ask you to confirm before adding a cross-module dependency.

If Agent generated the direct import anyway, that's a real, useful finding - not a failure of the lab.

## Step 4 - Reject and Narrow

Whatever came back, **reject the diff**. Then send a follow-up that references the rule explicitly:

```
That violates the profiles module boundary in
.cursor/rules/profiles-module-boundary.mdc. Propose a version that goes
through modules/shared/src instead, or explain why this needs an HTTP
call rather than a shared import.
```

## Step 5 - Strengthen a Rule (If Needed)

If Step 3 showed the rule wasn't being respected, edit
`profiles-module-boundary.mdc` yourself (don't delegate this edit to
Agent) to make the boundary more explicit - for example, naming the
exact forbidden import path pattern. Re-run Step 2 to confirm the
tightened rule holds.

## Guardrails

- **Do not accept** the illegal cross-module import diff in Step 2/3, even to "see what it looks like in the file" - reject it in the UI.
- Rule file edits in Step 5 are made **by hand**, following the pattern from Level 1's Lab 1 of not delegating governance files to the Agent.
- Every request in this lab stays scoped to the profiles module - don't widen to `@codebase`.

## Definition of Done

- [ ] You provoked a cross-module import request and recorded what Agent actually did.
- [ ] You rejected any non-compliant diff.
- [ ] If a rule needed strengthening, you edited it by hand and confirmed the fix.
- [ ] You can explain to a partner why `globs` scoping matters in a repo with many modules.

## Looking Ahead

Lab 3 configures MCP servers so Agent can pull in data outside the repo (a sample Postgres database, a sample GitHub/GitLab repo) - governed by the same review discipline you just practiced on module boundaries.
