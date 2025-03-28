import type { SynSelect } from '@synergy-design-system/components';
import { type LitElement, html } from 'lit';

export const Select = () => {
  const allComponents = document.querySelector('demo-all-components') as LitElement;
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  allComponents.updateComplete.then(() => {
    const select = allComponents?.shadowRoot?.querySelector('syn-select[data-testid="select-level-813"]') as SynSelect;

    setTimeout(() => {
      const option1 = document.createElement('syn-option');
      option1.value = '1';
      option1.textContent = 'Novice';
      const option2 = document.createElement('syn-option');
      option2.value = '2';
      option2.textContent = 'Intermediate';
      const option3 = document.createElement('syn-option');
      option3.value = '3';
      option3.textContent = 'Advanced';
      select.appendChild(option1);
      select.appendChild(option2);
      select.appendChild(option3);
    }, 0);
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
