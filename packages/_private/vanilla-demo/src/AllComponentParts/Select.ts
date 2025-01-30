import { html } from 'lit';

export const Select = () => html`
  <syn-select label="Experience" help-text="Please tell us your skill level.">
    <syn-option value="1">Novice</syn-option>
    <syn-option value="2">Intermediate</syn-option>
    <syn-option value="3">Advanced</syn-option>
  </syn-select>
`;
