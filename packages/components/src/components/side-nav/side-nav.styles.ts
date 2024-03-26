import { css } from 'lit';

export default css`
  :host {
    --side-nav-open-width: 25rem;
    --side-nav-rail-width: 4.5rem;

    display: block;
  }

  /* Side nav should have a width, so it behave correct in an e.g. display flex context */
  .side-nav:not(.side-nav--rail).side-nav--open {
    width: var(--side-nav-open-width);
  }
  
  /**
   * Side nav should have a width, so it behave correct in an e.g. display flex context.
   * In rail mode the width is always the small rail width, because there should be no shrinking possible of the main content area.
   */
  .side-nav.side-nav--rail {
    width: var(--side-nav-rail-width);
  }



  /**
   * Syn-drawer styling
   */
  .side-nav__drawer {
    --size: var(--side-nav-open-width);
  }
  
  .side-nav__drawer::part(base){
    position: absolute;
  }

  .side-nav__drawer::part(body), .side-nav__drawer::part(footer) {
    padding: 0;
  }

  /** 
   * Overlay 
   */
  .side-nav__drawer::part(overlay){
    position: absolute;
  }

  /**
   * Fixed mode
   */
  .side-nav--fix .side-nav__drawer::part(overlay){
    display: block;
  }

  /**
   * Rail mode
   */
  :not(.side-nav--open).side-nav--rail .side-nav__drawer {
    --size: var(--side-nav-rail-width);
  }

  .side-nav--open.side-nav--rail.side-nav--touch .side-nav__drawer::part(overlay){
    display: block;
  }

  /**
   * Hide the scrollbars in closed rail mode
   */ 
  :not(.side-nav--open).side-nav--rail .side-nav__drawer::part(body){
    overflow: hidden;
  }

  /**
   * Footer divider
   */
  .side-nav__footer-divider{
    --spacing: 0;
    --color: var(--syn-color-neutral-300);
  }

  :not(.side-nav--open).side-nav--rail ::slotted(syn-nav-item){
    --display-children: none;
  }
`;
