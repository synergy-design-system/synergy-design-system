/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import sinon from 'sinon';
import '../../../dist/synergy.js';

import {
  expect,
  fixture,
  html,
  // waitUntil,
} from '@open-wc/testing';

import type SynHorizontalNav from './horizontal-nav.js';
import type SynNavItem from '../nav-item/nav-item.js';
import {
  filterOnlyNavItems,
  getAssignedElementsForSlot,
} from './utils.js';

const getSlottedChildrenAsTuple = (el: SynHorizontalNav) => {
  const { defaultSlot, menuSlot } = el;
  const slottedChildren = filterOnlyNavItems(getAssignedElementsForSlot(defaultSlot));
  const slottedPriorityItems = filterOnlyNavItems(getAssignedElementsForSlot(menuSlot));

  return [
    slottedChildren,
    slottedPriorityItems,
  ];
};

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

  describe('when livecycle methods', () => {
    it('should set up a resize observer during connectedCallback', async () => {
      const observeStub = sinon.stub();
      (globalThis.ResizeObserver as unknown) = sinon.stub().returns({
        disconnect: sinon.stub(),
        observe: observeStub,
        unobserve: sinon.stub(),
      });

      await fixture<SynHorizontalNav>(html`<syn-horizontal-nav></syn-horizontal-nav>`);
      expect(observeStub).to.have.been.called;
    });

    it('should unobserve the element on disconnectedCallback', async () => {
      const disconnectStub = sinon.stub();
      (globalThis.ResizeObserver as unknown) = sinon.stub().returns({
        disconnect: disconnectStub,
        observe: sinon.stub(),
        unobserve: sinon.stub(),
      });

      const nav = await fixture<SynHorizontalNav>(html`<syn-horizontal-nav></syn-horizontal-nav>`);
      nav.remove();
      expect(disconnectStub).to.have.been.called;
    });
  });

  describe('when providing a list of <syn-nav-item />s', () => {
    /**
     * Create a fixture for our horizontal nav
     * Note we are forcing a fixed width of the items
     * to make sure they are available in all test environments
     * @param width The width to use
     * @returns A horizontal nav fixture
     */
    const createFixture = async (width = 800) => fixture<SynHorizontalNav>(html`
      <syn-horizontal-nav style="width: ${width}px;">
        <syn-nav-item style="width: 100px">Item 1</syn-nav-item>
        <syn-nav-item style="width: 100px">Item 2</syn-nav-item>
        <syn-nav-item style="width: 100px">Item 3</syn-nav-item>
        <syn-nav-item style="width: 100px">Item 4</syn-nav-item>
        <syn-nav-item style="width: 100px" id="button-item" role="button">Item 5</syn-nav-item>
        <syn-nav-item style="width: 100px">Item 6</syn-nav-item>
      </syn-horizontal-nav>
    `);

    /**
     * Force an update of a given navigation fixture
     * This is needed as ResizeObserver does not work in @open-wc/testing
     * @param nav The navigation to update
     * @param size The new size to use
     */
    const forceSizeUpdateOnFixture = async (nav: SynHorizontalNav, size: number) => {
      nav.style.width = `${size}px`;
      await nav.updateComplete;
      nav.handlePriorityMenu();
      await nav.updateComplete;
    };

    const getButtonItem = (nav: SynHorizontalNav) => nav.querySelector('#button-item') as SynNavItem;

    it('should render all nav items into the default slot per default', async () => {
      const nav = await createFixture();
      const [itemsInDefaultSlot, itemsInPrioritySlot] = getSlottedChildrenAsTuple(nav);

      expect(itemsInDefaultSlot).to.have.length(6);
      expect(itemsInPrioritySlot).to.be.empty;
    });

    it('should cache the items positions', async () => {
      const nav = await createFixture();
      const [itemsInDefaultSlot] = getSlottedChildrenAsTuple(nav);
      const allNavItemsHaveARightAttribute = itemsInDefaultSlot.every(
        item => item.dataset.right !== undefined,
      );
      expect(allNavItemsHaveARightAttribute).to.be.true;
    });

    it('should move the items to the "menu" slot and change their role to "menuitem" if there is not enough space', async () => {
      const nav = await createFixture(100);
      const [itemsInDefaultSlot, itemsInPrioritySlot] = getSlottedChildrenAsTuple(nav);

      expect(itemsInDefaultSlot).to.have.length(1);
      expect(itemsInPrioritySlot).to.have.length(5);

      expect(itemsInPrioritySlot.every(item => item.getAttribute('role') === 'menuitem')).to.be.true;
    });

    it('should move the items when the navigation is resized', async () => {
      const nav = await createFixture(800);
      const [
        initialDefaultItems,
        initialPriorityItems,
      ] = getSlottedChildrenAsTuple(nav);

      await forceSizeUpdateOnFixture(nav, 200);

      const [
        afterSmallDefaultItems,
        afterSmallPriorityItems,
      ] = getSlottedChildrenAsTuple(nav);

      // Second cycle: Resize to 600 pixels and see what we got then
      await forceSizeUpdateOnFixture(nav, 600);

      const [
        afterMediumDefaultItems,
        afterMediumPriorityItems,
      ] = getSlottedChildrenAsTuple(nav);

      expect(initialDefaultItems, 'Default-Slot: Width 800 pixels').to.have.length(6);
      expect(afterSmallDefaultItems, 'Default-Slot: Width 200 pixels').to.have.length(1);
      expect(afterMediumDefaultItems, 'Default-Slot: Width 600 pixels').to.have.length(4);

      expect(initialPriorityItems, 'Priority-Menu: width 800 pixels').to.have.length(0);
      expect(afterSmallPriorityItems, 'Priority-Menu: Width 200 pixels').to.have.length(5);
      expect(afterMediumPriorityItems, 'Priority-Menu: Width 600 pixels').to.have.length(2);
    });

    it('should reapply the original role when moving items back to the default slot', async () => {
      const nav = await createFixture(800);

      // Step 1: Make sure we have the right initial values
      const buttonItem = getButtonItem(nav);
      expect(buttonItem, 'The button item should be in the default slot and exist').to.exist;
      expect(buttonItem, 'The button item should have a role of "button"').to.have.attribute('role', 'button');

      // Step 2: Resize and see if the role has changed accordingly
      await forceSizeUpdateOnFixture(nav, 200);
      const buttonItemAfterResize = getButtonItem(nav);
      expect(buttonItemAfterResize, 'The button item should be in the priority slot and exist').to.exist;
      expect(buttonItemAfterResize, 'The button item should have a role of "menuitem"').to.have.attribute('role', 'menuitem');

      await (forceSizeUpdateOnFixture(nav, 800));
      const buttonItemAfterResizeBack = getButtonItem(nav);
      expect(buttonItemAfterResizeBack, 'The button item should be back the default slot and exist').to.exist;
      expect(buttonItemAfterResizeBack, 'The button item should have its original role of "button"').to.have.attribute('role', 'button');
    });
  });
});
