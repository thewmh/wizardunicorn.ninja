/**
 * fitness.ts — Fitness log data
 *
 * Source of truth for exercise sessions displayed on /about/fitness.
 * Rendered by FitnessCard.astro, listed flat (newest-first) in fitness.astro.
 *
 * Responsibilities:
 *   - Typed data for all exercise session entries
 *   - Activity classification: 'run' | 'lift' | 'cycle' | 'hike' | 'other'
 *
 * Non-responsibilities:
 *   - Rendering (FitnessCard.astro)
 *   - Routing (fitness.astro)
 */

export interface ExerciseSession {
  date: string;         // ISO date string e.g. '2026-06-12'
  activity: 'run' | 'lift' | 'cycle' | 'hike' | 'other';
  duration: number;     // minutes
  notes?: string;       // post-session reflection
  observations?: string; // in-session observations
  // run / cycle / hike
  distance?: number;    // miles
  pace?: string;        // e.g. '9:15/mi' — run only
  // lift
  exercises?: string;   // freeform e.g. 'squat 3x5, deadlift 1x5'
}

// Sorted newest-first.
export const sessions: ExerciseSession[] = [
  {
    date: '2026-06-07',
    activity: 'run',
    duration: 32,
    distance: 3.4,
    pace: '9:25/mi',
    notes:
      'Felt strong through mile 2, faded a bit on the last stretch but still finished under pace target. Good sign heading into the weekend long run.',
    observations:
      'Heart rate spiked earlier than usual — probably the heat. Keeping form loose on the uphills helped more than I expected.',
  },
  {
    date: '2026-05-18',
    activity: 'lift',
    duration: 55,
    exercises: 'squat 3×5 @ 185 lb, deadlift 1×5 @ 225 lb, bench press 3×5 @ 145 lb, pull-ups 3×8',
    notes:
      'Deadlift felt heavy off the floor today — probably the late night before. Everything else moved cleanly. Will hold weight here for one more session before adding.',
  },
  {
    date: '2026-04-26',
    activity: 'hike',
    duration: 110,
    distance: 4.8,
    observations:
      'Trail was muddy after Thursday\'s rain but the ridge views made it absolutely worth it. Descent was slower than expected — rocky surface kept pace honest.',
  },
  {
    date: '2026-04-03',
    activity: 'run',
    duration: 22,
    distance: 2.1,
    pace: '10:28/mi',
    notes:
      'First run back after two weeks off. Kept it deliberately easy and short — just getting the legs going again. No complaints.',
  },
];
