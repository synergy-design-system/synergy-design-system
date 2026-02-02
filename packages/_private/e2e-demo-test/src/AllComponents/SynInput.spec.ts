import { expect, test } from '@playwright/test';
import {
  type SynInput,
} from '@synergy-design-system/components';
import {
  modernNumericStrategy,
  nativeNumericStrategy,
} from '@synergy-design-system/components/components/input/strategies.js';
import { AllComponentsPage } from '../PageObjects/index.js';
import {
  type SetterType,
  createTestCases,
  fillInput,
  runActionAndValidateEvents,
  setPropertyForLocator,
} from '../helpers.js';

test.describe('<SynInput />', () => {
  createTestCases(({ name, port }) => {
    test.describe(`Feature#417: ${name}`, () => {
      test('should set the correct numeric strategy when it is passed', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);
        await AllComponents.loadInitialPage();
        await AllComponents.activateItem('inputLink');

        const inputNoValue = await AllComponents.getLocator('input417NoValue');
        const inputNative = await AllComponents.getLocator('input417NumericNative');
        const inputModern = await AllComponents.getLocator('input417NumericModern');

        await expect(inputNoValue, 'uses the modern number strategy per default').toHaveJSProperty('numericStrategy', modernNumericStrategy);
        await expect(inputNative, 'uses the native number strategy when the attribute is set to "native"').toHaveJSProperty('numericStrategy', nativeNumericStrategy);
        await expect(inputModern, 'uses the modern number strategy when the attribute is set to "modern"').toHaveJSProperty('numericStrategy', modernNumericStrategy);
      }); // end check for initial values

      test.describe('when using the native numeric strategy', () => {
        test('should allow to set the value lower than min', async ({ page }) => {
          const AllComponents = new AllComponentsPage(page, port);
          await AllComponents.loadInitialPage();
          await AllComponents.activateItem('inputLink');

          const input = await AllComponents.getLocator('input417NumericNative');

          const eventResults = await runActionAndValidateEvents(
            page,
            () => fillInput(input, '-5'),
            [
              { event: 'syn-change', shouldFire: true },
              { event: 'syn-clamp', shouldFire: false },
            ],
          );

          const changeResult = eventResults.find(r => r.event === 'syn-change');
          const clampResult = eventResults.find(r => r.event === 'syn-clamp');

          const data = await input.evaluate((el: SynInput) => {
            const { validity, value, valueAsNumber } = el;
            const isValid = validity.valid;
            return {
              isValid,
              value,
              valueAsNumber,
            };
          });

          expect(changeResult?.hasFired, 'The syn-change event should be fired').toBeTruthy();
          expect(clampResult?.hasFired, 'The syn-clamp event should not be fired').toBeFalsy();

          expect(data.value, 'Value should be set to a string of "-5"').toEqual('-5');
          expect(data.valueAsNumber, 'valueAsNumber should be set to float -5').toEqual(-5);
          expect(data.isValid, 'The field should be flagged as invalid').toBeFalsy();
        }); // end set value lower than min

        test('should allow to set the value bigger than max', async ({ page }) => {
          const AllComponents = new AllComponentsPage(page, port);
          await AllComponents.loadInitialPage();
          await AllComponents.activateItem('inputLink');

          const input = await AllComponents.getLocator('input417NumericNative');

          const eventResults = await runActionAndValidateEvents(
            page,
            () => fillInput(input, '105'),
            [
              { event: 'syn-change', shouldFire: true },
              { event: 'syn-clamp', shouldFire: false },
            ],
          );

          const changeResult = eventResults.find(r => r.event === 'syn-change');
          const clampResult = eventResults.find(r => r.event === 'syn-clamp');

          const data = await input.evaluate((el: SynInput) => {
            const { validity, value, valueAsNumber } = el;
            const isValid = validity.valid;
            return {
              isValid,
              value,
              valueAsNumber,
            };
          });

          expect(changeResult?.hasFired, 'The syn-change event should be fired').toBeTruthy();
          expect(clampResult?.hasFired, 'The syn-clamp event should not be fired').toBeFalsy();

          expect(data.value, 'Value should be set to a string of "105"').toEqual('105');
          expect(data.valueAsNumber, 'valueAsNumber should be set to float 105').toEqual(105);
          expect(data.isValid, 'The field should be flagged as invalid').toBeFalsy();
        }); // end set value higher than max
      }); // end native numeric strategy

      test.describe('when using the modern numeric strategy', () => {
        test('should not allow to set the value lower than min', async ({ page }) => {
          const AllComponents = new AllComponentsPage(page, port);
          await AllComponents.loadInitialPage();
          await AllComponents.activateItem('inputLink');

          const input = await AllComponents.getLocator('input417NumericModern');

          const eventResults = await runActionAndValidateEvents(
            page,
            () => fillInput(input, '-5'),
            [
              { event: 'syn-change', shouldFire: true },
              { event: 'syn-clamp', shouldFire: true },
            ],
          );

          const changeResult = eventResults.find(r => r.event === 'syn-change');
          const clampResult = eventResults.find(r => r.event === 'syn-clamp');

          const data = await input.evaluate((el: SynInput) => {
            const { validity, value, valueAsNumber } = el;
            const isValid = validity.valid;
            return {
              isValid,
              value,
              valueAsNumber,
            };
          });

          expect(changeResult?.hasFired, 'The syn-change event should be fired').toBeTruthy();
          expect(clampResult?.hasFired, 'The syn-clamp event should be fired').toBeTruthy();

          expect(data.value, 'Value should be set to a string of "0"').toEqual('0');
          expect(data.valueAsNumber, 'valueAsNumber should be set to float 0').toEqual(0);
          expect(data.isValid, 'The field should not be flagged as invalid').toBeTruthy();
        }); // end set value lower than min

        test('should not allow to set the value bigger than max', async ({ page }) => {
          const AllComponents = new AllComponentsPage(page, port);
          await AllComponents.loadInitialPage();
          await AllComponents.activateItem('inputLink');

          const input = await AllComponents.getLocator('input417NumericModern');

          const eventResults = await runActionAndValidateEvents(
            page,
            () => fillInput(input, '105'),
            [
              { event: 'syn-change', shouldFire: true },
              { event: 'syn-clamp', shouldFire: true },
            ],
          );

          const changeResult = eventResults.find(r => r.event === 'syn-change');
          const clampResult = eventResults.find(r => r.event === 'syn-clamp');

          const data = await input.evaluate((el: SynInput) => {
            const { validity, value, valueAsNumber } = el;
            const isValid = validity.valid;
            return {
              isValid,
              value,
              valueAsNumber,
            };
          });

          expect(changeResult?.hasFired, 'The syn-change event should be fired').toBeTruthy();
          expect(clampResult?.hasFired, 'The syn-clamp event should be fired').toBeTruthy();

          expect(data.value, 'Value should be set to a string of "100"').toEqual('100');
          expect(data.valueAsNumber, 'valueAsNumber should be set to float 100').toEqual(100);
          expect(data.isValid, 'The field should not be flagged as invalid').toBeTruthy();
        }); // end set value higher than max
      }); // end modern numeric strategy
    }); // feature#417
  }); // End frameworks

  createTestCases(({ name, port }) => {
    test.describe(`Feature#838: ${name}`, () => {
      test.describe('when using the native numeric strategy', () => {
        test('should round the value to the provided min-fraction-digit value', async ({ page }) => {
          const AllComponents = new AllComponentsPage(page, port);
          await AllComponents.loadInitialPage();
          await AllComponents.activateItem('inputLink');

          const input = await AllComponents.getLocator('input417NumericMinFractionDigitsNative');

          const eventResults = await runActionAndValidateEvents(
            page,
            () => fillInput(input, '1'),
            [
              { event: 'syn-change', shouldFire: true },
            ],
          );

          const changeResult = eventResults.find(r => r.event === 'syn-change');

          const data = await input.evaluate((el: SynInput) => {
            const { value, valueAsNumber } = el;
            return {
              value,
              valueAsNumber,
            };
          });

          expect(changeResult?.hasFired, 'The syn-change event should be fired').toBeTruthy();

          expect(data.value, 'Value should be set to a string of "1.0000"').toEqual('1.0000');
          expect(data.valueAsNumber, 'valueAsNumber should be set to float 1.0000').toEqual(1.0000);
        }); // end test for min-fraction-digits
      }); // end native numeric strategy

      test.describe('when using the modern numeric strategy', () => {
        test('should round the value to the provided min-fraction-digit value', async ({ page }) => {
          const AllComponents = new AllComponentsPage(page, port);
          await AllComponents.loadInitialPage();
          await AllComponents.activateItem('inputLink');

          const input = await AllComponents.getLocator('input417NumericMinFractionDigitsModern');

          const eventResults = await runActionAndValidateEvents(
            page,
            () => fillInput(input, '1'),
            [
              { event: 'syn-change', shouldFire: true },
            ],
          );

          const changeResult = eventResults.find(r => r.event === 'syn-change');

          const data = await input.evaluate((el: SynInput) => {
            const { value, valueAsNumber } = el;
            return {
              value,
              valueAsNumber,
            };
          });

          expect(changeResult?.hasFired, 'The syn-change event should be fired').toBeTruthy();

          expect(data.value, 'Value should be set to a string of "1.0000"').toEqual('1.0000');
          expect(data.valueAsNumber, 'valueAsNumber should be set to float 1.0000').toEqual(1.0000);
        }); // end test for min-fraction-digits
      }); // end modern numeric strategy
    }); // feature#838
  }); // End frameworks

  createTestCases(({ name, port }) => {
    test.describe(`Regression#872: ${name}`, () => {
      (['attribute', 'property'] as SetterType[]).forEach((type) => {
        test(`should disable the decrement button if the value was set lower than min by setting via ${type}`, async ({ page }) => {
          const AllComponents = new AllComponentsPage(page, port);
          await AllComponents.loadInitialPage();
          await AllComponents.activateItem('inputLink');

          const input = await AllComponents.getLocator('input872SpinButtons');
          const decrementButton = input.locator('[part="decrement-number-stepper"]');

          await expect(input, 'Initial value should be "50"').toHaveJSProperty('value', '50');
          await expect(decrementButton, 'decrement-button should be enabled as value is not below min').toBeEnabled();

          await setPropertyForLocator<SynInput>(input, 'value', '-1', type);

          await expect(input, 'Value should be set to -1 after setting the attribute dynamically').toHaveJSProperty('value', '-1');
          await expect(decrementButton, 'decrement-button should be disabled as value is now on min').toBeDisabled();
        }); // test for min

        test(`should disable the increment button if the value was set higher than max by setting via ${type}`, async ({ page }) => {
          const AllComponents = new AllComponentsPage(page, port);
          await AllComponents.loadInitialPage();
          await AllComponents.activateItem('inputLink');

          const input = await AllComponents.getLocator('input872SpinButtons');
          const incrementButton = input.locator('[part="increment-number-stepper"]');

          await expect(input, 'Initial value should be "50"').toHaveJSProperty('value', '50');
          await expect(incrementButton, 'increment-button should be enabled as value is not above max').toBeEnabled();

          await setPropertyForLocator<SynInput>(input, 'value', '101', type);

          await expect(input, 'Value should be set to 101 after setting the attribute dynamically').toHaveJSProperty('value', '101');
          await expect(incrementButton, 'increment-button should be disabled as value is now above max').toBeDisabled();
        }); // test for max
      });
    }); // regression#872

    test.describe(`Regression#1023: ${name}`, () => {
      test('should set the autocorrect attribute to "off" when the property is set to false', async ({ browserName, page }) => {
        // Chromium does not support autocorrect, so we skip this test there
        // Also, CI webkit is too old and also has no support, so we skip webkit there as well
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocorrect#browser_compatibility
        test.skip(browserName !== 'firefox', 'Only supported in Firefox at the moment');

        const AllComponents = new AllComponentsPage(page, port);
        await AllComponents.loadInitialPage();
        await AllComponents.activateItem('inputLink');

        // References to needed elements
        const locator = await AllComponents.getLocator('input1023Autocorrect');
        const input = locator.locator('#input');

        await expect(input, 'The autocorrect attribute should be set to "off" per default').toHaveAttribute('autocorrect', 'off');

        // Toggle autocorrect to "true" via attribute
        await setPropertyForLocator<SynInput>(locator, 'autocorrect', 'on', 'attribute');
        await expect(input, 'The autocorrect attribute should not be set when the property is set to "on"').toHaveJSProperty('autocorrect', true);

        // Toggle autocorrect to "false" via attribute
        await setPropertyForLocator<SynInput>(locator, 'autocorrect', 'off', 'attribute');
        await expect(input, 'The autocorrect attribute should not be set when the property is set to "off"').toHaveAttribute('autocorrect', 'off');

        // Toggle autocorrect to "false"
        await setPropertyForLocator<SynInput>(locator, 'autocorrect', false, 'property');
        await expect(input, 'The autocorrect attribute should be set to "off" when the property is set to false').toHaveAttribute('autocorrect', 'off');

        // Toggle autocorrect to "undefined"
        await setPropertyForLocator<SynInput>(locator, 'autocorrect', undefined, 'property');
        await expect(input, 'The autocorrect attribute should be set to "off" when the property is set to undefined').toHaveAttribute('autocorrect', 'off');
      }); // end autocorrect test
    }); // regression#1023
  }); // End frameworks
}); // </syn-input>
