import { expect, test } from '@playwright/test';
import type { SynInput } from '@synergy-design-system/components';
import { DemoForm } from './PageObjects/index.js';
import {
  clickFormControl,
  createTestCases,
  getCheckedValue,
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
      await expect(form.birth).not.toHaveAttribute('data-user-invalid');
      await expect(form.passwordRecovery).not.toHaveAttribute('data-user-invalid');
    });

    test('Form submit', async ({ page }) => {
      const form = new DemoForm(page, port);
      await form.loadInitialPage();

      // check initial state
      await form.checkInitialState(expect);

      // fill-out the form correctly
      await form.fill();

      // submit valid form
      await form.submit.click();

      // Check that the success message is shown
      await expect(form.formStatus).toHaveAttribute('open');
      await expect(form.formStatus).toHaveAttribute('variant', 'success');
      await expect(form.formStatus).toContainText('successfully');

      // Not part of validation, but happiness should always be tested :)
      expect(await getInputValue(form.happiness)).toBe('9');

      // Same goes for experience, which should be set to "a little"
      expect(await getInputValue(form.experience)).toBe(1);

      expect(await form.form.evaluate((f) => (f as HTMLFormElement).checkValidity())).toBe(true);
    });

    test('Readonly form fields', async ({ page }) => {
      const form = new DemoForm(page, port);
      await form.loadInitialPage();

      // check initial state
      await form.checkInitialState(expect);

      // Check that the readonly elements are actually present and visible on the page
      await Promise.all(
        form.readonlyFields.map(
          field => expect(
            field,
            'Readonly field should be visible on the page',
          ).toBeVisible(),
        ),
      );

      // Check that the readonly fields don't change when clicked
      await Promise.all(
        form.readonlyFields.map(async (field) => {
          const initialChecked = await getCheckedValue(field);
          // Use the helper to click on the correct control based on component type
          await clickFormControl(field);
          const afterClickChecked = await getCheckedValue(field);

          return expect(
            afterClickChecked,
            'Readonly field should not change state when clicked',
          ).toBe(initialChecked);
        }),
      );
    }); // End of readonly form fields test
  });
});
