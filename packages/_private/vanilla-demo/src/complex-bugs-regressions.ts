import type { LitElement } from 'lit';
import type { SynButton, SynDrawer } from '@synergy-design-system/components';
import { Regressions } from './all-components-regressions';

/**
 * Retrieves the main demo template element and waits for it to be ready.
 * This function ensures that the demo template component has completed its
 * update cycle before returning it.
 *
 * @returns A promise that resolves to the demo template LitElement
 */
const getComplexBugsElement = async () => {
  const complexBugs = document.querySelector('demo-template') as LitElement;
  await complexBugs.updateComplete;
  return complexBugs;
};

/**
 * Opens the drawer via button click
 *
 * @returns A promise that resolves when the validation setup is complete
 */
const addOpenDrawerListener = async (buttonSelector: string) => {
  const allComponents = await getComplexBugsElement();
  const button = allComponents?.shadowRoot?.querySelector(buttonSelector) as SynButton;
  const drawer = button.nextElementSibling as SynDrawer;
  button.addEventListener('click', () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    drawer.show();
  });
};

export const complexBugsRegressions: Regressions = new Map(Object.entries({
  Bug1304NestedDrawer: [
    // #1304
    () => addOpenDrawerListener('syn-button[data-testid="nested-btn-1304"]'),
  ],
  Bug1304SingleDrawer: [
    // #1304
    () => addOpenDrawerListener('syn-button[data-testid="single-btn-1304"]'),
  ],
}));
