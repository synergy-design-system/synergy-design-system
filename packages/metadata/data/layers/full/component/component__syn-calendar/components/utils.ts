/**
 * Calendar helpers for `<syn-date-picker>`.
 *
 * All values are *date-only*: a `Date` created via `Date.UTC` at midnight UTC.
 * Reading them must always use the `getUTC*` getters, never the local ones,
 * otherwise daylight saving transitions can shift a date by a day.
 *
 * Months are zero based, matching the native `Date` API (0 = January).
 *
 * The public API of the component should exchange ISO `YYYY-MM-DD` strings so the
 * internals here can be swapped for `Temporal` once it is part of the browser baseline.
 */

/**
 * Weekday index as used by `Date#getUTCDay()`, where 0 = Sunday and 6 = Saturday.
 */
export type WeekdayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type CalendarWeekday = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

const UTC_WEEKDAYS: readonly CalendarWeekday[] = [
  'sun',
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
];

const MILLISECONDS_PER_DAY = 86400000;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

// Creating Intl instances is expensive and the results only depend on the cache key,
// so they are memoized for the lifetime of the module.
const firstDayOfWeekCache = new Map<string, WeekdayIndex>();
const weekdayNameCache = new Map<string, readonly string[]>();
const monthNameCache = new Map<string, readonly string[]>();

/**
 * Creates a date-only value at midnight UTC.
 * Out of range parts overflow like in the native `Date` constructor,
 * e.g. a day of 0 resolves to the last day of the previous month.
 * @param year The full year
 * @param month The zero based month
 * @param day The day of the month
 * @returns The created date
 */
export const createDate = (year: number, month: number, day: number) => new Date(
  Date.UTC(year, month, day),
);

/**
 * Creates a date-only value for the current day, based on the users local time zone.
 * @returns The current day
 */
export const today = () => {
  const now = new Date();
  return createDate(now.getFullYear(), now.getMonth(), now.getDate());
};

/**
 * Returns the name of the month for the given date.
 * @param date The date for which to get the month name
 * @returns The full name of the month (e.g., "January")
 */
export const getMonthLabel = (date: Date) => {
  const month = date.getUTCMonth();
  const year = date.getUTCFullYear();
  const cacheKey = `${year}-${month}`;

  if (monthNameCache.has(cacheKey)) {
    return monthNameCache.get(cacheKey)![0];
  }

  const formatter = new Intl.DateTimeFormat(undefined, { month: 'long', timeZone: 'UTC' });
  const monthName = formatter.format(createDate(year, month, 1));
  monthNameCache.set(cacheKey, [monthName]);

  return monthName;
};

/**
 * Checks whether a date is usable for further calculations.
 * @param date The date to check
 * @returns True if the given value is a valid date
 */
export const isValidDate = (date: Date | null | undefined): date is Date => (
  date instanceof Date && !Number.isNaN(date.getTime())
);

/**
 * Serializes a date-only value into an ISO `YYYY-MM-DD` string.
 * @param date The date to serialize
 * @returns The ISO string or an empty string for invalid dates
 */
export const toIsoDate = (date: Date | null | undefined) => {
  if (!isValidDate(date)) {
    return '';
  }

  const year = `${date.getUTCFullYear()}`.padStart(4, '0');
  const month = `${date.getUTCMonth() + 1}`.padStart(2, '0');
  const day = `${date.getUTCDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
};

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

  const [year, month, day] = value.split('-').map(Number);
  const date = createDate(year, month - 1, day);

  return toIsoDate(date) === value ? date : null;
};

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
  const validWeekdays = new Set<string>(UTC_WEEKDAYS);
  const weekdays = new Set<CalendarWeekday>();

  (value ?? '').trim().toLowerCase().split(/\s+/).forEach(token => {
    if (validWeekdays.has(token)) {
      weekdays.add(token as CalendarWeekday);
    }
  });

  return [...weekdays];
};

/**
 * Gets the amount of days in the given month.
 * @param year The full year
 * @param month The zero based month
 * @returns The amount of days
 */
export const getDaysInMonth = (year: number, month: number) => createDate(
  year,
  month + 1,
  0,
).getUTCDate();

/**
 * Adds days to a date. Use a negative amount to subtract.
 * @param date The base date
 * @param amount The amount of days to add
 * @returns The resulting date
 */
export const addDays = (date: Date, amount: number) => new Date(
  date.getTime() + amount * MILLISECONDS_PER_DAY,
);

/**
 * Adds months to a date. Use a negative amount to subtract.
 * The day is clamped to the last day of the target month,
 * so that e.g. January 31 plus one month results in February 28.
 * @param date The base date
 * @param amount The amount of months to add
 * @returns The resulting date
 */
export const addMonths = (date: Date, amount: number) => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + amount;
  const targetYear = year + Math.floor(month / 12);
  const targetMonth = ((month % 12) + 12) % 12;

  return createDate(
    targetYear,
    targetMonth,
    Math.min(date.getUTCDate(), getDaysInMonth(targetYear, targetMonth)),
  );
};

/**
 * Adds years to a date. Use a negative amount to subtract.
 * The day is clamped, so that February 29 results in February 28 in non leap years.
 * @param date The base date
 * @param amount The amount of years to add
 * @returns The resulting date
 */
export const addYears = (date: Date, amount: number) => addMonths(date, amount * 12);

/**
 * Checks if two dates describe the same day.
 * @param a The first date
 * @param b The second date
 * @returns True if both dates are the same day
 */
export const isSameDay = (a: Date | null | undefined, b: Date | null | undefined) => (
  isValidDate(a) && isValidDate(b) && a.getTime() === b.getTime()
);

/**
 * Checks if two dates are in the same month of the same year.
 * @param a The first date
 * @param b The second date
 * @returns True if both dates share month and year
 */
export const isSameMonth = (a: Date | null | undefined, b: Date | null | undefined) => (
  isValidDate(a)
  && isValidDate(b)
  && a.getUTCFullYear() === b.getUTCFullYear()
  && a.getUTCMonth() === b.getUTCMonth()
);

/**
 * Restricts a date to the given boundaries.
 * @param date The date to clamp
 * @param min The lower boundary or null for no boundary
 * @param max The upper boundary or null for no boundary
 * @returns The clamped date
 */
export const clampDate = (date: Date, min?: Date | null, max?: Date | null) => {
  if (isValidDate(min) && date.getTime() < min.getTime()) {
    return min;
  }

  if (isValidDate(max) && date.getTime() > max.getTime()) {
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
export const isDateInRange = (date: Date, min?: Date | null, max?: Date | null) => (
  (!isValidDate(min) || !isValidDate(max) || min.getTime() <= max.getTime())
  && (!isValidDate(min) || date.getTime() >= min.getTime())
  && (!isValidDate(max) || date.getTime() <= max.getTime())
);

/**
 * Checks whether a month contains at least one date inside the given boundaries.
 * @param year The full year
 * @param month The zero based month
 * @param min The lower boundary or null for no boundary
 * @param max The upper boundary or null for no boundary
 * @returns True if at least one day in the month is in range
 */
export const isDateDisabled = (
  date: Date,
  min?: Date | null,
  max?: Date | null,
  disabledDates: readonly string[] = [],
  disabledWeekdays: readonly CalendarWeekday[] = [],
) => (
  !isDateInRange(date, min, max)
  || disabledDates.includes(toIsoDate(date))
  || disabledWeekdays.includes(UTC_WEEKDAYS[date.getUTCDay()])
);

export const hasSelectableDateInRange = (
  start: Date,
  end: Date,
  min?: Date | null,
  max?: Date | null,
  disabledDates: readonly string[] = [],
  disabledWeekdays: readonly CalendarWeekday[] = [],
) => {
  if (start.getTime() > end.getTime()) {
    return false;
  }

  const numberOfDays = Math.floor((end.getTime() - start.getTime()) / MILLISECONDS_PER_DAY);

  return Array.from({ length: numberOfDays + 1 }, (_, offset) => addDays(start, offset))
    .some(date => !isDateDisabled(date, min, max, disabledDates, disabledWeekdays));
};

export const getFirstSelectableDateInRange = (
  start: Date,
  end: Date,
  min?: Date | null,
  max?: Date | null,
  disabledDates: readonly string[] = [],
  disabledWeekdays: readonly CalendarWeekday[] = [],
) => {
  const numberOfDays = Math.floor((end.getTime() - start.getTime()) / MILLISECONDS_PER_DAY);

  return Array.from({ length: numberOfDays + 1 }, (_, offset) => addDays(start, offset))
    .find(date => !isDateDisabled(date, min, max, disabledDates, disabledWeekdays)) ?? null;
};

export const isMonthInRange = (
  year: number,
  month: number,
  min?: Date | null,
  max?: Date | null,
  disabledDates: readonly string[] = [],
  disabledWeekdays: readonly CalendarWeekday[] = [],
) => hasSelectableDateInRange(
  createDate(year, month, 1),
  createDate(year, month + 1, 0),
  min,
  max,
  disabledDates,
  disabledWeekdays,
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
  min?: Date | null,
  max?: Date | null,
  disabledDates: readonly string[] = [],
  disabledWeekdays: readonly CalendarWeekday[] = [],
) => hasSelectableDateInRange(
  createDate(year, 0, 1),
  createDate(year, 11, 31),
  min,
  max,
  disabledDates,
  disabledWeekdays,
);

/**
 * Clamps a date to the nearest boundary, or returns null when the range is empty.
 * @param date The date to clamp
 * @param min The lower boundary or null for no boundary
 * @param max The upper boundary or null for no boundary
 * @returns The nearest in-range date, or null if no dates are selectable
 */
export const getNearestSelectableDate = (
  date: Date,
  min?: Date | null,
  max?: Date | null,
  disabledDates: readonly string[] = [],
  disabledWeekdays: readonly CalendarWeekday[] = [],
) => {
  if ((isValidDate(min) && isValidDate(max) && min.getTime() > max.getTime())
    || disabledWeekdays.length === UTC_WEEKDAYS.length) {
    return null;
  }

  const start = clampDate(date, min, max);

  const maxDistance = (disabledDates.length + 1) * 7;

  return Array.from({ length: maxDistance * 2 + 1 }, (_, index) => {
    const distance = Math.ceil(index / 2) * (index % 2 === 0 ? -1 : 1);
    return addDays(start, distance);
  }).find(candidate => (
    isDateInRange(candidate, min, max)
    && !isDateDisabled(candidate, min, max, disabledDates, disabledWeekdays)
  )) ?? null;
};

const findSelectableDateInDirection = (
  date: Date,
  direction: number,
  step: number,
  attempts: number,
  min: Date | null,
  max: Date | null,
  disabledDates: readonly string[],
  disabledWeekdays: readonly CalendarWeekday[],
) => {
  let candidate = date;

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    candidate = addDays(candidate, direction * step);
    const boundedCandidate = clampDate(candidate, min, max);

    if (boundedCandidate.getTime() === date.getTime()) {
      return null;
    }

    if (!isDateDisabled(boundedCandidate, min, max, disabledDates, disabledWeekdays)) {
      return boundedCandidate;
    }

    if (boundedCandidate.getTime() !== candidate.getTime()) {
      return null;
    }
  }

  return null;
};

export const getNextSelectableDate = (
  date: Date,
  offset: -7 | -1 | 1 | 7,
  min: Date | null,
  max: Date | null,
  disabledDates: readonly string[],
  disabledWeekdays: readonly CalendarWeekday[],
) => {
  if ((isValidDate(min) && isValidDate(max) && min.getTime() > max.getTime())
    || disabledWeekdays.length === UTC_WEEKDAYS.length) {
    return null;
  }

  const direction = Math.sign(offset);
  const attempts = disabledDates.length + 8;
  const step = Math.abs(offset);
  const dateAtStep = findSelectableDateInDirection(
    date,
    direction,
    step,
    attempts,
    min,
    max,
    disabledDates,
    disabledWeekdays,
  );

  return dateAtStep ?? (step === 1 ? null : findSelectableDateInDirection(
    date,
    direction,
    1,
    attempts,
    min,
    max,
    disabledDates,
    disabledWeekdays,
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
      firstDayOfWeek = (weekInfo.firstDay % 7) as WeekdayIndex;
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
 * @param month The zero based month
 * @param firstDayOfWeek The weekday the calendar starts with
 * @returns Six weeks of seven days each
 */
export const getCalendarWeeks = (
  year: number,
  month: number,
  firstDayOfWeek: WeekdayIndex = 1,
) => {
  const firstOfMonth = createDate(year, month, 1);
  const offset = (firstOfMonth.getUTCDay() - firstDayOfWeek + 7) % 7;
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

  const formatter = new Intl.DateTimeFormat(locale, { timeZone: 'UTC', weekday: format });

  // 2024-01-07 is a Sunday, which matches index 0 of getUTCDay()
  const names = Object.freeze(Array.from({ length: 7 }, (_, index) => formatter.format(
    createDate(2024, 0, 7 + ((firstDayOfWeek + index) % 7)),
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

  const formatter = new Intl.DateTimeFormat(locale, { month: format, timeZone: 'UTC' });
  const names = Object.freeze(
    Array.from({ length: 12 }, (_, month) => formatter.format(createDate(2024, month, 1))),
  );

  monthNameCache.set(cacheKey, names);

  return names;
};

/**
 * Gets the first year of the decade a date belongs to, used by the year view.
 * @param year The full year
 * @param size The amount of years shown at once
 * @returns The first year of the block
 */
export const getYearBlockStart = (year: number, size = 12) => Math.floor(year / size) * size;
