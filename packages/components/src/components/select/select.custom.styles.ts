import { css } from 'lit';

export default css`
  /* Clearable */
  .select__clear {
    color: var(--syn-input-icon-icon-clearable-color);
  }

  .select--medium .select__clear {
    margin-inline-start: var(--syn-spacing-small);
  }

  .select__clear:hover {
    color: red !important;
  }

  /* Expand icon */
  .select__expand-icon {
    color: var(--syn-color-neutral-950);
    font-size: var(--syn-spacing-large);
    margin-inline-start: var(--syn-spacing-small);
  }

  /* Prefix */

  /* Small */
  .select--small .select__prefix::slotted(*) {
    margin-inline-start: var(--syn-input-spacing-small);
  }

  .select--medium .select__prefix::slotted(*) {
    margin-inline-end: var(--syn-input-spacing-small);
    margin-inline-start: var(--syn-input-spacing-medium);
  }

  .select--large .select__prefix::slotted(*) {
    margin-inline-start: var(--syn-input-spacing-large);
  }

  .select__prefix {
    color: var(--syn-input-help-text-color);
  }
`;
