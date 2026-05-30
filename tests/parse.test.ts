import { describe, it, expect } from "vitest";
import { format } from "../src/format";
import { parse } from "../src/parse";

describe("parse round-trip", () => {
	it("round-trips with format for yyyy-MM-dd", () => {
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
