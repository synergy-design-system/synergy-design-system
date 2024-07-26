import { css } from 'lit';

export default css`
  :host {
    display: block;
  }

  .select__listbox ::slotted(syn-option[hidden]) {
    display: none;
  }
`;
