import { PageObject } from './PageObject.js';
import selectors from '../test.selector';

export class ComplexBugsPage extends PageObject {
  protected initialPage = PageObject.availablePages.complexBugs;

  async activateItem(locator: keyof typeof selectors) {
    if (!locator.endsWith('Link')) {
      throw new Error('Only links can be used for activation!');
    }
    const foundLocator = this.getLocator(locator);
    await foundLocator.click();
  }
}
