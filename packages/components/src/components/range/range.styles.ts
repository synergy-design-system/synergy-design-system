import { css } from 'lit';

export default css`
  :host {
    --thumb-size: var(--syn-spacing-medium-large);
    --track-color-active: var(--syn-color-primary-600);
    --track-color-inactive: var(--syn-color-neutral-200);
    --track-height: 4px;
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
    opacity: var(--syn-input-disabled-opacity);
  }

  .track {
    background-color: var(--track-color-inactive);
    border-radius: var(--syn-border-radius-small);
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
    border: var(--syn-focus-ring-width) solid var(--syn-color-neutral-0);
    border-radius: var(--syn-border-radius-circle);
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
    cursor: grab;  
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

  :host(:not([disabled])) .handle:hover,
  :host(:not([disabled])) .handle.grabbed {
    background: var(--syn-color-primary-900);
  }
`;
