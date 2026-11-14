import { describe, expect, it } from "vitest";
import { estimateTrekHours, formatDuration, summariseTrekTime } from "../src/trekTime";

describe("estimateTrekHours", () => {
  it("applies Naismith's rule: 5 km/h plus 1 h per 600 m of ascent", () => {
    expect(estimateTrekHours({ distanceKm: 10, ascentM: 600 })).toBeCloseTo(3, 5);
    expect(estimateTrekHours({ distanceKm: 18, ascentM: 1100 })).toBeCloseTo(3.6 + 1100 / 600, 5);
  });

  it("is 0 when there is no trekking", () => {
    expect(estimateTrekHours({ distanceKm: 0, ascentM: 0 })).toBe(0);
  });

  it("scales with the pace factor", () => {
    const base = estimateTrekHours({ distanceKm: 10, ascentM: 600 });
    expect(estimateTrekHours({ distanceKm: 10, ascentM: 600, paceFactor: 1.5 })).toBeCloseTo(base * 1.5, 5);
  });

  it("rejects negative or non-finite input", () => {
    expect(() => estimateTrekHours({ distanceKm: -1, ascentM: 0 })).toThrow(RangeError);
    expect(() => estimateTrekHours({ distanceKm: 1, ascentM: -5 })).toThrow(RangeError);
    expect(() => estimateTrekHours({ distanceKm: NaN, ascentM: 0 })).toThrow(RangeError);
    expect(() => estimateTrekHours({ distanceKm: 1, ascentM: 0, paceFactor: 0 })).toThrow(RangeError);
  });
});

describe("formatDuration", () => {
  it("formats hours and minutes, rounded to 5 minutes", () => {
    expect(formatDuration(5.5)).toBe("5 h 30 min");
    expect(formatDuration(3)).toBe("3 h");
    expect(formatDuration(0.75)).toBe("45 min");
    expect(formatDuration(5.43)).toBe("5 h 25 min");
  });

  it("rolls 60 minutes over into the next hour", () => {
    expect(formatDuration(1.99)).toBe("2 h");
  });

  it("rejects negative input", () => {
    expect(() => formatDuration(-1)).toThrow(RangeError);
  });
});

describe("summariseTrekTime", () => {
  const triund = { distance_km: 18, elevation_gain_m: 1100 };

  it("returns the total and the per-day average", () => {
    const s = summariseTrekTime(triund, 2);
    expect(s.totalHours).toBeCloseTo(3.6 + 1100 / 600, 5);
    expect(s.perDayHours).toBeCloseTo(s.totalHours / 2, 5);
    expect(s.trekDays).toBe(2);
  });

  it("gives a per-day average of 0 when no days are on foot", () => {
    expect(summariseTrekTime({ distance_km: 0, elevation_gain_m: 0 }, 0)).toEqual({ totalHours: 0, perDayHours: 0, trekDays: 0 });
  });
});
