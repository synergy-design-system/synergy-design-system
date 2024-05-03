import { css } from 'lit';

export default css`
  :host {
    --border-color: var(--syn-color-neutral-300);
    --border-width: var(--syn-border-width-small);
    --border-radius: var(--syn-border-radius-medium);
  }

  .card {
    box-shadow: none;
  }

  /**
   * Header adjustments
   */
  .card__header {
    border: none;
    color: var(--syn-typography-color-text);
    font: var(--syn-heading-large);
    line-height: var(--syn-line-height-normal);
  }

  /**
   * Card body
   */
  .card__body,
  .card__body::slotted(*) {
    color: var(--syn-typography-color-text);
    font: var(--syn-body-medium-regular);
  }

  .card__body::slotted(h1),
  .card__body::slotted(h2),
  .card__body::slotted(h3),
  .card__body::slotted(h4),
  .card__body::slotted(h5),
  .card__body::slotted(h6) {
    font: var(--syn-body-medium-bold) !important;
    margin: 0 0 var(--syn-spacing-x-small) !important;
  }

  /**
   * Card Footer
   */
  .card--has-footer .card__footer {
    border-top: none;
    padding: var(--syn-spacing-x-small) var(--syn-spacing-large) var(--syn-spacing-large);
  }

  /**
   * Cards that are nested do not receive a border radius
   */
  .card--nested {
    border-radius: var(--syn-border-radius-none);
  }
`;
