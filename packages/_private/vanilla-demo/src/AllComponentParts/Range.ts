import { html } from 'lit';

export const Range = () => html`
  <syn-range
    help-text="Controls the volume of the current song"
    label="Volume"
    max="100"
    min="0"
    value="50"
  >
    <span slot="prefix">0</span>
    <span slot="suffix">100</span>
  </syn-range>

  <syn-range
    data-testid="range-540-delimiter"
    delimiter="|"
    help-text="This range uses a custom delimiter"
    label="Multiple with custom delimiter"
    max="100"
    min="0"
    value="20|80"
  ></syn-range>
`;
