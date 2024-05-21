import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';

import type SynTabGroup from './tab-group.js';

describe('<syn-tab-group>', () => {
  describe('when nested is provided', () => {
    it('should not add the className "tab-group--nested" when nested is set to "false"', async () => {
      const el = await fixture<SynTabGroup>(html`
        <syn-tab-group>
          <syn-tab slot="nav" panel="general">General</syn-tab>
          <syn-tab-panel name="general">This is the general tab panel.</syn-tab-panel>
        </syn-tab-group>
      `);
      const tabGroup = el.shadowRoot?.querySelector('.tab-group');
      expect(tabGroup).to.not.have.class('tab-group--nested');
    });

    it('should add the className "tab-group--nested" when nested is set to "true"', async () => {
      const el = await fixture<SynTabGroup>(html`
        <syn-tab-group nested>
          <syn-tab slot="nav" panel="general">General</syn-tab>
          <syn-tab-panel name="general">This is the general tab panel.</syn-tab-panel>
        </syn-tab-group>
      `);
      const tabGroup = el.shadowRoot?.querySelector('.tab-group');
      expect(tabGroup).to.have.class('tab-group--nested');
    });
  });

  describe('when contained is provided', () => {
    it('should not add the className "tab-group--contained" when contained is set to "false"', async () => {
      const el = await fixture<SynTabGroup>(html`
        <syn-tab-group>
          <syn-tab slot="nav" panel="general">General</syn-tab>
          <syn-tab-panel name="general">This is the general tab panel.</syn-tab-panel>
        </syn-tab-group>
      `);
      const tabGroup = el.shadowRoot?.querySelector('.tab-group');
      expect(tabGroup).to.not.have.class('tab-group--contained');
    });

    it('should add the className "tab-group--contained" when contained is set to "true"', async () => {
      const el = await fixture<SynTabGroup>(html`
        <syn-tab-group contained>
          <syn-tab slot="nav" panel="general">General</syn-tab>
          <syn-tab-panel name="general">This is the general tab panel.</syn-tab-panel>
        </syn-tab-group>
      `);
      const tabGroup = el.shadowRoot?.querySelector('.tab-group');
      expect(tabGroup).to.have.class('tab-group--contained');
    });
  });
});
