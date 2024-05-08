import { Locator, Page, Response } from '@playwright/test';
import selectors from './test.selector';

/**
 * Gauge visual regression test class
 */
export default class TestPage {
  public page: Page;

  /**
   * constructor
   *
   * @param page - _page
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Load url page promise
   */
  async goto(url: string): Promise<Response | null> {
    return this.page.goto(url);
  }

  get form(): Locator {
    return this.page.locator(selectors.formLoc);
  }

  get additionalInfo(): Locator {
    return this.page.locator(selectors.addInfoLoc);
  }

  get email(): Locator {
    return this.page.locator(selectors.emailLoc);
  }

  get gender(): Locator {
    return this.page.locator(selectors.genderLoc);
  }

  get name(): Locator {
    return this.page.locator(selectors.nameLoc);
  }

  get newsSyn(): Locator {
    return this.page.locator(selectors.newsLocSyn);
  }

  get newsNg(): Locator {
    return this.page.locator(selectors.newsLocSynNg);
  }

  get newsReact(): Locator {
    return this.page.locator(selectors.newsLocSynReact);
  }

  get newsVue(): Locator {
    return this.page.locator(selectors.newsLocSynVue);
  }

  get newsVanilla(): Locator {
    return this.page.locator(selectors.newsLocVanilla);
  }

  get newsBeta(): Locator {
    return this.page.locator(selectors.newsLocBeta);
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
    return this.page.locator(selectors.passLoc);
  }

  get passwordRecovery(): Locator {
    return this.page.locator(selectors.passRcvryLoc);
  }

  get phone(): Locator {
    return this.page.locator(selectors.phoneLoc);
  }

  get role(): Locator {
    return this.page.locator(selectors.roleLoc);
  }

  get topics(): Locator {
    return this.page.locator(selectors.topicLoc);
  }

  get submit(): Locator {
    return this.page.locator(selectors.submit);
  }

  get sidebar(): Locator {
    return this.page.locator(selectors.sidebar);
  }

  get reset(): Locator {
    return this.page.locator(selectors.reset);
  }

  get birth(): Locator {
    return this.page.locator(selectors.birth);
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
    return this.page.locator(selectors.frontend);
  }

  get angular(): Locator {
    return this.page.locator(selectors.angular);
  }
}
