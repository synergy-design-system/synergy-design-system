import '../../../dist/synergy.js';
import {
  expect,
  fixture,
  html,
} from '@open-wc/testing';
import type SynAlert from './alert.js';

describe('<syn-alert>', () => {
  describe('when using the size attribute', () => {
    it('sets the default size to "medium" per default', async () => {
      const el = await fixture<SynAlert>(html` <syn-alert>Alert message</syn-alert> `);
      expect(el.size).to.equal('medium');
    });

    [
      'small',
      'medium',
      'large',
    ].forEach(size => {
      it(`sets the size to "${size}" when the size attribute is set to "${size}"`, async () => {
        const el = await fixture<SynAlert>(html` <syn-alert size="${size}">Alert message</syn-alert> `);
        expect(el.size).to.equal(size);
        expect(el.shadowRoot!.querySelector('.alert')).to.have.class(`alert--${size}`);
      });
    });
  });
});
