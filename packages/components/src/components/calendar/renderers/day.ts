import { html } from 'lit';
import {
  getCalendarWeeks,
  getFirstDayOfWeek,
  getWeekdayNames,
  isDateInRange,
  isSameDay,
  isSameMonth,
  toIsoDate,
  today,
} from '../utils.js';
import {
  type CalendarFooterOptions,
  type CalendarNavigationOptions,
  type CalendarViewTemplates,
  renderCalendarFooter,
  renderCalendarItem,
  renderCalendarNavigation,
} from './shared.js';

export interface DayViewOptions extends CalendarFooterOptions {
  locale: string;
  viewDate: Date;
  focusedDate: Date;
  valueDate: Date | null;
  min: Date | null;
  max: Date | null;
  monthNavigation: CalendarNavigationOptions;
  yearNavigation: CalendarNavigationOptions;
}

export const renderDayView = (options: DayViewOptions): CalendarViewTemplates => {
  const firstDay = getFirstDayOfWeek(options.locale);
  const weekdays = getWeekdayNames(options.locale, firstDay);
  const weeks = getCalendarWeeks(
    options.viewDate.getUTCFullYear(),
    options.viewDate.getUTCMonth(),
    firstDay,
  );
  const currentDay = today();

  return {
    content: html`
      <table class="day-selector" part="day-grid">
        <thead>
          <tr>${weekdays.map(weekday => html`<th scope="col">${weekday}</th>`)}</tr>
        </thead>
        <tbody>
          ${weeks.map(week => html`
            <tr>
              ${week.map(day => html`
                <td class="day-selector__day">
                  ${renderCalendarItem({
                    active: isSameDay(day, options.valueDate),
                    disabled: !isDateInRange(day, options.min, options.max),
                    kind: 'day',
                    label: html`
                      <time datetime=${toIsoDate(day)}>
                        ${day.getUTCDate().toString().padStart(2, '0')}
                      </time>
                    `,
                    outside: !isSameMonth(day, options.viewDate),
                    tabbable: isSameDay(day, options.focusedDate),
                    today: isSameDay(day, currentDay),
                    value: toIsoDate(day),
                  })}
                </td>
              `)}
            </tr>
          `)}
        </tbody>
      </table>
    `,
    footer: renderCalendarFooter('Today', options),
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
