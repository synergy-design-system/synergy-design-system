import { SynDialog, SynTabShowEvent } from '@synergy-design-system/components';
import type { LitElement } from 'lit';

const getAllComponentsElement = async () => {
  const allComponents = document.querySelector('demo-all-components') as LitElement;
  await allComponents.updateComplete;
  return allComponents;
};

const appendOptions813 = async (querySelector: string) => {
  const allComponents = await getAllComponentsElement();
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  const element = allComponents?.shadowRoot?.querySelector(querySelector) as LitElement;

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
    element.appendChild(option1);
    element.appendChild(option2);
    element.appendChild(option3);
  }, 0);
};

export const allComponentsRegressions = new Map(Object.entries({
  Combobox: [
    // #813
    () => appendOptions813('syn-combobox[data-testid="combobox-level-813"]'),
  ],
  Dialog: [
    // Open the dialog when dialog tab is clicked
    async () => {
      const allComponents = await getAllComponentsElement();
      allComponents.addEventListener('syn-tab-show', (e: SynTabShowEvent) => {
        const { name } = e.detail;
        if (name === 'Dialog') {
          const dialog = allComponents.shadowRoot?.querySelector('syn-dialog') as SynDialog;
          dialog.open = true;
        }
      });
    },
  ],
  Select: [
    // #813
    () => appendOptions813('syn-select[data-testid="select-level-813"]'),
  ],
}));
