import { expect, test } from '@playwright/test';
import {
  fillInput,
  getFrameworkPort,
} from './helpers.js';
import { FrameworkSpecificsPage } from './PageObjects/FrameworkSpecifics.js';

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
        targetPosition: { x: 0, y: 18 },
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
}); // Angular
