import { expect, test } from '@playwright/test';
import { AllComponentsPage } from '../PageObjects/index.js';
import { createTestCases } from '../helpers.js';

test.describe('<SynAccordion />', () => {
  createTestCases(({ name, port }) => {
    test(`${name}: should be visible with three <syn-details>`, async ({ page }) => {
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
