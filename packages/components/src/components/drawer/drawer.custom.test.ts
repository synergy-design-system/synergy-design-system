/* eslint-disable @typescript-eslint/no-floating-promises */
import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';

import type SynDrawer from './drawer.js';

describe('<syn-drawer>', () => {
  describe('forceVisibility() / isVisible', () => {
    it('initial value', async () => {
      const el = await fixture<SynDrawer>(html`<syn-drawer></syn-drawer>`);
      expect(el.isVisible).to.be.false;
    });

    it('should display the panel and have correct aria-hidden if open=false and forceVisibility(true) is set', async () => {
      const el = await fixture<SynDrawer>(html`<syn-drawer></syn-drawer>`);
      const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;
      const panel = el.shadowRoot!.querySelector<HTMLElement>('[part~="panel"]')!;

      expect(el.isVisible).to.be.false;
      expect(base.hidden).to.be.true;
      expect(panel.getAttribute('aria-hidden')).to.equal('true');

      el.forceVisibility(true);
      await el.updateComplete;

      expect(el.isVisible).to.be.true;
      expect(base.hidden).to.be.false;
      expect(panel.getAttribute('aria-hidden')).to.equal('false');
    });

    it('should hide the panel and have correct aria-hidden if open=false and forceVisibility(false) is set', async () => {
      const el = await fixture<SynDrawer>(html`<syn-drawer></syn-drawer>`);
      el.forceVisibility(true);
      await el.updateComplete;

      const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;
      const panel = el.shadowRoot!.querySelector<HTMLElement>('[part~="panel"]')!;

      expect(el.isVisible).to.be.true;
      expect(base.hidden).to.be.false;
      expect(panel.getAttribute('aria-hidden')).to.equal('false');

      el.forceVisibility(false);
      await el.updateComplete;

      expect(el.isVisible).to.be.false;
      expect(base.hidden).to.be.true;
      expect(panel.getAttribute('aria-hidden')).to.equal('true');
    });

    it('should still display the panel and have correct aria-hidden value for forceVisibility(true) and changing open to false', async () => {
      const el = await fixture<SynDrawer>(html`<syn-drawer open></syn-drawer>`);
      const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;
      const panel = el.shadowRoot!.querySelector<HTMLElement>('[part~="panel"]')!;
      el.forceVisibility(true);
      await el.updateComplete;

      expect(base.hidden).to.be.false;
      expect(panel.getAttribute('aria-hidden')).to.equal('false');

      el.open = false;
      await el.updateComplete;

      expect(base.hidden).to.be.false;
      expect(panel.getAttribute('aria-hidden')).to.equal('false');
    });
  });
});
