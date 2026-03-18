/* eslint-disable @typescript-eslint/no-floating-promises */
import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';

import type SynPagination from './pagination.js';

describe('<syn-pagination>', () => {
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
