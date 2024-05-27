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


  /**
   * Focus
   */
  .tab:focus-visible {
    outline-offset: calc(var(--syn-focus-ring-offset) * -1);
  }

  .tab:focus-visible:not(.tab--disabled) {
    color: var(--syn-typography-color-text);
  }

  @media (forced-colors: active) {
    .tab.tab--active:not(.tab--disabled) {
      outline-offset: calc(var(--syn-focus-ring-offset) * -1);
    }
  }


  .tab:hover:not(.tab--disabled) {
    color: var(--syn-color-primary-700);
  }

  .tab.tab--active:not(.tab--disabled) {
    color: var(--syn-typography-color-text);
  }


  /**
   * Closable
   */
  .tab.tab--closable {
    padding: var(--syn-spacing-2x-small) var(--syn-spacing-large);
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


  /**
   * Slotted prefix
   */
  .tab__prefix::slotted(*) {
    margin-inline-end: var(--syn-spacing-x-small);
  }
  
  /* Set the default font size to make icons appear correct */
  .tab__prefix::slotted(syn-icon) {
    font-size: var(--syn-font-size-x-large);
  }


  /**
   * Contained style
   */
  .tab--contained.tab--active {
    background-color: var(--syn-color-neutral-0);
    border: var(--syn-border-width-small) solid var(--syn-color-neutral-300);

    /* Is needed for the ::after to work correctly. Otherwise the line has not the width of the tab, but of the page itself */
    position: relative;
  }

  /* Stretch the tabs so they are aligned to each other vertically */
  .tab--start.tab--contained,
  .tab--end.tab--contained {
    width: 100%;
  }

  /* Avoid moving of the text content by adding a transparent border to non-active tabs */
  .tab--contained:not(.tab--active) {
    border: var(--syn-border-width-small) solid transparent;
  }


  /* Top */
  .tab--top.tab--contained {
    border-bottom: none;
  }

  .tab--top.tab--contained.tab--active:not(.tab--sharp),
  .tab--top.tab--contained:not(.tab--sharp):focus-visible {
    border-radius: var(--syn-border-radius-medium) var(--syn-border-radius-medium) var(--syn-border-radius-none) var(--syn-border-radius-none);
  }

  /* Start & End with rtl */
  .tab--start.tab--contained,
  .tab--end.tab--rtl.tab--contained {
    border-left: var(--syn-border-width-small) solid transparent;
    border-right: none;
  }

  .tab--start.tab--contained.tab--active,
  .tab--end.tab--rtl.tab--contained.tab--active {
    border-left-color: var(--syn-color-neutral-300);
  }

  .tab--start.tab--contained.tab--active:not(.tab--sharp),
  .tab--start.tab--contained:not(.tab--sharp):focus-visible,
  .tab--end.tab--rtl.tab--contained.tab--active:not(.tab--sharp),
  .tab--end.tab--rtl.tab--contained:not(.tab--sharp):focus-visible {
    border-radius: var(--syn-border-radius-medium) var(--syn-border-radius-none) var(--syn-border-radius-none) var(--syn-border-radius-medium);
  }

  /* End & Start with rtl */
  .tab--end.tab--contained,
  .tab--start.tab--rtl.tab--contained {
    border-left: none;
    border-right: var(--syn-border-width-small) solid transparent;
  }

  .tab--end.tab--contained.tab--active,
  .tab--start.tab--rtl.tab--contained.tab--active {
    border-right-color: var(--syn-color-neutral-300);
  }

  .tab--end.tab--contained.tab--active:not(.tab--sharp),
  .tab--end.tab--contained:not(.tab--sharp):focus-visible,
  .tab--start.tab--rtl.tab--contained.tab--active:not(.tab--sharp),
  .tab--start.tab--rtl.tab--contained:not(.tab--sharp):focus-visible {
    border-radius: var(--syn-border-radius-none) var(--syn-border-radius-medium) var(--syn-border-radius-medium) var(--syn-border-radius-none);
  }


  /* This is needed to hide the part of the tab panel border of an activated contained tab */
  .tab--contained.tab--active::after {
    background-color: var(--syn-color-neutral-0);
    content: '';
    display: block;
    position: absolute;
    z-index: 1;
  }

  .tab--top.tab--contained.tab--active::after {
    bottom: calc(var(--syn-spacing-4x-small) * -1);
    height: var(--syn-spacing-4x-small);
    left: 0;
    width: 100%;
  }

  .tab--start.tab--contained.tab--active::after,
  .tab--end.tab--rtl.tab--contained.tab--active::after {
    height: 100%;
    left: unset;
    right: calc(var(--syn-spacing-4x-small) * -1);
    width: var(--syn-spacing-4x-small);
  }

  .tab--end.tab--contained.tab--active::after,
  .tab--start.tab--rtl.tab--contained.tab--active::after {
    height: 100%;
    left: calc(var(--syn-spacing-4x-small) * -1);
    right: unset;
    width: var(--syn-spacing-4x-small);
  }
`;
