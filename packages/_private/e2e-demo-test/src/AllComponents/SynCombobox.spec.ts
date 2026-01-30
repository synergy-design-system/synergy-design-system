import { expect, test } from '@playwright/test';
import {
  type SynCombobox,
} from '@synergy-design-system/components';
import { AllComponentsPage } from '../PageObjects/index.js';
import { createTestCases, fillField, runActionAndValidateEvents } from '../helpers.js';

test.describe('<SynCombobox />', () => {
  createTestCases(({ name, port }) => {
    test.describe(`Regression#632: ${name}`, () => {
      test('should have a valid DOM tree after interaction', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);
        await AllComponents.loadInitialPage();
        await AllComponents.activateItem('comboboxLink');

        await expect(AllComponents.getLocator('comboboxContent')).toBeVisible();

        const combobox = await AllComponents.getLocator('combobox632');

        await expect(combobox).toBeVisible();

        // Fill the field, but don´t blur. We want to use keyboard navigation!
        await fillField(combobox, 'lo', '.combobox__display-input', false);

        await page.keyboard.down('ArrowDown');
        await page.keyboard.down('ArrowDown');
        await page.keyboard.press('Enter');

        // Check that the displayed value is the text content of the option
        const domData = await combobox.evaluate((ele: SynCombobox) => ({
          label: ele.displayLabel,
          value: ele.value,
        }));

        expect(domData.label).toEqual('dolor');
        expect(domData.value).toEqual('option-3');

        // Clear the combobox, check values again.
        await Promise.allSettled(
          'dolor'
            .split('')
            .map(async () => page.keyboard.press('Backspace')),
        );

        await page.keyboard.down('ArrowDown');
        await page.keyboard.down('ArrowDown');
        await page.keyboard.press('Enter');

        // Check that the displayed value is the text content of the option
        const domData2 = await combobox.evaluate((ele: SynCombobox) => ({
          label: ele.displayLabel,
          value: ele.value,
        }));

        expect(domData2.label).toEqual('ipsum');
        expect(domData2.value).toEqual('option-2');
      });
    }); // regression#632

    test.describe(`Regression#797: ${name}`, () => {
      test('should show the text content of the option, when value was set initially via value', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);
        await AllComponents.loadInitialPage();
        await AllComponents.activateItem('comboboxLink');

        await expect(AllComponents.getLocator('comboboxContent')).toBeVisible();

        const combobox = await AllComponents.getLocator('combobox797');
        // Check that the displayed value is the text content of the option
        const displayedValue = await combobox.evaluate((ele: SynCombobox) => ele.displayLabel);

        expect(displayedValue).toEqual('Option 2');
      });

      test('should show the text content of the new value, when value was set afterwards', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);
        await AllComponents.loadInitialPage();
        await AllComponents.activateItem('comboboxLink');

        await expect(AllComponents.getLocator('comboboxContent')).toBeVisible();

        const combobox = await AllComponents.getLocator('combobox797');
        await combobox.evaluate((ele: SynCombobox) => {
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

        const combobox = await AllComponents.getLocator('combobox797');
        await combobox.evaluate((ele: SynCombobox) => {
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

    test.describe(`Regression#813: ${name}`, () => {
      test('should show the text content of the option, when value was set initially via property binding and options added dynamically', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);
        await AllComponents.loadInitialPage();
        await AllComponents.activateItem('comboboxLink');

        await expect(AllComponents.getLocator('comboboxContent')).toBeVisible();

        const combobox = await AllComponents.getLocator('combobox813Level');
        // Check that the displayed value is the text content of the option
        const displayedValue = await combobox.evaluate((ele: SynCombobox) => ele.displayLabel);

        expect(displayedValue).toEqual('Intermediate');
      });

      test('should reset the value of the combobox in a form to the initially set value via property binding', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);
        await AllComponents.loadInitialPage();
        await AllComponents.activateItem('comboboxLink');

        await expect(AllComponents.getLocator('comboboxContent')).toBeVisible();

        const combobox = await AllComponents.getLocator('combobox813Form');

        await combobox.evaluate((ele: SynCombobox) => {
          ele.value = '';
        });

        await combobox.click();
        const options = await AllComponents.getLocator('combobox813FormOptions');
        await options.last().click();

        const [value, displayedValue] = await combobox.evaluate(
          (ele: SynCombobox) => [ele.value, ele.displayLabel],
        );
        expect(value).toEqual('option-3');
        expect(displayedValue).toEqual('Option 3');

        const reset = await AllComponents.getLocator('comboboxFormReset');
        await reset.click();

        const [resetValue, resetDisplayedValue] = await combobox.evaluate(
          (ele: SynCombobox) => [ele.value, ele.displayLabel],
        );
        expect(resetValue).toEqual('option-1');
        expect(resetDisplayedValue).toEqual('Option 1');
      });
    }); // regression#813

    test.describe(`Regression#626: ${name}`, () => {
      test('should reset the value of a restricted combobox to empty value', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);
        await AllComponents.loadInitialPage();
        await AllComponents.activateItem('comboboxLink');

        await expect(AllComponents.getLocator('comboboxContent')).toBeVisible();

        const combobox = await AllComponents.getLocator('combobox626');

        await runActionAndValidateEvents(
          page,
          () => fillField(combobox, 'lo', '.combobox__display-input', true),
          [
            { event: 'syn-change', shouldFire: true },
          ],
        );

        // Check that the displayed value is the text content of the option
        const displayedValue = await combobox.evaluate((ele: SynCombobox) => ele.displayLabel);

        expect(displayedValue).toEqual('');
      });

      test('should reset the value of a restricted combobox to the last valid value', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);
        await AllComponents.loadInitialPage();
        await AllComponents.activateItem('comboboxLink');

        await expect(AllComponents.getLocator('comboboxContent')).toBeVisible();

        const combobox = await AllComponents.getLocator('combobox626');

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        combobox.evaluate((ele: SynCombobox) => {
          ele.value = 'ipsum';
        });

        await runActionAndValidateEvents(
          page,
          () => fillField(combobox, 'lo', '.combobox__display-input', true),
          [
            { event: 'syn-change', shouldFire: true },
          ],
        );

        // Check that the displayed value is the text content of the option
        const displayedValue = await combobox.evaluate((ele: SynCombobox) => ele.displayLabel);

        expect(displayedValue).toEqual('ipsum');
      });

      test('should reset the value of a restricted combobox to the last async valid value', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);
        await AllComponents.loadInitialPage();
        await AllComponents.activateItem('comboboxLink');

        await expect(AllComponents.getLocator('comboboxContent')).toBeVisible();

        const combobox = await AllComponents.getLocator('combobox626Async');

        const displayedValue = await combobox.evaluate((ele: SynCombobox) => ele.displayLabel);
        const value = await combobox.evaluate((ele: SynCombobox) => ele.value);

        expect(value).toEqual('3');
        expect(displayedValue).toEqual('Advanced');

        await runActionAndValidateEvents(
          page,
          () => fillField(combobox, 'lo', '.combobox__display-input', true),
          [
            { event: 'syn-change', shouldFire: true },
          ],
        );

        const displayedValueReset = await combobox.evaluate((ele: SynCombobox) => ele.displayLabel);
        const valueReset = await combobox.evaluate((ele: SynCombobox) => ele.value);

        expect(valueReset).toEqual('3');
        expect(displayedValueReset).toEqual('Advanced');
      });
    }); // regression#626

    test.describe(`Regression#847: ${name}`, () => {
      test('should show the text content of the options, when value was set initially via normal binding and options added dynamically with multiple', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);
        await AllComponents.loadInitialPage();
        await AllComponents.activateItem('comboboxLink');

        await expect(AllComponents.getLocator('comboboxContent')).toBeVisible();

        const combobox = await AllComponents.getLocator('combobox847Multiple');
        // Check that the displayed value is the text content of the option
        const displayedValue = await combobox.evaluate((ele: SynCombobox) => ele.displayLabel);
        const value = await combobox.evaluate((ele: SynCombobox) => ele.value);

        expect(value).toEqual(['1', '2']);
        expect(displayedValue).toEqual('');
        const tags = combobox.locator('syn-tag');
        await expect(tags).toHaveCount(2);
      });
    }); // regression#847

    test.describe(`Regression#1036: ${name}`, () => {
      test('should change value correct for subsequently changed delimiter', async ({ browserName, page }) => {
        // Unfortunately this test is flaky in firefox CI runs
        // Works fine locally, but to keep the CI healthy we skip it there
        test.skip(browserName === 'firefox', 'Flaky in firefox');

        const AllComponents = new AllComponentsPage(page, port);
        await AllComponents.loadInitialPage();
        await AllComponents.activateItem('comboboxLink');

        await expect(AllComponents.getLocator('comboboxContent')).toBeVisible();

        const combobox = await AllComponents.getLocator('combobox1036Delimiter');
        const options = await combobox.locator('syn-option');

        const option1 = options.nth(0);
        const option2 = options.nth(1);

        await combobox.click();
        await expect(combobox).toHaveAttribute('open');
        await expect(option1).toBeVisible();

        await runActionAndValidateEvents(
          page,
          () => option1.click(),
          [
            { event: 'syn-after-hide', shouldFire: true },
          ],
        );

        const firstValue = await combobox.evaluate((ele: SynCombobox) => ele.value);
        expect(firstValue).toEqual('Option_1');

        await combobox.evaluate((ele: SynCombobox) => {
          ele.value = '';
          ele.delimiter = '+';
        });

        await combobox.click();
        await option2.click();

        const secondValue = await combobox.evaluate((ele: SynCombobox) => ele.value);
        expect(secondValue).toEqual('Option 2');
      });
    }); // regression#1036

    test.describe(`Regression#1056: ${name}`, () => {
      test('should update pre selected value correct for async changed delimiter', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);
        await AllComponents.loadInitialPage();
        await AllComponents.activateItem('comboboxLink');

        await expect(AllComponents.getLocator('comboboxContent')).toBeVisible();

        const combobox = await AllComponents.getLocator('combobox1056DelimiterPreValue');

        const firstValue = await combobox.evaluate((ele: SynCombobox) => ele.value);
        expect(firstValue).toEqual('');

        await combobox.evaluate((ele: SynCombobox) => {
          ele.delimiter = '+';
        });

        const secondValue = await combobox.evaluate((ele: SynCombobox) => ele.value);
        expect(secondValue).toEqual('Option 2');
      });

      test('should update async pre selected value correct for async changed delimiter', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);
        await AllComponents.loadInitialPage();
        await AllComponents.activateItem('comboboxLink');

        await expect(AllComponents.getLocator('comboboxContent')).toBeVisible();

        const combobox = await AllComponents.getLocator('combobox1056DelimiterAsyncPreValue');

        const firstValue = await combobox.evaluate((ele: SynCombobox) => ele.value);
        expect(firstValue).toEqual('');

        await combobox.evaluate((ele: SynCombobox) => {
          ele.delimiter = '+';
        });

        const secondValue = await combobox.evaluate((ele: SynCombobox) => ele.value);
        expect(secondValue).toEqual('Option 2');
      });
    }); // regression#1056

    test.describe(`Feature#627: ${name}`, () => {
      test('should select the given options when the delimiter is set', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);
        await AllComponents.loadInitialPage();
        await AllComponents.activateItem('comboboxLink');
        await expect(AllComponents.getLocator('comboboxContent')).toBeVisible();

        const combobox = await AllComponents.getLocator('combobox627');

        const initialValue = await combobox.evaluate((ele: SynCombobox) => ele.value);
        const initialDelimiter = await combobox.evaluate((ele: SynCombobox) => ele.delimiter);

        // Note when providing a delimiter, the value is a string,
        // so we need to check if the value is a string, too
        expect(initialValue).toEqual(['1', '2']);
        expect(initialDelimiter).toEqual('+');

        // Check that a change in the delimiter is reflected in the value
        await combobox.evaluate(async (ele: SynCombobox) => {
          ele.delimiter = ' ';
          ele.value = '2 3';
          await ele.updateComplete;
        });

        const newValue = await combobox.evaluate((ele: SynCombobox) => ele.value);

        // Note when providing a delimiter, the value is a string,
        // so we need to check if the value is a string, too
        expect(newValue).toEqual(['2', '3']);
      }); // end delimiter check
    }); // feature#627

    test.describe(`Feature#805: ${name}`, () => {
      test.describe('single combobox', () => {
        test('should have an initial value of numeric 1', async ({ page }) => {
          const AllComponents = new AllComponentsPage(page, port);
          await AllComponents.loadInitialPage();
          await AllComponents.activateItem('comboboxLink');
          await expect(AllComponents.getLocator('comboboxContent')).toBeVisible();

          const combobox = await AllComponents.getLocator('combobox805MixedSingle');

          const initialValue = await combobox.evaluate((ele: SynCombobox) => ele.value);
          expect(initialValue).toEqual(1);
        }); // end initial value check
      }); // end single select

      test.describe('multi combobox', () => {
        test('should have an initial value of numeric 1', async ({ page }) => {
          const AllComponents = new AllComponentsPage(page, port);
          await AllComponents.loadInitialPage();
          await AllComponents.activateItem('comboboxLink');
          await expect(AllComponents.getLocator('comboboxContent')).toBeVisible();

          const combobox = await AllComponents.getLocator('combobox805MixedMulti');

          const initialValue = await combobox.evaluate((ele: SynCombobox) => ele.value);
          expect(initialValue).toEqual([1, 'three']);
        }); // end initial value check
      }); // end single select
    }); // feature#805

    test.describe(`Regression#885: ${name}`, () => {
      test('should allow to select zero as string', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);
        await AllComponents.loadInitialPage();
        await AllComponents.activateItem('comboboxLink');

        await expect(AllComponents.getLocator('comboboxContent')).toBeVisible();

        const combobox = await AllComponents.getLocator('combobox885ValueZeroString');
        // Check that the displayed value is the text content of the option
        const displayedValue = await combobox.evaluate((ele: SynCombobox) => ele.displayLabel);
        const value = await combobox.evaluate((ele: SynCombobox) => ele.value);

        expect(value).toEqual('0');
        expect(displayedValue).toEqual('Zero (string)');
      });

      test('should allow to select zero as number', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);
        await AllComponents.loadInitialPage();
        await AllComponents.activateItem('comboboxLink');

        await expect(AllComponents.getLocator('comboboxContent')).toBeVisible();

        const combobox = await AllComponents.getLocator('combobox885ValueZeroNumber');
        // Check that the displayed value is the text content of the option
        const displayedValue = await combobox.evaluate((ele: SynCombobox) => ele.displayLabel);
        const value = await combobox.evaluate((ele: SynCombobox) => ele.value);

        expect(value).toEqual(0);
        expect(displayedValue).toEqual('Zero (numeric)');
      });
    }); // regression#885
  }); // End frameworks
}); // </syn-combobox>
