import { describe, it, expect } from "vitest";
import { format } from "../src/format";
import { parseISO, parse } from "../src/parse";

describe("parse — error paths", () => {
	it("parseISO throws on non-ISO string", () => {
		expect(() => parseISO("not-a-date")).toThrow(RangeError);
	});

	it("parseISO handles valid ISO date (JS auto-rolls Feb 30 → Mar)", () => {
		const d = parseISO("2026-02-30");
		expect(d.getMonth()).toBe(2); // rolled to March
	});

	it("parseISO parses date without time", () => {
		const d = parseISO("2026-01-15");
		expect(d.getFullYear()).toBe(2026);
		expect(d.getMonth()).toBe(0);
		expect(d.getDate()).toBe(15);
	});

	it("parseISO parses ISO with time", () => {
		const d = parseISO("2026-01-15T10:30:00");
		expect(d.getHours()).toBe(10);
		expect(d.getMinutes()).toBe(30);
	});

	it("parseISO parses UTC (Z) time", () => {
		const d = parseISO("2026-01-15T10:30:00Z");
		expect(d.getUTCHours()).toBe(10);
		expect(d.getUTCMinutes()).toBe(30);
	});

	it("parse throws on mismatched literal characters", () => {
		expect(() => parse("2026-01-15", "yyyy/MM/dd")).toThrow(RangeError);
	});

	it("parse throws on unexpected end of input", () => {
		expect(() => parse("2026-01", "yyyy-MM-dd")).toThrow(RangeError);
	});

	it("parse with dd/MM/yyyy format", () => {
		const d = parse("15/01/2026", "dd/MM/yyyy");
		expect(d.getFullYear()).toBe(2026);
		expect(d.getMonth()).toBe(0);
		expect(d.getDate()).toBe(15);
	});

	it("parse with time components", () => {
		const d = parse("2026-01-15 14:30:45", "yyyy-MM-dd HH:mm:ss");
		expect(d.getHours()).toBe(14);
		expect(d.getMinutes()).toBe(30);
		expect(d.getSeconds()).toBe(45);
	});

	it("parse with milliseconds", () => {
		const d = parse("2026-01-15 14:30:45.123", "yyyy-MM-dd HH:mm:ss.SSS");
		expect(d.getMilliseconds()).toBe(123);
	});

	it("parse defaults missing time components to zero", () => {
		const d = parse("2026-01-15", "yyyy-MM-dd");
		expect(d.getHours()).toBe(0);
		expect(d.getMinutes()).toBe(0);
		expect(d.getSeconds()).toBe(0);
	});
});

describe("parse — round-trip with format", () => {
	it("round-trips yyyy-MM-dd HH:mm:ss", () => {
		const original = new Date(2026, 0, 15, 14, 30, 45);
		const pattern = "yyyy-MM-dd HH:mm:ss";
		const formatted = format(original, pattern);
		const parsed = parse(formatted, pattern);
		expect(parsed.getFullYear()).toBe(original.getFullYear());
		expect(parsed.getMonth()).toBe(original.getMonth());
		expect(parsed.getDate()).toBe(original.getDate());
		expect(parsed.getHours()).toBe(original.getHours());
		expect(parsed.getMinutes()).toBe(original.getMinutes());
		expect(parsed.getSeconds()).toBe(original.getSeconds());
	});
});

describe("format — all tokens", () => {
	it("formats yy (2-digit year)", () => {
		const d = new Date(2026, 0, 5);
		expect(format(d, "yy")).toBe("26");
	});

	it("formats unpadded single-digit M and d", () => {
		const d = new Date(2026, 0, 5, 9, 5, 3);
		expect(format(d, "M/d/yyyy")).toBe("1/5/2026");
	});

	it("formats 12h with AM/PM", () => {
		const morning = new Date(2026, 0, 15, 9, 5);
		expect(format(morning, "h:mm a")).toBe("9:05 AM");
		const evening = new Date(2026, 0, 15, 14, 30);
		expect(format(evening, "hh:mm a")).toBe("02:30 PM");
	});

	it("formats midnight as 12 AM", () => {
		expect(format(new Date(2026, 0, 15, 0, 0), "h a")).toBe("12 AM");
	});

	it("formats noon as 12 PM", () => {
		expect(format(new Date(2026, 0, 15, 12, 0), "h a")).toBe("12 PM");
	});

	it("formats weekday EEEE and EEE", () => {
		const d = new Date(2026, 0, 15); // Thursday
		expect(format(d, "EEEE")).toBe("Thursday");
		expect(format(d, "EEE")).toBe("Thu");
	});

	it("formats H (unpadded 24h)", () => {
		const d = new Date(2026, 0, 15, 9, 5, 3);
		expect(format(d, "H:m:s")).toBe("9:5:3");
	});

	it("formats SSS for milliseconds", () => {
		expect(format(new Date(2026, 0, 15, 0, 0, 0, 5), "SSS")).toBe("005");
	});

	it("formats each day of the week", () => {
		// Sunday Jan 4 through Saturday Jan 10 2026
		const days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];
		for (let i = 0; i < 7; i++) {
			const d = new Date(2026, 0, 4 + i);
			expect(format(d, "EEEE")).toBe(days[i]);
		}
	});
});
