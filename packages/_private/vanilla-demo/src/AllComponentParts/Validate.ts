import { html } from 'lit';

export const Validate = () => html`
  <syn-validate eager variant="inline" on="live">
    <syn-input
      label="Invalid input"
      type="email"
      value=""
      required
    ></syn-input>
  </syn-validate>
`;
