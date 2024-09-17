import { Locator } from '@playwright/test';
import { PageObject } from './PageObject.js';
import selectors from '../test.selector';

export class BaseFormObject extends PageObject {
  get form(): Locator {
    return this.page.locator(selectors.formLoc);
  }

  get name(): Locator {
    return this.page.locator(selectors.nameLoc);
  }

  get submit(): Locator {
    return this.page.locator(selectors.submit);
  }

  get reset(): Locator {
    return this.page.locator(selectors.reset);
  }

  get email(): Locator {
    return this.page.locator(selectors.emailLoc);
  }

  get password(): Locator {
    return this.page.locator(selectors.passLoc);
  }

  get gender(): Locator {
    return this.page.locator(selectors.genderLoc);
  }

  get role(): Locator {
    return this.page.locator(selectors.roleLoc);
  }

  get frontend(): Locator {
    return this.page.locator(selectors.frontend);
  }

  /**
   * Because who wouldn't want to get happiness? 🤷‍♂️
   */
  get happiness(): Locator {
    return this.page.locator(selectors.happinessLoc);
  }
}
