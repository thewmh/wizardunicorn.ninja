/**
 * books.ts — Reading list data
 *
 * Source of truth for books displayed on /about/books.
 * Rendered by BookCard.astro, grouped by status in books.astro.
 *
 * Responsibilities:
 *   - Typed data for all reading list entries
 *   - Status classification: 'reading' | 'finished' | 'want-to-read'
 *
 * Non-responsibilities:
 *   - Rendering (BookCard.astro)
 *   - Routing (books.astro)
 *
 * Note on dates: addedAt and finishedAt are required/optional fields per the
 * interface spec. The original page markup had no dates; '2026-06-12' is used
 * as a consistent placeholder for addedAt (the date this data was formalized),
 * and '2026-01-15' as an approximate finishedAt for DDIA.
 */

export interface Book {
  title: string;
  author: string;
  status: 'reading' | 'finished' | 'want-to-read';
  rating?: number; // 1–5
  notes?: string;
  addedAt: string; // ISO date string e.g. '2024-01-15'
  finishedAt?: string;
}

export const books: Book[] = [
  {
    title: 'Structure and Interpretation of Computer Programs',
    author: 'Abelson & Sussman — with Julie & Sussman',
    status: 'reading',
    notes:
      'The classic. Still the most important CS book on my shelf regardless of how many times I\'ve read it.',
    addedAt: '2026-06-12',
  },
  {
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    status: 'finished',
    rating: 5,
    notes:
      'Required reading for anyone who cares about how data systems actually work under the hood.',
    addedAt: '2026-06-12',
    finishedAt: '2026-01-15',
  },
  {
    title: 'The Art of Doing Science and Engineering',
    author: 'Richard Hamming',
    status: 'want-to-read',
    addedAt: '2026-06-12',
  },
  {
    title: 'Clean Architecture',
    author: 'Robert C. Martin',
    status: 'want-to-read',
    addedAt: '2026-06-12',
  },
  {
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    status: 'want-to-read',
    addedAt: '2026-06-12',
  },
  {
    title: 'A Philosophy of Software Design',
    author: 'John Ousterhout',
    status: 'want-to-read',
    addedAt: '2026-06-12',
  },
];
