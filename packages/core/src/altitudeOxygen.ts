// How much less air there is up high. Helps explain why altitude sickness happens.
// Uses the standard-atmosphere pressure formula. Pure and I/O-free.

export const SEA_LEVEL_PRESSURE_KPA = 101.325;

/** Highest altitude (m) this estimate is meant for. The formula holds up to about 11,000 m. */
export const MAX_ALTITUDE_M = 9000;

/** Air pressure in kPa at an altitude in metres (0 to 9,000), by the standard-atmosphere formula. */
export function airPressureKpa(altitudeM: number): number {
  if (!Number.isFinite(altitudeM) || altitudeM < 0 || altitudeM > MAX_ALTITUDE_M) {
    throw new RangeError(`altitudeM must be between 0 and ${MAX_ALTITUDE_M}`);
  }
  return SEA_LEVEL_PRESSURE_KPA * Math.pow(1 - 2.25577e-5 * altitudeM, 5.25588);
}

/**
 * The air is still about 21% oxygen up high, but each breath has less air in it.
 * This returns how much oxygen each breath carries compared with sea level, as a whole percent.
 */
export function oxygenPercentOfSeaLevel(altitudeM: number): number {
  return Math.round((airPressureKpa(altitudeM) / SEA_LEVEL_PRESSURE_KPA) * 100);
}

/** One plain sentence, for showing next to a place's maximum altitude. */
export function oxygenSummary(altitudeM: number): string {
  const pct = oxygenPercentOfSeaLevel(altitudeM);
  return `At ${Math.round(altitudeM).toLocaleString("en-IN")} m each breath carries about ${pct}% of the oxygen it would at sea level.`;
}
