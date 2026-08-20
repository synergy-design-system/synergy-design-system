import { expect } from '@open-wc/testing';
import type { GraphicComponentTextOption } from 'echarts/types/src/component/graphic/GraphicModel.js';
import type { MediaUnit } from 'echarts/types/src/util/types.js';
import type { PieDataItemOption } from 'echarts/types/src/chart/pie/PieSeries.js';
import { seriesGauge } from './presets.js';
import type { ECConfig, PieSeriesOption } from '../../types.js';
import { GAUGE_SERIES } from '../constants.js';
import type { GaugeSeriesPresetOptions } from './types.js';

type PieSeries = Omit<PieSeriesOption, 'data'> & { data: PieDataItemOption[] };
type GaugeSeriesResult = {
  series: PieSeries[],
  graphic: GraphicComponentTextOption[],
  media: MediaUnit[]
};

const createGaugeResult = (
  options: GaugeSeriesPresetOptions = {},
  config: ECConfig = {},
) => seriesGauge(options)(config) as GaugeSeriesResult;

describe('seriesGauge', () => {
  it('creates a default pie-based gauge config', () => {
    const { graphic, media, series } = createGaugeResult();

    expect(series).to.be.an('array').with.lengthOf(1);
    expect(series[0].type).to.equal('pie');
    expect(series[0].data?.map((item) => item.value)).to.deep.equal([50, 50]);

    expect(graphic).to.be.an('array').with.lengthOf(3);
    expect(graphic.map((element) => element.style?.text)).to.include.members(['50', '0', '100']);

    expect(media).to.be.an('array').with.lengthOf(GAUGE_SERIES.BREAKPOINTS.length);
  });

  describe('config merging', () => {
    it('appends pie gauge series to existing series', () => {
      const existingConfig: ECConfig = {
        series: [
          { data: [1, 2, 3], name: 'Existing Line', type: 'line' },
        ],
      };

      const result = createGaugeResult({ showSections: true }, existingConfig) as {
        series: Array<{ name?: string; type?: string }>;
      };

      expect(result.series).to.be.an('array').with.lengthOf(3);
      expect(result.series[0]).to.include({ name: 'Existing Line', type: 'line' });
      expect(result.series[1].type).to.equal('pie');
      expect(result.series[2].type).to.equal('pie');
    });

    it('appends gauge graphics to existing graphic entries', () => {
      const existingGraphic = {
        left: 'left',
        style: { text: 'existing label' },
        type: 'text',
      } as GraphicComponentTextOption;
      const result = createGaugeResult({}, { graphic: [existingGraphic] });

      expect(result.graphic).to.have.lengthOf(4);
      expect(result.graphic[0]).to.equal(existingGraphic);
      expect(result.graphic.slice(1).map((element) => element.style?.text)).to.include.members(['50', '0', '100']);
    });

    it('appends gauge media queries to existing media entries', () => {
      const existingConfig: ECConfig = {
        media: [{ option: { title: { show: true } }, query: { minWidth: 500 } }],
      };

      const result = createGaugeResult({}, existingConfig);

      expect(result.media).to.be.an('array');
      expect(result.media).to.have.lengthOf(GAUGE_SERIES.BREAKPOINTS.length + 1);
      expect(result.media[0]).to.deep.equal(existingConfig.media?.[0]);
    });

    it('does not mutate the incoming config object', () => {
      const existingConfig: ECConfig = {
        graphic: [{ left: 'left', style: { text: 'existing graphic' }, type: 'text' }],
        media: [{ option: { title: { text: 'existing media' } }, query: { minWidth: 200 } }],
        series: [{ data: [1], name: 'Existing', type: 'line' }],
      };
      const originalSeries = existingConfig.series as Array<{ data?: unknown[]; name?: string; type?: string }>;
      const originalGraphic = existingConfig.graphic as Array<{ left?: string; style?: { text?: string }; type?: string }>;
      const originalMediaLength = existingConfig.media?.length;

      const result = createGaugeResult({ showSections: true }, existingConfig);

      expect(originalSeries).to.have.lengthOf(1);
      expect(originalGraphic).to.have.lengthOf(1);
      expect(existingConfig.media).to.have.lengthOf(originalMediaLength ?? 0);
      expect(result.series).to.have.lengthOf(originalSeries.length + 2);
      expect(result.graphic).to.have.lengthOf(originalGraphic.length + 3);
      expect(result.media).to.have.lengthOf((originalMediaLength ?? 0) + GAUGE_SERIES.BREAKPOINTS.length);
    });
  });
});
