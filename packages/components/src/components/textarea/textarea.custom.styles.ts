import { css } from 'lit';

export default css`
  :host([data-user-invalid]) .textarea--standard {
    border-color: var(--syn-input-border-color-focus-error);
  }

  :host([data-user-invalid]) .textarea--standard.textarea--focused:not(.textarea--disabled) {
    border-color: var(--syn-input-border-color-focus-error);
    box-shadow: 0 0 0 var(--syn-focus-ring-width) var(--syn-input-focus-ring-error);
  }

  /** #429: Use token for opacity */
  .textarea--readonly.textarea--disabled,
  .textarea--standard.textarea--disabled {
    opacity: var(--syn-input-disabled-opacity);
  }
`;
