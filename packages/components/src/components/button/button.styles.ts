import { css } from 'lit';

export default css`
  :host {
    cursor: pointer;
    display: inline-block;
    position: relative;
    width: auto;
  }

  .button {
    /* Icon size tokens */
    --button-small-icon-size: var(--syn-font-size-medium);
    --button-medium-icon-size: var(--syn-font-size-x-large);
    --button-large-icon-size: var(--syn-font-size-2x-large);

    /* Icon alignment tokens */
    --button-icon-offset-small: -3px;
    --button-icon-offset-medium: -6px;
    --button-icon-offset-large: -8px;

    /* Default (medium) spacing tokens */
    --button-icon-only-padding: 0 calc(var(--syn-spacing-small) - var(--syn-spacing-4x-small));
    --button-label-padding-inline-start: var(--syn-spacing-medium);
    --button-label-padding-inline-end: var(--syn-spacing-medium);
    --button-label-padding-inline-start-with-prefix: var(--syn-spacing-x-small);
    --button-label-padding-inline-end-with-suffix: var(--syn-spacing-x-small);
    --button-prefix-spacing: var(--syn-spacing-small);
    --button-suffix-spacing: var(--syn-spacing-small);
    --button-affix-size: var(--button-medium-icon-size);
    --button-labeled-prefix-spacing: var(--syn-spacing-medium);
    --button-labeled-suffix-spacing: var(--syn-spacing-small);

    align-items: stretch;
    border-style: solid;
    border-width: var(--syn-input-border-width);
    cursor: inherit;
    display: inline-flex;
    font-family: var(--syn-input-font-family);
    font-weight: var(--syn-font-weight-bold);
    height: auto;
    justify-content: center;
    padding: 0;
    text-decoration: none;
    transition:
      var(--syn-transition-x-fast) background-color,
      var(--syn-transition-x-fast) color,
      var(--syn-transition-x-fast) border,
      var(--syn-transition-x-fast) box-shadow;
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -webkit-user-select: none;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
    width: 100%;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--syn-focus-ring-color) solid var(--syn-focus-ring-width);
    outline-offset: var(--syn-focus-ring-width);
  }

  .button--disabled {
    cursor: not-allowed;
    opacity: var(--syn-input-disabled-opacity); /* #429: Use token for opacity */
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix,
  .button__caret {
    font-size: var(--button-affix-size);
  }

  .button__prefix,
  .button__suffix {
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  /**
   * Icon-only buttons
   */
  .button__label.button__icon-only {
    padding: var(--button-icon-only-padding);
  }

  .button__label::slotted(syn-icon) {
    font-size: var(--button-medium-icon-size);
    vertical-align: var(--button-icon-offset-medium);
  }

  /*
   * Standard buttons
   */

  /* Primary */
  .button--filled.button--primary {
    background: var(--syn-button-color);
    border-color: var(--syn-button-color);
    color: var(--syn-button-filled-color-text);
  }

  .button--filled.button--primary.button--disabled {
    background: var(--syn-color-neutral-600);
    border-color: var(--syn-color-neutral-600);
    color: var(--syn-typography-color-text-inverted);
  }

  .button--filled.button--primary:hover:not(.button--disabled) {
    background: var(--syn-button-color-hover);
    border-color: var(--syn-button-color-hover);
    color: var(--syn-button-filled-color-text-hover);
  }

  .button--filled.button--primary:active:not(.button--disabled) {
    background: var(--syn-button-color-active);
    border-color: var(--syn-button-color-active);
    color: var(--syn-button-filled-color-text-active);
  }

  /*
   * Outline buttons
   */
  .button--outline {
    background: none;
    border: var(--syn-input-border-width) solid; /* #901: Use token for border width */
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--syn-button-color);
    color: var(--syn-button-outline-color-text);
  }

  .button--outline.button--primary.button--disabled {
    background: none;
    border-color: var(--syn-color-neutral-600);
    color: var(--syn-color-neutral-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background: var(--syn-button-outline-color-hover);
    border-color: var(--syn-button-outline-color-hover);
    color: var(--syn-button-outline-color-text-hover);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    background: var(--syn-button-outline-color-active);
    border-color: var(--syn-button-outline-color-active);
    color: var(--syn-button-outline-color-text-active);
  }

  /*
   * Text buttons
   */

  .button--text {
    background: transparent;
    border-color: transparent;
    color: var(--syn-button-text-color-text);
  }

  .button--text:hover:not(.button--disabled) {
    color: var(--syn-button-text-color-text-hover);
  }

  .button--text:focus-visible:not(.button--disabled) {
    color: var(--syn-button-color);
  }

  .button--text.button--primary:active:not(.button--disabled) {
    color: var(--syn-button-text-color-text-active);
  }

  .button--text.button--primary.button--disabled {
    color: var(--syn-color-neutral-600);
  }

  /*
   * Size modifiers
   */

  .button--small {
    --button-icon-only-padding: 0 calc(var(--syn-spacing-x-small) + var(--syn-spacing-4x-small));
    --button-label-padding-inline-start: var(--syn-spacing-small);
    --button-label-padding-inline-end: var(--syn-spacing-small);
    --button-label-padding-inline-start-with-prefix: var(--syn-spacing-2x-small);
    --button-label-padding-inline-end-with-suffix: var(--syn-spacing-2x-small);
    --button-prefix-spacing: var(--syn-spacing-x-small);
    --button-suffix-spacing: var(--syn-spacing-x-small);
    --button-affix-size: var(--button-small-icon-size);
    --button-labeled-prefix-spacing: var(--syn-spacing-small);
    --button-labeled-suffix-spacing: var(--syn-spacing-small);
    
    border-radius: var(--syn-button-border-radius-small);
    font-size: var(--syn-button-font-size-small);
    line-height: calc(var(--syn-input-height-small) - var(--syn-input-border-width) * 2);
    min-height: var(--syn-input-height-small);
  }

  .button--small .button__label::slotted(syn-icon) {
    font-size: var(--button-small-icon-size);
    vertical-align: var(--button-icon-offset-small);
  }

  .button--medium {
    border-radius: var(--syn-button-border-radius-medium);
    font-size: var(--syn-button-font-size-medium);
    line-height: calc(var(--syn-input-height-medium) - var(--syn-input-border-width) * 2);
    min-height: var(--syn-input-height-medium);
  }

  .button--large {
    --button-icon-only-padding: 0 calc(var(--syn-spacing-medium) - var(--syn-spacing-4x-small));
    --button-label-padding-inline-start: var(--syn-spacing-large);
    --button-label-padding-inline-end: var(--syn-spacing-large);
    --button-label-padding-inline-start-with-prefix: var(--syn-spacing-small);
    --button-label-padding-inline-end-with-suffix: var(--syn-spacing-small);
    --button-affix-size: var(--button-large-icon-size);
    --button-labeled-prefix-spacing: var(--syn-spacing-large);
    --button-labeled-suffix-spacing: var(--syn-spacing-large);
    
    border-radius: var(--syn-button-border-radius-large);
    font-size: var(--syn-button-font-size-large);
    line-height: calc(var(--syn-input-height-large) - var(--syn-input-border-width) * 2);
    min-height: var(--syn-input-height-large);
  }

  .button--large .button__label::slotted(syn-icon) {
    font-size: var(--button-large-icon-size);
    vertical-align: var(--button-icon-offset-large);
  }

  /*
   * Caret modifier
   */
  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */
  .button--loading {
    cursor: wait;
    position: relative;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading syn-spinner {
    --indicator-color: currentColor;

    font-size: 1em;
    height: 1em;
    left: calc(50% - 0.5em);
    position: absolute;
    top: calc(50% - 0.5em);
    width: 1em;
  }

  /*
   * Badges
   */
  .button ::slotted(syn-badge) {
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    translate: 50% -50%;
  }

  .button--rtl ::slotted(syn-badge) {
    left: 0;
    right: auto;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */
  .button--has-label .button__label {
    padding-block: 0;
    padding-inline: var(--button-label-padding-inline-start) var(--button-label-padding-inline-end);
  }

  .button--has-label .button__label.button__icon-only {
    padding: var(--button-icon-only-padding);
  }

  /*
   * Adjustments for button label paddings
   * @see https://github.com/synergy-design-system/synergy-design-system/issues/243
   */
  .button--has-prefix .button__label {
    padding-inline-start: var(--button-label-padding-inline-start-with-prefix);
  }

  .button--has-suffix .button__label,
  .button--caret .button__label {
    padding-inline-end: var(--button-label-padding-inline-end-with-suffix);
  }

  /* Basic prefix/suffix spacing */
  .button--has-prefix {
    padding-inline-start: var(--button-prefix-spacing);
  }

  .button--has-suffix,
  .button--caret {
    padding-inline-end: var(--button-suffix-spacing);
  }

  /* Enhanced spacing for labeled buttons with prefix/suffix */
  .button--has-label.button--has-prefix {
    padding-inline-start: var(--button-labeled-prefix-spacing);
  }

  .button--has-label.button--has-suffix,
  .button--has-label.button--caret {
    padding-inline-end: var(--button-labeled-suffix-spacing);
  }
`;
