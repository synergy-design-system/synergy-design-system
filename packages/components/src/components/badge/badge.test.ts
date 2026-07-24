/* eslint-disable */
import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';
import type SynBadge from './badge.js';

// The default badge background just misses AA contrast, but the next step up is way too dark. We're going to relax this
// rule for now.
const ignoredRules = ['color-contrast'];

describe('<syn-badge>', () => {
  let el: SynBadge;

  describe('when provided no parameters', () => {
    before(async () => {
      el = await fixture<SynBadge>(html` <syn-badge>Badge</syn-badge> `);
    });

    it('should pass accessibility tests with a role of status on the base part.', async () => {
      await expect(el).to.be.accessible({ ignoredRules });

      const part = el.shadowRoot!.querySelector('[part~="base"]')!;
      expect(part.getAttribute('role')).to.eq('status');
    });

    it('should render the child content provided', () => {
      expect(el.innerText).to.eq('Badge');
    });

    it('should default to square styling, with the primary color', () => {
      const part = el.shadowRoot!.querySelector('[part~="base"]')!;
      expect(part.classList.value.trim()).to.eq('badge badge--primary');
    });
  });

  ['primary', 'success', 'neutral', 'warning', 'critical', 'error', 'danger'].forEach(variant => {
    describe(`when passed a variant attribute ${variant}`, () => {
      before(async () => {
        el = await fixture<SynBadge>(html`<syn-badge variant="${variant}">Badge</syn-badge>`);
      });

      it('should pass accessibility tests', async () => {
        await expect(el).to.be.accessible({ ignoredRules });
      });

      it('should default to square styling, with the primary color', () => {
        const part = el.shadowRoot!.querySelector('[part~="base"]')!;
        expect(part.classList.value.trim()).to.eq(`badge badge--${variant}`);
      });
    });
  });

  (['success', 'warning', 'critical', 'error'] as const).forEach(variant => {
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
