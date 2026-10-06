import { html } from 'lit';
import {
  getCalendarWeeks,
  getFirstDayOfWeek,
  getWeekdayNames,
  isSameDay,
  isSameMonth,
  toIsoDate,
  today,
} from '../utils.js';
import {
  type FooterOptions,
  type NavigationOptions,
  type ViewTemplates,
  renderCalendarItem,
  renderFooter,
  renderNavigation,
} from './shared.js';

export interface DayViewOptions extends FooterOptions {
  locale: string;
  viewDate: Date;
  focusedDate: Date;
  valueDate: Date | null;
  monthNavigation: NavigationOptions;
  yearNavigation: NavigationOptions;
}

export const renderDayView = (options: DayViewOptions): ViewTemplates => {
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
      <table class="day-selector">
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
    footer: renderFooter('Today', options),
    header: html`
      <div class="selection-wrapper">
        <div class="header--month-selection header-selection">
          ${renderNavigation(options.monthNavigation)}
        </div>
        <div class="header--year-selection header-selection">
          ${renderNavigation(options.yearNavigation)}
        </div>
      </div>
    `,
  };
};
