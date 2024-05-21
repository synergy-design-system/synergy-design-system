import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';

import type SynTab from './tab.js';

describe('<syn-tab>', () => {
  describe('when provided an element in the slot "prefix" to support prefix icons', () => {
    it('should pass accessibility tests', async () => {
      const el = await fixture<SynTab>(html`
        <syn-tab-group>
          <syn-tab slot="nav">
            <span class="prefix-example" slot="prefix">/</span>
            Test
          </syn-tab>
        </syn-tab-group>
      `);
      await expect(el).to.be.accessible();
    });

    it('should accept as an assigned child in the shadow root', async () => {
      const el = await fixture<SynTab>(html`
        <syn-tab>
          <span class="prefix-example" slot="prefix">/</span>
          Test
        </syn-tab>
      `);
      const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name=prefix]')!;
      const childNodes = slot.assignedNodes({ flatten: true });

      await expect(childNodes.length).to.eq(1);
    });
  });
});
