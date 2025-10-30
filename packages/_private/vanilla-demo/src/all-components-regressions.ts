import type { LitElement } from 'lit';
import type {
  SynButton,
  SynDialog,
  SynInput,
  SynSelect,
  SynTabGroup,
  SynTabShowEvent,
  SynValidate,
} from '@synergy-design-system/components';
import { mockAsyncData, mockData } from '@synergy-design-system/demo-utilities';

const getAllComponentsElement = async () => {
  const allComponents = document.querySelector('demo-template') as LitElement;
  await allComponents.updateComplete;
  return allComponents;
};

const appendOptionsWithSpace = async (querySelector: string) => {
  const allComponents = await getAllComponentsElement();
  const element = allComponents?.shadowRoot?.querySelector(querySelector) as LitElement;

  const items = mockData('selectItemsWithSpace');
  items.forEach(item => {
    const option = document.createElement('syn-option');
    option.value = item.value;
    option.textContent = item.label;
    element.appendChild(option);
  });
};

const appendOptionsWithMixedIds = async (querySelector: string) => {
  const allComponents = await getAllComponentsElement();
  const element = allComponents?.shadowRoot?.querySelector(querySelector) as LitElement;

  const items = mockData('selectItemsMixedId');
  items.forEach(item => {
    const option = document.createElement('syn-option');
    option.value = item.id;
    option.textContent = item.label;
    element.appendChild(option);
  });
};

const appendOptionsForLevels = async (querySelector: string) => {
  const allComponents = await getAllComponentsElement();
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  const element = allComponents?.shadowRoot?.querySelector(querySelector) as LitElement;

  const items = await mockAsyncData('selectItems');
  items.forEach(item => {
    const option = document.createElement('syn-option');
    option.value = item.value;
    option.textContent = item.label;
    element.appendChild(option);
  });
};

const addAsyncValueForSelect = async (querySelector: string) => {
  const allComponents = await getAllComponentsElement();
  const element = allComponents?.shadowRoot?.querySelector(querySelector) as SynSelect;
  const value = await mockAsyncData('valueWithSpace');
  element.value = value;
};

const revalidateValidate = async () => {
  const allComponents = await getAllComponentsElement();
  const validate = allComponents?.shadowRoot?.querySelector('syn-validate[data-testid="validate-915"]') as SynValidate;
  const input = validate.querySelector('syn-input') as SynInput;
  input.addEventListener('syn-change', () => {
    validate.customValidationMessage = 'Invalid value';
    input.dispatchEvent(new CustomEvent('revalidate'));
  });
};

export type RegressionFn = () => Promise<void> | void;
export type RegressionFns = RegressionFn[];
export type Regressions = Map<string, RegressionFns>;

export const allComponentsRegressions: Regressions = new Map(Object.entries({
  Combobox: [
    // #813
    () => appendOptionsForLevels('syn-combobox[data-testid="combobox-level-813"]'),
    // #626
    () => appendOptionsForLevels('syn-combobox[data-testid="combobox-626-async"]'),
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
    // #540
    () => appendOptionsForLevels('syn-select[data-testid="select-540-delimiter"]'),
    () => appendOptionsWithMixedIds('syn-select[data-testid="select-805-single-select"]'),
    () => appendOptionsWithMixedIds('syn-select[data-testid="select-805-multi-select"]'),
    // #813
    () => appendOptionsForLevels('syn-select[data-testid="select-level-813"]'),
    // #847
    () => appendOptionsForLevels('syn-select[data-testid="select-847-multiple"]'),
    // #1036
    () => appendOptionsWithSpace('syn-select[data-testid="select-1036-subsequently-changed-delimiter"]'),
    // #1056
    () => addAsyncValueForSelect('syn-select[data-testid="select-1056-async-delimiter-change-with-async-pre-value"]'),
    () => appendOptionsWithSpace('syn-select[data-testid="select-1056-async-delimiter-change-with-pre-value"]'),
    () => appendOptionsWithSpace('syn-select[data-testid="select-1056-async-delimiter-change-with-async-pre-value"]'),
  ],
  TabGroup: [
    // #814
    async () => {
      const allComponents = (await getAllComponentsElement()).shadowRoot;
      const tabGroup = allComponents?.querySelector('#tab-content-TabGroup syn-tab-group') as SynTabGroup;
      const addTabButton = allComponents?.querySelector('#tab-content-TabGroup syn-button') as SynButton;
      addTabButton.addEventListener('click', () => {
        const tabs = tabGroup?.querySelectorAll('syn-tab');
        const id = `new-tab-${tabs.length + 1}`;

        const newTab = document.createElement('syn-tab');
        newTab.slot = 'nav';
        newTab.panel = id;
        newTab.active = true;
        newTab.textContent = `New Tab ${tabs.length + 1}`;

        const newTabPanel = document.createElement('syn-tab-panel');
        newTabPanel.name = id;
        newTabPanel.textContent = `This is the new tab panel ${tabs.length + 1}.`;
        tabGroup.appendChild(newTab);
        tabGroup.appendChild(newTabPanel);
      });
    },
  ],
  Validate: [
    // #915
    () => revalidateValidate(),
  ],
}));
