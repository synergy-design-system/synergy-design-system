import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';

import type SynBadge from './badge.js';

describe('<syn-badge>', () => {
  ['success', 'warning', 'danger'].forEach(variant => {
    it(`should use a screenreader label for the ${variant} variant`, async () => {
      const el = await fixture<SynBadge>(html`<syn-badge variant="${variant}"></syn-badge>`);
      const fallbackSlotContent = el.shadowRoot!.querySelector('.visually-hidden');
      expect(fallbackSlotContent).to.exist;
      await expect(fallbackSlotContent!.textContent?.trim())
        .to
        .equal(el.localize.term(`${variant}`));
    });
  });

  ['primary', 'neutral'].forEach(variant => {
    it(`should use a screenreader label of "notification" for the ${variant} variant`, async () => {
      const el = await fixture<SynBadge>(html`<syn-badge variant="${variant}"></syn-badge>`);
      const fallbackSlotContent = el.shadowRoot!.querySelector('.visually-hidden');
      expect(fallbackSlotContent).to.exist;
      await expect(fallbackSlotContent!.textContent?.trim())
        .to
        .equal(el.localize.term('notification'));
    });
  });
});
