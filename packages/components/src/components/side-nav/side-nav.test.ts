/* eslint-disable @typescript-eslint/no-floating-promises */
import '../../../dist/synergy.js';
import {
  expect,
  fixture,
  html,
  waitUntil,
} from '@open-wc/testing';
import sinon from 'sinon';
import type SynSideNav from './side-nav.js';

describe('<syn-side-nav>', () => {
  afterEach(() => {
    sinon.restore();
  });
  // describe('accessibility tests', () => {
  //   it('should be accessible', async () => {
  //     const sideNav = await fixture<SynSideNav>(html`<syn-side-nav open></syn-side-nav>`);
  //     await expect(sideNav).to.be.accessible();

  //   });
  // });

  describe('when using methods', () => {
    it('should emit syn-show and syn-after-show when calling show()', async () => {
      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav>
          <syn-nav-item vertical>nav 1</syn-nav-item> 
        </syn-side-nav>
      `);
      const showHandler = sinon.spy();
      const afterShowHandler = sinon.spy();

      sideNav.addEventListener('syn-show', showHandler);
      sideNav.addEventListener('syn-after-show', afterShowHandler);
      sideNav.show();

      await waitUntil(() => showHandler.calledOnce);
      await waitUntil(() => afterShowHandler.calledOnce);

      expect(showHandler).to.have.been.calledOnce;
      expect(afterShowHandler).to.have.been.calledOnce;
    });

    it('should emit syn-hide and syn-after-hide when calling hide()', async () => {
      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav  open>
          <syn-nav-item vertical>nav 1</syn-nav-item> 
        </syn-side-nav>
      `);
      const hideHandler = sinon.spy();
      const afterHideHandler = sinon.spy();

      sideNav.addEventListener('syn-hide', hideHandler);
      sideNav.addEventListener('syn-after-hide', afterHideHandler);
      sideNav.hide();

      await waitUntil(() => hideHandler.calledOnce);
      await waitUntil(() => afterHideHandler.calledOnce);

      expect(hideHandler).to.have.been.calledOnce;
      expect(afterHideHandler).to.have.been.calledOnce;
    });
  });

  describe('when using open attribute', () => {
    it('should emit syn-show and syn-after-show when setting open = true', async () => {
      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav>
          <syn-nav-item vertical>nav 1</syn-nav-item> 
        </syn-side-nav>
      `);
      const showHandler = sinon.spy();
      const afterShowHandler = sinon.spy();

      sideNav.addEventListener('syn-show', showHandler);
      sideNav.addEventListener('syn-after-show', afterShowHandler);
      sideNav.open = true;

      await waitUntil(() => showHandler.calledOnce);
      await waitUntil(() => afterShowHandler.calledOnce);

      expect(showHandler).to.have.been.calledOnce;
      expect(afterShowHandler).to.have.been.calledOnce;
    });

    it('should emit syn-hide and syn-after-hide when setting open = false', async () => {
      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav open>
          <syn-nav-item vertical>nav 1</syn-nav-item> 
        </syn-side-nav>
      `);
      const hideHandler = sinon.spy();
      const afterHideHandler = sinon.spy();

      sideNav.addEventListener('syn-hide', hideHandler);
      sideNav.addEventListener('syn-after-hide', afterHideHandler);
      sideNav.open = false;

      await waitUntil(() => hideHandler.calledOnce);
      await waitUntil(() => afterHideHandler.calledOnce);

      expect(hideHandler).to.have.been.calledOnce;
      expect(afterHideHandler).to.have.been.calledOnce;
    });
  });

  describe('when using non-rail mode', () => {
    it('should be visible and expanded with open attribute', async () => {
      const expectedCloseSize = '25rem';
      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav open>
          <syn-nav-item vertical>nav 1</syn-nav-item> 
        </syn-side-nav>
      `);
      const drawer = sideNav.shadowRoot!.querySelector<HTMLElement>('[part~="drawer"]')!;
      const baseDrawer = drawer.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;
      const { display } = getComputedStyle(baseDrawer);

      expect(display).to.equal('block');

      const size = getComputedStyle(drawer).getPropertyValue('--size');
      const sideNavSize = getComputedStyle(sideNav).getPropertyValue('--side-nav-size');

      expect(size).to.equal(expectedCloseSize);
      expect(sideNavSize).to.equal(expectedCloseSize);
    });

    it('should not be visible without the open attribute', async () => {
      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav>
          <syn-nav-item vertical>nav 1</syn-nav-item> 
        </syn-side-nav>
      `);
      const drawer = sideNav.shadowRoot!.querySelector<HTMLElement>('[part~="drawer"]')!;
      const baseDrawer = drawer.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;
      const { display } = getComputedStyle(baseDrawer);

      expect(display).to.equal('none');
    });

    it('should show an overlay on open state', async () => {
      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav open>
          <syn-nav-item vertical>nav 1</syn-nav-item> 
        </syn-side-nav>
      `);
      const drawer = sideNav.shadowRoot!.querySelector<HTMLElement>('[part~="drawer"]')!;
      const overlay = drawer.shadowRoot!.querySelector<HTMLElement>('[part~="overlay"]')!;
      const { display } = getComputedStyle(overlay);

      expect(display).to.equal('block');
    });
  });

  describe('when using rail mode', () => {
    it('should be visible and expanded with open attribute', async () => {
      const expectedCloseSize = '25rem';
      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav rail open>
          <syn-nav-item vertical>nav 1</syn-nav-item> 
        </syn-side-nav>
      `);
      const drawer = sideNav.shadowRoot!.querySelector<HTMLElement>('[part~="drawer"]')!;
      const baseDrawer = drawer.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;

      expect(baseDrawer.hidden).to.be.false;

      const size = getComputedStyle(drawer).getPropertyValue('--size');
      const sideNavSize = getComputedStyle(sideNav).getPropertyValue('--side-nav-size');

      expect(size).to.equal(expectedCloseSize);
      expect(sideNavSize).to.equal(expectedCloseSize);
    });

    it('should be visible and shrunk without the open attribute', async () => {
      const expectedCloseSize = '4.5rem';
      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav rail>
          <syn-nav-item vertical>nav 1</syn-nav-item> 
        </syn-side-nav>
      `);
      const drawer = sideNav.shadowRoot!.querySelector<HTMLElement>('[part~="drawer"]')!;
      const baseDrawer = drawer.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;

      expect(baseDrawer.hidden).to.be.false;

      const size = getComputedStyle(drawer).getPropertyValue('--size');
      const sideNavSize = getComputedStyle(sideNav).getPropertyValue('--side-nav-size');

      expect(size).to.equal(expectedCloseSize);
      expect(sideNavSize).to.equal(expectedCloseSize);
    });

    it('should show no overlay on open state', async () => {
      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav rail open>
          <syn-nav-item vertical>nav 1</syn-nav-item> 
        </syn-side-nav>
      `);
      const drawer = sideNav.shadowRoot!.querySelector<HTMLElement>('[part~="drawer"]')!;
      const overlay = drawer.shadowRoot!.querySelector<HTMLElement>('[part~="overlay"]')!;
      const { display } = getComputedStyle(overlay);

      expect(display).to.equal('none');
    });

    it('should show an overlay on touch devices in open state', async () => {
      // Mock touch device
      sinon.stub(window.navigator, 'maxTouchPoints').value(1);

      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav rail open>
          <syn-nav-item vertical>nav 1</syn-nav-item> 
        </syn-side-nav>
      `);
      const drawer = sideNav.shadowRoot!.querySelector<HTMLElement>('[part~="drawer"]')!;
      const overlay = drawer.shadowRoot!.querySelector<HTMLElement>('[part~="overlay"]')!;
      const { display } = getComputedStyle(overlay);

      expect(display).to.equal('block');
    });

    it('should not show nested open nav-item`s without the open attribute', async () => {
      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav rail>
          <syn-nav-item class="root" vertical open>nav 1
            <syn-nav-item vertical slot="children">nav 1</syn-nav-item> 
          </syn-nav-item> 
        </syn-side-nav>
      `);
      const rootNavItem = sideNav.querySelector('.root')!;
      const nestedNavItems = rootNavItem.shadowRoot!.querySelector('[part~="children"]')!;

      const { display } = getComputedStyle(nestedNavItems);
      expect(display).to.equal('none');
    });
  });
});
