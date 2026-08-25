import { expect } from '@open-wc/testing';
import { seriesGauge } from './presets.js';
import type { ECConfig, GaugeSeriesPresetOptions, SynergyGaugeSeriesOption } from '../../types.js';
import { GAUGE_SERIES } from '../constants.js';

type GaugeSeriesResult = {
  series: SynergyGaugeSeriesOption[];
};

const createGaugeResult = (
  options: GaugeSeriesPresetOptions,
  config: ECConfig = {},
) => seriesGauge(options)(config) as GaugeSeriesResult;

describe('seriesGauge', () => {
  it('creates a default synergyGauge series config', () => {
    const { series } = createGaugeResult({ value: 50 });

    expect(series).to.be.an('array').with.lengthOf(1);
    expect(series[0].type).to.equal('synergyGauge');
    expect(series[0].data).to.deep.equal([50]);
  });

  describe('config merging', () => {
    it('appends synergyGauge series to existing series', () => {
      const existingConfig: ECConfig = {
        series: [
          { data: [1, 2, 3], name: 'Existing Line', type: 'line' },
        ],
      };

      const result = createGaugeResult({ value: 50 }, existingConfig) as {
        series: Array<{ name?: string; type?: string }>;
      };

      expect(result.series).to.be.an('array').with.lengthOf(2);
      expect(result.series[0]).to.include({ name: 'Existing Line', type: 'line' });
      expect(result.series[1].type).to.equal('synergyGauge');
    });

    it('uses the configured type name constant', () => {
      const { series } = createGaugeResult({ value: 50 });
      expect(series[0].type).to.equal(GAUGE_SERIES.TYPE_NAME);
    });

    it('does not mutate the incoming config object', () => {
      const existingConfig: ECConfig = {
        series: [{ data: [1], name: 'Existing', type: 'line' }],
      };
      const originalSeries = existingConfig.series as Array<{ data?: unknown[]; name?: string; type?: string }>;

      const result = createGaugeResult({ value: 50 }, existingConfig);

      expect(originalSeries).to.have.lengthOf(1);
      expect(result.series).to.have.lengthOf(originalSeries.length + 1);
      expect(result.series[0]).to.include({ name: 'Existing', type: 'line' });
      expect(result.series[1].type).to.equal('synergyGauge');
    });
  });
});
