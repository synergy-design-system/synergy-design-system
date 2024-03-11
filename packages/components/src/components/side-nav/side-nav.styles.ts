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
  * Footer divider
  */

  .side-nav__footer-divider{
    --spacing: 0;
    --color: var(--syn-color-neutral-300);
  }

  /**
  * Rail mode
  */
  .side-nav--has-prefix-icons.side-nav--rail:not(.side-nav--rail-hover) .side-nav__drawer {
    --size: 72px;
  }

  .side-nav--rail-touch.side-nav--rail-hover .side-nav__drawer::part(overlay){
    display: block;
  }
`;
