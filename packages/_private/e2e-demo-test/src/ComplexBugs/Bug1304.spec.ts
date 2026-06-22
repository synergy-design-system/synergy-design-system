import { expect, test } from '@playwright/test';
import { ComplexBugsPage } from '../PageObjects/index.js';
import { createTestCases } from '../helpers.js';

test.describe('#1304', () => {
  createTestCases(({ name, port }) => {
    test.describe('Single drawer', () => {
      test(`${name}: should close opened select and let second select stay open after click`, async ({ page }) => {
        const ComplexBugs = new ComplexBugsPage(page, port);
        await ComplexBugs.loadInitialPage();

        await ComplexBugs.activateItem('bug1304SingleDrawerLink');
        await expect(ComplexBugs.getLocator('bug1304SingleDrawerContent')).toBeVisible();

        const button = await ComplexBugs.getLocator('bug1304SingleDrawerButton');
        await button.click();

        const firstSelect = await ComplexBugs.getLocator('bug1304SingleDrawerSelectFirst');
        const secondSelect = await ComplexBugs.getLocator('bug1304SingleDrawerSelectSecond');

        await firstSelect.click();
        await expect(firstSelect.locator('syn-option').nth(0)).toBeVisible();
        await expect(firstSelect.locator('syn-option').nth(1)).toBeVisible();
        await expect(firstSelect.locator('syn-option').nth(2)).toBeVisible();

        const firstSelectClosed = firstSelect.evaluate((select) => {
          const myProm = new Promise((resolve) => {
            const onAfterShow = () => {
              select.removeEventListener('syn-after-hide', onAfterShow);
              resolve(true);
            };
            select.addEventListener('syn-after-hide', onAfterShow);
          });
          return myProm;
        });

        await secondSelect.click();

        await firstSelectClosed;

        await expect(secondSelect.locator('syn-option').nth(0)).toBeVisible();
        await expect(secondSelect.locator('syn-option').nth(1)).toBeVisible();
        await expect(secondSelect.locator('syn-option').nth(2)).toBeVisible();
      }); // End open

      test(`${name}: should close opened dropdown and let select stay open after click`, async ({ page }) => {
        const ComplexBugs = new ComplexBugsPage(page, port);
        await ComplexBugs.loadInitialPage();

        await ComplexBugs.activateItem('bug1304SingleDrawerLink');
        await expect(ComplexBugs.getLocator('bug1304SingleDrawerContent')).toBeVisible();

        const button = await ComplexBugs.getLocator('bug1304SingleDrawerButton');
        await button.click();

        const firstSelect = await ComplexBugs.getLocator('bug1304SingleDrawerSelectFirst');
        const dropdown = await ComplexBugs.getLocator('bug1304SingleDrawerDropDown');

        await dropdown.click();
        await expect(dropdown.locator('syn-menu-item').nth(0)).toBeVisible();
        await expect(dropdown.locator('syn-menu-item').nth(1)).toBeVisible();

        const dropdownClosed = dropdown.evaluate((select) => {
          const myProm = new Promise((resolve) => {
            const onAfterShow = () => {
              select.removeEventListener('syn-after-hide', onAfterShow);
              resolve(true);
            };
            select.addEventListener('syn-after-hide', onAfterShow);
          });
          return myProm;
        });

        await firstSelect.click();

        await dropdownClosed;

        await expect(firstSelect.locator('syn-option').nth(0)).toBeVisible();
        await expect(firstSelect.locator('syn-option').nth(1)).toBeVisible();
        await expect(firstSelect.locator('syn-option').nth(2)).toBeVisible();
      }); // End open
    });

    test.describe('Nested drawer', () => {
      test(`${name}: should not immediately close select after opening it`, async ({ page }) => {
        const ComplexBugs = new ComplexBugsPage(page, port);
        await ComplexBugs.loadInitialPage();

        await ComplexBugs.activateItem('bug1304NestedDrawerLink');
        await expect(ComplexBugs.getLocator('bug1304NestedDrawerContent')).toBeVisible();

        const button = await ComplexBugs.getLocator('bug1304NestedDrawerButton');
        await button.click();

        const select = await ComplexBugs.getLocator('bug1304NestedDrawerSelect');

        await select.click();
        // eslint-disable-next-line no-promise-executor-return
        await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for potential immediate close
        await expect(select.locator('syn-option').nth(0)).toBeVisible();
        await expect(select.locator('syn-option').nth(1)).toBeVisible();
        await expect(select.locator('syn-option').nth(2)).toBeVisible();
      }); // End open

      test(`${name}: should be able to use keyboard navigation with dropdown`, async ({ page }) => {
        const ComplexBugs = new ComplexBugsPage(page, port);
        await ComplexBugs.loadInitialPage();

        await ComplexBugs.activateItem('bug1304NestedDrawerLink');
        await expect(ComplexBugs.getLocator('bug1304NestedDrawerContent')).toBeVisible();

        const button = await ComplexBugs.getLocator('bug1304NestedDrawerButton');
        await button.click();

        const dropdown = await ComplexBugs.getLocator('bug1304NestedDrawerDropDown');

        await dropdown.click();
        await expect(dropdown.locator('syn-menu-item').nth(0)).toBeVisible();
        await expect(dropdown.locator('syn-menu-item').nth(1)).toBeVisible();

        await page.keyboard.down('ArrowDown');
        await expect(dropdown.locator('syn-menu-item').nth(0)).toBeFocused();
        await page.keyboard.down('ArrowDown');
        await page.keyboard.press('Enter');

        const subMenu = dropdown.locator('syn-menu').nth(1);
        await expect(subMenu).toBeVisible();
        await expect(subMenu.locator('syn-menu-item').nth(0)).toBeVisible();
      }); // End open
    });
  }); // End frameworks
}); // </syn-accordion>
