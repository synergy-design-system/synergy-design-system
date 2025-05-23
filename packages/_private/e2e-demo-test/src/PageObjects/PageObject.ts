import { Locator, Page, Response } from '@playwright/test';
import selectors from '../test.selector';

/**
 * Basic page object
 */
export class PageObject {
  /**
   * List of available pages
   */
  static availablePages = {
    allComponents: '/all-components',
    form: '/contact-form',
    formValidate: '/contact-form-validate',
    frameworkSpecifics: '/framework-specific',
    index: '/',
  };

  public page: Page;

  protected port: number;

  protected initialPage: string = PageObject.availablePages.index;

  /**
   * constructor
   *
   * @param page - _page
   */
  constructor(page: Page, port: number) {
    this.page = page;
    this.port = port;
  }

  /**
   * Load url page promise
   */
  async goto(url: string): Promise<Response | null> {
    return this.page.goto(url);
  }

  async loadInitialPage() {
    const url = `http://localhost:${this.port}${this.initialPage}`;
    return this.goto(url);
  }

  get themeSwitch() {
    return this.page.locator(selectors.themeSwitch);
  }

  public getSizeToggle(size: 'small' | 'medium' | 'large'): Locator {
    switch (size) {
    case 'small':
      return this.page.locator(selectors.sizeToggleSmall);
    case 'medium':
      return this.page.locator(selectors.sizeToggleMedium);
    case 'large':
      return this.page.locator(selectors.sizeToggleLarge);
    default:
      throw new Error('Invalid size');
    }
  }
}
