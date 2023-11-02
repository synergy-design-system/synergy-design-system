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
});
