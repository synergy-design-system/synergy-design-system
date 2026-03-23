/* eslint-disable */
import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';
import type SynRadio from './radio.js';
import type SynRadioGroup from '../radio-group/radio-group.js';

describe('<syn-radio>', () => {
  it('default properties', async () => {
    const el = await fixture<SynRadio>(html` <syn-radio></syn-radio> `);

    expect(el.value).to.be.undefined;
    expect(el.title).to.equal('');
    expect(el.disabled).to.be.false;
    expect(el.readonly).to.be.false;
  });

  it('should not get checked when disabled', async () => {
    const radioGroup = await fixture<SynRadioGroup>(html`
      <syn-radio-group value="1">
        <syn-radio id="radio-1" value="1"></syn-radio>
        <syn-radio id="radio-2" value="2" disabled></syn-radio>
      </syn-radio-group>
    `);
    const radio1 = radioGroup.querySelector<SynRadio>('#radio-1')!;
    const radio2 = radioGroup.querySelector<SynRadio>('#radio-2')!;

    radio2.click();
    await Promise.all([radio1.updateComplete, radio2.updateComplete]);

    expect(radio1.checked).to.be.true;
    expect(radio2.checked).to.be.false;
  });

  describe('#1174: Readonly support', () => {
    it('should be readonly with the readonly attribute', async () => {
      const el = await fixture<SynRadio>(html` <syn-radio readonly></syn-radio> `);
      const wrapper = el.shadowRoot!.querySelector('.radio')!;

      expect(wrapper.classList.contains('radio--readonly')).to.be.true;
    });

    it('should be readonly when readonly property is set', async () => {
      const el = await fixture<SynRadio>(html`<syn-radio></syn-radio>`);
      const wrapper = el.shadowRoot!.querySelector('.radio')!;

      el.readonly = true;
      await el.updateComplete;

      expect(wrapper.classList.contains('radio--readonly')).to.be.true;
    });

    it('should not get checked when readonly', async () => {
      const radioGroup = await fixture<SynRadioGroup>(html`
        <syn-radio-group value="1">
          <syn-radio id="radio-1" value="1"></syn-radio>
          <syn-radio id="radio-2" value="2" readonly></syn-radio>
        </syn-radio-group>
      `);
      const radio1 = radioGroup.querySelector<SynRadio>('#radio-1')!;
      const radio2 = radioGroup.querySelector<SynRadio>('#radio-2')!;

      radio2.click();
      await Promise.all([radio1.updateComplete, radio2.updateComplete]);

      expect(radio1.checked).to.be.true;
      expect(radio2.checked).to.be.false;
    });
  });
});
