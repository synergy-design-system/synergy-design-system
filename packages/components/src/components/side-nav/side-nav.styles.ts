import { css } from 'lit';

export default css`
  :host {
    display: contents;
  }



  syn-drawer::part(body), syn-drawer::part(footer) {
    padding: 0;
  }

  .side-nav--has-prefix-icons.side-nav--rail syn-drawer {
    --size: 72px;
  }

  .side-nav__footer-divider{
    --spacing: 0;
    --color: var(--syn-color-neutral-300);
  }
`;
