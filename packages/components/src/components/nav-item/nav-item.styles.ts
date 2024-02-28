import { css } from 'lit';

export default css`
  :host {
    border: 1px dotted red;
    display: block;
    margin: 20px 0;
    max-width: 300px;
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
    width: 100%;
  }

  .nav-item:hover {
    background: var(--syn-color-neutral-100);
  }

  /**
   * Slotted icons should use a default font size of large
   */
  .nav-item--has-prefix ::slotted(syn-icon) {
    font-size: var(--syn-font-size-x-large);
  }

  .nav-item__content-container {
    flex: 1;
  }

  /**
   * Adjust the paddings for the label, depending if there is a pre- or suffix available
   */
  .nav-item--has-prefix .nav-item__content-container {
    padding-left: var(--syn-spacing-x-small);
  }

  .nav-item--has-suffix .nav-item__content-container {
    padding-right: var(--syn-spacing-x-small);
  }

  /**
   * The chevron
   */
  .nav-item__chevron {
    font-size: var(--syn-font-size-x-large);
    padding-left: var(--syn-spacing-x-small);
  }
`;
