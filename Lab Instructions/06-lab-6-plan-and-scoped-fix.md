# Lab 6 — Plan & Scoped Agent Fix

**Program:** Cursor AI-Powered Engineering Program - Session 3.1: Monorepo Navigation and MCP Server Integration
**Duration:** 75 minutes
**Preceded by:** Demo D6 - Diagnosing Issue #142, Part 2 (Plan & Agent) (instructor demonstrates this exact sequence first)
**Repo:** `project-forecasting-platform`

---

## Objective

Take the failing test from Lab 5 through Plan mode and a scoped, reviewed Agent fix - one small step at a time, exactly like Level 1's Ask → Plan → Agent loop, now applied to a real cross-source diagnosis.

## Before You Start

- [ ] You watched Demo D6.
- [ ] You have completed Lab 5 and the repo is currently **red**: the GB postcode test in `modules/profiles/tests/profiles.test.ts` is un-skipped and failing with `Expected: 201, Received: 400`.
- [ ] You have your exact `npm test` failure output from the end of Lab 5 saved somewhere you can paste from.

## Step 1 - Plan the Fix

Switch to **Plan mode**:

```
Plan a fix for issue #142 (EU users cannot save profiles). Limit the
plan to modules/profiles/src/validators/profiles.validator.ts and
modules/profiles/tests/profiles.test.ts. Only propose a database
migration if the schema genuinely requires a change - state explicitly
whether one is needed. Do not add new dependencies. Propose first,
don't execute.
```

Read the plan. It should conclude no schema change is strictly required (per Lab 5's schema investigation) - flag it if the plan invents one anyway.

## Step 2 - Implement in Agent Mode, One Scoped Step at a Time

**Step 2a - Validator fix:**

```
In modules/profiles/src/validators/profiles.validator.ts, make postal
code validation depend on the profile's country. Support at least US,
GB, and DE with real patterns, and fall back to a reasonable generic
check for any other country. Don't touch any other file.
```

Review the diff before continuing.

**Step 2b - Tests:**

```
In modules/profiles/tests/profiles.test.ts, add a DE case and a
negative case confirming a malformed GB postcode is still rejected,
alongside the GB test you already un-skipped in Lab 5. Don't touch any
other file.
```

Review the diff.

## Step 3 - Run the Suite

```bash
npm test
```

Expect all tests passing, including the new EU cases (12 total, 0 skipped, in the reference solution).

## Guardrails

- **One file / one concern per Agent request**, exactly like Level 1's Session 1.1.
- **No fake or sample production data.**
- If Plan mode proposes a schema change, you must be able to explain *why* it's needed given Lab 5's finding - "the plan included it" is not a justification on its own.

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---|---|---|
| GB test still fails after Step 2a | The validator wasn't updated to read `country`, or the GB pattern is too strict | Re-check the diff against Step 2a's request; confirm `country` is passed into the validation function |
| Plan proposes a migration you can't justify | Over-broad plan invented scope, same lesson as Level 1's Lab 2B | Reject/narrow the plan; re-propose limited to the two files named in Step 1 |

## Definition of Done

- [ ] The validator fix accounts for `country` and was requested as its own scoped step.
- [ ] `npm test` passes with 0 skipped tests.
- [ ] You can explain, file by file, what changed and why.

## Looking Ahead

Lab 7, immediately after this, reviews any proposed SQL and the combined diff as a whole - the final gate before this fix would be considered ready for a pull request.
