import { describe, it, expect } from "vitest";
import {
  addDays,
  addMonths,
  addYears,
  addHours,
  addMinutes,
  addSeconds,
  subDays,
  subMonths,
  subYears,
  subHours,
  subMinutes,
  subSeconds,
} from "../src/add";

describe("addDays", () => {
  const base = new Date(2026, 0, 15);
  it("adds days correctly", () => {
    expect(addDays(base, 5).getDate()).toBe(20);
  });
  it("handles negative amounts", () => {
    expect(addDays(base, -2).getDate()).toBe(13);
  });
  it("preserves time-of-day across day boundaries", () => {
    const withTime = new Date(2026, 0, 15, 14, 30, 0);
    const result = addDays(withTime, 1);
    expect(result.getHours()).toBe(14);
    expect(result.getMinutes()).toBe(30);
  });
});

describe("addMonths", () => {
  it("clamps to max days in target month", () => {
    const result = addMonths(new Date(2026, 0, 31), 1);
    expect(result.getMonth()).toBe(1);
    expect(result.getDate()).toBe(28);
  });
  it("works for leap year February", () => {
    const result = addMonths(new Date(2024, 0, 31), 1);
    expect(result.getMonth()).toBe(1);
    expect(result.getDate()).toBe(29);
  });
  it("transitions across years", () => {
    const result = addMonths(new Date(2026, 10, 15), 3);
    expect(result.getMonth()).toBe(1);
    expect(result.getDate()).toBe(15);
  });
  it("handles negative amounts", () => {
    const result = addMonths(new Date(2026, 2, 31), -1);
    expect(result.getMonth()).toBe(1);
    expect(result.getDate()).toBe(28);
  });
});

describe("addYears", () => {
  it("handles leap year → non-leap year (Feb 29 → Feb 28)", () => {
    const result = addYears(new Date(2024, 1, 29), 1);
    expect(result.getMonth()).toBe(1);
    expect(result.getDate()).toBe(28);
  });
  it("adds years normally", () => {
    const result = addYears(new Date(2026, 0, 15), 2);
    expect(result.getFullYear()).toBe(2028);
  });
});

describe("addHours / addMinutes / addSeconds", () => {
  const base = new Date(2026, 0, 15, 12, 0, 0);
  it("addHours", () => {
    expect(addHours(base, 3).getHours()).toBe(15);
  });
  it("addMinutes", () => {
    const result = addMinutes(base, 90);
    expect(result.getHours()).toBe(13);
    expect(result.getMinutes()).toBe(30);
  });
  it("addSeconds", () => {
    expect(addSeconds(base, 30).getSeconds()).toBe(30);
  });
});

describe("sub functions", () => {
  it("subDays", () => {
    expect(subDays(new Date(2026, 0, 15), 2).getDate()).toBe(13);
  });
  it("subMonths", () => {
    expect(subMonths(new Date(2026, 4, 15), 2).getMonth()).toBe(2);
  });
  it("subYears", () => {
    expect(subYears(new Date(2026, 0, 1), 1).getFullYear()).toBe(2025);
  });
  it("subHours", () => {
    expect(subHours(new Date(2026, 0, 15, 12), 3).getHours()).toBe(9);
  });
  it("subMinutes", () => {
    expect(subMinutes(new Date(2026, 0, 15, 12, 30), 30).getMinutes()).toBe(0);
  });
  it("subSeconds", () => {
    expect(subSeconds(new Date(2026, 0, 15, 12, 0, 45), 30).getSeconds()).toBe(15);
  });
});

describe("immutability", () => {
  it("addDays does not mutate input", () => {
    const original = new Date(2026, 0, 15);
    const originalTime = original.getTime();
    addDays(original, 5);
    expect(original.getTime()).toBe(originalTime);
  });
  it("addMonths does not mutate input", () => {
    const original = new Date(2026, 0, 31);
    const originalTime = original.getTime();
    addMonths(original, 1);
    expect(original.getTime()).toBe(originalTime);
  });
  it("addYears does not mutate input", () => {
    const original = new Date(2024, 1, 29);
    const originalTime = original.getTime();
    addYears(original, 1);
    expect(original.getTime()).toBe(originalTime);
  });
});
