import '../../../dist/synergy.js';
import {
  aTimeout, expect, fixture, html, oneEvent,
} from '@open-wc/testing';
import type SynSelect from './select.js';
import { compareValues } from './utility.js';

describe('<syn-select>', () => {
  describe('#540: should allow to use a custom delimiter for multiple values', () => {
    it('should allow to define the delimiter that is used to separate the values', async () => {
      const getActiveItems = (elm: SynSelect) => Array.from(
        elm.querySelectorAll('syn-option'),
      ).filter(option => option.selected);

      const el = await fixture<SynSelect>(html`
        <syn-select delimiter="|" multiple value="option1|option2">
          <syn-option value="option1">Option 1</syn-option>
          <syn-option value="option2">Option 2</syn-option>
          <syn-option value="option3">Option 3</syn-option>
        </syn-select>
      `);

      expect(el.value).to.deep.equal(['option1', 'option2']);

      const selectedItems = getActiveItems(el);
      expect(selectedItems.length).to.equal(2);

      el.delimiter = ',';
      el.value = 'option2,option3';
      await el.updateComplete;
      expect(el.value).to.deep.equal(['option2', 'option3']);

      el.delimiter = '|';
      el.value = 'option1|option3';
      await el.updateComplete;
      expect(el.value).to.deep.equal(['option1', 'option3']);
    });
  });

  describe('#805: should allow setting numeric values', () => {
    describe('when set initially', () => {
      it('should allow to use numbers as value for syn-select and syn-option', async () => {
        const el = await fixture<SynSelect>(html`
          <syn-select .value="${1}">
            <syn-option .value="${1}">Option 1 (number)</syn-option>
            <syn-option .value="${'2'}">Option 2 (text)</syn-option>
          </syn-select>
        `);

        await el.updateComplete;
        await expect(el.value).to.equal(1);

        el.value = '2';
        await el.updateComplete;
        await expect(el.value).to.equal('2');
      });

      it('should allow to use numbers as value for syn-select and syn-option when using multiple', async () => {
        const el = await fixture<SynSelect>(html`
          <syn-select .value="${[1, '2']}" multiple>
            <syn-option .value="${1}">Option 1 (number)</syn-option>
            <syn-option .value="${'2'}">Option 2 (text)</syn-option>
          </syn-select>
        `);

        await el.updateComplete;
        await expect(el.value).to.eql([1, '2']);

        el.value = ['2'];
        await el.updateComplete;
        await expect(el.value).to.eql(['2']);
      });
    });
  });

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
    }); // #780

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
    }); // #813

    describe('#850: should clamp syn-tag size to the size of the select', () => {
      it('should set the max-width used for tags to the available size of the tag wrapper', async () => {
        const el = await fixture<SynSelect>(html`
          <syn-select multiple style="width: 250px" value="option-1 option-2">
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">This is a very long text that should be truncated</syn-option>
          </syn-select>
        `);

        await el.updateComplete;
        // A longer timeout may be needed for webkit, chrome and ff don´t take only 10ms
        await aTimeout(100);

        const tagWrapper: HTMLDivElement = el.shadowRoot!.querySelector('.select__tags')!;
        const currentWidth = tagWrapper.style.getPropertyValue('--syn-select-tag-max-width');

        expect(currentWidth, 'It should have max tag width of 180 pixels').to.equal('180px');
      });

      it('should use a minimum width of 100 pixels when the syn-select is too small', async () => {
        const el = await fixture<SynSelect>(html`
          <syn-select multiple style="width: 50px" value="option-1 option-2">
            <syn-option value="option-1">Option 1</syn-option>
            <syn-option value="option-2">This is a very long text that should be truncated</syn-option>
          </syn-select>
        `);

        await el.updateComplete;
        // A longer timeout may be needed for webkit, chrome and ff don´t take only 10ms
        await aTimeout(100);

        const tagWrapper: HTMLDivElement = el.shadowRoot!.querySelector('.select__tags')!;
        const currentWidth = tagWrapper.style.getPropertyValue('--syn-select-tag-max-width');

        expect(currentWidth, 'It should have max tag width of 180 pixels').to.equal('100px');
      });
    }); // #850
  }); // regression tests

  describe('utility functions', () => {
    describe('compareValues', () => {
      it('should return true for equal values', () => {
        expect(compareValues('123', '123')).to.be.true;
        expect(compareValues(123, 123)).to.be.true;
        expect(compareValues(['1', '2'], ['1', '2'])).to.be.true;
      });

      it('should return false for different values', () => {
        expect(compareValues('123', '321')).to.be.false;
        expect(compareValues(123, 321)).to.be.false;
      });

      // TODO: do we want to support ordered or unordered arrays?
      it('should return false for arrays with different order', () => {
        expect(compareValues([1, 2], [2, 1])).to.be.false;
      });

      it('should return false for arrays with different length', () => {
        expect(compareValues([1, 2], [1, 2, 3])).to.be.false;
      });

      it('should return false for array and non-array', () => {
        expect(compareValues([1], 1)).to.be.false;
        expect(compareValues(1, [1])).to.be.false;
      });

      // TODO: or should we do a string conversion of numbers in the function?
      it('should return false for different types', () => {
        expect(compareValues(1, '1')).to.be.false;
      });
    });
  });
});
