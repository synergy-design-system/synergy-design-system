import { css } from 'lit';
import componentStyles from '../../styles/component.styles.js';

export default css`
  ${componentStyles}

  :host {
    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: var(--sds-panel-background-color);
    border: solid var(--sds-panel-border-width) var(--sds-panel-border-color);
    border-left-width: calc(var(--sds-panel-border-width) * 3);
    font-family: var(--sds-font-sans);
    font-size: var(--sds-font-size-small);
    font-weight: var(--sds-font-weight-normal);
    line-height: 1.6;
    color: var(--sds-color-neutral-700);
    margin: inherit;
  }

  .alert:not(.alert--has-icon) .alert__icon,
  .alert:not(.alert--closable) .alert__close-button {
    display: none;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sds-font-size-large);
    padding-inline-start: var(--sds-spacing-large);
  }

  .alert--primary {
    border-left-color: var(--sds-color-primary-600);
  }

  .alert--primary .alert__icon {
    color: var(--sds-color-primary-600);
  }

  .alert--success {
    border-left-color: var(--sds-color-success-600);
  }

  .alert--success .alert__icon {
    color: var(--sds-color-success-600);
  }

  .alert--neutral {
    border-left-color: var(--sds-color-neutral-600);
  }

  .alert--neutral .alert__icon {
    color: var(--sds-color-neutral-600);
  }

  .alert--warning {
    border-left-color: var(--sds-color-warning-600);
  }

  .alert--warning .alert__icon {
    color: var(--sds-color-warning-600);
  }

  .alert--danger {
    border-left-color: var(--sds-color-danger-600);
  }

  .alert--danger .alert__icon {
    color: var(--sds-color-danger-600);
  }

  .alert__message {
    flex: 1 1 auto;
    display: block;
    padding: var(--sds-spacing-large);
    overflow: hidden;
  }

  .alert__close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sds-font-size-medium);
    padding-inline-end: var(--sds-spacing-medium);
  }
`;
