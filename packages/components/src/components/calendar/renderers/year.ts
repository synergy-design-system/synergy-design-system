import { html } from 'lit';
import type { CalendarViewTemplates, YearViewOptions } from '../internal-types.js';
import { isYearInRange } from '../utils.js';
import {
  renderCalendarFooter,
  renderCalendarItem,
  renderCalendarNavigation,
} from './shared.js';

export const renderYearView = (options: YearViewOptions): CalendarViewTemplates => ({
  content: html`
    <div class="period-selector" part="year-grid">
      ${Array.from({ length: 12 }, (_, index) => options.blockStart + index).map(year => renderCalendarItem({
        active: options.activeYear === year,
        disabled: !isYearInRange(
          year,
          options.min,
          options.max,
          options.disabledDates,
          options.disabledWeekdays,
        ),
        kind: 'year',
        label: year,
        tabbable: year === options.focusedYear,
        value: year,
      }))}
    </div>
  `,
  footer: renderCalendarFooter('This year', options),
  header: html`
    <div class="selection-wrapper">
      <div class="header--year-selection header-selection" part="year-navigation">
        ${renderCalendarNavigation(options.navigation)}
      </div>
    </div>
  `,
});
