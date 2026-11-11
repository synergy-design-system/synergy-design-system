import { getBasic } from 'temporal-polyfill/fns/Calendar';
import { plainDateISO } from 'temporal-polyfill/fns/Now';
import {
  addDays, create, createFormat, dayOfWeek, equals, fromString, toString,
} from 'temporal-polyfill/fns/PlainDate';
import type {
  CalendarDate, CalendarDateComparison, NullableCalendarDate, OptionalCalendarDate, WeekdayIndex,
} from '../internal-types.js';

/** Returns today's ISO date in the user's local timezone, without storing a time or timezone. */
export const today: () => CalendarDate = plainDateISO;

/** First date representable by the public four-digit ISO format. */
export const MIN_CALENDAR_DATE = create(0, 1, 1);

/** Last date representable by the public four-digit ISO format. */
export const MAX_CALENDAR_DATE = create(9999, 12, 31);

/** Resolves valid regional locale tags and falls back to English for malformed tags. */
export const resolveCalendarLocale = (locale: string) => {
  try {
    return Intl.getCanonicalLocales(locale.replace(/_/g, '-'))[0] ?? 'en';
  } catch (error) {
    // A malformed locale must not break rendering, but unrelated programming errors should remain visible.
    if (error instanceof RangeError) {
      return 'en';
    }
    throw error;
  }
};

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

// Creating Intl instances is expensive and the results only depend on the cache key,
// so they are memoized for the lifetime of the module.
const firstDayOfWeekCache = new Map<string, WeekdayIndex>();

const weekdayNameCache = new Map<string, readonly string[]>();

const monthNameCache = new Map<string, readonly string[]>();

/**
 * Serializes a date-only value into an ISO `YYYY-MM-DD` string.
 * @param date The date to serialize
 * @returns The ISO string, or an empty string when the date is absent
 */
export const toIsoDate = (date: OptionalCalendarDate) => (date ? toString(date) : '');

/**
 * Parses an ISO `YYYY-MM-DD` string into a date-only value.
 * Rejects overflowing input like `2024-02-31` instead of silently normalizing it.
 * @param value The string to parse
 * @returns The parsed date or null if the input is not a valid ISO date
 */
export const parseIsoDate = (value: string | null | undefined) => {
  if (!value || !ISO_DATE_PATTERN.test(value)) {
    return null;
  }

  try {
    return fromString(value, getBasic);
  } catch {
    return null;
  }
};

/** Converts a date-only record to UTC midnight, preserving years below 100 without Date.UTC remapping. */
export const toNativeDate = (date: CalendarDate) => {
  const nativeDate = new Date(0);
  nativeDate.setUTCFullYear(date.year, date.month - 1, date.day);
  return nativeDate;
};

/** Reads native UTC date fields; invalid Dates or years outside the four-digit ISO domain return null. */
export const fromNativeDate = (date: Date): NullableCalendarDate => {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return null;
  }

  const year = date.getUTCFullYear();

  return year >= 0 && year <= 9999
    ? create(year, date.getUTCMonth() + 1, date.getUTCDate())
    : null;
};

/**
 * Checks if two dates describe the same day.
 * @param firstDate The first date
 * @param secondDate The second date
 * @returns True if both dates are the same day
 */
export const isSameDay: CalendarDateComparison = (firstDate, secondDate) => (
  !!firstDate && !!secondDate && equals(firstDate, secondDate)
);

/**
 * Checks if two dates are in the same month of the same year.
 * @param firstDate The first date
 * @param secondDate The second date
 * @returns True if both dates share month and year
 */
export const isSameMonth: CalendarDateComparison = (firstDate, secondDate) => (
  !!firstDate && !!secondDate
  && firstDate.year === secondDate.year && firstDate.month === secondDate.month
);

/**
 * Gets the first day of the week for the given locale.
 * Falls back to Monday when `Intl.Locale#getWeekInfo` is not supported.
 * @param locale The locale to look up
 * @returns The weekday the calendar should start with
 */
export const getFirstDayOfWeek = (locale: string): WeekdayIndex => {
  const cached = firstDayOfWeekCache.get(locale);

  if (typeof cached !== 'undefined') {
    return cached;
  }

  let firstDayOfWeek: WeekdayIndex = 1;

  try {
    const resolved = new Intl.Locale(locale) as Intl.Locale & {
      getWeekInfo?: () => { firstDay: number };
      weekInfo?: { firstDay: number };
    };

    // Firefox exposed this as a property before it was specified as a method
    const weekInfo = resolved.getWeekInfo?.() ?? resolved.weekInfo;

    // getWeekInfo() counts Monday as 1 and Sunday as 7
    if (weekInfo) {
      firstDayOfWeek = weekInfo.firstDay as WeekdayIndex;
    }
  } catch {
    firstDayOfWeek = 1;
  }

  firstDayOfWeekCache.set(locale, firstDayOfWeek);

  return firstDayOfWeek;
};

/**
 * Creates the days shown in the day view, including the leading and trailing days
 * of the adjacent months. Always returns six weeks so the calendar keeps a stable height.
 * @param year The full year
 * @param month The one based month
 * @param firstDayOfWeek The weekday the calendar starts with
 * @returns Six weeks of seven days each
 */
export const getCalendarWeeks = (
  year: number,
  month: number,
  firstDayOfWeek: WeekdayIndex = 1,
) => {
  const firstOfMonth = create(year, month, 1);
  const offset = (dayOfWeek(firstOfMonth) - firstDayOfWeek + 7) % 7;
  const start = addDays(firstOfMonth, -offset);

  return Array.from({ length: 6 }, (_, week) => Array.from(
    { length: 7 },
    (__, day) => addDays(start, week * 7 + day),
  ));
};

/**
 * Gets the localized weekday names, ordered to match the calendar.
 * @param locale The locale to format with
 * @param firstDayOfWeek The weekday the calendar starts with
 * @param format The width of the returned names
 * @returns The weekday names, starting with `firstDayOfWeek`
 */
export const getWeekdayNames = (
  locale: string,
  firstDayOfWeek: WeekdayIndex = 1,
  format: Intl.DateTimeFormatOptions['weekday'] = 'short',
): readonly string[] => {
  const cacheKey = `${locale}|${firstDayOfWeek}|${format}`;
  const cached = weekdayNameCache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const formatter = createFormat(resolveCalendarLocale(locale), { weekday: format });

  const names = Object.freeze(Array.from({ length: 7 }, (_, index) => formatter.format(
    addDays(create(2024, 1, 1), (firstDayOfWeek - 1 + index) % 7),
  )));

  weekdayNameCache.set(cacheKey, names);

  return names;
};

/**
 * Gets the localized month names, ordered from January to December.
 * @param locale The locale to format with
 * @param format The width of the returned names
 * @returns The month names
 */
export const getMonthNames = (
  locale: string,
  format: Intl.DateTimeFormatOptions['month'] = 'long',
): readonly string[] => {
  const cacheKey = `${locale}|${format}`;
  const cached = monthNameCache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const formatter = createFormat(resolveCalendarLocale(locale), { month: format });
  const names = Object.freeze(
    Array.from({ length: 12 }, (_, month) => formatter.format(create(2024, month + 1, 1))),
  );

  monthNameCache.set(cacheKey, names);

  return names;
};

/**
 * Returns the name of the month for the given date.
 * @param date The date for which to get the month name
 * @param locale The locale to format with
 * @returns The full name of the month (e.g., "January")
 */
export const getMonthLabel = (date: CalendarDate, locale: string) => (
  getMonthNames(locale, 'long')[date.month - 1]
);
