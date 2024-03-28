/* eslint-disable @typescript-eslint/no-floating-promises */
import sinon from 'sinon';
import '../../../dist/synergy.js';
import {
  expect,
  fixture,
  html,
  waitUntil,
} from '@open-wc/testing';
import type SynHeader from './header.js';

/**
 * Get the wanted part out of the header
 * @param el The root element
 * @param part The part to look for
 */
const getComponentPart = <ElementType extends Element>(el: SynHeader, part: string) => el
  .shadowRoot!
  .querySelector<ElementType>(`[part~="${part}"]`);

describe('<syn-header>', () => {
  describe('defaults ', () => {
    it('passes accessibility test', async () => {
      const el = await fixture<SynHeader>(html`<syn-header></syn-header>`);
      await expect(el).to.be.accessible();
    });

    it('should have default values', async () => {
      const el = await fixture<SynHeader>(html`<syn-header></syn-header>`);

      expect(el.label).to.equal('');
      expect(el.showBurgerMenu).to.equal(false);
      expect(el.burgerMenuVisible).to.equal(false);
    });
  });

  describe('logo', () => {
    it('should use the SICK logo as fallback', async () => {
      const el = await fixture<SynHeader>(html`<syn-header></syn-header>`);
      const logoPart = getComponentPart<HTMLDivElement>(el, 'logo');

      expect(logoPart?.querySelector('syn-icon[name="logo-color"]')).to.not.be.null;
    });
  });

  describe('burger menu toggle button', () => {
    it('should not show the burger menu toggle if showBurgerMenu is not set', async () => {
      const el = await fixture<SynHeader>(html`<syn-header></syn-header>`);
      const burgerMenuPart = getComponentPart<HTMLDivElement>(el, 'burger-menu-toggle-button');
      expect(burgerMenuPart).to.be.null;
    });

    it('should show the burger menu show icon if showBurgerMenu and burgerMenuVisible are set', async () => {
      const el = await fixture<SynHeader>(html`<syn-header show-burger-menu burger-menu-visible></syn-header>`);
      const burgerMenuPart = getComponentPart<HTMLDivElement>(el, 'burger-menu-toggle-button');
      expect(burgerMenuPart).to.not.be.null;
      expect(burgerMenuPart?.querySelector('syn-icon[name="x-lg"]')).to.not.be.null;
      expect(burgerMenuPart?.querySelector('syn-icon[name="menu"]')).to.be.null;
    });

    it('should show the burger menu hide icon if showBurgerMenu is set and burgerMenuVisible is not', async () => {
      const el = await fixture<SynHeader>(html`<syn-header show-burger-menu></syn-header>`);
      const burgerMenuPart = getComponentPart<HTMLDivElement>(el, 'burger-menu-toggle-button');
      expect(burgerMenuPart).to.not.be.null;
      expect(burgerMenuPart?.querySelector('syn-icon[name="x-lg"]')).to.be.null;
      expect(burgerMenuPart?.querySelector('syn-icon[name="menu"]')).to.not.be.null;
    });

    it('should toggle the visibility on click', async () => {
      const el = await fixture<SynHeader>(html`<syn-header show-burger-menu></syn-header>`);
      const burgerMenuPart = getComponentPart<HTMLDivElement>(el, 'burger-menu-toggle-button');

      expect(el.burgerMenuVisible).to.equal(false);

      burgerMenuPart?.click();

      expect(el.burgerMenuVisible).to.equal(true);
    });

    it('should show burger menu toggle if a syn-side-nav in non-rail mode is available', async () => {
      const el = await fixture<SynHeader>(html`
        <syn-header></syn-header>
        <syn-side-nav></syn-side-nav>
        `);

      const burgerMenuPart = getComponentPart<HTMLDivElement>(el, 'burger-menu-toggle-button');

      expect(burgerMenuPart).not.to.be.null;
      expect(el.showBurgerMenu).to.equal(true);
      expect(el.burgerMenuVisible).to.equal(false);
    });

    it('should toggle the open state of a syn-side-nav in non-rail mode', async () => {
      const el = await fixture<HTMLDivElement>(html`
        <div>
          <syn-header></syn-header>
          <syn-side-nav></syn-side-nav>
        </div>
        `);

      const sideNav = el.querySelector('syn-side-nav')!;

      const header = el.querySelector('syn-header')!;

      const burgerMenuPart = getComponentPart<HTMLDivElement>(header, 'burger-menu-toggle-button');

      expect(sideNav.open).to.equal(false);
      expect(header.showBurgerMenu).to.equal(true);
      expect(header.burgerMenuVisible).to.equal(false);

      burgerMenuPart?.click();

      expect(sideNav.open).to.equal(true);
      expect(header.showBurgerMenu).to.equal(true);
      expect(header.burgerMenuVisible).to.equal(true);
    });

    it('should toggle the visible state in case of side-nav was closed via open property', async () => {
      const el = await fixture<HTMLDivElement>(html`
        <div>
          <syn-header></syn-header>
          <syn-side-nav></syn-side-nav>
        </div>
        `);
      const showHandler = sinon.spy();
      const sideNav = el.querySelector('syn-side-nav')!;
      sideNav.addEventListener('syn-show', showHandler);

      const header = el.querySelector('syn-header')!;

      const burgerMenuPart = getComponentPart<HTMLDivElement>(header, 'burger-menu-toggle-button');

      expect(burgerMenuPart?.querySelector('syn-icon[name="x-lg"]')).to.be.null;
      expect(burgerMenuPart?.querySelector('syn-icon[name="menu"]')).to.not.be.null;

      sideNav.open = true;

      await waitUntil(() => showHandler.calledOnce);

      expect(burgerMenuPart?.querySelector('syn-icon[name="x-lg"]')).to.not.be.null;
      expect(burgerMenuPart?.querySelector('syn-icon[name="menu"]')).to.be.null;
    });
  });

  describe('automatic interaction with syn-side-nav ', () => {
    it('should automatically connect with a syn-side-nav if available', async () => {
      const el = await fixture<HTMLDivElement>(html`
        <div>
          <syn-header></syn-header>
          <syn-side-nav></syn-side-nav>
        </div>
        `);
      const header = el.querySelector('syn-header')!;

      // @ts-expect-error the sideNav is a private property
      expect(header.sideNav).to.be.not.null;
    });

    it('should replace the automatically connected side-nav if the connectSideNavigation method is used', async () => {
      const el = await fixture<HTMLDivElement>(html`
        <div>
          <syn-header></syn-header>
          <syn-side-nav id="first"> </syn-side-nav>
          <syn-side-nav id="second"></syn-side-nav>
        </div>
        `);

      const header = el.querySelector('syn-header')!;
      // @ts-expect-error the sideNav is a private property
      expect(header.sideNav.id).to.equal('first');

      header.connectSideNavigation(el.querySelector('#second')!);

      // @ts-expect-error the sideNav is a private property
      expect(header.sideNav.id).to.equal('second');
    });
  });
});
