import { css } from 'lit';

export default css`
  .details {
    border-color: var(--syn-color-neutral-400);
    border-radius: var(--syn-border-radius-none);
    border-width: 0 0 var(--syn-border-width-small);
  }

  .details--disabled {
    opacity: var(--syn-opacity-50);
  }

  .details__summary-icon {
    align-self: flex-start;
    color: var(--syn-color-neutral-950);
    
    /**
     * As we are using an alignment of "start" to make sure the arrow
     * is starting at the right position, we have to adjust the top
     * starting position of the summary icon.
     */
    padding-top: 2px;
  }

  .details .details__summary {
    color: var(--syn-typography-color-text);
  }

  .details__header {
    gap: var(--syn-spacing-medium);
  }

  /**
   * As we are using top/down arrows for the details element,
   * we have to adjust the rotation of the icon when the details is open.
   */
  .details--open .details__summary-icon {
    rotate: -180deg;
  }

  /**
   * Adjustments for small variant
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

  .details--size-small .details__summary-icon {
    font-size: var(--syn-font-size-large);
  }

  /**
   * Adjustment for medium variant
   */
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

  .details--size-medium .details__summary-icon {
    font-size: var(--syn-spacing-x-large);
  }

  /**
   * Mark the details as open by adjusting its label
   */
  .details--open .details__summary {
    font-weight: var(--syn-font-weight-bold);
  }
`;
