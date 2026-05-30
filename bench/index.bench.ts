import { describe, bench } from "vitest";
import {
	format,
	parseISO,
	addDays,
	addMonths,
	differenceInDays,
	isBefore,
	startOfDay,
} from "../src/index";

const date = new Date(2026, 0, 15, 14, 30, 45, 123);

describe("format", () => {
	bench("format yyyy-MM-dd HH:mm:ss", () => {
		format(date, "yyyy-MM-dd HH:mm:ss");
	});

	bench("format full with weekday", () => {
		format(date, "EEEE, yyyy-MM-dd HH:mm:ss.SSS");
	});
});

describe("parse", () => {
	bench("parseISO", () => {
		parseISO("2026-01-15T10:30:00");
	});
});

describe("add", () => {
	bench("addDays", () => {
		addDays(date, 30);
	});

	bench("addMonths", () => {
		addMonths(date, 3);
	});
});

describe("diff", () => {
	const other = new Date(2026, 1, 15);
	bench("differenceInDays", () => {
		differenceInDays(other, date);
	});
});

describe("compare", () => {
	bench("isBefore", () => {
		isBefore(date, new Date());
	});
});

describe("startEnd", () => {
	bench("startOfDay", () => {
		startOfDay(date);
	});
});
