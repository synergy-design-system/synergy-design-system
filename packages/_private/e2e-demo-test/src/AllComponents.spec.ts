import { type Locator, expect, test } from '@playwright/test';
import type { SynCombobox, SynOptgroup, SynSelect } from '@synergy-design-system/components';
import { AllComponentsPage } from './PageObjects/index.js';
import {
  createTestCases,
} from './helpers.js';

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

    test.describe('Regression#813', () => {
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
  }); // </syn-combobox>

  test.describe(`${name}: <SynOptgroup /> ${port}`, () => {
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

    test.describe('Regression#815', () => {
      test('should reenable <syn-option> elements that where enabled before disabling the <syn-optgroup>', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);

        await AllComponents.loadInitialPage();
        await AllComponents.activateItem('optgroupLink');

        // Tests for section 1: Each item is disabled
        await expect(AllComponents.getLocator('optgroupFirstEnabledItems'), 'First opt-group should have 3 enabled options').toHaveCount(3);
        await setDisabled(AllComponents.getLocator('optgroupFirstItem'), true);
        await expect(AllComponents.getLocator('optgroupFirstEnabledItems'), 'First opt-group should have 0 enabled options').toHaveCount(0);
        await setDisabled(AllComponents.getLocator('optgroupFirstItem'), false);
        await expect(AllComponents.getLocator('optgroupFirstEnabledItems'), 'First opt-group should have 3 enabled options').toHaveCount(3);

        // Tests for section 2: We have a mix of enabled and disabled items
        await expect(AllComponents.getLocator('optgroupSecondEnabledItems'), 'Second opt-group should have 2 enabled options as the opt-group is enabled one of the children is disabled').toHaveCount(2);
        await setDisabled(AllComponents.getLocator('optgroupSecondItem'), true);
        await expect(AllComponents.getLocator('optgroupSecondEnabledItems'), 'Second opt-group should have 0 enabled options').toHaveCount(0);
        await setDisabled(AllComponents.getLocator('optgroupSecondItem'), false);
        await expect(AllComponents.getLocator('optgroupSecondEnabledItems'), 'Second opt-group should have 2 enabled options').toHaveCount(2);

        // Tests for section 3: We have a mix of enabled and disabled items
        await expect(AllComponents.getLocator('optgroupThirdEnabledItems'), 'Third opt-group should have 0 enabled options as the opt-group is disabled').toHaveCount(0);
        await setDisabled(AllComponents.getLocator('optgroupThirdItem'), false);
        await expect(AllComponents.getLocator('optgroupThirdEnabledItems'), 'Third opt-group should have 2 enabled options after enabling it').toHaveCount(2);
        await setDisabled(AllComponents.getLocator('optgroupThirdItem'), true);
        await expect(AllComponents.getLocator('optgroupThirdEnabledItems'), 'Third opt-group should have 0 enabled options after disabling again').toHaveCount(0);
      });
    }); // regression#815
  }); // </syn-optgroup>

  test.describe(`${name}: <SynSelect /> ${port}`, () => {
    test.describe('Regression#813', () => {
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
  }); // </syn-select>

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
