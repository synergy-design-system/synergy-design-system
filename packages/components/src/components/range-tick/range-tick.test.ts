/* eslint-disable @typescript-eslint/no-misused-promises */
import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';

import type SynRangeTick from './range-tick.js';

describe('<syn-range-tick>', () => {
  describe('accessibility tests', async () => {
    const el = await fixture<SynRangeTick>(html`<syn-range-tick>Tick Label</syn-range-tick>`);
    await expect(el).to.be.accessible();
  });

  describe('if no label is provided', () => {
    it('should not add the className "tick--has-label" if there is no label provided via slot', async () => {
      const el = await fixture<SynRangeTick>(html`<syn-range-tick></syn-range-tick>`);
      const tick = el.shadowRoot?.querySelector('.tick');
      expect(tick).to.not.have.class('tick--has-label');
    });

    it('should not add the className "tick--has-label" if there is no label provided via the label prop prop', async () => {
      const el = await fixture<SynRangeTick>(html`<syn-range-tick label=""></syn-range-tick>`);
      const tick = el.shadowRoot?.querySelector('.tick');
      expect(tick).to.not.have.class('tick--has-label');
    });
  });

  describe('if a label is provided', () => {
    it('should add the className "tick--has-label" if it is provided via the default slot', async () => {
      const el = await fixture<SynRangeTick>(html`<syn-range-tick>Tick Label</syn-range-tick>`);
      const tick = el.shadowRoot?.querySelector('.tick');
      expect(tick).to.have.class('tick--has-label');
    });

    it('should add the className "tick--has-label" if it is provided via the label prop prop', async () => {
      const el = await fixture<SynRangeTick>(html`<syn-range-tick label="Tick Label"></syn-range-tick>`);
      const tick = el.shadowRoot?.querySelector('.tick');
      expect(tick).to.have.class('tick--has-label');
    });
  });
});
