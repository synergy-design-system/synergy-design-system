import { html } from 'lit';

export const Option = () => html`
  <syn-select label="Select one">
    <syn-option value="Option_1" tabindex="0">Option 1</syn-option>
    <syn-option value="Option_2">Option 2</syn-option>
    <syn-option value="Option_3">Option 3</syn-option>
  </syn-select>
`;
