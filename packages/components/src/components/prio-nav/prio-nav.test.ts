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

import type SynPrioNav from './prio-nav.js';
import type SynNavItem from '../nav-item/nav-item.js';
import {
  filterOnlyNavItems,
  getAssignedElementsForSlot,
} from './utils.js';

const getSlottedChildrenAsTuple = (el: SynPrioNav) => {
  const { defaultSlot, menuSlot } = el;
  const slottedChildren = filterOnlyNavItems(getAssignedElementsForSlot(defaultSlot));
  const slottedPriorityItems = filterOnlyNavItems(getAssignedElementsForSlot(menuSlot));

  return [
    slottedChildren,
    slottedPriorityItems,
  ];
};

describe('<syn-prio-nav>', () => {
  describe('accessibility tests', () => {
    it('should be accessible', async () => {
      const nav = await fixture<SynPrioNav>(html`<syn-prio-nav></syn-prio-nav>`);
      await expect(nav).to.be.accessible();
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

      await fixture<SynPrioNav>(html`<syn-prio-nav></syn-prio-nav>`);
      expect(observeStub).to.have.been.called;
    });

    it('should unobserve the element on disconnectedCallback', async () => {
      const disconnectStub = sinon.stub();
      (globalThis.ResizeObserver as unknown) = sinon.stub().returns({
        disconnect: disconnectStub,
        observe: sinon.stub(),
        unobserve: sinon.stub(),
      });

      const nav = await fixture<SynPrioNav>(html`<syn-prio-nav></syn-prio-nav>`);
      nav.remove();
      expect(disconnectStub).to.have.been.called;
    });
  });

  describe('when providing a list of <syn-nav-item />s', () => {
    /**
     * Create a fixture for our horizontal nav
     * Note we are forcing a fixed width of the items
     * to make sure they are available in all test environments
     * Without flex-shrink: 0, the items will shrink to fit the container,
     * rendering most of the tests pointless
     * @param width The width to use
     * @returns A horizontal nav fixture
     */
    const createFixture = async (width = 800, marginLeft = 0) => fixture<SynPrioNav>(html`
      <syn-prio-nav style="width: ${width}px; margin-left: ${marginLeft}px;">
        <syn-nav-item horizontal style="width: 100px; flex-shrink: 0;">Item 1</syn-nav-item>
        <syn-nav-item horizontal style="width: 100px; flex-shrink: 0;">Item 2</syn-nav-item>
        <syn-nav-item horizontal style="width: 100px; flex-shrink: 0;">Item 3</syn-nav-item>
        <syn-nav-item horizontal style="width: 100px; flex-shrink: 0;">Item 4</syn-nav-item>
        <syn-nav-item horizontal style="width: 100px; flex-shrink: 0;" id="button-item" role="button">Item 5</syn-nav-item>
        <syn-nav-item horizontal style="width: 100px; flex-shrink: 0;">Item 6</syn-nav-item>
      </syn-prio-nav>
    `);

    /**
     * Force an update of a given navigation fixture
     * This is needed as ResizeObserver does not work in @open-wc/testing
     * @param nav The navigation to update
     * @param size The new size to use
     */
    const forceSizeUpdateOnFixture = async (nav: SynPrioNav, size: number) => {
      nav.style.width = `${size}px`;
      await nav.updateComplete;
      nav.handlePriorityMenu();
      await nav.updateComplete;
    };

    const getButtonItem = (nav: SynPrioNav) => nav.querySelector('#button-item') as SynNavItem;

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
      const nav = await createFixture(150);
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

    it("should work if there's a margin on the priority menu", async () => {
      // Adding this margin should not affect the tests
      const nav = await createFixture(800, 300);

      const [itemsInDefaultSlot, itemsInPrioritySlot] = getSlottedChildrenAsTuple(nav);

      expect(itemsInDefaultSlot).to.have.length(6);
      expect(itemsInPrioritySlot).to.be.empty;
    });
  });
});
