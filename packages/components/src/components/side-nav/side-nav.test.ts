/* eslint-disable @typescript-eslint/no-floating-promises */
import '../../../dist/synergy.js';
import {
  aTimeout,
  expect,
  fixture,
  html,
  waitUntil,
} from '@open-wc/testing';
import sinon from 'sinon';
import type SynSideNav from './side-nav.js';
import type SynNavItem from '../nav-item/nav-item.js';

describe('<syn-side-nav>', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('accessibility tests', () => {
    it('should be accessible', async () => {
      const sideNav = await fixture<SynSideNav>(html`<syn-side-nav open></syn-side-nav>`);
      await expect(sideNav).to.be.accessible();
    });
  });

  describe('when provided no parameters', () => {
    it('should have default values', async () => {
      const sideNav = await fixture<SynSideNav>(html`<syn-side-nav></syn-side-nav>`);

      expect(sideNav.open).to.equal(false);
      expect(sideNav.rail).to.equal(false);
      expect(sideNav.variant).to.equal('default');
      expect(sideNav.noFocusTrapping).to.equal(false);
    });
  });

  describe('when using methods', () => {
    it('should emit syn-show and syn-after-show when calling show()', async () => {
      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav>
          <syn-nav-item>nav 1</syn-nav-item> 
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
          <syn-nav-item>nav 1</syn-nav-item> 
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
          <syn-nav-item>nav 1</syn-nav-item> 
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
          <syn-nav-item>nav 1</syn-nav-item> 
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

  describe('when using variant="default"', () => {
    it('should be visible and expanded with open attribute', async () => {
      const expectedDrawerOpenSize = '320px';
      const expectedSideNavOpenSize = '320px';

      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav open>
          <syn-nav-item>nav 1</syn-nav-item> 
        </syn-side-nav>
      `);
      const drawer = sideNav.shadowRoot!.querySelector<HTMLElement>('[part~="drawer"]')!;
      const baseDrawer = drawer.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;
      const baseSideNav = sideNav.shadowRoot!.querySelector('[part~="base"]')!;

      const { display } = getComputedStyle(baseDrawer);

      expect(display).to.equal('block');

      const size = getComputedStyle(drawer).getPropertyValue('--size');
      const sideNavSize = getComputedStyle(baseSideNav).width;

      expect(size).to.equal(expectedDrawerOpenSize);
      expect(sideNavSize).to.equal(expectedSideNavOpenSize);
    });

    it('should not be visible without the open attribute', async () => {
      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav>
          <syn-nav-item>nav 1</syn-nav-item> 
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
          <syn-nav-item>nav 1</syn-nav-item> 
        </syn-side-nav>
      `);
      const drawer = sideNav.shadowRoot!.querySelector<HTMLElement>('[part~="drawer"]')!;
      const overlay = drawer.shadowRoot!.querySelector<HTMLElement>('[part~="overlay"]')!;
      const { display } = getComputedStyle(overlay);

      expect(display).to.equal('block');
    });
  });

  // TODO: this can be removed in synergy version 3.0
  describe('when using rail mode', () => {
    it('should be visible and expanded with open attribute', async () => {
      const expectedDrawerOpenSize = '320px';
      const expectedSideNavOpenSize = '72px';
      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav rail open>
          <syn-nav-item>nav 1</syn-nav-item> 
        </syn-side-nav>
      `);
      const drawer = sideNav.shadowRoot!.querySelector<HTMLElement>('[part~="drawer"]')!;
      const baseDrawer = drawer.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;
      const baseSideNav = sideNav.shadowRoot!.querySelector('[part~="base"]')!;

      expect(baseDrawer.hidden).to.be.false;

      const size = getComputedStyle(drawer).getPropertyValue('--size');
      const sideNavSize = getComputedStyle(baseSideNav).width;

      expect(size).to.equal(expectedDrawerOpenSize);
      expect(sideNavSize).to.equal(expectedSideNavOpenSize);
    });

    it('should be visible and shrunk without the open attribute', async () => {
      const expectedDrawerCloseSize = '72px';
      const expectedSideNavCloseSize = '72px';

      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav rail>
          <syn-nav-item>nav 1</syn-nav-item> 
        </syn-side-nav>
      `);
      const drawer = sideNav.shadowRoot!.querySelector<HTMLElement>('[part~="drawer"]')!;
      const baseDrawer = drawer.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;
      const baseSideNav = sideNav.shadowRoot!.querySelector('[part~="base"]')!;

      expect(baseDrawer.hidden).to.be.false;

      const size = getComputedStyle(drawer).getPropertyValue('--size');
      const sideNavSize = getComputedStyle(baseSideNav).width;

      expect(size).to.equal(expectedDrawerCloseSize);
      expect(sideNavSize).to.equal(expectedSideNavCloseSize);
    });

    it('should show no overlay on open state', async () => {
      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav rail open>
          <syn-nav-item>nav 1</syn-nav-item> 
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
          <syn-nav-item>nav 1</syn-nav-item> 
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
          <syn-nav-item class="root" open>nav 1
            <syn-nav-item slot="children">nav 1</syn-nav-item> 
          </syn-nav-item> 
        </syn-side-nav>
      `);
      const rootNavItem = sideNav.querySelector('.root')!;
      const nestedNavItems = rootNavItem.shadowRoot!.querySelector('[part~="children"]')!;

      const { display } = getComputedStyle(nestedNavItems);
      expect(display).to.equal('none');
    });

    it('should remove the forcing of drawer visibility if rail mode changed to rail = false and open = false', async () => {
      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav rail>
          <syn-nav-item>nav 1</syn-nav-item> 
        </syn-side-nav>
      `);
      const drawer = sideNav.shadowRoot!.querySelector<HTMLElement>('[part~="drawer"]')!;
      const baseDrawer = drawer.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;

      expect(baseDrawer.hidden).to.be.false;

      sideNav.rail = false;

      await sideNav.updateComplete;

      expect(baseDrawer.hidden).to.be.true;
    });

    it('should open the side-nav if nav-item is focused and close it if it looses focus', async () => {
      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav rail>
          <syn-nav-item>nav 1</syn-nav-item> 
        </syn-side-nav>
      `);
      const navItem = sideNav.querySelector('syn-nav-item')!;

      expect(sideNav.open).to.be.false;

      navItem.focus();

      expect(sideNav.open).to.be.true;

      navItem.blur();

      expect(sideNav.open).to.be.false;
    });
  });

  describe('when using variant="rail"', () => {
    it('should be visible and expanded with open attribute', async () => {
      const expectedDrawerOpenSize = '320px';
      const expectedSideNavOpenSize = '72px';
      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav variant="rail" open>
          <syn-nav-item>nav 1</syn-nav-item> 
        </syn-side-nav>
      `);

      await sideNav.updateComplete;
      const drawer = sideNav.shadowRoot!.querySelector<HTMLElement>('[part~="drawer"]')!;
      const baseDrawer = drawer.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;
      const baseSideNav = sideNav.shadowRoot!.querySelector('[part~="base"]')!;

      expect(baseDrawer.hidden).to.be.false;

      const size = getComputedStyle(drawer).getPropertyValue('--size');
      const sideNavSize = getComputedStyle(baseSideNav).width;

      expect(size).to.equal(expectedDrawerOpenSize);
      expect(sideNavSize).to.equal(expectedSideNavOpenSize);
    });

    it('should be visible and shrunk without the open attribute', async () => {
      const expectedDrawerCloseSize = '72px';
      const expectedSideNavCloseSize = '72px';

      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav variant="rail">
          <syn-nav-item>nav 1</syn-nav-item> 
        </syn-side-nav>
      `);
      const drawer = sideNav.shadowRoot!.querySelector<HTMLElement>('[part~="drawer"]')!;
      const baseDrawer = drawer.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;
      const baseSideNav = sideNav.shadowRoot!.querySelector('[part~="base"]')!;

      expect(baseDrawer.hidden).to.be.false;

      const size = getComputedStyle(drawer).getPropertyValue('--size');
      const sideNavSize = getComputedStyle(baseSideNav).width;

      expect(size).to.equal(expectedDrawerCloseSize);
      expect(sideNavSize).to.equal(expectedSideNavCloseSize);
    });

    it('should show no overlay on open state', async () => {
      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav variant="rail" open>
          <syn-nav-item>nav 1</syn-nav-item> 
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
        <syn-side-nav variant="rail" open>
          <syn-nav-item>nav 1</syn-nav-item> 
        </syn-side-nav>
      `);
      const drawer = sideNav.shadowRoot!.querySelector<HTMLElement>('[part~="drawer"]')!;
      const overlay = drawer.shadowRoot!.querySelector<HTMLElement>('[part~="overlay"]')!;
      const { display } = getComputedStyle(overlay);

      expect(display).to.equal('block');
    });

    it('should not show nested open nav-item`s without the open attribute', async () => {
      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav variant="rail">
          <syn-nav-item class="root" open>nav 1
            <syn-nav-item slot="children">nav 1</syn-nav-item> 
          </syn-nav-item> 
        </syn-side-nav>
      `);
      const rootNavItem = sideNav.querySelector('.root')!;
      const nestedNavItems = rootNavItem.shadowRoot!.querySelector('[part~="children"]')!;

      const { display } = getComputedStyle(nestedNavItems);
      expect(display).to.equal('none');
    });

    it('should remove the forcing of drawer visibility if variant changed to `default` and open = false', async () => {
      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav variant="rail">
          <syn-nav-item>nav 1</syn-nav-item> 
        </syn-side-nav>
      `);
      const drawer = sideNav.shadowRoot!.querySelector<HTMLElement>('[part~="drawer"]')!;
      const baseDrawer = drawer.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;

      expect(baseDrawer.hidden).to.be.false;

      sideNav.variant = 'default';

      await sideNav.updateComplete;

      expect(baseDrawer.hidden).to.be.true;
    });

    it('should open the side-nav if nav-item is focused and close it if it looses focus', async () => {
      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav variant="rail">
          <syn-nav-item>nav 1</syn-nav-item> 
        </syn-side-nav>
      `);
      const navItem = sideNav.querySelector('syn-nav-item')!;

      expect(sideNav.open).to.be.false;

      navItem.focus();

      expect(sideNav.open).to.be.true;

      navItem.blur();

      expect(sideNav.open).to.be.false;
    });
  });

  describe('when using variant="sticky"', () => {
    it('should be visible and expanded with open attribute', async () => {
      const expectedOpenSize = '320px';
      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav variant="sticky" open>
          <syn-nav-item>nav 1</syn-nav-item> 
        </syn-side-nav>
      `);

      await sideNav.updateComplete;

      const drawer = sideNav.shadowRoot!.querySelector<HTMLElement>('[part~="drawer"]')!;
      const baseDrawer = drawer.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;
      const baseSideNav = sideNav.shadowRoot!.querySelector('[part~="base"]')!;

      expect(baseDrawer.hidden).to.be.false;

      const size = getComputedStyle(drawer).getPropertyValue('--size');
      const sideNavSize = getComputedStyle(baseSideNav).width;

      expect(size).to.equal(expectedOpenSize);
      expect(sideNavSize).to.equal(expectedOpenSize);
    });

    it('should be visible and shrunk without the open attribute', async () => {
      const expectedCloseSize = '72px';

      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav variant="sticky">
          <syn-nav-item>nav 1</syn-nav-item> 
        </syn-side-nav>
      `);

      await sideNav.updateComplete;

      const drawer = sideNav.shadowRoot!.querySelector<HTMLElement>('[part~="drawer"]')!;
      const baseDrawer = drawer.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;
      const baseSideNav = sideNav.shadowRoot!.querySelector('[part~="base"]')!;

      expect(baseDrawer.hidden).to.be.false;

      const size = getComputedStyle(drawer).getPropertyValue('--size');
      const sideNavSize = getComputedStyle(baseSideNav).width;

      expect(size).to.equal(expectedCloseSize);
      expect(sideNavSize).to.equal(expectedCloseSize);
    });

    it('should show no overlay on open state', async () => {
      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav variant="sticky" open>
          <syn-nav-item>nav 1</syn-nav-item> 
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
        <syn-side-nav variant="sticky" open>
          <syn-nav-item>nav 1</syn-nav-item> 
        </syn-side-nav>
      `);
      const drawer = sideNav.shadowRoot!.querySelector<HTMLElement>('[part~="drawer"]')!;
      const overlay = drawer.shadowRoot!.querySelector<HTMLElement>('[part~="overlay"]')!;
      const { display } = getComputedStyle(overlay);

      expect(display).to.equal('block');
    });

    // TODO: remove this test, if we don't want this behaviour and remove the corresponding styling
    it('should not grow for touch devices in open state', async () => {
      // Mock touch device
      sinon.stub(window.navigator, 'maxTouchPoints').value(1);

      const expectedWidth = '72px';

      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav variant="sticky">
          <syn-nav-item>nav 1</syn-nav-item> 
        </syn-side-nav>
      `);

      const base = sideNav.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;
      const { width: closeWidth } = getComputedStyle(base);

      expect(closeWidth).to.equal(expectedWidth);

      sideNav.open = true;
      await sideNav.updateComplete;

      const { width: openWidth } = getComputedStyle(base);

      expect(openWidth).to.equal(expectedWidth);
    });

    // TODO: clarify what should happen,
    // if someone uses nested nav-items although we do not support it?
    // it('should not show nested open nav-item`s without the open attribute', async () => {
    //   const sideNav = await fixture<SynSideNav>(html`
    //     <syn-side-nav variant="sticky">
    //       <syn-nav-item class="root" open>nav 1
    //         <syn-nav-item slot="children">nav 1</syn-nav-item>
    //       </syn-nav-item>
    //     </syn-side-nav>
    //   `);
    //   const rootNavItem = sideNav.querySelector('.root')!;
    //   const nestedNavItems = rootNavItem.shadowRoot!.querySelector('[part~="children"]')!;

    //   const { display } = getComputedStyle(nestedNavItems);
    //   expect(display).to.equal('none');
    // });

    it('should remove the forcing of drawer visibility if variant changed to `default` and open = false', async () => {
      const sideNav = await fixture<SynSideNav>(html`
        <syn-side-nav variant="sticky">
          <syn-nav-item>nav 1</syn-nav-item> 
        </syn-side-nav>
      `);
      const drawer = sideNav.shadowRoot!.querySelector<HTMLElement>('[part~="drawer"]')!;
      const baseDrawer = drawer.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;

      expect(baseDrawer.hidden).to.be.false;

      sideNav.variant = 'default';

      await sideNav.updateComplete;

      expect(baseDrawer.hidden).to.be.true;
    });
  });

  it('should show an indentation for nested nav-items (#708)', async () => {
    const sideNav = await fixture<SynSideNav>(html`
      <syn-side-nav>
        <syn-nav-item id="first">
          first level
          <syn-nav-item slot="children" id="second">
            second level
            <syn-nav-item slot="children" id="third">third level</syn-nav-item> 
          </syn-nav-item> 
        </syn-nav-item> 
      </syn-side-nav>
    `);

    // For the firefox fix, we needed to move the `handleSlotChange` of the syn-nav-item into
    // the next update cycle. Therefore we need to wait
    await aTimeout(0);

    const firstNested = sideNav.querySelector('#first') as SynNavItem;
    const secondNested = sideNav.querySelector('#second') as SynNavItem;
    const thirdNested = sideNav.querySelector('#third') as SynNavItem;

    expect(getComputedStyle(firstNested).getPropertyValue('--indentation')).to.equal('0');
    expect(getComputedStyle(secondNested).getPropertyValue('--indentation')).to.equal('1');
    expect(getComputedStyle(thirdNested).getPropertyValue('--indentation')).to.equal('2');
  });
});
