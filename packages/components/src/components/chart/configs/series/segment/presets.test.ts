import { expect } from '@open-wc/testing';
import { seriesSegment } from './presets.js';
import type { ECConfig } from '../../../types.js';
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
  });

  describe('array appending', () => {
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
  });
});
