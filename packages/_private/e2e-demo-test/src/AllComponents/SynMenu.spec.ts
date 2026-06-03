import { expect, test } from '@playwright/test';
import { AllComponentsPage } from '../PageObjects/index.js';
import { clickFormControl, createTestCases } from '../helpers.js';

test.describe('<SynMenu />', () => {
  createTestCases(({ name, port }) => {
    test.describe(`Regression#1295: ${name}`, () => {
      test('should not steal focus when hovering over the menu', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);
        await AllComponents.loadInitialPage();
        await AllComponents.activateItem('menuLink');

        const rootElement = AllComponents.getLocator('menu1295StealsFocus');

        await expect(rootElement).toBeVisible();

        // Focus the input before hovering over the menu
        const input = rootElement.locator('syn-input');
        await clickFormControl(input);
        await expect(input).toBeFocused();

        // Hover over the menu item and check if the input is still focused
        const menuItem = rootElement.locator('syn-menu syn-menu-item:first-child');
        await menuItem.hover();
        await expect(input).toBeFocused();
      });
    }); // regression#1295
  }); // End frameworks
}); // </syn-menu>
