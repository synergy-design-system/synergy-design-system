/* eslint-disable @typescript-eslint/no-floating-promises */
import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';
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

    it('default values are set correctly', async () => {
      const el = await fixture<SynHeader>(html`<syn-header></syn-header>`);
      await expect(el.logoLabel).to.equal('SICK Sensor Intelligence');
    });
  });

  describe('logo', () => {
    it('should use the SICK logo as fallback', async () => {
      const el = await fixture<SynHeader>(html`<syn-header></syn-header>`);
      const logoPart = getComponentPart<HTMLDivElement>(el, 'logo');

      expect(logoPart?.querySelector('syn-icon[name="logo-color"]')).to.not.be.null;
    });

    it('should use the provided logo-label attribute as the logos label', async () => {
      const el = await fixture<SynHeader>(html`<syn-header logo-label="Test"></syn-header>`);
      const logoPart = getComponentPart<HTMLDivElement>(el, 'logo');

      expect(logoPart?.querySelector('syn-icon')).to.have.attribute('label', 'Test');
    });
  });
});
