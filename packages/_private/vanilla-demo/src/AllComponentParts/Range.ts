import { html } from 'lit';
import { range1272ChangeValueButton } from '@synergy-design-system/demo-utilities';

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
    data-testid="range-1272-programatic-value-change"
    label="Regression #1272"
    max="100"
    min="0"
    value="50"
  ></syn-range>
  <syn-button
    data-testid="range-1272-change-value-button"
    @click=${range1272ChangeValueButton}
  >Programatically set value</syn-button>
`;
