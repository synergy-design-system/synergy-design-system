import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';

import type SynTab from './tab.js';

describe('<syn-tab>', () => {
  it('should render default tab', async () => {
    const el = await fixture<SynTab>(html` <syn-tab>Test</syn-tab> `);

    await expect(el.contained).to.equal(false);
    await expect(el.sharp).to.equal(false);
    await expect(el.placement).to.equal('top');
  });

  it('should set sharp by attribute', async () => {
    const el = await fixture<SynTab>(html` <syn-tab sharp>Test</syn-tab> `);

    const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;

    await expect(el.sharp).to.equal(true);
    await expect(base.getAttribute('class')).to.equal(' tab tab--sharp tab--top ');
  });

  it('should set contained by attribute', async () => {
    const el = await fixture<SynTab>(html` <syn-tab contained>Test</syn-tab> `);

    const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;

    await expect(el.contained).to.equal(true);
    await expect(base.getAttribute('class')).to.equal(' tab tab--contained tab--top ');
  });

  describe('placement', () => {
    it('should set placement=top', async () => {
      const el = await fixture<SynTab>(html` <syn-tab placement="top">Test</syn-tab> `);
      const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;

      await expect(el.placement).to.equal('top');
      await expect(base.getAttribute('class')).to.equal(' tab tab--top ');
    });

    it('should set placement=start', async () => {
      const el = await fixture<SynTab>(html` <syn-tab placement="start">Test</syn-tab> `);
      const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;

      await expect(el.placement).to.equal('start');
      await expect(base.getAttribute('class')).to.equal(' tab tab--start ');
    });

    it('should set placement=end', async () => {
      const el = await fixture<SynTab>(html` <syn-tab placement="end">Test</syn-tab> `);
      const base = el.shadowRoot!.querySelector<HTMLElement>('[part~="base"]')!;

      await expect(el.placement).to.equal('end');
      await expect(base.getAttribute('class')).to.equal(' tab tab--end ');
    });
  });

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
