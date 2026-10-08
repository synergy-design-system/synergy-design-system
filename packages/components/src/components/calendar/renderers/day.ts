import { html } from 'lit';
import { compare } from 'temporal-polyfill/fns/PlainDate';
import type { CalendarViewTemplates, DayViewOptions } from '../internal-types.js';
import {
  getCalendarWeeks,
  getFirstDayOfWeek,
  getWeekdayNames,
  isDateDisabled,
  isSameDay,
  isSameMonth,
  toIsoDate,
  today,
} from '../utils.js';
import {
  renderCalendarFooter,
  renderCalendarItem,
  renderCalendarNavigation,
} from './shared.js';

export const renderDayView = (options: DayViewOptions): CalendarViewTemplates => {
  const firstDay = getFirstDayOfWeek(options.locale);
  const weekdays = getWeekdayNames(options.locale, firstDay);
  const weeks = getCalendarWeeks(
    options.viewDate.year,
    options.viewDate.month,
    firstDay,
  );
  const currentDay = today();
  const rangeStart = options.mode === 'range' ? options.selectedDates[0] ?? null : null;
  const rangeEnd = options.mode === 'range' && options.selectedDates.length === 2
    ? options.selectedDates[1]
    : null;
  const [previewStart, previewEnd] = rangeStart && options.hoveredDate
    ? [rangeStart, options.hoveredDate].sort(compare)
    : [null, null];

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
                    active: options.selectedDates.some(selectedDate => isSameDay(day, selectedDate)),
                    disabled: isDateDisabled(
                      day,
                      options.min,
                      options.max,
                      options.disabledDates,
                      options.disabledWeekdays,
                    ),
                    kind: 'day',
                    label: html`
                      <time datetime=${toIsoDate(day)}>
                        ${day.day.toString().padStart(2, '0')}
                      </time>
                    `,
                    outside: !isSameMonth(day, options.viewDate),
                    rangeBegin: isSameDay(day, rangeStart),
                    rangeEnd: isSameDay(day, rangeEnd)
                      || (!!rangeStart && !rangeEnd && isSameDay(day, options.hoveredDate)),
                    rangeInterior: (!!rangeStart
                      && !!rangeEnd
                      && compare(day, rangeStart) > 0
                      && compare(day, rangeEnd) < 0)
                      || (!!rangeStart
                        && !rangeEnd
                        && previewStart !== null
                        && previewEnd !== null
                        && compare(day, previewStart) > 0
                        && compare(day, previewEnd) < 0),
                    rangePending: !!rangeStart && !rangeEnd && isSameDay(day, rangeStart),
                    rangePreview: !!rangeStart
                      && !rangeEnd
                      && !!options.hoveredDate
                      && previewStart !== null
                      && previewEnd !== null
                      && compare(day, previewStart) >= 0
                      && compare(day, previewEnd) <= 0
                      && !isSameDay(day, rangeStart),
                    rangeStart: isSameDay(day, rangeStart),
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
