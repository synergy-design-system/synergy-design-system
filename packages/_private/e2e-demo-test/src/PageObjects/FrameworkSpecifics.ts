import { PageObject } from './PageObject.js';
import selectors from '../test.selector.js';

export class FrameworkSpecificsPage extends PageObject {
  protected initialPage = PageObject.availablePages.frameworkSpecifics;

  async activateItem(locator: keyof typeof selectors) {
    if (!locator.endsWith('Link')) {
      throw new Error('Only links can be used for activation!');
    }
    const foundLocator = this.getLocator(locator);
    await foundLocator.click();
  }

  getLocator(locator: keyof typeof selectors) {
    const locatorFound = selectors[locator];

    if (typeof locatorFound === 'undefined') {
      throw new Error(`Locator not found: ${locator}`);
    }
    return this.page.locator(selectors[locator]);
  }
}
