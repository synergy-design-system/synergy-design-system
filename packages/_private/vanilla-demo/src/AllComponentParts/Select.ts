import type { SynSelect, SynTabShowEvent } from '@synergy-design-system/components';
import { html } from 'lit';

export const Select = () => {
  document.addEventListener('syn-tab-show', (event: SynTabShowEvent) => {
    if (event.detail.name !== 'Select') return;

    const target = event.target as HTMLElement;
    const select = target.shadowRoot?.querySelector('syn-select#level') as SynSelect;

    if (select.dataset.initialized) return;

    select.dataset.initialized = 'true';

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
   <syn-select id="level" label="Experience" help-text="Please tell us your skill level." .value=${'2'}>
    </syn-select>

    <form>
      <syn-select id="form" .value=${'option-1'}>
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2">Option 2</syn-option>
        <syn-option value="option-3">Option 3</syn-option>
      </syn-select>
      <syn-button type="reset">Reset</syn-button>
    </form>
  `;
};
