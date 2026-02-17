import { css } from 'lit';

export default css`
  :host([size='small']) {
   --height: var(--syn-switch-height-small);
   --thumb-size: var(--syn-toggle-size-small);
   --width: var(--syn-switch-width-small);

    font-size: var(--syn-input-font-size-small);
  }

  :host([size='medium']) {
    --height: var(--syn-switch-height-medium);
    --thumb-size: var(--syn-toggle-size-medium);
    --width: var(--syn-switch-width-medium);

    font-size: var(--syn-input-font-size-medium);
  }

  :host([size='large']) {
    --height: var(--syn-switch-height-large);
    --thumb-size: var(--syn-toggle-size-large);
    --width: var(--syn-switch-width-large);

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
    background-color: var(--syn-interactive-emphasis-color);
    border-color: var(--syn-interactive-emphasis-color);
  }
  
  /* Hover */
  .switch:not(.switch--checked):not(.switch--disabled):hover .switch__control {
    background-color: var(--syn-input-icon-icon-clearable-color-hover);
    border-color: var(--syn-input-icon-icon-clearable-color-hover);
  }

  .switch:not(.switch--checked):not(.switch--disabled):hover .switch__control:hover .switch__thumb {
    background-color: var(--syn-color-neutral-0);
  }

  /* Checked + hover */
  .switch.switch--checked:not(.switch--disabled):hover .switch__control {
    background-color: var(--syn-interactive-emphasis-color-hover);
    border-color: var(--syn-interactive-emphasis-color-hover);
  }

  .switch.switch--checked:not(.switch--disabled):hover .switch__control:hover .switch__thumb {
    background-color: var(--syn-color-neutral-0);
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
    background-color: var(--syn-interactive-emphasis-color);
    border-color: var(--syn-interactive-emphasis-color);
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
    background-color: var(--syn-input-border-color-focus-error);
    border-color: var(--syn-input-border-color-focus-error);
  }

  :host([data-user-invalid]) .switch:not(.switch--checked):not(.switch--disabled):hover .switch__control {
    background-color: var(--syn-input-border-color-hover);
    border-color: var(--syn-input-border-color-hover);
  }

  /**
   * #1178: Readonly state
   */
  .switch.switch--readonly {
    cursor: default;
  }

  .switch.switch--readonly .switch__label {
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -webkit-user-select: auto;
    user-select: auto;
  }

  .switch.switch--readonly .switch__control {
    background: var(--syn-readonly-background-color);
    border-color: var(--syn-readonly-background-color);
    color: var(--syn-readonly-indicator-color);
    cursor: default;
  }

  .switch.switch--readonly:hover .switch__control {
    background: var(--syn-readonly-background-color-hover) !important;
    border-color: var(--syn-readonly-background-color-hover) !important;
  }

  .switch.switch--readonly .switch__input:focus ~ .switch__control {
    outline: var(--syn-focus-ring);
    outline-offset: var(--syn-focus-ring-offset);
  }
`;
