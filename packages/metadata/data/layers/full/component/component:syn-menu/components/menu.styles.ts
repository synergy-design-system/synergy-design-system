import { css } from 'lit';

export default css`
  :host {
    background: var(--syn-panel-background-color);
    border: solid var(--syn-panel-border-width) var(--syn-panel-border-color);
    border-radius: var(--syn-input-border-radius-medium);
    display: block;
    overflow: auto;
    overscroll-behavior: none;
    padding: var(--syn-spacing-x-small) 0;
    position: relative;
  }

  ::slotted(syn-divider) {
    /* #369: Slotted syn-dividers should use a lighter color so they do not crash with the border visually */
    --color: var(--syn-panel-border-color);
    --spacing: var(--syn-spacing-x-small);
  }

  /**
   * Make sure to hide the syn-divider for the first syn-optgroup
   * Note! ::slotted does currently not work with ::part, so we
   * opted for using a css variable here.
   */
  ::slotted(syn-menu-label:first-of-type) {
    --display-divider: none;
  }

  /*
   * #368: Hide the checkmarks for menu items
   * when no syn-menu-item[checkbox] or loading is present
   */
  .menu--no-checkmarks::slotted(syn-menu-item) {
    --display-checkmark: none;
  }
`;
