import { css } from 'lit';

export default css`
  :host {
    --body-spacing: var(--syn-spacing-medium) var(--syn-spacing-large);
    --footer-spacing: var(--syn-spacing-medium) var(--syn-spacing-large) var(--syn-spacing-large);
  }

  .drawer__panel {
    box-shadow: none;
  }

  .drawer__header-actions {
    padding-right: var(--syn-spacing-small);
  }

  .drawer__title {
    padding-bottom: 0;
  }
`;
