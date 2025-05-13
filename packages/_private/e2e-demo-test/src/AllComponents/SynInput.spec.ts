import { expect, test } from '@playwright/test';
import {
  type SynChangeEvent,
  type SynClampEvent,
  type SynInput,
} from '@synergy-design-system/components';
import {
  modernNumericStrategy,
  nativeNumericStrategy,
} from '@synergy-design-system/components/components/input/strategies.js';
import { AllComponentsPage } from '../PageObjects/index.js';
import {
  createTestCases,
  fillInput,
  hasEvent,
  hasNoEvent,
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

        await expect(inputNoValue, 'uses the native number strategy per default').toHaveJSProperty('numericStrategy', nativeNumericStrategy);
        await expect(inputNative, 'uses the native number strategy when the attribute is set to "native"').toHaveJSProperty('numericStrategy', nativeNumericStrategy);
        await expect(inputModern, 'uses the modern number strategy when the attribute is set to "modern"').toHaveJSProperty('numericStrategy', modernNumericStrategy);
      }); // end check for initial values

      test.describe('when using the native numeric strategy', () => {
        test('should allow to set the value lower than min', async ({ page }) => {
          const AllComponents = new AllComponentsPage(page, port);
          await AllComponents.loadInitialPage();
          await AllComponents.activateItem('inputLink');

          const input = await AllComponents.getLocator('input417NumericNative');

          const waitForChange = hasEvent<SynChangeEvent>(page, 'syn-change');
          const waitForClamp = hasNoEvent<SynClampEvent>(page, 'syn-clamp');

          await fillInput(input, '-5');

          const hasChangeEvent = await waitForChange;
          const hasClampEvent = await waitForClamp;

          const data = await input.evaluate((el: SynInput) => {
            const { validity, value, valueAsNumber } = el;
            const isValid = validity.valid;
            return {
              isValid,
              value,
              valueAsNumber,
            };
          });

          expect(hasChangeEvent, 'The syn-change event should be fired').toBeTruthy();
          expect(hasClampEvent, 'The syn-clamp event should not be fired').toBeTruthy();

          expect(data.value, 'Value should be set to a string of "-5"').toEqual('-5');
          expect(data.valueAsNumber, 'valueAsNumber should be set to float -5').toEqual(-5);
          expect(data.isValid, 'The field should be flagged as invalid').toBeFalsy();
        }); // end set value lower than min

        test('should allow to set the value bigger than max', async ({ page }) => {
          const AllComponents = new AllComponentsPage(page, port);
          await AllComponents.loadInitialPage();
          await AllComponents.activateItem('inputLink');

          const input = await AllComponents.getLocator('input417NumericNative');

          const waitForChange = hasEvent<SynChangeEvent>(page, 'syn-change');
          const waitForClamp = hasNoEvent<SynClampEvent>(page, 'syn-clamp');

          await fillInput(input, '105');

          const hasChangeEvent = await waitForChange;
          const hasClampEvent = await waitForClamp;

          const data = await input.evaluate((el: SynInput) => {
            const { validity, value, valueAsNumber } = el;
            const isValid = validity.valid;
            return {
              isValid,
              value,
              valueAsNumber,
            };
          });

          expect(hasChangeEvent, 'The syn-change event should be fired').toBeTruthy();
          expect(hasClampEvent, 'The syn-clamp event should not be fired').toBeTruthy();

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

          const waitForChange = hasEvent<SynChangeEvent>(page, 'syn-change');
          const waitForClamp = hasEvent<SynClampEvent>(page, 'syn-clamp');

          await fillInput(input, '-5');

          const hasChangeEvent = await waitForChange;
          const hasClampEvent = await waitForClamp;

          const data = await input.evaluate((el: SynInput) => {
            const { validity, value, valueAsNumber } = el;
            const isValid = validity.valid;
            return {
              isValid,
              value,
              valueAsNumber,
            };
          });

          expect(hasChangeEvent, 'The syn-change event should be fired').toBeTruthy();
          expect(hasClampEvent, 'The syn-clamp event should be fired').toBeTruthy();

          expect(data.value, 'Value should be set to a string of "0"').toEqual('0');
          expect(data.valueAsNumber, 'valueAsNumber should be set to float 0').toEqual(0);
          expect(data.isValid, 'The field should not be flagged as invalid').toBeTruthy();
        }); // end set value lower than min

        test('should not allow to set the value bigger than max', async ({ page }) => {
          const AllComponents = new AllComponentsPage(page, port);
          await AllComponents.loadInitialPage();
          await AllComponents.activateItem('inputLink');

          const input = await AllComponents.getLocator('input417NumericModern');

          const waitForChange = hasEvent<SynChangeEvent>(page, 'syn-change');
          const waitForClamp = hasEvent<SynClampEvent>(page, 'syn-clamp');

          await fillInput(input, '105');

          const hasChangeEvent = await waitForChange;
          const hasClampEvent = await waitForClamp;

          const data = await input.evaluate((el: SynInput) => {
            const { validity, value, valueAsNumber } = el;
            const isValid = validity.valid;
            return {
              isValid,
              value,
              valueAsNumber,
            };
          });

          expect(hasChangeEvent, 'The syn-change event should be fired').toBeTruthy();
          expect(hasClampEvent, 'The syn-clamp event should be fired').toBeTruthy();

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

          const waitForChange = hasEvent<SynChangeEvent>(page, 'syn-change');

          await fillInput(input, '1');

          const hasChangeEvent = await waitForChange;

          const data = await input.evaluate((el: SynInput) => {
            const { value, valueAsNumber } = el;
            return {
              value,
              valueAsNumber,
            };
          });

          expect(hasChangeEvent, 'The syn-change event should be fired').toBeTruthy();

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

          const waitForChange = hasEvent<SynChangeEvent>(page, 'syn-change');

          await fillInput(input, '1');

          const hasChangeEvent = await waitForChange;

          const data = await input.evaluate((el: SynInput) => {
            const { value, valueAsNumber } = el;
            return {
              value,
              valueAsNumber,
            };
          });

          expect(hasChangeEvent, 'The syn-change event should be fired').toBeTruthy();

          expect(data.value, 'Value should be set to a string of "1.0000"').toEqual('1.0000');
          expect(data.valueAsNumber, 'valueAsNumber should be set to float 1.0000').toEqual(1.0000);
        }); // end test for min-fraction-digits
      }); // end modern numeric strategy
    }); // feature#838
  }); // End frameworks
}); // </syn-input>
