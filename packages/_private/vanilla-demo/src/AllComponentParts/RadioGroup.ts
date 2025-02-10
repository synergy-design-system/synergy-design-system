import { html } from 'lit';

export const RadioGroup = () => html`
  <syn-radio-group
    help-text="This is the help-text"
    label="This is a label"
  >
    <syn-radio value="1">Option</syn-radio>
    <syn-radio value="2">Option</syn-radio>
    <syn-radio value="3">Option</syn-radio>
  </syn-radio-group>
`;
