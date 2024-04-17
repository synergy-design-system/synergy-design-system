import { css } from 'lit';

export default css`
  .alert {
    border: none;
    border-left: var(--syn-spacing-2x-small) solid var(--syn-panel-border-color);
    border-radius: var(--syn-border-radius-none);
    border-right: var(--syn-panel-border-width) solid var(--syn-panel-border-color);
    color: var(--syn-typography-color-text);
    font-size: var(--syn-font-size-medium);
    line-height: var(--syn-line-height-normal);
    min-height: 56px;
  }

  /**
   * Add back the item borders
   * This is done to prevent border clipping with the large border-left needed on .alert
   * Note we also need to adjust our paddings to add the border width here
   */
  .alert > * {
    border: var(--syn-panel-border-width) solid var(--syn-panel-border-color);
    border-left: none;
    border-width: var(--syn-panel-border-width) 0;
  }

  /**
   * Make sure everything is aligned to top
   */
  .alert__icon,
  .alert__close-button {
    align-items: flex-start;
    font-size: var(--syn-font-size-x-large);
  }

  .alert__message {
    align-content: center;
    padding: calc(var(--syn-spacing-medium) - var(--syn-panel-border-width)) var(--syn-spacing-large) calc(var(--syn-spacing-medium) - var(--syn-panel-border-width)) var(--syn-spacing-medium);
  }


  /**
   * Alert Icon
   */
  .alert__icon {
    padding-block: calc(var(--syn-spacing-medium) - var(--syn-panel-border-width));
    padding-inline-start: var(--syn-spacing-medium);
  }

  /**
   * Close Icon
   */
  .alert__close-button {
    color: var(--syn-typography-color-text);
    padding-block: calc(var(--syn-spacing-x-small) - var(--syn-panel-border-width));
    padding-inline-end: var(--syn-spacing-x-small);
  }

  /**
   * Variants should highlight the left border instead of top
   */
  .alert--primary {
    border-left-color: var(--syn-color-primary-600);
  }

  .alert--primary .alert__icon {
    color: var(--syn-color-primary-600);
  }

  .alert--success {
    border-left-color: var(--syn-color-success-500);
  }

  .alert--success .alert__icon {
    color: var(--syn-color-success-500);
  }

  .alert--neutral {
    border-left-color: var(--syn-color-neutral-800);
  }

  .alert--neutral .alert__icon {
    color: var(--syn-color-neutral-800);
  }

  .alert--warning {
    border-left-color: var(--syn-color-warning-400);
  }

  .alert--warning .alert__icon {
    color: var(--syn-color-warning-400);
  }

  .alert--danger {
    border-left-color: var(--syn-color-error-600);
  }

  .alert--danger .alert__icon {
    color: var(--syn-color-error-600);
  }
`;
