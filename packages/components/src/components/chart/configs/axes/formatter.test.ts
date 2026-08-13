import { expect } from '@open-wc/testing';
import { numberFormatter, numberShorthandFormatter, unitFormatter } from './formatter.js';

describe('chart axis formatters', () => {
  describe('unitFormatter', () => {
    it('appends the unit to the value with a space', () => {
      expect(unitFormatter('kg')('42')).to.equal('42 kg');
    });

    it('works with symbol units', () => {
      expect(unitFormatter('°C')('100')).to.equal('100 °C');
    });

    it('works with an empty unit string', () => {
      expect(unitFormatter('')('5')).to.equal('5 ');
    });
  });

  describe('numberFormatter', () => {
    it('formats numbers using the given locale', () => {
      expect(numberFormatter('en-US')('1234567')).to.equal('1,234,567');
    });

    it('uses runtime locale when no locale is provided', () => {
      expect(numberFormatter()('1234567')).to.equal('1.234.567');
    });
  });

  describe('numberShorthandFormatter', () => {
    const fmt = numberShorthandFormatter('en-US');

    describe('zero and non-numeric', () => {
      it('returns "0" for zero', () => {
        expect(fmt('0')).to.equal('0');
      });

      it('normalizes negative zero to "0"', () => {
        expect(fmt('-0')).to.equal('0');
      });

      it('returns the original string unchanged when the value is not a number', () => {
        expect(fmt('abc')).to.equal('abc');
      });
    });

    describe('values rendered without a SI prefix (range 0.001 – 999)', () => {
      it('renders values in the range 1 – 999 as-is', () => {
        expect(fmt('1')).to.equal('1');
        expect(fmt('999')).to.equal('999');
        expect(fmt('42')).to.equal('42');
      });

      it('renders values in the range 0.001 – 0.999 as-is', () => {
        expect(fmt('0.001')).to.equal('0.001');
        expect(fmt('0.5')).to.equal('0.5');
        expect(fmt('0.999')).to.equal('0.999');
      });

      it('renders negative values in the mirrored range as-is', () => {
        expect(fmt('-42')).to.equal('-42');
        expect(fmt('-0.5')).to.equal('-0.5');
      });
    });

    describe('does prefixes correctly', () => {
      it('shortens values with the kilo (k) prefix', () => {
        expect(fmt('1500')).to.equal('1.5k');
        expect(fmt('-1000')).to.equal('-1k');
      });

      it('shortens values with the mega (M) prefix', () => {
        expect(fmt('1500000')).to.equal('1.5M');
        expect(fmt('-1000000')).to.equal('-1M');
      });

      it('shortens values with the giga (G) prefix', () => {
        expect(fmt('1000000000')).to.equal('1G');
        expect(fmt('-2000000000')).to.equal('-2G');
      });

      it('shortens values with the micro (µ) prefix', () => {
        expect(fmt('0.000001')).to.equal('1µ');
        expect(fmt('-0.000002')).to.equal('-2µ');
      });
    });

    describe('Intl.NumberFormatOptions are forwarded', () => {
      it('respects maximumFractionDigits', () => {
        const fmtOpts = numberShorthandFormatter('en-US', { maximumFractionDigits: 0 });
        expect(fmtOpts('1500')).to.equal('2k');
      });

      it('respects minimumFractionDigits', () => {
        const fmtOpts = numberShorthandFormatter('en-US', { minimumFractionDigits: 2 });
        expect(fmtOpts('1000')).to.equal('1.00k');
      });
    });
  });
});
