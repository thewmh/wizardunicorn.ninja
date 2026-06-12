/**
 * setup.ts — Desk, dev, and everyday carry setup data
 *
 * Source of truth for setup items displayed on /about/setup.
 * Rendered by SetupItem.astro in setup.astro, grouped by category.
 *
 * Responsibilities:
 *   - Typed data for all setup entries
 *   - Category classification: 'desk' | 'dev' | 'everyday' | 'other'
 *
 * Non-responsibilities:
 *   - Rendering (SetupItem.astro)
 *   - Routing (setup.astro)
 *
 * Category mapping (vs. original page sections):
 *   'desk'     → physical workstation hardware (MacBook, keyboard, mouse, monitor)
 *   'dev'      → software / tools (editor, browsers)
 *   'everyday' → accessories used across contexts (headset)
 *
 * The original page used four sections (Daily Driver, Peripherals, Editor, Browsers).
 * These map cleanly to two category groups — 'desk' and 'dev' — with 'everyday'
 * for the headset, because the interface offers only four fixed categories.
 */

export interface SetupItem {
  name: string;
  category: 'desk' | 'dev' | 'everyday' | 'other';
  description?: string;
  link?: string;
}

export const setupItems: SetupItem[] = [
  // Desk — physical workstation hardware
  {
    name: 'MacBook Pro (M-series)',
    category: 'desk',
    description:
      'The main workstation. Fast enough for local dev, hot reload in seconds, battery life outlasts most coffee runs.',
  },
  {
    name: 'Compact mechanical keyboard',
    category: 'desk',
    description: 'Cherry MX Brown switches.',
  },
  {
    name: 'Logitech MX Master',
    category: 'desk',
    description: 'Ergonomic, great scroll wheel.',
  },
  {
    name: '27" external display',
    category: 'desk',
    description: '4K for extended coding sessions.',
  },

  // Everyday — accessories used across contexts
  {
    name: 'Noise-cancelling headset',
    category: 'everyday',
    description: 'For deep work and remote calls.',
  },

  // Dev — editor and browsers
  {
    name: 'Neovim + LazyVim',
    category: 'dev',
    description:
      'My editor of choice for rapid code review and small edits. IntelliJ for larger projects. VS Code when the team requires it.',
  },
  {
    name: 'Safari',
    category: 'dev',
    description: 'For final QA — no developer tools is the best test.',
  },
  {
    name: 'Chrome',
    category: 'dev',
    description: 'For debugging with dev tools and performance profiling.',
  },
];
