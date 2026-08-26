import { expect } from '@open-wc/testing';
import { seriesLine } from './presets.js';
import type { LineSeriesOption } from './types.js';
import type { ECConfig } from '../../types.js';

describe('seriesLine', () => {
  describe('basic functionality', () => {
    it('should create series with type "line"', () => {
      const options: LineSeriesOption[] = [
        { data: [1, 2, 3], name: 'Series 1' },
      ];
      const modifier = seriesLine(options);
      const config: ECConfig = {};

      const result = modifier(config) as { series: LineSeriesOption[] };

      expect(result.series).to.be.an('array').with.lengthOf(1);
      expect(result.series[0]).to.have.property('type', 'line');
    });

    it('should preserve provided LineSeriesOption properties', () => {
      const options: LineSeriesOption[] = [
        {
          data: [10, 15, 20, 25],
          name: 'Temperature',
          smooth: true,
        },
      ];
      const modifier = seriesLine(options);
      const config: ECConfig = {};

      const result = modifier(config) as { series: LineSeriesOption[] };

      expect(result.series[0]).to.deep.include({
        data: [10, 15, 20, 25],
        name: 'Temperature',
        smooth: true,
        type: 'line',
      });
    });
  });

  describe('array appending', () => {
    it('should append series to existing series array', () => {
      const existingConfig: ECConfig = {
        series: [
          { data: [1, 2, 3], name: 'Existing Series', type: 'line' },
        ],
      };

      const newLineSeries: LineSeriesOption[] = [
        { data: [4, 5, 6], name: 'New Series' },
      ];

      const modifier = seriesLine(newLineSeries);
      const result = modifier(existingConfig) as { series: LineSeriesOption[] };

      expect(result.series).to.be.an('array').with.lengthOf(2);
      expect(result.series[0]).to.include({ name: 'Existing Series' });
      expect(result.series[1]).to.deep.include({
        data: [4, 5, 6],
        name: 'New Series',
        type: 'line',
      });
    });

    it('should append multiple series at once', () => {
      const existingConfig: ECConfig = {
        series: [
          { data: [1], name: 'Series A', type: 'line' },
        ],
      };

      const newOptions: LineSeriesOption[] = [
        { data: [2], name: 'Series B' },
        { data: [3], name: 'Series C' },
      ];

      const modifier = seriesLine(newOptions);
      const result = modifier(existingConfig) as { series: LineSeriesOption[] };

      expect(result.series).to.be.an('array').with.lengthOf(3);
      expect(result.series[0]).to.include({ name: 'Series A' });
      expect(result.series[1]).to.include({ name: 'Series B' });
      expect(result.series[2]).to.include({ name: 'Series C' });
    });
  });
});
