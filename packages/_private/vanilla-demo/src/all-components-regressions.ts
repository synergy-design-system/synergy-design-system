import type { LitElement } from 'lit';
import type {
  SynButton,
  SynDialog,
  SynTabGroup,
  SynTabShowEvent,
} from '@synergy-design-system/components';
import { mockAsyncData, mockData } from '@synergy-design-system/demo-utilities';

const getAllComponentsElement = async () => {
  const allComponents = document.querySelector('demo-template') as LitElement;
  await allComponents.updateComplete;
  return allComponents;
};

const appendOptions805 = async (querySelector: string) => {
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

const appendOptions813 = async (querySelector: string) => {
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

export type RegressionFn = () => Promise<void> | void;
export type RegressionFns = RegressionFn[];
export type Regressions = Map<string, RegressionFns>;

export const allComponentsRegressions: Regressions = new Map(Object.entries({
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
    // #540
    () => appendOptions813('syn-select[data-testid="select-540-delimiter"]'),
    () => appendOptions805('syn-select[data-testid="select-805-single-select"]'),
    () => appendOptions805('syn-select[data-testid="select-805-multi-select"]'),
    // #813
    () => appendOptions813('syn-select[data-testid="select-level-813"]'),
    // #847
    () => appendOptions813('syn-select[data-testid="select-847-multiple"]'),
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
}));
