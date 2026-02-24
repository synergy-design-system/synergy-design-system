import { css } from 'lit';

export default css`
  /* stylelint-disable property-no-vendor-prefix */
  /* stylelint-disable no-descending-specificity */
  :host {
    /* Icon size tokens */
    --syn-button-small-icon-size: var(--syn-font-size-medium);
    --syn-button-medium-icon-size: var(--syn-font-size-x-large);
    --syn-button-large-icon-size: var(--syn-font-size-2x-large);

    /* Icon alignment tokens */
    --syn-button-icon-offset-base: -2px;
    --syn-button-icon-offset-small: -3px;
    --syn-button-icon-offset-medium: -6px;
    --syn-button-icon-offset-large: -8px;

    /* Default (medium) spacing tokens */
    --syn-button-icon-only-padding: 0 calc(var(--syn-spacing-small) - var(--syn-spacing-4x-small));
    --syn-button-label-padding: 0 var(--syn-spacing-medium);
    --syn-button-prefix-spacing: var(--syn-spacing-small);
    --syn-button-suffix-spacing: var(--syn-spacing-small);
    --syn-button-prefix-size: var(--syn-spacing-large);
    --syn-button-labeled-prefix-spacing: var(--syn-spacing-medium);
    --syn-button-labeled-suffix-spacing: var(--syn-spacing-medium);
    --syn-button-caret-size: var(--syn-button-medium-icon-size);

    cursor: pointer;
    display: inline-block;
    position: relative;
    width: auto;
  }

  .button {
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
    padding: var(--syn-button-icon-only-padding);
  }

  .button__label::slotted(syn-icon) {
    font-size: var(--syn-button-medium-icon-size);
    vertical-align: var(--syn-button-icon-offset-medium);
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
    --syn-button-icon-only-padding: 0 calc(var(--syn-spacing-x-small) + var(--syn-spacing-4x-small));
    --syn-button-label-padding: 0 var(--syn-spacing-small);
    --syn-button-prefix-spacing: var(--syn-spacing-x-small);
    --syn-button-suffix-spacing: var(--syn-spacing-x-small);
    --syn-button-prefix-size: var(--syn-spacing-medium);
    --syn-button-labeled-prefix-spacing: var(--syn-spacing-small);
    --syn-button-labeled-suffix-spacing: var(--syn-spacing-small);
    --syn-button-caret-size: var(--syn-button-small-icon-size);
    
    border-radius: var(--syn-button-border-radius-small);
    font-size: var(--syn-button-font-size-small);
    line-height: calc(var(--syn-input-height-small) - var(--syn-input-border-width) * 2);
    min-height: var(--syn-input-height-small);
  }

  .button--small .button__label::slotted(syn-icon) {
    font-size: var(--syn-button-small-icon-size);
    vertical-align: var(--syn-button-icon-offset-small);
  }

  .button--medium {
    border-radius: var(--syn-button-border-radius-medium);
    font-size: var(--syn-button-font-size-medium);
    line-height: calc(var(--syn-input-height-medium) - var(--syn-input-border-width) * 2);
    min-height: var(--syn-input-height-medium);
  }

  .button--large {
    --syn-button-icon-only-padding: 0 calc(var(--syn-spacing-medium) - var(--syn-spacing-4x-small));
    --syn-button-label-padding: 0 var(--syn-spacing-large);
    --syn-button-labeled-prefix-spacing: var(--syn-spacing-large);
    --syn-button-labeled-suffix-spacing: var(--syn-spacing-large);
    --syn-button-caret-size: var(--syn-button-large-icon-size);
    
    border-radius: var(--syn-button-border-radius-large);
    font-size: var(--syn-button-font-size-large);
    line-height: calc(var(--syn-input-height-large) - var(--syn-input-border-width) * 2);
    min-height: var(--syn-input-height-large);
  }

  .button--large .button__label::slotted(syn-icon) {
    font-size: var(--syn-button-large-icon-size);
    vertical-align: var(--syn-button-icon-offset-large);
  }

  /*
   * Caret modifier
   */
  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    font-size: var(--syn-button-caret-size);
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
    padding: var(--syn-button-label-padding);
  }

  /* Basic prefix/suffix spacing */
  .button--has-prefix {
    padding-inline-start: var(--syn-button-prefix-spacing);
  }

  .button--has-suffix,
  .button--caret {
    padding-inline-end: var(--syn-button-suffix-spacing);
  }

  /* Enhanced spacing for labeled buttons with prefix/suffix */
  .button--has-label.button--has-prefix {
    padding-inline-start: var(--syn-button-labeled-prefix-spacing);
  }

  .button--has-label.button--has-suffix {
    padding-inline-end: var(--syn-button-labeled-suffix-spacing);
  }

  .button--has-prefix .button__prefix, 
  .button--has-suffix .button__suffix {
    font-size: var(--syn-button-prefix-size);
  }

  .button--large .button__prefix, 
  .button--large .button__suffix {
    font-size: var(--syn-button-large-icon-size);
  }

  /* Size-specific label adjustments */
  .button--large.button--has-label.button--has-prefix .button__label {
    padding-inline-start: var(--syn-spacing-small);
  }

  .button--large.button--has-label.button--has-suffix .button__label {
    padding-inline-end: var(--syn-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */
  :host([data-syn-button-group__button--first]:not([data-syn-button-group__button--last])) .button {
    border-end-end-radius: 0;
    border-start-end-radius: 0;
  }

  :host([data-syn-button-group__button--inner]) .button {
    border-radius: 0;
  }

  :host([data-syn-button-group__button--last]:not([data-syn-button-group__button--first])) .button {
    border-end-start-radius: 0;
    border-start-start-radius: 0;
  }

  /* All except the first */
  :host([data-syn-button-group__button]:not([data-syn-button-group__button--first])) {
    margin-inline-start: calc(-1 * var(--syn-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host([data-syn-button-group__button]:not([data-syn-button-group__button--first]):not([data-syn-button-group__button--radio]):not([variant='filled']):not(:hover)) .button::after {
    border-left: solid 1px rgb(128 128 128 / 33%);
    bottom: 0;
    content: '';
    inset-inline-start: 0;
    /* stylelint-disable-next-line plugin/no-unsupported-browser-features */
    mix-blend-mode: multiply;
    position: absolute;
    top: 0;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host([data-syn-button-group__button--hover]) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host([data-syn-button-group__button--focus]),
  :host([data-syn-button-group__button][checked]) {
    z-index: 2;
  }

  /* #392: Button Groups */
  :host([data-syn-button-group__button--inner]) .button--filled.button,
  :host([data-syn-button-group__button--first]:not([data-syn-button-group__button--last])) .button--filled.button,
  :host([data-syn-button-group__button--last]:not([data-syn-button-group__button--first])) .button--filled.button {
    border-color: var(--syn-panel-background-color);
  }

  :host([data-syn-button-group__button--inner]) .button--filled.button {
    border-left-color: var(--syn-panel-background-color);
    border-right-color: var(--syn-panel-background-color);
  }

  :host([data-syn-button-group__button--first]:not([data-syn-button-group__button--last])) .button--filled.button {
    border-right-color: var(--syn-panel-background-color);
  }

  :host([data-syn-button-group__button--last]:not([data-syn-button-group__button--first])) .button--filled.button {
    border-left-color: var(--syn-panel-background-color);
  }
`;
