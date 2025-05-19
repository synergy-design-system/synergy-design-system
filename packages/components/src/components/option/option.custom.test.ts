/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';
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
});
