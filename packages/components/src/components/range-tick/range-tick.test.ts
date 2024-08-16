/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';

import type SynRangeTick from './range-tick.js';

describe('<syn-range-tick>', () => {
  describe('accessibility tests', () => {
    it('should be accessible', async () => {
      const el = await fixture<SynRangeTick>(html`<syn-range-tick>Tick Label</syn-range-tick>`);
      await expect(el).to.be.accessible();
    });
  });

  it('should have default values', async () => {
    const el = await fixture<SynRangeTick>(html`<syn-range-tick>Tick Label</syn-range-tick>`);

    expect(el.label).to.equal('');
    expect(el.subdivision).to.be.false;
  });

  describe('subdivision', () => {
    it('should add the className "tick--subdivision" if the subdivision prop is true', async () => {
      const el = await fixture<SynRangeTick>(html`<syn-range-tick subdivision>Tick Label</syn-range-tick>`);
      const tick = el.shadowRoot?.querySelector('.tick');
      expect(tick).to.have.class('tick--subdivision');
    });

    it('should not add the className "tick--subdivision" if the subdivision prop is false', async () => {
      const el = await fixture<SynRangeTick>(html`<syn-range-tick>Tick Label</syn-range-tick>`);
      const tick = el.shadowRoot?.querySelector('.tick');
      expect(tick).to.not.have.class('tick--subdivision');
    });
  });

  describe('if no label is provided', () => {
    it('should not add the className "tick--has-label" if there is no label provided via slot', async () => {
      const el = await fixture<SynRangeTick>(html`<syn-range-tick></syn-range-tick>`);
      const tick = el.shadowRoot?.querySelector('.tick');
      expect(tick).to.not.have.class('tick--has-label');
    });

    it('should not add the className "tick--has-label" if there is no label provided via the label prop', async () => {
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
