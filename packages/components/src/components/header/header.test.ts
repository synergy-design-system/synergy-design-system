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
      expect(el.burgerMenu).to.equal('hidden');
    });
  });

  describe('label', () => {
    it('should allow setting the label via label slot', async () => {
      const el = await fixture<SynHeader>(html`
        <syn-header>
          <span slot="label">Label via Slot</span>
        </syn-header>
      `);

      expect(el).to.include.text('Label via Slot');
    });

    it('should allow setting the label via label prop', async () => {
      const el = await fixture<SynHeader>(html`<syn-header label="Label via Prop"></syn-header>`);

      const labelSlot = getComponentPart<HTMLDivElement>(el, 'label');
      expect(labelSlot).to.include.text('Label via Prop');
    });

    it('should use the label slot content as label if both slot and prop are set', async () => {
      const el = await fixture<SynHeader>(html`
        <syn-header label="Label via Prop">
          <span slot="label">Label via Slot</span>
        </syn-header>
      `);

      expect(el).to.include.text('Label via Slot');
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
    it('should not show the burger menu toggle if burgerMenu is not set', async () => {
      const el = await fixture<SynHeader>(html`<syn-header></syn-header>`);
      const burgerMenuPart = getComponentPart<HTMLDivElement>(el, 'burger-menu-toggle-button');
      expect(burgerMenuPart).to.be.null;
    });

    it('should show the burger menu show icon if burgerMenu is set to "open"', async () => {
      const el = await fixture<SynHeader>(html`<syn-header burger-menu="opened"></syn-header>`);
      const burgerMenuPart = getComponentPart<HTMLDivElement>(el, 'burger-menu-toggle-button');
      expect(burgerMenuPart).to.not.be.null;
      expect(burgerMenuPart?.querySelector('syn-icon[name="x-lg"]')).to.not.be.null;
      expect(burgerMenuPart?.querySelector('syn-icon[name="menu"]')).to.be.null;
    });

    it('should show the burger menu hide icon if burgerMenu is set to "closed"', async () => {
      const el = await fixture<SynHeader>(html`<syn-header burger-menu="closed"></syn-header>`);
      const burgerMenuPart = getComponentPart<HTMLDivElement>(el, 'burger-menu-toggle-button');
      expect(burgerMenuPart).to.not.be.null;
      expect(burgerMenuPart?.querySelector('syn-icon[name="x-lg"]')).to.be.null;
      expect(burgerMenuPart?.querySelector('syn-icon[name="menu"]')).to.not.be.null;
    });

    it('should toggle the visibility on click', async () => {
      const el = await fixture<SynHeader>(html`<syn-header burger-menu="opened"></syn-header>`);
      const burgerMenuPart = getComponentPart<HTMLDivElement>(el, 'burger-menu-toggle-button');

      expect(el.burgerMenu).to.equal('opened');

      burgerMenuPart?.click();

      expect(el.burgerMenu).to.equal('closed');
    });

    it('should show burger menu toggle if a syn-side-nav in non-rail mode is available', async () => {
      const el = await fixture<SynHeader>(html`
        <syn-header></syn-header>
        <syn-side-nav></syn-side-nav>
      `);

      const burgerMenuPart = getComponentPart<HTMLDivElement>(el, 'burger-menu-toggle-button');

      expect(burgerMenuPart).not.to.be.null;
      expect(el.burgerMenu).to.equal('closed');
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
      expect(header.burgerMenu).to.equal('closed');

      burgerMenuPart?.click();

      expect(sideNav.open).to.equal(true);
      expect(header.burgerMenu).to.equal('opened');
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

    it('should toggle the showBurgerMenu state in case of side-vna mode was changed to rail = true', async () => {
      const el = await fixture<HTMLDivElement>(html`
        <div>
          <syn-header></syn-header>
          <syn-side-nav></syn-side-nav>
        </div>
      `);

      const header = el.querySelector('syn-header')!;
      const sideNav = el.querySelector('syn-side-nav')!;

      expect(header.burgerMenu).to.equal('closed');

      sideNav.rail = true;
      await sideNav.updateComplete;

      expect(header.burgerMenu).to.equal('hidden');
    });

    it('should emit syn-burger-menu-opened and and syn-burger-menu-closed events when clicked', async () => {
      const el = await fixture<SynHeader>(html`<syn-header burger-menu="closed"></syn-header>`);
      const burgerMenuPart = getComponentPart<HTMLDivElement>(el, 'burger-menu-toggle-button');

      const burgerMenuShowHandler = sinon.spy();
      const burgerMenuHideHandler = sinon.spy();

      el.addEventListener('syn-burger-menu-opened', burgerMenuShowHandler);
      el.addEventListener('syn-burger-menu-closed', burgerMenuHideHandler);

      burgerMenuPart?.click();
      await el.updateComplete;

      expect(burgerMenuShowHandler).to.have.been.calledOnce;

      burgerMenuPart?.click();
      await el.updateComplete;

      expect(burgerMenuHideHandler).to.have.been.calledOnce;
    });

    ['opened', 'closed', 'hidden'].forEach(variant => {
      it(`should emit "syn-burger-menu-${variant}" when setting burgerMenu to "${variant}"`, async () => {
        // Note we have to force burger-menu into an invalid state.
        // Otherwise, the default of "hidden" would not work!
        const el = await fixture<SynHeader>(html`<syn-header burger-menu="invalid"></syn-header>`);
        const handler = sinon.spy();
        el.addEventListener(`syn-burger-menu-${variant}`, handler);

        el.burgerMenu = variant as 'hidden' | 'opened' | 'closed';

        await waitUntil(() => handler.calledOnce);

        expect(handler).to.have.been.calledOnce;
      });
    });

    it('should emit "syn-burger-menu-closed" when side-nav is closed via open property', async () => {
      const el = await fixture<HTMLDivElement>(html`
        <div>
          <syn-header></syn-header>
          <syn-side-nav open></syn-side-nav>
        </div>
      `);
      const sideNav = el.querySelector('syn-side-nav')!;
      const header = el.querySelector('syn-header')!;
      const burgerMenuHideHandler = sinon.spy();

      header.addEventListener('syn-burger-menu-closed', burgerMenuHideHandler);

      sideNav.open = false;

      await waitUntil(() => burgerMenuHideHandler.calledOnce);

      expect(burgerMenuHideHandler).to.have.been.calledOnce;
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

      header.connectSideNavigation(el.querySelector('#second'));

      // @ts-expect-error the sideNav is a private property
      expect(header.sideNav.id).to.equal('second');
    });
  });

  describe('when mutation observer for side navigation', () => {
    it('should not set up a mutation observer if no side navigation is available', async () => {
      const observeStub = sinon.stub();
      (globalThis.MutationObserver as unknown) = sinon.stub().returns({
        disconnect: sinon.stub(),
        observe: observeStub,
        takeRecords: sinon.stub(),
      });

      await fixture<SynHeader>(html`<syn-header></syn-header>`);
      expect(observeStub).to.not.have.been.called;
    });

    it('should set up a mutation observer if a side navigation is available', async () => {
      const observeStub = sinon.stub();
      (globalThis.MutationObserver as unknown) = sinon.stub().returns({
        disconnect: sinon.stub(),
        observe: observeStub,
        takeRecords: sinon.stub(),
      });

      await fixture<HTMLDivElement>(html`
        <syn-header></syn-header>
        <syn-side-nav></syn-side-nav>
      `);
      expect(observeStub).to.have.been.calledOnce;
    });

    it('should disconnect the mutation observer on disconnectedCallback', async () => {
      const disconnectStub = sinon.stub();
      (globalThis.MutationObserver as unknown) = sinon.stub().returns({
        disconnect: disconnectStub,
        observe: sinon.stub(),
        takeRecords: sinon.stub(),
      });

      const el = await fixture<HTMLDivElement>(html`
        <div>
          <syn-header></syn-header>
          <syn-side-nav></syn-side-nav>
        </div>
      `);
      const header = el.querySelector('syn-header')!;
      header.remove();

      expect(disconnectStub).to.have.been.called;
    });

    it('should disconnect the mutation observer and reconnect a new one if connectSideNavigation method is used', async () => {
      const disconnectStub = sinon.stub();
      const observeStub = sinon.stub();

      (globalThis.MutationObserver as unknown) = sinon.stub().returns({
        disconnect: disconnectStub,
        observe: observeStub,
        takeRecords: sinon.stub(),
      });

      const el = await fixture<HTMLDivElement>(html`
        <div>
          <syn-header></syn-header>
          <syn-side-nav id="first"> </syn-side-nav>
          <syn-side-nav id="second"></syn-side-nav>
        </div>
      `);

      expect(observeStub).to.have.been.calledOnce;

      const header = el.querySelector('syn-header')!;
      header.connectSideNavigation(el.querySelector('#second'));

      expect(observeStub).to.have.been.calledTwice;
      expect(disconnectStub).to.have.been.calledTwice;
    });
  });
});
