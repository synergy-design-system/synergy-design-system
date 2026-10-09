import {
  compare, create, endOfMonth, equals,
} from 'temporal-polyfill/fns/PlainDate';
import type {
  CalendarDate,
  CalendarDayOffset,
  CalendarNavigationResult,
  CalendarNavigationState,
  NullableCalendarDate,
  PreparedCalendarConstraints,
} from './internal-types.js';
import {
  getFirstSelectableDateInRange,
  getNearestSelectableDate,
  getYearBlockStart,
  isDateDisabled,
  isMonthInRange,
  isSameMonth,
  isYearInRange,
} from './utils.js';

/** Day-grid movement keeps week-sized steps distinct from month/year grid movement. */
export const DAY_KEY_OFFSETS: Readonly<Record<string, CalendarDayOffset | undefined>> = {
  ArrowDown: 7, ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7,
};

/** Month and year grids each have three columns. */
export const PERIOD_KEY_OFFSETS: Readonly<Record<string, number | undefined>> = {
  ArrowDown: 3, ArrowLeft: -1, ArrowRight: 1, ArrowUp: -3,
};

const nearestNumber = (values: readonly number[], preferred: number, selectable: (value: number) => boolean) => {
  let nearest: number | undefined;

  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (selectable(value)
      && (nearest === undefined || Math.abs(value - preferred) < Math.abs(nearest - preferred))) {
      nearest = value;
    }
  }

  return nearest;
};

/** Returns the nearest available month, retaining the earlier month on ties. */
export const getSelectableMonth = (year: number, preferred: number, constraints: PreparedCalendarConstraints) => (
  nearestNumber(
    Array.from({ length: 12 }, (_, index) => index + 1),
    preferred,
    month => isMonthInRange(year, month, constraints),
  )
);

/** Returns the nearest available year in a block, retaining the earlier year on ties. */
export const getSelectableYear = (block: number, preferred: number, constraints: PreparedCalendarConstraints) => (
  nearestNumber(
    Array.from({ length: 12 }, (_, index) => block + index),
    preferred,
    year => isYearInRange(year, constraints),
  )
);

/** Navigation may remain available outside a predicate's bounded search window. */
export const hasNavigableDates = (constraints: PreparedCalendarConstraints, current: CalendarDate) => {
  if (constraints.isDateDisabled) {
    return (!constraints.min || !constraints.max || compare(constraints.min, constraints.max) <= 0)
      && constraints.disabledWeekdaySet.size < 7;
  }

  return !!getNearestSelectableDate(current, constraints);
};

/** Resolves viewed-month and day focus together without dispatching events or touching the DOM. */
export const getMonthNavigationState = (date: CalendarDate, constraints: PreparedCalendarConstraints) => {
  const month = isMonthInRange(date.year, date.month, constraints)
    ? date.month
    : getSelectableMonth(date.year, date.month, constraints) ?? date.month;
  const viewDate = create(date.year, month, 1);
  const focusedDate = getFirstSelectableDateInRange(viewDate, endOfMonth(viewDate), constraints) ?? viewDate;

  return { focusedDate, viewDate };
};

/** Normalizes all focus values using one constraint snapshot; only the visible view requests focus. */
export const normalizeCalendarFocus = (
  state: CalendarNavigationState,
  constraints: PreparedCalendarConstraints,
): CalendarNavigationResult => {
  const day = getNearestSelectableDate(state.focusedDate, constraints);
  const month = getNearestSelectableDate(create(state.monthSelectorYear, state.focusedMonth, 1), constraints);
  const year = getNearestSelectableDate(create(state.focusedYear, 1, 1), constraints);
  const next: Partial<CalendarNavigationState> = {};

  if (day && !equals(day, state.focusedDate)) {
    next.focusedDate = day;
    next.viewDate = day;
  }
  if (month) {
    next.focusedMonth = month.month;
    next.monthSelectorYear = month.year;
  }
  if (year) {
    next.focusedYear = year.year;
    next.yearBlockStart = getYearBlockStart(year.year);
  }

  const target = { day, month, year }[state.visibleView];
  return { focus: target ? state.visibleView : null, state: next };
};

/** Resolves the month selector's focus without altering the viewed month. */
export const getMonthSelectorState = (
  state: CalendarNavigationState,
  selected: NullableCalendarDate,
  constraints: PreparedCalendarConstraints,
) => {
  const monthSelectorYear = state.viewDate.year;
  const preferred = selected && !isDateDisabled(selected, constraints) && selected.year === monthSelectorYear
    ? selected.month : state.viewDate.month;
  const focusedMonth = getSelectableMonth(monthSelectorYear, preferred, constraints) ?? state.focusedMonth;

  return { focusedMonth, monthSelectorYear, visibleView: 'month' as const };
};

/** Resolves a year selector block and its focus without altering the viewed day/month. */
export const getYearSelectorState = (
  state: CalendarNavigationState,
  selected: NullableCalendarDate,
  constraints: PreparedCalendarConstraints,
) => {
  let focusedYear = state.visibleView === 'month' ? state.monthSelectorYear : state.viewDate.year;
  const yearBlockStart = getYearBlockStart(focusedYear);

  if (selected && selected.year >= yearBlockStart && selected.year < yearBlockStart + 12
    && isYearInRange(selected.year, constraints)) {
    focusedYear = selected.year;
  }

  focusedYear = getSelectableYear(yearBlockStart, focusedYear, constraints) ?? focusedYear;
  return { focusedYear, visibleView: 'year' as const, yearBlockStart };
};

/** Resolves return to the day view, preferring a selected date only within the viewed month. */
export const getDayViewState = (
  state: CalendarNavigationState,
  selected: NullableCalendarDate,
  constraints: PreparedCalendarConstraints,
) => ({
  focusedDate: selected && !isDateDisabled(selected, constraints) && isSameMonth(selected, state.viewDate)
    ? selected : state.focusedDate,
  visibleView: 'day' as const,
});
