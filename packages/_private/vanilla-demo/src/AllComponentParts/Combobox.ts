import { html } from 'lit';
import type { SynCombobox, SynTabShowEvent } from '@synergy-design-system/components';

export const Combobox = () => {
  document.addEventListener('syn-tab-show', (event: SynTabShowEvent) => {
    if (event.detail.name !== 'Combobox') return;

    const target = event.target as HTMLElement;
    const combobox = target.shadowRoot?.querySelector('syn-combobox#level-813') as SynCombobox;

    if (combobox.dataset.initialized) return;

    combobox.dataset.initialized = 'true';

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
      combobox.appendChild(option1);
      combobox.appendChild(option2);
      combobox.appendChild(option3);
    }, 0);
  });

  return html`
    <syn-combobox id="combobox-797" value="option-2">
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-combobox>

    <syn-combobox id="level-813" label="Experience" help-text="Please tell us your skill level." .value=${'2'}>
    </syn-combobox>

    <form>
      <syn-combobox id="form-813" .value=${'option-1'}>
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2">Option 2</syn-option>
        <syn-option value="option-3">Option 3</syn-option>
      </syn-combobox>
      <syn-button type="reset">Reset</syn-button>
    </form>
  `;
};
