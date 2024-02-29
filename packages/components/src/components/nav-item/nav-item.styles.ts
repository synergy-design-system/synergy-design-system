import { css } from 'lit';

export default css`
  :host {
    display: block;
  }

  /**
   * Core nav item wrapper
   */
  .nav-item {
    background: transparent;
    border: none;
    cursor: pointer;
    font: var(--syn-font-sans);
    font-size: var(--syn-font-size-small);
    min-height: var(--syn-spacing-2x-large);
    padding: var(--syn-spacing-small) var(--syn-spacing-medium) var(--syn-spacing-small) var(--syn-spacing-large);
    position: relative;
    text-align: left;
    width: 100%;
  }

  .nav-item--disabled {
    cursor: not-allowed;
  }

  .nav-item--current {
    font-weight: var(--syn-font-weight-bold);
  }

  .nav-item:focus-visible {
    outline: var(--syn-focus-ring);
    outline-offset: -2px;
  }

  .nav-item:not(.nav-item--disabled):hover {
    background: var(--syn-color-neutral-100);
  }

  /**
   * The content wrapper is needed to get the disabled state right.
   * Normally, we would just use opacity directly on the button.
   * When using the divider prop, this leads to problems
   * as the divider itself will also get opaque.
   * Therefore, we opted to add the wrapper element and apply the opacity there.
   */
  .nav-item__content {
    align-items: center;
    display: flex;
    position: relative;
  }

  .nav-item--disabled .nav-item__content {
    opacity: 0.5;
  }

  /**
   * Slotted icons should use a default font size of large
   */
  .nav-item--has-prefix ::slotted(syn-icon) {
    font-size: var(--syn-font-size-x-large);
  }

  /**
   * Make the primary content container fill all available space
   */
  .nav-item__content-container {
    flex: 1;
  }

  /**
   * Adjust the paddings for the label, depending if there is a pre- and/or suffix available
   */
  .nav-item--has-prefix .nav-item__content-container {
    padding-left: var(--syn-spacing-x-small);
  }

  .nav-item--has-suffix .nav-item__content-container {
    padding-right: var(--syn-spacing-x-small);
  }

  /**
   * The current indicator tells the user that the nav-item is the active one
   */
  .current-indicator {
    background: transparent;
    border: none;
    margin: 0;
    position: absolute;
  }

  .current-indicator--visible.current-indicator--disabled {
    background: var(--syn-color-neutral-500);
  }

  .current-indicator--visible {
    background: var(--syn-color-primary-600);
  }

  .current-indicator--horizontal {
    bottom: 0;
    height: var(--syn-spacing-2x-small);
    left: var(--syn-spacing-x-small);
    right: var(--syn-spacing-x-small);
  }

  .current-indicator--vertical {
    bottom: var(--syn-spacing-x-small);
    left: 0;
    top: var(--syn-spacing-x-small);
    width: var(--syn-spacing-2x-small);
  }

  /**
   * Dividers are optionally displayed in horizontal nav items
   */
  .divider {
    --color: var(--syn-color-neutral-200);

    left: 0;
    margin: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  /**
   * Hide the divider for active elements
   */
  .nav-item:focus-visible .divider {
    --color: transparent;
  }

  /**
   * The chevron indicates the use as a <details /> element
   */
  .nav-item__chevron {
    font-size: var(--syn-font-size-x-large);
    padding-left: var(--syn-spacing-x-small);
  }
`;
