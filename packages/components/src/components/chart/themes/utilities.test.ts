import { expect } from '@open-wc/testing';
import { ResolvedTokens } from '@synergy-design-system/tokens/resolved';
import {
  getHexWithOpacity,
  getRealStyleValue,
  getRealValueWithoutUnit,
  normalizeArray,
  setDefaultValueIfNotAvailable,
  setGlobalThemeStore,
} from './utilities.js';

describe('chart theme utilities', () => {
  describe('getRealStyleValue', () => {
    afterEach(() => {
      setGlobalThemeStore('light');
    });

    it('returns the light token value by default', () => {
      expect(getRealStyleValue('SynAlertErrorColorBorder')).to.equal(ResolvedTokens.SynAlertErrorColorBorder.light);
    });

    it('returns the dark token value when dark mode is requested', () => {
      expect(getRealStyleValue('SynAlertErrorColorBorder', 'dark')).to.equal(ResolvedTokens.SynAlertErrorColorBorder.dark);
    });

    it('resolves to light when auto mode is used and global store is light', () => {
      setGlobalThemeStore('light');
      expect(getRealStyleValue('SynAlertErrorColorBorder', 'auto')).to.equal(ResolvedTokens.SynAlertErrorColorBorder.light);
    });

    it('resolves to dark when auto mode is used and global store is dark', () => {
      setGlobalThemeStore('dark');
      expect(getRealStyleValue('SynAlertErrorColorBorder', 'auto')).to.equal(ResolvedTokens.SynAlertErrorColorBorder.dark);
    });

    it('uses auto mode by default (falls back to global store)', () => {
      setGlobalThemeStore('dark');
      expect(getRealStyleValue('SynAlertErrorColorBorder')).to.equal(ResolvedTokens.SynAlertErrorColorBorder.dark);
    });
  });

  describe('getRealValueWithoutUnit', () => {
    afterEach(() => {
      setGlobalThemeStore('light');
    });

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

  describe('getHexWithOpacity', () => {
    it('appends 00 alpha for 0 opacity', () => {
      expect(getHexWithOpacity('#112233', 0)).to.equal('#11223300');
    });

    it('appends FF alpha for 1 opacity', () => {
      expect(getHexWithOpacity('#112233', 1)).to.equal('#112233FF');
    });

    it('rounds opacity to the nearest alpha byte and returns uppercase hex', () => {
      expect(getHexWithOpacity('#112233', 0.5)).to.equal('#11223380');
    });

    it('throws when opacity is below 0', () => {
      expect(() => getHexWithOpacity('#112233', -0.01)).to.throw('Opacity must be a number between 0 and 1');
    });

    it('throws when opacity is above 1', () => {
      expect(() => getHexWithOpacity('#112233', 1.01)).to.throw('Opacity must be a number between 0 and 1');
    });

    it('throws when opacity is not finite', () => {
      expect(() => getHexWithOpacity('#112233', Number.NaN)).to.throw('Opacity must be a number between 0 and 1');
    });
  });
});
