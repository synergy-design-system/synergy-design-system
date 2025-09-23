import { css } from 'lit';

export default css`
  :host {
    --height: var(--syn-font-size-medium);
    --speed: 2.5s;
    --indicator-color: var(--syn-interactive-emphasis-color, var(--syn-color-primary-600));
  }

  .progress-bar {
    border-radius: var(--syn-border-radius-none);
    box-shadow: none;
  }

  .progress-bar__indicator {
    font: var(--syn-body-x-small-bold);
  }

  /* Indeterminate */
  .progress-bar--indeterminate .progress-bar__indicator {
    animation-duration: var(--speed);
  }
`;
