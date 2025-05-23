import { html } from 'lit';
import type { RegressionFns } from '../all-components-regressions';

export const Combobox = (regressions: RegressionFns = []) => {
  regressions.forEach((regression) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    regression();
  });

  return html`
    <syn-combobox data-testid="combobox-797" value="option-2">
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-combobox>

    <syn-combobox data-testid="combobox-level-813" label="Experience" help-text="Please tell us your skill level." .value=${'2'}>
    </syn-combobox>

    <form>
      <syn-combobox data-testid="combobox-form-813" .value=${'option-1'}>
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2">Option 2</syn-option>
        <syn-option value="option-3">Option 3</syn-option>
      </syn-combobox>
      <syn-button type="reset">Reset</syn-button>
    </form>
  `;
};
