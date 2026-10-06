import { html } from 'lit';
import {
  type FooterOptions,
  type NavigationOptions,
  type ViewTemplates,
  renderCalendarItem,
  renderFooter,
  renderNavigation,
} from './shared.js';

export interface YearViewOptions extends FooterOptions {
  blockStart: number;
  focusedYear: number;
  activeYear: number | undefined;
  navigation: NavigationOptions;
}

export const renderYearView = (options: YearViewOptions): ViewTemplates => ({
  content: html`
    <div class="period-selector">
      ${Array.from({ length: 12 }, (_, index) => options.blockStart + index).map(year => renderCalendarItem({
        active: options.activeYear === year,
        kind: 'year',
        label: year,
        tabbable: year === options.focusedYear,
        value: year,
      }))}
    </div>
  `,
  footer: renderFooter('This year', options),
  header: html`
    <div class="selection-wrapper">
      <div class="header--year-selection header-selection">
        ${renderNavigation(options.navigation)}
      </div>
    </div>
  `,
});
