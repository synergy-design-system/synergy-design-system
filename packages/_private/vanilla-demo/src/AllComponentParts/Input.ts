import { html } from 'lit';

export const Input = () => html`
  <syn-input
    placeholder="Disabled"
    help-text="Help Text"
    label="Label"
  >
    <syn-icon name="house" slot="prefix"></syn-icon>
    <syn-icon name="chat" slot="suffix"></syn-icon>
  </syn-input>
`;
