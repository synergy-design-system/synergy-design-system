import { Page, Response } from '@playwright/test';

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
}
