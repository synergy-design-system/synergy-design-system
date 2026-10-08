import { getBasic } from 'temporal-polyfill/fns/Calendar';
import { plainDateISO } from 'temporal-polyfill/fns/Now';
import {
  addDays,
  compare,
  create,
  createFormat,
  dayOfWeek,
  endOfMonth,
  endOfYear,
  equals,
  fromString,
  toString,
} from 'temporal-polyfill/fns/PlainDate';

import type {
  CalendarDate,
  CalendarDateComparison,
  CalendarDayOffset,
  NullableCalendarDate,
  OptionalCalendarDate,
  WeekdayIndex,
} from './internal-types.js';
import type { CalendarDateDisabledPredicate, CalendarSelectionMode, CalendarWeekday } from './types.js';

export const today: () => CalendarDate = plainDateISO;

const ISO_WEEKDAYS: readonly CalendarWeekday[] = [
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
  'sun',
];

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const MAX_CUSTOM_SEARCH_DAYS = 366;

// Creating Intl instances is expensive and the results only depend on the cache key,
// so they are memoized for the lifetime of the module.
const firstDayOfWeekCache = new Map<string, WeekdayIndex>();
const weekdayNameCache = new Map<string, readonly string[]>();
const monthNameCache = new Map<string, readonly string[]>();

/**
 * Serializes a date-only value into an ISO `YYYY-MM-DD` string.
 * @param date The date to serialize
 * @returns The ISO string or an empty string for invalid dates
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

export const toNativeDate = (date: CalendarDate) => {
  const nativeDate = new Date(0);
  nativeDate.setUTCFullYear(date.year, date.month - 1, date.day);
  return nativeDate;
};

export const fromNativeDate = (date: Date): NullableCalendarDate => {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return null;
  }

  const year = date.getUTCFullYear();

  return year >= 0 && year <= 9999
    ? create(year, date.getUTCMonth() + 1, date.getUTCDate())
    : null;
};

export const parseCalendarValue = (value: string | null) => {
  const dates = (value ?? '').trim().split(/\s+/).filter(Boolean);

  if (dates.some(date => !parseIsoDate(date))) {
    return [];
  }

  return dates.sort();
};

export const parseCalendarSelectionMode = (value: string | null): CalendarSelectionMode => (
  value === 'range' || value === 'multiple' ? value : 'single'
);

export const areCalendarValuesEqual = (a: readonly string[], b: readonly string[]) => (
  a.length === b.length && a.every((value, index) => value === b[index])
);

export const parseDisabledDates = (value: string | null) => {
  const dates = new Set<string>();

  (value ?? '').trim().split(/\s+/).forEach(token => {
    const date = parseIsoDate(token);

    if (date) {
      dates.add(toIsoDate(date));
    }
  });

  return [...dates];
};

export const parseDisabledWeekdays = (value: string | null) => {
  const validWeekdays = new Set<string>(ISO_WEEKDAYS);
  const weekdays = new Set<CalendarWeekday>();

  (value ?? '').trim().toLowerCase().split(/\s+/).forEach(token => {
    if (validWeekdays.has(token)) {
      weekdays.add(token as CalendarWeekday);
    }
  });

  return [...weekdays];
};

export const normalizeCalendarValue = (
  values: readonly string[],
  mode: CalendarSelectionMode,
  previousMode: CalendarSelectionMode = mode,
) => {
  const selectionMode = mode === 'range' || mode === 'multiple' ? mode : 'single';
  const validDates = values.filter(value => !!parseIsoDate(value)).sort();

  if (selectionMode === 'single') {
    return [...new Set(validDates)].slice(0, 1);
  }

  if (selectionMode === 'range') {
    return validDates.length <= 2
      ? validDates
      : [validDates[0], validDates[validDates.length - 1]];
  }

  const uniqueDates = [...new Set(validDates)];

  if (previousMode === 'range' && validDates.length === 2) {
    const expandedDates: string[] = [];
    const start = parseIsoDate(validDates[0])!;
    const end = parseIsoDate(validDates[1])!;

    for (let date = start; compare(date, end) <= 0; date = addDays(date, 1)) {
      expandedDates.push(toIsoDate(date));
    }

    return expandedDates;
  }

  return uniqueDates;
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
 * Restricts a date to the given boundaries.
 * @param date The date to clamp
 * @param min The lower boundary or null for no boundary
 * @param max The upper boundary or null for no boundary
 * @returns The clamped date
 */
export const clampDate = (date: CalendarDate, min?: NullableCalendarDate, max?: NullableCalendarDate) => {
  if (min && compare(date, min) < 0) {
    return min;
  }

  if (max && compare(date, max) > 0) {
    return max;
  }

  return date;
};

/**
 * Checks if a date lies within the given boundaries.
 * @param date The date to check
 * @param min The lower boundary or null for no boundary
 * @param max The upper boundary or null for no boundary
 * @returns True if the date is within the boundaries
 */
export const isDateInRange = (date: CalendarDate, min?: NullableCalendarDate, max?: NullableCalendarDate) => (
  (!min || !max || compare(min, max) <= 0)
  && (!min || compare(date, min) >= 0)
  && (!max || compare(date, max) <= 0)
);

/** A date is disabled when any declarative constraint or custom rule matches it. */
export const isDateDisabled = (
  date: CalendarDate,
  min?: NullableCalendarDate,
  max?: NullableCalendarDate,
  disabledDates: readonly string[] = [],
  disabledWeekdays: readonly CalendarWeekday[] = [],
  customIsDateDisabled?: CalendarDateDisabledPredicate,
) => (
  !isDateInRange(date, min, max)
  || disabledDates.includes(toIsoDate(date))
  || disabledWeekdays.includes(ISO_WEEKDAYS[dayOfWeek(date) - 1])
  || !!customIsDateDisabled?.(toNativeDate(date))
);

export const getFirstSelectableDateInRange = (
  start: CalendarDate,
  end: CalendarDate,
  min?: NullableCalendarDate,
  max?: NullableCalendarDate,
  disabledDates: readonly string[] = [],
  disabledWeekdays: readonly CalendarWeekday[] = [],
  customIsDateDisabled?: CalendarDateDisabledPredicate,
) => {
  for (let date = start; compare(date, end) <= 0; date = addDays(date, 1)) {
    if (!isDateDisabled(date, min, max, disabledDates, disabledWeekdays, customIsDateDisabled)) {
      return date;
    }
  }

  return null;
};

export const hasSelectableDateInRange = (
  start: CalendarDate,
  end: CalendarDate,
  min?: NullableCalendarDate,
  max?: NullableCalendarDate,
  disabledDates: readonly string[] = [],
  disabledWeekdays: readonly CalendarWeekday[] = [],
  customIsDateDisabled?: CalendarDateDisabledPredicate,
) => !!getFirstSelectableDateInRange(
  start,
  end,
  min,
  max,
  disabledDates,
  disabledWeekdays,
  customIsDateDisabled,
);

export const isMonthInRange = (
  year: number,
  month: number,
  min?: NullableCalendarDate,
  max?: NullableCalendarDate,
  disabledDates: readonly string[] = [],
  disabledWeekdays: readonly CalendarWeekday[] = [],
  customIsDateDisabled?: CalendarDateDisabledPredicate,
) => hasSelectableDateInRange(
  create(year, month, 1),
  endOfMonth(create(year, month, 1)),
  min,
  max,
  disabledDates,
  disabledWeekdays,
  customIsDateDisabled,
);

/**
 * Checks whether a year contains at least one date inside the given boundaries.
 * @param year The full year
 * @param min The lower boundary or null for no boundary
 * @param max The upper boundary or null for no boundary
 * @returns True if at least one day in the year is in range
 */
export const isYearInRange = (
  year: number,
  min?: NullableCalendarDate,
  max?: NullableCalendarDate,
  disabledDates: readonly string[] = [],
  disabledWeekdays: readonly CalendarWeekday[] = [],
  customIsDateDisabled?: CalendarDateDisabledPredicate,
) => hasSelectableDateInRange(
  create(year, 1, 1),
  endOfYear(create(year, 1, 1)),
  min,
  max,
  disabledDates,
  disabledWeekdays,
  customIsDateDisabled,
);

/**
 * Clamps a date to the nearest boundary, or returns null when the range is empty.
 * @param date The date to clamp
 * @param min The lower boundary or null for no boundary
 * @param max The upper boundary or null for no boundary
 * @returns The nearest in-range date, or null if no dates are selectable
 */
export const getNearestSelectableDate = (
  date: CalendarDate,
  min?: NullableCalendarDate,
  max?: NullableCalendarDate,
  disabledDates: readonly string[] = [],
  disabledWeekdays: readonly CalendarWeekday[] = [],
  customIsDateDisabled?: CalendarDateDisabledPredicate,
) => {
  const start = clampDate(date, min, max);

  if (!isDateInRange(start, min, max) || disabledWeekdays.length === ISO_WEEKDAYS.length) {
    return null;
  }

  const maxDistance = customIsDateDisabled
    ? MAX_CUSTOM_SEARCH_DAYS
    : (disabledDates.length + 1) * 7;

  for (let index = 0; index <= maxDistance * 2; index += 1) {
    const distance = Math.ceil(index / 2) * (index % 2 === 0 ? -1 : 1);
    const candidate = addDays(start, distance);

    if (!isDateDisabled(candidate, min, max, disabledDates, disabledWeekdays, customIsDateDisabled)) {
      return candidate;
    }
  }

  return null;
};

const findSelectableDateInDirection = (
  date: CalendarDate,
  direction: number,
  step: number,
  attempts: number,
  min: NullableCalendarDate,
  max: NullableCalendarDate,
  disabledDates: readonly string[],
  disabledWeekdays: readonly CalendarWeekday[],
  customIsDateDisabled?: CalendarDateDisabledPredicate,
) => {
  let candidate = date;

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    candidate = addDays(candidate, direction * step);
    const boundedCandidate = clampDate(candidate, min, max);

    if (equals(boundedCandidate, date)) {
      return null;
    }

    if (!isDateDisabled(boundedCandidate, min, max, disabledDates, disabledWeekdays, customIsDateDisabled)) {
      return boundedCandidate;
    }

    if (!equals(boundedCandidate, candidate)) {
      return null;
    }
  }

  return null;
};

export const getNextSelectableDate = (
  date: CalendarDate,
  offset: CalendarDayOffset,
  min: NullableCalendarDate,
  max: NullableCalendarDate,
  disabledDates: readonly string[],
  disabledWeekdays: readonly CalendarWeekday[],
  customIsDateDisabled?: CalendarDateDisabledPredicate,
) => {
  if ((min && max && compare(min, max) > 0)
    || disabledWeekdays.length === ISO_WEEKDAYS.length) {
    return null;
  }

  const direction = Math.sign(offset);
  const step = Math.abs(offset);
  const attempts = customIsDateDisabled
    ? Math.floor(MAX_CUSTOM_SEARCH_DAYS / step)
    : disabledDates.length + 8;
  const dateAtStep = findSelectableDateInDirection(
    date,
    direction,
    step,
    attempts,
    min,
    max,
    disabledDates,
    disabledWeekdays,
    customIsDateDisabled,
  );

  return dateAtStep ?? (step === 1 ? null : findSelectableDateInDirection(
    date,
    direction,
    1,
    customIsDateDisabled ? MAX_CUSTOM_SEARCH_DAYS : attempts,
    min,
    max,
    disabledDates,
    disabledWeekdays,
    customIsDateDisabled,
  ));
};

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

  const formatter = createFormat(locale, { weekday: format });

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

  const formatter = createFormat(locale, { month: format });
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

/**
 * Gets the first year of the decade a date belongs to, used by the year view.
 * @param year The full year
 * @param size The amount of years shown at once
 * @returns The first year of the block
 */
export const getYearBlockStart = (year: number, size = 12) => Math.floor(year / size) * size;
