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

    test('Form submit', async ({ page, browserName }) => {
      // I am not sure why, but only in Chromium the react demo project crashes if we do not
      // listen to console messages. It works in firefox and webkit without this.
      // PLEASE LEAVE IT HERE, OBSCURE AS IT MAY BE!
      // See test outputs for https://github.com/synergy-design-system/synergy-design-system/pull/1035
      if (browserName === 'chromium' && name === 'react') {
        page.on('console', msg => {
          if (msg.type() === 'debug') {
            console.log(`Browser console [${msg.type()}]:`, msg.text());
          }
        });
      }

      const form = new DemoFormValidate(page, port);
      await form.loadInitialPage();

      // check initial state
      await form.checkInitialState(expect);

      // fill-out the form correctly
      await form.fill();

      // submit valid form
      await form.submit.click();

      // This has to come before checking for the message,
      // as react 19.2 will re-render the form and reset its state before the message is shown
      expect(await form.form.evaluate((f) => (f as HTMLFormElement).checkValidity())).toBe(true);

      // Check that the success message is shown
      await expect(form.formStatus).toHaveAttribute('open');
      await expect(form.formStatus).toHaveAttribute('variant', 'success');
      await expect(form.formStatus).toContainText('successfully');
    });
  });
});
