import { css } from 'lit';

export default css`
  /* Write custom CSS here */
  .tooltip__body {
    box-shadow: var(--syn-shadow-large);
  }

  /** #640: Adjust the zIndex of the arrow to make sure the box-shadow above does not bleed out */
  :host::part(arrow) {
    z-index: 0;
  }
`;
