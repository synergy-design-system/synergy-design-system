import { css } from 'lit';

export default css`
  .details {
    border-radius: var(--syn-border-radius-none);
    border-width: 0 0 var(--syn-border-width-small);
    padding: var(--syn-spacing-large) 0;
  }

  .details--disabled {
    opacity: var(--syn-opacity-50);
  }

  .details__header {
    padding: 0;
  }

  .details__content {
    padding: var(--syn-spacing-medium) 0 0;
  }

  .details__summary-icon {
    color: var(--syn-color-neutral-950);
    font-size: var(--syn-font-size-x-large);
  }

  /**
   * Mark the details as open by adjusting its label
   */
  .details .details__summary {
    color: var(--syn-typography-color-text);
    font: var(--syn-body-medium);
  }

  .details--open .details__summary {
    font: var(--syn-body-medium-bold);
  }

  /**
   * As we are using top/down arrows for the details element,
   * we have to adjust the rotation of the icon when the details is open.
   */
  .details--open .details__summary-icon {
    rotate: -180deg;
  }
`;
