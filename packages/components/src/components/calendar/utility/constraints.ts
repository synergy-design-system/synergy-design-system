import {
  addDays, compare, create, dayOfWeek, endOfMonth, endOfYear, equals,
} from 'temporal-polyfill/fns/PlainDate';
import type {
  CalendarConstraints, CalendarDate, CalendarDayOffset, NullableCalendarDate, PreparedCalendarConstraints,
} from '../internal-types.js';
import type { CalendarDateDisabledPredicate, CalendarWeekday } from '../types.js';
import {
  MAX_CALENDAR_DATE, MIN_CALENDAR_DATE, parseIsoDate, toIsoDate, toNativeDate,
} from './date.js';

const ISO_WEEKDAYS: readonly CalendarWeekday[] = [
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
  'sun',
];

const MAX_CUSTOM_SEARCH_DAYS = 366;

const reportedPredicates = new WeakSet<CalendarDateDisabledPredicate>();

// Each action/render prepares a fresh object, keeping availability reuse local to that constraint snapshot.
const periodAvailability = new WeakMap<PreparedCalendarConstraints, Map<string, boolean>>();

const isDisabledByPredicate = (date: CalendarDate, predicate?: CalendarDateDisabledPredicate) => {
  if (!predicate) {
    return false;
  }

  try {
    return !!predicate(toNativeDate(date));
  } catch (error) {
    // Fail closed for this date, but rate-limit diagnostics without caching the failed eligibility result.
    if (!reportedPredicates.has(predicate)) {
      reportedPredicates.add(predicate);
      console.warn('Synergy calendar: isDateDisabled threw; the affected date is unavailable.', error);
    }
    return true;
  }
};

/** Parses a whitespace-separated disabled-date attribute, ignoring malformed dates and duplicates. */
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

/** Parses case-insensitive weekday names, discarding unsupported tokens and duplicate entries. */
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

/**
 * Restricts a date to the given boundaries.
 * @param date The date to clamp
 * @param min The lower boundary or null for no boundary
 * @param max The upper boundary or null for no boundary
 * @returns The clamped date
 */
export const clampDate = (date: CalendarDate, min?: NullableCalendarDate, max?: NullableCalendarDate) => {
  let bounded = date;
  if (compare(date, MIN_CALENDAR_DATE) < 0) {
    bounded = MIN_CALENDAR_DATE;
  }
  if (compare(date, MAX_CALENDAR_DATE) > 0) {
    bounded = MAX_CALENDAR_DATE;
  }
  if (min && compare(bounded, min) < 0) {
    return min;
  }

  if (max && compare(bounded, max) > 0) {
    return max;
  }

  return bounded;
};

/**
 * Checks if a date lies within the given boundaries.
 * @param date The date to check
 * @param min The lower boundary or null for no boundary
 * @param max The upper boundary or null for no boundary
 * @returns True if the date is within the boundaries
 */
export const isDateInRange = (date: CalendarDate, min?: NullableCalendarDate, max?: NullableCalendarDate) => (
  date.year >= 0 && date.year <= 9999
  && (!min || !max || compare(min, max) <= 0)
  && (!min || compare(date, min) >= 0)
  && (!max || compare(date, max) <= 0)
);

/** A date is disabled when any declarative constraint or custom rule matches it. */
export const isDateDisabled = (date: CalendarDate, constraints: PreparedCalendarConstraints) => (
  !isDateInRange(date, constraints.min, constraints.max)
  || constraints.disabledDateSet.has(toIsoDate(date))
  || constraints.disabledWeekdaySet.has(ISO_WEEKDAYS[dayOfWeek(date) - 1])
  || isDisabledByPredicate(date, constraints.isDateDisabled)
);

/** Prepares a fresh constraint snapshot without caching mutable caller data or callback results. */
export const prepareCalendarConstraints = (constraints: CalendarConstraints): PreparedCalendarConstraints => ({
  ...constraints,
  disabledDateSet: new Set(constraints.disabledDates),
  disabledWeekdaySet: new Set(constraints.disabledWeekdays),
});

/** Finds the first date satisfying all rules within an inclusive finite period, or returns null. */
export const getFirstSelectableDateInRange = (
  start: CalendarDate,
  end: CalendarDate,
  constraints: PreparedCalendarConstraints,
) => {
  if (constraints.disabledWeekdaySet.size === ISO_WEEKDAYS.length) {
    return null;
  }
  const first = clampDate(start, constraints.min, constraints.max);
  const last = clampDate(end, constraints.min, constraints.max);
  // Clamping an entirely excluded period can land on a boundary outside that period; it is still unavailable.
  if (compare(first, end) > 0 || compare(last, start) < 0 || !isDateInRange(first, constraints.min, constraints.max)) {
    return null;
  }
  for (let date = first; compare(date, last) <= 0; date = addDays(date, 1)) {
    if (!isDateDisabled(date, constraints)) {
      return date;
    }
  }

  return null;
};

/** Checks whether an inclusive finite period contains any date satisfying every selectability rule. */
export const hasSelectableDateInRange = (
  start: CalendarDate,
  end: CalendarDate,
  constraints: PreparedCalendarConstraints,
) => {
  let cache = periodAvailability.get(constraints);
  if (!cache) {
    cache = new Map<string, boolean>();
    periodAvailability.set(constraints, cache);
  }
  const key = `${toIsoDate(start)}|${toIsoDate(end)}`;
  const cached = cache.get(key);
  if (cached !== undefined) {
    return cached;
  }
  const available = !!getFirstSelectableDateInRange(start, end, constraints);
  cache.set(key, available);
  return available;
};

/** Checks availability anywhere in a calendar month (1-12), including disabled and custom rules. */
export const isMonthInRange = (
  year: number,
  month: number,
  constraints: PreparedCalendarConstraints,
) => year >= 0 && year <= 9999 && hasSelectableDateInRange(
  create(year, month, 1),
  endOfMonth(create(year, month, 1)),
  constraints,
);

/**
 * Checks whether a year contains at least one selectable date under all date constraints.
 * @param year The full year
 * @param constraints The prepared date bounds, disabled rules, and optional custom predicate
 * @returns True if at least one day in the year is selectable
 */
export const isYearInRange = (
  year: number,
  constraints: PreparedCalendarConstraints,
) => year >= 0 && year <= 9999 && hasSelectableDateInRange(
  create(year, 1, 1),
  endOfYear(create(year, 1, 1)),
  constraints,
);

/**
 * Searches from the boundary-clamped date, checking later dates before equally distant earlier dates.
 * Custom rules limit lookahead to 366 days per direction; declarative-only searches derive it from disabled dates.
 * @param date The date to clamp
 * @param constraints The prepared date bounds, disabled rules, and optional custom predicate
 * @returns The nearest selectable date found, or null when the search window has none
 */
export const getNearestSelectableDate = (
  date: CalendarDate,
  constraints: PreparedCalendarConstraints,
) => {
  const {
    disabledDates, isDateDisabled: customIsDateDisabled, max, min,
  } = constraints;
  const start = clampDate(date, min, max);

  if (!isDateInRange(start, min, max) || constraints.disabledWeekdaySet.size === ISO_WEEKDAYS.length) {
    return null;
  }

  const maxDistance = customIsDateDisabled
    ? MAX_CUSTOM_SEARCH_DAYS
    : (disabledDates.length + 1) * 7;

  for (let index = 0; index <= maxDistance * 2; index += 1) {
    const distance = Math.ceil(index / 2) * (index % 2 === 0 ? -1 : 1);
    const candidate = addDays(start, distance);

    if (!isDateDisabled(candidate, constraints)) {
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
  constraints: PreparedCalendarConstraints,
) => {
  let candidate = date;

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    candidate = addDays(candidate, direction * step);
    const boundedCandidate = clampDate(candidate, constraints.min, constraints.max);

    if (equals(boundedCandidate, date)) {
      return null;
    }

    if (!isDateDisabled(boundedCandidate, constraints)) {
      return boundedCandidate;
    }

    if (!equals(boundedCandidate, candidate)) {
      return null;
    }
  }

  return null;
};

/**
 * Finds the next selectable keyboard target in the requested direction, respecting date bounds.
 * Week-sized movement tries matching weekdays first, then falls back to daily steps.
 * Custom rules cap search distance at 366 days; returns null if no target is found.
 */
export const getNextSelectableDate = (
  date: CalendarDate,
  offset: CalendarDayOffset,
  constraints: PreparedCalendarConstraints,
) => {
  const {
    disabledDates, isDateDisabled: customIsDateDisabled, max, min,
  } = constraints;
  if ((min && max && compare(min, max) > 0)
    || constraints.disabledWeekdaySet.size === ISO_WEEKDAYS.length) {
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
    constraints,
  );

  return dateAtStep ?? (step === 1 ? null : findSelectableDateInDirection(
    date,
    direction,
    1,
    customIsDateDisabled ? MAX_CUSTOM_SEARCH_DAYS : attempts,
    constraints,
  ));
};
