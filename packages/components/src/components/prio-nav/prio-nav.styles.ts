import { css } from 'lit';

export default css`
  :host {
    /**
     * The inner padding to use for the wrapper
     */
    --navigation-spacing: 0 var(--syn-spacing-large);

    display: block;

    /**
     * Needed because the positioning of the priority menu is absolute
     */
    position: relative !important;
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
   * Note exclude vertical nav items here, as they are usually placed in the priority menu
   */
  ::slotted(syn-nav-item:not([vertical])) {
    --border-bottom-hover-color: var(--syn-color-neutral-400);
  }

  /**
   * Priority Menu adjustments
   */
  .priority-menu--hidden {
    visibility: hidden;
  }

  .priority-menu__label {
    display: none;
  }

  .priority-menu__label--visible {
    display: block;
  }
`;
