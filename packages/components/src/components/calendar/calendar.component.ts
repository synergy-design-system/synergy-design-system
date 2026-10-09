/* eslint-disable complexity */
import {
  type CSSResultGroup,
  type PropertyValues,
  html,
} from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, state } from 'lit/decorators.js';
import {
  addMonths,
  create as createDate,
  equals,
} from 'temporal-polyfill/fns/PlainDate';
import componentStyles from '../../styles/component.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import SynButton from '../button/button.js';
import SynIconButton from '../icon-button/icon-button.js';
import { LocalizeController } from '../../utilities/localize.js';
import type {
  CalendarDate,
  CalendarEventName,
  CalendarNavigationOptions,
  CalendarNavigationState,
  CalendarSelectionRequest,
  CalendarView,
  PreparedCalendarConstraints,
} from './internal-types.js';
import type {
  CalendarDateDisabledPredicate,
  CalendarSelectionMode,
  CalendarSize,
  CalendarWeekday,
} from './types.js';
import {
  DAY_KEY_OFFSETS,
  PERIOD_KEY_OFFSETS,
  areCalendarValuesEqual,
  fromNativeDate,
  getDayViewState,
  getMonthLabel,
  getMonthNavigationState,
  getMonthSelectorState,
  getNearestSelectableDate,
  getNextSelectableDate,
  getSelectableMonth,
  getSelectableYear,
  getYearBlockStart,
  getYearSelectorState,
  hasNavigableDates,
  isDateDisabled,
  isMonthInRange,
  isSameMonth,
  isYearInRange,
  normalizeCalendarFocus,
  normalizeCalendarValue,
  parseCalendarSelectionMode,
  parseCalendarValue,
  parseDisabledDates,
  parseDisabledWeekdays,
  parseIsoDate,
  prepareCalendarConstraints,
  proposeDateSelection,
  stopNestedFocusEvent,
  toIsoDate,
  toNativeDate,
  today,
} from './utility/index.js';
import { renderDayView } from './renderers/day.js';
import { renderMonthView } from './renderers/month.js';
import { renderYearView } from './renderers/year.js';
import styles from './calendar.styles.js';
import { enableDefaultSettings } from '../../utilities/defaultSettings/decorator.js';

/**
 * @summary Calendars allow users to select dates from a calendar interface.
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-calendar--docs
 * @status experimental
 * @since 0.0.0
 *
 * @dependency syn-button
 * @dependency syn-icon-button
 *
 * @slot day-YYYY-MM-DD - Dynamic slots replacing a day's label, e.g. day-2026-12-24. The fallback is the two-digit day number.
 * @slot month-0 - Replaces January's label; the fallback is its localized short month name.
 * @slot month-1 - Replaces February's label; the fallback is its localized short month name.
 * @slot month-2 - Replaces March's label; the fallback is its localized short month name.
 * @slot month-3 - Replaces April's label; the fallback is its localized short month name.
 * @slot month-4 - Replaces May's label; the fallback is its localized short month name.
 * @slot month-5 - Replaces June's label; the fallback is its localized short month name.
 * @slot month-6 - Replaces July's label; the fallback is its localized short month name.
 * @slot month-7 - Replaces August's label; the fallback is its localized short month name.
 * @slot month-8 - Replaces September's label; the fallback is its localized short month name.
 * @slot month-9 - Replaces October's label; the fallback is its localized short month name.
 * @slot month-10 - Replaces November's label; the fallback is its localized short month name.
 * @slot month-11 - Replaces December's label; the fallback is its localized short month name.
 * @slot year-YYYY - Dynamic slots replacing a year's label, e.g. year-2026. The fallback is the year number.
 *
 * @csspart base - The component's base wrapper.
 * @csspart header - The calendar header.
 * @csspart content - The calendar view content.
 * @csspart footer - The calendar footer actions.
 * @csspart day-grid - The day-of-month table.
 * @csspart day-cell - A day table cell, independent of the button it contains.
 * @csspart weekdays - The weekday table heading group.
 * @csspart weekday - An individual localized weekday heading.
 * @csspart month-grid - The month selection grid.
 * @csspart year-grid - The year selection grid.
 * @csspart calendar-item - A day, month, or year button.
 * @csspart calendar-item-label - The slot containing an item's custom content or fallback label.
 * @csspart calendar-item-day - A day button.
 * @csspart calendar-item-month - A month button.
 * @csspart calendar-item-year - A year button.
 * @csspart calendar-item-active - An active calendar item.
 * @csspart calendar-item-today - The item representing today.
 * @csspart calendar-item-outside - A day item belonging to an adjacent month.
 * @csspart calendar-item-disabled - A disabled calendar item.
 * @csspart calendar-item-range-begin - The pending range anchor or completed range start; an alias of calendar-item-range-start.
 * @csspart calendar-item-range-clipped - A date whose requested endpoint is adjusted by a range length limit.
 * @csspart calendar-item-range-start - The pending range anchor or completed range start; an alias of calendar-item-range-begin.
 * @csspart calendar-item-range-end - The completed or adjusted preview endpoint, which may precede the anchor during reverse selection.
 * @csspart calendar-item-range-interior - A date inside the selected or previewed range.
 * @csspart calendar-item-range-pending - The selected start while waiting for a range end.
 * @csspart calendar-item-range-preview - A date in the pending range preview driven by pointer or keyboard movement.
 * @csspart calendar-item-range-unavailable - A focusable endpoint whose adjusted boundary is disabled or whose range length is invalid.
 * @csspart month-navigation - The month navigation controls.
 * @csspart year-navigation - The year navigation controls.
 * @csspart previous-button - The previous-period syn-icon-button host.
 * @csspart previous-button__base - The previous-period control's forwarded base part.
 * @csspart navigation-label - The current month, year, or year range in the navigation header.
 * @csspart navigation-label__base - The navigation label's forwarded button base when it offers a view switch.
 * @csspart next-button - The next-period syn-icon-button host.
 * @csspart next-button__base - The next-period control's forwarded base part.
 * @csspart current-period-button - The syn-button host for navigating to the current day, month, or year.
 * @csspart current-period-button__base - The current-period control's forwarded base part.
 * @csspart clear-button - The syn-button host for clearing the selected value.
 * @csspart clear-button__base - The Clear control's forwarded base part.
 *
 * @cssproperty --syn-calendar-min-width - Overrides the minimum width on the host or base part. Defaults to 298px (small), 390px (medium), or 420px (large), capped to the viewport width.
 *
 * @event syn-blur - Emitted when focus leaves the calendar, unless disabled or readonly.
 * @event syn-before-change - Cancelable, detail-free event before a user commit or Clear. The host exposes the proposed value; synchronous preventDefault restores the previous value and suppresses value events. Not emitted for pending range starts, disabled, or readonly.
 * @event syn-change - Emitted after an accepted user commit or Clear, unless disabled or readonly. In range mode, choosing only the start emits syn-input but not syn-change.
 * @event syn-clear - Emitted when the user clears a non-empty date value, unless disabled or readonly.
 * @event syn-focus - Emitted when focus enters the calendar, unless disabled or readonly.
 * @event syn-input - Emitted when a user changes the selection, unless disabled or readonly.
 */
@enableDefaultSettings('SynCalendar')
export default class SynCalendar extends SynergyElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  static dependencies = {
    'syn-button': SynButton,
    'syn-icon-button': SynIconButton,
  };

  private readonly localize = new LocalizeController(this);

  /**
   * The currently visible view in the calendar ('month', 'year', or 'day').
   * Can be changed via user interaction, e.g. by clicking the header buttons to switch between views.
   */
  @state() private visibleView: CalendarView = 'day';

  /** Disables every interaction surface and suppresses calendar events without clearing the value. */
  @property({ reflect: true, type: Boolean }) disabled = false;

  /**
   * An array of dates that should be disabled in the calendar.
   * Dates should be provided as ISO `YYYY-MM-DD` strings.
  * The attribute accepts whitespace-separated dates, ignoring invalid tokens and duplicates.
   */
  @property({
    attribute: 'disabled-dates',
    converter: {
      fromAttribute: parseDisabledDates,
      toAttribute: (dates: readonly string[]) => dates.join(' '),
    },
    type: Array,
  }) disabledDates: string[] = [];

  /**
   * Use disabled-weekdays to disable specific weekdays.
   * The attribute accepts a space-separated list of three-letter weekday names (sun, mon, tue, wed, thu, fri, sat), in any order.
   * @type Array<'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'>
   */
  @property({
    attribute: 'disabled-weekdays',
    converter: {
      fromAttribute: (value: string | null) => parseDisabledWeekdays(value),
      toAttribute: (weekdays: readonly CalendarWeekday[]) => weekdays.join(' '),
    },
    type: Array,
  }) disabledWeekdays: CalendarWeekday[] = [];

  /**
   * Additional synchronous rule for disabling dates, combined with all declarative constraints.
   * Receives a UTC date-only Date; use getUTCDay() and getUTCDate() to inspect it.
   * Reassign the callback when its captured data changes to re-evaluate focus.
   * Nearest-date and keyboard searches inspect at most 366 days per direction.
   * @type (date: Date) => boolean
   */
  @property({ attribute: false }) isDateDisabled?: CalendarDateDisabledPredicate;

  /**
   * The maximum selectable date as an ISO `YYYY-MM-DD` string.
   * The boundary is inclusive; an empty or invalid value leaves it unset.
   * Assigned selections are preserved. A maximum before the minimum allows no selectable dates.
   */
  @property() max = '';

  /**
   * Maximum inclusive calendar-day count for user-created ranges; only positive integers apply.
   * Preview and completion stop at this boundary when a farther endpoint is requested.
   * Ignored outside range mode. Assigned values are preserved even when they exceed this limit.
   * Unset or invalid limits impose no restriction; a positive maximum below the minimum prevents completion.
   * @type number
   */
  @property({ attribute: 'max-range', type: Number }) maxRange?: number;

  /**
   * The minimum selectable date as an ISO `YYYY-MM-DD` string.
   * The boundary is inclusive; an empty or invalid value leaves it unset.
   * Assigned selections are preserved. A minimum after the maximum allows no selectable dates.
   */
  @property() min = '';

  /**
   * Minimum inclusive calendar-day count for user-created ranges; only positive integers apply.
   * Preview and completion expand to this boundary once movement establishes a direction.
   * Ignored outside range mode. Assigned values are preserved even when shorter than this limit.
   * Unset or invalid limits impose no restriction; a positive minimum above the maximum prevents completion.
   * @type number
   */
  @property({ attribute: 'min-range', type: Number }) minRange?: number;

  /**
   * Determines whether users select one date, a continuous range, or multiple individual dates.
   * Changing mode keeps the earliest date in single, endpoints in range, or expands a previous range in multiple.
   * Mode conversion does not emit user value events.
   * @type 'single' | 'range' | 'multiple'
   */
  @property({
    converter: {
      fromAttribute: parseCalendarSelectionMode,
      toAttribute: (mode: CalendarSelectionMode) => mode,
    },
    reflect: true,
  }) mode: CalendarSelectionMode = 'single';

  /** Prevents selection, Clear, and selection previews while allowing navigation; suppresses calendar events. */
  @property({ reflect: true, type: Boolean }) readonly = false;

  /**
    * Selected dates as ISO `YYYY-MM-DD` strings. Single mode accepts one date, range mode two endpoints
    * (one date is pending), and multiple mode any number of distinct dates.
    * The attribute accepts whitespace-separated dates; any invalid token empties the attribute-derived value.
    * Values are sorted chronologically; multiple selections are unique. Assigned unselectable values are preserved.
    * Programmatic assignments emit no user value events.
    * @type string[]
   */
  @property({
    converter: {
      fromAttribute: parseCalendarValue,
      toAttribute: (dates: readonly string[]) => dates.join(' '),
    },
    type: Array,
  }) value: string[] = [];

  /**
   * The calendar's size, applied to its layout and nested controls.
   * @type 'small' | 'medium' | 'large'
   */
  @property({ reflect: true }) size: CalendarSize = 'medium';

  /**
   * Gets or sets selected values as UTC date-only `Date` instances.
   */
  get valueAsDates(): Date[] {
    return this.value.map(parseIsoDate)
      .filter((date): date is CalendarDate => !!date)
      .map(toNativeDate);
  }

  /**
   * Sets selected values as UTC date-only `Date` instances.
   */
  set valueAsDates(dates: readonly Date[] | null) {
    this.value = dates?.map(fromNativeDate).map(toIsoDate).filter(Boolean) ?? [];
  }

  /**
   * The date currently being viewed in the calendar.
   * This is used to determine which month or year is displayed.
   */
  @state() private viewDate: CalendarDate = today();

  /**
   * The date currently being hovered over by the user.
   */
  @state() private hoveredDate: string | null = null;

  /**
   * The date that currently has focus within the calendar.
   * This is used to manage keyboard navigation and focus restoration.
   */
  @state() private focusedDate: CalendarDate = today();

  /**
   * The month that currently has focus within the calendar.
   * This is used to manage keyboard navigation and focus restoration for the month view.
   */
  @state() private focusedMonth = today().month;

  /**
   * The year that is currently selected in the month selector.
   * This is used to manage keyboard navigation and focus restoration for the month selector.
   */
  @state() private monthSelectorYear = today().year;

  /**
   * The year that currently has focus within the calendar.
   * This is used to manage keyboard navigation and focus restoration for the year view.
   */
  @state() private focusedYear = today().year;

  /**
   * The start year of the currently visible year block in the calendar.
   * This is used to manage keyboard navigation and focus restoration for the year block view.
   */
  @state() private yearBlockStart = getYearBlockStart(today().year);

  /**
   * Indicates whether the calendar currently has focus.
   */
  #hasFocus = false;

  /**
   * Indicates whether the value was updated by the user.
   */
  #valueUpdatedByUser = false;

  /** The active view whose DOM focus should be restored after the next Lit update. */
  #pendingFocus: CalendarView | null = null;

  protected willUpdate(changedProperties: PropertyValues<this>) {
    const modeChanged = changedProperties.has('mode');
    const valueChanged = changedProperties.has('value');

    if (this.disabled || this.readonly || this.mode !== 'range' || this.value.length !== 1) {
      this.hoveredDate = null;
    }

    if (modeChanged || valueChanged) {
      this.#syncValueAndView(changedProperties, modeChanged, valueChanged);
    }

    if (changedProperties.has('disabledDates')
      || changedProperties.has('disabledWeekdays')
      || changedProperties.has('isDateDisabled')
      || changedProperties.has('max')
      || changedProperties.has('min')
      || modeChanged
      || changedProperties.has('value')) {
      this.#normalizeFocusToRange();
    }
  }

  #syncValueAndView(
    changedProperties: PropertyValues<this>,
    modeChanged: boolean,
    valueChanged: boolean,
  ) {
    const shouldUpdateView = !this.#valueUpdatedByUser;
    this.#valueUpdatedByUser = false;
    const previousMode = changedProperties.get('mode');
    const conversionSource = modeChanged && !valueChanged
      && (previousMode === 'single' || previousMode === 'range' || previousMode === 'multiple')
      ? previousMode
      : this.mode;
    const normalizedValue = normalizeCalendarValue(this.value, this.mode, conversionSource);

    if (!areCalendarValuesEqual(normalizedValue, this.value)) {
      this.value = normalizedValue;
    }

    const valueDate = shouldUpdateView ? parseIsoDate(this.value[0]) : null;

    if (valueDate && this.#isDateSelectable(valueDate)) {
      this.#setViewDate(valueDate);
    }
  }

  #getConstraints() {
    return prepareCalendarConstraints({
      disabledDates: this.disabledDates,
      disabledWeekdays: this.disabledWeekdays,
      isDateDisabled: this.isDateDisabled,
      max: parseIsoDate(this.max),
      min: parseIsoDate(this.min),
    });
  }

  #isDateSelectable(date: CalendarDate) {
    return !isDateDisabled(date, this.#getConstraints());
  }

  #isMonthSelectable(year: number, month: number) {
    return isMonthInRange(year, month, this.#getConstraints());
  }

  #isYearSelectable(year: number) {
    return isYearInRange(year, this.#getConstraints());
  }

  #isMonthNavigationDisabled(
    year: number,
    month: number,
    offset: -1 | 1,
    constraints = this.#getConstraints(),
    navigable = hasNavigableDates(constraints, today()),
  ) {
    if (this.disabled || !navigable) {
      return true;
    }

    const { max, min } = constraints;
    const targetMonth = year * 12 + month + offset;

    return offset < 0
      ? !!min && targetMonth < min.year * 12 + min.month
      : !!max && targetMonth > max.year * 12 + max.month;
  }

  #isYearNavigationDisabled(
    year: number,
    offset: -1 | 1,
    constraints = this.#getConstraints(),
    navigable = hasNavigableDates(constraints, today()),
  ) {
    if (this.disabled || !navigable) {
      return true;
    }

    const { max, min } = constraints;

    const targetYear = year + offset;

    return offset < 0
      ? !!min && targetYear < min.year
      : !!max && targetYear > max.year;
  }

  #isYearBlockNavigationDisabled(
    blockStart: number,
    offset: -12 | 12,
    constraints = this.#getConstraints(),
    navigable = hasNavigableDates(constraints, today()),
  ) {
    if (this.disabled || !navigable) {
      return true;
    }

    const { max, min } = constraints;

    const targetBlockStart = blockStart + offset;

    return offset < 0
      ? !!min && targetBlockStart + 11 < min.year
      : !!max && targetBlockStart > max.year;
  }

  #getNearestSelectableDate(date: CalendarDate, constraints: PreparedCalendarConstraints = this.#getConstraints()) {
    return getNearestSelectableDate(date, constraints);
  }

  #getMonthForYear(year: number, preferredMonth: number) {
    return getSelectableMonth(year, preferredMonth, this.#getConstraints());
  }

  #getSelectableYear(blockStart: number, preferredYear: number) {
    return getSelectableYear(blockStart, preferredYear, this.#getConstraints());
  }

  #moveViewYear(offset: -1 | 1) {
    const currentYear = this.viewDate.year;

    if (this.#isYearNavigationDisabled(currentYear, offset)) {
      return;
    }

    this.#setViewMonth(createDate(currentYear + offset, this.viewDate.month, 1));
  }

  #moveMonthSelectorYear(offset: -1 | 1) {
    if (this.#isYearNavigationDisabled(this.monthSelectorYear, offset)) {
      return;
    }

    const year = this.monthSelectorYear + offset;
    const month = this.#getMonthForYear(year, this.focusedMonth);
    this.monthSelectorYear = year;

    if (typeof month === 'number') {
      this.focusedMonth = month;
      this.#pendingFocus = 'month';
    }
  }

  #normalizeFocusToRange() {
    const result = normalizeCalendarFocus(this.#getNavigationState(), this.#getConstraints());
    this.#applyNavigationState(result.state, result.focus);
  }

  #getNavigationState(): CalendarNavigationState {
    return {
      focusedDate: this.focusedDate,
      focusedMonth: this.focusedMonth,
      focusedYear: this.focusedYear,
      monthSelectorYear: this.monthSelectorYear,
      viewDate: this.viewDate,
      visibleView: this.visibleView,
      yearBlockStart: this.yearBlockStart,
    };
  }

  #applyNavigationState(patch: Partial<CalendarNavigationState>, focus: CalendarView | null = null) {
    Object.assign(this, patch);

    if (focus) {
      this.#pendingFocus = focus;
    }
  }

  /**
   * Sets the currently viewed date in the calendar.
   * @param date The date to set as the currently viewed date in the calendar.
   */
  #setViewDate(date: CalendarDate) {
    this.viewDate = date;
    this.focusedDate = date;
  }

  /**
   * Sets the currently viewed month in the calendar.
   * @param date A date within the month to set as the currently viewed month.
   */
  #setViewMonth(date: CalendarDate) {
    if (this.disabled) {
      return;
    }

    this.#applyNavigationState(getMonthNavigationState(date, this.#getConstraints()));
  }

  /**
   * Sets the calendar's value based on user input.
   * @param request The named pending, committed, or Clear update to apply.
   */
  #setValueFromUser(request: CalendarSelectionRequest) {
    const { value } = request;
    const clear = request.kind === 'clear';
    const commit = request.kind !== 'pending';
    const focusDate = request.kind === 'clear' ? null : request.focusDate;

    if (this.disabled || this.readonly || areCalendarValuesEqual(this.value, value)) {
      return;
    }

    if (commit || clear) {
      if (!this.#requestValueChange(value)) {
        return;
      }
    } else {
      this.#valueUpdatedByUser = true;
      this.value = value;
    }

    if (focusDate) {
      if (this.mode === 'range' && commit && !isSameMonth(focusDate, this.viewDate)) {
        this.viewDate = focusDate;
      }

      this.focusedDate = focusDate;
      this.#pendingFocus = 'day';
    }

    if (clear) {
      this.#emitCalendarEvent('syn-clear');
    }

    this.#emitCalendarEvent('syn-input');

    if (commit || clear) {
      this.#emitCalendarEvent('syn-change');
    }
  }

  #emitCalendarEvent(name: CalendarEventName, options?: { cancelable: boolean }) {
    if (this.disabled || this.readonly) {
      return null;
    }

    return this.emit(name, options);
  }

  #requestValueChange(value: string[]) {
    const previousValue = [...this.value];
    this.#valueUpdatedByUser = true;
    this.value = value;

    const beforeChange = this.#emitCalendarEvent('syn-before-change', { cancelable: true });

    if (!beforeChange || beforeChange.defaultPrevented || this.disabled || this.readonly) {
      this.value = previousValue;
      return false;
    }

    return true;
  }

  #selectDate(value: string) {
    const date = parseIsoDate(value);

    if (!date) {
      return;
    }

    const request = proposeDateSelection(date, {
      constraints: this.#getConstraints(),
      mode: this.mode,
      rangeLimits: { maxRange: this.maxRange, minRange: this.minRange },
      value: this.value,
    });

    if (request) {
      this.#setValueFromUser(request);
    }
  }

  /**
   * Handles focus in events for the calendar component.
   * Emits a 'syn-focus' event if the calendar gains focus.
   */
  #handleFocusIn() {
    if (!this.#hasFocus) {
      this.#hasFocus = true;
      this.#emitCalendarEvent('syn-focus');
    }
  }

  /**
   * Suppresses focus out events when the focus moves within the calendar component.
   * Emits a 'syn-blur' event if the focus moves out of the calendar component.
   * @param event The focus out event triggered by the calendar component.
   */
  #handleFocusOut(event: FocusEvent) {
    if (event.relatedTarget instanceof Node && this.renderRoot.contains(event.relatedTarget)) {
      return;
    }

    if (this.#hasFocus) {
      this.#hasFocus = false;
      this.#emitCalendarEvent('syn-blur');
    }
  }

  /**
   * Called after the component has been updated.
   * If the calendar should restore focus to the previously focused day, it does so here.
   */
  protected updated() {
    const view = this.#pendingFocus;
    this.#pendingFocus = null;

    if (this.disabled || !view || view !== this.visibleView) {
      return;
    }

    const targets = { day: toIsoDate(this.focusedDate), month: this.focusedMonth - 1, year: this.focusedYear };
    this.renderRoot.querySelector<HTMLButtonElement>(`[data-kind="${view}"][data-value="${targets[view]}"]`)?.focus();
  }

  /**
   * Handles keyboard navigation within the calendar for a specific day.
   * @param event The keyboard event triggered by the user.
   * @param day The date of the day that received the keyboard event.
   * @returns void
   */
  #handleDayKeydown(event: KeyboardEvent, day: CalendarDate) {
    const dayOffset = DAY_KEY_OFFSETS[event.key];

    if (typeof dayOffset !== 'number') {
      return;
    }

    event.preventDefault();
    const nextDate = getNextSelectableDate(
      day,
      dayOffset,
      this.#getConstraints(),
    );

    if (!nextDate || !this.#isDateSelectable(nextDate)) {
      return;
    }

    if (equals(nextDate, day)) {
      return;
    }

    this.#setViewDate(nextDate);

    if (!this.readonly && this.mode === 'range' && this.value.length === 1) {
      this.hoveredDate = toIsoDate(nextDate);
    }

    this.#pendingFocus = 'day';
  }

  /**
   * Opens the month view for a specific month.
  * @param month The month to open (1-12).
   */
  #openMonth(month: number) {
    if (this.disabled || !this.#isMonthSelectable(this.monthSelectorYear, month)) {
      return;
    }

    this.#setViewMonth(createDate(this.monthSelectorYear, month, 1));
    this.#showDayView();
  }

  /**
   * Shows the month selector view.
   */
  #showMonthSelector() {
    if (this.disabled) {
      return;
    }

    this.#applyNavigationState(
      getMonthSelectorState(this.#getNavigationState(), parseIsoDate(this.value[0]), this.#getConstraints()),
      'month',
    );
  }

  /**
   * Shows the day view of the calendar.
   */
  #showDayView() {
    if (this.disabled) {
      return;
    }

    this.#applyNavigationState(
      getDayViewState(this.#getNavigationState(), parseIsoDate(this.value[0]), this.#getConstraints()),
      'day',
    );
  }

  /**
   * Shows the year selector view.
   */
  #showYearSelector() {
    if (this.disabled) {
      return;
    }

    this.#applyNavigationState(
      getYearSelectorState(this.#getNavigationState(), parseIsoDate(this.value[0]), this.#getConstraints()),
      'year',
    );
  }

  /**
   * Opens the day view for a specific year.
   * @param year The year to open.
   */
  #openYear(year: number) {
    if (this.disabled || !this.#isYearSelectable(year)) {
      return;
    }

    const month = this.#getMonthForYear(year, this.viewDate.month);

    if (typeof month !== 'number') {
      return;
    }

    this.#setViewMonth(createDate(year, month, 1));
    this.#showDayView();
  }

  /**
   * Pages the year block by a given offset.
   * @param offset The number of years to offset the year block by.
   */
  #pageYears(offset: -12 | 12) {
    const nextBlock = this.yearBlockStart + offset;

    if (this.#isYearBlockNavigationDisabled(this.yearBlockStart, offset)) {
      return;
    }

    const nextYear = this.#getSelectableYear(nextBlock, this.focusedYear + offset);
    this.yearBlockStart = nextBlock;

    if (typeof nextYear === 'number') {
      this.focusedYear = nextYear;
      this.#pendingFocus = 'year';
    } else {
      this.focusedYear = offset > 0 ? nextBlock : nextBlock + 11;
    }
  }

  /**
   * Handles keydown events for the year view.
   * @param event The keyboard event.
   * @param year The currently focused year.
   */
  #handleYearKeydown(event: KeyboardEvent, year: number) {
    const offset = PERIOD_KEY_OFFSETS[event.key];

    if (typeof offset !== 'number') {
      return;
    }

    event.preventDefault();
    const nextDate = this.#getNearestSelectableDate(createDate(year + offset, 1, 1));

    if (!nextDate || !this.#isYearSelectable(nextDate.year)) {
      return;
    }

    this.focusedYear = nextDate.year;
    this.yearBlockStart = getYearBlockStart(this.focusedYear);
    this.#pendingFocus = 'year';
  }

  /**
   * Handles keydown events for the month view.
   * @param event The keyboard event.
  * @param month The currently focused month (1-12).
   */
  #handleMonthKeydown(event: KeyboardEvent, month: number) {
    const offset = PERIOD_KEY_OFFSETS[event.key];

    if (typeof offset !== 'number') {
      return;
    }

    event.preventDefault();
    const date = this.#getNearestSelectableDate(
      addMonths(createDate(this.monthSelectorYear, month, 1), offset),
    );

    if (!date || !this.#isMonthSelectable(date.year, date.month)) {
      return;
    }

    this.monthSelectorYear = date.year;
    this.focusedMonth = date.month;
    this.#pendingFocus = 'month';
  }

  /**
   * Retrieves the grid button element from an event.
   * @param event The event triggered by the grid.
   * @returns The HTMLButtonElement if found, otherwise undefined.
   */
  #getCalendarItem(event: Event) {
    return event.composedPath().find((target): target is HTMLButtonElement => (
      target instanceof HTMLButtonElement
      && this.renderRoot.contains(target)
      && target.matches('[data-kind][data-value]')
    ));
  }

  /**
   * Handles click events on the calendar grid.
   * @param event The mouse event triggered by the grid.
   */
  #handleGridClick(event: MouseEvent) {
    if (this.disabled) {
      return;
    }

    const button = this.#getCalendarItem(event);

    if (!button || button.disabled || button.dataset.value === undefined) {
      return;
    }

    switch (button.dataset.kind) {
      case 'day': {
        const date = parseIsoDate(button.dataset.value);

        if (date && this.#isDateSelectable(date)) {
          this.#selectDate(button.dataset.value);
        }
        break;
      }
      case 'month':
        this.#openMonth(Number(button.dataset.value) + 1);
        break;
      case 'year':
        this.#openYear(Number(button.dataset.value));
        break;
      default:
        break;
    }
  }

  #handleGridPointerOver(event: PointerEvent) {
    const button = this.#getCalendarItem(event);

    if (this.disabled
      || this.readonly
      || this.mode !== 'range'
      || this.value.length !== 1
      || !button
      || button.dataset.kind !== 'day'
      || button.disabled) {
      return;
    }

    const date = parseIsoDate(button.dataset.value);

    if (!date || !this.#isDateSelectable(date)) {
      return;
    }

    const hoveredDate = toIsoDate(date);

    if (this.hoveredDate !== hoveredDate) {
      this.hoveredDate = hoveredDate;
    }
  }

  #handleGridPointerLeave() {
    this.hoveredDate = null;
  }

  /**
   * Handles keydown events on the calendar grid.
   * @param event The keyboard event triggered by the grid.
   */
  #handleGridKeydown(event: KeyboardEvent) {
    if (this.disabled) {
      return;
    }

    const button = this.#getCalendarItem(event);

    if (!button || button.disabled) {
      return;
    }

    if (button.dataset.kind === 'day') {
      const date = parseIsoDate(button.dataset.value);

      if (date) {
        this.#handleDayKeydown(event, date);
      }
    } else if (button.dataset.kind === 'month') {
      this.#handleMonthKeydown(event, Number(button.dataset.value) + 1);
    } else if (button.dataset.kind === 'year') {
      this.#handleYearKeydown(event, Number(button.dataset.value));
    }
  }

  /**
   * Handles focus events on the calendar grid.
   * @param event The focus event triggered by the grid.
   */
  #handleGridFocus(event: FocusEvent) {
    if (this.disabled) {
      return;
    }

    const button = this.#getCalendarItem(event);

    if (button?.dataset.kind === 'month') {
      this.focusedMonth = Number(button.dataset.value) + 1;
    } else if (button?.dataset.kind === 'year') {
      this.focusedYear = Number(button.dataset.value);
    }
  }

  /**
   * Shows the current period (day, month, or year) based on the visible view.
   */
  #showCurrentPeriod() {
    if (this.disabled) {
      return;
    }

    const current = this.#getNearestSelectableDate(today());

    if (!current) {
      return;
    }

    switch (this.visibleView) {
      case 'day':
        this.#setViewDate(current);
        this.#pendingFocus = 'day';
        break;

      case 'month':
        this.monthSelectorYear = current.year;
        this.focusedMonth = this.#getMonthForYear(current.year, current.month)
          ?? current.month;
        this.#pendingFocus = 'month';
        break;

      case 'year':
      default:
        this.focusedYear = current.year;
        this.yearBlockStart = getYearBlockStart(this.focusedYear);
        this.#pendingFocus = 'year';
        break;
    }

    // Makes sure that focus is restored to the correct element after updating the view.
    this.requestUpdate();
  }

  #renderView() {
    const bounds = this.#getConstraints();
    const current = today();
    const navigable = hasNavigableDates(bounds, current);
    const selectedDates = this.value.map(parseIsoDate).filter((date): date is CalendarDate => !!date);
    const selectedDate = selectedDates[0] ?? null;
    const footer = {
      clearDisabled: this.readonly,
      clearLabel: this.localize.term('calendarClear'),
      currentDisabled: !this.#getNearestSelectableDate(current, bounds),
      disabled: this.disabled,
      hasValue: this.value.length > 0,
      onClear: () => this.#setValueFromUser({ kind: 'clear', value: [] }),
      onCurrent: () => this.#showCurrentPeriod(),
      size: this.size,
    };
    const common = { ...footer, constraints: bounds };

    if (this.visibleView === 'year') {
      return renderYearView({
        ...common,
        activeYear: selectedDate?.year,
        blockStart: this.yearBlockStart,
        currentLabel: this.localize.term('calendarThisYear'),
        focusedYear: this.focusedYear,
        navigation: {
          disabled: this.disabled,
          label: `${this.yearBlockStart} - ${this.yearBlockStart + 11}`,
          nextDisabled: this.#isYearBlockNavigationDisabled(this.yearBlockStart, 12, bounds, navigable),
          nextLabel: this.localize.term('calendarNextYearBlock'),
          onChoose: () => this.#showDayView(),
          onNext: () => this.#pageYears(12),
          onPrevious: () => this.#pageYears(-12),
          previousDisabled: this.#isYearBlockNavigationDisabled(this.yearBlockStart, -12, bounds, navigable),
          previousLabel: this.localize.term('calendarPreviousYearBlock'),
          size: this.size,
        },
      });
    }

    const navigationYear = this.visibleView === 'month' ? this.monthSelectorYear : this.viewDate.year;
    const nextYearDisabled = this.#isYearNavigationDisabled(navigationYear, 1, bounds, navigable);
    const previousYearDisabled = this.#isYearNavigationDisabled(navigationYear, -1, bounds, navigable);

    const yearNavigation: CalendarNavigationOptions = {
      disabled: this.disabled,
      label: navigationYear,
      nextDisabled: nextYearDisabled,
      nextLabel: this.localize.term('calendarNextYear'),
      onChoose: () => this.#showYearSelector(),
      onNext: () => {
        if (this.visibleView === 'month') {
          this.#moveMonthSelectorYear(1);
        } else {
          this.#moveViewYear(1);
        }
      },
      onPrevious: () => {
        if (this.visibleView === 'month') {
          this.#moveMonthSelectorYear(-1);
        } else {
          this.#moveViewYear(-1);
        }
      },
      previousDisabled: previousYearDisabled,
      previousLabel: this.localize.term('calendarPreviousYear'),
      size: this.size,
    };

    if (this.visibleView === 'month') {
      return renderMonthView({
        ...common,
        activeMonth: this.monthSelectorYear === this.viewDate.year
          ? this.viewDate.month
          : undefined,
        currentLabel: this.localize.term('calendarThisMonth'),
        focusedMonth: this.focusedMonth,
        locale: this.localize.lang(),
        year: this.monthSelectorYear,
        yearNavigation,
      });
    }

    return renderDayView({
      ...common,
      currentLabel: this.localize.term('calendarToday'),
      focusedDate: this.focusedDate,
      hoveredDate: this.readonly ? null : parseIsoDate(this.hoveredDate),
      locale: this.localize.lang(),
      maxRange: this.maxRange,
      minRange: this.minRange,
      mode: this.mode,
      monthNavigation: {
        disabled: this.disabled,
        label: getMonthLabel(this.viewDate, this.localize.lang()),
        nextDisabled: this.#isMonthNavigationDisabled(
          this.viewDate.year,
          this.viewDate.month,
          1,
          bounds,
          navigable,
        ),
        nextLabel: this.localize.term('calendarNextMonth'),
        onChoose: () => this.#showMonthSelector(),
        onNext: () => this.#setViewMonth(addMonths(this.viewDate, 1)),
        onPrevious: () => this.#setViewMonth(addMonths(this.viewDate, -1)),
        previousDisabled: this.#isMonthNavigationDisabled(
          this.viewDate.year,
          this.viewDate.month,
          -1,
          bounds,
          navigable,
        ),
        previousLabel: this.localize.term('calendarPreviousMonth'),
        size: this.size,
      },
      readonly: this.readonly,
      selectedDates,
      viewDate: this.viewDate,
      yearNavigation,
    });
  }

  render() {
    const { header, content, footer } = this.#renderView();

    return html`
      <div
        class=${classMap({
          calendar: true,
          'calendar--disabled': this.disabled,
          'calendar--readonly': this.readonly,
          [`calendar--size-${this.size}`]: true,
          [`calendar--view-${this.visibleView}`]: true,
        })}
        @focusin=${this.#handleFocusIn}
        @focusout=${this.#handleFocusOut}
        @syn-blur=${stopNestedFocusEvent}
        @syn-focus=${stopNestedFocusEvent}
        ?inert=${this.disabled}
        part="base"
      >
        <div class="header" part="header">
          ${header}
        </div>
        <!--/.header -->

        <div
          class="content"
          part="content"
          @click=${this.#handleGridClick}
          @keydown=${this.#handleGridKeydown}
          @focusin=${this.#handleGridFocus}
          @pointerleave=${this.#handleGridPointerLeave}
          @pointerover=${this.#handleGridPointerOver}
        >
          ${content}
        </div>
        <!--/.content -->

        <div class="footer" part="footer">
          ${footer}
        </div>
        <!--/.footer -->
      </div>
    `;
  }
}
