import { html } from 'lit';

export const OptGroup = () => html`
  <syn-select>
    <syn-optgroup label="Section 1">
      <syn-option value="1">Option 1</syn-option>
      <syn-option value="2">Option 2</syn-option>
      <syn-option value="3">Option 3</syn-option>
    </syn-optgroup>

    <syn-optgroup label="Section 2">
      <syn-option value="4">Option 4</syn-option>
      <syn-option value="5" disabled>Option 5</syn-option>
      <syn-option value="6">Option 6</syn-option>
    </syn-optgroup>

    <syn-optgroup disabled label="Section 3 (disabled)">
      <syn-option value="7">Option 7</syn-option>
      <syn-option value="8" disabled>Option 8</syn-option>
      <syn-option value="9">Option 9</syn-option>
    </syn-optgroup>
  </syn-select>
`;
