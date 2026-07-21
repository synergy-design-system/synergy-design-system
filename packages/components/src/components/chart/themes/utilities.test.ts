import { expect } from '@open-wc/testing';
import {
  getRealStyleValue, getRealValueWithoutUnit, invalidateStyleTokenCache, normalizeArray, setDefaultValueIfNotAvailable, warmupStyleTokenCache,
} from './utilities.js';

describe('chart theme utilities', () => {
  describe('getRealStyleValue', () => {
    const originalGetComputedStyle = globalThis.getComputedStyle;

    afterEach(() => {
      globalThis.getComputedStyle = originalGetComputedStyle;
    });

    it('returns the trimmed computed CSS token value', () => {
      globalThis.getComputedStyle = ((_) => ({
        getPropertyValue: (token: string) => (token === '--syn-test-token' ? '  24px  ' : ''),
      })) as typeof getComputedStyle;

      expect(getRealStyleValue('--syn-test-token')).to.equal('24px');
    });

    it('returns an empty string when the token is not defined', () => {
      globalThis.getComputedStyle = ((_) => ({
        getPropertyValue: (_token: string) => '',
      })) as typeof getComputedStyle;

      expect(getRealStyleValue('--syn-missing-token')).to.equal('');
    });

    it('caches computed values per token', () => {
      let getComputedStyleCallCount = 0;

      globalThis.getComputedStyle = ((_) => {
        getComputedStyleCallCount += 1;

        return {
          getPropertyValue: (token: string) => (token === '--syn-cached-token' ? '  32px  ' : ''),
        };
      }) as typeof getComputedStyle;

      getRealStyleValue('--syn-cached-token');
      getRealStyleValue('--syn-cached-token');

      expect(getComputedStyleCallCount).to.equal(1);
    });
  });

  describe('getRealValueWithoutUnit', () => {
    const originalGetComputedStyle = globalThis.getComputedStyle;

    afterEach(() => {
      globalThis.getComputedStyle = originalGetComputedStyle;
    });

    it('parses numeric values from CSS token strings', () => {
      globalThis.getComputedStyle = ((_) => ({
        getPropertyValue: (_token: string) => '  1.5rem ',
      })) as typeof getComputedStyle;

      expect(getRealValueWithoutUnit('--syn-font-size')).to.equal(1.5);
    });
  });

  describe('normalizeArray', () => {
    it('wraps a single value into an array', () => {
      expect(normalizeArray('value')).to.deep.equal(['value']);
    });

    it('returns arrays unchanged', () => {
      expect(normalizeArray([1, 2, 3])).to.deep.equal([1, 2, 3]);
    });
  });

  describe('setDefaultValueIfNotAvailable', () => {
    it('creates missing nested objects and applies the default value', () => {
      const target: Record<string, unknown> = {};

      setDefaultValueIfNotAvailable(target, 'series.label.color', '#333333');

      expect(target).to.deep.equal({
        series: {
          label: {
            color: '#333333',
          },
        },
      });
    });

    it('does not override existing values at the final key', () => {
      const target: Record<string, unknown> = {
        axis: {
          width: 8,
        },
      };

      setDefaultValueIfNotAvailable(target, 'axis.width', 10);

      expect(target).to.deep.equal({
        axis: {
          width: 8,
        },
      });
    });

    it('supports single-level key paths', () => {
      const target: Record<string, unknown> = {};

      setDefaultValueIfNotAvailable(target, 'visible', true);

      expect(target).to.deep.equal({ visible: true });
    });
  });

  describe('invalidateStyleTokenCache', () => {
    const originalGetComputedStyle = globalThis.getComputedStyle;

    afterEach(() => {
      globalThis.getComputedStyle = originalGetComputedStyle;
      invalidateStyleTokenCache();
    });

    it('forces a re-read from getComputedStyle after invalidation', () => {
      let callCount = 0;

      globalThis.getComputedStyle = ((_) => {
        callCount += 1;
        return { getPropertyValue: (_t: string) => 'red' };
      }) as typeof getComputedStyle;

      getRealStyleValue('--syn-invalidate-token');
      expect(callCount).to.equal(1);

      invalidateStyleTokenCache();

      getRealStyleValue('--syn-invalidate-token');
      expect(callCount).to.equal(2);
    });
  });

  describe('warmupStyleTokenCache', () => {
    const originalGetComputedStyle = globalThis.getComputedStyle;

    afterEach(() => {
      globalThis.getComputedStyle = originalGetComputedStyle;
      invalidateStyleTokenCache();
    });

    it('pre-fills the cache for tokens in includeOnly', () => {
      let computedStyleCallCount = 0;

      globalThis.getComputedStyle = ((_) => {
        computedStyleCallCount += 1;
        return { getPropertyValue: (token: string) => (token === '--syn-warmup-color' ? 'blue' : '') };
      }) as typeof getComputedStyle;

      const count = warmupStyleTokenCache(document.body, { includeOnly: ['--syn-warmup-color'] });
      expect(count).to.equal(1);
      expect(computedStyleCallCount).to.equal(1);

      // subsequent read must be a pure cache hit — no new getComputedStyle call
      computedStyleCallCount = 0;
      expect(getRealStyleValue('--syn-warmup-color')).to.equal('blue');
      expect(computedStyleCallCount).to.equal(0);
    });

    it('pre-fills only tokens matching the given prefix', () => {
      const tokens = ['--syn-color-primary', '--syn-color-secondary', '--other-var'];

      globalThis.getComputedStyle = ((_) => ({
        getPropertyValue: (token: string) => {
          if (token === '--syn-color-primary') return 'red';
          if (token === '--syn-color-secondary') return 'blue';
          return 'green';
        },
        item: (i: number) => tokens[i],
        length: tokens.length,
      })) as typeof getComputedStyle;

      const count = warmupStyleTokenCache(document.body, { prefix: '--syn-' });
      expect(count).to.equal(2);

      // Both --syn- tokens must be cache hits now
      let nextCallCount = 0;
      globalThis.getComputedStyle = ((_) => {
        nextCallCount += 1;
        return { getPropertyValue: (_t: string) => '' };
      }) as typeof getComputedStyle;

      getRealStyleValue('--syn-color-primary');
      getRealStyleValue('--syn-color-secondary');
      expect(nextCallCount).to.equal(0);
    });

    it('returns the number of tokens written to the cache', () => {
      globalThis.getComputedStyle = ((_) => ({
        getPropertyValue: (_t: string) => 'val',
        item: (_i: number) => '',
        length: 0,
      })) as typeof getComputedStyle;

      const count = warmupStyleTokenCache(document.body, { includeOnly: ['--syn-a', '--syn-b', '--syn-c'] });
      expect(count).to.equal(3);
    });
  });
});
