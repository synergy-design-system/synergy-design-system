import { Locator } from '@playwright/test';
import type { Expect } from '@playwright/test';
import { PageObject } from './PageObject.js';
import { BaseFormObject } from './BaseForm.js';
import {
  fillField,
  fillTextArea,
  getInputValue,
} from '../helpers.js';

export class DemoFormValidate extends BaseFormObject {
  protected initialPage: string = PageObject.availablePages.formValidate;

  get allRequiredInputs(): Locator[] {
    return [
      this.additionalInfo,
      this.gender,
      this.role,
      this.name,
      this.nationality,
      this.email,
      this.password,
      this.newsSyn,
      this.newsBeta,
      this.testingFrameworks,
    ];
  }

  async fill() {
    // Custom timeout.
    // This IS needed for react 19.2.0 to function properly with playwright
    // You may tweak this to lower numbers if it really matters,
    // but 20ms is a good balance and was not flaky in tests
    const timeout = 20;

    await this.gender.getByText('Female').check();
    await this.page.waitForTimeout(timeout);

    await fillField(this.name, 'Maxim');
    await this.page.waitForTimeout(timeout);

    await fillField(this.email, 'max@musterman.de');
    await this.page.waitForTimeout(timeout);

    await this.role.click();
    await this.page.waitForTimeout(timeout);

    await this.frontend.click();
    await this.page.waitForTimeout(timeout);

    await fillField(this.password, 'Password123');
    await this.page.waitForTimeout(timeout);

    await fillField(this.nationality, 'German', '.combobox__display-input');
    await this.page.waitForTimeout(timeout);

    await fillField(this.testingFrameworks, 'jest', '.combobox__display-input');
    await this.page.waitForTimeout(timeout);

    await fillField(this.testingFrameworks, 'jasmine', '.combobox__display-input');
    await this.page.waitForTimeout(timeout);

    await this.newsSyn.click({
      position: { x: 10, y: 10 },
    });
    await this.page.waitForTimeout(timeout);

    await this.newsBeta.click({
      position: { x: 10, y: 10 },
    });
    await this.page.waitForTimeout(timeout);

    await fillTextArea(this.additionalInfo, 'Comment');
    await this.page.waitForTimeout(timeout);

    // Drag the happiness handle to a 9 of 10 rating
    await this.happiness.dragTo(this.happiness, {
      targetPosition: { x: 1000, y: 50 },
    });
    await this.page.waitForTimeout(timeout);
  }

  async checkInitialState(expect: Expect) {
    expect(await getInputValue(this.gender)).toBe('');
    expect(await getInputValue(this.role)).toBe('');
    expect(await getInputValue(this.previousRoles)).toEqual(['backend', 'lead']);
    expect(await getInputValue(this.name)).toBe('');
    expect(await getInputValue(this.email)).toBe('');
    expect(await getInputValue(this.birth)).toBe('');
    expect(await getInputValue(this.password)).toBe('invalid');
    expect(await getInputValue(this.passwordRecovery)).toBe('');
    expect(await getInputValue(this.nationality)).toBe('');
    expect(await getInputValue(this.testingFrameworks)).toEqual([]);

    const all = (await Promise.all(this.allRequiredInputs.map((input) => input.getAttribute('data-invalid'))));
    all.forEach((val) => expect(val).toBe(''));

    (await Promise.all(this.allRequiredInputs.map((input) => input.getAttribute('data-user-invalid'))))
      .forEach((val) => expect(val).toBeFalsy());
  }
}
