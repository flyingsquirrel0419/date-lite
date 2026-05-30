import { describe, it, expect } from "vitest";
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "../src/startEnd";

describe("startOfDay", () => {
  it("returns midnight", () => {
    const d = new Date(2026, 0, 15, 14, 30, 45, 123);
    const result = startOfDay(d);
    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(15);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });
});

describe("endOfDay", () => {
  it("returns 23:59:59.999", () => {
    const d = new Date(2026, 0, 15, 0, 0, 0, 0);
    const result = endOfDay(d);
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
    expect(result.getSeconds()).toBe(59);
    expect(result.getMilliseconds()).toBe(999);
  });
});

describe("startOfWeek", () => {
  it("returns Monday of the same week (ISO 8601)", () => {
    // Jan 15, 2026 is Thursday → start of week is Monday Jan 12
    const d = new Date(2026, 0, 15);
    const result = startOfWeek(d);
    expect(result.getDate()).toBe(12);
    expect(result.getHours()).toBe(0);
  });

  it("handles Sunday (end of ISO week)", () => {
    // Jan 11, 2026 is Sunday → start of that ISO week is Monday Jan 5
    const d = new Date(2026, 0, 11);
    const result = startOfWeek(d);
    expect(result.getDate()).toBe(5);
  });
});

describe("endOfWeek", () => {
  it("returns Sunday of the same week", () => {
    // Jan 15, 2026 is Thursday → end of week is Sunday Jan 18
    const d = new Date(2026, 0, 15);
    const result = endOfWeek(d);
    expect(result.getDate()).toBe(18);
    expect(result.getHours()).toBe(23);
  });
});

describe("startOfMonth", () => {
  it("returns 1st day at midnight", () => {
    const d = new Date(2026, 1, 15); // Feb 15
    const result = startOfMonth(d);
    expect(result.getDate()).toBe(1);
    expect(result.getMonth()).toBe(1);
    expect(result.getHours()).toBe(0);
  });
});

describe("endOfMonth", () => {
  it("returns last day at 23:59:59.999", () => {
    const d = new Date(2026, 1, 15); // Feb 2026 (28 days)
    const result = endOfMonth(d);
    expect(result.getDate()).toBe(28);
    expect(result.getMonth()).toBe(1);
    expect(result.getHours()).toBe(23);
  });

  it("handles leap year February", () => {
    const d = new Date(2024, 1, 15); // Feb 2024 (29 days)
    const result = endOfMonth(d);
    expect(result.getDate()).toBe(29);
  });
});

describe("startOfYear", () => {
  it("returns Jan 1 at midnight", () => {
    const d = new Date(2026, 5, 15);
    const result = startOfYear(d);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(1);
    expect(result.getHours()).toBe(0);
  });
});

describe("endOfYear", () => {
  it("returns Dec 31 at 23:59:59.999", () => {
    const d = new Date(2026, 5, 15);
    const result = endOfYear(d);
    expect(result.getMonth()).toBe(11);
    expect(result.getDate()).toBe(31);
    expect(result.getHours()).toBe(23);
  });
});
