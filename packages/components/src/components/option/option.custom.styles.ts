import { css } from 'lit';

export default css`
  /**
   * Internal size adjustments.
   * Usually this will be changed via a parents select size higher in the dom tree
   */
  :host {
    --option-min-height: 48px;
    --option-padding: var(--syn-spacing-small) var(--syn-spacing-medium);
    --option-font-size: var(--syn-font-size-medium);
    --option-checkmark-size: var(--syn-spacing-large);
  }

  .option {
    font-size: var(--option-font-size);
    
    /* Height is dependent on line-height of .option__label, which does not fit completely to layout */
    min-height: var(--option-min-height);
    padding: var(--option-padding);
  }

  .option:not(.option--current) {
    color: var(--syn-color-neutral-950);
  }

  .option__label {
    line-height: var(--syn-line-height-normal);
  }

  .option__check {
    color: var(--syn-color-primary-600);
    font-size: var(--option-checkmark-size);
  }

  .option .option__check {
    padding-inline-end: var(--syn-spacing-small);
  }

  /* Invert the check mark when keyboard navigation is used */
  .option--current .option__check {
    color: var(--syn-color-neutral-0);
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
    font-size: var(--syn-spacing-large);
  }
`;
