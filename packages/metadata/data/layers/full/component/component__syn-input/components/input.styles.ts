import { css } from 'lit';

export default css`
  /* stylelint-disable no-descending-specificity, property-no-vendor-prefix */
  :host {
    --syn-input-autofill-shadow: 0 0 0 var(--syn-input-height-large) var(--syn-input-background-color-hover) inset;
    --syn-input-autofill-readonly-shadow: 0 0 0 var(--syn-input-height-large) var(--syn-input-readonly-background-color) inset;
    --syn-input-autofill-text-fill-color: var(--syn-color-primary-500);
    --syn-input-autofill-caret-color: var(--syn-input-color);

    display: block;
  }

  .input {
    --input-border-radius: var(--syn-input-border-radius-medium);
    --input-clear-padding-inline-end: var(--syn-spacing-medium);
    --input-clear-padding-inline-end-with-suffix: var(--syn-spacing-small);
    --input-clear-padding-inline-start: var(--syn-spacing-small);
    --input-control-height: calc(var(--syn-input-height-medium) - var(--syn-input-border-width) * 2);
    --input-control-padding: var(--syn-spacing-x-small) var(--syn-input-spacing-medium);
    --input-font-size: var(--syn-input-font-size-medium);
    --input-height: var(--syn-input-height-medium);
    --input-icon-size: var(--syn-font-size-x-large);
    --input-number-divider-height: var(--syn-font-size-x-large);
    --input-number-divider-margin: 0 var(--syn-spacing-2x-small);
    --input-number-stepper-margin-inline-start: 0;
    --input-number-stepper-margin-inline-end: var(--syn-spacing-2x-small);
    --input-password-toggle-padding-inline-start: calc(var(--syn-spacing-2x-small) + var(--syn-spacing-3x-small));
    --input-prefix-margin-inline: var(--syn-input-spacing-medium) var(--syn-spacing-small);
    --input-suffix-margin-inline: var(--syn-spacing-small) var(--syn-input-spacing-medium);

    align-items: stretch;
    border-radius: var(--input-border-radius);
    cursor: text;
    display: inline-flex;
    flex: 1 1 auto;
    font-family: var(--syn-input-font-family);
    font-size: var(--input-font-size);
    font-weight: var(--syn-input-font-weight);
    height: var(--input-height);
    justify-content: start;
    letter-spacing: var(--syn-input-letter-spacing);
    overflow: hidden;
    position: relative;
    transition:
      var(--syn-transition-fast) color,
      var(--syn-transition-fast) border,
      var(--syn-transition-fast) box-shadow,
      var(--syn-transition-fast) background-color;
    vertical-align: middle;
    width: 100%;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--syn-input-background-color);
    border: solid var(--syn-input-border-width) var(--syn-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--syn-input-background-color-hover);
    border-color: var(--syn-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--syn-input-background-color-focus);
    border-color: var(--syn-input-border-color-focus);
    box-shadow: 0 0 0 var(--syn-focus-ring-width) var(--syn-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--syn-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--syn-input-background-color-disabled);
    border-color: var(--syn-input-border-color-disabled);
    cursor: not-allowed;

    /** #429: Use token for opacity */
    opacity: var(--syn-input-disabled-opacity);
  }

  .input--standard.input--disabled .input__control {
    color: var(--syn-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--syn-input-placeholder-color-disabled);
  }

  /* Readonly inputs */
  .input--readonly {
    background-color: var(--syn-input-readonly-background-color);
    border: none;
    color: var(--syn-input-color);
  }

  .input--readonly:hover:not(.input--disabled) {
    background-color: var(--syn-input-readonly-background-color-hover);
  }

  .input--readonly.input--focused:not(.input--disabled) {
    background-color: var(--syn-input-readonly-background-color-focus);
    outline: var(--syn-focus-ring);
    outline-offset: var(--syn-focus-ring-offset);
  }

  .input--readonly.input--disabled {
    background-color: var(--syn-input-readonly-background-color-disabled);
    cursor: not-allowed;
    opacity: var(--syn-input-disabled-opacity);
  }

  .input__control {
    -webkit-appearance: none;
    background: inherit;
    border: none;
    box-shadow: none;
    color: var(--syn-input-color);
    cursor: inherit;
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    height: var(--input-control-height);
    margin: 0;
    min-width: 0;
    padding: var(--input-control-padding);

    /* Fixes overflowing of the syn-input in flex and grid containers with fix width (https://github.com/synergy-design-system/synergy-design-system/issues/761) */
    width: 100%;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  /* stylelint-disable-next-line plugin/no-unsupported-browser-features */
  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: var(--syn-input-autofill-shadow) !important;
    caret-color: var(--syn-input-autofill-caret-color);
    -webkit-text-fill-color: var(--syn-input-autofill-text-fill-color);
  }

  /* stylelint-disable-next-line plugin/no-unsupported-browser-features */
  .input--readonly .input__control:-webkit-autofill,
  .input--readonly .input__control:-webkit-autofill:hover,
  .input--readonly .input__control:-webkit-autofill:focus,
  .input--readonly .input__control:-webkit-autofill:active {
    box-shadow: var(--syn-input-autofill-readonly-shadow) !important;
  }

  .input__control::placeholder {
    color: var(--syn-input-placeholder-color);
    -webkit-user-select: none;
    user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--syn-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    align-items: center;
    cursor: default;
    display: inline-flex;
    flex: 0 0 auto;
  }

  .input__prefix ::slotted(syn-icon),
  .input__suffix ::slotted(syn-icon) {
    color: var(--syn-input-icon-color);
    font-size: var(--input-icon-size);
  }

  .input__prefix ::slotted(*),
  .input__suffix ::slotted(*) {
    color: var(--syn-input-icon-color);
  }

  .input__prefix ::slotted(*) {
    margin-inline: var(--input-prefix-margin-inline);
  }

  .input__suffix ::slotted(*) {
    margin-inline: var(--input-suffix-margin-inline);
  }

  /*
   * Size modifiers
   */
  .input--small {
    --input-border-radius: var(--syn-input-border-radius-small);
    --input-clear-padding-inline-end: var(--syn-spacing-small);
    --input-clear-padding-inline-end-with-suffix: var(--syn-spacing-x-small);
    --input-clear-padding-inline-start: var(--syn-spacing-x-small);
    --input-control-height: calc(var(--syn-input-height-small) - var(--syn-input-border-width) * 2);
    --input-control-padding: var(--syn-spacing-3x-small) var(--syn-input-spacing-small);
    --input-font-size: var(--syn-input-font-size-small);
    --input-height: var(--syn-input-height-small);
    --input-icon-size: var(--syn-font-size-medium);
    --input-number-divider-height: var(--syn-font-size-medium);
    --input-number-divider-margin: 0;
    --input-number-stepper-margin-inline-start: var(--syn-spacing-2x-small);
    --input-number-stepper-margin-inline-end: 0;
    --input-password-toggle-padding-inline-start: var(--syn-spacing-2x-small);
    --input-prefix-margin-inline: var(--syn-input-spacing-small) var(--syn-spacing-x-small);
    --input-suffix-margin-inline: var(--syn-spacing-x-small) var(--syn-input-spacing-small);
  }

  .input--large {
    --input-border-radius: var(--syn-input-border-radius-large);
    --input-clear-padding-inline-end: var(--syn-spacing-large);
    --input-clear-padding-inline-end-with-suffix: var(--syn-spacing-medium);
    --input-clear-padding-inline-start: var(--syn-spacing-medium);
    --input-control-height: calc(var(--syn-input-height-large) - var(--syn-input-border-width) * 2);
    --input-control-padding: var(--syn-spacing-small) var(--syn-input-spacing-large);
    --input-font-size: var(--syn-input-font-size-large);
    --input-height: var(--syn-input-height-large);
    --input-icon-size: var(--syn-font-size-2x-large);
    --input-number-divider-height: var(--syn-font-size-2x-large);
    --input-number-divider-margin: 0 var(--syn-spacing-x-small);
    --input-number-stepper-margin-inline-end: var(--syn-spacing-x-small);
    --input-password-toggle-padding-inline-start: var(--syn-spacing-x-small);
    --input-prefix-margin-inline: var(--syn-input-spacing-large) var(--syn-spacing-medium);
    --input-suffix-margin-inline: var(--syn-spacing-medium) var(--syn-input-spacing-large);
  }

  /*
   * Clearable + Password Toggle
   */
  .input__clear,
  .input__password-toggle {
    align-items: center;
    background: none;
    border: none;
    color: var(--syn-input-icon-color);
    cursor: pointer;
    display: inline-flex;
    font-size: var(--input-icon-size);
    justify-content: center;
    padding-inline: var(--input-clear-padding-inline-start) var(--input-clear-padding-inline-end);
    transition: var(--syn-transition-fast) color;
    width: auto;
  }

  .input__clear {
    color: var(--syn-input-icon-icon-clearable-color);
  }

  .input__clear + .input__suffix ::slotted(*),
  .input__password-toggle + .input__suffix ::slotted(*) {
    margin-inline-start: 0;
  }

  .input__clear + .input__password-toggle {
    padding-left: var(--input-password-toggle-padding-inline-start);
  }

  /* stylelint-disable-next-line plugin/no-unsupported-browser-features */
  .input--small .input__clear:has(+ .input__password-toggle) {
    padding-right: var(--input-password-toggle-padding-inline-start);
  }

  /* stylelint-disable-next-line plugin/no-unsupported-browser-features */
  .input--medium .input__clear:has(+ .input__password-toggle) {
    padding-right: var(--input-password-toggle-padding-inline-start);
  }

  /* stylelint-disable-next-line plugin/no-unsupported-browser-features */
  .input--large .input__clear:has(+ .input__password-toggle) {
    padding-right: var(--input-password-toggle-padding-inline-start);
  }

  /* stylelint-disable-next-line plugin/no-unsupported-browser-features */
  .form-control--has-suffix .input__clear:has(+ .input__suffix),
  .form-control--has-suffix .input__password-toggle:has(+ .input__suffix) {
    padding-right: var(--input-clear-padding-inline-end-with-suffix);
  }

  .form-control--has-prefix .input__control {
    padding-left: 0;
  }

  /* stylelint-disable-next-line plugin/no-unsupported-browser-features */
  .form-control--has-suffix .input__control,
  .input:has(.input__clear) .input__control,
  .input:has(.input__password-toggle) .input__control {
    padding-right: 0;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--syn-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  /**
   * Min-width size adjusted for each size so 2 full digits are shown for type number.
   */
  :host([size='small'][type='number']:not([no-spin-buttons])) {
    min-width: calc(var(--syn-input-font-size-small) * 8.3);
  }

  :host([size='medium'][type='number']:not([no-spin-buttons])) {
    min-width: calc(var(--syn-input-font-size-medium) * 9.4);
  }

  :host([size='large'][type='number']:not([no-spin-buttons])) {
    min-width: calc(var(--syn-input-font-size-large) * 10);
  }

  :host([type='number']) .input--large:not(.input--no-spin-buttons) .input__clear,
  :host([type='number']) .input--large:not(.input--no-spin-buttons) .input__password-toggle {
    padding-right: var(--syn-spacing-medium);
  }

  :host([data-user-invalid]) .input--standard {
    border-color: var(--syn-input-border-color-focus-error);
  }

  :host([data-user-invalid]) .input--standard.input--focused:not(.input--disabled) {
    border-color: var(--syn-input-border-color-focus-error);
    box-shadow: 0 0 0 var(--syn-focus-ring-width) var(--syn-input-focus-ring-error);
  }

  .input--standard.input--disabled .input__suffix,
  .input--standard.input--disabled .input__prefix {
    cursor: not-allowed;
  }

  /** Number stepper */
  .input__number-stepper {
    align-items: center;
    display: flex;
    margin-inline: var(--input-number-stepper-margin-inline-start) var(--input-number-stepper-margin-inline-end);
  }

  /** Number stepper buttons */
  .input__number-stepper-button {
    align-items: center;
    background: none;
    border: none;
    color: var(--syn-interactive-emphasis-color);
    cursor: pointer;
    display: flex;
    font-size: var(--input-icon-size);
    padding: var(--syn-spacing-x-small);
    transition: var(--syn-transition-x-fast) color;
  }

  .input__number-stepper-button:hover:not([disabled]) {
    color: var(--syn-interactive-emphasis-color-hover);
  }

  .input__number-stepper-button:active:not([disabled]) {
    color: var(--syn-interactive-emphasis-color-active);
  }

  .input__number-stepper-button[disabled] {
    color: var(--syn-color-neutral-400);
    cursor: not-allowed;
    opacity: var(--syn-input-disabled-opacity);
  }

  /** Number stepper divider */
  .input__number-divider {
    height: var(--input-number-divider-height);
    margin: var(--input-number-divider-margin);
  }
`;
