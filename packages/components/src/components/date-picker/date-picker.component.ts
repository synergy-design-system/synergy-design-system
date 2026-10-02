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
  getCalendarWeeks,
  getFirstDayOfWeek,
  getMonthLabel,
  getMonthNames,
  getWeekdayNames,
  getYearBlockStart,
  isSameDay,
  isSameMonth,
  parseIsoDate,
  toIsoDate,
  today,
} from './utils.js';
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
      this.renderRoot.querySelector<HTMLButtonElement>(`[data-year="${this.focusedYear}"]`)?.focus();
    }

    if (this.#restoreMonthFocus) {
      this.#restoreMonthFocus = false;
      this.renderRoot.querySelector<HTMLButtonElement>(`[data-month="${this.focusedMonth}"]`)?.focus();
    }

    if (this.#restoreDayFocus) {
      this.#restoreDayFocus = false;
      const date = toIsoDate(this.focusedDate);
      this.renderRoot.querySelector<HTMLButtonElement>(`[data-date="${date}"]`)?.focus();
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

  /**
   * Renders the header section of the date picker based on the currently visible view.
   * @returns The HTML template for the header section.
   */
  #renderHeader() {
    if (this.visibleView === 'day') {
      return html`
        <div class="selection-wrapper">
          <div
            class="header--month-selection header-selection"
          >
            <syn-icon-button
              @click=${() => {
                this.#setViewMonth(addMonths(this.viewDate, -1));
              }}
              label="Previous month"
              library="system"
              name="previous-page"
              size="medium"
            ></syn-icon-button>
            <syn-button
              @click=${() => {
                this.focusedMonth = this.viewDate.getUTCMonth();
                this.visibleView = 'month';
                this.#restoreMonthFocus = true;
              }}
              size="medium"
              variant="text"
            >
              ${getMonthLabel(this.viewDate)}
            </syn-button>
            <syn-icon-button
              @click=${() => {
                this.#setViewMonth(addMonths(this.viewDate, 1));
              }}
              label="Next month"
              library="system"
              name="next-page"
              size="medium"
            ></syn-icon-button>
          </div>

          <div
            class="header--year-selection header-selection"
          >
            <syn-icon-button
              @click=${() => {
                this.#setViewMonth(addYears(this.viewDate, -1));
              }}
              label="Previous year"
              library="system"
              name="previous-page"
              size="medium"
            ></syn-icon-button>
            <syn-button
              @click=${() => this.#showYearSelector()}
              size="medium"
              variant="text"
            >
              ${this.viewDate.getUTCFullYear()}
            </syn-button>
            <syn-icon-button
              @click=${() => {
                this.#setViewMonth(addYears(this.viewDate, 1));
              }}
              label="Next year"
              library="system"
              name="next-page"
              size="medium"
            ></syn-icon-button>
          </div>
        </div>
      `;
    }

    if (this.visibleView === 'month') {
      return html`
        <div class="selection-wrapper">
          <div
            class="header--year-selection header-selection"
          >
            <syn-icon-button
              @click=${() => {
                this.#setViewMonth(addYears(this.viewDate, -1));
              }}
              label="Previous year"
              library="system"
              name="previous-page"
              size="medium"
            ></syn-icon-button>
            <syn-button
              @click=${() => this.#showYearSelector()}
              size="medium"
              variant="text"
            >
              ${this.viewDate.getUTCFullYear()}
            </syn-button>
            <syn-icon-button
              @click=${() => {
                this.#setViewMonth(addYears(this.viewDate, 1));
              }}
              label="Next year"
              library="system"
              name="next-page"
              size="medium"
            ></syn-icon-button>
          </div>
        </div>
      `;
    }

    if (this.visibleView === 'year') {
      return html`
        <div class="selection-wrapper">
          <div class="header--year-selection header-selection">
            <syn-icon-button
              @click=${() => this.#pageYears(-12)}
              label="Previous 12 years"
              library="system"
              name="previous-page"
              size="medium"
            ></syn-icon-button>
            <span>${this.yearBlockStart} - ${this.yearBlockStart + 11}</span>
            <syn-icon-button
              @click=${() => this.#pageYears(12)}
              label="Next 12 years"
              library="system"
              name="next-page"
              size="medium"
            ></syn-icon-button>
          </div>
        </div>
      `;
    }

    return html``;
  }

  #renderContent() {
    const valueDate = parseIsoDate(this.value);

    if (this.visibleView === 'day') {
      const locale = this.localize.lang();
      const firstDayOfWeek = getFirstDayOfWeek(locale);
      const weekdays = getWeekdayNames(locale, firstDayOfWeek);
      const weeks = getCalendarWeeks(
        this.viewDate.getUTCFullYear(),
        this.viewDate.getUTCMonth(),
        firstDayOfWeek,
      );
      const currentDay = today();

      return html`
        <table class="day-selector">
          <thead>
            <tr>
              ${weekdays.map(weekday => html`
                <th scope="col">${weekday}</th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${weeks.map(week => html`
              <tr>
                ${week.map(day => html`
                  <td
                    class="day-selector__day"
                  >
                    <button
                      aria-hidden=${!isSameMonth(day, this.viewDate)}
                      class=${classMap({
                        'day-selector__day--active': isSameDay(day, valueDate),
                        'day-selector__day--outside': !isSameMonth(day, this.viewDate),
                        'day-selector__day--today': isSameDay(day, currentDay),
                        'day-selector__day-button': true,
                      })}
                      data-date=${toIsoDate(day)}
                      tabindex=${isSameDay(day, this.focusedDate) ? 0 : -1}
                      @keydown=${(event: KeyboardEvent) => this.#handleDayKeydown(event, day)}
                      @click=${() => {
                        this.value = toIsoDate(day);
                      }}
                    >
                      <time datetime=${toIsoDate(day)}>
                        ${day.getUTCDate().toString().padStart(2, '0')}
                      </time>
                    </button>
                  </td>
                `)}
              </tr>
            `)}
          </tbody>
        </table>
      `;
    }

    if (this.visibleView === 'month') {
      const months = getMonthNames(this.localize.lang(), 'short');

      return html`
        <div class="month-selector">
          ${months.map((month, monthIndex) => html`
            <button
              class=${classMap({
                'day-selector__day--active': this.viewDate.getUTCMonth() === monthIndex,
                'day-selector__day-button': true,
              })}
              type="button"
              data-month=${monthIndex}
              tabindex=${monthIndex === this.focusedMonth ? 0 : -1}
              @focus=${() => { this.focusedMonth = monthIndex; }}
              @keydown=${(event: KeyboardEvent) => this.#handleMonthKeydown(event, monthIndex)}
              @click=${() => this.#openMonth(monthIndex)}
            >
              ${month}
            </button>
          `)}
        </div>
      `;
    }

    if (this.visibleView === 'year') {
      const years = Array.from({ length: 12 }, (_, index) => this.yearBlockStart + index);

      return html`
        <div class="year-selector">
          ${years.map(year => html`
            <button
              class=${classMap({
                'day-selector__day--active': valueDate?.getUTCFullYear() === year,
                'day-selector__day-button': true,
              })}
              type="button"
              data-year=${year}
              tabindex=${year === this.focusedYear ? 0 : -1}
              @focus=${() => { this.focusedYear = year; }}
              @keydown=${(event: KeyboardEvent) => this.#handleYearKeydown(event, year)}
              @click=${() => this.#openYear(year)}
            >
              ${year}
            </button>
          `)}
        </div>
      `;
    }

    return html``;
  }

  #renderFooter() {
    if (this.visibleView === 'day') {
      return html`
        <div class="selection-wrapper">
          <syn-button
            @click=${() => {
              this.#setViewDate(today());
              this.#restoreDayFocus = true;
            }}
            variant="text"
          >Today</syn-button>
          <syn-button
            @click=${() => {
              this.value = '';
            }}
            ?disabled=${!this.value}
            variant="text"
          >Clear</syn-button>
        </div>
      `;
    }

    if (this.visibleView === 'month') {
      return html`
        <div class="selection-wrapper">
          <syn-button
            @click=${() => {
              this.#setViewMonth(today());
              this.focusedMonth = this.viewDate.getUTCMonth();
              this.#restoreMonthFocus = true;
            }}
            variant="text"
          >This month</syn-button>
          <syn-button
            @click=${() => {
              this.value = '';
            }}
            ?disabled=${!this.value}
            variant="text"
          >Clear</syn-button>
        </div>
      `;
    }

    if (this.visibleView === 'year') {
      return html`
        <div class="selection-wrapper">
          <syn-button
            @click=${() => {
              this.focusedYear = today().getUTCFullYear();
              this.yearBlockStart = getYearBlockStart(this.focusedYear);
              this.#restoreYearFocus = true;
              this.requestUpdate();
            }}
            variant="text"
          >This year</syn-button>
          <syn-button
            @click=${() => { this.value = ''; }}
            ?disabled=${!this.value}
            variant="text"
          >Clear</syn-button>
        </div>
      `;
    }

    return html``;
  }

  render() {
    return html`
      <div
        class=${classMap({
          'date-picker': true,
          [`date-picker--view-${this.visibleView}`]: true,
        })}
        part="base"
      >
        <div class="header">
          ${this.#renderHeader()}
        </div>
        <!--/.header -->

        <div class="content">
          ${this.#renderContent()}
        </div>
        <!--/.content -->

        <div class="footer">
          ${this.#renderFooter()}
        </div>
        <!--/.footer -->
      </div>
    `;
  }
}
