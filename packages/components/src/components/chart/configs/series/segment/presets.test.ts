import { expect } from '@open-wc/testing';
import { seriesSegment } from './presets.js';
import type { ECConfig } from '../../../types.js';
import { SEGMENT_SERIES } from '../../constants.js';
import type { SegmentSeriesPresetOptions, SynergySegmentSeriesOption } from './types.js';

type SegmentChartSeriesResult = {
  series: SynergySegmentSeriesOption[];
};

const createSegmentChartResult = (
  options: SegmentSeriesPresetOptions,
  config: ECConfig = {},
) => seriesSegment(options)(config) as SegmentChartSeriesResult;

describe('seriesSegment', () => {
  it('creates a default synSegment series config', () => {
    const { series } = createSegmentChartResult({ data: [10, 20, 30] });

    expect(series).to.be.an('array').with.lengthOf(1);
    expect(series[0].type).to.equal('synSegment');
    expect(series[0].data).to.deep.equal([10, 20, 30]);
  });

  describe('config merging', () => {
    it('appends synSegment series to existing series', () => {
      const existingConfig: ECConfig = {
        series: [
          { data: [1, 2, 3], name: 'Existing Line', type: 'line' },
        ],
      };

      const result = createSegmentChartResult({ data: [10, 20] }, existingConfig);

      expect(result.series).to.be.an('array').with.lengthOf(2);
      expect(result.series[0]).to.include({ name: 'Existing Line', type: 'line' });
      expect(result.series[1].type).to.equal('synSegment');
    });

    it('uses the configured type name constant', () => {
      const { series } = createSegmentChartResult({ data: [10, 20] });
      expect(series[0].type).to.equal(SEGMENT_SERIES.TYPE_NAME);
    });

    it('forwards layout insets to the series config', () => {
      const { series } = createSegmentChartResult({
        bottom: '15%',
        data: [10, 20],
        left: 20,
        right: '10%',
        top: 10,
      });

      expect(series[0]).to.include({
        bottom: '15%', left: 20, right: '10%', top: 10,
      });
    });

    it('forwards weighted data and the series name', () => {
      const { series } = createSegmentChartResult({
        data: [{ value: 10, weight: 1 }, { value: 20, weight: 3 }],
        name: 'Contamination',
      });

      expect(series[0].data).to.deep.equal([{ value: 10, weight: 1 }, { value: 20, weight: 3 }]);
      expect(series[0].name).to.equal('Contamination');
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
      expect(result.series[1].type).to.equal('synSegment');
    });
  });
});
