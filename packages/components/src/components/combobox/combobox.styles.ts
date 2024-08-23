import { css } from 'lit';

export default css`
  :host {
    display: block;
  }

  .filtered-options syn-option mark {
    background-color: transparent;
    color: var(--syn-color-neutral-950);
    font: var(--syn-body-medium-bold);
  }

  .filtered-options syn-option[aria-selected='true'] mark {
    color: var(--syn-color-neutral-0);
  }

  .select__listbox slot:not([name]) {
    display: none;
  }
`;
