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

      // fill-out the form correctly and check the original state
      await form.fill();
      await form.reset.click();
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

    test('Form submit', async ({ page }) => {
      const form = new DemoFormValidate(page, port);
      await form.loadInitialPage();

      // react on submit / confirm dialog
      let submitted = false;
      page.on('dialog', dialog => {
        submitted = true;
        dialog
          .accept()
          .catch(() => {
            submitted = false;
          });
      });

      // check initial state
      await form.checkInitialState(expect);

      // fill-out the form correctly
      await form.fill();

      // submit valid form
      await form.submit.click();

      expect(submitted).toBe(true);

      expect(await form.form.evaluate((f) => (f as HTMLFormElement).checkValidity())).toBe(true);
    });
  });
});
