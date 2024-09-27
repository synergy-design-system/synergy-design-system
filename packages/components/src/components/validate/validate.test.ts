import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/synergy.js';
import * as utils from '../../../dist/components/validate/utility.js';
import type SynValidate from './validate.js';

describe('<syn-validate>', () => {
  describe('utility functions', () => {
    describe('arraysDiffer', () => {
      it('should return true if the arrays differ', async () => {
        await expect(utils.arraysDiffer(['a', 'b'], ['a', 'c'])).to.equal(true);
        await expect(utils.arraysDiffer(['a'], ['a', 'b'])).to.equal(true);
      });

      it('should return true if the array is the same', async () => {
        await expect(utils.arraysDiffer(['a', 'b'], ['a', 'b'])).to.equal(false);
        await expect(utils.arraysDiffer(['a', 'b'], ['b', 'a'])).to.equal(false);
      });
    });

    describe('event utils', () => {
      it('isBlurEvent should return true if the given event is a blur event', async () => {
        await expect(utils.isBlurEvent('blur')).to.equal(true);
        await expect(utils.isBlurEvent('syn-blur')).to.equal(true);
        await expect(utils.isBlurEvent('something')).to.equal(false);
      });

      it('isChangeEvent should return true if the given event is a change event', async () => {
        await expect(utils.isChangeEvent('change')).to.equal(true);
        await expect(utils.isChangeEvent('syn-change')).to.equal(true);
        await expect(utils.isChangeEvent('something')).to.equal(false);
      });

      it('isInvalidEvent should return true if the given event is a invalid event', async () => {
        await expect(utils.isInvalidEvent('invalid')).to.equal(true);
        await expect(utils.isInvalidEvent('syn-invalid')).to.equal(true);
        await expect(utils.isInvalidEvent('something')).to.equal(false);
      });

      it('should return an array of event names from a space separated string', async () => {
        await expect(utils.normalizeEventAttribute('blur change')).to.deep.equal(['blur', 'change']);
        await expect(utils.normalizeEventAttribute('blur   change  ')).to.deep.equal(['blur', 'change']);
        await expect(utils.normalizeEventAttribute('blur change invalid')).to.deep.equal(['blur', 'change', 'invalid']);
        await expect(utils.normalizeEventAttribute('')).to.deep.equal([]);
      });

      it('should return the sanitized event name when getEventNameForElement is used', async () => {
        const elNative = document.createElement('input');
        await expect(utils.getEventNameForElement(elNative, 'blur')).to.deep.equal('blur');

        const elSyn = document.createElement('syn-input');
        await expect(utils.getEventNameForElement(elSyn, 'blur')).to.deep.equal('syn-blur');
      });
    });

    describe('when using the custom onConverter', () => {
      it('should return an array of event names when toAttribute is used', async () => {
        const converter = utils.onConverter();
        await expect(converter.toAttribute!('blur change')).to.deep.equal(['blur', 'change']);
        await expect(converter.toAttribute!('blur   change  ')).to.deep.equal(['blur', 'change']);
        await expect(converter.toAttribute!('blur change invalid')).to.deep.equal(['blur', 'change', 'invalid']);
        await expect(converter.toAttribute!('')).to.deep.equal([]);
      });
    });
  });

  it('should be accessible', async () => {
    const el = await fixture<SynValidate>(html`
      <syn-validate>
        <syn-input label="Email" type="email"></syn-input>
      </syn-validate>
    `);
    await expect(el).to.be.accessible();
  });

  it('defaults', async () => {
    const el = await fixture<SynValidate>(html`
      <syn-validate>
        <syn-input label="Email" type="email"></syn-input>
      </syn-validate>
    `);

    await expect(el.inline).to.equal(false);
    await expect(el.hideIcon).to.equal(false);
    await expect(el.on).to.equal('');
    await expect(el.customValidation).to.equal('');
  });

  describe('when using the getInput method', () => {
    it('should return the first slotted element', async () => {
      const el = await fixture<SynValidate>(html`
        <syn-validate>
          <input id="found" label="Email" type="email"></input>
        </syn-validate>
      `);

      // @ts-expect-error getInput is private, but should be tested anyways
      await expect(el.getInput()?.id).to.equal('found');
    });

    it('should return undefined if no slotted elements are found', async () => {
      const el = await fixture<SynValidate>(html`
        <syn-validate></syn-validate>
      `);

      // @ts-expect-error getInput is private, but should be tested anyways
      await expect(el.getInput()).to.equal(undefined);
    });
  });

  describe('when using native form elements', () => {
    it('should call the validate method when the input is invalid and an observed event is called', async () => {
      const el = await fixture<SynValidate>(html`
        <syn-validate on="blur">
          <input label="Email" type="email"></input>
        </syn-validate>
      `);

      const input = el.querySelector('input')!;
      input.value = 'test';
      input.focus();
      input.blur();

      // email address is the only part that all three browsers have in common.
      // Could also check for non empty values, but it makes it more brittle.
      expect(el.validationMessage).to.include('email address');
    });

    it('should allow switching the event listeners via the "on" property', async () => {
      const el = await fixture<SynValidate>(html`
        <syn-validate on="change">
          <input label="Email" type="email"></input>
        </syn-validate>
      `);

      const input = el.querySelector('input')!;

      // Step 1: Use the change event
      await expect(el.validationMessage).to.equal('');

      input.value = 'test';
      input.dispatchEvent(new Event('change', { bubbles: true }));

      expect(el.validationMessage).to.include('email address');

      // Step 2:
      // - Set the on property to only accept blur events
      // - Try again with onChange and see nothing happens anymore
      // - Finally, call blur and revalidate again
      el.on = 'blur';
      await el.updateComplete;

      input.value = 'test@test.de';
      input.dispatchEvent(new Event('change', { bubbles: true }));

      // The internalRevalidate resets to an empty message as the input is now valid
      await expect(el.validationMessage).to.equal('');

      input.focus();
      input.value = 'test';
      input.blur();
      expect(el.validationMessage).to.include('email address');

      input.focus();
      input.value = 'test@example';
      input.blur();
      await expect(el.validationMessage).to.equal('');
    });
  });

  describe('when using synergy form elements', () => {
    it('should call the validate method when the input is invalid and an observed event is called', async () => {
      const el = await fixture<SynValidate>(html`
        <syn-validate on="blur">
          <syn-input label="Email" type="email"></syn-input>
        </syn-validate>
      `);

      const input = el.querySelector('syn-input')!;
      input.value = 'test';
      await input.updateComplete;
      input.focus();
      input.blur();

      // email address is the only part that all three browsers have in common.
      // Could also check for non empty values, but it makes it more brittle.
      expect(el.validationMessage).to.include('email address');
    });

    it('should allow switching the event listeners via the "on" property', async () => {
      const el = await fixture<SynValidate>(html`
        <syn-validate on="change">
          <syn-input label="Email" type="email"></syn-input>
        </syn-validate>
      `);

      const input = el.querySelector('syn-input')!;

      // Step 1: Use the change event
      await expect(el.validationMessage).to.equal('');

      input.value = 'test';
      await input.updateComplete;
      input.dispatchEvent(new Event('syn-change', { bubbles: true }));

      expect(el.validationMessage).to.include('email address');

      // Step 2:
      // - Set the on property to only accept blur events
      // - Try again with onChange and see nothing happens anymore
      // - Finally, call blur and revalidate again
      el.on = 'blur';
      await el.updateComplete;

      input.value = 'test@test.de';
      await input.updateComplete;
      input.dispatchEvent(new Event('syn-change', { bubbles: true }));

      // The internalRevalidate resets to an empty message as the input is now valid
      await expect(el.validationMessage).to.equal('');

      input.focus();
      input.value = 'test';
      await input.updateComplete;
      input.blur();
      expect(el.validationMessage).to.include('email address');

      input.focus();
      input.value = 'test@example';
      await input.updateComplete;
      input.blur();
      await expect(el.validationMessage).to.equal('');
    });
  });
});
