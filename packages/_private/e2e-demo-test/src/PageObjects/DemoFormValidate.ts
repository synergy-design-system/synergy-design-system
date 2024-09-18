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
      this.email,
      this.password,
      this.newsSyn,
      this.newsBeta,
    ];
  }

  async fill() {
    await this.gender.getByText('Female').check();
    await fillField(this.name, 'Maxim');
    await fillField(this.email, 'max@musterman.de');

    await this.role.click();
    await this.frontend.click();

    await fillField(this.password, 'Password123');

    await this.newsSyn.click({
      position: { x: 20, y: 20 },
    });

    await this.newsBeta.click({
      position: { x: 20, y: 20 },
    });

    await fillTextArea(this.additionalInfo, 'Comment');

    // Drag the happiness handle to a 9 of 10 rating
    await this.happiness.dragTo(this.happiness, {
      targetPosition: { x: 1000, y: 50 },
    });
  }

  async checkInitialState(expect: Expect) {
    expect(await getInputValue(this.gender)).toBe('');
    expect(await getInputValue(this.role)).toBe('');
    expect(await getInputValue(this.name)).toBe('');
    expect(await getInputValue(this.email)).toBe('');
    expect(await getInputValue(this.birth)).toBe('');
    expect(await getInputValue(this.password)).toBe('invalid');
    expect(await getInputValue(this.passwordRecovery)).toBe('');

    const all = (await Promise.all(this.allRequiredInputs.map((input) => input.getAttribute('data-invalid'))));
    all.forEach((val) => expect(val).toBe(''));

    (await Promise.all(this.allRequiredInputs.map((input) => input.getAttribute('data-user-invalid'))))
      .forEach((val) => expect(val).toBeFalsy());
  }
}
