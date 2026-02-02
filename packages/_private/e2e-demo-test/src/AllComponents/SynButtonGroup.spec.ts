import { expect, test } from '@playwright/test';
import { AllComponentsPage } from '../PageObjects/index.js';
import { createTestCases } from '../helpers.js';

test.describe('<SynButtonGroup />', () => {
  createTestCases(({ name, port }) => {
    test(`${name}: should render all size combinations correctly`, async ({ page }) => {
      const AllComponents = new AllComponentsPage(page, port);
      await AllComponents.loadInitialPage();

      // Navigate to button group section
      await AllComponents.activateItem('buttonGroupLink');
      await expect(AllComponents.getLocator('buttonGroupContent')).toBeVisible();

      // Get all button groups within the button group content area, skipping the first one
      const buttonGroups = AllComponents.getLocator('buttonGroupContent').locator('syn-button-group').nth(1).locator('xpath=following-sibling::syn-button-group | .');

      // Should have 6 button groups (3 sizes × 2 variants)
      await expect(buttonGroups).toHaveCount(6);

      // Check that all button groups have the correct sizes
      const sizes = await buttonGroups.evaluateAll(
        groups => groups.map(group => group.getAttribute('size')),
      );

      // Should have 2 of each size (one for each variant: outline and filled)
      const expectedSizes = ['small', 'small', 'medium', 'medium', 'large', 'large'];
      expect(sizes.sort()).toEqual(expectedSizes.sort());

      // Check that all button groups have the correct variants
      const variants = await buttonGroups.evaluateAll(
        groups => groups.map(group => group.getAttribute('variant')),
      );

      // Should have 3 outline and 3 filled variants (one for each size)
      const outlineCount = variants.filter(v => v === 'outline').length;
      const filledCount = variants.filter(v => v === 'filled').length;
      expect(outlineCount).toBe(3);
      expect(filledCount).toBe(3);
    }); // Test sizes and variants
  }); // End frameworks
}); // </syn-button-group>
