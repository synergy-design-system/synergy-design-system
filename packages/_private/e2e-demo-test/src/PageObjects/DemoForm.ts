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

/**
 * Page object for the demo form
 */
export class DemoForm extends BaseFormObject {
  protected initialPage: string = PageObject.availablePages.form;

  get newsNg(): Locator {
    return this.page.locator(selectors.newsLocSynNg);
  }

  get newsReact(): Locator {
    return this.page.locator(selectors.newsLocSynReact);
  }

  get newsVue(): Locator {
    return this.page.locator(selectors.newsLocSynVue);
  }

  get newsVanilla(): Locator {
    return this.page.locator(selectors.newsLocVanilla);
  }

  get allNews(): Array<Locator> {
    return [
      this.newsBeta,
      this.newsNg,
      this.newsReact,
      this.newsSyn,
      this.newsVanilla,
      this.newsVue,
    ];
  }

  get phone(): Locator {
    return this.page.locator(selectors.phoneLoc);
  }

  get topics(): Locator {
    return this.page.locator(selectors.topicLoc);
  }

  get donations(): Locator {
    return this.page.locator(selectors.donations);
  }

  get allRequiredInputs(): Array<Locator> {
    return [
      this.name,
      this.password,
      this.role,
      this.email,
      this.phone,
      this.gender,
    ];
  }

  get angular(): Locator {
    return this.page.locator(selectors.angular);
  }

  async fill() {
    await this.gender.getByText('Female').check();
    await fillField(this.name, 'Maxim');
    await fillField(this.email, 'max@musterman.de');
    await fillField(this.phone, '666');

    // await form.role.evaluate(role => (role as SynSelect).value = 'frontend');
    await this.role.click();
    await this.frontend.click();

    await fillField(this.birth, '2000-02-29');
    await fillField(this.password, 'Password123');
    await fillField(this.passwordRecovery, '1234');
    await this.topics.click();
    await this.angular.click();
    await this.topics.evaluate((role: SynSelect) => {
      // eslint-disable-next-line no-param-reassign
      role.open = false;
      role.blur();
    });

    // Drag the happiness handle to a 9 of 10 rating
    await this.happiness.dragTo(this.happiness, {
      targetPosition: { x: 1000, y: 50 },
    });

    // Drag the donations handle to a - - 100% rating
    const firstKnob = await this.donations.locator('.thumb').first().evaluate((knob: HTMLDivElement) => `#donations #${knob.id}`);
    const firstTick = '#donations syn-range-tick:first-of-type';

    await this.page.dragAndDrop(firstKnob, firstTick);

    const lastKnob = await this.donations.locator('.thumb').last().evaluate((knob: HTMLDivElement) => `#donations #${knob.id}`);
    const lastTick = '#donations syn-range-tick:last-of-type';

    await this.page.dragAndDrop(lastKnob, lastTick);
  }

  async checkInitialState(expect: Expect) {
    expect(await getInputValue(this.gender)).toBe('');
    expect(await getInputValue(this.role)).toBe('');
    expect(await getInputValue(this.name)).toBe('');
    expect(await getInputValue(this.email)).toBe('');
    expect(await getInputValue(this.phone)).toBe('');
    expect(await getInputValue(this.birth)).toBe('');
    expect(await getInputValue(this.password)).toBe('invalid');
    expect(await getInputValue(this.passwordRecovery)).toBe('');
    expect(await getInputValue(this.topics)).toEqual([]);
    expect(await getInputValue(this.additionalInfo)).toBe('');
    expect(await getInputValue(this.happiness)).toBe('5');
    expect(await getInputValue(this.donations)).toBe('2000 4000');

    const allNews = await Promise.all(this.allNews.map((news) => getCheckedValue(news)));
    allNews.forEach(val => expect(val).toBeFalsy());

    const all = (await Promise.all(this.allRequiredInputs.map((input) => input.getAttribute('data-invalid'))));
    all.forEach((val) => expect(val).toBe(''));

    (await Promise.all(this.allRequiredInputs.map((input) => input.getAttribute('data-user-invalid'))))
      .forEach((val) => expect(val).toBeFalsy());
  }
}
