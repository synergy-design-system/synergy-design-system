import { css } from 'lit';

export default css`
  :host {
    /* Custom override for hiding the checkmark in menus it is not needed */
    --display-checkmark: flex;
  }

  .menu-item {
    /*
     * #958: Brand2025 defines a small gap between menu items
     * and rounded corners. We achieve that using an outline
     * that simulates the gap using the menu background color.
     */
    --outline: calc(var(--syn-focus-ring-border-radius) * 1.5);
    
    border-radius: calc(var(--outline) * 1.5);
    color: var(--syn-option-color, var(--syn-typography-color-text));
    font-size: var(--syn-font-size-medium);
    outline: var(--outline) solid var(--syn-panel-background-color);
    outline-offset: calc(var(--outline) * -1 + 1px);
    padding: var(--syn-spacing-small) var(--syn-spacing-medium);
  }

  :host(:focus-visible) .menu-item {
    background-color: var(--syn-option-background-color-active, var(--syn-color-primary-1000, var(--syn-color-neutral-1000)));
    outline: var(--outline) solid var(--syn-panel-background-color);
    outline-offset: calc(var(--outline) * -1 + 1px);
  }

  /** #429: Use token for opacity */
  .menu-item.menu-item--disabled {
    opacity: var(--syn-opacity-50);
  }

  /**
   * Handling for slotted prefix and suffix
   */
  .menu-item .menu-item__prefix::slotted(*) {
    margin-inline-end: var(--syn-spacing-small);
  }

  .menu-item .menu-item__suffix::slotted(*) {
    margin-inline-start: var(--syn-spacing-small);
  }

  /**
   * Set the default font size to make icons appear correct
   */
  .menu-item .menu-item__prefix::slotted(syn-icon),
  .menu-item .menu-item__suffix::slotted(syn-icon) {
    color: var(--syn-option-icon-color, var(--syn-option-color, var(--syn-typography-color-text)));
    font-size: var(--syn-font-size-x-large);
  }

  :host(:hover) .menu-item .menu-item__prefix::slotted(syn-icon),
  :host(:hover) .menu-item__suffix::slotted(syn-icon) {
    color: var(--syn-option-icon-color-hover, var(--syn-typography-color-text-inverted));
  }

  :host(:focus-visible) .menu-item .menu-item__prefix::slotted(syn-icon),
  :host(:focus-visible) .menu-item .menu-item__suffix::slotted(syn-icon) {
    color: var(--syn-option-icon-color-active, var(--syn-typography-color-text-inverted));
  }

  /* Adjust background and text color for focused elements */
  /* stylelint-disable selector-not-notation, plugin/no-unsupported-browser-features */
  :host(:hover:not([aria-disabled='true'], :focus-visible)) .menu-item,
  .menu-item--submenu-expanded {
    background-color: var(--syn-option-background-color-hover, var(--syn-color-primary-1000));
    color: var(--syn-option-color-hover, var(--syn-color-neutral-1000));
  }
  /* stylelint-enable selector-not-notation, plugin/no-unsupported-browser-features */

  /**
   * Adjust the size of icons
   */
  .menu-item .menu-item__chevron,
  .menu-item .menu-item__check {
    display: var(--display-checkmark);
    font-size: var(--syn-font-size-x-large);
    width: var(--syn-font-size-x-large);
  }

  /**
   * This makes sure the chevron does not take any space if we do not have children
   */
  .menu-item .menu-item__chevron {
    display: none;
    margin-inline-start: var(--syn-spacing-small);
  }

  .menu-item .menu-item__check {
    color: var(--syn-option-check-color, var(--syn-color-primary-600));
    margin-inline-end: var(--syn-spacing-small);
  }

  /**
   * When in loading state, do not show the checkmark as it would bleed through
   */
  .menu-item--loading .menu-item__check {
    visibility: hidden;
  }

  /**
   * Make sure the checkbox is also visible when the item is active
   */
  :host(:focus-visible) .menu-item--checked .menu-item__check {
    color: var(--syn-option-check-color-active, var(--syn-color-neutral-0));
  }

  :host(:hover) .menu-item--checked .menu-item__check {
    color: var(--syn-option-check-color-hover, var(--syn-color-neutral-0));
  }

  /**
   * Special handling for the submenu chevron:
   * We are using the "chevron-down" icon per default as
   * we do not want all chevrons to be part of the bundle
   * Therefore, we have to transform it into the right direction
   */
  .menu-item .menu-item__chevron syn-icon {
    transform: rotate(-90deg);
  }

  .menu-item--rtl .menu-item__chevron syn-icon {
    transform: rotate(90deg);
  }

  .menu-item.menu-item--loading *:not(syn-spinner) {
    opacity: var(--syn-opacity-50);
  }

  /**
   * Make sure to show the chevron if there are children
   */
  .menu-item--has-submenu .menu-item__chevron {
    display: flex;
  }

  /**
   * Adjustments for the spinner in loading state
   */
  .menu-item--loading syn-spinner {
    --track-width: 2px;

    font-size: var(--syn-font-size-medium);
    left: var(--syn-spacing-medium);
  }

  /**
   * Highlight checked items
   */
  .menu-item--checked .menu-item__label {
    font-weight: var(--syn-font-weight-semibold);
  }

  /* Needed if we do not show the checkmark */
  :host(:not([type="checkmark"]):not([loading])) .menu-item__label {
    min-height: var(--syn-font-size-x-large);
  }
`;
