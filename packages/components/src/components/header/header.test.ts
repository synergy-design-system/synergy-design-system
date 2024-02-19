/* eslint-disable @typescript-eslint/no-floating-promises */
import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';
import type SynHeader from './header.js';
import type SynIconButton from '../icon-button/icon-button.component.js';

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

    it('default properties', async () => {
      const el = await fixture<SynHeader>(html`<syn-header></syn-header>`);

      expect(el.sideNavigation).to.be.undefined;
      expect(el.menuLabelClosed).to.equal('Open Menu');
      expect(el.menuLabelOpened).to.equal('Close Menu');
    });
  });

  describe('logo', () => {
    it('should use the SICK logo as fallback', async () => {
      const el = await fixture<SynHeader>(html`<syn-header></syn-header>`);
      const logoPart = getComponentPart<HTMLDivElement>(el, 'logo');

      expect(logoPart?.querySelector('svg')).to.not.be.null;
    });
  });

  describe('side navigation', () => {
    const getSideNavElement = (el: SynHeader) => getComponentPart<HTMLDivElement>(el, 'side-navigation-button');

    const getSynIconButton = (el: HTMLDivElement) => el?.querySelector<SynIconButton>('syn-icon-button');

    it('should not show the side navigation button if side nav is not enabled', async () => {
      const el = await fixture<SynHeader>(html`<syn-header></syn-header>`);
      const sideNav = getSideNavElement(el);
      expect(sideNav).to.be.null;
    });

    it('should show the side navigation button with an close icon if side navigation is open', async () => {
      const el = await fixture<SynHeader>(html`<syn-header side-navigation="open"></syn-header>`);
      const sideNav = getSideNavElement(el);
      const iconButton = getSynIconButton(sideNav!);

      expect(iconButton).to.have.attribute('name', 'close');
      expect(iconButton).to.have.attribute('label', el.menuLabelOpened);
    });

    it('should show the side navigation button with an menu icon if side navigation is closed', async () => {
      const el = await fixture<SynHeader>(html`<syn-header side-navigation="closed"></syn-header>`);
      const sideNav = getSideNavElement(el);
      const iconButton = getSynIconButton(sideNav!);

      expect(iconButton).to.have.attribute('name', 'menu');
      expect(iconButton).to.have.attribute('label', el.menuLabelClosed);
    });
  });
});
