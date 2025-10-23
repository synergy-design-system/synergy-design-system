import { css } from 'lit';

export default css`
  .badge {
    border: none;
    border-radius: var(--syn-border-radius-pill);
    font: var(--syn-body-medium-bold);
    height: var(--syn-spacing-large);
    line-height: var(--syn-spacing-large);
    min-width: var(--syn-spacing-large);
    padding: 0 var(--syn-spacing-x-small);
  }

  /* Variant modifiers */
  .badge--primary {
    background-color: var(--syn-badge-informative-color-background, var(--syn-color-primary-600));
    color: var(--syn-badge-informative-color-text, var(--syn-typography-color-text-inverted));
  }

  .badge--success {
    background-color: var(--syn-badge-success-color-background, var(--syn-color-success-500));
    color: var(--syn-badge-success-color-text, var(--syn-typography-color-text));
  }

  .badge--neutral {
    background-color: var(--syn-badge-neutral-color-background, var(--syn-color-neutral-800));
    color: var(--syn-badge-neutral-color-text, var(--syn-typography-color-text-inverted));
  }

  .badge--warning {
    background-color: var(--syn-badge-warning-color-background, var(--syn-color-warning-400));
    color: var(--syn-badge-warning-color-text, var(--syn-typography-color-text));
  }

  .badge--danger {
    background-color: var(--syn-badge-error-color-background, var(--syn-color-error-600));
    color: var(--syn-badge-error-color-text, var(--syn-typography-color-text-inverted));
  }

  /**
   * Special treatment: If the badge is empty, show it as a dot only
   */
  :host(:empty) .badge {
    height: var(--syn-spacing-x-small);
    min-width: initial;
    padding: 0;
    width: var(--syn-spacing-x-small);
  }

  .visually-hidden {
    border: 0;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;
