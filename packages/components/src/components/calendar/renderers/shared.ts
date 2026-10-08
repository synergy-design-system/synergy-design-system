import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import type {
  CalendarFooterOptions,
  CalendarItemOptions,
  CalendarNavigationOptions,
} from '../internal-types.js';

export const renderCalendarItem = (options: CalendarItemOptions) => {
  const states = {
    active: options.active,
    disabled: !!options.disabled,
    outside: !!options.outside,
    rangeBegin: !!options.rangeBegin,
    rangeClipped: !!options.rangeClipped,
    rangeEnd: !!options.rangeEnd,
    rangeInterior: !!options.rangeInterior,
    rangePending: !!options.rangePending,
    rangePreview: !!options.rangePreview,
    rangeStart: !!options.rangeStart,
    rangeUnavailable: !!options.rangeUnavailable,
    today: !!options.today,
  };

  const parts = [
    'calendar-item',
    `calendar-item-${options.kind}`,
    ...Object.entries(states)
      .filter(([, enabled]) => enabled)
      .map(([state]) => `calendar-item-${state.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}`),
  ]
    .join(' ');

  return html`
    <button
      aria-disabled=${states.disabled || states.rangeUnavailable ? 'true' : 'false'}
      class=${classMap({
        'calendar-item': true,
        'calendar-item--active': states.active,
        'calendar-item--disabled': states.disabled,
        'calendar-item--outside': states.outside,
        'calendar-item--range-begin': states.rangeBegin,
        'calendar-item--range-clipped': states.rangeClipped,
        'calendar-item--range-end': states.rangeEnd,
        'calendar-item--range-interior': states.rangeInterior,
        'calendar-item--range-pending': states.rangePending,
        'calendar-item--range-preview': states.rangePreview,
        'calendar-item--range-start': states.rangeStart,
        'calendar-item--range-unavailable': states.rangeUnavailable,
        'calendar-item--today': states.today,
      })}
      data-kind=${options.kind}
      data-value=${options.value}
      ?disabled=${states.disabled}
      part=${parts}
      tabindex=${options.tabbable && !states.disabled ? 0 : -1}
      type="button"
    >
      <slot .name=${`${options.kind}-${options.value}`}>
        ${options.label}
      </slot>
    </button>
  `;
};

export const renderCalendarNavigation = (options: CalendarNavigationOptions) => html`
  <syn-icon-button
    @click=${options.onPrevious}
    label=${options.previousLabel}
    library="system"
    name="previous-page"
    part="previous-button"
    size=${options.size}
    ?disabled=${!!options.previousDisabled}
  ></syn-icon-button>
  ${options.onChoose ? html`
    <syn-button @click=${options.onChoose} part="navigation-label" size=${options.size} variant="text">
      ${options.label}
    </syn-button>
  ` : html`<span part="navigation-label">${options.label}</span>`}
  <syn-icon-button
    @click=${options.onNext}
    label=${options.nextLabel}
    library="system"
    name="next-page"
    part="next-button"
    size=${options.size}
    ?disabled=${!!options.nextDisabled}
  ></syn-icon-button>
`;

export const renderCalendarFooter = (options: CalendarFooterOptions) => html`
  <div class="selection-wrapper">
    <syn-button
      @click=${options.onCurrent}
      ?disabled=${!!options.currentDisabled}
      part="current-period-button"
      size=${options.size}
      variant="text"
    >
      ${options.currentLabel}
    </syn-button>
    <syn-button
      @click=${options.onClear}
      ?disabled=${!options.hasValue}
      part="clear-button"
      size=${options.size}
      variant="text"
    >
      ${options.clearLabel}
    </syn-button>
  </div>
`;
