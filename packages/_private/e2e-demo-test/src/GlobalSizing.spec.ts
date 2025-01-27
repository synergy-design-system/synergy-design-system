import { expect, test } from '@playwright/test';
import { DemoForm } from './PageObjects/index.js';
import {
  createTestCases,
} from './helpers.js';

const getRequiredInputs = async (form: DemoForm) => {
  const all = (await Promise.all(
    form.allRequiredInputs.map((input) => input.getAttribute('size')),
  ));

  return all;
};

// Default form tests
createTestCases(({ name, port }) => {
  test.describe(`${name}: Global Sizing on ${port}`, () => {
    ['small', 'medium', 'large'].forEach((size) => {
      test(`Setting the global size to ${size}`, async ({ page }) => {
        const form = new DemoForm(page, port);
        await form.loadInitialPage();

        const sizeButton = await form.getSizeToggle(size as 'small' | 'medium' | 'large');

        const allByDefault = await getRequiredInputs(form);
        expect(
          allByDefault.every(componentSize => componentSize === 'medium'),
          'All components should be medium by default',
        ).toBeTruthy();

        await expect(
          form.themeSwitch,
          'Theme switch should be small per default',
        ).toHaveAttribute('size', 'small');

        await sizeButton.click();

        const adjustedSize = await getRequiredInputs(form);
        expect(
          adjustedSize.every(componentSize => componentSize === size),
          `All components should be ${size} after clicking the button`,
        ).toBeTruthy();

        await expect(
          form.themeSwitch,
          'Theme switch should still be small after changing the size',
        ).toHaveAttribute('size', 'small');
      });
    });
  });
});
