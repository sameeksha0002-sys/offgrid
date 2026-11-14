import { describe, expect, it } from "vitest";
import { airPressureKpa, oxygenPercentOfSeaLevel, oxygenSummary, SEA_LEVEL_PRESSURE_KPA } from "../src/altitudeOxygen";

describe("airPressureKpa", () => {
  it("is standard sea-level pressure at 0 m", () => {
    expect(airPressureKpa(0)).toBeCloseTo(SEA_LEVEL_PRESSURE_KPA, 6);
  });

  it("matches known values at altitude", () => {
    expect(airPressureKpa(1000)).toBeCloseTo(89.87, 1);
    expect(airPressureKpa(3000)).toBeCloseTo(70.11, 1);
    expect(airPressureKpa(5500)).toBeCloseTo(50.51, 1);
  });

  it("always falls as you climb", () => {
    expect(airPressureKpa(2000)).toBeLessThan(airPressureKpa(1000));
    expect(airPressureKpa(4000)).toBeLessThan(airPressureKpa(3000));
  });

  it("rejects altitudes outside 0 to 9,000 m", () => {
    expect(() => airPressureKpa(-1)).toThrow(RangeError);
    expect(() => airPressureKpa(9001)).toThrow(RangeError);
    expect(() => airPressureKpa(NaN)).toThrow(RangeError);
  });
});

describe("oxygenPercentOfSeaLevel", () => {
  it("is 100% at sea level and about half at 5,500 m", () => {
    expect(oxygenPercentOfSeaLevel(0)).toBe(100);
    expect(oxygenPercentOfSeaLevel(5500)).toBe(50);
  });

  it("is about 69% at 3,000 m", () => {
    expect(oxygenPercentOfSeaLevel(3000)).toBe(69);
  });
});

describe("oxygenSummary", () => {
  it("writes a plain sentence", () => {
    expect(oxygenSummary(3000)).toBe("At 3,000 m each breath carries about 69% of the oxygen it would at sea level.");
  });
});
