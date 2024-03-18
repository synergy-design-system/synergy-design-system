import { css } from 'lit';

export default css`
  :host {
    --side-nav-size: 25rem;

    display: block;
  }

  


  /**
   * Syn-drawer styling
   */
  .side-nav__drawer {
    --size: var(--side-nav-size);
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
  .side-nav--open.side-nav--fix .side-nav__drawer::part(overlay){
    display: block;
  }

  /**
   * Rail mode
   */
  :not(.side-nav--open).side-nav--has-prefix-icons.side-nav--rail .side-nav__drawer {
    --side-nav-size: 4.5rem;
  }

  .side-nav--open.side-nav--rail.side-nav--touch .side-nav__drawer::part(overlay){
    display: block;
  }

  /**
   * Hide the scrollbars in closed rail mode
   */ 
  :not(.side-nav--open).side-nav--has-prefix-icons.side-nav--rail .side-nav__drawer::part(body){
    overflow: hidden;
  }

  /**
   * Footer divider
   */
  .side-nav__footer-divider{
    --spacing: 0;
    --color: var(--syn-color-neutral-300);
  }

  :not(.side-nav--open).side-nav--has-prefix-icons.side-nav--rail ::slotted(syn-nav-item){
    --display-children: none;
  }
`;
