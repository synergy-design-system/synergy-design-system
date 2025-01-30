import { html } from 'lit';

export const Badge = () => html`
  <div
    style="display: flex; gap: var(--syn-spacing-large)"
  >
    <syn-badge variant="primary">primary</syn-badge>
    <syn-badge variant="success">success</syn-badge>
    <syn-badge variant="neutral">neutral</syn-badge>
    <syn-badge variant="warning">warning</syn-badge>
    <syn-badge variant="danger">danger</syn-badge>
  </div>
`;
