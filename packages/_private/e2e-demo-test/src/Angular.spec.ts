import { expect, test } from '@playwright/test';
import {
  fillInput,
  getFrameworkPort,
} from './helpers.js';
import { FrameworkSpecificsPage } from './PageObjects/FrameworkSpecifics.js';

try {
  const angularPort = getFrameworkPort('angular');

  test.describe(`<Angular /> on port ${angularPort}`, () => {
    // #808 feature ngModelUpdateOn
    test.describe('Feature#808: ngModelUpdateOn', () => {
      test('Default values for ngModelUpdateOn', async ({ page }) => {
        const AllComponents = new FrameworkSpecificsPage(page, angularPort);
        await AllComponents.loadInitialPage();

        await AllComponents.activateItem('ngModelUpdateOnLink');
        await expect(AllComponents.getLocator('ngModelUpdateOnContent')).toBeVisible();

        const input = await AllComponents.getLocator('ngModelUpdateOnInput');
        const inputResult = await AllComponents.getLocator('ngModelUpdateOnInputResult');
        const checkbox = await AllComponents.getLocator('ngModelUpdateOnCheckbox');
        const checkboxResult = await AllComponents.getLocator('ngModelUpdateOnCheckboxResult');
        const range = await AllComponents.getLocator('ngModelUpdateOnRange');
        const rangeResult = await AllComponents.getLocator('ngModelUpdateOnRangeResult');

        await expect(inputResult).toHaveText('Hello');
        await expect(checkboxResult).toHaveText('false');
        await expect(rangeResult).toHaveText('50');

        // Fill the input without triggering the syn-change event.
        // Only the syn-input event is triggered
        await fillInput(input, 'World', false);
        // Check directly for the input result as doing an action with another element,
        // will result in a blur of the syn-input and therefore a syn-change event
        await expect(inputResult, 'NgModel value of syn-input should have changed on syn-input event').toHaveText('World');

        await checkbox.click();
        await expect(checkboxResult, 'NgModel value of syn-checkbox should have changed on syn-input event').toHaveText('true');

        await range.dragTo(range, {
          targetPosition: { x: 0, y: 30 },
        });
        await expect(rangeResult, 'NgModel value of syn-range should have changed on syn-change event').toHaveText('0');
      });

      test('Non-Default values for ngModelUpdateOn', async ({ page }) => {
        const AllComponents = new FrameworkSpecificsPage(page, angularPort);
        await AllComponents.loadInitialPage();

        await AllComponents.activateItem('ngModelUpdateOnLink');
        await expect(AllComponents.getLocator('ngModelUpdateOnContent')).toBeVisible();

        const input = await AllComponents.getLocator('ngModelUpdateOnInputChanged');
        const inputResult = await AllComponents.getLocator('ngModelUpdateOnInputResult');
        const checkbox = await AllComponents.getLocator('ngModelUpdateOnCheckboxChanged');
        const checkboxResult = await AllComponents.getLocator('ngModelUpdateOnCheckboxResult');
        const range = await AllComponents.getLocator('ngModelUpdateOnRangeChanged');
        const rangeResult = await AllComponents.getLocator('ngModelUpdateOnRangeResult');

        await expect(inputResult).toHaveText('Hello');
        await expect(checkboxResult).toHaveText('false');
        await expect(rangeResult).toHaveText('50');

        // Fill the input without triggering the syn-change event.
        // Only the syn-input event is triggered
        await fillInput(input, 'World', false);
        // Check directly for the input result as doing an action with another element,
        // will result in a blur of the syn-input and therefore a syn-change event
        await expect(inputResult, 'NgModel value of syn-input should NOT have changed on syn-input event').toHaveText('Hello');
        // We need to blur the inner input, otherwise firefox will not trigger
        // the syn-blur / syn-change events
        await input.locator('input').blur();
        await expect(inputResult, 'NgModel value of syn-input should have changed on syn-change event').toHaveText('World');

        await checkbox.click();
        await expect(checkboxResult, 'NgModel value of syn-checkbox should NOT have changed on syn-change event').toHaveText('false');
        // We need to blur the inner input, otherwise firefox and webkit will not trigger the
        // the syn-blur event
        await checkbox.locator('input').dispatchEvent('blur');
        await expect(checkboxResult, 'NgModel value of syn-checkbox should have changed on syn-blur event').toHaveText('true');

        await range.dragTo(range, {
          targetPosition: { x: 0, y: 18 },
        });
        await expect(rangeResult, 'NgModel value of syn-range should NOT have changed on syn-change event').toHaveText('50');
        // We need to do a focusout on the inner range div, otherwise firefox will not trigger
        // the syn-blur event
        await range.locator('.form-control').dispatchEvent('focusout');
        await expect(rangeResult, 'NgModel value of syn-range should have changed on syn-blur event').toHaveText('0');
      });
    });
    // END #808

    // #851 syn-validate eager validation in dynamic tabs
    test.describe('Feature#851: syn-validate eager validation in dynamic tabs', () => {
      test('Eager validation shows immediately for dynamically created tabs', async ({ page }) => {
        const AllComponents = new FrameworkSpecificsPage(page, angularPort);
        await AllComponents.loadInitialPage();

        await AllComponents.activateItem('validate851Link');
        await expect(AllComponents.getLocator('validate851Content')).toBeVisible();

        // Initial state: should have 1 tab with item1 selected (no validation error)
        const tab1 = AllComponents.getLocator('validate851Tab1');
        const validate1 = AllComponents.getLocator('validate851Validate1');

        await expect(tab1).toBeVisible();
        await expect(validate1).not.toContainText('No items available');

        // Add second tab - should get item2, no validation error
        const addTabButton = AllComponents.getLocator('validate851AddTabButton');
        await addTabButton.click();

        const tab2 = AllComponents.getLocator('validate851Tab2');
        const validate2 = AllComponents.getLocator('validate851Validate2');

        await expect(tab2).toBeVisible();
        await expect(validate2).not.toContainText('No items available');

        // Add third tab - this should trigger "No items available" error immediately
        // due to eager validation (3 tabs, only 2 items available, 3th tab has no items left)
        await addTabButton.click();

        const tab3 = AllComponents.getLocator('validate851Tab3');
        const validate3 = AllComponents.getLocator('validate851Validate3');

        await expect(tab3).toBeVisible();
        // This is the key assertion: validation error should appear immediately
        // when the tab is created, not after user interaction
        await expect(validate3, 'Validation error should appear immediately on tab creation').toContainText('No items available');

        // Verify the validation message is visible in the DOM
        const validationAlert = validate3.locator('syn-alert');
        await expect(validationAlert).toBeVisible();
        await expect(validationAlert).toContainText('No items available');
      }); // END eager validation shows immediately for dynamically created tabs
    }); // END #851
  }); // Angular
// eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (e) {
  // Framework not enabled, skip all tests
}
