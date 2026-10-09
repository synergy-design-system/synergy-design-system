import type { TemplateResult } from 'lit';
import type { Record as CalendarDate } from 'temporal-polyfill/fns/PlainDate';
import type {
  CalendarDateDisabledPredicate,
  CalendarSelectionMode,
  CalendarSize,
  CalendarWeekday,
} from './types.js';

/** Internal ISO date-only record; months are 1-12 and no time or timezone is stored. */
export type { CalendarDate };

/** A parsed date or an explicitly unset value, such as an absent selection or bound. */
export type NullableCalendarDate = CalendarDate | null;

/** Also accepts missing inputs, such as an array element that does not exist yet. */
export type OptionalCalendarDate = NullableCalendarDate | undefined;

/** Shared signature for date comparisons; either missing input produces false. */
export type CalendarDateComparison = (
  firstDate: OptionalCalendarDate,
  secondDate: OptionalCalendarDate,
) => boolean;

/** Day-grid arrow-key movement: one day horizontally or one week vertically. */
export type CalendarDayOffset = -7 | -1 | 1 | 7;

/** Calendar-emitted events suppressed while disabled or readonly; native DOM events are unaffected. */
export type CalendarEventName = 'syn-before-change' | 'syn-blur' | 'syn-change' | 'syn-clear' | 'syn-focus' | 'syn-input';

/** The visible selection grid and the kind of item rendered within it. */
export type CalendarView = 'day' | 'month' | 'year';

/** Existing view/focus values used by pure navigation calculations; selection remains separate. */
export interface CalendarNavigationState {
  focusedDate: CalendarDate;
  focusedMonth: number;
  focusedYear: number;
  monthSelectorYear: number;
  viewDate: CalendarDate;
  visibleView: CalendarView;
  yearBlockStart: number;
}

/** A navigation patch and the single active view whose DOM focus should be restored. */
export interface CalendarNavigationResult {
  focus: CalendarView | null;
  state: Partial<CalendarNavigationState>;
}

/** ISO weekday numbering: Monday=1 through Sunday=7, including locale week starts. */
export type WeekdayIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/** Shared selectability rules: inclusive date bounds and explicitly disabled dates/weekdays. */
export interface CalendarConstraints {
  disabledDates: readonly string[];
  disabledWeekdays: readonly CalendarWeekday[];
  isDateDisabled?: CalendarDateDisabledPredicate;
  max: NullableCalendarDate;
  min: NullableCalendarDate;
}

/** Parsed constraints with membership indexes; original arrays preserve search-horizon semantics. */
export interface PreparedCalendarConstraints extends CalendarConstraints {
  disabledDateSet: ReadonlySet<string>;
  disabledWeekdaySet: ReadonlySet<CalendarWeekday>;
}

/** State, actions, and size for the current-period and Clear buttons in every view. */
export interface CalendarFooterOptions {
  clearDisabled?: boolean;
  clearLabel: string;
  currentDisabled?: boolean;
  currentLabel: string;
  disabled: boolean;
  hasValue: boolean;
  onClear: () => void;
  onCurrent: () => void;
  size: CalendarSize;
}

/** Label, focus eligibility, and visual/part states for a day, month, or year button. */
export interface CalendarItemOptions {
  active: boolean;
  disabled?: boolean;
  kind: CalendarView;
  label: string | number | TemplateResult;
  outside?: boolean;
  rangeBegin?: boolean;
  /** The requested endpoint is adjusted by a range length limit; snapping remains available. */
  rangeClipped?: boolean;
  rangeEnd?: boolean;
  rangeInterior?: boolean;
  rangePending?: boolean;
  rangePreview?: boolean;
  rangeStart?: boolean;
  rangeUnavailable?: boolean;
  tabbable: boolean;
  today?: boolean;
  value: string | number;
}

/** Labels, availability, actions, and size for period navigation and optional view switching. */
export interface CalendarNavigationOptions {
  disabled: boolean;
  label: string | number;
  nextDisabled?: boolean;
  nextLabel: string;
  onChoose?: () => void;
  onNext: () => void;
  onPrevious: () => void;
  previousDisabled?: boolean;
  previousLabel: string;
  size: CalendarSize;
}

/** Rendered sections returned by each view for the component's shared page structure. */
export interface CalendarViewTemplates {
  content: TemplateResult;
  footer: TemplateResult;
  header: TemplateResult;
}

/** Optional inclusive day-count bounds for user-created ranges; only positive integers apply. */
export interface CalendarRangeLengthOptions {
  maxRange?: number;
  minRange?: number;
}

/** Shared adjusted endpoint result for preview, affordances, and range completion. */
export interface CalendarRangeEndpoint {
  allowed: boolean;
  clipped: boolean;
  date: CalendarDate;
  length: number;
}

/** Named user update, distinguishing provisional selection, committed selection, and Clear. */
export type CalendarSelectionRequest =
  | { kind: 'pending' | 'commit'; value: string[]; focusDate: CalendarDate }
  | { kind: 'clear'; value: [] };

/** Inputs for pure user selection calculation; external assignments use separate normalization. */
export interface CalendarSelectionContext {
  constraints: PreparedCalendarConstraints;
  mode: CalendarSelectionMode;
  rangeLimits: CalendarRangeLengthOptions;
  value: readonly string[];
}

/**
 * Day-grid inputs, including selection, focused date, locale, and month/year navigation.
 * hoveredDate is the preview endpoint from either pointer hover or keyboard navigation.
 */
export interface DayViewOptions extends
  CalendarFooterOptions, CalendarRangeLengthOptions {
  constraints: PreparedCalendarConstraints;
  focusedDate: CalendarDate;
  hoveredDate: NullableCalendarDate;
  locale: string;
  mode: CalendarSelectionMode;
  monthNavigation: CalendarNavigationOptions;
  /** Keeps selected dates visible while suppressing pending selection affordances. */
  readonly: boolean;
  selectedDates: readonly CalendarDate[];
  viewDate: CalendarDate;
  yearNavigation: CalendarNavigationOptions;
}

/**
 * Month-grid inputs for a viewed year; activeMonth and focusedMonth use 1-12 internally.
 * The renderer preserves zero-based month button/slot identifiers at its boundary.
 */
export interface MonthViewOptions extends CalendarFooterOptions {
  activeMonth: number | undefined;
  constraints: PreparedCalendarConstraints;
  focusedMonth: number;
  locale: string;
  year: number;
  yearNavigation: CalendarNavigationOptions;
}

/** Year-grid inputs; blockStart anchors the displayed block of twelve years. */
export interface YearViewOptions extends CalendarFooterOptions {
  activeYear: number | undefined;
  blockStart: number;
  constraints: PreparedCalendarConstraints;
  focusedYear: number;
  navigation: CalendarNavigationOptions;
}

/** Shared per-render date context, keeping all date/range calculations out of cell markup. */
export interface CalendarDayRenderContext {
  options: DayViewOptions;
  previewDate: NullableCalendarDate;
  previewEnd: NullableCalendarDate;
  previewStart: NullableCalendarDate;
  rangeEnd: NullableCalendarDate;
  rangeStart: NullableCalendarDate;
  showPending: boolean;
  today: CalendarDate;
}

/** Derived day state; the renderer supplies only its kind and Lit label. */
export type CalendarDayItemState = Omit<CalendarItemOptions, 'kind' | 'label'>;
