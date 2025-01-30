import { expect, test } from '@playwright/test';
import { AllComponentsPage } from './PageObjects/index.js';
import {
  createTestCases,
} from './helpers.js';

test.describe('All components tests', () => {
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
  }); // End createTestCases
}); // /test-suite
