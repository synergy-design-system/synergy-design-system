import { Page, Response } from '@playwright/test';

/**
 * Gauge visual regression test class
 */
export class PageObject {
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
}
