import { expect } from '@open-wc/testing';
import {
  getRealStyleValue,
  getRealValueWithoutUnit,
  normalizeArray,
  setDefaultValueIfNotAvailable,
} from './utilities.js';

describe('chart theme utilities', () => {
  describe('getRealStyleValue', () => {
    it('returns the light token value by default', () => {
      expect(getRealStyleValue('SynAlertErrorColorBorder')).to.equal('#ffe3e4');
    });

    it('returns the dark token value when dark mode is requested', () => {
      expect(getRealStyleValue('SynAlertErrorColorBorder', 'dark')).to.equal('#450709');
    });
  });

  describe('getRealValueWithoutUnit', () => {
    it('parses numeric values from light token strings', () => {
      expect(getRealValueWithoutUnit('SynSpacingLarge')).to.equal(24);
    });

    it('parses numeric values from dark token strings', () => {
      expect(getRealValueWithoutUnit('SynSpacingLarge', 'dark')).to.equal(24);
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
