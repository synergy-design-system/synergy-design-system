import { css } from 'lit';

export default css`
  :host {
    --track-color: var(--syn-color-neutral-200);
  }

  .spinner__indicator {
    stroke-dasharray: 75% 360%;
    stroke-linecap: initial;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;
