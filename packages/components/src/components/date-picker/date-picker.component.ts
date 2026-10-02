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
  getWeekdayNames,
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
                this.visibleView = 'month';
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

    return html``;
  }

  #renderContent() {
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
      const valueDate = parseIsoDate(this.value);

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
      return html`
        <table class="day-selector">
          <tbody>
            ${Array.from({ length: 12 }, (_, monthIndex) => html`
              <tr>
                <td
                  class="day-selector__day"
                >
                  <button
                    class="day-selector__day-button"
                    data-month=${monthIndex}
                    @click=${() => {
                      this.value = `${this.viewDate.getUTCFullYear()}-${(monthIndex + 1).toString().padStart(2, '0')}`;
                    }}
                  >
                    ${monthIndex + 1}
                  </button>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
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
              console.log('TODO');
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
