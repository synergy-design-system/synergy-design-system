import { css } from 'lit';

export default css`
  .button__prefix,
  .button__suffix,
  .button__label {
    align-items: center;
    display: inline-flex;
    position: relative;
  }

  /*
   * We use a hidden input so constraint validation errors work, since they don't appear to show when used with buttons.
   * We can't actually hide it, though, otherwise the messages will be suppressed by the browser.
   */
  .hidden-input {
    all: unset;
    inset: 0;
    opacity: 0;
    outline: dotted 1px red;
    position: absolute;
    z-index: -1;
  }
`;
