import {
  type CSSResultGroup,
  type PropertyValues,
  html,
} from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, state } from 'lit/decorators.js';
import componentStyles from '../../styles/component.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import SynButton from '../button/button.js';
import SynIconButton from '../icon-button/icon-button.js';
import { LocalizeController } from '../../utilities/localize.js';
import {
  type CalendarWeekday,
  addMonths,
  createDate,
  getFirstSelectableDateInRange,
  getMonthLabel,
  getNearestSelectableDate,
  getNextSelectableDate,
  getYearBlockStart,
  isDateDisabled,
  isMonthInRange,
  isSameMonth,
  isYearInRange,
  parseDisabledDates,
  parseDisabledWeekdays,
  parseIsoDate,
  toIsoDate,
  today,
} from './utils.js';
import { renderDayView } from './renderers/day.js';
import { renderMonthView } from './renderers/month.js';
import { renderYearView } from './renderers/year.js';
import type { CalendarNavigationOptions } from './renderers/shared.js';
import styles from './calendar.styles.js';

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
 * @event syn-change - Emitted when a user commits a different date value.
 * @event syn-clear - Emitted when the user clears a non-empty date value.
 * @event syn-focus - Emitted when focus enters the calendar.
 * @event syn-input - Emitted when a user changes the date value.
 */
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
  @state() private visibleView: 'month' | 'year' | 'day' = 'day';

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

  /** The selected date as an ISO `YYYY-MM-DD` string, or an empty string when unset. */
  @property() value = '';

  /**
   * Gets or sets the selected value as a UTC date-only `Date`.
   */
  get valueAsDate() {
    return parseIsoDate(this.value);
  }

  /**
   * Sets the selected value as a UTC date-only `Date`.
   */
  set valueAsDate(date: Date | null) {
    this.value = toIsoDate(date);
  }

  /**
   * The date currently being viewed in the calendar.
   * This is used to determine which month or year is displayed.
   */
  @state() private viewDate: Date = today();

  /**
   * The date that currently has focus within the calendar.
   * This is used to manage keyboard navigation and focus restoration.
   */
  @state() private focusedDate: Date = today();

  /**
   * The month that currently has focus within the calendar.
   * This is used to manage keyboard navigation and focus restoration for the month view.
   */
  @state() private focusedMonth = today().getUTCMonth();

  /**
   * The year that is currently selected in the month selector.
   * This is used to manage keyboard navigation and focus restoration for the month selector.
   */
  @state() private monthSelectorYear = today().getUTCFullYear();

  /**
   * The year that currently has focus within the calendar.
   * This is used to manage keyboard navigation and focus restoration for the year view.
   */
  @state() private focusedYear = today().getUTCFullYear();

  /**
   * The start year of the currently visible year block in the calendar.
   * This is used to manage keyboard navigation and focus restoration for the year block view.
   */
  @state() private yearBlockStart = getYearBlockStart(today().getUTCFullYear());

  /**
   * Indicates whether the calendar currently has focus.
   */
  #hasFocus = false;

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
    if (changedProperties.has('value')) {
      const valueDate = parseIsoDate(this.value);

      if (valueDate && this.#isDateSelectable(valueDate)) {
        this.#setViewDate(valueDate);
      }
    }

    if (changedProperties.has('disabledDates')
      || changedProperties.has('disabledWeekdays')
      || changedProperties.has('max')
      || changedProperties.has('min')
      || changedProperties.has('value')) {
      this.#normalizeFocusToRange();
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

  #isDateSelectable(date: Date) {
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
      ? !!min && targetMonth < min.getUTCFullYear() * 12 + min.getUTCMonth()
      : !!max && targetMonth > max.getUTCFullYear() * 12 + max.getUTCMonth();
  }

  #isYearNavigationDisabled(year: number, offset: -1 | 1) {
    if (!this.#hasSelectableDates()) {
      return true;
    }

    const { max, min } = this.#getBounds();

    const targetYear = year + offset;

    return offset < 0
      ? !!min && targetYear < min.getUTCFullYear()
      : !!max && targetYear > max.getUTCFullYear();
  }

  #isYearBlockNavigationDisabled(blockStart: number, offset: -12 | 12) {
    if (!this.#hasSelectableDates()) {
      return true;
    }

    const { max, min } = this.#getBounds();

    const targetBlockStart = blockStart + offset;

    return offset < 0
      ? !!min && targetBlockStart + 11 < min.getUTCFullYear()
      : !!max && targetBlockStart > max.getUTCFullYear();
  }

  #hasSelectableDates() {
    const {
      disabledDates, disabledWeekdays, max, min,
    } = this.#getBounds();
    return !!getNearestSelectableDate(today(), min, max, disabledDates, disabledWeekdays);
  }

  #getNearestSelectableDate(date: Date) {
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
      createDate(year, month + 1, 0),
      min,
      max,
      disabledDates,
      disabledWeekdays,
    );
  }

  #getMonthForYear(year: number, preferredMonth: number) {
    const months = Array.from({ length: 12 }, (_, month) => month)
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
    const currentYear = this.viewDate.getUTCFullYear();

    if (this.#isYearNavigationDisabled(currentYear, offset)) {
      return;
    }

    this.#setViewMonth(createDate(currentYear + offset, this.viewDate.getUTCMonth(), 1));
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

    if (nearestDate && nearestDate.getTime() !== this.focusedDate.getTime()) {
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
      this.monthSelectorYear = nearestMonth.getUTCFullYear();
      this.focusedMonth = nearestMonth.getUTCMonth();
    }

    if (this.visibleView === 'month' && nearestMonth) {
      this.#restoreMonthFocus = true;
    }
  }

  #normalizeYearFocus() {
    const nearestYear = this.#getNearestSelectableDate(createDate(this.focusedYear, 0, 1));

    if (nearestYear) {
      this.focusedYear = nearestYear.getUTCFullYear();
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
  #setViewDate(date: Date) {
    this.viewDate = date;
    this.focusedDate = date;
  }

  /**
   * Sets the currently viewed month in the calendar.
   * @param date A date within the month to set as the currently viewed month.
   */
  #setViewMonth(date: Date) {
    const year = date.getUTCFullYear();
    const requestedMonth = date.getUTCMonth();
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
   * @param value The new value to set for the calendar.
   * @param clear Whether to clear the current value before setting the new one.
   */
  #setValueFromUser(value: string, clear = false) {
    if (this.value === value) {
      return;
    }

    this.value = value;

    if (clear) {
      this.emit('syn-clear');
    }

    this.emit('syn-input');
    this.emit('syn-change');
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
   * Suppresses nested focus events within the calendar component.
   * @param event The focus event to stop from propagating.
   */
  static #stopNestedFocusEvent(event: Event) {
    event.stopPropagation();
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
      this.renderRoot.querySelector<HTMLButtonElement>(`[data-kind="month"][data-value="${this.focusedMonth}"]`)?.focus();
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
  #handleDayKeydown(event: KeyboardEvent, day: Date) {
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
      dayOffset as -7 | -1 | 1 | 7,
      min,
      max,
      disabledDates,
      disabledWeekdays,
    );

    if (!nextDate || !this.#isDateSelectable(nextDate)) {
      return;
    }

    if (isSameMonth(nextDate, day) && nextDate.getTime() === day.getTime()) {
      return;
    }

    this.#setViewDate(nextDate);
    this.#restoreDayFocus = true;
  }

  /**
   * Opens the month view for a specific month.
   * @param month The month to open (0-11).
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
    const valueDate = this.valueAsDate;
    const viewedYear = this.viewDate.getUTCFullYear();

    this.monthSelectorYear = viewedYear;
    const preferredMonth = valueDate
      && this.#isDateSelectable(valueDate)
      && valueDate.getUTCFullYear() === viewedYear
      ? valueDate.getUTCMonth()
      : this.viewDate.getUTCMonth();
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
    const valueDate = this.valueAsDate;

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
      : this.viewDate.getUTCFullYear();
    this.yearBlockStart = getYearBlockStart(this.focusedYear);
    const valueDate = this.valueAsDate;

    if (valueDate) {
      const valueYear = valueDate.getUTCFullYear();

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

    const month = this.#getMonthForYear(year, this.viewDate.getUTCMonth());

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
    const nextDate = this.#getNearestSelectableDate(createDate(year + offset, 0, 1));

    if (!nextDate || !this.#isYearSelectable(nextDate.getUTCFullYear())) {
      return;
    }

    this.focusedYear = nextDate.getUTCFullYear();
    this.yearBlockStart = getYearBlockStart(this.focusedYear);
    this.#restoreYearFocus = true;
  }

  /**
   * Handles keydown events for the month view.
   * @param event The keyboard event.
   * @param month The currently focused month (0-11).
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

    if (!date || !this.#isMonthSelectable(date.getUTCFullYear(), date.getUTCMonth())) {
      return;
    }

    this.monthSelectorYear = date.getUTCFullYear();
    this.focusedMonth = date.getUTCMonth();
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
          this.#setValueFromUser(button.dataset.value);
        }
        break;
      }
      case 'month':
        this.#openMonth(Number(button.dataset.value));
        break;
      case 'year':
        this.#openYear(Number(button.dataset.value));
        break;
      default:
        break;
    }
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
      this.#handleMonthKeydown(event, Number(button.dataset.value));
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
      this.focusedMonth = Number(button.dataset.value);
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
        this.monthSelectorYear = current.getUTCFullYear();
        this.focusedMonth = this.#getMonthForYear(current.getUTCFullYear(), current.getUTCMonth())
          ?? current.getUTCMonth();
        this.#restoreMonthFocus = true;
        break;

      case 'year':
      default:
        this.focusedYear = current.getUTCFullYear();
        this.yearBlockStart = getYearBlockStart(this.focusedYear);
        this.#restoreYearFocus = true;
        break;
    }
  }

  #renderView() {
    const bounds = this.#getBounds();
    const footer = {
      currentDisabled: !this.#hasSelectableDates(),
      hasValue: !!this.value,
      onClear: () => this.#setValueFromUser('', true),
      onCurrent: () => this.#showCurrentPeriod(),
    };

    if (this.visibleView === 'year') {
      return renderYearView({
        ...footer,
        activeYear: this.valueAsDate?.getUTCFullYear(),
        blockStart: this.yearBlockStart,
        disabledDates: bounds.disabledDates,
        disabledWeekdays: bounds.disabledWeekdays,
        focusedYear: this.focusedYear,
        max: bounds.max,
        min: bounds.min,
        navigation: {
          label: `${this.yearBlockStart} - ${this.yearBlockStart + 11}`,
          nextDisabled: this.#isYearBlockNavigationDisabled(this.yearBlockStart, 12),
          nextLabel: 'Next 12 years',
          onChoose: () => this.#showDayView(),
          onNext: () => this.#pageYears(12),
          onPrevious: () => this.#pageYears(-12),
          previousDisabled: this.#isYearBlockNavigationDisabled(this.yearBlockStart, -12),
          previousLabel: 'Previous 12 years',
        },
      });
    }

    const yearNavigation: CalendarNavigationOptions = {
      label: this.visibleView === 'month'
        ? this.monthSelectorYear
        : this.viewDate.getUTCFullYear(),
      nextDisabled: this.visibleView === 'month'
        ? this.#isYearNavigationDisabled(this.monthSelectorYear, 1)
        : this.#isYearNavigationDisabled(this.viewDate.getUTCFullYear(), 1),
      nextLabel: 'Next year',
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
        : this.#isYearNavigationDisabled(this.viewDate.getUTCFullYear(), -1),
      previousLabel: 'Previous year',
    };

    if (this.visibleView === 'month') {
      return renderMonthView({
        ...footer,
        activeMonth: this.monthSelectorYear === this.viewDate.getUTCFullYear()
          ? this.viewDate.getUTCMonth()
          : undefined,
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
      disabledDates: bounds.disabledDates,
      disabledWeekdays: bounds.disabledWeekdays,
      focusedDate: this.focusedDate,
      locale: this.localize.lang(),
      max: bounds.max,
      min: bounds.min,
      monthNavigation: {
        label: getMonthLabel(this.viewDate),
        nextDisabled: this.#isMonthNavigationDisabled(
          this.viewDate.getUTCFullYear(),
          this.viewDate.getUTCMonth(),
          1,
        ),
        nextLabel: 'Next month',
        onChoose: () => this.#showMonthSelector(),
        onNext: () => this.#setViewMonth(addMonths(this.viewDate, 1)),
        onPrevious: () => this.#setViewMonth(addMonths(this.viewDate, -1)),
        previousDisabled: this.#isMonthNavigationDisabled(
          this.viewDate.getUTCFullYear(),
          this.viewDate.getUTCMonth(),
          -1,
        ),
        previousLabel: 'Previous month',
      },
      valueDate: this.valueAsDate,
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
          [`calendar--view-${this.visibleView}`]: true,
        })}
        @focusin=${this.#handleFocusIn}
        @focusout=${this.#handleFocusOut}
        @syn-blur=${SynCalendar.#stopNestedFocusEvent}
        @syn-focus=${SynCalendar.#stopNestedFocusEvent}
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
