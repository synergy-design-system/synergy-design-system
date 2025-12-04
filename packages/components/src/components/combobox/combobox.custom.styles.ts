import { css } from 'lit';
import sharedOptionSize from '../option/option-size.styles.js';

export default css`

  .combobox__display-input {
    flex: 1;
    min-width: var(--syn-spacing-2x-large);
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

  /**
   * #850: Allow to measure the size of the combobox.
   * This is needed so we can automatically size and truncate the tags in the <syn-combobox multiple> component.
   * Scoped to multiple to not break the single select per accident.
   * Scoped to when placeholder is not visible to not break the placeholder visualization
   */
  :host([multiple]) :not(.combobox--placeholder-visible).combobox--tags-visible > .combobox__inputs > .combobox__tags {
    min-width: 85px;
    overflow: hidden;
  }

  :host([multiple]) .combobox__tags > div {
    display: contents;
  }

  :host([multiple]) .combobox__tags > div > syn-tag {
    --syn-tag-position-adjustment: var(--syn-spacing-3x-small);

    max-width: var(--syn-select-tag-max-width);
  }

  :host([multiple]) .combobox__tags > div > syn-tag::part(content) {
    display: initial;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* 
  This class is needed to be able to hide the options as long as the popup close animation is running.
  As otherwise the listbox would flicker because the options are shown again when the value is reset to empty string.
  */
  .options__hide {
    /* We need to set the slot to something different than display: contents to be able to hide it. Also it should not take any space so we remove the height */
    display: block;
    height: 0;
    opacity: 0;
  }

  ${sharedOptionSize}
`;
