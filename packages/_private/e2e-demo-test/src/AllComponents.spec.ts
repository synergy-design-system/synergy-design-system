import { expect, test } from '@playwright/test';
import { AllComponentsPage } from './PageObjects/index.js';
import {
  createTestCases,
} from './helpers.js';

// Tests for all components
createTestCases(({ name, port }) => {
  test.describe(`${name}: All components test on port ${port}`, () => {
    test.describe(`${name}: <SynAccordion /> ${port}`, () => {
      test('Should be able to open each item ', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);
        await AllComponents.loadInitialPage();

        // Initial state should be the first item is open
        await expect(AllComponents.getLocator('accordionContent')).toBeVisible();
      }); // End open
    }); // </syn-acordion>
  }); // /test-suite
}); // createTestCases
