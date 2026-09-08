# Issue #142: EU users cannot save profiles

**Repo:** sample-org/project-forecasting-platform (simulated GitHub/GitLab MCP source)
**Status:** Open
**Labels:** bug, staging, profiles

This file stands in for what an approved GitHub/GitLab MCP server would
return for issue #142. In a live classroom with a real MCP server
configured, point participants at the actual repo issue instead - the
content below is a static, pre-written substitute so the lab still works
without live external accounts.

---

**Reported by:** support-eu-team
**Environment:** staging

## Description

Several EU users report they cannot save their profile. The request
fails with a 400 error and a generic "postalCode is not a valid postal
code" message, even though the postal code they entered is correct for
their country.

## Steps to reproduce

1. Sign in as a GB or DE staging user.
2. Go to Profile → Edit.
3. Enter a real postal code for that country, e.g. `SW1A 1AA` (UK) or
   `10115` (Berlin, DE).
4. Click Save.

## Expected

Profile saves successfully (`201 Created`).

## Actual

`400 Bad Request` - `{ "error": "postalCode is not a valid postal code." }`

## Additional notes from support

- Confirmed this does **not** happen for US users.
- Confirmed the same UK postcode was accepted by the marketing site's
  separate signup form, so the postcode itself is not the problem - it's
  something in this service.
- No related errors in the database logs.

## Triage checklist for this lab

- [ ] Confirm which file the 400 response comes from
- [ ] Confirm whether the database schema itself restricts postal code
      format (see `db/schema.md`, or your MCP Postgres tool)
- [ ] Identify the specific missing validation rule
- [ ] Propose a scoped fix, generate a migration if the schema needs one,
      and add regression tests
- [ ] Review all generated SQL before treating it as applied
