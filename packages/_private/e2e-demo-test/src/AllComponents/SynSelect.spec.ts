import { expect, test } from '@playwright/test';
import {
  type SynSelect,
} from '@synergy-design-system/components';
import { AllComponentsPage } from '../PageObjects/index.js';
import { createTestCases } from '../helpers.js';

test.describe('<SynSelect />', () => {
  createTestCases(({ name, port }) => {
    test.describe(`Feature#540: ${name}`, () => {
      test('should select the given elements when the delimiter is set', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);
        await AllComponents.loadInitialPage();
        await AllComponents.activateItem('selectLink');
        await expect(AllComponents.getLocator('selectContent')).toBeVisible();

        const select = await AllComponents.getLocator('selectWithDelimiter');

        const initialValue = await select.evaluate((ele: SynSelect) => ele.value);
        const initialDelimiter = await select.evaluate((ele: SynSelect) => ele.delimiter);

        // Note when providing a delimiter, the value is a string,
        // so we need to check if the value is a string, too
        expect(initialValue).toEqual(['1', '2']);
        expect(initialDelimiter).toEqual('|');

        // Check that a change in the delimiter is reflected in the value
        await select.evaluate(async (ele: SynSelect) => {
          ele.delimiter = ' ';
          ele.value = '2 3';
          await ele.updateComplete;
        });

        const newValue = await select.evaluate((ele: SynSelect) => ele.value);

        // Note when providing a delimiter, the value is a string,
        // so we need to check if the value is a string, too
        expect(newValue).toEqual(['2', '3']);
      }); // end delimiter check
    }); // feature#540

    test.describe(`Feature#805: ${name}`, () => {
      test.describe('Single Select', () => {
        test('should have an initial value of numeric 1', async ({ page }) => {
          const AllComponents = new AllComponentsPage(page, port);
          await AllComponents.loadInitialPage();
          await AllComponents.activateItem('selectLink');
          await expect(AllComponents.getLocator('selectContent')).toBeVisible();

          const select = await AllComponents.getLocator('selectMixedIdSingleSelect');

          const initialValue = await select.evaluate((ele: SynSelect) => ele.value);
          expect(initialValue).toEqual(1);
        }); // end initial value check
      }); // end single select

      test.describe('multi select', () => {
        test('should have an initial value of numeric 1', async ({ page }) => {
          const AllComponents = new AllComponentsPage(page, port);
          await AllComponents.loadInitialPage();
          await AllComponents.activateItem('selectLink');
          await expect(AllComponents.getLocator('selectContent')).toBeVisible();

          const select = await AllComponents.getLocator('selectMixedIdMultiSelect');

          const initialValue = await select.evaluate((ele: SynSelect) => ele.value);
          expect(initialValue).toEqual([1, 'three']);
        }); // end initial value check
      }); // end single select
    }); // feature#805

    test.describe(`Regression#813: ${name}`, () => {
      test('should show the text content of the option, when value was set initially via property binding and options added dynamically', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);
        await AllComponents.loadInitialPage();
        await AllComponents.activateItem('selectLink');

        await expect(AllComponents.getLocator('selectContent')).toBeVisible();

        const select = await AllComponents.getLocator('selectLevel');
        // Check that the displayed value is the text content of the option
        const displayedValue = await select.evaluate((ele: SynSelect) => ele.displayLabel);

        expect(displayedValue).toEqual('Intermediate');
      });

      test('should reset the value of the select in a form to the initially set value via property binding', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);
        await AllComponents.loadInitialPage();
        await AllComponents.activateItem('selectLink');

        await expect(AllComponents.getLocator('selectContent')).toBeVisible();

        const select = await AllComponents.getLocator('selectForm');
        await select.click();
        const options = await AllComponents.getLocator('selectFormOptions');
        await options.last().click();

        const [value, displayedValue] = await select.evaluate(
          (ele: SynSelect) => [ele.value, ele.displayLabel],
        );
        expect(value).toEqual('option-3');
        expect(displayedValue).toEqual('Option 3');

        const reset = await AllComponents.getLocator('selectFormReset');
        await reset.click();

        const [resetValue, resetDisplayedValue] = await select.evaluate(
          (ele: SynSelect) => [ele.value, ele.displayLabel],
        );
        expect(resetValue).toEqual('option-1');
        expect(resetDisplayedValue).toEqual('Option 1');
      });
    }); // regression#813

    test.describe(`Regression#851: ${name}`, () => {
      test('should show the text content of the options, when value was set initially via normal binding and options added dynamically with multiple', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);
        await AllComponents.loadInitialPage();
        await AllComponents.activateItem('selectLink');

        await expect(AllComponents.getLocator('selectContent')).toBeVisible();

        const select = await AllComponents.getLocator('select851Multiple');
        // Check that the displayed value is the text content of the option
        const displayedValue = await select.evaluate((ele: SynSelect) => ele.displayLabel);
        const value = await select.evaluate((ele: SynSelect) => ele.value);

        expect(value).toEqual(['1', '2']);
        expect(displayedValue).toEqual('2 options selected');
      });
    }); // regression#851
  }); // End frameworks
}); // </syn-select>
