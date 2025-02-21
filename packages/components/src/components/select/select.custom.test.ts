import '../../../dist/synergy.js';
import { expect, fixture } from '@open-wc/testing';
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
  });
});
