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
  });

  describe('logo', () => {
    it('should use the SICK logo as fallback', async () => {
      const el = await fixture<SynHeader>(html`<syn-header></syn-header>`);
      const logoPart = getComponentPart<HTMLDivElement>(el, 'logo');

      expect(logoPart?.querySelector('syn-icon[name="logo-color"]')).to.not.be.null;
    });
  });
});
