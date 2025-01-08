import { css } from 'lit';
import sharedOptionSize from '../option/option-size.styles.js';

export default css`
  .combobox:not(.combobox--disabled) .combobox__display-input {
    cursor: text;
  }

  .listbox__options ::slotted(syn-option[hidden]), 
  .listbox__options ::slotted(syn-optgroup[hidden]) {
    display: none;
  }

  ${sharedOptionSize}
`;
