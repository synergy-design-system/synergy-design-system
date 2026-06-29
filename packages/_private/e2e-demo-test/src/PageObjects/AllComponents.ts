import { PageObject } from './PageObject.js';
import selectors from '../test.selector.js';

export class AllComponentsPage extends PageObject {
  protected initialPage = PageObject.availablePages.allComponents;

  async activateItem(locator: keyof typeof selectors) {
    if (!locator.endsWith('Link')) {
      throw new Error('Only links can be used for activation!');
    }
    const foundLocator = this.getLocator(locator);
    await foundLocator.click();

    const panelName = await foundLocator.evaluate((ele: HTMLElement & { panel?: string }) => ele.panel || ele.getAttribute('panel') || '');
    if (!panelName) {
      throw new Error(`Unable to resolve panel for locator: ${String(locator)}`);
    }
  }
}
