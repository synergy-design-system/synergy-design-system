import { Locator, expect, test } from '@playwright/test';
import type SynInput from '../../../components/src/components/input/input.component';
import type SynTextarea from '../../../components/src/components/textarea/textarea.component';
import type SynCheckbox from '../../../components/src/components/checkbox/checkbox.component';
import type SynSwitch from '../../../components/src/components/switch/switch.component';
import type SynSelect from '../../../components/src/components/select/select.component';
import { type Framework, frameworks } from '../frameworks.config';
import TestPage from './test.page';

const availablePages = {
  form: '/contact-form',
  index: '/',
};

async function getInputValue(locator: Locator) {
  return locator.evaluate((el: SynInput | SynTextarea | SynSelect) => el.value);
}

async function getCheckedValue(locator: Locator) {
  return locator.evaluate((el: SynCheckbox | SynSwitch) => el.checked);
}

/**
 * Set the locators inner inputs value
 * @param locator The original form locator
 * @param value The value to set
 */
async function fillField(locator: Locator, value: string) {
  await locator.focus();
  await locator.locator('input').fill(value);
  await locator.blur();
}

async function fillForm(form: TestPage) {
  await form.gender.getByText('Female').check();
  await fillField(form.name, 'Maxim');
  await fillField(form.email, 'max@musterman.de');
  await fillField(form.phone, '666');

  // await form.role.evaluate(role => (role as SynSelect).value = 'frontend');
  await form.role.click();
  await form.frontend.click();

  await fillField(form.birth, '2000-02-29');
  await fillField(form.password, 'Password123');
  await fillField(form.passwordRecovery, '1234');
  await form.topics.click();
  await form.angular.click();
  await form.topics.evaluate((role: SynSelect) => {
    // eslint-disable-next-line no-param-reassign
    role.open = false;
    role.blur();
  });

  // Drag the happiness handle to a 9 of 10 rating
  await form.happiness.dragTo(form.happiness, {
    targetPosition: { x: 1000, y: 50 },
  });
}

async function checkInitialState(form: TestPage) {
  expect(await getInputValue(form.gender)).toBe('');
  expect(await getInputValue(form.role)).toBe('');
  expect(await getInputValue(form.name)).toBe('');
  expect(await getInputValue(form.email)).toBe('');
  expect(await getInputValue(form.phone)).toBe('');
  expect(await getInputValue(form.birth)).toBe('');
  expect(await getInputValue(form.password)).toBe('invalid');
  expect(await getInputValue(form.passwordRecovery)).toBe('');
  expect(await getInputValue(form.topics)).toEqual([]);
  expect(await getInputValue(form.additionalInfo)).toBe('');
  expect(await getInputValue(form.happiness)).toBe('5');
  (await Promise.all(form.allNews.map((news) => getCheckedValue(news))))
    .forEach((val) => expect(val).toBeFalsy());

  const all = (await Promise.all(form.allRequiredInputs.map((input) => input.getAttribute('data-invalid'))));
  all.forEach((val) => expect(val).toBe(''));

  (await Promise.all(form.allRequiredInputs.map((input) => input.getAttribute('data-user-invalid'))))
    .forEach((val) => expect(val).toBeFalsy());
}

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
      const form = new TestPage(page);
      await form.goto(getURL(availablePages.form));

      // fill-out the form correctly
      await fillForm(form);

      // submit valid form
      await form.reset.click();

      // check reset state
      await checkInitialState(form);
    });

    test('Invalid form submit', async ({ page }) => {
      const form = new TestPage(page);
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

    test('Form submit', async ({ page }) => {
      const form = new TestPage(page);
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
      await checkInitialState(form);

      // fill-out the form correctly
      await fillForm(form);

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
