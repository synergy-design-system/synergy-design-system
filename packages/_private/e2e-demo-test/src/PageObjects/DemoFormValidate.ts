import { Locator } from '@playwright/test';
import type { Expect } from '@playwright/test';
import type { SynSelect } from '@synergy-design-system/components';
import selectors from '../test.selector';
import { PageObject } from './PageObject.js';
import { BaseFormObject } from './BaseForm.js';
import {
  fillField,
  getCheckedValue,
  getInputValue,
} from '../helpers.js';

export class DemoFormValidate extends BaseFormObject {
  protected initialPage: string = PageObject.availablePages.formValidate;

  get allRequiredInputs(): Locator[] {
    return [
      this.name,
      this.password,
      this.role,
      this.email,
      this.gender,
    ];
  }

  async fill() {
    await this.gender.getByText('Female').check();
    await fillField(this.name, 'Maxim');
    await fillField(this.email, 'max@musterman.de');

    // await form.role.evaluate(role => (role as SynSelect).value = 'frontend');
    await this.role.click();
    await this.frontend.click();

    await fillField(this.password, 'Password123');

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
    expect(await getInputValue(this.password)).toBe('invalid');

    const all = (await Promise.all(this.allRequiredInputs.map((input) => input.getAttribute('data-invalid'))));
    all.forEach((val) => expect(val).toBe(''));

    (await Promise.all(this.allRequiredInputs.map((input) => input.getAttribute('data-user-invalid'))))
      .forEach((val) => expect(val).toBeFalsy());
  }
}
