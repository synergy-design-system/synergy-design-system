import { expect, test } from '@playwright/test';
import { AllComponentsPage } from '../PageObjects/index.js';
import { createTestCases } from '../helpers.js';

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
