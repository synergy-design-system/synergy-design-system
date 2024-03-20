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
    flex: 1;
    gap: var(--syn-spacing-large);
    overflow: hidden;    
    padding: var(--navigation-spacing);
  }

  /**
   * Slotted nav items use a custom color to make them work in <syn-header />
   */
  ::slotted(syn-nav-item) {
    --border-bottom-hover-color: var(--syn-color-neutral-400);
  }

  /**
   * Priority Menu adjustments
   */
  .priority-menu--hidden {
    visibility: hidden;
  }
`;
