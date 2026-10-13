import { expect } from '@open-wc/testing';
import { seriesBar } from './presets.js';
import type { BarSeriesOption } from './types.js';
import type { ECConfig } from '../../../types.js';

describe('seriesBar', () => {
  describe('basic functionality', () => {
    it('should create series with type "bar"', () => {
      const options: BarSeriesOption[] = [
        { data: [1, 2, 3], name: 'Series 1' },
      ];
      const modifier = seriesBar(options);
      const config: ECConfig = {};

      const result = modifier(config) as { series: BarSeriesOption[] };

      expect(result.series).to.be.an('array').with.lengthOf(1);
      expect(result.series[0]).to.have.property('type', 'bar');
    });

    it('should preserve provided BarSeriesOption properties', () => {
      const options: BarSeriesOption[] = [
        {
          data: [10, 15, 20, 25],
          name: 'Temperature',
          stack: 'total',
        },
      ];
      const modifier = seriesBar(options);
      const config: ECConfig = {};

      const result = modifier(config) as { series: BarSeriesOption[] };

      expect(result.series[0]).to.deep.include({
        data: [10, 15, 20, 25],
        name: 'Temperature',
        stack: 'total',
        type: 'bar',
      });
    });
  });

  describe('array appending', () => {
    it('should append series to existing series array', () => {
      const existingConfig: ECConfig = {
        series: [
          { data: [1, 2, 3], name: 'Existing Series', type: 'bar' },
        ],
      };

      const newBarSeries: BarSeriesOption[] = [
        { data: [4, 5, 6], name: 'New Series' },
      ];

      const modifier = seriesBar(newBarSeries);
      const result = modifier(existingConfig) as { series: BarSeriesOption[] };

      expect(result.series).to.be.an('array').with.lengthOf(2);
      expect(result.series[0]).to.include({ name: 'Existing Series' });
      expect(result.series[1]).to.deep.include({
        data: [4, 5, 6],
        name: 'New Series',
        type: 'bar',
      });
    });

    it('should append multiple series at once', () => {
      const existingConfig: ECConfig = {
        series: [
          { data: [1], name: 'Series A', type: 'bar' },
        ],
      };

      const newOptions: BarSeriesOption[] = [
        { data: [2], name: 'Series B' },
        { data: [3], name: 'Series C' },
      ];

      const modifier = seriesBar(newOptions);
      const result = modifier(existingConfig) as { series: BarSeriesOption[] };

      expect(result.series).to.be.an('array').with.lengthOf(3);
      expect(result.series[0]).to.include({ name: 'Series A' });
      expect(result.series[1]).to.include({ name: 'Series B' });
      expect(result.series[2]).to.include({ name: 'Series C' });
    });
  });
});
