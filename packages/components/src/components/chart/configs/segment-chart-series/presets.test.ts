import { expect } from '@open-wc/testing';
import { seriesSegmentChart } from './presets.js';
import type { ECConfig, SegmentChartSeriesPresetOptions, SynergySegmentChartSeriesOption } from '../../types.js';
import { SEGMENT_CHART_SERIES } from '../constants.js';

type SegmentChartSeriesResult = {
  series: SynergySegmentChartSeriesOption[];
};

const createSegmentChartResult = (
  options: SegmentChartSeriesPresetOptions,
  config: ECConfig = {},
) => seriesSegmentChart(options)(config) as SegmentChartSeriesResult;

describe('seriesSegmentChart', () => {
  it('creates a default synergySegmentChart series config', () => {
    const { series } = createSegmentChartResult({ data: [10, 20, 30] });

    expect(series).to.be.an('array').with.lengthOf(1);
    expect(series[0].type).to.equal('synergySegmentChart');
    expect(series[0].data).to.deep.equal([10, 20, 30]);
  });

  describe('config merging', () => {
    it('appends synergySegmentChart series to existing series', () => {
      const existingConfig: ECConfig = {
        series: [
          { data: [1, 2, 3], name: 'Existing Line', type: 'line' },
        ],
      };

      const result = createSegmentChartResult({ data: [10, 20] }, existingConfig) as {
        series: Array<{ name?: string; type?: string }>;
      };

      expect(result.series).to.be.an('array').with.lengthOf(2);
      expect(result.series[0]).to.include({ name: 'Existing Line', type: 'line' });
      expect(result.series[1].type).to.equal('synergySegmentChart');
    });

    it('uses the configured type name constant', () => {
      const { series } = createSegmentChartResult({ data: [10, 20] });
      expect(series[0].type).to.equal(SEGMENT_CHART_SERIES.TYPE_NAME);
    });

    it('forwards weights and mainLabel options to the series config', () => {
      const { series } = createSegmentChartResult({
        data: [10, 20],
        mainLabel: 'Contamination',
        weights: [1, 3],
      });

      expect(series[0].weights).to.deep.equal([1, 3]);
      expect(series[0].mainLabel).to.equal('Contamination');
    });

    it('does not mutate the incoming config object', () => {
      const existingConfig: ECConfig = {
        series: [{ data: [1], name: 'Existing', type: 'line' }],
      };
      const originalSeries = existingConfig.series as Array<{ data?: unknown[]; name?: string; type?: string }>;

      const result = createSegmentChartResult({ data: [10] }, existingConfig);

      expect(originalSeries).to.have.lengthOf(1);
      expect(result.series).to.have.lengthOf(originalSeries.length + 1);
      expect(result.series[0]).to.include({ name: 'Existing', type: 'line' });
      expect(result.series[1].type).to.equal('synergySegmentChart');
    });
  });
});
