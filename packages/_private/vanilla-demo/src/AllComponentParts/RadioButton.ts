import { html } from 'lit';

export const RadioButton = () => html`
  <syn-radio-group
    help-text="This is the help-text"
    label="This is a label"
  >
    <syn-radio-button value="option1">Option 1</syn-radio-button>
    <syn-radio-button value="option2">Option 2</syn-radio-button>
    <syn-radio-button value="option3">Option 3</syn-radio-button>
  </syn-radio-group>
`;
