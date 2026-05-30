import { describe, it, expect } from "vitest";
import { addDays, addMonths, addYears, addHours } from "../src/add";
import { isLeapYear } from "../src/query";

describe("Month-end clamping", () => {
  it("Jan 31 + 1 month = Feb 28 (non-leap)", () => {
    const result = addMonths(new Date(2026, 0, 31), 1);
    expect(result.getMonth()).toBe(1); // Feb
    expect(result.getDate()).toBe(28);
  });

  it("Jan 31 + 1 month = Feb 29 (leap year)", () => {
    const result = addMonths(new Date(2024, 0, 31), 1);
    expect(result.getMonth()).toBe(1); // Feb
    expect(result.getDate()).toBe(29);
  });

  it("Mar 31 - 1 month = Feb 28 (non-leap)", () => {
    const result = addMonths(new Date(2026, 2, 31), -1);
    expect(result.getMonth()).toBe(1);
    expect(result.getDate()).toBe(28);
  });
});

describe("Leap year edge cases", () => {
  it("2024 is a leap year (divisible by 4, not a century)", () => {
    expect(isLeapYear(new Date(2024, 0, 1))).toBe(true);
  });

  it("2000 is a leap year (century divisible by 400)", () => {
    expect(isLeapYear(new Date(2000, 0, 1))).toBe(true);
  });

  it("1900 is NOT a leap year (century not divisible by 400)", () => {
    expect(isLeapYear(new Date(1900, 0, 1))).toBe(false);
  });

  it("2100 is NOT a leap year", () => {
    expect(isLeapYear(new Date(2100, 0, 1))).toBe(false);
  });

  it("Feb 29 + 1 year = Feb 28 (leap → non-leap)", () => {
    const result = addYears(new Date(2024, 1, 29), 1);
    expect(result.getMonth()).toBe(1);
    expect(result.getDate()).toBe(28);
  });
});

describe("addDays uses calendar-day semantics", () => {
  it("addDays preserves time-of-day across day boundaries", () => {
    const base = new Date(2026, 0, 15, 14, 30, 0);
    const result = addDays(base, 1);
    expect(result.getHours()).toBe(14);
    expect(result.getMinutes()).toBe(30);
  });
});

describe("Immutability", () => {
  it("addDays does not mutate the input", () => {
    const original = new Date(2026, 0, 15);
    const originalTime = original.getTime();
    addDays(original, 5);
    expect(original.getTime()).toBe(originalTime);
  });

  it("addMonths does not mutate the input", () => {
    const original = new Date(2026, 0, 31);
    const originalTime = original.getTime();
    addMonths(original, 1);
    expect(original.getTime()).toBe(originalTime);
  });
});
