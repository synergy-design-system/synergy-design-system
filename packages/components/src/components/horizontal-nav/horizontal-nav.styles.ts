import { css } from 'lit';

export default css`
  :host {
    /**
     * The inner padding to use for the wrapper
     */
    --navigation-spacing: 0 var(--syn-spacing-large);

    display: block;
  }

  .horizontal-nav {
    display: flex;
    padding: var(--navigation-spacing);
  }

  /**
   * The wrapper that holds the default slot
   */
  .horizontal-nav-items {
    display: flex;
    flex: 1;
    gap: var(--syn-spacing-large);
    overflow: hidden;
  }

  /**
   * Slotted nav items use a custom color
   */
  ::slotted(syn-nav-item) {
    --border-bottom-hover-color: var(--syn-color-neutral-400);
  }

  /**
   * Priority Menu adjustments
   * @todo: Remove when <syn-dropdown /> is available
   */
  .priority-menu {
    position: relative;
    transform: translate(0, 0);
  }

  .priority-menu--hidden {
    visibility: hidden;
  }

  .priority-menu__list {
    background: var(--syn-color-neutral-0);
    border: var(--syn-panel-border-width) solid var(--syn-panel-border-color);
    box-shadow: var(--syn-shadow-medium);
    position: absolute;
    right: 0;
    width: 300px;
  }
`;
