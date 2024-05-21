import { css } from 'lit';

export default css`
  /* Write custom CSS here */
  :host {
    --track-width: var(--syn-border-width-small);
    --track-color: var(--syn-color-neutral-300);
    --indicator-width: var(--syn-border-width-x-large);
  }

  /* Contained styling */
  .tab-group--contained .tab-group__tabs {
    border: none;
  }

  .tab-group--contained .tab-group__body {
    background-color: var(--syn-color-neutral-0);
    border: var(--syn-border-width-small) solid var(--syn-color-neutral-300);
  }

  .tab-group--contained ::slotted(syn-tab[active]) {
    background-color: var(--syn-color-neutral-0);
    border: var(--syn-border-width-small) solid var(--syn-color-neutral-300);
  }


  /* Nested styling */
  .tab-group--nested .tab-group__tabs {
    border: none;
  }

  .tab-group--nested .tab-group__body {
    background-color: var(--syn-color-neutral-0);
    border: var(--syn-border-width-small) solid var(--syn-color-neutral-300);
    border-radius: 0;
  }

  .tab-group--nested ::slotted(syn-tab[active]) {
    background-color: var(--syn-color-neutral-0);
    border: var(--syn-border-width-small) solid var(--syn-color-neutral-300);
  }

  /**
   * Top
   */

  /* we need to augment the size of the height of the tab-group__nav to make the focus outline visible of the tab because of overflow-x value  */
  /* .tab-group--top .tab-group__body {
    position: relative;
    top: calc(-1 * var(--syn-spacing-2x-small));
  } */

  /* .tab-group--top .tab-group__nav {
    padding: var(--syn-spacing-2x-small) 0;
  } */

  .tab-group--top .tab-group__indicator {
    border-bottom: solid var(--indicator-width) var(--indicator-color);
    bottom: 0;
  }

  .tab-group--top ::slotted(syn-tab-panel) {
    --padding: var(--syn-spacing-medium) var(--syn-spacing-large) ;
  }

  .tab-group--top.tab-group--contained .tab-group__body {
    border-radius: 0 var(--syn-border-radius-medium) var(--syn-border-radius-medium) var(--syn-border-radius-medium);
  }

  .tab-group--top.tab-group--rtl.tab-group--contained .tab-group__body {
    border-radius: var(--syn-border-radius-medium) 0 var(--syn-border-radius-medium) var(--syn-border-radius-medium);
  }

  .tab-group--top.tab-group--contained ::slotted(syn-tab[active]) {
    border-bottom: none;
    border-radius: var(--syn-border-radius-medium) var(--syn-border-radius-medium) 0 0;
  }

  .tab-group--top.tab-group--nested ::slotted(syn-tab[active]) {
    border-bottom: none;
  }


  /**
   * Start
   */

  .tab-group--start .tab-group__indicator {
    border-right: solid var(--indicator-width) var(--indicator-color);
    right: 0;
  }

  .tab-group--start.tab-group--rtl .tab-group__indicator {
    left: 0;
  }

  .tab-group--start ::slotted(syn-tab-panel) {
    --padding: var(--syn-spacing-medium) var(--syn-spacing-large) ;
  }

  /* stylelint-disable-next-line no-descending-specificity */
  .tab-group--start.tab-group--contained .tab-group__body,
  .tab-group--end.tab-group--rtl.tab-group--contained .tab-group__body {
    border-radius: 0 var(--syn-border-radius-medium) var(--syn-border-radius-medium) var(--syn-border-radius-medium);
  }

  .tab-group--start.tab-group--contained ::slotted(syn-tab[active]),
  .tab-group--end.tab-group--rtl.tab-group--contained ::slotted(syn-tab[active]) {
    border-left: var(--syn-border-width-small) solid var(--syn-color-neutral-300);
    border-radius: var(--syn-border-radius-medium) 0 0 var(--syn-border-radius-medium);
    border-right: none;
  }


  /* stylelint-disable-next-line no-descending-specificity */
  .tab-group--start.tab-group--nested ::slotted(syn-tab[active]),
  .tab-group--end.tab-group--rtl.tab-group--nested ::slotted(syn-tab[active]) {
    border-left: var(--syn-border-width-small) solid var(--syn-color-neutral-300);
    border-right: none;
  }

  /**
   * End
   */

  /* stylelint-disable-next-line no-descending-specificity */
  .tab-group--end .tab-group__indicator {
    border-inline-start: solid var(--indicator-width) var(--indicator-color);
    left: 0;
  }

  .tab-group--end.tab-group--rtl .tab-group__indicator {
    right: 0;
  }

  .tab-group--end ::slotted(syn-tab-panel) {
    --padding: var(--syn-spacing-medium) var(--syn-spacing-large) ;
  }
  
  /* stylelint-disable-next-line no-descending-specificity */
  .tab-group--end.tab-group--contained .tab-group__body,
  .tab-group--start.tab-group--rtl.tab-group--contained .tab-group__body {
    border-radius: var(--syn-border-radius-medium) 0 var(--syn-border-radius-medium) var(--syn-border-radius-medium);
  }

  /* stylelint-disable-next-line no-descending-specificity */
  .tab-group--end.tab-group--contained ::slotted(syn-tab[active]),
  .tab-group--start.tab-group--rtl.tab-group--contained ::slotted(syn-tab[active]) {
    border-left: none;
    border-radius: 0 var(--syn-border-radius-medium) var(--syn-border-radius-medium) 0;
    border-right: var(--syn-border-width-small) solid var(--syn-color-neutral-300);
  }

  /* stylelint-disable-next-line no-descending-specificity */
  .tab-group--end.tab-group--nested ::slotted(syn-tab[active]),
  .tab-group--start.tab-group--rtl.tab-group--nested ::slotted(syn-tab[active]){
    border-left: none;
    border-right: var(--syn-border-width-small) solid var(--syn-color-neutral-300);
  }

  /**
   * Make sure the direction of the chevrons match the scrolling directions.
   */
  .tab-group--has-scroll-controls .tab-group__nav-container {
    padding: 0 calc(var(--syn-spacing-x-large) + var( --syn-spacing-2x-small));
  }

  .tab-group__scroll-button {
    /* uncomment this as soon as the new system icon is used */

    /* border-bottom: solid var(--track-width) var(--track-color); */
    font-size: var(--syn-font-size-medium);
    height: calc(var(--syn-spacing-x-large) + var( --syn-spacing-2x-small));
    top: 11px;
    width: var(--syn-spacing-2x-large);
  }

  .tab-group__scroll-button::part(base) {
    padding: calc(var(--syn-spacing-small) - var(--syn-spacing-3x-small));
  }

  .tab-group--top .tab-group__nav::-webkit-scrollbar {
    display: none;
  }

  .tab-group__scroll-button--start {
    border-right: solid var(--track-width) var(--track-color);
    left: -6px;
    rotate: 90deg;
  }

  .tab-group__scroll-button--end {
    border-left: solid var(--track-width) var(--track-color);
    right: -6px;
    rotate: -90deg;
  }

  .tab-group--rtl .tab-group__scroll-button--start {
    border-left: solid var(--track-width) var(--track-color);
    border-right: none;
    right: -6px;
    rotate: -90deg;
  }

  .tab-group--rtl .tab-group__scroll-button--end {
    border-left: none;
    border-right: solid var(--track-width) var(--track-color);
    left: -6px;
    rotate: 90deg;
  } 
`;
