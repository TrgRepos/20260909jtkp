# Lab 7 — Verification, Migration Review & Combined Diff

**Program:** Cursor AI-Powered Engineering Program - Session 3.1: Monorepo Navigation and MCP Server Integration
**Duration:** 45 minutes
**Preceded by:** Demo D7 - Reviewing a Diff and Migration Like a Pull Request (instructor demonstrates this exact sequence first)
**Repo:** `project-forecasting-platform`

---

## Objective

Close the loop on issue #142 the way a real pull request would be closed: review any proposed SQL line by line, review the combined diff across every changed file as a whole, and have a partner review your work against the same checklist the instructor just demonstrated.

## Before You Start

- [ ] You watched Demo D7.
- [ ] You have completed Lab 6 - `npm test` passes with 0 skipped tests.

## Step 1 - Review Any Generated SQL

If Plan mode or Agent proposed any `.sql` file in `db/migrations/` during Lab 6, read every line before considering it "applied." This repo's migrations are plain files, not auto-run - review is a hard gate, exactly like reviewing a diff. If nothing was proposed, write one sentence confirming why no migration was needed, citing Lab 5's schema finding.

## Step 2 - Review the Combined Diff Yourself

Review every file your fix touched, as a whole, as if approving a pull request:

- `modules/profiles/src/validators/profiles.validator.ts`
- `modules/profiles/tests/profiles.test.ts`
- Any migration file, if one was genuinely justified

Confirm every changed line traces back to issue #142 - nothing "while I was in there."

## Step 3 - Score Your Own Diff Against the Checklist

Using the table below (the same one from Demo D7), write a one-line verdict for your own diff:

| Reject This Diff | Approve This Diff |
|---|---|
| Touches a file outside the ones you referenced | Touches only the files you named |
| "While I was in there" changes you never requested | Every changed line traces to your explicit request |
| Silent behavior changes hiding next to the actual fix | No silent or unrelated behavior changes |
| You genuinely cannot explain one of the changed lines | You could defend every line to a human reviewer |

## Step 4 - Peer Review

Swap screens with a partner:

1. Show them your combined diff without narrating it first.
2. Ask them to independently score it against the same checklist.
3. Compare notes - did they flag anything you missed?

## Guardrails

- Any proposed SQL is **reviewed, never blindly applied**.
- Peer review in Step 4 is read-only - your partner scores your diff, they don't edit it.
- If your own Step 3 score comes back "reject," fix it before moving on - don't let a self-identified problem slide because tests are green.

## Definition of Done

- [ ] Any proposed SQL was reviewed line by line, or you confirmed in writing why none was needed.
- [ ] You reviewed your own combined diff against the four-point checklist.
- [ ] A partner independently reviewed your diff and you compared notes.
- [ ] `npm test` still passes with 0 skipped tests after this review pass.

## Optional Stretch: A Second Seeded Issue

If you finish early, ask your instructor for a second, fresh seeded issue in a throwaway clone, and repeat the full Lab 4 → Lab 7 loop (MCP context → investigation → plan → fix → review) end to end. Compare how much faster the second pass felt.

## Looking Ahead

This is the last lab of Session 3.1. Session 3.2 builds directly on your fixed repo: you'll add sandboxed terminal execution guardrails, a reusable security-review Skill, a Subagent, a Hook, and Bugbot configuration on top of the same monorepo.
