import { css } from 'lit';

export default css`
  :host {
    --thumb-size: 20px;
    --tooltip-offset: 10px;
    --track-color-active: var(--syn-color-primary-300);
    --track-color-inactive: var(--syn-color-neutral-200);
    --track-height: 6px;
  }

  .form-control {
    align-items: stretch;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    writing-mode: horizontal-tb;
  }

  .base {
    display: block;
    height: var(--thumb-size);
    position: relative;
  }

  :host([disabled]) .base {
    opacity: 0.5;
  }

  .track {
    background-color: var(--track-color-inactive);
    border-radius: 3px;
    display: inline-block;
    height: var(--track-height);
    margin: calc((var(--thumb-size) - var(--track-height)) / 2) calc(var(--thumb-size) / 2 - 3px);
    width: calc(100% + 6px - var(--thumb-size));
  }

  .active-track {
    background-color: var(--track-color-active);
    height: var(--track-height);
    position: absolute;
    top: calc((var(--thumb-size) - var(--track-height)) / 2);
    z-index: 2;
  }

  .handle {
    background-color: var(--syn-color-primary-600);
    border-radius: 50%;
    cursor: pointer;
    display: block;
    height: var(--thumb-size);
    position: absolute;
    top: 0;
    width: var(--thumb-size);
    z-index: 3;
  }

  .handle:hover,
  .handle.grabbed {
    background-color: var(--syn-color-primary-500);
  }

  .handle.grabbed {
    cursor: grabbing;
  }

  .handle:focus-visible,
  .keyboard-focus .handle:focus {
    outline: var(--syn-focus-ring);
    outline-offset: var(--syn-focus-ring-offset);
  }

  :host([disabled]) .handle,
  :host([disabled]) .handle.grabbed {
    cursor: not-allowed;
  }

  .tooltip {
    background-color: var(--syn-tooltip-background-color);
    border-radius: var(--syn-tooltip-border-radius);
    color: var(--syn-tooltip-color);
    font-family: var(--syn-tooltip-font-family);
    font-size: var(--syn-tooltip-font-size);
    font-weight: var(--syn-tooltip-font-weight);
    left: 0;
    line-height: var(--syn-tooltip-line-height);
    opacity: 0;
    padding: var(--syn-tooltip-padding);
    pointer-events: none;
    position: absolute;
    transition: var(--syn-transition-fast) opacity;
    z-index: var(--syn-z-index-tooltip);
  }

  .tooltip::after {
    content: '';
    height: 0;
    left: 50%;
    position: absolute;
    translate: calc(-1 * var(--syn-tooltip-arrow-size));
    width: 0;
  }

  .tooltip-visible .tooltip {
    opacity: 1;
  }

  /* Tooltip on top */
  .tooltip-top .tooltip {
    top: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .tooltip-top .tooltip::after {
    border-left: var(--syn-tooltip-arrow-size) solid transparent;
    border-right: var(--syn-tooltip-arrow-size) solid transparent;
    border-top: var(--syn-tooltip-arrow-size) solid var(--syn-tooltip-background-color);
    top: 100%;
  }

  /* Tooltip on bottom */
  .tooltip-bottom .tooltip {
    bottom: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .tooltip-bottom .tooltip::after {
    border-bottom: var(--syn-tooltip-arrow-size) solid var(--syn-tooltip-background-color);
    border-left: var(--syn-tooltip-arrow-size) solid transparent;
    border-right: var(--syn-tooltip-arrow-size) solid transparent;
    bottom: 100%;
  }
`;
