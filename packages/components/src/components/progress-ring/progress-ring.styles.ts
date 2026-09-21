import { css } from 'lit';

export default css`
  :host {
    --size: 120px;
    --track-width: var(--syn-spacing-x-small);
    --track-color: var(--syn-progress-track-color);
    --indicator-width: var(--track-width);
    --indicator-color: var(--syn-progress-indicator-color);
    --indicator-transition-duration: 0.35s;

    display: inline-flex;
  }

  .progress-ring {
    align-items: center;
    display: inline-flex;
    justify-content: center;
    position: relative;
  }

  .progress-ring__image {
    height: var(--size);
    rotate: -90deg;
    transform-origin: 50% 50%;
    width: var(--size);
  }

  .progress-ring__track,
  .progress-ring__indicator {
    --radius: calc(var(--size) / 2 - max(var(--track-width), var(--indicator-width)) * 0.5);
    /* stylelint-disable-next-line number-max-precision */
    --circumference: calc(var(--radius) * 2 * 3.141592654);

    cx: calc(var(--size) / 2);
    cy: calc(var(--size) / 2);
    fill: none;
    r: var(--radius);
  }

  .progress-ring__track {
    stroke: var(--track-color);
    stroke-width: var(--track-width);
  }

  .progress-ring__indicator {
    stroke: var(--indicator-color);
    stroke-dasharray: var(--circumference) var(--circumference);
    stroke-dashoffset: calc(var(--circumference) - var(--percentage) * var(--circumference));
    stroke-linecap: initial;
    stroke-width: var(--indicator-width);
    transition-duration: var(--indicator-transition-duration);
    transition-property: stroke-dashoffset;
  }

  .progress-ring__label {
    align-items: center;
    color: var(--syn-typography-color-text);
    display: flex;
    font: var(--syn-heading-x-large);
    height: 100%;
    justify-content: center;
    left: 0;
    position: absolute;
    text-align: center;
    top: 0;
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -webkit-user-select: none;
    user-select: none;
    width: 100%;
  }
`;
