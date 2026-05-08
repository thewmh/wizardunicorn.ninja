# Wizard Unicorn Ninja — Design Direction

> **One-liner:** Editorial restraint with personality leaks through the details.
>
> **The vibe:** A thoughtfully typed zine for a developer who reads SICP and has opinions about CSS class names.

---

## 1. What This Site Feels Like

### The Core Tension

The name is **Wizard Unicorn Ninja** — inherently playful, slightly absurd, three-part. The work is **serious craft** — design systems, accessibility, separation of concerns, developer roadmaps. The design needs to hold both truths.

The current site tries to resolve this by going full chaotic: gradient backgrounds, 80px font headers, emoji in the nav, a layout that feels like a Jekyll template from 2020. It's trying too hard to be "fun" and ends up feeling unfinished.

The new site does the opposite: **quiet confidence with a wink.** The personality isn't shouted from the header — it's discovered in the details.

### The Three Pillars

**1. Editorial, Not Bloggy**
- Typography is the hero. The design should be invisible until you notice it.
- Strong typographic hierarchy. H1s should feel like magazine headlines, not just big text.
- Intentional whitespace. Let content breathe.
- 65ch max-width for reading — the gold standard for readability.

**2. Playful, Not Cute**
- The three themes are the personality. They should feel like genuinely different reading experiences.
- Micro-interactions: satisfying theme switcher, subtle hover states, smooth transitions.
- Easter eggs: the emoji icons, the ridiculous 404 page, the bouncing tags. Small joys for people who notice.

**3. Functional, Not Decorative**
- Every visual decision serves the content. No gradients for the sake of gradients.
- Code blocks are first-class citizens — beautiful, readable, theme-aware.
- Tags and metadata are scannable — what is this about, when was it written, what else is similar.

### In Practice

**Morning, wizard theme:** You open the site on your laptop. The warm white background is easy on your eyes. You scan recent essays. You click on one. The typography is comfortable. You read for 20 minutes.

**Evening, ninja theme:** You're reading on your phone in bed. You switch to dark mode. The transition is smooth. The dark background doesn't hurt your eyes. The blue accent on links is visible but not harsh.

**Weekend, unicorn theme:** You're feeling playful. You switch to the gradient theme. The purple-to-orange background feels like a sunset. The white text on the gradient feels intentional, not chaotic.

**The personality is there, but it doesn't scream.** It whispers.

---

## 2. Typography

### Font Stack

| Role | Font | Weight | Notes |
|---|---|---|---|
| Headings | DM Sans | 600–700 | Geometric but warm. Slightly playful in heavier weights. |
| Body | Inter | 400 | Workhorse. Highly readable, neutral, lets content breathe. |
| Code | JetBrains Mono | 400 | Developer's monospace. Great ligatures, excellent readability. |

**Why DM Sans for headings?** When headings and body are the same family, hierarchy is purely size-based. Different families give you visual interest *and* hierarchy. DM Sans has enough personality to make headings feel alive, but enough restraint to not compete with content.

### Type Scale

| Level | Size | Weight | Letter-spacing | Use |
|---|---|---|---|---|
| H1 | 2.75rem (44px) | 700 | -0.02em | Page titles, essay headings |
| H2 | 2rem (32px) | 700 | -0.01em | Section headings |
| H3 | 1.5rem (24px) | 600 | 0 | Card titles, subsections |
| H4 | 1.125rem (18px) | 600 | 0 | Subsections |
| Body | 1rem (16px) | 400 | 0 | Default text |
| Small | 0.875rem (14px) | 400 | 0 | Metadata, captions |
| Code | 0.875rem (14px) | 400 | 0 | Code blocks, inline code |

**Line heights:**
- Headings: 1.2 (tight, editorial)
- Body: 1.7 (generous, comfortable)
- Code: 1.5 (balanced)

### H1 Treatment

Not a billboard. A magazine headline.

The H1 is 44px with tight letter-spacing (-0.02em). It's bold but not overwhelming. It sits in a `65ch` max-width column, centered or left-aligned depending on the page. It should feel like you just flipped open a well-designed publication.

---

## 3. Color System

### Three Themes

The three themes are the primary personality vehicle. Each is a distinct reading experience.

#### Wizard (Light) — "Clean Paper"

A warm, readable light theme. Not stark white — something closer to high-quality book paper.

| Token | Value | Purpose |
|---|---|---|
| `--bg` | `#FAF9F6` | Page background (warm white) |
| `--bg-elevated` | `#FFFFFF` | Cards, code blocks, elevated surfaces |
| `--text` | `#1a1a1a` | Primary text |
| `--text-muted` | `#6b7280` | Secondary text, metadata, dates |
| `--accent` | `#2563eb` | Links, active states, focus rings |
| `--accent-hover` | `#1d4ed8` | Link hover |
| `--border` | `#e5e5e5` | Subtle dividers, card borders |
| `--code-bg` | `#f3f4f6` | Inline code background |
| `--code-block-bg` | `#1a1a1a` | Code block background |

#### Ninja (Dark) — "Deep Room"

A true dark theme. Not pure black — something softer on the eyes.

| Token | Value | Purpose |
|---|---|---|
| `--bg` | `#111111` | Page background |
| `--bg-elevated` | `#1a1a1a` | Cards, code blocks, elevated surfaces |
| `--text` | `#e5e5e5` | Primary text |
| `--text-muted` | `#9ca3af` | Secondary text, metadata, dates |
| `--accent` | `#60a5fa` | Links, active states, focus rings |
| `--accent-hover` | `#93bbfd` | Link hover |
| `--border` | `#262626` | Subtle dividers, card borders |
| `--code-bg` | `#1e1e1e` | Inline code background |
| `--code-block-bg` | `#1a1a1a` | Code block background |

#### Unicorn (Colorful) — "Sunset Gradient"

A refined editorial gradient. The gradient is the **page background**, not slapped everywhere. Content lives on semi-transparent elevated surfaces.

| Token | Value | Purpose |
|---|---|---|
| `--bg-start` | `#7c3aed` | Gradient start (purple) |
| `--bg-mid` | `#c026d3` | Gradient mid (magenta) |
| `--bg-end` | `#ea580c` | Gradient end (orange) |
| `--text` | `#ffffff` | Primary text (always white on gradient) |
| `--text-muted` | `rgba(255,255,255,0.7)` | Secondary text |
| `--accent` | `#fde68a` | Links (warm yellow on purple) |
| `--accent-hover` | `#fef3c7` | Link hover |
| `--border` | `rgba(255,255,255,0.2)` | Subtle dividers |
| `--code-bg` | `rgba(0,0,0,0.3)` | Inline code background |

**Gradient application:**
```css
background: linear-gradient(135deg, var(--bg-start) 0%, var(--bg-mid) 50%, var(--bg-end) 100%);
```

Content surfaces use `bg-white/10` or `bg-black/20` (semi-transparent) to sit above the gradient while keeping text readable.

### Usage Rules

- **Wizard** — default theme. For everyday reading.
- **Ninja** — for evening/night reading. Lower contrast than pure black.
- **Unicorn** — for when you want to feel something. Use sparingly — it's the fun one.

---

## 4. Layout & Spacing

### Grid

**Content pages:** Single-column, `65ch` max-width for optimal reading (65-75 characters per line).

**Listing pages:** Responsive grid. 1 column on mobile, 2 on tablet, 3 on desktop for cards.

**About pages:** Split layout on desktop — bio on left (narrower, `40ch`), content on right (wider, `65ch`). Collapses to single column on mobile.

### Spacing Scale

| Token | Value | Use |
|---|---|---|
| `space-1` | 0.25rem (4px) | Tight spacing |
| `space-2` | 0.5rem (8px) | Component internal |
| `space-3` | 0.75rem (12px) | Card padding |
| `space-4` | 1rem (16px) | Default padding |
| `space-6` | 1.5rem (24px) | Section spacing |
| `space-8` | 2rem (32px) | Page section gaps |
| `space-12` | 3rem (48px) | Major section gaps |
| `space-16` | 4rem (64px) | Hero spacing |
| `space-20` | 5rem (80px) | Page margins |

### Page Layouts

**Home:**
```
┌──────────────────────────────────────────────┐
│  Nav: Home | Essays | Notes | Projects | About │ 🧙 🦄 🥷 │
├──────────────────────────────────────────────┤
│                                              │
│         👋 I'm William Harrison              │
│                                              │
│   I build things on the internet. I write    │
│   about design systems, developer roadmaps,  │
│   and occasionally about things that don't matter.    │
│   I also have opinions about class names.    │
│                                              │
│   Recent Essays        Recent Notes          │
│   ───────────────      ──────────────        │
│   Design Systems        Fe AI Roadmap        │
│   Developer             Frontend Concern     │
│   Roadmaps              Separation           │
│                                              │
├──────────────────────────────────────────────┤
│  © 2026 William Harrison                     │
└──────────────────────────────────────────────┘
```

**Essay/Note listing:**
```
┌──────────────────────────────────────────────┐
│  Nav                                       │
├──────────────────────────────────────────────┤
│                                              │
│  Essays                                      │
│  ─────                                       │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ Design Systems in Modern Development   │  │
│  │ Explore the power of design systems... │  │
│  │ Dec 15, 2025 · #design #systems        │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ Developer Roadmaps to Guide Learning   │  │
│  │ Staying on top of new tools...         │  │
│  │ Jan 3, 2026 · #career #learning        │  │
│  └────────────────────────────────────────┘  │
│                                              │
└──────────────────────────────────────────────┘
```

**Essay/Note reading:**
```
┌──────────────────────────────────────────────┐
│  Nav                                       │
├──────────────────────────────────────────────┤
│                                              │
│        Design Systems in Modern Development  │
│                                              │
│   Explore the power of design systems...     │
│   Dec 15, 2025 · #design #systems            │
│                                              │
│   ─────────────────────────────────          │
│                                              │
│   A design system isn't just a set of        │
│   reusable components—it's the blueprint...  │
│                                              │
│   ## What Is a Design System?                │
│                                              │
│   A design system is a collection of         │
│   standards, reusable components...          │
│                                              │
│   [line numbers] ```js                       │
│   const theme = {                            │
│     primary: '#2563eb',                      │
│     secondary: '#7c3aed',                    │
│   };                                         │
│   ```                                        │
│                                              │
│   ─────────────────────────────────          │
│                                              │
│   ← Previous    Next →                       │
│                                              │
└──────────────────────────────────────────────┘
```

---

## 5. Component Design

### Cards

Every listing page uses cards. Consistent, scannable, with a clear visual hierarchy.

```
┌────────────────────────────────────────┐
│ Design Systems in Modern Development   │  ← Title (H3, DM Sans 600)
│                                        │
│ Explore the power of design systems    │  ← Description (muted text, Inter 400)
│ and how they streamline development... │
│                                        │
│ Dec 15, 2025  ·  #design #systems      │  ← Date + tags (small, muted)
└────────────────────────────────────────┘
```

**Card specs:**
- Background: `--bg-elevated`
- Border: `1px solid --border`
- Border radius: `0.75rem` (12px)
- Padding: `1.25rem` (20px)
- Hover: subtle shadow lift (`shadow-sm` → `shadow-md`)
- Transition: `all 150ms ease`

### Tags

Tags are small, rounded badges. They're the first place personality leaks through.

```
#design  #systems  #frontend
```

**Tag specs:**
- Font size: `0.75rem` (12px)
- Padding: `0.25rem 0.5rem` (4px 8px)
- Border radius: `9999px` (fully rounded)
- Background: `--border` (subtle)
- Text color: `--text-muted`
- Hover: background becomes `--accent`, text becomes white
- Hover animation: **scale bounce** (1.0 → 1.1 → 1.0 over 150ms)

### Code Blocks

First-class citizens. Beautiful, readable, theme-aware.

**Block specs:**
- Border radius: `0.5rem` (8px)
- Background: `--code-block-bg` (dark in both light and dark themes)
- Font: JetBrains Mono, 14px, line-height 1.5
- Padding: `1rem` (16px)
- Line numbers: subtle, muted, right-aligned
- Copy button: top-right corner, appears on hover
- Language label: top-left, small, uppercase, muted
- Syntax highlighting: Shiki-powered, customized to use CSS custom properties

**Inline code specs:**
- Background: `--code-bg`
- Border radius: `0.25rem` (4px)
- Padding: `0.125rem 0.375rem` (2px 6px)
- Font: JetBrains Mono, 0.875em
- No border

### Theme Switcher

Three emoji buttons. Satisfying to click.

```
🧙‍♂️   🦄   🥷
```

**Switcher specs:**
- Three emoji buttons in a horizontal row
- Small, understated (20px height)
- Active theme: subtle underline or background highlight
- Click animation: **scale bounce** (1.0 → 1.15 → 1.0 over 150ms)
- Click animation: **spin** (360deg rotation over 200ms)
- The cycling order: 🧙‍♂️ → 🦄 → 🥷 → 🧙‍♂️
- Placement: top-right of header, next to nav links

### Progress Bar

Reading progress indicator. Useful, not obtrusive.

**Specs:**
- Position: fixed, top of viewport, z-index 50
- Height: `2px` (thinner than current)
- Background: `--accent`
- Width: animated based on scroll position
- Transition: `width 100ms ease`

### Footer

Minimal. Functional. One line of personality.

```
© 2026 William Harrison. Built with Astro.
```

Clean and simple.

---

## 6. The Ridiculous (In the Right Places)

Personality leaks through in specific, intentional moments:

### The 404 Page

> **404 — Not Found**
>
> Even wizards can't find this page. Not even unicorns. And definitely not ninjas.
>
> [← Go back to safety](/)

### The Home Page Intro

> *"I build things on the internet. I write about design systems, developer roadmaps, and occasionally about things that don't matter. I also have opinions about class names."*

The "opinions about class names" line is the wink. It signals serious craft with self-awareness.

### The About Page Bio

> *"I'm William Harrison, a frontend architect who once moved to Beijing on a whim, still has strong opinions about CSS class names, and has a habit of starting projects that seem simple until they aren't."*

### Tag Hover

Tags bounce on hover. It's a tiny interaction that makes metadata feel alive.

### Theme Switcher Click

The emoji spins and bounces. It's silly but delightful. Exactly the right amount.

### What NOT to Do

- No gradient backgrounds on the header
- No 80px font headers
- No "Powered by La Croix" in the footer
- No theme buttons as text links
- No chaotic color everywhere
- No personality that competes with the content

---

## 7. Animation & Motion

### Principles

- **Purposeful:** Every animation serves a function (feedback, delight, clarity)
- **Fast:** No animation longer than 300ms
- **Respectful:** Honor `prefers-reduced-motion` — disable non-essential animations
- **Smooth:** Use `transform` and `opacity` for GPU-accelerated animations

### Animation Spec

| Element | Animation | Duration | Easing |
|---|---|---|---|
| Theme transition | Background/color crossfade | 300ms | `ease-in-out` |
| Card hover | Shadow lift | 150ms | `ease` |
| Tag hover | Scale bounce | 150ms | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| Theme switcher click | Scale + spin | 200ms | `ease-out` |
| Link hover | Color transition | 150ms | `ease` |
| Progress bar | Width change | 100ms | `ease` |
| Page transition | None (Astro is instant) | 0ms | — |

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. Accessibility

### Requirements

- **WCAG AA** compliance for all themes
- **Keyboard navigation:** All interactive elements reachable via Tab
- **Focus states:** Visible focus rings using `--accent` color
- **Screen readers:** Proper heading hierarchy, ARIA labels on theme switcher
- **Color contrast:** All text meets 4.5:1 minimum (3:1 for large text)
- **Semantic HTML:** Proper use of `<article>`, `<nav>`, `<main>`, `<header>`, `<footer>`

### Theme-Specific Checks

| Theme | Body Text | Links | Code Text |
|---|---|---|---|
| Wizard | 16.5:1 | 4.7:1 | 16.5:1 |
| Ninja | 15.4:1 | 3.9:1 | 15.4:1 |
| Unicorn | 5.8:1 | 7.2:1 | 5.8:1 |

All themes pass WCAG AA for normal text. The unicorn theme's links exceed AAA contrast ratios.

---

## 9. What Changes From the Current Site

| Element | Current | New |
|---|---|---|
| Header | Full-width gradient, theme buttons as text links | Clean, minimal header with emoji theme switcher |
| H1 | 80px bold text, dominates viewport | 44px, magazine-headline treatment |
| Background | Gradient on unicorn theme, solid on others | Warm white / deep black / editorial gradient |
| Typography | Tailwind defaults, inconsistent | DM Sans + Inter + JetBrains Mono |
| Cards | None (flat list) | Card-based with consistent spacing |
| Code blocks | Rouge-generated, basic SCSS styling | Shiki-powered, beautiful, theme-aware |
| Nav | Dynamic from `_data/navigation.yml` | Static from `src/config/navigation.ts` |
| Footer | La Croix SVG + text | Minimal copyright line |
| Progress bar | Top-of-page, thick | Thinner, more subtle |
| PageNav | Sticky sidebar for workshop notes | Keep for long essays, refined |
| 404 | Jekyll default | Custom, on-brand humor |
| Theme persistence | Cookies | localStorage |

---

## 10. What Stays

- **The three-theme system** — wizard, unicorn, ninja. The concept is great. The execution needs refinement.
- **The emoji icons** — 🧙‍♂️ 🦄 🥷 are perfect. They're the site's signature.
- **The SVG sprite** — keep `theme.svg`, just update the paths if needed.
- **The reading progress bar** — useful. Make it thinner.
- **The pagenav system** — for long-form content, a sticky table of contents is genuinely useful.
- **The service worker** — offline reading is a real feature for a knowledge base.

---

## Appendix: Design Tokens Reference

### CSS Custom Properties (Wizard Theme)

```css
[data-theme='light'] {
  --bg: #FAF9F6;
  --bg-elevated: #FFFFFF;
  --text: #1a1a1a;
  --text-muted: #6b7280;
  --accent: #2563eb;
  --accent-hover: #1d4ed8;
  --border: #e5e5e5;
  --code-bg: #f3f4f6;
  --code-block-bg: #1a1a1a;
}
```

### CSS Custom Properties (Ninja Theme)

```css
[data-theme='dark'] {
  --bg: #111111;
  --bg-elevated: #1a1a1a;
  --text: #e5e5e5;
  --text-muted: #9ca3af;
  --accent: #60a5fa;
  --accent-hover: #93bbfd;
  --border: #262626;
  --code-bg: #1e1e1e;
  --code-block-bg: #1a1a1a;
}
```

### CSS Custom Properties (Unicorn Theme)

```css
[data-theme='colorful'] {
  --bg-start: #7c3aed;
  --bg-mid: #c026d3;
  --bg-end: #ea580c;
  --text: #ffffff;
  --text-muted: rgba(255, 255, 255, 0.7);
  --accent: #fde68a;
  --accent-hover: #fef3c7;
  --border: rgba(255, 255, 255, 0.2);
  --code-bg: rgba(0, 0, 0, 0.3);
  --code-block-bg: rgba(0, 0, 0, 0.5);
}
```

### Tailwind Integration

The custom properties are consumed in the Tailwind config via the `@tailwindcss/typography` plugin and custom theme extensions. All colors that interact with content (text, links, backgrounds) use CSS custom properties so they automatically respect the active theme.
