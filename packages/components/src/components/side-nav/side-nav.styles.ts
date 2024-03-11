import { css } from 'lit';

export default css`
  :host {
    display: block;
  }

  /**
   * Syn-drawer styling
   */

  syn-drawer::part(body), syn-drawer::part(footer) {
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
  .side-nav--open.side-nav--fix .side-nav__drawer::part(overlay){
    display: block;
  }

  /**
   * Rail mode
   */
  :not(.side-nav--open).side-nav--has-prefix-icons.side-nav--rail .side-nav__drawer {
    --size: 72px;
  }

  .side-nav--open.side-nav--rail.side-nav--touch .side-nav__drawer::part(overlay){
    display: block;
  }

  /** 
   * Shrink mode 
   */


  /**
   * Footer divider
   */
  .side-nav__footer-divider{
    --spacing: 0;
    --color: var(--syn-color-neutral-300);
  }
`;
