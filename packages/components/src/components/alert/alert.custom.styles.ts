import { css } from 'lit';

export default css`
  .alert {
    /* Defines the used border and icon color for variants */
    --variant-color-border: var(--syn-alert-informative-color-border, var(--syn-panel-border-color));
    --variant-color-background: var(--syn-alert-informative-color-background, var(--syn-panel-background-color));
    --variant-color-icon: var(--syn-alert-informative-color-icon, var(--syn-color-primary-600));
    --variant-color-indicator: var(--syn-alert-informative-color-indicator, var(--syn-color-primary-600));

    background-color: var(--variant-color-background);
    border: var(--syn-panel-border-width) solid var(--variant-color-border);
    border-left: 0;
    border-radius: var(--syn-border-radius-none);
    color: var(--syn-typography-color-text);
    font-size: var(--syn-font-size-medium);
    line-height: var(--syn-line-height-normal);
    min-height: 56px;
  }

  /**
   * Add back the items left borders
   * This is done to prevent border clipping with the large border-left needed on .alert
   * Note we also need to adjust our paddings to add the border width here
   */
  .alert::before {
    background: var(--variant-color-indicator);
    bottom: -1px;
    content: "";
    left: 0;
    position: absolute;
    top: -1px;
    width: var(--syn-spacing-2x-small);
  }

  .alert :first-child {
    margin-inline-start: var(--syn-spacing-2x-small);
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
    padding: var(--syn-spacing-medium) var(--syn-spacing-large) var(--syn-spacing-medium) var(--syn-spacing-medium);
  }

  /**
   * Alert Icon
   */
  .alert__icon {
    color: var(--variant-color-icon);
    padding-block: var(--syn-spacing-medium);
    padding-inline-start: var(--syn-spacing-medium);
  }

  /**
   * Close Icon
   */
  .alert__close-button {
    align-self: start;
    color: var(--syn-typography-color-text);
    margin-block: calc(var(--syn-spacing-x-small) - var(--syn-panel-border-width));
    margin-inline-end: var(--syn-spacing-x-small);
  }

  /**
   * Variant colors
   */
  .alert--success {
    --variant-color-border: var(--syn-alert-success-color-border, var(--syn-panel-border-color));
    --variant-color-background: var(--syn-alert-success-color-background, var(--syn-panel-background-color));
    --variant-color-icon: var(--syn-alert-success-color-icon, var(--syn-color-success-500));
    --variant-color-indicator: var(--syn-alert-success-color-indicator, var(--syn-color-success-500));
  }

  .alert--neutral {
    --variant-color-border: var(--syn-alert-neutral-color-border, var(--syn-panel-border-color));
    --variant-color-background: var(--syn-alert-neutral-color-background, var(--syn-panel-background-color));
    --variant-color-icon: var(--syn-alert-neutral-color-icon, var(--syn-color-neutral-800));
    --variant-color-indicator: var(--syn-alert-neutral-color-indicator, var(--syn-color-neutral-800));
  }

  .alert--warning {
    --variant-color-border: var(--syn-alert-warning-color-border, var(--syn-panel-border-color));
    --variant-color-background: var(--syn-alert-warning-color-background, var(--syn-panel-background-color));
    --variant-color-icon: var(--syn-alert-warning-color-icon, var(--syn-color-warning-400));
    --variant-color-indicator: var(--syn-alert-warning-color-indicator, var(--syn-color-warning-400));
  }

  .alert--danger {
    --variant-color-border: var(--syn-alert-error-color-border, var(--syn-panel-border-color));
    --variant-color-background: var(--syn-alert-error-color-background, var(--syn-panel-background-color));
    --variant-color-icon: var(--syn-alert-error-color-icon, var(--syn-color-error-600));
    --variant-color-indicator: var(--syn-alert-error-color-indicator, var(--syn-color-error-600));
  }
`;
