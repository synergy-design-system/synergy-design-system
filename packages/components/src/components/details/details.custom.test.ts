/* eslint-disable @typescript-eslint/no-floating-promises */
import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';

import type SynDetails from './details.js';

describe('<syn-details>', () => {
  describe('size', () => {
    it('should default to "medium"', async () => {
      const el = await fixture<SynDetails>(html`<syn-details></syn-details>`);
      expect(el.size).to.equal('medium');
    });
  });

  ['medium', 'large'].forEach((size) => {
    it(`should add a class of "details--size-${size}" when the size is set to "${size}"`, async () => {
      const el = await fixture<SynDetails>(html`<syn-details size=${size}></syn-details>`);
      expect(el.shadowRoot!.querySelector('.details')!.classList.contains(`details--size-${size}`)).to.be.true;
    });
  });
});
