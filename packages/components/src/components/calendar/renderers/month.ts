import { html } from 'lit';
import { getMonthNames } from '../utils.js';
import {
  type FooterOptions,
  type NavigationOptions,
  type ViewTemplates,
  renderCalendarItem,
  renderFooter,
  renderNavigation,
} from './shared.js';

export interface MonthViewOptions extends FooterOptions {
  locale: string;
  activeMonth: number | undefined;
  focusedMonth: number;
  yearNavigation: NavigationOptions;
}

export const renderMonthView = (options: MonthViewOptions): ViewTemplates => ({
  content: html`
    <div class="period-selector">
      ${getMonthNames(options.locale, 'short').map((month, index) => renderCalendarItem({
        active: options.activeMonth === index,
        kind: 'month',
        label: month,
        tabbable: index === options.focusedMonth,
        value: index,
      }))}
    </div>
  `,
  footer: renderFooter('This month', options),
  header: html`
    <div class="selection-wrapper">
      <div class="header--year-selection header-selection">
        ${renderNavigation(options.yearNavigation)}
      </div>
    </div>
  `,
});
