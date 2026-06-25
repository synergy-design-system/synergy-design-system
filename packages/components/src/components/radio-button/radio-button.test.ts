import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';
import type SynRadioButton from './radio-button.js';
import type SynRadioGroup from '../radio-group/radio-group.js';

describe('<syn-radio-button>', () => {
  it('should not get checked when disabled', async () => {
    const radioGroup = await fixture<SynRadioGroup>(html`
      <syn-radio-group value="1">
        <syn-radio-button id="radio-1" value="1"></syn-radio-button>
        <syn-radio-button id="radio-2" value="2" disabled></syn-radio-button>
      </syn-radio-group>
    `);
    const radio1 = radioGroup.querySelector<SynRadioButton>('#radio-1')!;
    const radio2 = radioGroup.querySelector<SynRadioButton>('#radio-2')!;

    radio2.click();
    await Promise.all([radio1.updateComplete, radio2.updateComplete]);

    expect(radio1.checked).to.be.true;
    expect(radio2.checked).to.be.false;
  });

  it('should receive positional data attributes from <syn-button-group>', async () => {
    const radioGroup = await fixture<SynRadioGroup>(html`
      <syn-radio-group value="1">
        <syn-radio-button id="radio-1" value="1"></syn-radio-button>
        <syn-radio-button id="radio-2" value="2"></syn-radio-button>
        <syn-radio-button id="radio-3" value="3"></syn-radio-button>
      </syn-radio-group>
    `);
    const radio1 = radioGroup.querySelector<SynRadioButton>('#radio-1')!;
    const radio2 = radioGroup.querySelector<SynRadioButton>('#radio-2')!;
    const radio3 = radioGroup.querySelector<SynRadioButton>('#radio-3')!;
    await Promise.all([radioGroup.updateComplete, radio1.updateComplete, radio2.updateComplete, radio3.updateComplete]);

    expect(radio1).to.have.attribute('data-syn-button-group__button');
    expect(radio1).to.have.attribute('data-syn-button-group__button--first');
    expect(radio2).to.have.attribute('data-syn-button-group__button');
    expect(radio2).to.have.attribute('data-syn-button-group__button--inner');
    expect(radio3).to.have.attribute('data-syn-button-group__button');
    expect(radio3).to.have.attribute('data-syn-button-group__button--last');
  });
});
