import { create, endOfMonth } from 'temporal-polyfill/fns/PlainDate';
import type { CalendarSelectionMode } from '../../calendar/types.js';
import {
  normalizeCalendarValue, parseCalendarValue, parseIsoDate, toIsoDate, toNativeDate,
} from '../../calendar/utility/index.js';

/** An editable field in a date-only input. */
export type DateField = 'day' | 'month' | 'year';

/** Partial date entry, retained even when it cannot yet form an ISO date. */
export type DateSegments = Record<DateField, number | null>;

/** Returns empty date entry state. */
export const emptySegments = (): DateSegments => ({ day: null, month: null, year: null });

/** Returns the locale's Gregorian field order and separators using ASCII digits. */
export const getSegmentLayout = (locale: string) => new Intl.DateTimeFormat(locale, {
  calendar: 'gregory',
  day: '2-digit',
  month: '2-digit',
  numberingSystem: 'latn',
  timeZone: 'UTC',
  year: 'numeric',
}).formatToParts(toNativeDate(create(2006, 11, 23))).map(part => ({
  field: ['day', 'month', 'year'].includes(part.type) ? part.type as DateField : null,
  text: part.value,
}));

/** Parses a complete ISO date into editable fields. */
export const isoToSegments = (value: string): DateSegments => {
  const date = parseIsoDate(value);
  return date ? { day: date.day, month: date.month, year: date.year } : emptySegments();
};

/** Serializes only complete, valid fields; partial entry has an empty canonical value. */
export const segmentsToIso = ({ day, month, year }: DateSegments) => {
  if (day === null || month === null || year === null) {
    return '';
  }

  const value = `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  return toIsoDate(parseIsoDate(value));
};

/** Returns inclusive field bounds, including leap years and incomplete dates. */
export const segmentBounds = (field: DateField, segments: DateSegments) => {
  const max = field === 'day' ? endOfMonth(create(
    segments.year ?? 2000,
    segments.month ?? 1,
    1,
  )).day : { month: 12, year: 9999 }[field];
  return { max, min: 1 };
};

/** Clamps an existing day after the user changes the month or year. */
export const clampDay = (segments: DateSegments): DateSegments => ({
  ...segments,
  day: segments.day === null ? null : Math.min(segments.day, segmentBounds('day', segments).max),
});

/** Appends a digit, restarts overflowing buffers, and signals when to advance focus. */
export const typeDigit = (field: DateField, buffer: string, digit: string, segments: DateSegments) => {
  const { max, min } = segmentBounds(field, segments);
  const width = field === 'year' ? 4 : 2;
  let nextBuffer = buffer.length >= width ? digit : buffer + digit;
  if (Number(nextBuffer) > max) {
    nextBuffer = digit;
  }
  const numeric = Number(nextBuffer);
  const value = numeric >= min && numeric <= max ? numeric : null;
  return {
    advance: nextBuffer.length >= width || numeric * 10 > max,
    buffer: nextBuffer,
    value,
  };
};

/** Parses ISO or locale-ordered numeric pasted dates without native Date heuristics. */
export const parsePastedDate = (text: string, locale: string): DateSegments | null => {
  const value = text.trim();
  if (parseIsoDate(value)) {
    return isoToSegments(value);
  }
  if (!/^\d+[\s./-]+\d+[\s./-]+\d+$/.test(value)) {
    return null;
  }
  const numbers = value.split(/[\s./-]+/);
  const fields = getSegmentLayout(locale).flatMap(token => (token.field ? [token.field] : []));
  const segments = emptySegments();
  fields.forEach((field, index) => {
    segments[field] = Number(numbers[index]);
  });
  const yearIndex = fields.indexOf('year');
  return numbers[yearIndex].length === 4 && segmentsToIso(segments) ? segments : null;
};

/** Parses calendar-format ISO selections or one locale-ordered numeric date. */
export const parsePastedSelection = (text: string, locale: string, mode: CalendarSelectionMode): DateSegments[] | null => {
  const tokens = text.trim().split(/[\s,;]+/);
  const dates = parseCalendarValue(tokens.join(' '));
  if (dates.length > 0) {
    const tooMany = (mode === 'single' && dates.length > 1) || (mode === 'range' && dates.length > 2);
    return tooMany ? null : normalizeCalendarValue(dates, mode).map(isoToSegments);
  }
  const date = parsePastedDate(text, locale);
  return date ? [date] : null;
};
