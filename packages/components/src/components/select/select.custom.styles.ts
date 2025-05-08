import { css } from 'lit';
import sharedOptionSize from '../option/option-size.styles.js';

export default css`
  /**
   * Invalid user data
   */
  :host([data-user-invalid]) .select__combobox {
    border-color: var(--syn-input-border-color-focus-error);
  }

  :host([data-user-invalid]) .select--standard:not(.select--disabled).select--open .select__combobox,
  :host([data-user-invalid]) .select--standard:not(.select--disabled).select--focused .select__combobox {
    border-color: var(--syn-input-border-color-focus-error);
    box-shadow: 0 0 0 var(--syn-focus-ring-width) var(--syn-input-focus-ring-error);
  }

  /* Clear button */
  .select__clear {
    color: var(--syn-input-icon-icon-clearable-color);
    font-size: var(--syn-spacing-large);
  }

  .select--small .select__clear {
    font-size: var(--syn-spacing-medium);
  }

  .select--large .select__clear {
    font-size: var(--syn-spacing-x-large);
  }

  .select--medium .select__clear {
    margin-inline-start: var(--syn-spacing-small);
  }

  /* Expand icon */
  .select__expand-icon {
    color: var(--syn-color-neutral-950);
    margin-inline-start: var(--syn-spacing-small);
  }

  .select--small .select__expand-icon {
    font-size: var(--syn-spacing-medium);
  }

  .select--medium .select__expand-icon {
    font-size: var(--syn-spacing-large);
  }

  .select--large .select__expand-icon {
    font-size: var(--syn-spacing-x-large);
  }

  /* Change select border on hover */
  /* stylelint-disable-next-line no-descending-specificity */
  .select:not(.select--disabled):hover .select__combobox {
    border-color: var(--syn-input-color-hover);
  }

  /* Prefix and Suffix */

  /* Small */
  .select--small .select__prefix::slotted(*) {
    margin-inline-end: var(--syn-spacing-x-small);
  }

  .select--small .select__suffix::slotted(*) {
    margin-inline-start: var(--syn-spacing-x-small);
  }

  .select--small .select__suffix::slotted(syn-icon),
  .select--small .select__prefix::slotted(syn-icon) {
    font-size: var(--syn-font-size-medium);
  }

  /* Medium */
  .select--medium .select__prefix::slotted(*) {
    margin-inline-end: var(--syn-input-spacing-small);
  }

  .select--medium .select__suffix::slotted(*) {
    margin-inline-start: var(--syn-input-spacing-small);
  }

  .select--medium .select__suffix::slotted(syn-icon),
  .select--medium .select__prefix::slotted(syn-icon) {
    font-size: var(--syn-font-size-x-large);
  }

  /* Large */
  .select--large .select__prefix::slotted(*) {
    margin-inline-end: var(--syn-input-spacing-medium);
  }

  .select--large .select__suffix::slotted(*) {
    margin-inline-start: var(--syn-input-spacing-medium);
  }

  .select--large .select__suffix::slotted(syn-icon),
  .select--large .select__prefix::slotted(syn-icon) {
    font-size: var(--syn-font-size-2x-large);
  }


  .select__prefix,
  .select__suffix {
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
    border-radius: var(--syn-border-radius-none);
    box-shadow: var(--syn-shadow-medium);
  }

  /**
   * Make sure to hide the syn-divider for the first syn-optgroup
   * Note! ::slotted does currently not work with ::part, so we
   * opted for using a css variable here.
   */
  .select__listbox ::slotted(syn-optgroup:first-of-type) {
    --display-divider: none;
  }

  /**
   * #850: Allow to measure the size of the combobox.
   * This is needed so we can automatically size and truncate the tags in the <syn-select multiple> component.
   * Scoped to multiple to not break the single select per accident.
   */
  :host([multiple]) .select__tags {
    min-width: 100px;
    overflow: hidden;
  }

  :host([multiple]) .select__tags > div {
    display: contents;
  }

  :host([multiple]) .select__tags > div > syn-tag {
    max-width: var(--syn-select-tag-max-width);
  }

  :host([multiple]) .select__tags > div > syn-tag::part(content) {
    display: initial;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ${sharedOptionSize}
`;
