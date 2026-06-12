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

- **KTLO-000001 — Remove unused `NoteCard` import from `notes/[...slug].astro`** — RESOLVED
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

- **KTLO-000007 — No test coverage for mobile nav vanilla JS toggle logic**
  - **Location:** `astro/src/components/Header.astro` `<script>` block
  - **Nature:** The mobile nav open/close toggle, Escape-key handler, and viewport-resize handler are implemented in a vanilla JS `<script>` block inside an Astro component. No test framework is configured in the project (see KTLO-000004), so no test seam exists for this interaction logic.
  - **Risk:** Regressions in toggle behavior or ARIA state management will not be caught before deployment. Build-time `astro check` validates TypeScript types but not runtime interaction correctness.
  - **Justification for deferral:** Adding tests requires the test framework setup tracked in KTLO-000004. Legacy carve-out applies — adding a test seam would require out-of-scope refactoring.
  - **Remediation:** Once Vitest is configured (KTLO-000004), add Playwright E2E or Astro integration tests covering: (a) hamburger button toggles open/close, (b) Escape closes drawer and returns focus to toggle, (c) viewport resize above 768px closes drawer, (d) `aria-expanded` and `aria-hidden` reflect open/closed state correctly across all three themes.

- **KTLO-000008 — `--text-muted` links have marginal contrast in light theme**
  - **Location:** `astro/src/styles/global.css` (`--text-muted: #6b7280` on `--bg: #FAF9F6`); affects nav links in `astro/src/components/Header.astro` (desktop and mobile) and any other element using `text-[var(--text-muted)]` on interactive elements sitewide.
  - **Nature:** The estimated contrast ratio of `#6b7280` on `#FAF9F6` is approximately 4.1:1 — marginally below the WCAG AA threshold of 4.5:1 for normal-weight text under 18pt. Hover state (`var(--text)`) meets contrast. Dark and colorful themes are unaffected. This is a pre-existing issue across the site, not introduced by the mobile nav feature; it was made more visible by extending the same token into the mobile drawer context.
  - **Risk:** Users with low-contrast sensitivity may have difficulty reading default-state nav link text in the light theme. Medium accessibility risk; no runtime or functional impact.
  - **Justification for deferral:** Pre-existing across the site. Fixing requires either darkening `--text-muted` in the light theme (affects all muted text, not just nav links) or overriding the color specifically for interactive/link contexts. Scope is a sitewide accessibility pass.
  - **Remediation:** Run a sitewide contrast audit. Either adjust `--text-muted` in `[data-theme='light']` to a value meeting 4.5:1 on `#FAF9F6` (e.g. `#555f6e` ≈ 5.1:1), or introduce a `--text-interactive` token for interactive elements that need guaranteed contrast. Verify against all three themes.

- **KTLO-000009 — ThemeSwitcher active-button state drifts when theme is changed on mobile then viewport resizes to desktop**
  - **Location:** `astro/src/components/Header.astro` — two `<ThemeSwitcher client:load />` instances (one in `.hidden md:flex` desktop nav, one in `.flex md:hidden` mobile controls).
  - **Nature:** Each ThemeSwitcher island initializes its React state from `data-theme` on mount. When the user changes theme using the visible instance (mobile), the hidden instance's React state is not updated (no cross-island state subscription). If the user then resizes the viewport from mobile to desktop during the same page session, the desktop ThemeSwitcher will show the stale active-button state from page load, even though the correct theme is applied and `data-theme` is accurate. The actual theme rendering is unaffected; only the button highlighting in the ThemeSwitcher is incorrect.
  - **Risk:** Minor UX inconsistency. Only occurs on viewport resize mid-session (uncommon usage pattern for a personal portfolio). No functional or accessibility impact. Page reload corrects it.
  - **Justification for deferral:** The two-instance approach was chosen because it is the simplest way to keep ThemeSwitcher accessible on both mobile and desktop without restructuring the header flex layout. Fixing this requires either: (a) a `storage` event listener or `MutationObserver` on `data-theme` inside ThemeSwitcher to react to external theme changes, or (b) moving to a single ThemeSwitcher instance outside both conditional containers with a layout restructure.
  - **Remediation:** Add a `storage` event listener in `ThemeSwitcher.tsx` that re-reads `localStorage.getItem('theme')` and updates local state when another instance changes it. This is the lowest-churn fix and handles the resize case correctly.
