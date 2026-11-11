import { html } from 'lit';
import type { CalendarViewTemplates, DayViewOptions } from '../internal-types.js';
import {
  getCalendarWeeks,
  getDayItemState,
  getDayRenderContext,
  getFirstDayOfWeek,
  getWeekdayNames,
  toIsoDate,
} from '../utility/index.js';
import {
  renderCalendarFooter,
  renderCalendarItem,
  renderCalendarNavigation,
} from './shared.js';

/** Renders the six-week day grid, locale-aware headings, pending range preview, and controls. */
export const renderDayView = (options: DayViewOptions): CalendarViewTemplates => {
  const firstDay = getFirstDayOfWeek(options.locale);
  const weekdays = getWeekdayNames(options.locale, firstDay);
  const weeks = getCalendarWeeks(
    options.viewDate.year,
    options.viewDate.month,
    firstDay,
  );
  const context = getDayRenderContext(options);

  return {
    content: html`
      <table class="day-selector" part="day-grid">
        <thead part="weekdays">
          <tr>${weekdays.map(weekday => html`<th part="weekday" scope="col">${weekday}</th>`)}</tr>
        </thead>
        <tbody>
          ${weeks.map(week => html`
            <tr>
              ${week.map(day => html`
                <td class="day-selector__day" part="day-cell">
                  ${renderCalendarItem({
                    ...getDayItemState(day, context),
                    kind: 'day',
                    label: html`
                      <time datetime=${toIsoDate(day)}>
                        ${day.day.toString().padStart(2, '0')}
                      </time>
                    `,
                  })}
                </td>
              `)}
            </tr>
          `)}
        </tbody>
      </table>
    `,
    footer: renderCalendarFooter(options),
    header: html`
      <div class="selection-wrapper">
        <div class="header--month-selection header-selection" part="month-navigation">
          ${renderCalendarNavigation(options.monthNavigation)}
        </div>
        <div class="header--year-selection header-selection" part="year-navigation">
          ${renderCalendarNavigation(options.yearNavigation)}
        </div>
      </div>
    `,
  };
};
