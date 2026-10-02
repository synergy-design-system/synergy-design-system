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
  addDays,
  addMonths,
  addYears,
  createDate,
  getMonthLabel,
  getYearBlockStart,
  isSameMonth,
  parseIsoDate,
  toIsoDate,
  today,
} from './utils.js';
import { renderDayView } from './renderers/day.js';
import { renderMonthView } from './renderers/month.js';
import { renderYearView } from './renderers/year.js';
import type { NavigationOptions } from './renderers/shared.js';
import styles from './date-picker.styles.js';

/**
 * @summary Date pickers allow users to select dates from a calendar interface.
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-date-picker--docs
 * @status experimental
 * @since 0.0.0
 *
 * @dependency syn-button
 * @dependency syn-icon-button
 * @dependency syn-popup
 *
 * @csspart base - The component's base wrapper.
 */
export default class SynDatePicker extends SynergyElement {
  static styles: CSSResultGroup = [componentStyles, styles];

  static dependencies = {
    'syn-button': SynButton,
    'syn-icon-button': SynIconButton,
  };

  private readonly localize = new LocalizeController(this);

  /**
   * The currently visible view in the date picker ('month', 'year', or 'day').
   * Can be changed via user interaction, e.g. by clicking the header buttons to switch between views.
   */
  @state() private visibleView: 'month' | 'year' | 'day' = 'day';

  /**
   * The selected date as an ISO `YYYY-MM-DD` string, or an empty string when unset.
   */
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
   * The date currently being viewed in the date picker.
   * This is used to determine which month or year is displayed.
   */
  @state() private viewDate: Date = today();

  /**
   * The date that currently has focus within the date picker.
   * This is used to manage keyboard navigation and focus restoration.
   */
  @state() private focusedDate: Date = today();

  @state() private focusedMonth = today().getUTCMonth();

  @state() private focusedYear = today().getUTCFullYear();

  @state() private yearBlockStart = getYearBlockStart(today().getUTCFullYear());

  #restoreYearFocus = false;

  #restoreMonthFocus = false;

  /**
   * Indicates whether the date picker should restore focus to the previously focused day after a view change.
   */
  #restoreDayFocus = false;

  protected willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('value')) {
      const valueDate = parseIsoDate(this.value);

      if (valueDate) {
        this.#setViewDate(valueDate);
      }
    }
  }

  /**
   * Sets the currently viewed date in the date picker.
   * @param date The date to set as the currently viewed date in the date picker.
   */
  #setViewDate(date: Date) {
    this.viewDate = date;
    this.focusedDate = date;
  }

  /**
   * Sets the currently viewed month in the date picker.
   * @param date A date within the month to set as the currently viewed month.
   */
  #setViewMonth(date: Date) {
    this.#setViewDate(createDate(date.getUTCFullYear(), date.getUTCMonth(), 1));
  }

  /**
   * Called after the component has been updated.
   * If the date picker should restore focus to the previously focused day, it does so here.
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
   * Handles keyboard navigation within the date picker for a specific day.
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
    this.#setViewDate(addDays(day, dayOffset));
    this.#restoreDayFocus = true;
  }

  #openMonth(month: number) {
    this.#setViewMonth(createDate(this.viewDate.getUTCFullYear(), month, 1));
    this.#showDayView();
  }

  #showDayView() {
    const valueDate = this.valueAsDate;

    if (valueDate && isSameMonth(valueDate, this.viewDate)) {
      this.focusedDate = valueDate;
    }

    this.visibleView = 'day';
    this.#restoreDayFocus = true;
  }

  #showYearSelector() {
    this.focusedYear = this.viewDate.getUTCFullYear();
    this.yearBlockStart = getYearBlockStart(this.focusedYear);
    const valueDate = this.valueAsDate;

    if (valueDate) {
      const valueYear = valueDate.getUTCFullYear();

      if (valueYear >= this.yearBlockStart && valueYear < this.yearBlockStart + 12) {
        this.focusedYear = valueYear;
      }
    }

    this.visibleView = 'year';
    this.#restoreYearFocus = true;
  }

  #openYear(year: number) {
    this.#setViewMonth(createDate(year, this.viewDate.getUTCMonth(), 1));
    this.#showDayView();
  }

  #pageYears(offset: number) {
    this.yearBlockStart += offset;
    this.focusedYear += offset;
  }

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
    this.focusedYear = year + offset;
    this.yearBlockStart = getYearBlockStart(this.focusedYear);
    this.#restoreYearFocus = true;
  }

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
    const date = addMonths(createDate(this.viewDate.getUTCFullYear(), month, 1), offset);
    this.#setViewMonth(date);
    this.focusedMonth = date.getUTCMonth();
    this.#restoreMonthFocus = true;
  }

  #getGridButton(event: Event) {
    return event.composedPath().find((target): target is HTMLButtonElement => (
      target instanceof HTMLButtonElement
      && this.renderRoot.contains(target)
      && target.matches('[data-kind][data-value]')
    ));
  }

  #handleGridClick(event: MouseEvent) {
    const button = this.#getGridButton(event);

    if (!button || button.dataset.value === undefined) {
      return;
    }

    if (button.dataset.kind === 'day') {
      this.value = button.dataset.value;
    } else if (button.dataset.kind === 'month') {
      this.#openMonth(Number(button.dataset.value));
    } else if (button.dataset.kind === 'year') {
      this.#openYear(Number(button.dataset.value));
    }
  }

  #handleGridKeydown(event: KeyboardEvent) {
    const button = this.#getGridButton(event);

    if (!button) {
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

  #handleGridFocus(event: FocusEvent) {
    const button = this.#getGridButton(event);

    if (button?.dataset.kind === 'month') {
      this.focusedMonth = Number(button.dataset.value);
    } else if (button?.dataset.kind === 'year') {
      this.focusedYear = Number(button.dataset.value);
    }
  }

  #showCurrentPeriod() {
    if (this.visibleView === 'day') {
      this.#setViewDate(today());
      this.#restoreDayFocus = true;
    } else if (this.visibleView === 'month') {
      this.#setViewMonth(today());
      this.focusedMonth = this.viewDate.getUTCMonth();
      this.#restoreMonthFocus = true;
    } else {
      this.focusedYear = today().getUTCFullYear();
      this.yearBlockStart = getYearBlockStart(this.focusedYear);
      this.#restoreYearFocus = true;
      this.requestUpdate();
    }
  }

  #renderView() {
    const footer = {
      hasValue: Boolean(this.value),
      onClear: () => { this.value = ''; },
      onCurrent: () => this.#showCurrentPeriod(),
    };

    if (this.visibleView === 'year') {
      return renderYearView({
        ...footer,
        activeYear: this.valueAsDate?.getUTCFullYear(),
        blockStart: this.yearBlockStart,
        focusedYear: this.focusedYear,
        navigation: {
          label: `${this.yearBlockStart} - ${this.yearBlockStart + 11}`,
          nextLabel: 'Next 12 years',
          onNext: () => this.#pageYears(12),
          onPrevious: () => this.#pageYears(-12),
          previousLabel: 'Previous 12 years',
        },
      });
    }

    const yearNavigation: NavigationOptions = {
      label: this.viewDate.getUTCFullYear(),
      nextLabel: 'Next year',
      onChoose: () => this.#showYearSelector(),
      onNext: () => this.#setViewMonth(addYears(this.viewDate, 1)),
      onPrevious: () => this.#setViewMonth(addYears(this.viewDate, -1)),
      previousLabel: 'Previous year',
    };

    if (this.visibleView === 'month') {
      return renderMonthView({
        ...footer,
        activeMonth: this.viewDate.getUTCMonth(),
        focusedMonth: this.focusedMonth,
        locale: this.localize.lang(),
        yearNavigation,
      });
    }

    return renderDayView({
      ...footer,
      focusedDate: this.focusedDate,
      locale: this.localize.lang(),
      monthNavigation: {
        label: getMonthLabel(this.viewDate),
        nextLabel: 'Next month',
        onChoose: () => {
          this.focusedMonth = this.viewDate.getUTCMonth();
          this.visibleView = 'month';
          this.#restoreMonthFocus = true;
        },
        onNext: () => this.#setViewMonth(addMonths(this.viewDate, 1)),
        onPrevious: () => this.#setViewMonth(addMonths(this.viewDate, -1)),
        previousLabel: 'Previous month',
      },
      valueDate: this.valueAsDate,
      viewDate: this.viewDate,
      yearNavigation,
    });
  }

  render() {
    const view = this.#renderView();

    return html`
      <div
        class=${classMap({
          'date-picker': true,
          [`date-picker--view-${this.visibleView}`]: true,
        })}
        part="base"
      >
        <div class="header">
          ${view.header}
        </div>
        <!--/.header -->

        <div
          class="content"
          @click=${this.#handleGridClick}
          @keydown=${this.#handleGridKeydown}
          @focusin=${this.#handleGridFocus}
        >
          ${view.content}
        </div>
        <!--/.content -->

        <div class="footer">
          ${view.footer}
        </div>
        <!--/.footer -->
      </div>
    `;
  }
}
