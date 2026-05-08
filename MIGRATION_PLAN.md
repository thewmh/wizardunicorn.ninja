# Wizard Unicorn Ninja — Migration Plan

> **Vision:** A personal knowledge base and hobby space — a living collection of things I've learned, built, and care about. Not a portfolio, not a publication platform. A garden with both cultivated essays and wild notes.

---

## 1. Site Vision

### What This Site Is

A personal knowledge base with room for hobbies, projects, and curated reading. The site is yours first — a place to capture ideas, document learnings, and keep track of the things you're into.

### Content Philosophy

- **Notes** — small, focused pieces of knowledge. Workshop takeaways, quick explanations, things learned. Written for yourself, shared for anyone who finds them useful.
- **Essays** — longer, polished pieces. Deeper explorations of topics where you have something substantive to say.
- **Projects** — interactive things you've built. The recipe calculator, the La Croix page, and future creative experiments.
- **About** — who you are, what you're reading, what you're working on, what's on your desk.

### Content That Stays in the Repo, Off-Site

- `blog/illegal-marriage.md` — personal one-off, kept in the repo for history but not published
- Sitecore/SXA legacy pages (`pages/jss-jamstack-containers.md`, `computer-science/structure-interpretation-computer-programs.md`) — legacy content, kept in the repo for fun but not published
- Frontend Masters index page (`frontend-masters/page.md`) — superseded by individual notes

---

## 2. Information Architecture

### Navigation

```
Home | Essays | Notes | Projects | About
```

### Page Structure

| Route | Content Type | Description |
|---|---|---|
| `/` | Home | Brief intro, recent essays, recent notes, featured projects |
| `/essays/` | Essay listing | All essays, sorted by date |
| `/essays/[slug]` | Essay page | Individual essay with full content |
| `/notes/` | Note listing | All notes, sorted by date |
| `/notes/[slug]` | Note page | Individual note with full content |
| `/projects/` | Project listing | All projects with descriptions |
| `/projects/recipe-calculator` | Project page | Redirect or embedded experience |
| `/about/` | About | Bio, books, hobbies, setup |
| `/about/books` | Reading list | Current + past reads with brief notes |
| `/about/hobbies` | Hobbies | Current pursuits with links to related notes/projects |
| `/about/setup` | Gear + dev setup | What's on the desk, dev environment |
| `/about/resources` | Resources | Curated link collection (modernized) |
| `/404` | Not found | Custom 404 page |

### URL Mapping (Existing → New)

| Old Path | New Path | Notes |
|---|---|---|
| `index.md` | `/` | Home page |
| `about/page.md` | `/about/` | About page |
| `blog/*.md` (Astro) | `/essays/[slug]` | Essay posts |
| `resources/page.md` | `/about/resources` | Moved under About |
| `pages/frontend-concern-separation.md` | `/essays/frontend-concern-separation` | Essay |
| `pages/makgeolli-iyangju-base-recipe.md` | Off-site (kept in repo) | Personal recipe, not migrating |
| `recipe-calculator/` | `/projects/recipe-calculator` | Embedded or linked |
| `pages/lacroix.md` | `/projects/la-croix` | Embedded or linked |

No redirects needed — we're replacing the site entirely.

---

## 3. Technical Architecture

### Stack

| Layer | Technology | Rationale |
|---|---|---|
| Framework | Astro 4 | Islands architecture, MDX support, excellent DX |
| Styling | Tailwind CSS 3 + CSS custom properties | Theme system, utility-first, already in place |
| Components | Astro components + React (for interactive islands) | ThemeSwitcher, recipe calculator, La Croix page |
| Content | Markdown files in `src/pages/` | Simple, version-control friendly, no CMS needed |
| Syntax Highlighting | `rehype-pretty-code` with Shiki | Fast, beautiful, supports all current themes |
| Theme | CSS custom properties + `localStorage` | Cookie-less, no flash of wrong theme, simpler |
| Analytics | GA4 via Partytown | Decouples analytics from main thread |
| Deployment | GitHub Pages (Astro `dist/`) | Same hosting, new build process |

### Astro Project Structure

```
astro/
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── public/
│   ├── favicon.svg
│   ├── manifest.json
│   └── ...
├── src/
│   ├── assets/
│   │   └── theme.svg              # SVG sprite for theme icons
│   ├── components/
│   │   ├── Header.astro            # Site header + nav
│   │   ├── Footer.astro            # Site footer
│   │   ├── ThemeSwitcher.jsx       # React component (theme cycling)
│   │   ├── EssayCard.astro         # Essay listing card
│   │   ├── NoteCard.astro          # Note listing card
│   │   ├── ProjectCard.astro       # Project listing card
│   │   ├── CodeBlock.astro         # Syntax-highlighted code wrapper
│   │   └── Tag.astro               # Tag badge component
│   ├── layouts/
│   │   └── BaseLayout.astro        # Root layout (html, head, body, theme)
│   ├── pages/
│   │   ├── index.astro             # Home page
│   │   ├── essays/
│   │   │   ├── index.astro         # Essay listing
│   │   │   └── [slug].astro        # Dynamic essay page
│   │   ├── notes/
│   │   │   ├── index.astro         # Note listing
│   │   │   └── [slug].astro        # Dynamic note page
│   │   ├── projects/
│   │   │   ├── index.astro         # Project listing
│   │   │   └── [slug].astro        # Dynamic project page
│   │   ├── about/
│   │   │   ├── index.astro         # About page
│   │   │   ├── books.astro         # Reading list
│   │   │   ├── hobbies.astro       # Hobbies
│   │   │   ├── setup.astro         # Gear + dev setup
│   │   │   └── resources.astro     # Curated resources
│   │   └── 404.astro               # Custom 404
│   ├── styles/
│   │   └── global.css              # Theme CSS custom properties + base styles
│   └── content/
│       ├── essays/
│       │   ├── design-systems.md
│       │   └── dev-roadmap.md
│       ├── notes/
│       │   └── fe-ai-roadmap.md
│       └── projects/
│           └── recipe-calculator.md
└── astro/
```

### Content Collections (Astro Content API)

Use Astro's content collections for type-safe frontmatter validation:

```typescript
// src/content/definitions.ts
import { defineCollection, z } from 'astro:content';

const essays = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()).default([]),
    coverImage: z.string().optional(),
  }),
});

const notes = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()).default([]),
    noteType: z.enum(['workshop', 'essay', 'reference', 'personal']).default('reference'),
  }),
});

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()).default([]),
    liveUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
  }),
});

export const collections = { essays, notes, projects };
```

### Data Files

Navigation and site metadata stored in TypeScript files:

```typescript
// src/config/site.ts
export const site = {
  title: 'Wizard Unicorn Ninja',
  description: 'Frontend Development Worknotes and Resources',
  url: 'https://wizardunicorn.ninja',
  author: 'William Harrison',
  social: {
    x: 'https://x.com/afedev',
    email: 'william@wizardunicorn.ninja',
  },
  analytics: {
    ga4Id: 'G-XXXXXXXXXX', // to be provided
  },
};

// src/config/navigation.ts
export const nav = [
  { text: 'Home', href: '/' },
  { text: 'Essays', href: '/essays/' },
  { text: 'Notes', href: '/notes/' },
  { text: 'Projects', href: '/projects/' },
  { text: 'About', href: '/about/' },
];
```

### Theme System (Updated)

**Before (cookies):** Theme stored in a server-side cookie, read via inline script.

**After (localStorage):** Theme stored in `localStorage`, read via inline script.

```html
<!-- In BaseLayout.astro <head> -->
<script is:inline>
  (function() {
    const themes = [
      { name: 'wizard', className: 'light', icon: '🧙‍♂️' },
      { name: 'unicorn', className: 'colorful', icon: '🦄' },
      { name: 'ninja', className: 'dark', icon: '🥷' },
    ];
    const saved = localStorage.getItem('theme');
    const theme = themes.find(t => t.name === saved) || themes[0];
    document.documentElement.setAttribute('data-theme', theme.className);
  })();
</script>
```

The React `ThemeSwitcher` component updates to use `localStorage`:

```jsx
// In handleThemeChange():
localStorage.setItem('theme', themes[newPosition].name);
```

### Syntax Highlighting

**rehype-pretty-code** with Shiki for syntax highlighting. Provides:
- Beautiful themes that respect the site's theme system
- Line numbers
- Copy buttons
- Language detection

```js
// astro.config.mjs
import rehypePrettyCode from 'rehype-pretty-code';

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [rehypePrettyCode, {
        theme: {
          light: 'github-light',
          dark: 'github-dark',
        },
        keepStyle: true,
      }]
    ],
  },
});
```

The custom SCSS syntax highlighting from the Jekyll site (`_sass/highlight.scss`) will be replaced. The Shiki themes will be customized via the Tailwind typography plugin to use CSS custom properties so they respect the site's theme system.

### Analytics

**Migrate from UA-183755378-1 (Universal Analytics) to GA4.**

Partytown is already configured in the Astro project. The GA4 tracking script will be loaded via Partytown's integration, decoupling it from the main thread.

```js
// astro.config.mjs
import partytown from '@astrojs/partytown';

export default defineConfig({
  integrations: [
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
  ],
});
```

The tracking script (`track.js`) will be simplified — only GA4 events, no console logging for production.

### Service Worker / PWA

**Revisit, not drop.** The current service worker is a basic cache-first fallback for the offline page. For a personal knowledge base that you might read offline, this is genuinely useful.

**Plan:** Port the existing SW to the Astro `public/` directory with a minor update:
- Keep the cache-first fetch strategy
- Add the home page to the offline cache
- Update the manifest.json paths to match the new URL structure
- Consider adding a "Install" prompt via the web app manifest

The service worker file will live at `public/sw.js` and be referenced in `public/manifest.json`.

### Deployment

**Replace the Jekyll GitHub Actions workflow with an Astro build workflow.**

```yaml
# .github/workflows/main.yml
name: Build and deploy Astro to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        working-directory: ./astro
        run: npm ci

      - name: Build
        working-directory: ./astro
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./astro/dist
          publish_branch: dev
```

Key changes from the Jekyll workflow:
- No Ruby setup needed
- No Gulp step
- No `npm run scripts` — Astro handles bundling
- Publishes `astro/dist/` instead of `_site/`
- Uses modern action versions (v4)

---

## 4. Migration Phases

### Phase 0: Foundation

**Goal:** Get the Astro project building and deploying correctly with the skeleton site.

**Tasks:**
- [x] Set up Astro content collections (essays, notes, projects schemas)
- [x] Create `src/config/site.ts` and `src/config/navigation.ts`
- [x] Create `BaseLayout.astro` with theme system (localStorage)
- [x] Create `Header.astro` with navigation from config
- [x] Create `Footer.astro`
- [x] Create `ThemeSwitcher.tsx` updated for localStorage
- [x] Set up `global.css` with Tailwind + CSS custom properties for themes
- [x] Configure `rehype-pretty-code` for syntax highlighting
- [x] Create `404.astro`
- [x] Create home page skeleton (`index.astro`)
- [x] Update GitHub Actions workflow for Astro build
- [x] Verify build + deploy pipeline works end-to-end

**Deliverable:** A working Astro site that builds, deploys, and renders the navigation + theme system.

---

### Phase 1: Essays + Notes

**Goal:** Migrate existing blog posts and notes into the new structure.

**Tasks:**
- [ ] Create `/essays/[slug].astro` dynamic route
- [ ] Create `/essays/index.astro` listing page
- [ ] Create `/notes/[slug].astro` dynamic route
- [ ] Create `/notes/index.astro` listing page
- [ ] Migrate `fe-ai-roadmap.md` → essay
- [ ] Migrate `dev-roadmap.md` → essay
- [ ] Migrate `frontend-concern-separation.md` → essay
- [ ] Migrate `frontend-concern-separation.md` → essay (already listed above)
- [ ] Add proper frontmatter to all migrated posts
- [ ] Add tags to all migrated posts
- [ ] Test syntax highlighting on code blocks
- [ ] Verify all internal links work
- [ ] Update home page to show recent essays + notes

**Deliverable:** All existing essays and notes are live on the new site with proper listing pages.

---

### Phase 2: Projects + Interactive Pages

**Goal:** Port the recipe calculator and La Croix page as interactive Astro islands with modern UI.

**Tasks:**
- [ ] Create `/projects/[slug].astro` dynamic route
- [ ] Create `/projects/index.astro` listing page
- [ ] Create `RecipeCalculator.astro` React island component
  - Port existing functionality (ingredient scaling, recipe loading)
  - Modern UI with Tailwind
  - JSON data as module imports instead of `<script type="application/json">`
  - Responsive design
- [ ] Create `LaCroix.astro` React island component
  - Modern UI with Tailwind
  - Keep the animation/interaction concept but with cleaner implementation
- [ ] Create project card component
- [ ] Embed recipe calculator on `/projects/recipe-calculator`
- [ ] Embed La Croix page on `/projects/la-croix`
- [ ] Add project descriptions and metadata

**Deliverable:** Both interactive projects are modernized and accessible from the Projects section.

---

### Phase 3: About + Personal Content

**Goal:** Build out the About section with books, hobbies, and setup pages.

**Tasks:**
- [ ] Create `/about/index.astro` — bio, brief intro
- [ ] Create `/about/books.astro` — reading list (current + past)
  - Data file: `src/data/books.ts` with title, author, status, rating, notes
  - Components: BookCard, ReadingList
- [ ] Create `/about/hobbies.astro` — current hobbies
  - Data file: `src/data/hobbies.ts` with hobby name, description, related links
  - Components: HobbyCard
- [ ] Create `/about/setup.astro` — gear + dev setup
  - Data file: `src/data/setup.ts` with categories (desk, dev, everyday)
  - Components: SetupItem
- [ ] Create `/about/resources.astro` — modernized resources page
  - Convert from static markdown to component-based layout
  - Organize by category with better visual hierarchy
  - Add search/filter (optional, can defer)
- [ ] Update home page to include links to About subsections

**Deliverable:** Complete About section with all personal content pages.

---

### Phase 4: Polish + Service Worker

**Goal:** Final touches, PWA features, and cleanup.

**Tasks:**
- [ ] Port service worker to `public/sw.js`
- [ ] Update `public/manifest.json` for new URL structure
- [ ] Add GA4 tracking script via Partytown
- [ ] Simplify `track.js` (GA4 events only, no console logging)
- [ ] Add Open Graph meta tags to all pages
- [ ] Add structured data (JSON-LD) for essays and notes
- [ ] Create custom 404 page
- [ ] Test on mobile, tablet, desktop
- [ ] Test all three themes
- [ ] Performance audit (Lighthouse)
- [ ] Clean up unused files from root directory
- [ ] Update `AGENTS.md` with new structure
- [ ] Update `BUILDING.md` with Astro build/deploy instructions

**Deliverable:** Production-ready site with PWA support, analytics, and polished UX.

---

## 5. Monthly Drip Schedule

The plan is designed for **frequent micro-sessions** — 30-60 minute blocks where you add a note, polish an essay, or tackle a small task. Each phase above is broken into discrete, completable tasks.

### Suggested Cadence

| Session | Focus | Duration |
|---|---|---|
| Session 1 | Phase 0 (Foundation) | 2-3 hours |
| Session 2 | Phase 1 (Essays + Notes) | 1-2 hours |
| Session 3 | Phase 1 continuation | 1-2 hours |
| Session 4 | Phase 2 (Projects) | 2-3 hours |
| Session 5 | Phase 2 continuation | 1-2 hours |
| Session 6 | Phase 3 (About + Books) | 1-2 hours |
| Session 7 | Phase 3 continuation (Hobbies + Setup) | 1-2 hours |
| Session 8 | Phase 3 continuation (Resources) | 1 hour |
| Session 9 | Phase 4 (Polish + SW) | 1-2 hours |

After the initial build-out, monthly sessions become:
- Write a note (15 min)
- Update a book/hobby entry (10 min)
- Polish an existing page (20 min)
- Fix a bug or improve performance (30 min)

### Content Writing Guidelines for Micro-Sessions

- **Notes:** Write 200-500 words. One idea per note. Add tags. Done.
- **Essays:** Write 800-2000 words. Can be written across multiple sessions. Save draft state.
- **Books:** Add title, author, status, one-sentence note. Done.
- **Hobbies:** Add name, description, link. Done.
- **Setup:** Add item, category, link. Done.

---

## 6. Garden / Hobby Content Setup

### Books Data Model

```typescript
// src/data/books.ts
interface Book {
  title: string;
  author: string;
  status: 'reading' | 'finished' | 'want-to-read';
  rating?: number; // 1-5
  notes?: string;
  addedAt: string; // ISO date
  finishedAt?: string;
}
```

### Hobbies Data Model

```typescript
// src/data/hobbies.ts
interface Hobby {
  name: string;
  description: string;
  link?: string; // to related notes, projects, or external
  status: 'active' | 'paused' | 'completed';
}
```

### Setup Data Model

```typescript
// src/data/setup.ts
interface SetupItem {
  name: string;
  category: 'desk' | 'dev' | 'everyday' | 'other';
  description?: string;
  link?: string;
  image?: string; // optional photo
}
```

These data files live outside the content collections since they're not markdown documents — they're structured data rendered as component lists.

---

## 7. What's NOT Being Migrated

These items are intentionally excluded from the new site but kept in the repo for reference:

| Item | Reason |
|---|---|
| `blog/illegal-marriage.md` | Personal one-off, not part of the knowledge base |
| `computer-science/structure-interpretation-computer-programs.md` | Legacy Sitecore content |
| `frontend-masters/page.md` | Superseded by individual notes |
| All `frontend-masters/*/` markdown files | Superseded by individual notes |
| `pages/404.md` | Replaced by `astro/src/pages/404.astro` |
| `pages/lacroix.md` (old version) | Replaced by new React island component |
| `recipe-calculator/` (old version) | Replaced by new React island component |
| `_layouts/`, `_includes/`, `_sass/` | Jekyll-specific, replaced by Astro |
| `gulpfile.js`, `postcss.config.js`, `tailwind.config.js` (root) | Replaced by Astro's Tailwind integration |
| `Gemfile`, `Gemfile.lock` | No longer needed |

---

## 8. Open Decisions

| Decision | Recommendation | Notes |
|---|---|---|
| RSS feed | **Skip for now** | No audience, low priority. Easy to add later with `@astrojs/rss` |
| Search | **Defer** | Add `pagefind` integration when the site has 20+ notes |
| Tag system | **Include** | Low overhead, high value for a knowledge base. Tags in frontmatter, rendered as badges |
| Service Worker | **Include (revisited)** | Useful for offline reading. Simple cache strategy. |
| Theme persistence | **localStorage** | Simpler than cookies, no server overhead, no consent banner needed |
| GA4 | **Migrate** | UA analytics is deprecated. Need GA4 measurement ID. |
| GitHub Pages branch | **Keep `dev`** | Same strategy as current deployment |

---

## Appendix: Current Astro State (Before Migration)

The existing `astro/` directory has a partial foundation:
- Astro v4 + React + Tailwind v3 + Partytown installed
- `BaseLayout.astro` with cookie-based theme system (needs migration to localStorage)
- `Header.astro` with hardcoded nav links (needs config-driven migration)
- `ThemeSwitcher.jsx` with cookie-based persistence (needs localStorage migration)
- `readMarkdown.js` utility (needs replacement with Astro content collections)
- 3 pages: index, about, blog listing (needs restructuring to essays/notes/projects)
- 2 blog posts migrated (need frontmatter + tags)
- `global.css` with theme custom properties (needs Tailwind integration)
- `track.js` analytics (needs GA4 migration)
- `theme.svg` asset (keep)
- GitHub Actions workflow (needs Astro replacement)
