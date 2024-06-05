/* eslint-disable */
import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';

import type SynButton from './button.js';

describe('<syn-button>', () => {

  describe('when provided no parameters', () => {

    it('vendored values are set correctly', async () => {
      const el = await fixture<SynButton>(html` <syn-button>Button Label</syn-button> `);
      expect(el.outline).to.equal(undefined);
      expect(el.pill).to.equal(undefined);
      expect(el.circle).to.equal(undefined);
    });
  });

  describe('icon-only button', () => {

    it('should add the className "button__icon-only" if a syn-icon is the only element in the default slot', async () => {
      const el = await fixture<SynButton>(html` <syn-button><syn-icon name="wallpaper"></syn-icon></syn-button> `);
      const defaultSlot = el.shadowRoot?.querySelector('[part="label"]');
      expect(defaultSlot).to.have.class('button__icon-only');
    });

    it('should not add the className "button__icon-only" if another element is in default slot', async () => {
      const el = await fixture<SynButton>(html` <syn-button>
        <syn-icon name="wallpaper"></syn-icon>
        <span>Button Label</span>
      </syn-button> `);
      const defaultSlot = el.shadowRoot?.querySelector('[part="label"]');
      expect(defaultSlot).to.not.have.class('button__icon-only');
    });

    it('should not add the className "button__icon-only" if a text node is in default slot', async () => {
      const el = await fixture<SynButton>(html` <syn-button>
        <syn-icon name="wallpaper"></syn-icon>
        Button Label
      </syn-button> `);
      const defaultSlot = el.shadowRoot?.querySelector('[part="label"]');
      expect(defaultSlot).to.not.have.class('button__icon-only');
    });
  });
});
