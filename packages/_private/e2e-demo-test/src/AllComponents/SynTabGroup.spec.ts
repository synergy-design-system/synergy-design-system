import { expect, test } from '@playwright/test';
import { AllComponentsPage } from '../PageObjects/index.js';
import { createTestCases } from '../helpers.js';

test.describe('<SynTabGroup />', () => {
  createTestCases(({ name, port }) => {
    test.describe(`Regression#757: ${name}`, () => {
      test('should not trigger the parent tab navigation when activating a subtab', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);
        await AllComponents.loadInitialPage();

        const tabGroupLink = AllComponents.getLocator('tabGroupLink');
        const tabGroupCustom = AllComponents.getLocator('tabGroupCustom');
        const tabGroupGeneral = AllComponents.getLocator('tabGroupGeneral');
        const tabGroupAdvanced = AllComponents.getLocator('tabGroupAdvanced');

        // Check if the active tab is adjusted when navigating
        await expect(tabGroupLink).toHaveJSProperty('active', false);
        await AllComponents.activateItem('tabGroupLink');
        await expect(tabGroupLink).toHaveJSProperty('active', true);

        // Check if the active tab of the given sub tab group is adjusted when navigating
        await expect(tabGroupCustom).toBeVisible();
        await expect(tabGroupCustom).toHaveJSProperty('active', false);
        await expect(tabGroupGeneral).toBeVisible();
        await expect(tabGroupGeneral).toHaveJSProperty('active', false);
        await expect(tabGroupAdvanced).toBeVisible();
        await expect(tabGroupAdvanced).toHaveJSProperty('active', true);

        await tabGroupCustom.click();
        await expect(tabGroupCustom).toHaveJSProperty('active', true);
        await expect(tabGroupAdvanced).toHaveJSProperty('active', false);

        // Finally, check if the parent tab is still active
        await expect(tabGroupLink).toHaveJSProperty('active', true);
      });
    }); // regression#757
    test.describe(`Regression#814: ${name}`, () => {
      test('should show the new added active tab with panel', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);
        await AllComponents.loadInitialPage();
        await AllComponents.activateItem('tabGroupLink');

        const tabGroupAdvanced = await AllComponents.getLocator('tabGroupAdvanced');
        const addTabButton = await AllComponents.getLocator('tabGroupAddTabButton');
        const tabGroupAdded = await AllComponents.getLocator('tabGroupAdded');
        const tabGroupAddedPanel = await AllComponents.getLocator('tabGroupAddedPanel');

        await expect(tabGroupAdvanced).toBeVisible();
        await expect(tabGroupAdvanced).toHaveJSProperty('active', true);
        await expect(tabGroupAdded).toBeHidden();
        await expect(tabGroupAddedPanel).toBeHidden();

        await addTabButton.click();

        // Check that the newly added active tab and panel are visible and have property active=true
        await expect(tabGroupAdvanced).toBeVisible();
        await expect(tabGroupAdvanced).toHaveJSProperty('active', false);
        await expect(tabGroupAdded).toBeVisible();
        await expect(tabGroupAdded).toHaveJSProperty('active', true);
        await expect(tabGroupAddedPanel).toBeVisible();
        await expect(tabGroupAddedPanel).toHaveJSProperty('active', true);
      });
    }); // regression#814
  }); // End frameworks
});
