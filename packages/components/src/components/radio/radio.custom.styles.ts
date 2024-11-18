import { css } from 'lit';

export default css`
  :host(:focus-visible) .radio__control {
    outline: var(--syn-focus-ring);
    outline-offset: var(--syn-focus-ring-width);
  }

  /* Checked + hover */
  .radio.radio--checked:not(.radio--disabled):hover  .radio__control {
    background-color: var(--syn-color-primary-950);
    border-color: var(--syn-color-primary-950);
  }

  /* Hover */
  .radio:not(.radio--checked):not(.radio--disabled):hover .radio__control {
    border-color: var(--syn-color-primary-900);
  }

  /* Fix#456: Multi line radio fixes */
  .radio__label {
    margin-inline-start: var(--syn-spacing-x-small);
    position: relative;
  }

  .radio--small .radio__label {
    font: var(--syn-body-small-regular);
  }

  .radio--medium .radio__label {
    font: var(--syn-body-medium-regular);
    top: -3px;
  }

  .radio--large .radio__label {
    font: var(--syn-body-large-regular);
  }

  /* /Fix#456 */

  /* Size modifiers */
  .radio--small {
    --toggle-size: var(--syn-input-font-size-small);
  }

  .radio--medium {
    --toggle-size: var(--syn-font-size-medium);
  }

  .radio--large {
    --toggle-size: var(--syn-spacing-large);
  }

  .radio--small .radio__label, .radio--large .radio__label  {
    margin-inline-start: var(--syn-spacing-x-small);
  }
`;
