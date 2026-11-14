
// Unit conversions for travellers who think in feet, miles or °F.
// Pure and I/O-free like the rest of @offgrid/core.

export const FEET_PER_METRE = 3.28084;
export const MILES_PER_KM = 0.621371;

function assertFinite(value: number, name: string): void {
  if (!Number.isFinite(value)) throw new RangeError(`${name} must be a finite number`);
}

export function metresToFeet(metres: number): number {
  assertFinite(metres, "metres");
  return metres * FEET_PER_METRE;
}

export function feetToMetres(feet: number): number {
  assertFinite(feet, "feet");
  return feet / FEET_PER_METRE;
}

export function kmToMiles(km: number): number {
  assertFinite(km, "km");
  return km * MILES_PER_KM;
}

export function milesToKm(miles: number): number {
  assertFinite(miles, "miles");
  return miles / MILES_PER_KM;
}

export function celsiusToFahrenheit(celsius: number): number {
  assertFinite(celsius, "celsius");
  return (celsius * 9) / 5 + 32;
}

export function fahrenheitToCelsius(fahrenheit: number): number {
  assertFinite(fahrenheit, "fahrenheit");
  return ((fahrenheit - 32) * 5) / 9;
}

/** "3,500 m" or "11,483 ft". Rounds to a whole number. */
export function formatAltitude(metres: number, unit: "m" | "ft" = "m"): string {
  assertFinite(metres, "metres");
  const value = Math.round(unit === "ft" ? metresToFeet(metres) : metres);
  return `${value.toLocaleString("en-IN")} ${unit}`;
}
