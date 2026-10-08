import { html } from 'lit';
import type { CalendarViewTemplates, MonthViewOptions } from '../internal-types.js';
import {
  getMonthNames,
  isMonthInRange,
} from '../utils.js';
import {
  renderCalendarFooter,
  renderCalendarItem,
  renderCalendarNavigation,
} from './shared.js';

export const renderMonthView = (options: MonthViewOptions): CalendarViewTemplates => ({
  content: html`
    <div class="period-selector" part="month-grid">
      ${getMonthNames(options.locale, 'short').map((month, index) => renderCalendarItem({
        active: options.activeMonth === index + 1,
        disabled: !isMonthInRange(
          options.year,
          index + 1,
          options.min,
          options.max,
          options.disabledDates,
          options.disabledWeekdays,
        ),
        kind: 'month',
        label: month,
        tabbable: index + 1 === options.focusedMonth,
        value: index,
      }))}
    </div>
  `,
  footer: renderCalendarFooter(options),
  header: html`
    <div class="selection-wrapper">
      <div class="header--year-selection header-selection" part="year-navigation">
        ${renderCalendarNavigation(options.yearNavigation)}
      </div>
    </div>
  `,
});
