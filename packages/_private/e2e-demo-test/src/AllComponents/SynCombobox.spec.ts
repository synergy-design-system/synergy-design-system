import { expect, test } from '@playwright/test';
import {
  type SynChangeEvent,
  type SynCombobox,
  type SynSelect,
} from '@synergy-design-system/components';
import { AllComponentsPage } from '../PageObjects/index.js';
import { createTestCases, fillField, hasEvent } from '../helpers.js';

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

        const combobox = await AllComponents.getLocator('combobox797');
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
          // eslint-disable-next-line no-param-reassign
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
          (ele: SynSelect) => [ele.value, ele.displayLabel],
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
        const waitForChange = hasEvent<SynChangeEvent>(page, 'syn-change');

        await fillField(combobox, 'lo', '.combobox__display-input', true);
        await waitForChange;

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
        const waitForChange = hasEvent<SynChangeEvent>(page, 'syn-change');

        await fillField(combobox, 'lo', '.combobox__display-input', true);
        await waitForChange;

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
        const waitForChange = hasEvent<SynChangeEvent>(page, 'syn-change');

        const displayedValue = await combobox.evaluate((ele: SynCombobox) => ele.displayLabel);
        const value = await combobox.evaluate((ele: SynCombobox) => ele.value);

        expect(value).toEqual('3');
        expect(displayedValue).toEqual('Advanced');

        await fillField(combobox, 'lo', '.combobox__display-input', true);
        await waitForChange;

        const displayedValueReset = await combobox.evaluate((ele: SynCombobox) => ele.displayLabel);
        const valueReset = await combobox.evaluate((ele: SynCombobox) => ele.value);

        expect(valueReset).toEqual('3');
        expect(displayedValueReset).toEqual('Advanced');
      });
    }); // regression#626
  }); // End frameworks
}); // </syn-combobox>
