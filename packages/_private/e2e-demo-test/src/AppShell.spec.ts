import { expect, test } from '@playwright/test';
import {
  type SynSideNav,
} from '@synergy-design-system/components';
import { AppShellPage } from './PageObjects/index.js';
import {
  createTestCases,
  setPropertyForLocator,
} from './helpers.js';

// Default application shell tests
test.describe('AppShell', () => {
  test.describe('<SynHeader>', () => {
    createTestCases(({ name, port }) => {
      test.describe(`Regression#921: ${name}`, () => {
        test('should allow to close connected <SynSideNav> when using variant="default" and sub menus are opened or closed', async ({ browserName, page }) => {
          // Webkit is having issues with the burger menu toggle
          // It reports false positives half the time for the burger menu state
          // Therefore, we skip this test in webkit
          test.skip(browserName === 'webkit', 'Not supported in Safari/WebKit');

          const appShell = new AppShellPage(page, port);
          await appShell.loadInitialPage();

          const header = await appShell.getLocator('appHeader');
          const sideNav = await appShell.getLocator('appSideNav');
          const header921 = await appShell.getLocator('header921NavItem');

          // Assert that everything works as expected
          await expect(header).toBeVisible();
          await expect(sideNav).toBeVisible();

          // Toggle the side nav to use the burger menu
          await setPropertyForLocator<SynSideNav>(sideNav, 'variant', 'default');

          // Check that the initial state is correct
          await expect(sideNav).toBeHidden();
          await expect(sideNav).toHaveAttribute('variant', 'default');
          await expect(header).toHaveAttribute('burger-menu', 'closed');

          // Open the side nav
          await setPropertyForLocator<SynSideNav>(sideNav, 'open', true);

          await expect(sideNav).toBeVisible();
          await expect(header).toHaveAttribute('burger-menu', 'open');
          await expect(header921).toBeVisible();

          // Click the defect nested syn-nav-item.
          // With the bug present, the side nav will not close
          // when the header burger menu toggle is used
          await expect(header).toHaveAttribute('burger-menu', 'open');

          // I would have liked to click the <summary> itself, but webkit does not let me :(
          await header921.locator('.nav-item__content').first().click();

          await expect(header921).not.toHaveAttribute('open');

          // Now, we try to toggle the side nav via the burger menu button
          await header.locator('.header__burger-menu-toggle').click();

          await expect(header).toHaveAttribute('burger-menu', 'closed');
          await expect(sideNav).toBeHidden();
        });
      });
    });
  });
});
