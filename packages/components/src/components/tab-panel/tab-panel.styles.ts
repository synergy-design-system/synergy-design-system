import { css } from 'lit';

export default css`
  :host {
    --padding: 0;

    display: none;
  }

  :host([active]) {
    display: block;
  }

  .tab-panel {
    color: var(--syn-typography-color-text);
    display: block;
    padding: var(--padding);
  }
`;
