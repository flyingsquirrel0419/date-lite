import { describe, it, expect } from "vitest";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  differenceInMonths,
  differenceInYears,
} from "../src/diff";

describe("differenceInDays", () => {
  it("returns positive when left > right", () => {
    const a = new Date(2026, 0, 15);
    const b = new Date(2026, 0, 10);
    expect(differenceInDays(a, b)).toBe(5);
  });

  it("returns negative when left < right", () => {
    const a = new Date(2026, 0, 10);
    const b = new Date(2026, 0, 15);
    expect(differenceInDays(a, b)).toBe(-5);
  });

  it("returns 0 for same day", () => {
    const a = new Date(2026, 0, 15, 10, 0);
    const b = new Date(2026, 0, 15, 22, 0);
    expect(differenceInDays(a, b)).toBe(0);
  });
});

describe("differenceInHours", () => {
  it("calculates hours between dates", () => {
    const a = new Date(2026, 0, 15, 14, 0);
    const b = new Date(2026, 0, 15, 10, 0);
    expect(differenceInHours(a, b)).toBe(4);
  });

  it("truncates partial hours toward zero", () => {
    const a = new Date(2026, 0, 15, 11, 59);
    const b = new Date(2026, 0, 15, 10, 0);
    expect(differenceInHours(a, b)).toBe(1);
    expect(differenceInHours(b, a)).toBe(-1);
  });
});

describe("differenceInMinutes", () => {
  it("calculates minutes between dates", () => {
    const a = new Date(2026, 0, 15, 10, 30);
    const b = new Date(2026, 0, 15, 10, 0);
    expect(differenceInMinutes(a, b)).toBe(30);
  });

  it("truncates partial minutes toward zero", () => {
    const a = new Date(2026, 0, 15, 10, 1, 59);
    const b = new Date(2026, 0, 15, 10, 0, 0);
    expect(differenceInMinutes(a, b)).toBe(1);
    expect(differenceInMinutes(b, a)).toBe(-1);
  });
});

describe("differenceInSeconds", () => {
  it("calculates seconds between dates", () => {
    const a = new Date(2026, 0, 15, 10, 0, 45);
    const b = new Date(2026, 0, 15, 10, 0, 0);
    expect(differenceInSeconds(a, b)).toBe(45);
  });

  it("truncates partial seconds toward zero", () => {
    const a = new Date(2026, 0, 15, 10, 0, 1, 999);
    const b = new Date(2026, 0, 15, 10, 0, 0, 0);
    expect(differenceInSeconds(a, b)).toBe(1);
    expect(differenceInSeconds(b, a)).toBe(-1);
  });
});

describe("differenceInMonths", () => {
  it("counts full calendar months", () => {
    const a = new Date(2026, 5, 15); // Jun 15
    const b = new Date(2026, 0, 15); // Jan 15
    expect(differenceInMonths(a, b)).toBe(5);
  });

  it("is negative when left < right", () => {
    const a = new Date(2026, 0, 15);
    const b = new Date(2026, 5, 15);
    expect(differenceInMonths(a, b)).toBe(-5);
  });
});

describe("differenceInYears", () => {
  it("counts full calendar years", () => {
    const a = new Date(2028, 0, 15);
    const b = new Date(2026, 0, 15);
    expect(differenceInYears(a, b)).toBe(2);
  });

  it("is 0 when not a full year yet", () => {
    const a = new Date(2027, 0, 14); // Jan 14, 2027
    const b = new Date(2026, 0, 15); // Jan 15, 2026
    expect(differenceInYears(a, b)).toBe(0);
  });
});
