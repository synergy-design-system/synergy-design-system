import { css } from 'lit';
import sharedOptionSize from '../option/option-size.styles.js';

export default css`

  .combobox__display-input {
    flex: 1 1 auto;
    /* TODO: check for the correct min-width */
    min-width: 100px;
    width: unset;
  }

  .combobox:not(.combobox--disabled) .combobox__display-input {
    cursor: text;
  }

  .listbox__options ::slotted(syn-option[hidden]), 
  .listbox__options ::slotted(syn-optgroup[hidden]) {
    display: none;
  }

  .listbox__no-results {
    align-items: center;
    color: var(--syn-color-neutral-950);
    display: flex;
    font: var(--syn-body-medium-regular);
    padding: var(--syn-spacing-small) var(--syn-spacing-medium) var(--syn-spacing-small) 52px;
  }

  .combobox--small .listbox__no-results {
    font-size: var(--syn-input-font-size-small);
    min-height: var(--syn-input-height-small);
    padding: 0 var(--syn-spacing-small) 0 40px;
  }

  .combobox--large .listbox__no-results {
    font-size: var(--syn-input-font-size-large);
    min-height: var(--syn-input-height-large);
    padding: 0 var(--syn-spacing-large) 0 68px;
  }

  /* Multi Select */
  .combobox__tags {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    margin-inline-start: var(--syn-spacing-2x-small);
  }

  .combobox__tags::slotted(syn-tag) {
    cursor: pointer !important;
  }

  .combobox--disabled .combobox__tags,
  .combobox--disabled .combobox__tags::slotted(syn-tag) {
    cursor: not-allowed !important;
  }

  .combobox--tags-visible.combobox--small .combobox__tags {
    margin-inline-end: var(--syn-spacing-x-small);
  }

  .combobox--tags-visible.combobox--medium .combobox__tags {
    margin-inline-end: var(--syn-input-spacing-small);
  }

  .combobox--tags-visible.combobox--large .combobox__tags {
    margin-inline-end: var(--syn-input-spacing-medium);
  }

  .combobox--small .combobox__tags {
    gap: var(--syn-spacing-2x-small);
  }

  .combobox--medium .combobox__tags {
    gap: var(--syn-spacing-x-small);
  }

  .combobox--large .combobox__tags {
    gap: var(--syn-spacing-small);
  }

  ${sharedOptionSize}
`;
