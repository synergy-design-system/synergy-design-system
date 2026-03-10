import { css } from 'lit';
import buttonStyles from '../button/button.styles.js';

export default css`
  .button {
    align-items: stretch;
    background: var(--syn-interactive-emphasis-color);
    border: calc(var(--syn-spacing-x-small) - var(--syn-spacing-3x-small) - var(--syn-border-width-small)) solid var(--syn-input-background-color);
    color: var(--syn-color-neutral-0);
    display: inline-flex;
    font-family: var(--syn-input-font-family);
    font-weight: var(--syn-font-weight-normal);
    justify-content: center;
    margin: 0;
    padding: 0;
    text-decoration: none;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
    width: 100%;
  }

  .button:not(.button--disabled) {
    cursor: pointer;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--syn-focus-ring);
    outline-offset: var(--syn-focus-ring-offset);
  }

  .button--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${buttonStyles}
`;

// export default css`
//   .button__prefix,
//   .button__suffix,
//   .button__label {
//     align-items: center;
//     display: inline-flex;
//     position: relative;
//   }

//   /*
//    * We use a hidden input so constraint validation errors work, since they don't appear to show when used with buttons.
//    * We can't actually hide it, though, otherwise the messages will be suppressed by the browser.
//    */
//   .hidden-input {
//     all: unset;
//     inset: 0;
//     opacity: 0;
//     outline: dotted 1px red;
//     position: absolute;
//     z-index: -1;
//   }
// `;
