import { css } from 'lit';

export default css`
  .button {
    font-weight: var(--syn-font-weight-bold);
  }

  .button:focus-visible {
    outline: var(--syn-focus-ring-color) solid var(--syn-focus-ring-width);
    outline-offset: var(--syn-focus-ring-width);
  }

  /** #429: Use token for opacity */
  .button--disabled {
    opacity: var(--syn-input-disabled-opacity);
  }

  /*
   * Adjustments for button label paddings
   * @see https://github.com/synergy-design-system/synergy-design-system/issues/243
   */
  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--syn-spacing-2x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--syn-spacing-2x-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--syn-spacing-x-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--syn-spacing-x-small);
  }

  /**
   * Icon-only buttons
   */
  .button--small .button__label.button__icon-only {
    padding: 0 calc(var(--syn-spacing-x-small) + var(--syn-spacing-4x-small));
  }

  .button--small .button__label::slotted(syn-icon) {
    font-size: var(--syn-font-size-medium);
    vertical-align: -3px;
  }

  .button--medium .button__label.button__icon-only {
    padding: 0 calc(var(--syn-spacing-small) - var(--syn-spacing-4x-small));
  }

  .button--medium .button__label::slotted(syn-icon) {
    font-size: var(--syn-font-size-x-large);
    vertical-align: -6px;
  }

  .button--large .button__label.button__icon-only {
    padding: 0 calc(var(--syn-spacing-medium) - var(--syn-spacing-4x-small));
  }

  .button--large .button__label::slotted(syn-icon) {
    font-size: var(--syn-font-size-2x-large);
    vertical-align: -8px;
  }

  /**
   * Size modifiers
   */
  .button--small {
    border-radius: var(--syn-button-border-radius-small, var(--syn-input-border-radius-small));
  }

  .button--medium {
    border-radius: var(--syn-button-border-radius-medium, var(--syn-input-border-radius-medium));
  }

  .button--large {
    border-radius: var(--syn-button-border-radius-large, var(--syn-input-border-radius-large));
  }

  /*
   * Standard buttons
   */
  .button--filled.button--primary {
    background: var(--syn-button-color, var(--syn-color-primary-600));
    border-color: var(--syn-button-color, var(--syn-color-primary-600));
    color: var(--syn-button-filled-color-text, var(--syn-color-neutral-0));
  }

  .button--filled.button--primary.button--disabled {
    background-color: var(--syn-color-neutral-600);
    border-color: var(--syn-color-neutral-600);
    color: var(--syn-typography-color-text-inverted);
  }

  .button--filled.button--primary:hover:not(.button--disabled) {
    background-color: var(--syn-button-color-hover, var(--syn-color-primary-900));
    border-color: var(--syn-button-color-hover, var(--syn-color-primary-900));
    color: var(--syn-button-filled-color-text-hover, var(--syn-color-neutral-0));
  }

  .button--filled.button--primary:active:not(.button--disabled) {
    background-color: var(--syn-button-color-active, var(--syn-color-primary-900));
    border-color: var(--syn-button-color-active, var(--syn-color-primary-900));
    color: var(--syn-button-filled-color-text-active, var(--syn-color-neutral-0));
  }

  /*
   * Outline buttons
   */
  .button--outline {
    /** #901: Use token for border width */
    border-width: var(--syn-input-border-width);
  }

  .button--outline.button--primary {
    border-color: var(--syn-button-color, var(--syn-color-primary-600));
    color: var(--syn-button-outline-color-text, var(--syn-color-primary-600));
  }

  .button--outline.button--primary.button--disabled {
    background: none;
    border-color: var(--syn-color-neutral-600);
    color: var(--syn-color-neutral-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--syn-button-outline-color-hover, var(--syn-color-primary-900));
    border-color: var(--syn-button-outline-color-hover, var(--syn-color-primary-900));
    color: var(--syn-button-outline-color-text-hover, var(--syn-color-neutral-0));
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    background-color: var(--syn-button-outline-color-active, var(--syn-color-primary-950));
    border-color: var(--syn-button-outline-color-active, var(--syn-color-primary-950));
    color: var(--syn-button-outline-color-text-active, var(--syn-color-neutral-0));
  }

  /*
   * Text buttons
   */
  .button--text {
    color: var(--syn-button-color, var(--syn-color-primary-600));
  }

  .button--text:hover:not(.button--disabled) {
    color: var(--syn-button-color-hover, var(--syn-color-primary-900));
  }

  .button--text:focus-visible:not(.button--disabled) {
    color: var(--syn-button-color, var(--syn-color-primary-500));
  }

  .button--text.button--primary:active:not(.button--disabled) {
    background: inherit;
    border-color: transparent;
    color: var(--syn-button-color-active, var(--syn-color-primary-950));
  }

  .button--text.button--primary.button--disabled {
    color: var(--syn-color-neutral-600);
  }

  /**
   * Button spacing
   */
  .button.button--small.button--has-label.button--has-prefix {
    padding-inline-start: var(--syn-spacing-small);
  }

  .button.button--small.button--has-label.button--has-suffix {
    padding-inline-end: var(--syn-spacing-small);
  }

  .button.button--small.button--has-prefix .button__prefix, 
  .button.button--small.button--has-suffix .button__suffix {
    font-size: var(--syn-spacing-medium);
  }

  .button.button--medium.button--has-label.button--has-prefix {
    padding-inline-start: var(--syn-spacing-medium);
  } 

  .button.button--medium.button--has-label.button--has-suffix {
    padding-inline-end: var(--syn-spacing-medium);
  }

  .button.button--medium.button--has-prefix .button__prefix, 
  .button.button--medium.button--has-suffix .button__suffix {
    font-size: var(--syn-spacing-large);
  }

  .button.button--large.button--has-label.button--has-prefix {
    padding-inline-start: var(--syn-spacing-large);
  }

  .button.button--large.button--has-label.button--has-prefix .button__label {
    padding-inline-start: var(--syn-spacing-small);
  }

  .button.button--large.button--has-label.button--has-suffix {
    padding-inline-end: var(--syn-spacing-large);
  }

  .button.button--large.button--has-label.button--has-suffix .button__label {
    padding-inline-end: var(--syn-spacing-small);
  }

  .button.button--large.button--has-prefix .button__prefix, 
  .button.button--large.button--has-suffix .button__suffix {
    font-size: var(--syn-font-size-2x-large);
  }

  /*
   * Caret modifier
   */
  .button--caret.button--small .button__caret{
    font-size: var(--syn-font-size-medium);
  }

  .button--caret.button--medium .button__caret{
    font-size: var(--syn-font-size-x-large);
  }

  .button--caret.button--large .button__caret{
    font-size: var(--syn-font-size-2x-large);
  }
`;
