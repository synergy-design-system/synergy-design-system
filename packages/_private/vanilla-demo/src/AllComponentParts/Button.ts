import { html } from 'lit';

export const Button = () => html`
  <div
    style="display: 'flex', gap: 'var(--syn-spacing-medium)"
  >
    <syn-button variant="filled">Filled</syn-button>
    <syn-button variant="outline">Outline</syn-button>
    <syn-button variant="text">Text</syn-button>
  </div>
`;
