import { compare, diffDays } from 'temporal-polyfill/fns/PlainDate';
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
} from './internal-types.js';
import {
  clampRangeEnd,
  isDateDisabled,
  isRangeLengthAllowed,
  isSameDay,
  isSameMonth,
  parseIsoDate,
  toIsoDate,
  today,
} from './utils.js';

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
  const state = {
    rangeBegin: anchor,
    rangeEnd: isSameDay(date, context.rangeEnd),
    rangeInterior: isWithinInterval(date, context.rangeStart, context.rangeEnd),
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

  return {
    ...state,
    rangeClipped: endpoint.clipped,
    rangeEnd: isSameDay(date, context.previewDate),
    rangeInterior: state.rangeInterior || isWithinInterval(date, context.previewStart, context.previewEnd),
    rangePending: anchor,
    rangePreview: isWithinInterval(date, context.previewStart, context.previewEnd, true) && !anchor,
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
