import { css } from 'lit';

export default css`
  :host(:focus-visible) .radio__control {
    outline: var(--syn-focus-ring);
    outline-offset: var(--syn-focus-ring-width);
  }

 :host([data-user-invalid]) .radio:not(.radio--checked, .radio--disabled) .radio__control {
  border-color: var(--syn-input-border-color-focus-error);
  }

  /*
 * Size modifiers
 */

  .radio--small {
    --toggle-size: var(--syn-input-font-size-small);
  }

  .radio--medium {
    --toggle-size: var(--syn-font-size-medium);

    padding: 3px 0;
  }

  .radio--large {
    --toggle-size: var(--syn-font-size-large);
  }
`;
