import { expect, test } from '@playwright/test';
import type { SynInput } from '@synergy-design-system/components';
import { DemoFormValidate } from './PageObjects/index.js';
import { createTestCases } from './helpers.js';

// Default form tests
createTestCases(({ name, port }) => {
  // Validate form tests
  test.describe(`${name}: Validation form test on port ${port}`, () => {
    test('Form reset', async ({ page }) => {
      const form = new DemoFormValidate(page, port);
      await form.loadInitialPage();

      // fill-out the form correctly
      await form.fill();

      // submit valid form
      await form.reset.click();

      // check reset state
      await form.checkInitialState(expect);
    });

    test('Invalid form submit', async ({ page }) => {
      const form = new DemoFormValidate(page, port);
      await form.loadInitialPage();

      // submit invalid form
      await form.submit.click();

      // check invalid states of required inputs
      const states = await Promise.all(
        form.allRequiredInputs.map(
          input => input.evaluate(el => (el as SynInput).validity.valid),
        ),
      );
      expect(states.length).toBe(form.allRequiredInputs.length);
      expect(states.every((state) => !state)).toBe(true);
    });
  });
});
