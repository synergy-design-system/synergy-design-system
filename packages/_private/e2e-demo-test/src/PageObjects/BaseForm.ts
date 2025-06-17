import { PageObject } from './PageObject.js';
import selectors from '../test.selector';

export class BaseFormObject extends PageObject {
  get additionalInfo() {
    return this.page.locator(selectors.addInfoLoc);
  }

  get form() {
    return this.page.locator(selectors.formLoc);
  }

  get birth() {
    return this.page.locator(selectors.birth);
  }

  get name() {
    return this.page.locator(selectors.nameLoc);
  }

  get nationality() {
    return this.page.locator(selectors.nationalityLoc);
  }

  get submit() {
    return this.page.locator(selectors.submit);
  }

  get reset() {
    return this.page.locator(selectors.reset);
  }

  get email() {
    return this.page.locator(selectors.emailLoc);
  }

  get experience() {
    return this.page.locator(selectors.experienceLoc);
  }

  get experienceLittle() {
    return this.page.locator(selectors.experienceLittle);
  }

  get password() {
    return this.page.locator(selectors.passLoc);
  }

  get passwordRecovery() {
    return this.page.locator(selectors.passRecoveryLoc);
  }

  get gender() {
    return this.page.locator(selectors.genderLoc);
  }

  get role() {
    return this.page.locator(selectors.roleLoc);
  }

  get frontend() {
    return this.page.locator(selectors.frontend);
  }

  get newsBeta() {
    return this.page.locator(selectors.newsLocBeta);
  }

  get newsSyn() {
    return this.page.locator(selectors.newsLocSyn);
  }

  /**
   * Because who wouldn't want to get happiness? 🤷‍♂️
   */
  get happiness() {
    return this.page.locator(selectors.happinessLoc);
  }
}
