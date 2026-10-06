import { html } from 'lit';
import {
  type CalendarFooterOptions,
  type CalendarNavigationOptions,
  type CalendarViewTemplates,
  renderCalendarFooter,
  renderCalendarItem,
  renderCalendarNavigation,
} from './shared.js';

export interface YearViewOptions extends CalendarFooterOptions {
  blockStart: number;
  focusedYear: number;
  activeYear: number | undefined;
  navigation: CalendarNavigationOptions;
}

export const renderYearView = (options: YearViewOptions): CalendarViewTemplates => ({
  content: html`
    <div class="period-selector" part="year-grid">
      ${Array.from({ length: 12 }, (_, index) => options.blockStart + index).map(year => renderCalendarItem({
        active: options.activeYear === year,
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
