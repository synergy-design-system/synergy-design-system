/* eslint-disable */
import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';

import type SynTextarea from './textarea.js';

describe('<syn-textarea>', () => {
  it('vendored values are set correctly', async () => {
    const el = await fixture<SynTextarea>(html` <syn-textarea></syn-textarea> `);
    expect(el.filled).to.equal(undefined);
  });
});
