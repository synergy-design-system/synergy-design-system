import { type Locator, expect, test } from '@playwright/test';
import type {
  SynCombobox,
  SynInput,
  SynOptgroup,
  SynSelect,
} from '@synergy-design-system/components';
import {
  modernNumericStrategy,
  nativeNumericStrategy,
} from '@synergy-design-system/components/components/input/strategies.js';
import { AllComponentsPage } from './PageObjects/index.js';
import {
  createTestCases,
  fillInput,
  waitForEvent,
} from './helpers.js';

test.describe('<SynAccordion />', () => {
  createTestCases(({ name, port }) => {
    test(`${name}: show be visible with three <syn-details>`, async ({ page }) => {
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
  }); // End frameworks
}); // </syn-accordion>

test.describe('<SynAlert />', () => {
  createTestCases(({ name, port }) => {
    test(`${name}: should support 5 different variants`, async ({ page }) => {
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
  }); // End frameworks
}); // </syn-alert>

test.describe('<SynCombobox />', () => {
  createTestCases(({ name, port }) => {
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
  }); // End frameworks
}); // </syn-combobox>

test.describe('<SynInput />', () => {
  createTestCases(({ name, port }) => {
    test.describe(`Feature#417: ${name}`, () => {
      test.skip(name !== 'react', 'only implemented in react currently!');
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

          const eventPromise = waitForEvent(page, 'syn-change');

          const inputNative = await AllComponents.getLocator('input417NumericNative');

          await fillInput(inputNative, '-5');
          await eventPromise;

          const data = await inputNative.evaluate((el: SynInput) => {
            const { validity, value, valueAsNumber } = el;
            const isValid = validity.valid;
            return {
              isValid,
              value,
              valueAsNumber,
            };
          });

          expect(data.value, 'Value should be set to a string of "-5"').toEqual('-5');
          expect(data.valueAsNumber, 'valueAsNumber should be set to float -5').toEqual(-5);
          expect(data.isValid, 'The field should be flagged as invalid').toBeFalsy();
        }); // end set value lower than min
      }); // end native numeric strategy
    }); // feature#417
  }); // End frameworks
}); // </syn-input>

test.describe('<SynOptgroup />', () => {
  /**
   * Creates an option for the given locator
   */
  const appendOption = async (
    optgroup: Locator,
    disabled: boolean = false,
    textContent: string = 'Option',
  ) => {
    const option = await optgroup.evaluateHandle((
      el: SynOptgroup,
      [locatorDisabled, locatorTextContent],
    ) => {
      const newOption = document.createElement('syn-option');
      newOption.value = 'option-1';
      newOption.textContent = locatorTextContent as string;
      newOption.disabled = locatorDisabled as boolean;
      el.appendChild(newOption);
      return newOption;
    }, [disabled, textContent]);
    return option;
  };
  /**
   * Set the disabled prop of a given locator
   * @param locator The locator to set disabled for
   * @param disabled The value of the disabled prop
   */
  const setDisabled = async (locator: Locator, disabled: boolean) => {
    await locator.evaluateHandle((el: SynOptgroup, locatorDisabled) => {
      el.disabled = locatorDisabled;
    }, disabled);
  };

  createTestCases(({ name, port }) => {
    test.describe(`Regression#815: ${name}`, () => {
      test('should reenable <syn-option> elements that where enabled before disabling the <syn-optgroup>', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);

        await AllComponents.loadInitialPage();
        await AllComponents.activateItem('optgroupLink');

        // Tests for section 1: Each item is disabled
        await expect(AllComponents.getLocator('optgroupFirstEnabledItems'), 'First optgroup should have 3 enabled options as it is not disabled').toHaveCount(3);
        await setDisabled(AllComponents.getLocator('optgroupFirstItem'), true);
        await expect(AllComponents.getLocator('optgroupFirstEnabledItems'), 'First optgroup should have 0 enabled options after disabling it').toHaveCount(0);
        await setDisabled(AllComponents.getLocator('optgroupFirstItem'), false);
        await expect(AllComponents.getLocator('optgroupFirstEnabledItems'), 'First optgroup should have 3 enabled options after reenabling it').toHaveCount(3);

        // Tests for section 2: We have a mix of enabled and disabled items
        await expect(AllComponents.getLocator('optgroupSecondEnabledItems'), 'Second optgroup should have 2 enabled options as the optgroup is enabled and one of the children is disabled').toHaveCount(2);
        await setDisabled(AllComponents.getLocator('optgroupSecondItem'), true);
        await expect(AllComponents.getLocator('optgroupSecondEnabledItems'), 'Second optgroup should have 0 enabled options after disabling it').toHaveCount(0);
        await setDisabled(AllComponents.getLocator('optgroupSecondItem'), false);
        await expect(AllComponents.getLocator('optgroupSecondEnabledItems'), 'Second optgroup should have 2 enabled options after reenabling it').toHaveCount(2);

        // Tests for section 3: We have a mix of enabled and disabled items
        await expect(AllComponents.getLocator('optgroupThirdEnabledItems'), 'Third optgroup should have 0 enabled options as the optgroup is disabled').toHaveCount(0);
        await setDisabled(AllComponents.getLocator('optgroupThirdItem'), false);
        await expect(AllComponents.getLocator('optgroupThirdEnabledItems'), 'Third optgroup should have 2 enabled options after enabling it').toHaveCount(2);
        await setDisabled(AllComponents.getLocator('optgroupThirdItem'), true);
        await expect(AllComponents.getLocator('optgroupThirdEnabledItems'), 'Third optgroup should have 0 enabled options after disabling again').toHaveCount(0);
      });

      test('should add a disabled checkbox to the <syn-optgroup> when its disabled prop is set', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);

        await AllComponents.loadInitialPage();
        await AllComponents.activateItem('optgroupLink');

        // Baseline tests
        await expect(AllComponents.getLocator('optgroupThirdItem'), 'First optgroup should be disabled').toHaveJSProperty('disabled', true);
        await expect(AllComponents.getLocator('optgroupThirdEnabledItems'), 'Third optgroup should have 3 disabled options initially').toHaveCount(0);

        // Add a new disabled option and see if the count adds up
        await appendOption(AllComponents.getLocator('optgroupThirdItem'), true, 'Disabled option');
        await expect(AllComponents.getLocator('optgroupThirdEnabledItems'), 'Third optgroup should include 4 disabled option after adding an option that is also disabled').toHaveCount(0);

        // Add a new enabled option and see if the count adds up
        await appendOption(AllComponents.getLocator('optgroupThirdItem'), false, 'Enabled option');
        await expect(AllComponents.getLocator('optgroupThirdEnabledItems'), 'Third optgroup should include 5 disabled option after adding an option that is not disabled').toHaveCount(0);

        // When enabling the optgroup, only the last option should count as enabled item
        await setDisabled(AllComponents.getLocator('optgroupThirdItem'), false);
        await expect(AllComponents.getLocator('optgroupThirdEnabledItems'), 'Third optgroup should have 3 enabled options after enabling the optgroup as one dynamic option was added with disabled state and one item has its disabled state set to true on mount').toHaveCount(3);
      });
    }); // regression#815
  }); // End frameworks
}); // </syn-optgroup>

test.describe('<SynSelect />', () => {
  createTestCases(({ name, port }) => {
    test.describe(`Feature#540: ${name}`, () => {
      test('should select the given elements when the delimiter is set', async ({ page }) => {
        // Angular currently has problems with selection.
        // @todo: Remove this after #847 is fixed!
        test.skip(name === 'angular', 'Angular currently has problems with selection. Please see #847');

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
  }); // End frameworks
}); // </syn-select>

test.describe('<SynTabGroup />', () => {
  createTestCases(({ name, port }) => {
    test.describe(`Regression#757: ${name}`, () => {
      test('should not trigger the parent tab navigation when activating a subtab', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);
        await AllComponents.loadInitialPage();

        const tabGroupLink = AllComponents.getLocator('tabGroupLink');
        const tabGroupCustom = AllComponents.getLocator('tabGroupCustom');
        const tabGroupGeneral = AllComponents.getLocator('tabGroupGeneral');
        const tabGroupAdvanced = AllComponents.getLocator('tabGroupAdvanced');

        // Check if the active tab is adjusted when navigating
        await expect(tabGroupLink).toHaveJSProperty('active', false);
        await AllComponents.activateItem('tabGroupLink');
        await expect(tabGroupLink).toHaveJSProperty('active', true);

        // Check if the active tab of the given sub tab group is adjusted when navigating
        await expect(tabGroupCustom).toBeVisible();
        await expect(tabGroupCustom).toHaveJSProperty('active', false);
        await expect(tabGroupGeneral).toBeVisible();
        await expect(tabGroupGeneral).toHaveJSProperty('active', false);
        await expect(tabGroupAdvanced).toBeVisible();
        await expect(tabGroupAdvanced).toHaveJSProperty('active', true);

        await tabGroupCustom.click();
        await expect(tabGroupCustom).toHaveJSProperty('active', true);
        await expect(tabGroupAdvanced).toHaveJSProperty('active', false);

        // Finally, check if the parent tab is still active
        await expect(tabGroupLink).toHaveJSProperty('active', true);
      });
    }); // regression#757
    test.describe(`Regression#814: ${name}`, () => {
      test('should show the new added active tab with panel', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);
        await AllComponents.loadInitialPage();
        await AllComponents.activateItem('tabGroupLink');

        const tabGroupAdvanced = await AllComponents.getLocator('tabGroupAdvanced');
        const addTabButton = await AllComponents.getLocator('tabGroupAddTabButton');
        const tabGroupAdded = await AllComponents.getLocator('tabGroupAdded');
        const tabGroupAddedPanel = await AllComponents.getLocator('tabGroupAddedPanel');

        await expect(tabGroupAdvanced).toBeVisible();
        await expect(tabGroupAdvanced).toHaveJSProperty('active', true);
        await expect(tabGroupAdded).toBeHidden();
        await expect(tabGroupAddedPanel).toBeHidden();

        await addTabButton.click();

        // Check that the newly added active tab and panel are visible and have property active=true
        await expect(tabGroupAdvanced).toBeVisible();
        await expect(tabGroupAdvanced).toHaveJSProperty('active', false);
        await expect(tabGroupAdded).toBeVisible();
        await expect(tabGroupAdded).toHaveJSProperty('active', true);
        await expect(tabGroupAddedPanel).toBeVisible();
        await expect(tabGroupAddedPanel).toHaveJSProperty('active', true);
      });
    }); // regression#814
  }); // End frameworks
});
