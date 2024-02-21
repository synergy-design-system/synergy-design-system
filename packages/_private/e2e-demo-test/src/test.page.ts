/**
 * @copyright
 * Copyright(c) 2020 SICK AG
 */

import { Locator, Page, Response } from '@playwright/test';
import locators from './test.selector';

/**
 * Gauge visual regression test class
 */
export default class TestPage {
  /**
   * constructor
   *
   * @param page - _page
   * @param _browser - _browser
   * @param _scriptName - _scriptName
   */
  constructor(private page: Page) {
  }

  /**
   * Load url page promise
   */
  async goto(url: string): Promise<Response | null> {
    return this.page.goto(url);
  }

  get form(): Locator {
    return this.page.locator(locators.formLoc);
  }

  get additionalInfo(): Locator {
    return this.page.locator(locators.addInfoLoc);
  }

  get email(): Locator {
    return this.page.locator(locators.emailLoc);
  }

  get gender(): Locator {
    return this.page.locator(locators.genderLoc);
  }

  get name(): Locator {
    return this.page.locator(locators.nameLoc);
  }

  get newsSyn(): Locator {
    return this.page.locator(locators.newsLocSyn);
  }

  get newsNg(): Locator {
    return this.page.locator(locators.newsLocSynNg);
  }

  get newsReact(): Locator {
    return this.page.locator(locators.newsLocSynReact);
  }

  get newsVue(): Locator {
    return this.page.locator(locators.newsLocSynVue);
  }

  get newsVanilla(): Locator {
    return this.page.locator(locators.newsLocVanilla);
  }

  get newsBeta(): Locator {
    return this.page.locator(locators.newsLocBeta);
  }

  get allNews(): Array<Locator> {
    return [
      this.newsBeta,
      this.newsNg,
      this.newsReact,
      this.newsSyn,
      this.newsVanilla,
      this.newsVue,
    ];
  }

  get password(): Locator {
    return this.page.locator(locators.passLoc);
  }

  get passwordRecovery(): Locator {
    return this.page.locator(locators.passRcvryLoc);
  }

  get phone(): Locator {
    return this.page.locator(locators.phoneLoc);
  }

  get role(): Locator {
    return this.page.locator(locators.roleLoc);
  }

  get topics(): Locator {
    return this.page.locator(locators.topicLoc);
  }

  get submit(): Locator {
    return this.page.locator(locators.submit);
  }

  get reset(): Locator {
    return this.page.locator(locators.reset);
  }

  get birth(): Locator {
    return this.page.locator(locators.birth);
  }

  get allRequiredInputs(): Array<Locator> {
    return [
      this.name,
      this.password,
      this.role,
      this.email,
      this.phone,
      this.gender,
    ];
  }

  get frontend(): Locator {
    return this.page.locator(locators.frontend);
  }

  get angular(): Locator {
    return this.page.locator(locators.angular);
  }
}
