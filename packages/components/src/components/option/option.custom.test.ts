/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';
import type SynOption from './option.js';

describe('<syn-option>', () => {
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
