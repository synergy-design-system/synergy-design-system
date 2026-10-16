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
    rangeInteriorEnd: !!options.rangeInteriorEnd,
    rangeInteriorStart: !!options.rangeInteriorStart,
    rangePending: !!options.rangePending,
    rangePreview: !!options.rangePreview,
    rangePreviewEnd: !!options.rangePreviewEnd,
    rangePreviewStart: !!options.rangePreviewStart,
    rangeStart: !!options.rangeStart,
    rangeUnavailable: !!options.rangeUnavailable,
    today: !!options.today,
  };

  const descriptors = Object.entries(states).map(([state, enabled]) => ({
    enabled,
    name: state.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`),
  }));

  const parts = [
    'calendar-item',
    `calendar-item-${options.kind}`,
    ...descriptors.filter(({ enabled }) => enabled).map(({ name }) => `calendar-item-${name}`),
  ]
    .join(' ');

  return html`
    <button
      aria-disabled=${states.disabled || states.rangeUnavailable ? 'true' : 'false'}
      aria-pressed=${states.active ? 'true' : 'false'}
      aria-current=${states.today ? 'date' : 'false'}
      class=${classMap({
        'calendar-item': true,
        ...Object.fromEntries(descriptors.map(({ enabled, name }) => [`calendar-item--${name}`, enabled])),
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
    ?disabled=${options.disabled || !!options.previousDisabled}
  ></syn-icon-button>
  ${options.onChoose ? html`
    <syn-button
      @click=${options.onChoose}
      ?disabled=${options.disabled}
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
    ?disabled=${options.disabled || !!options.nextDisabled}
  ></syn-icon-button>
`;

/** Renders localized current-period and Clear actions with their availability and shared size. */
export const renderCalendarFooter = (options: CalendarFooterOptions) => html`
  <div class="selection-wrapper">
    <syn-button
      @click=${options.onCurrent}
      ?disabled=${options.disabled || !!options.currentDisabled}
      exportparts="base:current-period-button__base"
      part="current-period-button"
      size=${options.size}
      variant="text"
    >
      ${options.currentLabel}
    </syn-button>
    <syn-button
      @click=${options.onClear}
      ?disabled=${options.disabled || !!options.clearDisabled || !options.hasValue}
      exportparts="base:clear-button__base"
      part="clear-button"
      size=${options.size}
      variant="text"
    >
      ${options.clearLabel}
    </syn-button>
  </div>
`;
