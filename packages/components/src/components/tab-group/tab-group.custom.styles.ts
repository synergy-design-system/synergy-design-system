import { css } from 'lit';

export default css`
  /* stylelint-disable no-descending-specificity */
  /* Write custom CSS here */
  :host {
    --track-width: var(--syn-border-width-small);
    --track-color: var(--syn-color-neutral-300);
    --indicator-width: var(--syn-border-width-x-large);
  }

  /* we need to augment the size of the height of the tab-group__nav to make the focus outline visible of the tab because of overflow-x value  */
  .tab-group--top .tab-group__body {
    position: relative;
    top: calc(-1 * var(--syn-spacing-4x-small));
  }

  .tab-group--top .tab-group__nav {
    padding: var(--syn-spacing-4x-small) 0;
  }

  /**
   * Indicator
   */
  .tab-group--top .tab-group__indicator {
    border-bottom: solid var(--indicator-width) var(--indicator-color);
    bottom: 0;
  }

  .tab-group--start .tab-group__indicator {
    border-right: solid var(--indicator-width) var(--indicator-color);
    right: 0;
  }

  .tab-group--start.tab-group--rtl .tab-group__indicator {
    left: 0;
  }

  .tab-group--end .tab-group__indicator {
    border-inline-start: solid var(--indicator-width) var(--indicator-color);
    left: 0;
  }

  .tab-group--end.tab-group--rtl .tab-group__indicator {
    right: 0;
  }

  /**
   * Panel
   */
  .tab-group--top ::slotted(syn-tab-panel) {
    --padding: var(--syn-spacing-large) 0 ;
  }

  .tab-group--top.tab-group--contained ::slotted(syn-tab-panel) {
    --padding: var(--syn-spacing-large);
  }

  .tab-group--start ::slotted(syn-tab-panel) {
    --padding: var(--syn-spacing-large);
  }

  .tab-group--end ::slotted(syn-tab-panel) {
    --padding: var(--syn-spacing-large);
  }

  /**
   * Contained styling
   */ 
  .tab-group--contained .tab-group__tabs {
    border: none;
  }

  .tab-group--contained ::slotted(syn-tab-panel) {
    background-color: var(--syn-color-neutral-0);
    border: var(--syn-border-width-small) solid var(--syn-color-neutral-300);
    border-radius: var(--syn-border-radius-medium);
  }

  /* Stretch the tab panel container for non-top placements, otherwise the borders are not drawn correctly */
  .tab-group--contained:not(.tab-group--top) ::slotted(syn-tab-panel) {
    height: 100%;
  }

  /* Draw the correct border radii of the panel depending on the placement and direction */
  .tab-group--top.tab-group--contained:not(.tab-group--nested):not(.tab-group--has-scroll-controls) ::slotted(syn-tab-panel:first-of-type),
  .tab-group--start.tab-group--contained:not(.tab-group--nested) ::slotted(syn-tab-panel:first-of-type),
  .tab-group--end.tab-group--rtl.tab-group--contained:not(.tab-group--nested) ::slotted(syn-tab-panel:first-of-type) {
    border-radius: 0 var(--syn-border-radius-medium) var(--syn-border-radius-medium) var(--syn-border-radius-medium);
  }

  .tab-group--top.tab-group--rtl.tab-group--contained:not(.tab-group--nested):not(.tab-group--has-scroll-controls) ::slotted(syn-tab-panel:first-of-type),
  .tab-group--end.tab-group--contained:not(.tab-group--nested) ::slotted(syn-tab-panel:first-of-type),
  .tab-group--start.tab-group--rtl.tab-group--contained:not(.tab-group--nested) ::slotted(syn-tab-panel:first-of-type) {
    border-radius: var(--syn-border-radius-medium) 0 var(--syn-border-radius-medium) var(--syn-border-radius-medium);
  }

  .tab-group--start.tab-group--contained:not(.tab-group--nested) ::slotted(syn-tab-panel:last-of-type),
  .tab-group--end.tab-group--rtl.tab-group--contained:not(.tab-group--nested) ::slotted(syn-tab-panel:last-of-type) {
    border-radius: var(--syn-border-radius-medium) var(--syn-border-radius-medium) var(--syn-border-radius-medium) 0;
  }

  .tab-group--end.tab-group--contained:not(.tab-group--nested) ::slotted(syn-tab-panel:last-of-type),
  .tab-group--start.tab-group--rtl.tab-group--contained:not(.tab-group--nested) ::slotted(syn-tab-panel:last-of-type) {
    border-radius: var(--syn-border-radius-medium) var(--syn-border-radius-medium) 0 var(--syn-border-radius-medium);
  }


  /* Needed, otherwise the indicator is hidden under the background of the tab */
  .tab-group--contained .tab-group__indicator {
    z-index: 1;
  }

  /**
   * Nested styling
   */
  .tab-group--nested ::slotted(syn-tab-panel) {
    border-radius: 0;
  }


  /**
   * Scroll buttons
   */
  .tab-group--has-scroll-controls .tab-group__nav-container {
    padding: 0 calc(var(--syn-spacing-x-large) + var( --syn-spacing-2x-small));
  }

  .tab-group__scroll-button {
    /* uncomment this as soon as the new system icon is used */

    /* border-bottom: solid var(--track-width) var(--track-color); */
    color: var(--syn-color-neutral-950);
    font-size: var(--syn-font-size-medium);
    height: calc(var(--syn-spacing-x-large) + var( --syn-spacing-2x-small));
    top: 8px;
    width: var(--syn-spacing-2x-large);
  }

  .tab-group__scroll-button::part(base) {
    padding: calc(var(--syn-spacing-small) - var(--syn-spacing-3x-small));
  }

  .tab-group--top .tab-group__nav::-webkit-scrollbar {
    display: none;
  }

  /* Make sure the direction of the chevrons match the scrolling directions. */
  .tab-group__scroll-button--start {
    left: -6px;
    rotate: 90deg;
  }

  .tab-group--has-scroll-controls:not(.tab-group--contained) .tab-group__scroll-button--start {
    border-right: solid var(--track-width) var(--track-color);
  }

  .tab-group__scroll-button--end {
    right: -6px;
    rotate: -90deg;
  }

  .tab-group--has-scroll-controls:not(.tab-group--contained) .tab-group__scroll-button--end {
    border-left: solid var(--track-width) var(--track-color);
  }

  .tab-group--rtl .tab-group__scroll-button--start {
    right: -6px;
    rotate: -90deg;
  }

  .tab-group--rtl.tab-group--has-scroll-controls:not(.tab-group--contained) .tab-group__scroll-button--start {
    border-left: solid var(--track-width) var(--track-color);
    border-right: none;
  }

  .tab-group--rtl .tab-group__scroll-button--end {
    left: -6px;
    rotate: 90deg;
  } 

  .tab-group--rtl.tab-group--has-scroll-controls:not(.tab-group--contained) .tab-group__scroll-button--end {
    border-left: none;
    border-right: solid var(--track-width) var(--track-color);
  }
`;
