import { css } from 'lit';

export default css`
  .tag {
    border-color: var(--syn-color-neutral-400);
    color: var(--syn-input-color);
  }

  .tag:hover {
    background-color: var(--syn-color-neutral-100);
  }

  .tag--small {
    font-size: var(--syn-font-size-small);
    height: var(--syn-font-size-x-large);
  }

  .tag--medium {
    font-size: var(--syn-font-size-small);
    height: var(--syn-font-size-2x-large);
  }

  .tag--large {
    font-size: var(--syn-font-size-medium);
    height: var(--syn-font-size-3x-large);
  }


`;
