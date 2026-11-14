// Walking-time estimate for a trek, using Naismith's rule.
// Pure and I/O-free like the rest of @offgrid/core, so it runs offline in the app and in tests.

/** Naismith's rule: 5 km per hour on the flat, plus 1 hour for every 600 m climbed. */
export const NAISMITH_FLAT_KMH = 5;
export const NAISMITH_ASCENT_M_PER_HOUR = 600;

export interface TrekTimeInput {
  distanceKm: number;
  ascentM: number;
  /** 1 = Naismith's pace. Use above 1 for a slower group (1.25 = 25% slower). Defaults to 1. */
  paceFactor?: number;
}

/**
 * Estimated hours of walking, not counting breaks, meals or photo stops.
 * Returns 0 for places with no trekking (distance 0 and no climb).
 */
export function estimateTrekHours({ distanceKm, ascentM, paceFactor = 1 }: TrekTimeInput): number {
  if (!Number.isFinite(distanceKm) || !Number.isFinite(ascentM) || !Number.isFinite(paceFactor)) {
    throw new RangeError("distanceKm, ascentM and paceFactor must be finite numbers");
  }
  if (distanceKm < 0 || ascentM < 0) throw new RangeError("distanceKm and ascentM cannot be negative");
  if (paceFactor <= 0) throw new RangeError("paceFactor must be greater than 0");
  const hours = distanceKm / NAISMITH_FLAT_KMH + ascentM / NAISMITH_ASCENT_M_PER_HOUR;
  return hours * paceFactor;
}

/** "5 h 30 min", "45 min" or "3 h". Rounds to the nearest 5 minutes so it doesn't look falsely precise. */
export function formatDuration(hours: number): string {
  if (!Number.isFinite(hours) || hours < 0) throw new RangeError("hours must be a non-negative number");
  const totalMin = Math.round((hours * 60) / 5) * 5;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

export interface TrekTimeSummary {
  totalHours: number;
  /** Average per trekking day, or 0 when there are none. */
  perDayHours: number;
  trekDays: number;
}

/** Total time for a place and the average per day, given how many days of the plan are on foot. */
export function summariseTrekTime(
  place: { distance_km: number; elevation_gain_m: number },
  trekDays: number,
  paceFactor = 1,
): TrekTimeSummary {
  const totalHours = estimateTrekHours({ distanceKm: place.distance_km, ascentM: place.elevation_gain_m, paceFactor });
  const days = Math.max(0, Math.floor(trekDays));
  return { totalHours, perDayHours: days > 0 ? totalHours / days : 0, trekDays: days };
}
