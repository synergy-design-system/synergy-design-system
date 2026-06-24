import { expect } from '@open-wc/testing';
import {
  getRealStyleValue, getRealValueWithoutUnit, normalizeArray, setDefaultValueIfNotAvailable,
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
});
