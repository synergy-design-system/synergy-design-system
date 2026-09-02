import { expect } from '@open-wc/testing';
import { seriesDonut } from './presets.js';
import type { DonutSeriesPresetOptions, ECConfig, SynergyDonutSeriesOption } from '../../types.js';
import { DONUT_SERIES } from '../constants.js';

type DonutSeriesResult = {
  series: SynergyDonutSeriesOption[];
};

type StyledDonutDataItem = {
  itemStyle?: {
    color?: string;
    fill?: string;
  };
  value: number;
};

const toDonutData = (values: number[]) => values.map((value) => ({ value }));

const toStyledDonutData = (items: StyledDonutDataItem[]) => items as DonutSeriesPresetOptions['data'];

const createDonutResult = (
  options: DonutSeriesPresetOptions,
  config: ECConfig = {},
) => seriesDonut(options)(config) as DonutSeriesResult;

describe('seriesDonut', () => {
  it('creates a default synDonut series config', () => {
    const { series } = createDonutResult({ data: toDonutData([10, 20, 30]) });

    expect(series).to.be.an('array').with.lengthOf(1);
    expect(series[0].type).to.equal('synDonut');
    expect(series[0].data).to.deep.equal(toDonutData([10, 20, 30]));
  });

  describe('config merging', () => {
    it('appends synDonut series to existing series', () => {
      const existingConfig: ECConfig = {
        series: [
          { data: [1, 2, 3], name: 'Existing Line', type: 'line' },
        ],
      };

      const result = createDonutResult({ data: toDonutData([10, 20]) }, existingConfig) as {
        series: Array<{ name?: string; type?: string }>;
      };

      expect(result.series).to.be.an('array').with.lengthOf(2);
      expect(result.series[0]).to.include({ name: 'Existing Line', type: 'line' });
      expect(result.series[1].type).to.equal('synDonut');
    });

    it('uses the configured type name constant', () => {
      const { series } = createDonutResult({ data: toDonutData([10, 20]) });
      expect(series[0].type).to.equal(DONUT_SERIES.TYPE_NAME);
    });

    it('forwards per-segment colors in data items to the series config', () => {
      const { series } = createDonutResult({
        data: toStyledDonutData([
          { itemStyle: { fill: '#ff0000' }, value: 10 },
          { itemStyle: { fill: '#00ff00' }, value: 20 },
        ]),
      });
      expect(series[0].data).to.deep.equal([
        { itemStyle: { fill: '#ff0000' }, value: 10 },
        { itemStyle: { fill: '#00ff00' }, value: 20 },
      ]);
    });

    it('does not mutate the incoming config object', () => {
      const existingConfig: ECConfig = {
        series: [{ data: [1], name: 'Existing', type: 'line' }],
      };
      const originalSeries = existingConfig.series as Array<{ data?: unknown[]; name?: string; type?: string }>;

      const result = createDonutResult({ data: toDonutData([10]) }, existingConfig);

      expect(originalSeries).to.have.lengthOf(1);
      expect(result.series).to.have.lengthOf(originalSeries.length + 1);
      expect(result.series[0]).to.include({ name: 'Existing', type: 'line' });
      expect(result.series[1].type).to.equal('synDonut');
    });
  });
});
