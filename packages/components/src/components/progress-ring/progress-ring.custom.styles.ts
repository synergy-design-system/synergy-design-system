import { css } from 'lit';

export default css`
  :host {
    --size: 120px;
    --track-width: var(--syn-spacing-x-small);
    --track-color: var(--syn-progress-track-color, var(--syn-color-neutral-200));
    --indicator-color: var(--syn-progress-indicator-color, var(--syn-color-primary-600));
  }

  .progress-ring__indicator {
    stroke-linecap: initial;
  }

  .progress-ring__label {
    color: var(--syn-typography-color-text);
    font: var(--syn-heading-x-large);
  }
`;
