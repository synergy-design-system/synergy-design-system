import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/synergy.js';
import type SynValidate from './validate.js';

describe('<syn-validate>', () => {
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
    await expect(el.on).to.deep.equal(['invalid', 'change']);
    await expect(el.customValidation).to.equal('');
  });

  describe('when using the getInput method', () => {
    it('should return the first slotted elment', async () => {
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
    it('should call the validate method when the input is invalid and a change event is called (with default "on")', async () => {
      const el = await fixture<SynValidate>(html`
        <syn-validate>
          <input label="Email" type="email"></input>
        </syn-validate>
      `);

      const input = el.querySelector('input')!;
      input.value = 'test';
      input.dispatchEvent(new Event('change', { bubbles: true }));

      // email address is the only part that all three browsers have in common.
      // Could also check for non empty values, but it makes it more brittle.
      expect(el.validationMessage).to.include('email address');
    });

    it('should call the validate method when the input is invalid and the change event is called (with custom "on"', async () => {
      const el = await fixture<SynValidate>(html`
        <syn-validate .on=${['blur']}>
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
        <syn-validate .on=${['change']}>
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
      el.on = ['blur'];
      await el.updateComplete;

      input.value = 'test@test.de';
      input.dispatchEvent(new Event('change', { bubbles: true }));

      expect(el.validationMessage).to.include('email address');

      input.reportValidity();
      input.focus();
      input.blur();

      await expect(el.validationMessage).to.equal('');
    });
  });

  describe('when using synergy form elements', () => {
    it('should call the validate method when the input is invalid and a syn-change event is called (with default "on")', async () => {
      const el = await fixture<SynValidate>(html`
        <syn-validate>
          <syn-input label="Email" type="email"></syn-input>
        </syn-validate>
      `);

      const input = el.querySelector('syn-input')!;
      input.value = 'test';
      await input.updateComplete;

      input.dispatchEvent(new Event('syn-change'));

      // email address is the only part that all three browsers have in common.
      // Could also check for non empty values, but it makes it more brittle.
      expect(el.validationMessage).to.include('email address');
    });

    it('should call the validate method when the input is invalid and a blur event is called (with custom "on")', async () => {
      const el = await fixture<SynValidate>(html`
        <syn-validate .on=${['blur']}>
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
        <syn-validate .on=${['change']}>
          <syn-input label="Demo Email" type="email"></syn-input>
        </syn-validate>
      `);

      const input = el.querySelector('syn-input')!;

      // Step 1: Use the change event
      await expect(el.validationMessage).to.equal('');

      input.value = 'test';
      await input.updateComplete;
      input.emit('syn-change');

      expect(el.validationMessage).to.include('email address');

      // Step 2:
      // - Set the on property to only accept blur events
      // - Try again with onChange and see nothing happens anymore
      // - Finally, call blur and revalidate again
      el.on = ['syn-blur'];
      await el.updateComplete;

      input.value = 'test@test.de';
      await input.updateComplete;
      input.dispatchEvent(new Event('change', { bubbles: true }));

      expect(el.validationMessage).to.include('email address');

      input.focus();
      input.blur();

      await expect(el.validationMessage).to.equal('');
    });
  });
});
