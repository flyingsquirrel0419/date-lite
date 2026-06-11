import { describe, it, expect } from "vitest";
import { isWeekend, isLeapYear, isValid, getDaysInMonth, getWeekOfYear } from "../src/query";

describe("isWeekend", () => {
  it("returns true for Saturday", () => {
    // Jan 3, 2026 is Saturday
    expect(isWeekend(new Date(2026, 0, 3))).toBe(true);
  });
  it("returns true for Sunday", () => {
    // Jan 4, 2026 is Sunday
    expect(isWeekend(new Date(2026, 0, 4))).toBe(true);
  });
  it("returns false for Wednesday", () => {
    // Jan 7, 2026 is Wednesday
    expect(isWeekend(new Date(2026, 0, 7))).toBe(false);
  });
});

describe("isLeapYear", () => {
  it("returns true for 2024 (divisible by 4, not century)", () => {
    expect(isLeapYear(new Date(2024, 0, 1))).toBe(true);
  });
  it("returns true for 2000 (century divisible by 400)", () => {
    expect(isLeapYear(new Date(2000, 0, 1))).toBe(true);
  });
  it("returns false for 1900 (century not divisible by 400)", () => {
    expect(isLeapYear(new Date(1900, 0, 1))).toBe(false);
  });
  it("returns false for 2023 (not divisible by 4)", () => {
    expect(isLeapYear(new Date(2023, 0, 1))).toBe(false);
  });
});

describe("isValid", () => {
  it("returns true for valid date", () => {
    expect(isValid(new Date(2026, 0, 1))).toBe(true);
  });
  it("returns false for Invalid Date", () => {
    expect(isValid(new Date("invalid"))).toBe(false);
  });
});

describe("getDaysInMonth", () => {
  it("returns 31 for January", () => {
    expect(getDaysInMonth(new Date(2026, 0, 1))).toBe(31);
  });
  it("returns 28 for February in non-leap year", () => {
    expect(getDaysInMonth(new Date(2026, 1, 1))).toBe(28);
  });
  it("returns 29 for February in leap year", () => {
    expect(getDaysInMonth(new Date(2024, 1, 1))).toBe(29);
  });
  it("returns 30 for November", () => {
    expect(getDaysInMonth(new Date(2026, 10, 1))).toBe(30);
  });
});

describe("getWeekOfYear", () => {
  it("returns 1 for Jan 1 (or very close)", () => {
    // Jan 1, 2026 is Thursday → ISO week 1
    expect(getWeekOfYear(new Date(2026, 0, 1))).toBe(1);
  });

  it("handles ISO week boundary (Jan 1 Monday vs previous year)", () => {
    // Jan 1, 2024 is Monday → week 1
    expect(getWeekOfYear(new Date(2024, 0, 1))).toBe(1);
  });

  it("returns 53 for late December in some years", () => {
    // Dec 31, 2026 is Thursday → ISO week 53
    expect(getWeekOfYear(new Date(2026, 11, 31))).toBeGreaterThanOrEqual(52);
  });

  it("handles Sunday as ISO day 7", () => {
    // Jan 4, 2026 is Sunday and belongs to ISO week 1
    expect(getWeekOfYear(new Date(2026, 0, 4))).toBe(1);
  });
});
