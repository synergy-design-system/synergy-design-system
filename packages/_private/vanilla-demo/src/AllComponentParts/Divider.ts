import { html } from 'lit';

export const Divider = () => html`
  <div style="text-align: center;">
    Above
    <syn-divider style="--spacing: var(--syn-spacing-large)"></syn-divider>
    Below
  </div>
`;
