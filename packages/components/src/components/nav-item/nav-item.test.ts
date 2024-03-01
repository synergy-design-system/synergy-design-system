/* eslint-disable @typescript-eslint/no-floating-promises */
import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';
import type SynNavItem from './nav-item.js';

describe('<syn-nav-item>', () => {
  describe('accessibility tests', () => {
    it('should be accessible', async () => {
      const link = await fixture<SynNavItem>(html`<syn-nav-item href="#">Link</syn-nav-item>`);
      await expect(link).to.be.accessible();

      const button = await fixture<SynNavItem>(html`<syn-nav-item>Button</syn-nav-item>`);
      await expect(button).to.be.accessible();

      const accordion = await fixture<SynNavItem>(html`
        <syn-nav-item>
          Button
          <nav slot="children">Children</nav>
        </syn-nav-item>
      `);
      await expect(accordion).to.be.accessible();
    });
  });

  describe('when provided no parameters', () => {
    it('should have default values', async () => {
      const el = await fixture<SynNavItem>(html`<syn-nav-item>Label</syn-nav-item>`);

      expect(el.current).to.equal(false);
      expect(el.chevron).to.equal(false);
      expect(el.disabled).to.equal(false);
      expect(el.divider).to.equal(false);
      expect(el.href).to.equal('');
      expect(el.open).to.equal(false);
      expect(el.vertical).to.equal(false);
    });

    it('should render as a button', async () => {
      const el = await fixture<SynNavItem>(html`<syn-nav-item>Label</syn-nav-item>`);
      expect(el.shadowRoot!.querySelector('button')).to.exist;
      expect(el.shadowRoot!.querySelector('a')).not.to.exist;
      expect(el.shadowRoot!.querySelector('summary')).not.to.exist;
    });

    it('should disable the button if disabled is set to true', async () => {
      const el = await fixture<SynNavItem>(html`<syn-nav-item disabled>Label</syn-nav-item>`);
      expect(el.shadowRoot!.querySelector('button').ariaDisabled).to.equal('true');
      expect(el.shadowRoot!.querySelector('button').tabIndex).to.equal(-1);
    });

    it('should not have a chevron present', async () => {
      const el = await fixture<SynNavItem>(html`<syn-nav-item>Label</syn-nav-item>`);
      expect(el.shadowRoot?.querySelector('[part~="chevron"]')).not.to.exist;
    });

    it('should not have children present', async () => {
      const el = await fixture<SynNavItem>(html`<syn-nav-item>Label</syn-nav-item>`);
      expect(el.shadowRoot?.querySelector('[part~="children"]')).not.to.exist;
    });
  });

  describe('when the href parameter is provided', () => {
    it('should render as a link', async () => {
      const el = await fixture<SynNavItem>(html`<syn-nav-item href="#">Label</syn-nav-item>`);
      expect(el.shadowRoot!.querySelector('a')).to.exist;
      expect(el.shadowRoot!.querySelector('button')).not.to.exist;
      expect(el.shadowRoot!.querySelector('summary')).not.to.exist;
    });

    it('should disable the link if disabled is set to true', async () => {
      const el = await fixture<SynNavItem>(html`<syn-nav-item href="#" disabled>Label</syn-nav-item>`);
      expect(el.shadowRoot!.querySelector('a').ariaDisabled).to.equal('true');
      expect(el.shadowRoot!.querySelector('a').tabIndex).to.equal(-1);
    });
  });

  describe('when setting the divider prop', () => {
    it('should not show the <syn-divider /> if the vertical prop is not set to true', async () => {
      const el = await fixture<SynNavItem>(html`<syn-nav-item divider>Label</syn-nav-item>`);
      expect(el.shadowRoot!.querySelector('syn-divider')).not.to.exist;
    });

    it('should show the <syn-divider /> if the vertical prop is not set to true', async () => {
      const el = await fixture<SynNavItem>(html`<syn-nav-item divider vertical>Label</syn-nav-item>`);
      expect(el.shadowRoot!.querySelector('syn-divider')).to.exist;
    });
  });

  describe('when setting the chevron prop', () => {
    it('should not show the chevron if chevron is true and vertical is false', async () => {
      const el = await fixture<SynNavItem>(html`<syn-nav-item chevron>Label</syn-nav-item>`);
      expect(el.shadowRoot!.querySelector('[part~="chevron"]')).not.to.exist;
    });

    it('should show the chevron if chevron and vertical are set to true', async () => {
      const el = await fixture<SynNavItem>(html`<syn-nav-item chevron vertical>Label</syn-nav-item>`);
      expect(el.shadowRoot!.querySelector('[part~="chevron"]')).to.exist;
    });

    it('should not show the chevron if there are slotted children and vertical is false', async () => {
      const el = await fixture<SynNavItem>(html`
        <syn-nav-item>
          Label
          <nav slot="children">Children</nav>
        </syn-nav-item>
      `);
      expect(el.shadowRoot!.querySelector('[part~="chevron"]')).not.to.exist;
    });

    it('should show the chevron if there are slotted children and vertical is true', async () => {
      const el = await fixture<SynNavItem>(html`
        <syn-nav-item vertical>
          Label
          <nav slot="children">Children</nav>
        </syn-nav-item>
      `);
      expect(el.shadowRoot!.querySelector('[part~="chevron"]')).to.exist;
    });
  });
});
