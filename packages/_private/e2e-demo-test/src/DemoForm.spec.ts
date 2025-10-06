import { expect, test } from '@playwright/test';
import type { SynInput } from '@synergy-design-system/components';
import { DemoForm } from './PageObjects/index.js';
import {
  createTestCases,
  getInputValue,
} from './helpers.js';

// Default form tests
createTestCases(({ name, port }) => {
  test.describe(`${name}: Contact form test on port ${port}`, () => {
    test('Form reset', async ({ page }) => {
      const form = new DemoForm(page, port);
      await form.loadInitialPage();

      // fill-out the form correctly and check the original state
      await form.fill();
      await form.reset.click();
      await form.checkInitialState(expect);
    });

    test('Invalid form submit', async ({ page }) => {
      const form = new DemoForm(page, port);
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

      // check not-invalid states of non-required inputs
      expect(await form.birth.getAttribute('data-user-invalid')).toBeFalsy();
      expect(await form.passwordRecovery.getAttribute('data-user-invalid')).toBeFalsy();
    });

    test('Form submit', async ({ page }) => {
      const form = new DemoForm(page, port);
      await form.loadInitialPage();

      // check initial state
      await form.checkInitialState(expect);

      // fill-out the form correctly
      await form.fill();

      // Promise-based dialog handling for better reliability
      const dialogHandled = new Promise<boolean>((resolve) => {
        page.once('dialog', async (dialog) => {
          try {
            await dialog.accept();
            resolve(true);
          } catch {
            resolve(false);
          }
        });
      });

      // submit valid form
      await form.submit.click();

      // Wait for dialog to be handled with timeout
      const submitted = await Promise.race([
        dialogHandled,
        new Promise<boolean>((resolve) => {
          setTimeout(() => resolve(false), 5000); // 5 second timeout
        }),
      ]);

      expect(submitted).toBe(true);

      // Not part of validation, but happiness should always be tested :)
      expect(await getInputValue(form.happiness)).toBe('9');

      // Same goes for experience, which should be set to "a little"
      expect(await getInputValue(form.experience)).toBe(1);

      expect(await form.form.evaluate((f) => (f as HTMLFormElement).checkValidity())).toBe(true);
    });
  });
});
