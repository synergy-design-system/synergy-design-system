import { html } from 'lit';

export const Tooltip = () => html`
  <syn-tooltip content="This is a tooltip" distance="13" open>
    <syn-button>Hover me</syn-button>
  </syn-tooltip>
`;
