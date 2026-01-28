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

/**
 * Retrieves the main demo template element and waits for it to be ready.
 * This function ensures that the demo template component has completed its
 * update cycle before returning it.
 *
 * @returns A promise that resolves to the demo template LitElement
 */
const getAllComponentsElement = async () => {
  const allComponents = document.querySelector('demo-template') as LitElement;
  await allComponents.updateComplete;
  return allComponents;
};

/**
 * Synchronously appends syn-option elements to a target component (syn-combobox or syn-select)
 * using mock data.
 * This function creates syn-option elements based on the provided mock data
 * and appends them to the specified element within the demo template.
 *
 * @param selector - CSS selector to find the target element within the demo template's shadow DOM
 * @param mockDataKey - Key to identify which mock dataset to use for creating options
 */
const appendSyncOptions = async (selector: string, mockDataKey: 'selectItemsWithSpace' | 'selectItemsMixedValue') => {
  const allComponents = await getAllComponentsElement();
  const element = allComponents?.shadowRoot?.querySelector(selector) as LitElement;

  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => setTimeout(resolve, 0));

  const items = mockData(mockDataKey);
  items.forEach(item => {
    const option = document.createElement('syn-option');
    option.value = item.value;
    option.textContent = item.label;
    element.appendChild(option);
  });
};

/**
 * Asynchronously appends syn-option elements to a target component (syn-select or syn-combobox)
 * using async mock data.
 * This function waits for mock data to load, then creates syn-option elements
 * and appends them to the specified element within the demo template.
 *
 * @param selector - CSS selector to find the target element within the demo template's shadow DOM
 * @param mockDataKey - Key to identify which async mock dataset to use for creating options
 */
const appendAsyncOptions = async (selector: string, mockDataKey: 'selectItems') => {
  const allComponents = await getAllComponentsElement();
  const element = allComponents?.shadowRoot?.querySelector(selector) as LitElement;

  const items = await mockAsyncData(mockDataKey);
  items.forEach(item => {
    const option = document.createElement('syn-option');
    option.value = item.value;
    option.textContent = item.label;
    element.appendChild(option);
  });
};

/**
 * Sets an asynchronously loaded value for an element  especially (syn-select or syn-combobox).
 * This function retrieves mock data asynchronously and assigns it as the
 * value of the specified component.
 *
 * @param selector - CSS selector to find the target element within the template's shadow DOM
 * @param mockValueKey - Key to identify which async mock value to use (default: 'valueWithSpace')
 */
const addAsyncValueForSelect = async (selector: string, mockValueKey: 'valueWithSpace' = 'valueWithSpace') => {
  const allComponents = await getAllComponentsElement();
  const element = allComponents?.shadowRoot?.querySelector(selector) as SynSelect;
  const value = await mockAsyncData(mockValueKey);
  element.value = value;
};

/**
 * Sets up custom validation behavior for a syn-validate component.
 * This function adds an event listener to handle input changes and
 * triggers custom validation with an error message for testing purposes.
 *
 * @returns A promise that resolves when the validation setup is complete
 */
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
    () => appendAsyncOptions('syn-combobox[data-testid="combobox-level-813"]', 'selectItems'),
    // #626
    () => appendAsyncOptions('syn-combobox[data-testid="combobox-626-async"]', 'selectItems'),
    // #847
    () => appendAsyncOptions('syn-combobox[data-testid="combobox-847-multiple"]', 'selectItems'),
    // #1036
    () => appendSyncOptions('syn-combobox[data-testid="combobox-1036-subsequently-changed-delimiter"]', 'selectItemsWithSpace'),
    // #1056
    () => addAsyncValueForSelect('syn-combobox[data-testid="combobox-1056-async-delimiter-change-with-async-pre-value"]', 'valueWithSpace'),
    () => appendSyncOptions('syn-combobox[data-testid="combobox-1056-async-delimiter-change-with-pre-value"]', 'selectItemsWithSpace'),
    () => appendSyncOptions('syn-combobox[data-testid="combobox-1056-async-delimiter-change-with-async-pre-value"]', 'selectItemsWithSpace'),
    // #627
    () => appendAsyncOptions('syn-combobox[data-testid="combobox-627-delimiter"]', 'selectItems'),
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
    () => appendAsyncOptions('syn-select[data-testid="select-540-delimiter"]', 'selectItems'),
    () => appendSyncOptions('syn-select[data-testid="select-805-single-select"]', 'selectItemsMixedValue'),
    () => appendSyncOptions('syn-select[data-testid="select-805-multi-select"]', 'selectItemsMixedValue'),

    // #813
    () => appendAsyncOptions('syn-select[data-testid="select-level-813"]', 'selectItems'),
    // #847
    () => appendAsyncOptions('syn-select[data-testid="select-847-multiple"]', 'selectItems'),
    // #1036
    () => appendSyncOptions('syn-select[data-testid="select-1036-subsequently-changed-delimiter"]', 'selectItemsWithSpace'),
    // #1056
    () => addAsyncValueForSelect('syn-select[data-testid="select-1056-async-delimiter-change-with-async-pre-value"]'),
    () => appendSyncOptions('syn-select[data-testid="select-1056-async-delimiter-change-with-pre-value"]', 'selectItemsWithSpace'),
    () => appendSyncOptions('syn-select[data-testid="select-1056-async-delimiter-change-with-async-pre-value"]', 'selectItemsWithSpace'),
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
