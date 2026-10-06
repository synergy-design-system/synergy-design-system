import { html } from 'lit';
import { type CalendarWeekday, getMonthNames, isMonthInRange } from '../utils.js';
import {
  type CalendarFooterOptions,
  type CalendarNavigationOptions,
  type CalendarViewTemplates,
  renderCalendarFooter,
  renderCalendarItem,
  renderCalendarNavigation,
} from './shared.js';

export interface MonthViewOptions extends CalendarFooterOptions {
  locale: string;
  activeMonth: number | undefined;
  focusedMonth: number;
  year: number;
  min: Date | null;
  max: Date | null;
  disabledDates: readonly string[];
  disabledWeekdays: readonly CalendarWeekday[];
  yearNavigation: CalendarNavigationOptions;
}

export const renderMonthView = (options: MonthViewOptions): CalendarViewTemplates => ({
  content: html`
    <div class="period-selector" part="month-grid">
      ${getMonthNames(options.locale, 'short').map((month, index) => renderCalendarItem({
        active: options.activeMonth === index,
        disabled: !isMonthInRange(
          options.year,
          index,
          options.min,
          options.max,
          options.disabledDates,
          options.disabledWeekdays,
        ),
        kind: 'month',
        label: month,
        tabbable: index === options.focusedMonth,
        value: index,
      }))}
    </div>
  `,
  footer: renderCalendarFooter('This month', options),
  header: html`
    <div class="selection-wrapper">
      <div class="header--year-selection header-selection" part="year-navigation">
        ${renderCalendarNavigation(options.yearNavigation)}
      </div>
    </div>
  `,
});
