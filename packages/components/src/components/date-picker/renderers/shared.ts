import { type TemplateResult, html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

export interface CalendarItemOptions {
  kind: 'day' | 'month' | 'year';
  value: string | number;
  label: string | number | TemplateResult;
  active: boolean;
  tabbable: boolean;
  today?: boolean;
  outside?: boolean;
}

export const renderCalendarItem = (options: CalendarItemOptions) => html`
  <button
    aria-hidden=${options.kind === 'day' ? String(!!options.outside) : nothing}
    class=${classMap({
      'day-selector__day--active': options.active,
      'day-selector__day--outside': !!options.outside,
      'day-selector__day--today': !!options.today,
      'day-selector__day-button': true,
    })}
    type="button"
    data-kind=${options.kind}
    data-value=${options.value}
    tabindex=${options.tabbable ? 0 : -1}
  >${options.label}</button>
`;

export interface ViewTemplates {
  header: TemplateResult;
  content: TemplateResult;
  footer: TemplateResult;
}

export interface FooterOptions {
  hasValue: boolean;
  onClear: () => void;
  onCurrent: () => void;
}

export interface NavigationOptions {
  label: string | number;
  previousLabel: string;
  nextLabel: string;
  onPrevious: () => void;
  onNext: () => void;
  onChoose?: () => void;
}

export const renderNavigation = (options: NavigationOptions) => html`
  <syn-icon-button
    @click=${options.onPrevious}
    label=${options.previousLabel}
    library="system"
    name="previous-page"
    size="medium"
  ></syn-icon-button>
  ${options.onChoose ? html`
    <syn-button @click=${options.onChoose} size="medium" variant="text">
      ${options.label}
    </syn-button>
  ` : html`<span>${options.label}</span>`}
  <syn-icon-button
    @click=${options.onNext}
    label=${options.nextLabel}
    library="system"
    name="next-page"
    size="medium"
  ></syn-icon-button>
`;

export const renderFooter = (label: string, options: FooterOptions) => html`
  <div class="selection-wrapper">
    <syn-button @click=${options.onCurrent} variant="text">${label}</syn-button>
    <syn-button @click=${options.onClear} ?disabled=${!options.hasValue} variant="text">
      Clear
    </syn-button>
  </div>
`;
