/* eslint-disable */
import '../../../dist/synergy.js';
import { expect, fixture, html } from '@open-wc/testing';

import type SynInput from './input.js';
import type SynButton from '../button/button.js';

describe('when using constraint validation', () => {
  it('should be invalid when required and empty', async () => {
    const el = await fixture<HTMLFormElement>(html`
          <form>
            <syn-input required></syn-input>
            <syn-button size="medium" type="submit">Submit</syn-button>
          </form>
      `);
    const input = el.querySelector('syn-input');
    const form = el.querySelector('form');
    const button = form?.querySelector('syn-button');

    setTimeout(() => button?.click());

    expect(input?.reportValidity()).to.be.false;
    expect(input?.checkValidity()).to.be.false;
  });
});
