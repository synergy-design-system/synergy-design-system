import { css } from 'lit';

export default css`
  /**
   * The syn-option is now able to adjust its height from a parent item
   * This is done by exposing multiple css variables to the outside:
   *
   * --option-min-height (defaults to 48px) The minimal height of an element
   * --option-padding (defaults to var(--syn-spacing-small) var(--syn-spacing-medium)) The padding to use
   * --option-font-size (defaults to var(--syn-font-size-medium)) The font size to use
   * --option-icon-size (defaults to var(--syn-spacing-large)) The size of the checkmark
   * 
   * See below for usage of these variables
   */
  .option {
    /*
     * #988: Brand2025 defines a small gap between options
     * and rounded corners. We achieve that using an border
     * that simulates the gap using the menu background color.
     */
    border: solid var(--syn-panel-background-color);

    /* Border Radius needs to be increased to cover the outline */
    border-radius: calc(var(--syn-focus-ring-border-radius) + var(--option-inset-border-vertical));
    border-width: var(--option-inset-border-horizontal) var(--option-inset-border-vertical);
    font-size: var(--option-font-size, var(--syn-font-size-medium));

    /* Height is dependent on line-height of .option__label, which does not fit completely to layout */
    min-height: var(--option-min-height, var(--syn-input-height-medium));
    padding: 0 calc(var(--option-padding) - var(--option-inset-border-vertical));
  }

  .option:not(.option--current) {
    color: var(--syn-option-color, var(--syn-typography-color-text));
  }

  .option--current,
  .option--current.option--hover:not(.option--disabled) {
    background-color: var(--syn-option-background-color-active, var(--syn-color-neutral-1000));
    color: var(--syn-option-color-active, var(--syn-typography-color-text-inverted));
  }

  .option--hover:not(.option--current):not(.option--disabled) {
    background-color: var(--syn-option-background-color-hover, var(--syn-color-neutral-1000));
    color: var(--syn-option-color-hover, var(--syn-typography-color-text-inverted));
  }

  /** #429: Use token for opacity */
  .option--disabled {
    opacity: var(--syn-input-disabled-opacity);
  }

  .option--current.option--disabled {
    background-color: var(--syn-option-background-color-hover, var(--syn-color-neutral-1000));
    color: var(--syn-option-color-hover, var(--syn-typography-color-text-inverted));
  }

  .option__label {
    line-height: var(--syn-line-height-normal);
  }

  .option__check {
    color: var(--syn-option-check-color, var(--syn-color-primary-600));
    font-size: var(--option-icon-size, var(--syn-spacing-large));
  }

  .option .option__check {
    padding-inline-end: var(--syn-spacing-small);
  }

  /* Invert the check mark when keyboard navigation is used */
  .option--current .option__check {
    color: var(--syn-option-check-color-active, var(--syn-color-neutral-0));
  }

  .option--hover:not(.option--current) .option__check {
    color: var(--syn-option-check-color-hover, var(--syn-color-neutral-0));
  }

  /* Use larger spacing between icons and content */
  .option__prefix::slotted(*) {
    margin-inline-end: var(--syn-spacing-small);
  }

  .option__suffix::slotted(*) {
    margin-inline-start: var(--syn-spacing-small);
  }

  /* Set correct icon size when someone uses syn-icon in the slots */
  .option__prefix::slotted(syn-icon),
  .option__suffix::slotted(syn-icon) {
    color: var(--syn-option-icon-color, var(--syn-typography-color-text));
    font-size: var(--option-icon-size, var(--syn-spacing-large));
  }

  .option--hover .option__prefix::slotted(syn-icon),
  .option--hover .option__suffix::slotted(syn-icon) {
    color: var(--syn-option-icon-color-hover, var(--syn-color-neutral-800));
  }

  .option--current .option__prefix::slotted(syn-icon),
  .option--current .option__suffix::slotted(syn-icon) {
    color: var(--syn-option-icon-color-active, var(--syn-color-neutral-800));
  }

  /* This is needed for the highlight styling of the options in syn-combobox */
  .option__label::slotted(.syn-highlight-style) {
    background-color: transparent;
    color: unset;
    font: var(--syn-body-medium-bold);
  }
`;
