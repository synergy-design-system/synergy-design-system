import { css } from 'lit';

export default css`
  .checkbox {
    /* #1083: This adds spacing around multi-line labels */
    padding: var(--syn-spacing-2x-small) 0;
  }

  .checkbox--small {
    padding: var(--syn-spacing-3x-small) 0;
  }

  .checkbox__control {
    border-radius: var(--syn-checkbox-border-radius, var(--syn-input-border-radius-small));

    /* #1083: This adds spacing around multi-line labels */
    margin: 0.1em 0;
  }

  :host([data-user-invalid]) .checkbox__control {
    background: var(--syn-input-border-color-focus-error);
    border-color: var(--syn-input-border-color-focus-error);
  }

  /**
   * #943: When invalid, use a transparent background if not checked or indeterminate
   */
  :host([data-user-invalid]:not([checked]):not([indeterminate])) .checkbox__control {
    background: transparent;
  }

  /** #429: Use token for opacity */
  .checkbox--disabled {
    opacity: var(--syn-input-disabled-opacity);
  }

  /**
   * Hover
   * Applies the hover state to the whole component
   */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled):hover .checkbox__control {
    background-color: var(--syn-input-background-color-hover);
    border-color: var(--syn-input-border-color-hover);
  }

  /**
   * Checked/indeterminate + hover
   * Applies the hover state to the whole component
   */
  .checkbox.checkbox--checked:not(.checkbox--disabled):hover .checkbox__control,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled):hover .checkbox__control {
    background-color: var(--syn-interactive-emphasis-color-hover, var(--syn-color-primary-900));
    border-color: var(--syn-interactive-emphasis-color-hover, var(--syn-color-primary-900));
  }

  /*
   * #443: Add active styles
   * The checked and unchecked states have different active colors
   * Note the fallback is defined to match the hover color.
   * This is done to make sure no active state is shown at all if no active color is defined.
   * Still better than showing one for the unchecked state but not for the checked state.
   */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled):active .checkbox__control {
    border-color: var(--syn-input-border-color-active);
  }

  /* Checked/indeterminate */
  .checkbox.checkbox--checked:not(.checkbox--disabled):active .checkbox__control,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled):active .checkbox__control {
    background: var(--syn-interactive-emphasis-color-active, var(--syn-color-primary-900));
    border-color: var(--syn-interactive-emphasis-color-active, var(--syn-color-primary-900));
  }

  .checkbox__label {
    align-self: center;
    line-height: var(--syn-line-height-normal);
    margin-inline-start: var(--syn-spacing-x-small);
  }
`;
