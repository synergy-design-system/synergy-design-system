import { expect, test } from '@playwright/test';
import { AllComponentsPage } from './PageObjects/index.js';
import {
  fillInputWithoutBlur,
  getFrameworkPort,
} from './helpers.js';

const angularPort = getFrameworkPort('angular');

test.describe('<Angular /> on port 5176', () => {
  // #808 feature ngModelUpdateOn
  test.describe('ngModelUpdateOn feature', () => {
    test('Default values for ngModelUpdateOn', async ({ page }) => {
      const AllComponents = new AllComponentsPage(page, angularPort);
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
      await fillInputWithoutBlur(input, 'World');
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
      const AllComponents = new AllComponentsPage(page, angularPort);
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
      await fillInputWithoutBlur(input, 'World');
      // Check directly for the input result as doing an action with another element,
      // will result in a blur of the syn-input and therefore a syn-change event
      await expect(inputResult, 'NgModel value of syn-input should NOT have changed on syn-input event').toHaveText('Hello');
      await input.blur();
      await expect(inputResult, 'NgModel value of syn-input should have changed on syn-change event').toHaveText('World');

      await checkbox.click();
      await expect(checkboxResult, 'NgModel value of syn-checkbox should NOT have changed on syn-change event').toHaveText('false');
      await checkbox.blur();
      await expect(checkboxResult, 'NgModel value of syn-checkbox should have changed on syn-blur event').toHaveText('true');

      await range.dragTo(range, {
        targetPosition: { x: 0, y: 18 },
      });
      await expect(rangeResult, 'NgModel value of syn-range should NOT have changed on syn-change event').toHaveText('50');
      await range.blur();
      await expect(rangeResult, 'NgModel value of syn-range should have changed on syn-blur event').toHaveText('0');
    });
  });
  // END #808
}); // Angular
