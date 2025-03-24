import { expect, test } from '@playwright/test';
import type { SynCombobox } from '@synergy-design-system/components';
import { AllComponentsPage } from './PageObjects/index.js';
import {
  createTestCases,
} from './helpers.js';

test.describe('All components tests', () => {
  createTestCases(({ name, port }) => {
    test.describe(`${name}: <SynAccordion /> ${port}`, () => {
      test('show be visible with three <syn-details>', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);
        await AllComponents.loadInitialPage();

        // Initial state should be the first item is open
        await AllComponents.activateItem('accordionLink');
        await expect(AllComponents.getLocator('accordionContent')).toBeVisible();

        const accordions = await AllComponents.getLocator('accordionDetails');
        await expect(accordions).toHaveCount(3);

        // Get the first item and check if its open
        const firstAccordion = accordions.first();
        const lastAccordion = accordions.last();

        await expect(firstAccordion).toHaveJSProperty('summary', 'First');
        await expect(firstAccordion).toHaveAttribute('open');

        await expect(lastAccordion).toHaveJSProperty('summary', 'Third');
        await expect(lastAccordion).not.toHaveAttribute('open');

        await accordions.last().click();
        await expect(lastAccordion).toHaveAttribute('open');
      }); // End open
    }); // </syn-accordion>

    test.describe(`${name}: <SynAlert /> ${port}`, () => {
      test('should support 5 different variants', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);
        await AllComponents.loadInitialPage();

        // Initial state should be the first item is open
        await AllComponents.activateItem('alertLink');
        await expect(AllComponents.getLocator('alertContent')).toBeVisible();

        await expect(AllComponents.getLocator('alertAll')).toHaveCount(5);

        // Check that all alerts have a different variants
        const alerts = await AllComponents.getLocator('alertAll');
        const availableVariants = await alerts.evaluateAll(a => {
          const variants = a.map((alert) => alert.getAttribute('variant'));
          return variants;
        });
        expect(availableVariants).toEqual(['primary', 'success', 'neutral', 'warning', 'danger']);
      }); // Test accessibility
    }); // </syn-alert>

    test.describe(`${name}: <SynCombobox /> ${port}`, () => {
      test.describe('Regression#797', () => {
        test('should show the text content of the option, when value was set initially via value', async ({ page }) => {
          const AllComponents = new AllComponentsPage(page, port);
          await AllComponents.loadInitialPage();
          await AllComponents.activateItem('comboboxLink');

          await expect(AllComponents.getLocator('comboboxContent')).toBeVisible();

          const combobox = await AllComponents.getLocator('comboboxComponent');
          // Check that the displayed value is the text content of the option
          const displayedValue = await combobox.evaluate((ele: SynCombobox) => ele.displayLabel);

          expect(displayedValue).toEqual('Option 2');
        });

        test('should show the text content of the new value, when value was set afterwards', async ({ page }) => {
          const AllComponents = new AllComponentsPage(page, port);
          await AllComponents.loadInitialPage();
          await AllComponents.activateItem('comboboxLink');

          await expect(AllComponents.getLocator('comboboxContent')).toBeVisible();

          const combobox = await AllComponents.getLocator('comboboxComponent');
          await combobox.evaluate((ele: SynCombobox) => {
            // eslint-disable-next-line no-param-reassign
            ele.value = 'option-3';
          });
          // Check that the displayed value is the text content of the option
          const displayedValue = await combobox.evaluate((ele: SynCombobox) => ele.displayLabel);

          expect(displayedValue).toEqual('Option 3');
        });

        test('should update the displayed value of the combobox after dynamically added the corresponding option', async ({ page }) => {
          const AllComponents = new AllComponentsPage(page, port);
          await AllComponents.loadInitialPage();
          await AllComponents.activateItem('comboboxLink');

          await expect(AllComponents.getLocator('comboboxContent')).toBeVisible();

          const combobox = await AllComponents.getLocator('comboboxComponent');
          await combobox.evaluate((ele: SynCombobox) => {
            // eslint-disable-next-line no-param-reassign
            ele.value = 'option-4';
          });
          // Check that the displayed value is the text content of the option
          const displayedValue = await combobox.evaluate((ele: SynCombobox) => ele.displayLabel);

          expect(displayedValue).toEqual('option-4');

          // Add a new option to the combobox
          await combobox.evaluate((ele: SynCombobox) => {
            const newOption = document.createElement('syn-option');
            newOption.value = 'option-4';
            newOption.textContent = 'Option 4';
            ele.appendChild(newOption);
          });
          // Check if the displayed value is updated
          const updatedDisplayedValue = await combobox.evaluate(
            (ele: SynCombobox) => ele.displayLabel,
          );

          expect(updatedDisplayedValue).toEqual('Option 4');
        });
      }); // regression#797
    }); // </syn-combobox>

    test.describe(`${name}: <SynTabGroup /> ${port}`, () => {
      test.describe('Regression#757', () => {
        test('should not trigger the parent tab navigation when activating a subtab', async ({ page }) => {
          const AllComponents = new AllComponentsPage(page, port);
          await AllComponents.loadInitialPage();

          const tabGroupLink = AllComponents.getLocator('tabGroupLink');
          const tabGroupCustom = AllComponents.getLocator('tabGroupCustom');
          const tabGroupGeneral = AllComponents.getLocator('tabGroupGeneral');

          // Check if the active tab is adjusted when navigating
          await expect(tabGroupLink).toHaveJSProperty('active', false);
          await AllComponents.activateItem('tabGroupLink');
          await expect(tabGroupLink).toHaveJSProperty('active', true);

          // Check if the active tab of the given sub tab group is adjusted when navigating
          await expect(tabGroupCustom).toBeVisible();
          await expect(tabGroupCustom).toHaveJSProperty('active', false);
          await expect(tabGroupGeneral).toBeVisible();
          await expect(tabGroupGeneral).toHaveJSProperty('active', true);

          await tabGroupCustom.click();
          await expect(tabGroupCustom).toHaveJSProperty('active', true);
          await expect(tabGroupGeneral).toHaveJSProperty('active', false);

          // Finally, check if the parent tab is still active
          await expect(tabGroupLink).toHaveJSProperty('active', true);
        });
      }); // regression#757
    }); // </syn-tabgroup>
  }); // End createTestCases
}); // /test-suite
