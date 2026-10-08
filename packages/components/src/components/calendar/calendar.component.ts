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
  endOfMonth,
  equals,
} from 'temporal-polyfill/fns/PlainDate';
import componentStyles from '../../styles/component.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import SynButton from '../button/button.js';
import SynIconButton from '../icon-button/icon-button.js';
import { LocalizeController } from '../../utilities/localize.js';
import type {
  CalendarDate,
  CalendarDayOffset,
  CalendarNavigationOptions,
  CalendarView,
} from './internal-types.js';
import type {
  CalendarSelectionMode,
  CalendarSize,
  CalendarWeekday,
} from './types.js';
import {
  areCalendarValuesEqual,
  fromNativeDate,
  getFirstSelectableDateInRange,
  getMonthLabel,
  getNearestSelectableDate,
  getNextSelectableDate,
  getYearBlockStart,
  isDateDisabled,
  isMonthInRange,
  isSameMonth,
  isYearInRange,
  normalizeCalendarValue,
  parseCalendarSelectionMode,
  parseCalendarValue,
  parseDisabledDates,
  parseDisabledWeekdays,
  parseIsoDate,
  toIsoDate,
  toNativeDate,
  today,
} from './utils.js';
import { renderDayView } from './renderers/day.js';
import { renderMonthView } from './renderers/month.js';
import { renderYearView } from './renderers/year.js';
import styles from './calendar.styles.js';
import { enableDefaultSettings } from '../../utilities/defaultSettings/decorator.js';

/**
 * Suppresses nested focus events within the calendar component.
 * @param event The focus event to stop from propagating.
 */
const stopNestedFocusEvent = (event: Event) => {
  event.stopPropagation();
};

/**
 * @summary Calendars allow users to select dates from a calendar interface.
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-calendar--docs
 * @status experimental
 * @since 0.0.0
 *
 * @dependency syn-button
 * @dependency syn-icon-button
 *
 * @csspart base - The component's base wrapper.
 * @csspart header - The calendar header.
 * @csspart content - The calendar view content.
 * @csspart footer - The calendar footer actions.
 * @csspart day-grid - The day-of-month table.
 * @csspart month-grid - The month selection grid.
 * @csspart year-grid - The year selection grid.
 * @csspart calendar-item - A day, month, or year button.
 * @csspart calendar-item-day - A day button.
 * @csspart calendar-item-month - A month button.
 * @csspart calendar-item-year - A year button.
 * @csspart calendar-item-active - An active calendar item.
 * @csspart calendar-item-today - The item representing today.
 * @csspart calendar-item-outside - A day item belonging to an adjacent month.
 * @csspart calendar-item-disabled - A disabled calendar item.
 * @csspart calendar-item-range-begin - The beginning of a selected or previewed range.
 * @csspart calendar-item-range-start - The start of a selected date range.
 * @csspart calendar-item-range-end - The end of a selected date range.
 * @csspart calendar-item-range-interior - A date inside the selected or previewed range.
 * @csspart calendar-item-range-pending - The selected start while waiting for a range end.
 * @csspart calendar-item-range-preview - A date in the pending range under the pointer.
 * @csspart month-navigation - The month navigation controls.
 * @csspart year-navigation - The year navigation controls.
 * @csspart previous-button - The previous-period navigation button.
 * @csspart navigation-label - The current month, year, or year range in the navigation header.
 * @csspart next-button - The next-period navigation button.
 * @csspart current-period-button - The button for navigating to the current day, month, or year.
 * @csspart clear-button - The button for clearing the selected value.
 *
 * @cssproperty --syn-calendar-min-width - The minimum width of the calendar. Defaults to 388px.
 *
 * @event syn-blur - Emitted when focus leaves the calendar.
 * @event syn-before-change - Emitted before user change events with the proposed value temporarily set on the host; preventDefault restores the previous value.
 * @event syn-change - Emitted when a user commits a selection; in range mode this occurs after the end date is chosen.
 * @event syn-clear - Emitted when the user clears a non-empty date value.
 * @event syn-focus - Emitted when focus enters the calendar.
 * @event syn-input - Emitted when a user changes the selection.
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

  /**
   * An array of dates that should be disabled in the calendar.
   * Dates should be provided as ISO `YYYY-MM-DD` strings.
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

  @property() max = '';

  @property() min = '';

  /**
   * Determines whether users select one date, a continuous range, or multiple individual dates.
   * @type 'single' | 'range' | 'multiple'
   */
  @property({
    converter: {
      fromAttribute: parseCalendarSelectionMode,
      toAttribute: (mode: CalendarSelectionMode) => mode,
    },
    reflect: true,
  }) mode: CalendarSelectionMode = 'single';

  /**
  * Selected dates as ISO `YYYY-MM-DD` strings. Single mode accepts one date, range mode two endpoints
  * (one date is pending), and multiple mode any number of distinct dates.
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
   * The calendars's size.
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

  #valueUpdatedByUser = false;

  /**
   * Indicates whether the calendar should restore focus to the previously focused year after a view change.
   */
  #restoreYearFocus = false;

  /**
   * Indicates whether the calendar should restore focus to the previously focused month after a view change.
   */
  #restoreMonthFocus = false;

  /**
   * Indicates whether the calendar should restore focus to the previously focused day after a view change.
   */
  #restoreDayFocus = false;

  protected willUpdate(changedProperties: PropertyValues<this>) {
    const modeChanged = changedProperties.has('mode');
    const valueChanged = changedProperties.has('value');

    if (this.mode !== 'range' || this.value.length !== 1) {
      this.hoveredDate = null;
    }

    if (modeChanged || valueChanged) {
      this.#syncValueAndView(changedProperties, modeChanged, valueChanged);
    }

    if (changedProperties.has('disabledDates')
      || changedProperties.has('disabledWeekdays')
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

  #getBounds() {
    return {
      disabledDates: this.disabledDates,
      disabledWeekdays: this.disabledWeekdays,
      max: parseIsoDate(this.max),
      min: parseIsoDate(this.min),
    };
  }

  #isDateSelectable(date: CalendarDate) {
    const {
      disabledDates, disabledWeekdays, max, min,
    } = this.#getBounds();
    return !isDateDisabled(date, min, max, disabledDates, disabledWeekdays);
  }

  #isMonthSelectable(year: number, month: number) {
    const {
      disabledDates, disabledWeekdays, max, min,
    } = this.#getBounds();
    return isMonthInRange(year, month, min, max, disabledDates, disabledWeekdays);
  }

  #isYearSelectable(year: number) {
    const {
      disabledDates, disabledWeekdays, max, min,
    } = this.#getBounds();
    return isYearInRange(year, min, max, disabledDates, disabledWeekdays);
  }

  #isMonthNavigationDisabled(year: number, month: number, offset: -1 | 1) {
    if (!this.#hasSelectableDates()) {
      return true;
    }

    const { max, min } = this.#getBounds();
    const targetMonth = year * 12 + month + offset;

    return offset < 0
      ? !!min && targetMonth < min.year * 12 + min.month
      : !!max && targetMonth > max.year * 12 + max.month;
  }

  #isYearNavigationDisabled(year: number, offset: -1 | 1) {
    if (!this.#hasSelectableDates()) {
      return true;
    }

    const { max, min } = this.#getBounds();

    const targetYear = year + offset;

    return offset < 0
      ? !!min && targetYear < min.year
      : !!max && targetYear > max.year;
  }

  #isYearBlockNavigationDisabled(blockStart: number, offset: -12 | 12) {
    if (!this.#hasSelectableDates()) {
      return true;
    }

    const { max, min } = this.#getBounds();

    const targetBlockStart = blockStart + offset;

    return offset < 0
      ? !!min && targetBlockStart + 11 < min.year
      : !!max && targetBlockStart > max.year;
  }

  #hasSelectableDates() {
    const {
      disabledDates, disabledWeekdays, max, min,
    } = this.#getBounds();
    return !!getNearestSelectableDate(today(), min, max, disabledDates, disabledWeekdays);
  }

  #getNearestSelectableDate(date: CalendarDate) {
    const {
      disabledDates, disabledWeekdays, max, min,
    } = this.#getBounds();
    return getNearestSelectableDate(date, min, max, disabledDates, disabledWeekdays);
  }

  #getFirstSelectableDateInMonth(year: number, month: number) {
    const {
      disabledDates, disabledWeekdays, max, min,
    } = this.#getBounds();

    return getFirstSelectableDateInRange(
      createDate(year, month, 1),
      endOfMonth(createDate(year, month, 1)),
      min,
      max,
      disabledDates,
      disabledWeekdays,
    );
  }

  #getMonthForYear(year: number, preferredMonth: number) {
    const months = Array.from({ length: 12 }, (_, month) => month + 1)
      .filter(month => this.#isMonthSelectable(year, month));

    return months.sort((a, b) => (
      Math.abs(a - preferredMonth) - Math.abs(b - preferredMonth)
    ))[0];
  }

  #getSelectableYear(blockStart: number, preferredYear: number) {
    return Array.from({ length: 12 }, (_, index) => blockStart + index)
      .filter(year => this.#isYearSelectable(year))
      .sort((a, b) => Math.abs(a - preferredYear) - Math.abs(b - preferredYear))[0];
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
      this.#restoreMonthFocus = true;
    }
  }

  #normalizeFocusToRange() {
    this.#normalizeDayFocus();
    this.#normalizeMonthFocus();
    this.#normalizeYearFocus();
  }

  #normalizeDayFocus() {
    const nearestDate = this.#getNearestSelectableDate(this.focusedDate);

    if (nearestDate && !equals(nearestDate, this.focusedDate)) {
      this.#setViewDate(nearestDate);
    }

    if (this.visibleView === 'day' && nearestDate) {
      this.#restoreDayFocus = true;
    }
  }

  #normalizeMonthFocus() {
    const nearestMonth = this.#getNearestSelectableDate(
      createDate(this.monthSelectorYear, this.focusedMonth, 1),
    );

    if (nearestMonth) {
      this.monthSelectorYear = nearestMonth.year;
      this.focusedMonth = nearestMonth.month;
    }

    if (this.visibleView === 'month' && nearestMonth) {
      this.#restoreMonthFocus = true;
    }
  }

  #normalizeYearFocus() {
    const nearestYear = this.#getNearestSelectableDate(createDate(this.focusedYear, 1, 1));

    if (nearestYear) {
      this.focusedYear = nearestYear.year;
      this.yearBlockStart = getYearBlockStart(this.focusedYear);
    }

    if (this.visibleView === 'year' && nearestYear) {
      this.#restoreYearFocus = true;
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
    const { year } = date;
    const requestedMonth = date.month;
    const month = this.#isMonthSelectable(year, requestedMonth)
      ? requestedMonth
      : this.#getMonthForYear(year, requestedMonth);
    const visibleMonth = typeof month === 'number' ? month : requestedMonth;
    const firstSelectableDate = this.#getFirstSelectableDateInMonth(year, visibleMonth);

    this.viewDate = createDate(year, visibleMonth, 1);
    this.focusedDate = firstSelectableDate ?? this.viewDate;
  }

  /**
   * Sets the calendar's value based on user input.
   * @param value The new dates to set for the calendar.
   * @param clear Whether to clear the current value before setting the new one.
   * @param commit Whether to emit `syn-change` after updating the value.
   */
  #setValueFromUser(value: string[], clear = false, commit = true, focusDate?: CalendarDate) {
    if (areCalendarValuesEqual(this.value, value)) {
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
      this.focusedDate = focusDate;
      this.#restoreDayFocus = true;
    }

    if (clear) {
      this.emit('syn-clear');
    }

    this.emit('syn-input');

    if (commit || clear) {
      this.emit('syn-change');
    }
  }

  #requestValueChange(value: string[]) {
    const previousValue = [...this.value];
    this.#valueUpdatedByUser = true;
    this.value = value;

    const beforeChange = this.emit('syn-before-change', { cancelable: true });

    if (beforeChange.defaultPrevented) {
      this.value = previousValue;
      return false;
    }

    return true;
  }

  #selectDate(value: string) {
    const focusDate = parseIsoDate(value);

    if (!focusDate) {
      return;
    }

    if (this.mode === 'range') {
      if (this.value.length !== 1) {
        this.#setValueFromUser([value], false, false, focusDate);
        return;
      }

      this.#setValueFromUser([...this.value, value].sort(), false, true, focusDate);
      return;
    }

    if (this.mode === 'multiple') {
      const nextValue = this.value.includes(value)
        ? this.value.filter(date => date !== value)
        : [...this.value, value];
      this.#setValueFromUser(nextValue.sort(), false, true, focusDate);
      return;
    }

    this.#setValueFromUser([value], false, true, focusDate);
  }

  /**
   * Handles focus in events for the calendar component.
   * Emits a 'syn-focus' event if the calendar gains focus.
   */
  #handleFocusIn() {
    if (!this.#hasFocus) {
      this.#hasFocus = true;
      this.emit('syn-focus');
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
      this.emit('syn-blur');
    }
  }

  /**
   * Called after the component has been updated.
   * If the calendar should restore focus to the previously focused day, it does so here.
   */
  protected updated() {
    if (this.#restoreYearFocus) {
      this.#restoreYearFocus = false;
      this.renderRoot.querySelector<HTMLButtonElement>(`[data-kind="year"][data-value="${this.focusedYear}"]`)?.focus();
    }

    if (this.#restoreMonthFocus) {
      this.#restoreMonthFocus = false;
      this.renderRoot.querySelector<HTMLButtonElement>(`[data-kind="month"][data-value="${this.focusedMonth - 1}"]`)?.focus();
    }

    if (this.#restoreDayFocus) {
      this.#restoreDayFocus = false;
      const date = toIsoDate(this.focusedDate);
      this.renderRoot.querySelector<HTMLButtonElement>(`[data-kind="day"][data-value="${date}"]`)?.focus();
    }
  }

  /**
   * Handles keyboard navigation within the calendar for a specific day.
   * @param event The keyboard event triggered by the user.
   * @param day The date of the day that received the keyboard event.
   * @returns void
   */
  #handleDayKeydown(event: KeyboardEvent, day: CalendarDate) {
    const dayOffsets: Record<string, number> = {
      ArrowDown: 7,
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
    };
    const dayOffset = dayOffsets[event.key];

    if (typeof dayOffset !== 'number') {
      return;
    }

    event.preventDefault();
    const {
      disabledDates, disabledWeekdays, max, min,
    } = this.#getBounds();
    const nextDate = getNextSelectableDate(
      day,
      dayOffset as CalendarDayOffset,
      min,
      max,
      disabledDates,
      disabledWeekdays,
    );

    if (!nextDate || !this.#isDateSelectable(nextDate)) {
      return;
    }

    if (equals(nextDate, day)) {
      return;
    }

    this.#setViewDate(nextDate);

    if (this.mode === 'range' && this.value.length === 1) {
      this.hoveredDate = toIsoDate(nextDate);
    }

    this.#restoreDayFocus = true;
  }

  /**
   * Opens the month view for a specific month.
  * @param month The month to open (1-12).
   */
  #openMonth(month: number) {
    if (!this.#isMonthSelectable(this.monthSelectorYear, month)) {
      return;
    }

    this.#setViewMonth(createDate(this.monthSelectorYear, month, 1));
    this.#showDayView();
  }

  /**
   * Shows the month selector view.
   */
  #showMonthSelector() {
    const valueDate = parseIsoDate(this.value[0]);
    const viewedYear = this.viewDate.year;

    this.monthSelectorYear = viewedYear;
    const preferredMonth = valueDate
      && this.#isDateSelectable(valueDate)
      && valueDate.year === viewedYear
      ? valueDate.month
      : this.viewDate.month;
    const selectableMonth = this.#getMonthForYear(viewedYear, preferredMonth);

    if (typeof selectableMonth === 'number') {
      this.focusedMonth = selectableMonth;
    }
    this.visibleView = 'month';
    this.#restoreMonthFocus = true;
  }

  /**
   * Shows the day view of the calendar.
   */
  #showDayView() {
    const valueDate = parseIsoDate(this.value[0]);

    if (valueDate && this.#isDateSelectable(valueDate) && isSameMonth(valueDate, this.viewDate)) {
      this.focusedDate = valueDate;
    }

    this.visibleView = 'day';
    this.#restoreDayFocus = true;
  }

  /**
   * Shows the year selector view.
   */
  #showYearSelector() {
    this.focusedYear = this.visibleView === 'month'
      ? this.monthSelectorYear
      : this.viewDate.year;
    this.yearBlockStart = getYearBlockStart(this.focusedYear);
    const valueDate = parseIsoDate(this.value[0]);

    if (valueDate) {
      const valueYear = valueDate.year;

      if (valueYear >= this.yearBlockStart
        && valueYear < this.yearBlockStart + 12
        && this.#isYearSelectable(valueYear)) {
        this.focusedYear = valueYear;
      }
    }

    const selectableYear = this.#getSelectableYear(this.yearBlockStart, this.focusedYear);

    if (typeof selectableYear === 'number') {
      this.focusedYear = selectableYear;
    }

    this.visibleView = 'year';
    this.#restoreYearFocus = true;
  }

  /**
   * Opens the day view for a specific year.
   * @param year The year to open.
   */
  #openYear(year: number) {
    if (!this.#isYearSelectable(year)) {
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
      this.#restoreYearFocus = true;
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
    const yearOffsets: Record<string, number> = {
      ArrowDown: 3,
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -3,
    };
    const offset = yearOffsets[event.key];

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
    this.#restoreYearFocus = true;
  }

  /**
   * Handles keydown events for the month view.
   * @param event The keyboard event.
  * @param month The currently focused month (1-12).
   */
  #handleMonthKeydown(event: KeyboardEvent, month: number) {
    const monthOffsets: Record<string, number> = {
      ArrowDown: 3,
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -3,
    };
    const offset = monthOffsets[event.key];

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
    this.#restoreMonthFocus = true;
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

    if (this.mode !== 'range'
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
    const current = this.#getNearestSelectableDate(today());

    if (!current) {
      return;
    }

    switch (this.visibleView) {
      case 'day':
        this.#setViewDate(current);
        this.#restoreDayFocus = true;
        break;

      case 'month':
        this.monthSelectorYear = current.year;
        this.focusedMonth = this.#getMonthForYear(current.year, current.month)
          ?? current.month;
        this.#restoreMonthFocus = true;
        break;

      case 'year':
      default:
        this.focusedYear = current.year;
        this.yearBlockStart = getYearBlockStart(this.focusedYear);
        this.#restoreYearFocus = true;
        break;
    }

    // Makes sure that focus is restored to the correct element after updating the view.
    this.requestUpdate();
  }

  #renderView() {
    const bounds = this.#getBounds();
    const footer = {
      clearLabel: this.localize.term('calendarClear'),
      currentDisabled: !this.#hasSelectableDates(),
      hasValue: this.value.length > 0,
      onClear: () => this.#setValueFromUser([], true),
      onCurrent: () => this.#showCurrentPeriod(),
      size: this.size,
    };

    if (this.visibleView === 'year') {
      return renderYearView({
        ...footer,
        activeYear: parseIsoDate(this.value[0])?.year,
        blockStart: this.yearBlockStart,
        currentLabel: this.localize.term('calendarThisYear'),
        disabledDates: bounds.disabledDates,
        disabledWeekdays: bounds.disabledWeekdays,
        focusedYear: this.focusedYear,
        max: bounds.max,
        min: bounds.min,
        navigation: {
          label: `${this.yearBlockStart} - ${this.yearBlockStart + 11}`,
          nextDisabled: this.#isYearBlockNavigationDisabled(this.yearBlockStart, 12),
          nextLabel: this.localize.term('calendarNextYearBlock'),
          onChoose: () => this.#showDayView(),
          onNext: () => this.#pageYears(12),
          onPrevious: () => this.#pageYears(-12),
          previousDisabled: this.#isYearBlockNavigationDisabled(this.yearBlockStart, -12),
          previousLabel: this.localize.term('calendarPreviousYearBlock'),
          size: this.size,
        },
      });
    }

    const yearNavigation: CalendarNavigationOptions = {
      label: this.visibleView === 'month'
        ? this.monthSelectorYear
        : this.viewDate.year,
      nextDisabled: this.visibleView === 'month'
        ? this.#isYearNavigationDisabled(this.monthSelectorYear, 1)
        : this.#isYearNavigationDisabled(this.viewDate.year, 1),
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
      previousDisabled: this.visibleView === 'month'
        ? this.#isYearNavigationDisabled(this.monthSelectorYear, -1)
        : this.#isYearNavigationDisabled(this.viewDate.year, -1),
      previousLabel: this.localize.term('calendarPreviousYear'),
      size: this.size,
    };

    if (this.visibleView === 'month') {
      return renderMonthView({
        ...footer,
        activeMonth: this.monthSelectorYear === this.viewDate.year
          ? this.viewDate.month
          : undefined,
        currentLabel: this.localize.term('calendarThisMonth'),
        disabledDates: bounds.disabledDates,
        disabledWeekdays: bounds.disabledWeekdays,
        focusedMonth: this.focusedMonth,
        locale: this.localize.lang(),
        max: bounds.max,
        min: bounds.min,
        year: this.monthSelectorYear,
        yearNavigation,
      });
    }

    return renderDayView({
      ...footer,
      currentLabel: this.localize.term('calendarToday'),
      disabledDates: bounds.disabledDates,
      disabledWeekdays: bounds.disabledWeekdays,
      focusedDate: this.focusedDate,
      hoveredDate: parseIsoDate(this.hoveredDate),
      locale: this.localize.lang(),
      max: bounds.max,
      min: bounds.min,
      mode: this.mode,
      monthNavigation: {
        label: getMonthLabel(this.viewDate, this.localize.lang()),
        nextDisabled: this.#isMonthNavigationDisabled(
          this.viewDate.year,
          this.viewDate.month,
          1,
        ),
        nextLabel: this.localize.term('calendarNextMonth'),
        onChoose: () => this.#showMonthSelector(),
        onNext: () => this.#setViewMonth(addMonths(this.viewDate, 1)),
        onPrevious: () => this.#setViewMonth(addMonths(this.viewDate, -1)),
        previousDisabled: this.#isMonthNavigationDisabled(
          this.viewDate.year,
          this.viewDate.month,
          -1,
        ),
        previousLabel: this.localize.term('calendarPreviousMonth'),
        size: this.size,
      },
      selectedDates: this.value.map(parseIsoDate).filter((date): date is CalendarDate => !!date),
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
          [`calendar--size-${this.size}`]: true,
          [`calendar--view-${this.visibleView}`]: true,
        })}
        @focusin=${this.#handleFocusIn}
        @focusout=${this.#handleFocusOut}
        @syn-blur=${stopNestedFocusEvent}
        @syn-focus=${stopNestedFocusEvent}
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
