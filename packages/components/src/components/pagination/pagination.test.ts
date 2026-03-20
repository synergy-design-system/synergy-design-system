/* eslint-disable @typescript-eslint/no-floating-promises */
import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';

import type SynPagination from './pagination.js';
import { calculatePageItemIndices } from './utility.js';

describe('<syn-pagination>', () => {
  describe('utility helpers', () => {
    it('should return zero-based summary indices when there are no items', () => {
      expect(calculatePageItemIndices(0, 25, 1)).to.deep.equal({
        endIndex: 0,
        startIndex: 0,
      });
    });
  });

  describe('localization', () => {
    it('should use localized pagination labels and summary text', async () => {
      const pagination = await fixture<SynPagination>(html`
        <syn-pagination current-page="2" page-size="25" total-items="100"></syn-pagination>
      `);

      const pageSizeSelectLabel = pagination.shadowRoot?.querySelector('span[slot="label"]');
      const pageSummary = pagination.shadowRoot?.querySelector('[part="page-item-summary"]');
      const firstPageButton = pagination.shadowRoot?.querySelector('syn-icon-button[name="first_page"]');

      expect(pageSizeSelectLabel?.textContent?.trim()).to.equal('Items per page');
      expect(pageSummary?.textContent?.trim()).to.equal('26-50 of 100 items');
      expect(firstPageButton?.getAttribute('label')).to.equal('First page');
    });
  });

  describe('accessibility', () => {
    it('should be accessible', async () => {
      const pagination = await fixture<SynPagination>(html`
        <syn-pagination>

        </syn-pagination>
      `);
      await expect(pagination).to.be.accessible();
    });
  });
});
