import { css } from 'lit';

export default css`
  :host {
    --arrow-color: var(--syn-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    isolation: isolate;
    max-height: var(--auto-size-available-height, none);
    max-width: var(--auto-size-available-width, none);
    position: absolute;

    :where(&) {
      background: unset;
      border: unset;
      color: unset;
      height: unset;
      inset: unset;
      margin: unset;
      overflow: unset;
      padding: unset;
      width: unset;
    }
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    background: var(--arrow-color);
    height: calc(var(--arrow-size-diagonal) * 2);
    position: absolute;
    rotate: 45deg;
    width: calc(var(--arrow-size-diagonal) * 2);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge {
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
    inset: 0;
    position: fixed;
    z-index: calc(var(--syn-z-index-dropdown) - 1);
  }

  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }
`;
