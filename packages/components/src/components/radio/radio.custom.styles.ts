import { css } from 'lit';

export default css`
  .radio:focus-visible {
    border: var(--syn-focus-ring-color) solid 2px;
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
