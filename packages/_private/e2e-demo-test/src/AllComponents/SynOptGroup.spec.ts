import { type Locator, expect, test } from '@playwright/test';
import { type SynOptgroup } from '@synergy-design-system/components';
import { AllComponentsPage } from '../PageObjects/index.js';
import { createTestCases } from '../helpers.js';

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

test.describe('<SynOptgroup />', () => {
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
