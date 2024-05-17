import { css } from 'lit';

export default css`
  /* Write custom CSS here */

  .tab {
    border-radius: var(--syn-border-radius-none);
    color: var(--syn-typography-color-text);
    font: var(--syn-body-small-bold);
    min-height: var(--syn-spacing-2x-large);
    padding: var(--syn-spacing-small) var(--syn-spacing-large);
  }

  .tab:focus-visible {
    outline-offset: var(--syn-focus-ring-offset);
  }

  .tab:focus-visible:not(.tab--disabled) {
    color: var(--syn-typography-color-text);
  }

  .tab:hover:not(.tab--disabled) {
    color: var(--syn-color-primary-700);
  }

  .tab.tab--active:not(.tab--disabled) {
    /* in dev we have no active line */
    color: var(--syn-typography-color-text);
  }

  .tab.tab--closable {
    padding: var(--syn-spacing-2x-small) var(--syn-spacing-large);
  }

  .tab.tab--disabled {
    background-color: var(--syn-color-neutral-0);
  }

  .tab__close-button {
    color: var(--syn-color-neutral-500);
    font-size: var(--syn-font-size-x-large);
    margin-inline-start: var(--syn-spacing-2x-small);
  }

  .tab__close-button::part(base) {
    padding: var(--syn-spacing-x-small);
  }

  .tab__close-button::part(base):hover {
    color: var(--syn-color-primary-700);
  }

  @media (forced-colors: active) {
    .tab.tab--active:not(.tab--disabled) {
      outline-offset: var(--syn-focus-ring-offset);
    }
  }
`;
