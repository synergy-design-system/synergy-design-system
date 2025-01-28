import { PageObject } from './PageObject.js';
import selectors from '../test.selector';

export class AllComponentsPage extends PageObject {
  protected initialPage = PageObject.availablePages.allComponents;

  getLocator(locator: keyof typeof selectors) {
    const locatorFound = selectors[locator];

    if (typeof locatorFound === 'undefined') {
      throw new Error(`Locator not found: ${locator}`);
    }
    return this.page.locator(selectors[locator]);
  }
}
