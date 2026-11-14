// "Feels like" temperature in wind, for cold days on ridges and passes.
// Uses the standard North American wind chill formula (Environment Canada and the US National Weather Service).
// Pure and I/O-free.

/** The formula only applies at or below this air temperature (°C). */
export const WIND_CHILL_MAX_TEMP_C = 10;
/** ...and at or above this wind speed (km/h). */
export const WIND_CHILL_MIN_WIND_KMH = 4.8;

/**
 * The temperature it feels like on bare skin, in °C, for an air temperature in °C
 * and a wind speed in km/h. Outside the range the formula was made for, the wind
 * doesn't change how cold it feels, so the air temperature is returned unchanged.
 */
export function windChillC(airTempC: number, windKmh: number): number {
  if (!Number.isFinite(airTempC) || !Number.isFinite(windKmh)) {
    throw new RangeError("airTempC and windKmh must be finite numbers");
  }
  if (windKmh < 0) throw new RangeError("windKmh cannot be negative");
  if (airTempC > WIND_CHILL_MAX_TEMP_C || windKmh < WIND_CHILL_MIN_WIND_KMH) return airTempC;
  const v = Math.pow(windKmh, 0.16);
  return 13.12 + 0.6215 * airTempC - 11.37 * v + 0.3965 * airTempC * v;
}

/** How much colder the wind makes it feel, in °C (0 or more). */
export function windChillDropC(airTempC: number, windKmh: number): number {
  return Math.max(0, airTempC - windChillC(airTempC, windKmh));
}
