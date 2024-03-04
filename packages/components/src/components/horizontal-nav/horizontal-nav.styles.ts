import { css } from 'lit';

export default css`
  :host {
    background: rgba(255, 0, 0, 0.3);
    display: block;
  }

  .horizontal-nav {
    display: flex;
    gap: var(--syn-spacing-large);
    padding: 0 var(--syn-spacing-large);
  }

  /**
   * WIP: Priority menu
   */
  .priority-menu {
    position: relative;
  }

  .priority-menu-list {
    background: lightgrey;
    left: -10000px;
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    width: 400px;
  }

  .priority-menu:hover .priority-menu-list {
    left: 0;
  }

  .priority-menu-list li {
    border-bottom: 1px solid grey;
    padding: 16px;
  }

  .priority-menu-list li:last-child {
    border-bottom: 0;
  }
`;
