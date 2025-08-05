import { PageObject } from './PageObject.js';
import { BaseFormObject } from './BaseForm.js';

/**
 * Page object for the app shell
 * This tests the app shell layout and functionality such as header and side-nav
 */
export class AppShellPage extends BaseFormObject {
  protected initialPage: string = PageObject.availablePages.index;
}
