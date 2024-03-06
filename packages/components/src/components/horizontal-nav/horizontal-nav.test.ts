/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import '../../../dist/synergy.js';

import {
  expect,
  fixture,
  html,
  // waitUntil,
} from '@open-wc/testing';

import type SynHorizontalNav from './horizontal-nav.js';
import SynNavItem from '../../../dist/components/nav-item/nav-item.js';

describe('<syn-horizontal-nav>', () => {
  describe('accessibility tests', () => {
    it('should be accessible', async () => {
      const nav = await fixture<SynHorizontalNav>(html`<syn-horizontal-nav></syn-horizontal-nav>`);
      await expect(nav).to.be.accessible();
    });
  });

  describe('when provided no parameters', () => {
    it('default values are set correctly', async () => {
      const nav = await fixture<SynHorizontalNav>(html`<syn-horizontal-nav></syn-horizontal-nav>`);
      expect(nav.priorityMenuLabel).to.equal('Menu');
    });
  });

  describe('when providing a list of <syn-nav-item />s', () => {
    it('should render all nav items into the default slot', async () => {
      const nav = await fixture<SynHorizontalNav>(html`
        <syn-horizontal-nav>
          <syn-nav-item>Item 1</syn-nav-item>
          <syn-nav-item>Item 2</syn-nav-item>
          <syn-nav-item>Item 3</syn-nav-item>
        </syn-horizontal-nav>
      `);

      const { defaultSlot, priorityMenu } = nav;

      expect(defaultSlot.assignedElements()).to.have.length(3);
      const allChildrenAreNavItems = defaultSlot
        ?.assignedElements()
        .every(i => i instanceof SynNavItem);
      expect(allChildrenAreNavItems).to.be.true;

      expect(priorityMenu).to.not.be.empty;
    });
  });
});
