import { css } from 'lit';

export default css`
  :host {
    --thumb-size: var(--syn-spacing-medium-large);
    --thumb-clickable-area: 1.5;
    --track-active-offset: 0;
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
    align-items: center;
    cursor: text;
    display: inline-flex;
    flex: 1 1 auto;
    font-family: var(--syn-input-font-family);
    font-weight: var(--syn-input-font-weight);
    justify-content: start;
    letter-spacing: var(--syn-input-letter-spacing);
    position: relative;
    transition:
      var(--syn-transition-fast) color,
      var(--syn-transition-fast) border,
      var(--syn-transition-fast) box-shadow,
      var(--syn-transition-fast) background-color;
    vertical-align: middle;
    width: 100%;
  }

  .input-wrapper {
    flex: 1 0 auto;
    height: var(--thumb-size);
    position: relative;
  }

  :host([disabled]) .base {
    opacity: var(--syn-input-disabled-opacity);
  }

  .input__prefix,
  .input__suffix {
    align-items: center;
    cursor: default;
    display: inline-flex;
    flex: 0 0 auto;
  }

  .form-control--medium .input__prefix ::slotted(*) {
    margin-inline: var(--syn-input-spacing-medium) var(--syn-input-spacing-small);
  }

  .form-control--medium .input__suffix ::slotted(*) {
    margin-inline: var(--syn-input-spacing-small) var(--syn-input-spacing-medium);
  }

  .form-control--medium .input__prefix ::slotted(syn-icon),
  .form-control--medium .input__suffix ::slotted(syn-icon) {
    font-size: var(--syn-font-size-x-large);
  }

  .track-wrapper {
    cursor: pointer;
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
    border-radius: var(--syn-border-radius-small);
    display: inline-block;
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
    transition: transform var(--syn-transition-fast) ease-in-out, background-color var(--syn-transition-fast) ease-in-out, box-shadow var(--syn-transition-fast) ease-in-out;
    width: var(--thumb-size);
    z-index: 3;
  }

  /**
   * Adds some space to the knob that makes it easier to click and drag
   */
  .handle::after {
    background: transparent;
    border-radius: var(--syn-border-radius-circle);
    content: "";
    display: block;
    inset: calc(var(--thumb-size) * (var(--thumb-clickable-area) / 2) * -1);
    position: absolute;
  }

  .handle:hover,
  .handle.grabbed {
    cursor: grab;  
  }

  .handle.grabbed {
    cursor: grabbing;
  }

  .handle:focus-visible,
  .keyboard-focus .handle:focus-visible {
    outline: var(--syn-focus-ring);
    outline-offset: var(--syn-focus-ring-offset);
  }

  :host([disabled]) .track-wrapper,
  :host([disabled]) .handle,
  :host([disabled]) .handle.grabbed {
    cursor: not-allowed;
  }

  :host(:not([disabled])) .handle:hover,
  :host(:not([disabled])) .handle.grabbed {
    background: var(--syn-color-primary-900);
    box-shadow: var(--syn-shadow-large);
    transform: scale(var(--thumb-clickable-area));
  }
`;
