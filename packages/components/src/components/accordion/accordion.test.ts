/* eslint-disable @typescript-eslint/no-floating-promises */
import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';

import type SynAccordion from './accordion.js';

describe('<syn-accordion>', () => {
  describe('accessibility', () => {
    it('should be accessible', async () => {
      const accordion = await fixture<SynAccordion>(html`
        <syn-accordion>
          <syn-details summary="Item 1">Item 1 Content</syn-details>
          <syn-details summary="Item 2">Item 2 Content</syn-details>
        </syn-accordion>
      `);
      await expect(accordion).to.be.accessible();
    });
  });

  describe('when setting the size property', () => {
    it('should default to "medium"', async () => {
      const accordion = await fixture<SynAccordion>(html`<syn-accordion></syn-accordion>`);
      expect(accordion.size).to.equal('medium');
    });

    ['small', 'medium'].forEach((size) => {
      it(`should set size to ${size} for all syn-details`, async () => {
        const accordion = await fixture<SynAccordion>(html`
          <syn-accordion size=${size}>
            <syn-details summary="Item 1">Item 1 Content</syn-details>
            <syn-details summary="Item 2">Item 2 Content</syn-details>
          </syn-accordion>
        `);

        expect(accordion.size).to.equal(size);
        accordion.detailsInDefaultSlot.forEach((detail) => {
          expect(detail.size).to.equal(size);
        });
      });

      it('should update the slotted syn-detail items size when the size prop of the syn-accordion is changed', async () => {
        const accordion = await fixture<SynAccordion>(html`
          <syn-accordion size="medium">
            <syn-details summary="Item 1">Item 1 Content</syn-details>
            <syn-details summary="Item 2">Item 2 Content</syn-details>
          </syn-accordion>
        `);

        accordion.detailsInDefaultSlot.forEach((detail) => {
          expect(detail.size).to.equal('medium');
        });

        accordion.size = 'small';
        await accordion.updateComplete;

        accordion.detailsInDefaultSlot.forEach((detail) => {
          expect(detail.size).to.equal('small');
        });
      });

      it('should override the size attribute for all syn-details that are slotted after initial render', async () => {
        const accordion = await fixture<SynAccordion>(html`
          <syn-accordion size="medium">
            <syn-details summary="Item 1">Item 1 Content</syn-details>
            <syn-details summary="Item 2">Item 2 Content</syn-details>
          </syn-accordion>
        `);

        accordion.detailsInDefaultSlot.forEach((detail) => {
          expect(detail.size).to.equal('medium');
        });

        const newDetails = document.createElement('syn-details');
        newDetails.size = 'small';

        accordion.appendChild(newDetails);
        await accordion.updateComplete;

        accordion.detailsInDefaultSlot.forEach((detail) => {
          expect(detail.size).to.equal('medium');
        });
      });
    });
  });
});
