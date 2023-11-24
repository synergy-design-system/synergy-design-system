import { css } from 'lit';

export default css`
  :host(:focus-visible) .radio__control {
    outline: var(--syn-focus-ring);
    outline-offset: var(--syn-focus-ring-width);
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
