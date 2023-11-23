import { css } from 'lit';

export default css`
 :host([data-user-invalid]) .radio-group--required .radio__control {
  border-color: var(--syn-input-border-color-focus-error);
  }
`;
