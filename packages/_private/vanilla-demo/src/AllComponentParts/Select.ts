import { html } from 'lit';

export const Select = (regressions: Array< () => void> = []) => {
  regressions.forEach((regression) => {
    regression();
  });

  return html`
   <syn-select data-testid="select-level-813" label="Experience" help-text="Please tell us your skill level." .value=${'2'}>
    </syn-select>

    <form>
      <syn-select data-testid="select-form-813" .value=${'option-1'}>
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2">Option 2</syn-option>
        <syn-option value="option-3">Option 3</syn-option>
      </syn-select>
      <syn-button type="reset">Reset</syn-button>
    </form>
  `;
};
