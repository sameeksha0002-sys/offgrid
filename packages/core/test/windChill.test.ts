import { describe, expect, it } from "vitest";
import { windChillC, windChillDropC } from "../src/windChill";

describe("windChillC", () => {
  it("matches the standard formula", () => {
    expect(windChillC(-10, 20)).toBeCloseTo(-17.86, 1);
    expect(windChillC(0, 10)).toBeCloseTo(-3.31, 1);
    expect(windChillC(-20, 40)).toBeCloseTo(-34.13, 1);
  });

  it("feels colder with more wind", () => {
    expect(windChillC(-5, 40)).toBeLessThan(windChillC(-5, 10));
  });

  it("returns the air temperature when it's too warm for the formula", () => {
    expect(windChillC(15, 30)).toBe(15);
  });

  it("returns the air temperature when the wind is too light", () => {
    expect(windChillC(-5, 3)).toBe(-5);
    expect(windChillC(-5, 0)).toBe(-5);
  });

  it("rejects bad input", () => {
    expect(() => windChillC(NaN, 10)).toThrow(RangeError);
    expect(() => windChillC(0, -1)).toThrow(RangeError);
  });
});

describe("windChillDropC", () => {
  it("is how many degrees colder it feels", () => {
    expect(windChillDropC(-10, 20)).toBeCloseTo(7.86, 1);
  });

  it("is 0 when the wind makes no difference", () => {
    expect(windChillDropC(15, 30)).toBe(0);
  });
});
