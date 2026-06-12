/**
 * hobbies.ts — Hobbies and side pursuits data
 *
 * Source of truth for hobby entries displayed on /about/hobbies.
 * Rendered by HobbyCard.astro in hobbies.astro.
 *
 * Responsibilities:
 *   - Typed data for all hobby entries
 *   - Status classification: 'active' | 'paused' | 'completed'
 *
 * Non-responsibilities:
 *   - Rendering (HobbyCard.astro)
 *   - Routing (hobbies.astro)
 */

export interface Hobby {
  name: string;
  description: string;
  link?: string;
  status: 'active' | 'paused' | 'completed';
}

export const hobbies: Hobby[] = [
  {
    name: 'Cooking experiments',
    description:
      'Following recipes in multiple time zones, keeping a macro spreadsheet of my favorite dishes, and learning which ingredients work best together when the grocery store has a limited selection.',
    status: 'active',
  },
  {
    name: 'Makgeolli brewing',
    description:
      'Made a batch in Beijing that was surprisingly good. Paused by the constraints of homebrewing from outside China, but hoping to resume with better sourcing.',
    status: 'paused',
  },
];
