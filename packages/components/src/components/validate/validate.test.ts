import { expect, fixture, html } from '@open-wc/testing';
import '../../../dist/synergy.js';
import type SynValidate from './validate.js';

describe('<syn-validate>', () => {
  it('should be accessible', async () => {
    const el = await fixture<SynValidate>(html`
      <syn-validate>
        <syn-input label="Email" type="email"></syn-input>
      </syn-validate>
    `);
    await expect(el).to.be.accessible();
  });
});
