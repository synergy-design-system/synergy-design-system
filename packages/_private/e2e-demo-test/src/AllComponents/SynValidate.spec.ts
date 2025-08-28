import { expect, test } from '@playwright/test';
import { AllComponentsPage } from '../PageObjects/index.js';
import { createTestCases, fillInput, runActionAndValidateEvents } from '../helpers.js';

test.describe('<SynValidate />', () => {
  createTestCases(({ name, port }) => {
    test.describe(`Regression#915: ${name}`, () => {
      test('should have data-user-invalid attribute after revalidation was triggered via custom event', async ({ page }) => {
        const AllComponents = new AllComponentsPage(page, port);
        await AllComponents.loadInitialPage();

        // Initial state should be the first item is open
        await AllComponents.activateItem('validateLink');
        await expect(AllComponents.getLocator('validateContent')).toBeVisible();

        const validate = AllComponents.getLocator('validate915');
        const input = validate.locator('syn-input');

        await runActionAndValidateEvents(
          page,
          () => fillInput(input, 'invalid'),
          [
            { event: 'syn-change', shouldFire: true },
          ],
        );

        await expect(input, 'data-invalid attribute should be available').toHaveAttribute('data-invalid', '');
        await expect(input, 'data-user-invalid attribute should be available').toHaveAttribute('data-user-invalid', '');
      });
    }); // regression#915
  }); // End frameworks
}); // </syn-accordion>
