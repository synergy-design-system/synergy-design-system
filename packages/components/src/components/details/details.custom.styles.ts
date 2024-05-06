import { css } from 'lit';

export default css`
  .details {
    border-radius: var(--syn-border-radius-none);
    border-width: 0 0 var(--syn-border-width-small);
  }

  .details--disabled {
    opacity: var(--syn-opacity-50);
  }

  .details__summary-icon {
    color: var(--syn-color-neutral-950);
    font-size: var(--syn-font-size-x-large);
  }

  .details .details__summary {
    color: var(--syn-typography-color-text);
  }

  /**
   * Mark the details as open by adjusting its label
   */
  .details--open .details__summary {
    font-weight: var(--syn-font-weight-bold);
  }

  /**
   * As we are using top/down arrows for the details element,
   * we have to adjust the rotation of the icon when the details is open.
   */
  .details--open .details__summary-icon {
    rotate: -180deg;
  }

  /**
   * Adjust paddings according to the provided size attribute
   */
  .details--size-small .details__header {
    padding: var(--syn-spacing-medium-large) 0;
  }

  .details--size-small .details__content {
    padding: var(--syn-spacing-medium) 0 var(--syn-spacing-medium-large);
  }

  .details--size-small .details__summary {
    font: var(--syn-body-medium-regular);
  }

  .details--size-small .details__summary::slotted(syn-icon) {
    font-size: var(--syn-spacing-large);
    margin-right: var(--syn-spacing-small);
  }

  .details--size-medium .details__header {
    padding: var(--syn-spacing-large) 0;
  }

  .details--size-medium .details__content {
    padding: var(--syn-spacing-medium) 0 var(--syn-spacing-large);
  }

  .details--size-medium .details__summary {
    font: var(--syn-body-large-regular);
  }

  .details--size-medium .details__summary::slotted(syn-icon) {
    font-size: var(--syn-spacing-x-large);
    margin-right: var(--syn-spacing-x-small);
  }
`;
