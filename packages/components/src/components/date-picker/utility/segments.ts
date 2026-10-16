import { create, endOfMonth } from 'temporal-polyfill/fns/PlainDate';
import type { CalendarSelectionMode } from '../../calendar/types.js';
import {
  parseIsoDate, resolveCalendarLocale, toIsoDate, toNativeDate,
} from '../../calendar/utility/index.js';

/** An editable field in a date-only input. */
export type DateField = 'day' | 'month' | 'year';

/** Partial date entry, retained even when it cannot yet form an ISO date. */
export type DateSegments = Record<DateField, number | null>;

/** Stable date-group identity with independent committed and draft fields. */
export interface DateInputGroup extends DateSegments {
  batch?: number;
  committed: string;
  edited: DateField[];
  id: number;
}

const layoutCache = new Map<string, readonly { field: DateField | null; text: string }[]>();

const fieldNameCache = new Map<string, Intl.DisplayNames>();

/** Returns empty date entry state. */
export const emptySegments = (): DateSegments => ({ day: null, month: null, year: null });

/** Returns the locale's Gregorian field order and separators using ASCII digits. */
export const getSegmentLayout = (locale: string) => {
  const effectiveLocale = resolveCalendarLocale(locale);
  const cached = layoutCache.get(effectiveLocale);
  if (cached) {
    return cached;
  }
  const layout = Object.freeze(new Intl.DateTimeFormat(effectiveLocale, {
    calendar: 'gregory',
    day: '2-digit',
    month: '2-digit',
    numberingSystem: 'latn',
    timeZone: 'UTC',
    year: 'numeric',
  }).formatToParts(toNativeDate(create(2006, 11, 23))).map(part => Object.freeze({
    field: ['day', 'month', 'year'].includes(part.type) ? part.type as DateField : null,
    text: part.value,
  })));
  layoutCache.set(effectiveLocale, layout);
  return layout;
};

/** Returns a cached localized name for an editable Gregorian date field. */
export const getDateFieldName = (locale: string, field: DateField) => {
  const effectiveLocale = resolveCalendarLocale(locale);
  let formatter = fieldNameCache.get(effectiveLocale);
  if (!formatter) {
    formatter = new Intl.DisplayNames(effectiveLocale, { type: 'dateTimeField' });
    fieldNameCache.set(effectiveLocale, formatter);
  }
  return formatter.of(field) ?? field;
};

/** Parses a complete ISO date into editable fields. */
export const isoToSegments = (value: string): DateSegments => {
  const date = parseIsoDate(value);
  return date ? { day: date.day, month: date.month, year: date.year } : emptySegments();
};

/** Serializes only complete, valid fields; partial entry has an empty canonical value. */
export const segmentsToIso = ({ day, month, year }: DateSegments) => {
  if (day === null || month === null || year === null || year < 0 || year > 9999) {
    return '';
  }

  const value = `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  return toIsoDate(parseIsoDate(value));
};

/** Returns inclusive field bounds, including leap years and incomplete dates. */
export const segmentBounds = (field: DateField, segments: DateSegments) => {
  const max = field === 'day' ? endOfMonth(create(
    // Invalid draft fields must not throw while we derive spinbutton bounds; 2000 also permits a draft leap day.
    segments.year !== null && segments.year >= 0 && segments.year <= 9999 ? segments.year : 2000,
    segments.month !== null && segments.month >= 1 && segments.month <= 12 ? segments.month : 1,
    1,
  )).day : { month: 12, year: 9999 }[field];
  return { max, min: field === 'year' ? 0 : 1 };
};

/** Clamps an existing day after the user changes the month or year. */
export const clampDay = (segments: DateSegments): DateSegments => ({
  ...segments,
  day: segments.day === null ? null : Math.min(segments.day, segmentBounds('day', segments).max),
});

/** Retains impossible numeric drafts instead of reinterpreting their digits as another field. */
export const typeDigit = (field: DateField, buffer: string, digit: string, segments: DateSegments) => {
  const { min } = segmentBounds(field, segments);
  const width = field === 'year' ? 4 : 2;
  const nextBuffer = buffer.length >= width ? digit : buffer + digit;
  const numeric = Number(nextBuffer);
  // Keep overflow visible for correction; restarting on "31" in February would reinterpret the user's intent.
  const value = numeric >= min ? numeric : null;
  return {
    advance: nextBuffer.length >= width,
    buffer: nextBuffer,
    value,
  };
};

/** Parses ISO or locale-ordered numeric pasted dates without native Date heuristics. */
export const parsePastedDate = (text: string, locale: string): DateSegments | null => {
  const value = text.trim();
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (iso) {
    // Recognizing the shape is separate from validation: February 31 must survive as an invalid pasted draft.
    return { day: Number(iso[3]), month: Number(iso[2]), year: Number(iso[1]) };
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
  return numbers[yearIndex].length === 4 ? segments : null;
};

/** Parses calendar-format ISO selections or one locale-ordered numeric date. */
export const parsePastedSelection = (text: string, locale: string, mode: CalendarSelectionMode): DateSegments[] | null => {
  const tokens = text.trim().split(/[\s,;]+/);
  // Only homogeneous ISO lists are accepted; do not guess mixed locale orders or partially accept their members.
  if (tokens.every(token => /^\d{4}-\d{2}-\d{2}$/.test(token))) {
    const tooMany = (mode === 'single' && tokens.length > 1) || (mode === 'range' && tokens.length > 2);
    return tooMany ? null : tokens.map(token => parsePastedDate(token, locale)!);
  }
  const date = parsePastedDate(text, locale);
  return date ? [date] : null;
};
