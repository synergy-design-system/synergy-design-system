import { html } from 'lit';
import { compare } from 'temporal-polyfill/fns/PlainDate';
import type { CalendarViewTemplates, DayViewOptions } from '../internal-types.js';
import {
  clampRangeEnd,
  getCalendarWeeks,
  getFirstDayOfWeek,
  getWeekdayNames,
  isDateDisabled,
  isRangeLengthAllowed,
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
  const previewDate = rangeStart && !rangeEnd && options.hoveredDate
    ? clampRangeEnd(rangeStart, options.hoveredDate, options.minRange, options.maxRange)
    : null;
  const [previewStart, previewEnd] = rangeStart && previewDate
    ? [rangeStart, previewDate].sort(compare)
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
              ${week.map(day => {
                const candidateEnd = rangeStart && !rangeEnd
                  ? clampRangeEnd(rangeStart, day, options.minRange, options.maxRange)
                  : null;
                const rangeUnavailable = !!rangeStart && !!candidateEnd
                  && (!isRangeLengthAllowed(rangeStart, candidateEnd, options.minRange, options.maxRange)
                    || isDateDisabled(
                      candidateEnd,
                      options.min,
                      options.max,
                      options.disabledDates,
                      options.disabledWeekdays,
                      options.isDateDisabled,
                    ));

                return html`
                <td class="day-selector__day">
                  ${renderCalendarItem({
                    active: options.selectedDates.some(selectedDate => isSameDay(day, selectedDate)),
                    disabled: isDateDisabled(
                      day,
                      options.min,
                      options.max,
                      options.disabledDates,
                      options.disabledWeekdays,
                      options.isDateDisabled,
                    ),
                    kind: 'day',
                    label: html`
                      <time datetime=${toIsoDate(day)}>
                        ${day.day.toString().padStart(2, '0')}
                      </time>
                    `,
                    outside: !isSameMonth(day, options.viewDate),
                    rangeBegin: isSameDay(day, rangeStart),
                    rangeClipped: !!candidateEnd && !isSameDay(day, candidateEnd),
                    rangeEnd: isSameDay(day, rangeEnd)
                      || isSameDay(day, previewDate),
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
                      && !!previewDate
                      && previewStart !== null
                      && previewEnd !== null
                      && compare(day, previewStart) >= 0
                      && compare(day, previewEnd) <= 0
                      && !isSameDay(day, rangeStart),
                    rangeStart: isSameDay(day, rangeStart),
                    rangeUnavailable,
                    tabbable: isSameDay(day, options.focusedDate),
                    today: isSameDay(day, currentDay),
                    value: toIsoDate(day),
                  })}
                </td>
                `;
              })}
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
