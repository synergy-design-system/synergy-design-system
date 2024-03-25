import { css } from 'lit';

export default css`
  .badge {
    border: none;
    border-radius: var(--syn-border-radius-pill);
    font: var(--syn-body-x-small-bold);
    height: 22px;

    /**
     * We are using a fixed value inner paddings to make sure that
     * we get a perfect circle when only having one char in the pill
     */
    padding: 0 7px;
  }

  /* Variant modifiers */
  .badge--primary {
    background-color: var(--syn-color-primary-600);
    color: var(--syn-typography-color-text-inverted);
  }

  .badge--success {
    background-color: var(--syn-color-success-700);
    color: var(--syn-typography-color-text-inverted);
  }

  .badge--neutral {
    background-color: var(--syn-color-neutral-800);
    color: var(--syn-typography-color-text-inverted);
  }

  .badge--warning {
    background-color: var(--syn-color-warning-700);
    color: var(--syn-typography-color-text-inverted);
  }

  .badge--danger {
    background-color: var(--syn-color-error-600);
    color: var(--syn-typography-color-text-inverted);
  }

  /**
   * Special treatment: If the badge is empty, show it as a dot only
   */
  :host(:empty) .badge {
    height: var(--syn-spacing-x-small);
    padding: 0;
    width: var(--syn-spacing-x-small);
  }
`;
