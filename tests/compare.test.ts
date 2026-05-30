import { describe, it, expect } from "vitest";
import { isBefore, isAfter, isEqual, isSameDay, isSameMonth } from "../src/compare";

describe("isBefore", () => {
  it("returns true when left is before right", () => {
    expect(isBefore(new Date(2026, 0, 1), new Date(2026, 0, 2))).toBe(true);
  });
  it("returns false when left is after right", () => {
    expect(isBefore(new Date(2026, 0, 2), new Date(2026, 0, 1))).toBe(false);
  });
  it("returns false for same millisecond", () => {
    const d = new Date(2026, 0, 1);
    expect(isBefore(d, new Date(d.getTime()))).toBe(false);
  });
});

describe("isAfter", () => {
  it("returns true when left is after right", () => {
    expect(isAfter(new Date(2026, 0, 2), new Date(2026, 0, 1))).toBe(true);
  });
});

describe("isEqual", () => {
  it("returns true for same millisecond", () => {
    const d = new Date(2026, 0, 1, 12, 30);
    expect(isEqual(d, new Date(d.getTime()))).toBe(true);
  });
  it("returns false for 1ms difference", () => {
    const d = new Date(2026, 0, 1);
    expect(isEqual(d, new Date(d.getTime() + 1))).toBe(false);
  });
});

describe("isSameDay", () => {
  it("returns true for same calendar day", () => {
    const a = new Date(2026, 0, 15, 0, 0, 0);
    const b = new Date(2026, 0, 15, 23, 59, 59);
    expect(isSameDay(a, b)).toBe(true);
  });
  it("returns false for different days", () => {
    const a = new Date(2026, 0, 15, 23, 59, 59);
    const b = new Date(2026, 0, 16, 0, 0, 0);
    expect(isSameDay(a, b)).toBe(false);
  });
});

describe("isSameMonth", () => {
  it("returns true for same month different days", () => {
    const a = new Date(2026, 0, 1);
    const b = new Date(2026, 0, 31);
    expect(isSameMonth(a, b)).toBe(true);
  });
  it("returns false for different months", () => {
    const a = new Date(2026, 0, 31);
    const b = new Date(2026, 1, 1);
    expect(isSameMonth(a, b)).toBe(false);
  });
});
