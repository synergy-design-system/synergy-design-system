import { css } from 'lit';

export default css`
  /* stylelint-disable no-descending-specificity */
  :host {
    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .alert {
    /* Defines the used border and icon color for variants */
    --variant-color-border: var(--syn-alert-informative-color-border);
    --variant-color-background: var(--syn-alert-informative-color-background);
    --variant-color-icon: var(--syn-alert-informative-color-icon);
    --variant-color-indicator: var(--syn-alert-informative-color-indicator);

    /* Defines special settings for sizes */
    --size-font-size: var(--syn-font-size-medium);
    --size-icon-size: var(--syn-font-size-x-large);
    --size-min-height: 54px;
    --size-message-padding: var(--syn-spacing-medium) var(--syn-spacing-large) var(--syn-spacing-medium) var(--syn-spacing-medium);
    --size-icon-padding-block: var(--syn-spacing-medium);
    --size-icon-padding-inline: var(--syn-spacing-medium);

    align-items: stretch;
    background-color: var(--variant-color-background);
    border: var(--syn-panel-border-width) solid var(--variant-color-border);
    border-left: 0;
    border-radius: var(--syn-border-radius-none);
    box-sizing: content-box;
    color: var(--syn-typography-color-text);
    display: flex;
    font-family: var(--syn-font-sans);
    font-size: var(--size-font-size);
    font-weight: var(--syn-font-weight-normal);
    line-height: var(--syn-line-height-normal);
    margin: inherit;
    min-height: var(--size-min-height);
    position: relative;
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

  .alert:not(.alert--has-icon) .alert__icon,
  .alert:not(.alert--closable) .alert__close-button {
    display: none;
  }

  /**
   * Make sure everything is aligned to top
   */
  .alert__icon {
    align-items: flex-start;
    color: var(--variant-color-icon);
    display: flex;
    flex: 0 0 auto;
    font-size: var(--size-icon-size);
    padding-block-start: var(--size-icon-padding-block);
    padding-inline-start: var(--size-icon-padding-inline);
  }

  .alert--has-countdown {
    border-bottom: none;
  }

  .alert__message {
    align-self: center;
    display: block;
    flex: 1 1 auto;
    padding: var(--size-message-padding);
  }

  /**
   * Close Icon
   */
  .alert__close-button {
    align-items: flex-start;
    align-self: start; /* #1135: Fix alignment for the close icon */
    color: var(--syn-typography-color-text);
    display: flex;
    flex: 0 0 auto;
    font-size: var(--size-icon-size);
    margin-block: calc(var(--syn-spacing-x-small) - var(--syn-panel-border-width));
    margin-inline-end: var(--syn-spacing-x-small);
  }

  .alert__countdown {
    background-color: var(--syn-panel-border-color);
    bottom: 0;
    display: flex;
    height: calc(var(--syn-panel-border-width) * 3);
    left: 0;
    position: absolute;
    width: 100%;
  }

  .alert__countdown--ltr {
    justify-content: flex-end;
  }

  .alert__countdown .alert__countdown-elapsed {
    height: 100%;
    width: 0;
  }

  .alert--primary .alert__countdown-elapsed {
    background-color: var(--syn-color-primary-600);
  }

  .alert--success .alert__countdown-elapsed {
    background-color: var(--syn-color-success-600);
  }

  .alert--neutral .alert__countdown-elapsed {
    background-color: var(--syn-color-neutral-600);
  }

  .alert--warning .alert__countdown-elapsed {
    background-color: var(--syn-color-warning-600);
  }

  .alert--danger .alert__countdown-elapsed {
    background-color: var(--syn-color-danger-600);
  }

  /**
   * Variant colors
   */
  .alert--success {
    --variant-color-border: var(--syn-alert-success-color-border);
    --variant-color-background: var(--syn-alert-success-color-background);
    --variant-color-icon: var(--syn-alert-success-color-icon);
    --variant-color-indicator: var(--syn-alert-success-color-indicator);
  }

  .alert--neutral {
    --variant-color-border: var(--syn-alert-neutral-color-border);
    --variant-color-background: var(--syn-alert-neutral-color-background);
    --variant-color-icon: var(--syn-alert-neutral-color-icon);
    --variant-color-indicator: var(--syn-alert-neutral-color-indicator);
  }

  .alert--warning {
    --variant-color-border: var(--syn-alert-warning-color-border);
    --variant-color-background: var(--syn-alert-warning-color-background);
    --variant-color-icon: var(--syn-alert-warning-color-icon);
    --variant-color-indicator: var(--syn-alert-warning-color-indicator);
  }

  .alert--danger {
    --variant-color-border: var(--syn-alert-error-color-border);
    --variant-color-background: var(--syn-alert-error-color-background);
    --variant-color-icon: var(--syn-alert-error-color-icon);
    --variant-color-indicator: var(--syn-alert-error-color-indicator);
  }

  /* #1119: Alert Sizes */
  .alert--small {
    --size-font-size: var(--syn-font-size-small);
    --size-icon-size: var(--syn-font-size-large);
    --size-min-height: 44px;
    --size-message-padding: var(--syn-spacing-small) var(--syn-spacing-large) var(--syn-spacing-small) var(--syn-spacing-small);
    --size-icon-padding-block: var(--syn-spacing-small);
    --size-icon-padding-inline: var(--syn-spacing-small);
  }

  /* Adjust close button size for small alerts */
  .alert--small .alert__close-button {
    font-size: var(--syn-font-size-medium);
  }

  .alert--large {
    --size-font-size: var(--syn-font-size-large);
    --size-icon-size: var(--syn-font-size-2x-large);
    --size-min-height: 68px;
    --size-message-padding: var(--syn-spacing-medium-large) var(--syn-spacing-large) var(--syn-spacing-medium-large) var(--syn-spacing-medium-large);
    --size-icon-padding-block: var(--syn-spacing-medium-large);
    --size-icon-padding-inline: var(--syn-spacing-medium-large);
  }

  .alert__timer {
    display: none;
  }
`;
