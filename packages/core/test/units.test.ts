
import { describe, expect, it } from "vitest";
import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  feetToMetres,
  formatAltitude,
  kmToMiles,
  metresToFeet,
  milesToKm,
} from "../src/units";

describe("length conversions", () => {
  it("converts metres to feet", () => {
    expect(metresToFeet(1000)).toBeCloseTo(3280.84, 2);
    expect(metresToFeet(0)).toBe(0);
  });

  it("converts km to miles", () => {
    expect(kmToMiles(10)).toBeCloseTo(6.21371, 4);
  });

  it("round-trips", () => {
    expect(feetToMetres(metresToFeet(4500))).toBeCloseTo(4500, 6);
    expect(milesToKm(kmToMiles(26))).toBeCloseTo(26, 6);
  });
});

describe("temperature conversions", () => {
  it("knows the fixed points", () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
    expect(celsiusToFahrenheit(100)).toBe(212);
    expect(fahrenheitToCelsius(32)).toBe(0);
  });

  it("agrees at -40, where both scales meet", () => {
    expect(celsiusToFahrenheit(-40)).toBe(-40);
    expect(fahrenheitToCelsius(-40)).toBe(-40);
  });
});

describe("formatAltitude", () => {
  it("formats metres with Indian digit grouping", () => {
    expect(formatAltitude(3500)).toBe("3,500 m");
    expect(formatAltitude(3500, "m")).toBe("3,500 m");
  });

  it("formats feet, rounded", () => {
    expect(formatAltitude(3500, "ft")).toBe("11,483 ft");
  });
});

describe("bad input", () => {
  it("throws on NaN or infinity", () => {
    expect(() => metresToFeet(NaN)).toThrow(RangeError);
    expect(() => celsiusToFahrenheit(Infinity)).toThrow(RangeError);
    expect(() => formatAltitude(NaN)).toThrow(RangeError);
  });
});
