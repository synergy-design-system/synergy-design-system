import { css } from 'lit';

export default css`
  :host {
    --tick-height: var(--syn-spacing-x-small);

    /* Make the label position dependent on the tick height, so it will adapt if the tick-height is changed */
    --tick-label-top: calc(var(--tick-height) + var(--syn-spacing-3x-small));
  }

  .tick {
    background: var(--syn-color-neutral-400);
    color: var(--syn-input-icon-color);
    font: var(--syn-body-medium-regular);
    height: var(--tick-height);
    position: relative;
    width: 1px;
  }

  .tick--has-label {
    margin-bottom: var(--syn-spacing-medium-large);
  }

  .tick-label {
    position: absolute;
    transform: translate(-50%, var(--tick-label-top));
    white-space: nowrap;
  }

  .tick--subdivision {
    height: calc(var(--tick-height) / 2);
  }
`;
