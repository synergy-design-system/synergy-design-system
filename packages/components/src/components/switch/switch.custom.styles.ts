import { css } from 'lit';

export default css`
  :host([size='small']) {
   --height: var(--syn-switch-height-small, calc(var(--syn-toggle-size-medium) + 2px));
   --thumb-size: var(--syn-toggle-size-small);
   --width: var(--syn-switch-width-small, calc((var(--height) * 2) - 6px));

    font-size: var(--syn-input-font-size-small);
  }

  :host([size='medium']) {
    --height: var(--syn-switch-height-medium, calc(var(--syn-toggle-size-medium) + 4px));
    --thumb-size: var(--syn-toggle-size-medium);
    --width: var(--syn-switch-width-medium, calc((var(--height) * 2) - 6px));

    font-size: var(--syn-input-font-size-medium);
  }

  :host([size='large']) {
    --height: var(--syn-switch-height-large, calc(var(--syn-toggle-size-large) + 4px));
    --thumb-size: var(--syn-toggle-size-large);
    --width: var(--syn-switch-width-large, calc((var(--height) * 2) - 6px));

    font-size: var(--syn-input-font-size-large);
  }

  /** #429: Use token for opacity */
  .switch--disabled { 
    opacity: var(--syn-input-disabled-opacity);
  }

  .switch.switch--small {
    padding: var(--syn-spacing-2x-small) 0;
  }

  .switch.switch--medium {
    padding: var(--syn-spacing-2x-small) 0;
  }

  .switch.switch--large {
    padding: var(--syn-spacing-3x-small) 0;
  }

  /* Hint: can be removed, if the padding stylings for sizes from above are removed */
  .form-control--has-help-text .switch {
    padding-bottom: 0;
  }

  .switch__control {
    background-color: var(--syn-input-icon-icon-clearable-color);
    border: solid var(--syn-border-width-medium) var(--syn-input-icon-icon-clearable-color);
  }

  .switch__control .switch__thumb {
    border: none;
  }

  /* Checked */
  .switch--checked .switch__control {
    background-color: var(--syn-interactive-emphasis-color, var(--syn-color-primary-600));
    border-color: var(--syn-interactive-emphasis-color, var(--syn-color-primary-600));
  }
  
  /*
   * #443: Add active styles
   * The checked and unchecked states have different active colors
   * Note the fallback is defined to match the hover color.
   * This is done to make sure no active state is shown at all if no active color is defined.
   * Still better than showing one for the unchecked state but not for the checked state.
   */
  .switch:not(.switch--checked):not(.switch--disabled):active .switch__control {
    background: var(--syn-input-icon-icon-clearable-color-active);
    border-color: var(--syn-input-icon-icon-clearable-color-active);
  }

  .switch.switch--checked:not(.switch--disabled):active .switch__control {
    background: var(--syn-interactive-emphasis-color-active);
    border-color: var(--syn-interactive-emphasis-color-active);
  }

  /* Hover */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover {
    background-color: var(--syn-input-icon-icon-clearable-color-hover);
    border-color: var(--syn-input-icon-icon-clearable-color-hover);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--syn-color-neutral-0);
  }

  /* Checked + hover */
  .switch.switch--checked:not(.switch--disabled) .switch__control:hover {
    background-color: var(--syn-interactive-emphasis-color-hover, var(--syn-color-primary-900));
    border-color: var(--syn-interactive-emphasis-color-hover, var(--syn-color-primary-900));
  }

  .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--syn-color-neutral-0);
  }

  /* Focus */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--syn-input-icon-icon-clearable-color);
    border-color: var(--syn-input-icon-icon-clearable-color);
    outline: var(--syn-focus-ring);
    outline-offset: var(--syn-focus-ring-offset);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--syn-color-neutral-0);
    outline: none;
  }

  /* Checked + focus */
  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--syn-interactive-emphasis-color, var(--syn-color-primary-600));
    border-color: var(--syn-interactive-emphasis-color, var(--syn-color-primary-600));
    outline: var(--syn-focus-ring);
    outline-offset: var(--syn-focus-ring-offset);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--syn-color-neutral-0);
    outline: none;
  }

  .switch__label {
    margin-inline-start: var(--syn-spacing-x-small);
  }
  
  :host([data-user-invalid]) .switch:not(.switch--checked):not(.switch--disabled) .switch__control {
    background-color: var(--syn-input-border-color-focus-error, var(--syn-color-error-700));
    border-color: var(--syn-input-border-color-focus-error, var(--syn-color-error-700));
  }

  :host([data-user-invalid]) .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover {
    background-color: var(--syn-input-border-color-hover, var(--syn-color-error-900));
    border-color: var(--syn-input-border-color-hover, var(--syn-color-error-900));
  }
  `;
