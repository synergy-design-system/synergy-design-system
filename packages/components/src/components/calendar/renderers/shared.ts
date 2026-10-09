import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import type {
  CalendarFooterOptions,
  CalendarItemOptions,
  CalendarNavigationOptions,
} from '../internal-types.js';

/** Renders a slotted day/month/year button with roving focus and state-specific classes/parts. */
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
      <slot .name=${`${options.kind}-${options.value}`} part="calendar-item-label">
        ${options.label}
      </slot>
    </button>
  `;
};

/** Renders period navigation, forwarding control bases and optionally offering a view switch. */
export const renderCalendarNavigation = (options: CalendarNavigationOptions) => html`
  <syn-icon-button
    @click=${options.onPrevious}
    exportparts="base:previous-button__base"
    label=${options.previousLabel}
    library="system"
    name="previous-page"
    part="previous-button"
    size=${options.size}
    ?disabled=${!!options.previousDisabled}
  ></syn-icon-button>
  ${options.onChoose ? html`
    <syn-button
      @click=${options.onChoose}
      exportparts="base:navigation-label__base"
      part="navigation-label"
      size=${options.size}
      variant="text"
    >
      ${options.label}
    </syn-button>
  ` : html`<span part="navigation-label">${options.label}</span>`}
  <syn-icon-button
    @click=${options.onNext}
    exportparts="base:next-button__base"
    label=${options.nextLabel}
    library="system"
    name="next-page"
    part="next-button"
    size=${options.size}
    ?disabled=${!!options.nextDisabled}
  ></syn-icon-button>
`;

/** Renders localized current-period and Clear actions with their availability and shared size. */
export const renderCalendarFooter = (options: CalendarFooterOptions) => html`
  <div class="selection-wrapper">
    <syn-button
      @click=${options.onCurrent}
      ?disabled=${!!options.currentDisabled}
      exportparts="base:current-period-button__base"
      part="current-period-button"
      size=${options.size}
      variant="text"
    >
      ${options.currentLabel}
    </syn-button>
    <syn-button
      @click=${options.onClear}
      ?disabled=${!options.hasValue}
      exportparts="base:clear-button__base"
      part="clear-button"
      size=${options.size}
      variant="text"
    >
      ${options.clearLabel}
    </syn-button>
  </div>
`;
