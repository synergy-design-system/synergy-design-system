/* eslint-disable complexity */
import { addDays, compare, diffDays } from 'temporal-polyfill/fns/PlainDate';
import type {
  CalendarDate,
  CalendarDayItemState,
  CalendarDayRenderContext,
  CalendarRangeEndpoint,
  CalendarRangeLengthOptions,
  CalendarSelectionContext,
  CalendarSelectionRequest,
  DayViewOptions,
  NullableCalendarDate,
  PreparedCalendarConstraints,
} from '../internal-types.js';
import type { CalendarSelectionMode } from '../types.js';
import { isDateDisabled } from './constraints.js';
import {
  isSameDay, isSameMonth, parseIsoDate, toIsoDate, today,
} from './date.js';

/** Parses and sorts whitespace-separated ISO dates; any malformed token empties the value. Duplicates are retained for same-day ranges. */
export const parseCalendarValue = (value: string | null) => {
  const dates = (value ?? '').trim().split(/\s+/).filter(Boolean);

  if (dates.some(date => !parseIsoDate(date))) {
    return [];
  }

  return dates.sort();
};

/** Accepts supported selection modes and falls back to single for missing or unknown input. */
export const parseCalendarSelectionMode = (value: string | null): CalendarSelectionMode => (
  value === 'range' || value === 'multiple' ? value : 'single'
);

/** Compares already-ordered ISO value arrays by length and corresponding entries. */
export const areCalendarValuesEqual = (a: readonly string[], b: readonly string[]) => (
  a.length === b.length && a.every((value, index) => value === b[index])
);

const normalizeRangeLimit = (limit?: number) => (
  typeof limit === 'number' && Number.isInteger(limit) && limit > 0 ? limit : undefined
);

/** Adjusts inclusive range length without changing direction or guessing one at the anchor. */
export const clampRangeEnd = (
  start: CalendarDate,
  end: CalendarDate,
  minRange?: number,
  maxRange?: number,
) => {
  const minimum = normalizeRangeLimit(minRange);
  const maximum = normalizeRangeLimit(maxRange);
  const direction = Math.sign(compare(end, start));
  const length = Math.abs(diffDays(start, end)) + 1;
  const constrainedLength = Math.min(maximum ?? Infinity, Math.max(minimum ?? 1, length));

  if (direction === 0 || constrainedLength === length) {
    return end;
  }

  return addDays(start, direction * (constrainedLength - 1));
};

/** Checks inclusive calendar-day length in either direction; invalid limits are treated as unset. */
export const isRangeLengthAllowed = (
  start: CalendarDate,
  end: CalendarDate,
  minRange?: number,
  maxRange?: number,
) => {
  const minimum = normalizeRangeLimit(minRange);
  const maximum = normalizeRangeLimit(maxRange);
  const length = Math.abs(diffDays(start, end)) + 1;

  return (minimum === undefined || length >= minimum)
    && (maximum === undefined || length <= maximum);
};

/**
 * Sorts valid dates and applies selection cardinality without enforcing selectability.
 * Single keeps the earliest date; range keeps endpoints; multiple deduplicates without expanding ranges.
 */
export const normalizeCalendarValue = (
  values: readonly string[],
  mode: CalendarSelectionMode,
  _previousMode: CalendarSelectionMode = mode,
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

  return [...new Set(validDates)];
};

/** Derives an endpoint without mutating the calendar or falling back from a disabled boundary. */
export const getRangeEndpointState = (
  start: CalendarDate,
  requested: CalendarDate,
  limits: CalendarRangeLengthOptions,
  constraints: PreparedCalendarConstraints,
): CalendarRangeEndpoint => {
  const date = clampRangeEnd(start, requested, limits.minRange, limits.maxRange);

  return {
    allowed: isRangeLengthAllowed(start, date, limits.minRange, limits.maxRange)
      && !isDateDisabled(date, constraints),
    clipped: !isSameDay(requested, date),
    date,
    length: Math.abs(diffDays(start, date)) + 1,
  };
};

/** Proposes one user selection; effects, cancellation, and readonly/disabled guards stay in the host. */
export const proposeDateSelection = (
  date: CalendarDate,
  context: CalendarSelectionContext,
): CalendarSelectionRequest | null => {
  const value = toIsoDate(date);

  if (context.mode === 'range') {
    if (context.value.length !== 1) {
      return { focusDate: date, kind: 'pending', value: [value] };
    }

    const start = parseIsoDate(context.value[0]);

    if (!start) {
      return null;
    }

    const endpoint = getRangeEndpointState(start, date, context.rangeLimits, context.constraints);

    return endpoint.allowed
      ? { focusDate: endpoint.date, kind: 'commit', value: [context.value[0], toIsoDate(endpoint.date)].sort() }
      : null;
  }

  if (context.mode === 'multiple') {
    const nextValue = context.value.includes(value)
      ? context.value.filter(selected => selected !== value)
      : [...context.value, value];

    return { focusDate: date, kind: 'commit', value: nextValue.sort() };
  }

  return { focusDate: date, kind: 'commit', value: [value] };
};

const isWithinInterval = (
  date: CalendarDate,
  start: NullableCalendarDate,
  end: NullableCalendarDate,
  inclusive = false,
) => {
  if (!start || !end) {
    return false;
  }

  const fromStart = compare(date, start);
  const fromEnd = compare(date, end);
  return inclusive ? fromStart >= 0 && fromEnd <= 0 : fromStart > 0 && fromEnd < 0;
};

/** Prepares the selected/preview range once while preserving readonly and anchor-direction rules. */
export const getDayRenderContext = (options: DayViewOptions): CalendarDayRenderContext => {
  const rangeDates = options.mode === 'range' ? options.selectedDates : [];
  const rangeStart = rangeDates[0] ?? null;
  const rangeEnd = rangeDates.length === 2
    ? rangeDates[1]
    : null;
  const showPending = !options.readonly && !!rangeStart && !rangeEnd;
  const previewDate = showPending && options.hoveredDate
    ? clampRangeEnd(rangeStart, options.hoveredDate, options.minRange, options.maxRange)
    : null;
  const [previewStart, previewEnd] = rangeStart && previewDate
    ? [rangeStart, previewDate].sort(compare)
    : [null, null];

  return {
    options, previewDate, previewEnd, previewStart, rangeEnd, rangeStart, showPending, today: today(),
  };
};

const getRangeItemState = (date: CalendarDate, context: CalendarDayRenderContext) => {
  const anchor = isSameDay(date, context.rangeStart);
  const interior = isWithinInterval(date, context.rangeStart, context.rangeEnd);
  const state = {
    rangeBegin: anchor,
    rangeEnd: isSameDay(date, context.rangeEnd),
    rangeInterior: interior,
    rangeInteriorEnd: interior && !!context.rangeEnd && isSameDay(date, addDays(context.rangeEnd, -1)),
    rangeInteriorStart: interior && !!context.rangeStart && isSameDay(date, addDays(context.rangeStart, 1)),
    rangeStart: anchor,
  };

  if (!context.showPending || !context.rangeStart) {
    return state;
  }

  const endpoint = getRangeEndpointState(
    context.rangeStart,
    date,
    context.options,
    context.options.constraints,
  );
  const preview = isWithinInterval(date, context.previewStart, context.previewEnd, true) && !anchor;
  const previewInterior = isWithinInterval(date, context.previewStart, context.previewEnd);
  const firstPreview = context.previewStart && (isSameDay(context.previewStart, context.rangeStart)
    ? addDays(context.previewStart, 1) : context.previewStart);
  const lastPreview = context.previewEnd && (isSameDay(context.previewEnd, context.rangeStart)
    ? addDays(context.previewEnd, -1) : context.previewEnd);

  return {
    ...state,
    rangeClipped: endpoint.clipped,
    rangeEnd: isSameDay(date, context.previewDate),
    rangeInterior: state.rangeInterior || previewInterior,
    rangePending: anchor,
    rangePreview: preview,
    rangePreviewEnd: preview && isSameDay(date, lastPreview),
    rangePreviewStart: preview && isSameDay(date, firstPreview),
    rangeUnavailable: !endpoint.allowed,
  };
};

/** Derives cell states independently of Lit, including ordinary disabled rules and pending endpoints. */
export const getDayItemState = (
  date: CalendarDate,
  context: CalendarDayRenderContext,
): CalendarDayItemState => ({
  active: context.options.selectedDates.some(selected => isSameDay(date, selected)),
  disabled: context.options.disabled || isDateDisabled(date, context.options.constraints),
  outside: !isSameMonth(date, context.options.viewDate),
  ...getRangeItemState(date, context),
  tabbable: isSameDay(date, context.options.focusedDate),
  today: isSameDay(date, context.today),
  value: toIsoDate(date),
});
