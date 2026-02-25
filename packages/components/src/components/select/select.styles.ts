import { css } from 'lit';
import sharedOptionSize from '../option/option-size.styles.js';

export default css`
  /* stylelint-disable property-no-vendor-prefix */
  /* stylelint-disable no-descending-specificity */
  :host {
    /* Size-dependent CSS custom properties - defaults to medium */
    --syn-select-input-border-radius: var(--syn-input-border-radius-medium);
    --syn-select-input-font-size: var(--syn-input-font-size-medium);
    --syn-select-input-height: var(--syn-input-height-medium);
    --syn-select-input-spacing: 0 var(--syn-input-spacing-medium);
    --syn-select-clear-font-size: var(--syn-spacing-large);
    --syn-select-clear-margin: var(--syn-spacing-small);
    --syn-select-prefix-suffix-margin: var(--syn-input-spacing-small);
    --syn-select-icon-font-size: var(--syn-font-size-x-large);
    --syn-select-expand-icon-font-size: var(--syn-spacing-large);
    --syn-select-tags-gap: var(--syn-spacing-x-small);
    --syn-select-multiple-padding-block: 3px;
    --syn-select-multiple-prefix-margin: var(--syn-input-spacing-medium);

    display: block;
  }

  /** The popup */
  .select {
    display: inline-flex;
    flex: 1 1 auto;
    position: relative;
    vertical-align: middle;
    width: 100%;
  }

  .select::part(popup) {
    z-index: var(--syn-z-index-dropdown);
  }

  .select[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .select[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  /* Combobox */
  .select__combobox {
    align-items: center;
    border-radius: var(--syn-select-input-border-radius);
    cursor: pointer;
    display: flex;
    flex: 1;
    font-family: var(--syn-input-font-family);
    font-size: var(--syn-select-input-font-size);
    font-weight: var(--syn-input-font-weight);
    justify-content: start;
    letter-spacing: var(--syn-input-letter-spacing);
    min-height: var(--syn-select-input-height);
    min-width: 0;
    overflow: hidden;
    padding-block: 0;
    padding-inline: var(--syn-select-input-spacing);
    position: relative;
    transition:
      var(--syn-transition-fast) color,
      var(--syn-transition-fast) border,
      var(--syn-transition-fast) box-shadow,
      var(--syn-transition-fast) background-color;
    vertical-align: middle;
    width: 100%;
  }

  .select__display-input {
    -webkit-appearance: none;
    appearance: none;
    background: none;
    border: none;
    color: var(--syn-input-color);
    cursor: inherit;
    font: inherit;
    margin: 0;
    overflow: hidden;
    padding: 0;
    position: relative;
    width: 100%;
  }

  .select__display-input::placeholder {
    color: var(--syn-input-placeholder-color);
  }

  .select:not(.select--disabled):hover .select__display-input {
    color: var(--syn-input-color-hover);
  }

  .select__display-input:focus {
    outline: none;
  }

  /* Visually hide the display input when multiple is enabled */
  .select--multiple:not(.select--readonly):not(.select--placeholder-visible) .select__display-input {
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;
  }

  /* #1177: Make sure that the values are copyable when using the readonly state */
  .select--multiple.select--readonly:not(.select--placeholder-visible) .select__display-input {
    flex: auto;
  }

  .select__value-input {
    height: 100%;
    left: 0;
    margin: 0;
    opacity: 0;
    padding: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;
  }

  .select__tags {
    align-items: center;
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    gap: var(--syn-select-tags-gap);
    margin-inline-start: var(--syn-spacing-medium);
  }

  .select__tags::slotted(syn-tag) {
    cursor: pointer !important;
  }

  .select--disabled .select__tags,
  .select--disabled .select__tags::slotted(syn-tag) {
    cursor: not-allowed !important;
  }

  /* Standard selects */
  .select--standard .select__combobox {
    background-color: var(--syn-input-background-color);
    border: solid var(--syn-input-border-width) var(--syn-input-border-color);
  }

  .select--standard.select--disabled .select__combobox {
    background-color: var(--syn-input-background-color-disabled);
    border-color: var(--syn-input-border-color-disabled);
    color: var(--syn-input-color-disabled);
    cursor: not-allowed;
    opacity: var(--syn-input-disabled-opacity); /* #429: Use token for opacity */
    outline: none;
  }

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

  /* Change select border on hover */
  .select:not(.select--disabled):not(.select--readonly):hover .select__combobox {
    border-color: var(--syn-input-border-color-hover);
  }

  /* Size variants */
  .select--small {
    --syn-select-input-border-radius: var(--syn-input-border-radius-small);
    --syn-select-input-font-size: var(--syn-input-font-size-small);
    --syn-select-input-height: var(--syn-input-height-small);
    --syn-select-input-spacing: 0 var(--syn-input-spacing-small);
    --syn-select-clear-font-size: var(--syn-spacing-medium);
    --syn-select-clear-margin: var(--syn-input-spacing-small);
    --syn-select-prefix-suffix-margin: var(--syn-spacing-x-small);
    --syn-select-icon-font-size: var(--syn-font-size-medium);
    --syn-select-expand-icon-font-size: var(--syn-spacing-medium);
    --syn-select-tags-gap: var(--syn-spacing-2x-small);
    --syn-select-multiple-padding-block: 2px;
    --syn-select-multiple-prefix-margin: var(--syn-input-spacing-small);
  }

  .select--large {
    --syn-select-input-border-radius: var(--syn-input-border-radius-large);
    --syn-select-input-font-size: var(--syn-input-font-size-large);
    --syn-select-input-height: var(--syn-input-height-large);
    --syn-select-input-spacing: 0 var(--syn-input-spacing-large);
    --syn-select-clear-font-size: var(--syn-spacing-x-large);
    --syn-select-clear-margin: var(--syn-input-spacing-large);
    --syn-select-prefix-suffix-margin: var(--syn-input-spacing-medium);
    --syn-select-icon-font-size: var(--syn-font-size-2x-large);
    --syn-select-expand-icon-font-size: var(--syn-spacing-x-large);
    --syn-select-tags-gap: var(--syn-spacing-small);
    --syn-select-multiple-padding-block: 4px;
    --syn-select-multiple-prefix-margin: var(--syn-input-spacing-large);
  }

  /* Multiple select specific styles */
  .select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--syn-select-multiple-prefix-margin);
  }
 
  /* Prefix and Suffix */
  .select__prefix,
  .select__suffix {
    align-items: center;
    color: var(--syn-input-icon-color);
    display: inline-flex;
    flex: 0;
  }

  .select__prefix::slotted(*) {
    margin-inline-end: var(--syn-select-prefix-suffix-margin);
  }

  .select__suffix::slotted(*) {
    margin-inline-start: var(--syn-select-prefix-suffix-margin);
  }

  .select__suffix::slotted(syn-icon),
  .select__prefix::slotted(syn-icon) {
    font-size: var(--syn-select-icon-font-size);
  }

  /* Clear button */
  .select__clear {
    align-items: center;
    background: none;
    border: none;
    color: var(--syn-input-icon-icon-clearable-color);
    cursor: pointer;
    display: inline-flex;
    font-size: var(--syn-select-clear-font-size);
    justify-content: center;
    margin-inline-start: var(--syn-select-clear-margin);
    padding: 0;
    transition: var(--syn-transition-fast) color;
  }

  .select__clear:hover {
    color: var(--syn-input-icon-color-hover);
  }

  .select__clear:focus {
    outline: none;
  }

  /* Expand icon */
  .select__expand-icon {
    align-items: center;
    color: var(--syn-color-neutral-950);
    display: flex;
    flex: 0 0 auto;
    font-size: var(--syn-select-expand-icon-font-size);
    margin-inline-start: var(--syn-spacing-small);
    rotate: 0deg;
    transition: var(--syn-transition-medium) rotate ease;
  }

  .select--open .select__expand-icon {
    rotate: -180deg;
  }

  /* Listbox */
  .select__listbox {
    background: var(--syn-panel-background-color);
    border: solid var(--syn-panel-border-width) var(--syn-panel-border-color);
    border-radius: var(--syn-input-border-radius-medium);
    box-shadow: var(--syn-shadow-medium);
    display: block;
    font-family: var(--syn-font-sans);
    font-size: var(--syn-font-size-medium);
    font-weight: var(--syn-font-weight-normal);
    max-height: var(--auto-size-available-height); /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    overflow: auto;
    overscroll-behavior: none;
    padding-block: var(--syn-spacing-x-small);
    padding-inline: 0;
    position: relative;
  }

  .select__listbox ::slotted(syn-divider) {
    --spacing: var(--syn-spacing-x-small);
  }

  .select__listbox ::slotted(small) {
    color: var(--syn-color-neutral-500);
    display: block;
    font-size: var(--syn-font-size-small);
    font-weight: var(--syn-font-weight-semibold);
    padding-block: var(--syn-spacing-2x-small);
    padding-inline: var(--syn-spacing-x-large);
  }

  .select--standard:not(.select--disabled).select--open .select__combobox,
  .select--standard:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--syn-input-background-color-focus);
    border-color: var(--syn-input-border-color-focus);
    box-shadow: 0 0 0 var(--syn-focus-ring-width) var(--syn-input-focus-ring-color);
  }

  .select--standard.select--readonly.select--focused .select__combobox {
    background: var(--syn-readonly-background-color);
    border-color: var(--syn-input-border-color-focus);
    box-shadow: 0 0 0 var(--syn-focus-ring-width) var(--syn-input-focus-ring-color);
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
   * Scoped to when placeholder is not visible to not break the placeholder visualization
   */
  :host([multiple]) :not(.select--placeholder-visible) > .select__combobox > .select__tags {
    min-width: 100px;
    overflow: hidden;
  }

  :host([multiple]) .select__tags > div {
    display: contents;
  }

  :host([multiple]) .select__tags > div > syn-tag {
    --syn-tag-position-adjustment: var(--syn-spacing-3x-small);

    max-width: var(--syn-select-tag-max-width);
  }

  :host([multiple]) .select__tags > div > syn-tag::part(content) {
    display: initial;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /**
   * #1177: Add support for readonly
   */
  .select--readonly .select__combobox {
    background: var(--syn-readonly-background-color);
    border-color: var(--syn-readonly-background-color);
    cursor: default;
  }

  .select--readonly .select__expand-icon {
    color: var(--syn-readonly-icon-color-expand);
  }

  ${sharedOptionSize}
`;
