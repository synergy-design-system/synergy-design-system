import {
  expect,
  test,
} from '@playwright/test';
import type {
  SynInput,
} from '@synergy-design-system/components';
import { type Framework, frameworks } from '../frameworks.config';
import { DemoForm } from './PageObjects/index.js';
import {
  getInputValue,
} from './helpers.js';

const availablePages = {
  form: '/contact-form',
  index: '/',
};

/**
 * Create test cases for a given framework
 * @param framework The framework to create the test cases for
 */
const createTestCaseFor = (framework: Framework) => {
  const { name, port } = framework;

  const host = `http://localhost:${port}`;

  /**
   * Get a navigation path
   * @param path The path to navigate to
   * @returns Path to navigate to
   */
  const getURL = (path: string = '') => `${host}${path}`;

  test.describe(`${name}: Contact form test on port ${port}`, () => {
    test('Form reset', async ({ page }) => {
      const form = new DemoForm(page);
      await form.goto(getURL(availablePages.form));

      // fill-out the form correctly
      await form.fill(page);

      // submit valid form
      await form.reset.click();

      // check reset state
      await form.checkInitialState(expect);
    });

    test('Invalid form submit', async ({ page }) => {
      const form = new DemoForm(page);
      await form.goto(getURL(availablePages.form));

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

    test('Form submit (native validation)', async ({ page }) => {
      const form = new DemoForm(page);
      await form.goto(getURL(availablePages.form));

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
      await form.fill(page);

      // submit valid form
      await form.submit.click();

      expect(submitted).toBe(true);

      // Not part of validation, but happiness should always be tested :)
      expect(await getInputValue(form.happiness)).toBe('9');

      expect(await form.form.evaluate((f) => (f as HTMLFormElement).checkValidity())).toBe(true);
    });
  });
};

frameworks.forEach(createTestCaseFor);
