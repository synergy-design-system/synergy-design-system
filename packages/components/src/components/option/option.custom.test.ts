/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { delimiterToWhiteSpace } from './utility.js';
import type SynOption from './option.js';

describe('<syn-option>', () => {
  describe('#540', () => {
    describe('when using a custom delimiter', () => {
      ['|', ',', '@', 'ä', '✂️', '^', '$'].forEach(delimiter => {
        it(`should allow "${delimiter}" as the delimiter`, () => {
          const inputString = ['input', 'string'].join(delimiter);
          expect(delimiterToWhiteSpace(inputString, delimiter)).to.equal('input_string');
        });
      });
    });
  });

  describe('#805', () => {
    it('should not convert numeric values to string', async () => {
      const el = await fixture<SynOption>(html`<syn-option>Text</syn-option>`);

      el.value = 10;
      await el.updateComplete;

      expect(el.value).to.equal(10);
    });

    it('should convert non-string and non-numeric values to string', async () => {
      const el = await fixture<SynOption>(html`<syn-option>Text</syn-option>`);

      // @ts-expect-error - intentional
      el.value = true;
      await el.updateComplete;

      expect(el.value).to.equal('true');
    });
  });

  describe('#1036', () => {
    it('should result in correct sanitized values for subsequently changed delimiter', async () => {
      const value = 'Option 1';
      const el = await fixture<SynOption>(html`<syn-option value=${value}>${value}</syn-option>`);
      el.delimiter = '~';
      await el.updateComplete;

      expect(el.value).to.equal('Option 1');

      el.delimiter = ' ';
      await el.updateComplete;

      expect(el.value).to.equal('Option_1');

      el.delimiter = 'tion';
      await el.updateComplete;
      expect(el.value).to.equal('Op_ 1');
    });
  });

  describe('#1056', () => {
    it('should trigger parent default slot change after delimiter change', async () => {
      const defaultSlotChangeHandler = sinon.spy();
      const select = await fixture<SynOption>(html`<syn-select>
        <syn-option value="Option 1">Option 1</syn-option>
      </syn-select>`);

      const option = select.querySelector('syn-option') as SynOption;

      // @ts-expect-error - accessing private method for testing purposes
      select.handleDefaultSlotChange = defaultSlotChangeHandler;

      option.delimiter = '|';
      await select.updateComplete;
      await option.updateComplete;
      expect(defaultSlotChangeHandler.callCount).to.equal(1);
    });
  });
});
