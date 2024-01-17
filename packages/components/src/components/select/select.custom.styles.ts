import { css } from 'lit';

export default css`
  /* Clear button */
  .select__clear {
    color: var(--syn-input-icon-icon-clearable-color);
  }

  .select--medium .select__clear {
    margin-inline-start: var(--syn-spacing-small);
  }

  /* Expand icon */
  .select__expand-icon {
    color: var(--syn-color-neutral-950);
    font-size: var(--syn-spacing-large);
    margin-inline-start: var(--syn-spacing-small);
  }

  /* Change select border on hover */
  .select:not(.select--disabled):hover .select__combobox {
    border-color: var(--syn-input-color-hover);
  }

  /* Prefix */

  /* Small */
  .select--small .select__prefix::slotted(*) {
    margin-inline-end: var(--syn-spacing-x-small);
  }

  .select--medium .select__prefix::slotted(*) {
    margin-inline-end: var(--syn-input-spacing-small);
  }

  .select--large .select__prefix::slotted(*) {
    margin-inline-end: var(--syn-input-spacing-medium);
  }

  .select__prefix {
    color: var(--syn-input-help-text-color);
  }

  /* Multi Select */
  .select__tags {
    margin-inline-start: var(--syn-spacing-medium);
  }

  .select--small .select__tags {
    gap: var(--syn-spacing-2x-small);
  }

  .select--medium .select__tags {
    gap: var(--syn-spacing-x-small);
  }

  .select--large .select__tags {
    gap: var(--syn-spacing-small);
  }

  /* Listbox */
  .select__listbox {
    /* @todo: Should be --syn-border-radius-medium, which should be set to 0 */
    border-radius: 0;
    box-shadow: var(--syn-shadow-medium);
    padding-block: 0;
  }

  /*
   * Apply the "padding" between list box and input
   * We do this via relative positioned attributes,
   * as a transparent border or other tricks would
   * lead to an issue that the box-shadow would be drawn around them.
   */
  syn-popup[data-current-placement="bottom"] .select__listbox {
    top: var(--syn-spacing-x-small);
  }

  syn-popup[data-current-placement="top"] .select__listbox {
    bottom: var(--syn-spacing-x-small);
  }

  /* Default Select should not show a shadow when open, just when focused */
  .select--standard:not(.select--disabled).select--open .select__combobox {
    box-shadow: none;
  }
`;
