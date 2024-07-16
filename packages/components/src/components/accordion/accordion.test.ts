/* eslint-disable @typescript-eslint/no-floating-promises */
import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';

import type SynAccordion from './accordion.js';
import type SynDetails from '../details/details.js';

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

  describe('when setting the close-others property', () => {
    it('should default to false', async () => {
      const accordion = await fixture<SynAccordion>(html`<syn-accordion></syn-accordion>`);
      expect(accordion.closeOthers).to.be.false;
    });

    it('should allow to open as many `<syn-details>` elements as desired if set to false', async () => {
      const accordion = await fixture<SynAccordion>(html`
        <syn-accordion>
          <syn-details summary="Item 1">Item 1 Content</syn-details>
          <syn-details summary="Item 2">Item 2 Content</syn-details>
          <syn-details summary="Item 3">Item 3 Content</syn-details>
        </syn-accordion>
      `);

      const details = Array.from(accordion.querySelectorAll<SynDetails>('syn-details'));

      details.forEach((detail) => {
        detail.show();
      });

      // Needed to make the tests wait for the event to be dispatched
      await accordion.updateComplete;

      expect(details.filter((detail) => detail.open).length).to.equal(3);
    });

    it('should allow only one open `<syn-details>` elements if set to true', async () => {
      const accordion = await fixture<SynAccordion>(html`
        <syn-accordion close-others>
          <syn-details summary="Item 1">Item 1 Content</syn-details>
          <syn-details summary="Item 2">Item 2 Content</syn-details>
          <syn-details summary="Item 3">Item 3 Content</syn-details>
        </syn-accordion>
      `);

      const details = Array.from(accordion.querySelectorAll<SynDetails>('syn-details'));

      details.forEach((detail) => {
        detail.show();
      });

      // Needed to make the tests wait for the event to be dispatched
      await accordion.updateComplete;

      expect(details.filter((detail) => detail.open).length).to.equal(1);
      expect(details[2]).to.have.attribute('open');
    });
  });

  describe('when setting the size property', () => {
    it('should default to "medium"', async () => {
      const accordion = await fixture<SynAccordion>(html`<syn-accordion></syn-accordion>`);
      expect(accordion.size).to.equal('medium');
    });

    ['medium', 'large'].forEach((size: 'medium' | 'large') => {
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

        accordion.size = 'large';
        await accordion.updateComplete;

        accordion.detailsInDefaultSlot.forEach((detail) => {
          expect(detail.size).to.equal('large');
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
        newDetails.size = 'large';

        accordion.appendChild(newDetails);
        await accordion.updateComplete;

        accordion.detailsInDefaultSlot.forEach((detail) => {
          expect(detail.size).to.equal('medium');
        });
      });
    });
  });

  describe('when setting the contained property', () => {
    it('should not add the className "accordion--contained" when contained is set to "false"', async () => {
      const el = await fixture<SynAccordion>(html`
        <syn-accordion>
          <syn-details summary="Item 1">Item 1 Content</syn-details>
          <syn-details summary="Item 2">Item 2 Content</syn-details>
        </syn-accordion>
      `);
      const accordion = el.shadowRoot?.querySelector('.accordion');
      expect(accordion).to.not.have.class('accordion--contained');
    });

    it('should not add the className "details--contained" when contained is set to "false"', async () => {
      const el = await fixture<SynAccordion>(html`
        <syn-accordion contained>
          <syn-details summary="Item 1">Item 1 Content</syn-details>
          <syn-details summary="Item 2">Item 2 Content</syn-details>
        </syn-accordion>
      `);
      const accordion = el.shadowRoot?.querySelector('.accordion');
      expect(accordion).to.have.class('accordion--contained');
    });

    it('should update the slotted syn-detail items contained prop when the contained prop of the syn-accordion is changed', async () => {
      const accordion = await fixture<SynAccordion>(html`
        <syn-accordion>
          <syn-details summary="Item 1">Item 1 Content</syn-details>
          <syn-details summary="Item 2">Item 2 Content</syn-details>
        </syn-accordion>
      `);

      expect(accordion.contained).to.be.false;
      accordion.detailsInDefaultSlot.forEach((detail) => {
        expect(detail.contained).to.be.false;
      });

      accordion.contained = true;

      await accordion.updateComplete;

      expect(accordion.contained).to.be.true;
      accordion.detailsInDefaultSlot.forEach((detail) => {
        expect(detail.contained).to.be.true;
      });
    });

    it('should override the contained prop for all syn-details that are slotted after initial render', async () => {
      const accordion = await fixture<SynAccordion>(html`
        <syn-accordion>
          <syn-details summary="Item 1">Item 1 Content</syn-details>
          <syn-details summary="Item 2">Item 2 Content</syn-details>
        </syn-accordion>
      `);

      accordion.detailsInDefaultSlot.forEach((detail) => {
        expect(detail.contained).to.be.false;
      });

      const newDetails = document.createElement('syn-details');
      newDetails.contained = true;

      accordion.appendChild(newDetails);
      await accordion.updateComplete;

      accordion.detailsInDefaultSlot.forEach((detail) => {
        expect(detail.contained).to.be.false;
      });
    });
  });
});
