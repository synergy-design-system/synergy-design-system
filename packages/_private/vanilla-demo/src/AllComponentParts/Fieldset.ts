import { html } from 'lit';

export const Fieldset = () => html`
  <syn-fieldset
    description="This is a fieldset with a legend and description."
    legend="Fieldset Legend"
  >
    <syn-input label="Input 1"></syn-input>
    <syn-input label="Input 2"></syn-input>
    <syn-input label="Input 3"></syn-input>
  </syn-fieldset>
`;
