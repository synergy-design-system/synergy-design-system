import { type TemplateResult, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

export interface CalendarItemOptions {
  kind: 'day' | 'month' | 'year';
  value: string | number;
  label: string | number | TemplateResult;
  active: boolean;
  tabbable: boolean;
  disabled?: boolean;
  today?: boolean;
  outside?: boolean;
}

export const renderCalendarItem = (options: CalendarItemOptions) => {
  const states = {
    active: options.active,
    disabled: !!options.disabled,
    outside: !!options.outside,
    today: !!options.today,
  };

  const parts = [
    'calendar-item',
    `calendar-item-${options.kind}`,
    ...Object.entries(states)
      .filter(([, enabled]) => enabled)
      .map(([state]) => `calendar-item-${state}`),
  ]
    .join(' ');

  return html`
    <button
      class=${classMap({
        'calendar-item': true,
        'calendar-item--active': states.active,
        'calendar-item--disabled': states.disabled,
        'calendar-item--outside': states.outside,
        'calendar-item--today': states.today,
      })}
      data-kind=${options.kind}
      data-value=${options.value}
      ?disabled=${states.disabled}
      part=${parts}
      tabindex=${options.tabbable && !states.disabled ? 0 : -1}
      type="button"
    >${options.label}</button>
  `;
};

export interface CalendarViewTemplates {
  header: TemplateResult;
  content: TemplateResult;
  footer: TemplateResult;
}

export interface CalendarFooterOptions {
  hasValue: boolean;
  onClear: () => void;
  onCurrent: () => void;
}

export interface CalendarNavigationOptions {
  label: string | number;
  previousLabel: string;
  nextLabel: string;
  onPrevious: () => void;
  onNext: () => void;
  onChoose?: () => void;
}

export const renderCalendarNavigation = (options: CalendarNavigationOptions) => html`
  <syn-icon-button
    @click=${options.onPrevious}
    label=${options.previousLabel}
    library="system"
    name="previous-page"
    part="previous-button"
    size="medium"
  ></syn-icon-button>
  ${options.onChoose ? html`
    <syn-button @click=${options.onChoose} part="navigation-label" size="medium" variant="text">
      ${options.label}
    </syn-button>
  ` : html`<span part="navigation-label">${options.label}</span>`}
  <syn-icon-button
    @click=${options.onNext}
    label=${options.nextLabel}
    library="system"
    name="next-page"
    part="next-button"
    size="medium"
  ></syn-icon-button>
`;

export const renderCalendarFooter = (label: string, options: CalendarFooterOptions) => html`
  <div class="selection-wrapper">
    <syn-button @click=${options.onCurrent} part="current-period-button" variant="text">
      ${label}
    </syn-button>
    <syn-button
      @click=${options.onClear}
      ?disabled=${!options.hasValue}
      part="clear-button"
      variant="text"
    >
      Clear
    </syn-button>
  </div>
`;
