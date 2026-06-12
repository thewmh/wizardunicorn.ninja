# KTLO Tasks

Agent-suitable tech debt and maintenance tasks. Add entries when discovered; remove when resolved.

## ID Convention

Tasks are identified by a durable `KTLO-xxxxxx` ID (six-digit zero-padded integer, e.g. `KTLO-000001`).
IDs are assigned sequentially and are never reused or reassigned, even after a task is resolved.
Include the ID in the task heading.

## Authoring Rules

- **Flat list only.** Do not add section headings, groupings, or separators below the
  `---` line. All task entries are a single unnested list in numerical order.
- **Sequential order.** New entries must be appended at the end of the list in
  sequential numerical order. Never insert an entry mid-list.
- **No additional separators.** The `---` after the header sections is fixed structure.
  Do not add further `---` separators between entries.
- **Resolved entries stay.** Mark resolved entries with `— RESOLVED` in the heading
  and leave them in place. Never delete a KTLO entry.

---

- **KTLO-000001 — Remove unused `NoteCard` import from `notes/[...slug].astro`**
  - **Location:** `astro/src/pages/notes/[...slug].astro` line 2
  - **Nature:** `NoteCard` is imported but never referenced in the template. Flagged by `astro check` (ts(6133)).
  - **Risk:** No runtime impact. Adds noise to type checker output; could mislead a future maintainer who assumes the component is used.
  - **Justification for deferral:** Pre-existing issue, not introduced by Slice 1. Out of scope for the cleanup slice.
  - **Remediation:** Remove the `import NoteCard` line. Re-run `astro check` to confirm clean. Low effort.

- **KTLO-000002 — Migrate `essays` and `notes` collections to explicit Content Layer loaders**
  - **Location:** `astro/src/content.config.ts`
  - **Nature:** `essays` and `notes` use the Astro legacy schema-only pattern (no explicit `loader`); `projects` uses the new Astro 5 Content Layer `glob` loader. Legacy entries expose `slug`; Content Layer entries expose `id`. Creates a per-collection API surface difference.
  - **Risk:** Page code for `projects` cannot be written the same way as essays/notes routing. Risk of confusion in Slice 2 when the `projects` slug page is authored. Divergence grows as more collections are added.
  - **Justification for deferral:** Migrating `essays` and `notes` requires updating all `[...slug].astro` pages to use `id` instead of `slug` and verifying URL continuity — out of scope for Slice 1.
  - **Remediation:** Add explicit `glob` loaders to `essays` and `notes`; update all `essay.slug`/`note.slug` references to `.id` in slug pages and listing pages. Likely a Slice 2 or Phase 2 task.
