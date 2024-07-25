import { css } from 'lit';

export default css`
  :host {
    display: block;
  }

  .select__listbox > [role="option"] mark {
    background-color: transparent;
    color: var(--syn-color-neutral-950);
    font: var(--syn-body-medium-bold);
  }

  .select__listbox > [role="option"][aria-selected='true'] mark {
    color: var(--syn-color-neutral-0);
  }       
`;
