import { css } from 'lit';

export default css`
  :host {
    background: red !important;
  }

  .validate {
    display: flex;
    flex-direction: column;
    gap: var(--syn-spacing-small);
  }
`;
