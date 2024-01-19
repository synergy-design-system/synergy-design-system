import sinon from 'sinon';
import { aTimeout, expect, fixture, html, waitUntil } from '@open-wc/testing';
import '../../../dist/synergy.js';

import type SynOptgroup from './optgroup';
import type SynOption from '../option/option';

const getSynOptions = (el: SynOptgroup) => Array.from(el.querySelectorAll('syn-option'));
const getEnabledOptions = (el: SynOptgroup) => getSynOptions(el).filter((opt: SynOption) => !opt.disabled);
const getDisabledOptions = (el: SynOptgroup) => getSynOptions(el).filter((opt: SynOption) => opt.disabled);

describe('<syn-optgroup>', () => {
  it('passes accessability test', async () => {
    const el = await fixture<SynOptgroup>(html`
      <syn-select label="Select one">
        <syn-optgroup label="Options">
          <syn-option value="1">Option 1</syn-option>
          <syn-option value="2">Option 2</syn-option>
          <syn-option value="3">Option 3</syn-option>
          <syn-option value="4" disabled>Disabled</syn-option>
        </syn-optgroup>
      </syn-select>
    `);
    await expect(el).to.be.accessible();
  });

  it('default properties', async () => {
    const el = await fixture<SynOptgroup>(html`<syn-optgroup></syn-optgroup>`);

    expect(el.disabled).to.be.false;
  });

  describe('when using the disabled attribute', () => {
    it('changes all <syn-option /> tags disabled attributes to false when syn-optgroups disabled attribute is false', async () => {
      const el = await fixture<SynOptgroup>(html`
        <syn-optgroup>
          <syn-option value="1">Value 1</syn-option>
          <syn-option value="2" disabled>Value 2</syn-option>
        </syn-optgroup>
      `);
   
      // Make sure we have the correct baseline of elements
      expect(getSynOptions(el)).to.have.length(2);
      expect(getEnabledOptions(el)).to.have.length(2);
      expect(getDisabledOptions(el)).to.have.length(0);
    });

    it('changes all <syn-option /> tags disabled attributes to true when syn-optgroups disabled attribute is true', async () => {
      const el = await fixture<SynOptgroup>(html`
        <syn-optgroup disabled>
          <syn-option value="1">Value 1</syn-option>
          <syn-option value="2" disabled>Value 2</syn-option>
        </syn-optgroup>
      `);
  
      // Make sure we have the correct baseline of elements
      expect(getSynOptions(el)).to.have.length(2);
      expect(getEnabledOptions(el)).to.have.length(0);
      expect(getDisabledOptions(el)).to.have.length(2);
    });

    it('should set its childrens syn-option disabled property according to its own when the slot content changes', async () => {
      const el = await fixture<SynOptgroup>(html`
        <syn-optgroup>
          <syn-option value="1">Option 1</syn-option>
          <syn-option value="2" disabled>Option 2</syn-option>
        </syn-optgroup>
      `);

      // Make sure we have the correct baseline of elements
      expect(getSynOptions(el)).to.have.length(2);
      expect(getEnabledOptions(el)).to.have.length(2);
      expect(getDisabledOptions(el)).to.have.length(0);

      // Add an (initially) disabled group. Disabled should be removed
      el.innerHTML += '<syn-option value="3" disabled>Option 3</syn-option>';
      await aTimeout(100);

      expect(getSynOptions(el)).to.have.length(3);
      expect(getEnabledOptions(el)).to.have.length(3);
      expect(getDisabledOptions(el)).to.have.length(0);

      el.disabled = true;
      await aTimeout(100);

      el.innerHTML += '<syn-option value="4">Option 4</syn-option>';
      await aTimeout(100);

      expect(getSynOptions(el)).to.have.length(4);
      expect(getEnabledOptions(el)).to.have.length(0);
      expect(getDisabledOptions(el)).to.have.length(4);
    });
  });
});
