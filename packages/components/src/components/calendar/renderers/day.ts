import { html } from 'lit';
import {
  type CalendarSelectionMode,
  type CalendarWeekday,
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
  type CalendarFooterOptions,
  type CalendarNavigationOptions,
  type CalendarViewTemplates,
  renderCalendarFooter,
  renderCalendarItem,
  renderCalendarNavigation,
} from './shared.js';

export interface DayViewOptions extends CalendarFooterOptions {
  disabledDates: readonly string[];
  disabledWeekdays: readonly CalendarWeekday[];
  focusedDate: Date;
  hoveredDate: Date | null;
  locale: string;
  max: Date | null;
  min: Date | null;
  mode: CalendarSelectionMode;
  monthNavigation: CalendarNavigationOptions;
  selectedDates: readonly Date[];
  viewDate: Date;
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
  const rangeStart = options.mode === 'range' ? options.selectedDates[0] ?? null : null;
  const rangeEnd = options.mode === 'range' && options.selectedDates.length === 2
    ? options.selectedDates[1]
    : null;
  const previewStart = rangeStart && options.hoveredDate
    ? Math.min(rangeStart.getTime(), options.hoveredDate.getTime())
    : null;
  const previewEnd = rangeStart && options.hoveredDate
    ? Math.max(rangeStart.getTime(), options.hoveredDate.getTime())
    : null;

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
                        ${day.getUTCDate().toString().padStart(2, '0')}
                      </time>
                    `,
                    outside: !isSameMonth(day, options.viewDate),
                    rangeBegin: isSameDay(day, rangeStart),
                    rangeEnd: isSameDay(day, rangeEnd)
                      || (!!rangeStart && !rangeEnd && isSameDay(day, options.hoveredDate)),
                    rangeInterior: (!!rangeStart
                      && !!rangeEnd
                      && day.getTime() > rangeStart.getTime()
                      && day.getTime() < rangeEnd.getTime())
                      || (!!rangeStart
                        && !rangeEnd
                        && previewStart !== null
                        && previewEnd !== null
                        && day.getTime() > previewStart
                        && day.getTime() < previewEnd),
                    rangePending: !!rangeStart && !rangeEnd && isSameDay(day, rangeStart),
                    rangePreview: !!rangeStart
                      && !rangeEnd
                      && !!options.hoveredDate
                      && previewStart !== null
                      && previewEnd !== null
                      && day.getTime() >= previewStart
                      && day.getTime() <= previewEnd
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
