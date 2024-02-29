import { css } from 'lit';

export default css`
  :host {
    // box-shadow: 0 0 15px rgba(0 0 0 0.3);
    display: block;
  }

  /**
   * Core nav item wrapper
   */
  .nav-item {
    align-items: center;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
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
    opacity: 0.5;
  }

  .nav-item--current {
    font-weight: var(--syn-font-weight-bold);
  }

  .nav-item:hover {
    background: var(--syn-color-neutral-100);
  }

  .nav-item:focus {
    box-shadow: 0 0 2px red;
    outline: none;
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
   * Dividers are optionally displayed in horizontal nav items and share 
   */
  .divider {
    position: absolute;
    left: 0;
    width: 100%;
    margin: 0;
    top: 0;
    --color: var(--syn-color-neutral-200);
  }

  /**
   * The chevron indicates the use as a <details /> element
   */
  .nav-item__chevron {
    font-size: var(--syn-font-size-x-large);
    padding-left: var(--syn-spacing-x-small);
  }
`;
