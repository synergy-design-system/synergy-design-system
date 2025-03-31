import '../../../dist/synergy.js';
import {
  aTimeout, expect, fixture, html, oneEvent,
} from '@open-wc/testing';
import type SynSelect from './select.js';

describe('<syn-select>', () => {
  describe('regression tests', () => {
    describe('#780: should not break on invalid values of the "value" prop when "multiple" is set', () => {
      it('should support an empty string', async () => {
        const el = await fixture<SynSelect>('<syn-select multiple></syn-select>');
        el.value = '';
        await expect(el.value).to.eql(['']);
      });

      it('should support a string', async () => {
        const el = await fixture<SynSelect>('<syn-select multiple></syn-select>');
        el.value = 'value';
        await expect(el.value).to.eql(['value']);
      });

      it('should support none falsy values', async () => {
        const el = await fixture<SynSelect>('<syn-select multiple></syn-select>');
        // @ts-expect-error Testing for invalid values
        el.value = 1;
        await expect(el.value).to.eql([1]);
      });

      it('should not allow falsy values', async () => {
        const el = await fixture<SynSelect>('<syn-select multiple></syn-select>');
        // @ts-expect-error Testing for invalid values
        el.value = false;
        await expect(el.value).to.eql([]);
      });

      it('should not allow undefined values', async () => {
        const el = await fixture<SynSelect>('<syn-select multiple></syn-select>');
        // @ts-expect-error Testing for invalid values
        el.value = undefined;
        await expect(el.value).to.eql([]);
      });

      it('should support an array of strings', async () => {
        const el = await fixture<SynSelect>('<syn-select multiple></syn-select>');
        el.value = ['a', 'b', 'c'];
        await expect(el.value).to.eql(['a', 'b', 'c']);
      });
    });

    // TODO: could be removed if shoelace accepts the PR and the tests are added there
    describe('#813: should work correctly if `value` was set via property binding', () => {
      it('should show the value of the dynamically added option', async () => {
        const el = await fixture<SynSelect>(html`
          <syn-select .value=${'option-1'}></syn-select>
        `);

        await el.updateComplete;

        await expect(el.value).to.equal('option-1');
        await expect(el.displayLabel).to.equal('');

        // wait a short time until adding options dynamically
        await aTimeout(10);
        const option = document.createElement('syn-option');
        option.value = 'option-1';
        option.textContent = 'Option 1';
        el.appendChild(option);
        await el.updateComplete;

        await expect(el.value).to.equal('option-1');
        await expect(el.displayLabel).to.equal('Option 1');
      });

      it('should reset the value of the select in a form to the initially set value', async () => {
        const form = await fixture<HTMLFormElement>(html`
          <form>
            <syn-select .value=${'option-1'}>
              <syn-option value="option-1">Option 1</syn-option>
              <syn-option value="option-2">Option 2</syn-option>
            </syn-select>
            <syn-button type="reset">Reset</syn-button>
          </form>
        `);

        const resetButton = form.querySelector('syn-button')!;
        const select = form.querySelector('syn-select')!;
        select.value = 'option-2';
        await select.updateComplete;

        await expect(select.value).to.equal('option-2');

        setTimeout(() => resetButton.click());
        await oneEvent(form, 'reset');
        await select.updateComplete;
        await expect(select.value).to.equal('option-1');
      });
    });
  });
});
