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

- **KTLO-000003 — Content-entry body for `recipe-calculator` and `la-croix` is never rendered**
  - **Location:** `astro/src/content/projects/recipe-calculator.md`, `astro/src/content/projects/la-croix.md`, `astro/src/pages/projects/[slug].astro`
  - **Nature:** `[slug].astro` generates routes for both collection entries, but those routes are shadowed by the higher-priority static pages `projects/recipe-calculator/index.astro` and `projects/la-croix/index.astro`. The markdown body content in each entry is therefore never surfaced to visitors.
  - **Risk:** No runtime impact. Future maintainers adding body content to those entries will see no change on the live site and may be confused.
  - **Justification for deferral:** The static interactive pages (React islands) intentionally serve the project detail routes for now. Merging the interactive island and the content entry into a single `[slug].astro` page is a design decision deferred to a future migration slice.
  - **Remediation:** Either (a) embed the React island components inside `[slug].astro` on a per-project basis and remove the static pages, or (b) keep the static pages and accept that the collection body is metadata-only. Decide in Slice 3.

- **KTLO-000004 — No test coverage for Astro content collection routing logic**
  - **Location:** `astro/src/pages/projects/[slug].astro`, `astro/src/pages/projects/index.astro`, and analogous essay and notes pages
  - **Nature:** `getStaticPaths()`, `getCollection()` calls, date sorting, and slug/id mapping have no test coverage. No test framework is configured in the Astro project (`package.json` has no test runner).
  - **Risk:** Regressions in collection query logic or route generation will not be caught before build. Build-time errors surface only during `astro build`, not in a fast unit-test cycle.
  - **Justification for deferral:** Adding tests requires a new test framework dependency (e.g. Vitest with Astro integration), which was out of scope for Slice 2. Legacy carve-out applies.
  - **Remediation:** Add Vitest + `@astrojs/test-utils` (or equivalent) and write tests for `getStaticPaths()` output shape and collection query correctness. Scoped to a dedicated test-framework setup slice.

- **KTLO-000005 — `<time>` elements sitewide missing `datetime` attribute**
  - **Location:** `astro/src/pages/essays/[...slug].astro` line 31, `astro/src/pages/notes/[...slug].astro` line 36, `astro/src/components/ProjectCard.astro` line 42
  - **Nature:** `<time>` elements display locale-formatted dates but omit the machine-readable `datetime` attribute (ISO 8601). Assistive technologies and parsers rely on `datetime` to interpret dates correctly.
  - **Risk:** Screen readers may not reliably surface the date; microformat consumers cannot parse it. Low user impact on a personal portfolio site but is a compliance gap vs. WCAG best practice.
  - **Justification for deferral:** Pre-existing across essays, notes, and ProjectCard. Fixed in `projects/[slug].astro` (new file, Slice 2 review finding A-1). Updating the remaining files is a low-effort accessibility polish task deferred to avoid scope creep.
  - **Remediation:** Add `datetime={entry.data.date.toISOString().split('T')[0]}` (or equivalent) to each `<time>` element in the three listed files. Low effort, high signal-to-noise ratio.

- **KTLO-000006 — External links sitewide don't announce "opens in new tab" to screen reader users**
  - **Location:** `astro/src/components/ProjectCard.astro` lines 26–34, `astro/src/pages/projects/[slug].astro` lines 44–63
  - **Nature:** Links with `target="_blank"` do not notify screen reader users that activation will open a new browser tab. Best practice per WCAG 3.2.5 (Change on Request) and general AT conventions is to append visually hidden text or annotate the `aria-label`.
  - **Risk:** Keyboard-only and screen reader users may be disoriented when focus unexpectedly shifts to a new tab.
  - **Justification for deferral:** Pre-existing pattern in `ProjectCard.astro`; would require consistent treatment across all external links sitewide to avoid inconsistency.
  - **Remediation:** Add `<span class="sr-only">(opens in new tab)</span>` inside each `target="_blank"` link, or update `aria-label` to include "opens in new tab". A sitewide pass is the right scope.
