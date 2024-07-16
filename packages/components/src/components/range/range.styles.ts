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
    -webkit-touch-callout: none;
    transition: var(--syn-transition-fast) color, var(--syn-transition-fast) border, var(--syn-transition-fast) box-shadow, var(--syn-transition-fast) background-color;
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -webkit-user-select: none;
    vertical-align: middle;
    width: 100%;
    z-index: 0; /* Needed to not bleed absolute positioned elements out */
  }

  .input__wrapper {
    flex: 1 0 auto;
    position: relative;
    will-change: transform;
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

  /**
   * Hide the aria label. Only used for aria controls
   */
  #aria-label-hidden {
    display: none;
  }

  .track__wrapper {
    cursor: pointer;
    position: relative;
  }

  /* Internal helper for a better click surface on tracks */
  .track__click-helper {
    inset: -16px calc(var(--full-thumb-size) / 2 * -1);
    position: absolute;
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

  .knob {
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
   * Adds some space to the knob that makes it easier to click and drag
   */
  .knob::after {
    background: transparent;
    border-radius: var(--syn-border-radius-circle);
    content: "";
    display: block;
    inset: calc(var(--full-thumb-size) * (var(--thumb-clickable-area) / 2) * -1);
    position: absolute;
  }

  .knob:hover {
    cursor: grab;  
  }

  .knob.grabbed {
    cursor: grabbing;
  }

  .knob:focus-visible {
    outline: none;
  }

  .knob:not(.grabbed):focus-visible {
    background: var(--syn-color-primary-600);
    outline: var(--syn-focus-ring);
    outline-offset: 0;
  }

  :host([disabled]) .track__wrapper,
  :host([disabled]) .knob,
  :host([disabled]) .knob.grabbed {
    cursor: not-allowed;
  }

  /*
   * Guard against mobile devices not removing the transform
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/any-hover
   */
  @media (any-hover: hover) {
    :host(:not([disabled])) .knob:hover:not(.grabbed)  {
      background: var(--syn-color-primary-900);
      transform: scale(var(--thumb-clickable-area));
    }
  }

  /* Ticks */
  .ticks {
    cursor: pointer;
    margin: 1px calc(var(--full-thumb-size) / 2) 0;
    position: relative;
    user-select: none;
  }
`;
