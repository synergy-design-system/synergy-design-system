import { css } from 'lit';

export default css`
  :host {
    /*
     * Values here apply for the default size of "medium"
     * For other sizes, see below
     */
    --thumb-size: var(--syn-spacing-medium);
    --thumb-clickable-area: 1.4;
    --track-active-offset: 0px;
    --track-color-active: var(--syn-color-primary-600);
    --track-color-inactive: var(--syn-color-neutral-200);
    --track-height: 4px;

    /* This is needed to get the full with of the element, including the border */
    --full-thumb-size: calc(var(--thumb-size) + (var(--syn-focus-ring-width) * 2));
  }

  /* Sizes */
  :host([size='small']) {
    --thumb-size: var(--syn-spacing-small);
  }

  :host([size='large']) {
    --thumb-size: var(--syn-spacing-medium-large);
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
    touch-action: none; /* Prevent misbehaviour in mobile by disabling native touch */
    transition:
      var(--syn-transition-fast) color,
      var(--syn-transition-fast) border,
      var(--syn-transition-fast) box-shadow,
      var(--syn-transition-fast) background-color;
    vertical-align: middle;
    width: 100%;
    z-index: 0; /* Needed to not bleed absolute positioned elements out */
  }

  .input-wrapper {
    flex: 1 0 auto;
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
    position: relative;
  }

  .track {
    background-color: var(--track-color-inactive);
    border-radius: var(--syn-border-radius-small);
    height: var(--track-height);
    margin: calc((var(--full-thumb-size) - var(--track-height)) / 2) calc(var(--full-thumb-size) / 2 - 5px);
    width: calc(100% + 10px - var(--full-thumb-size));
  }

  .active-track {
    background-color: var(--track-color-active);
    border-radius: var(--syn-border-radius-small);
    height: var(--track-height);
    position: absolute;
    top: 0;
    z-index: 2;
  }

  .handle {
    background-color: var(--syn-color-primary-600);
    border: var(--syn-focus-ring-width) solid var(--syn-color-neutral-0);
    border-radius: var(--syn-border-radius-circle);
    cursor: pointer;
    display: block;
    height: var(--full-thumb-size);
    position: absolute;
    top: 0;
    transition: transform var(--syn-transition-fast) ease-in-out, background-color var(--syn-transition-fast) ease-in-out, box-shadow var(--syn-transition-fast) ease-in-out;
    user-select: none;
    width: var(--full-thumb-size);
    z-index: 3;
  }

  /**
   * Hide the aria label. Only used for aria controls
   */
  #aria-label-hidden {
    display: none;
  }

  /**
   * Adds some space to the knob that makes it easier to click and drag
   */
  .handle::after {
    background: transparent;
    border-radius: var(--syn-border-radius-circle);
    content: "";
    display: block;
    inset: calc(var(--full-thumb-size) * (var(--thumb-clickable-area) / 2) * -1);
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

  /* Ticks */
  .ticks {
    cursor: pointer;
    margin: 1px calc(var(--full-thumb-size) / 2) 0;
    position: relative;
    user-select: none;
  }
`;
