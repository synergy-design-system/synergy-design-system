import { css } from 'lit';

export default css`
  :host([size='small']) {
    --thumb-size: var(--syn-toggle-size-small);
  }

  :host([size='medium']) {
    --thumb-size: var(--syn-toggle-size-medium);
  }

  :host([size='large']) {
    --thumb-size: var(--syn-toggle-size-large);
  }

`;
