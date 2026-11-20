import '../../../../../../dist/components/chart/chart.js';
import { expect, fixture, html } from '@open-wc/testing';
import { type graphic } from 'echarts/core.js';
import type SynChart from '../../../chart.component.js';
import type { ECConfig } from '../../../types.js';
import type { GlobalModel } from '../../../configs/types.js';
import type { SynergyBulletSeriesOption } from './types.js';
import type { SynergyBulletSeriesModel } from './bullet-model.js';
import { getRealStyleValue, getRealValueWithoutUnit, getThemeModeFromBodyClass } from '../../../themes/utilities.js';
import { BULLET_SERIES } from '../../constants.js';

// By design, automatic markers extend beyond the range by SynSpacingXSmall.
const markerOverhang = getRealValueWithoutUnit('SynSpacingXSmall');

type WidthOptions = Pick<SynergyBulletSeriesOption, 'barWidth' | 'barMinWidth' | 'barMaxWidth' | 'barCategoryGap'>;

const widthCases: Array<{ name: string; options: WidthOptions }> = [
  { name: 'theme defaults', options: {} },
  { name: 'zero width', options: { barWidth: 0 } },
  { name: 'zero percentage width', options: { barWidth: '0%' } },
  { name: 'automatic width without a maximum', options: { barMaxWidth: 0 } },
  { name: 'pixel category gap', options: { barCategoryGap: 12, barMaxWidth: 0 } },
  { name: 'percentage category gap', options: { barCategoryGap: '40%', barMaxWidth: 0 } },
  { name: 'gap larger than the band', options: { barCategoryGap: '150%' } },
  { name: 'negative category gap', options: { barCategoryGap: '-50%', barMaxWidth: 0 } },
  { name: 'negative gap below the maximum', options: { barCategoryGap: '-10%', barMaxWidth: '200%' } },
  { name: 'explicit pixel width ignores spacing', options: { barCategoryGap: '99%', barMaxWidth: 0, barWidth: 40 } },
  { name: 'explicit percentage width ignores spacing', options: { barCategoryGap: '99%', barMaxWidth: 0, barWidth: '80%' } },
  { name: 'percentage strings with whitespace', options: { barCategoryGap: ' 20% ', barMaxWidth: ' 75% ', barWidth: ' 50% ' } },
  { name: 'explicit width larger than the band', options: { barMaxWidth: 0, barWidth: '150%' } },
  { name: 'pixel minimum', options: { barMinWidth: 30, barWidth: 10 } },
  { name: 'pixel maximum', options: { barMaxWidth: 8, barWidth: 30 } },
  { name: 'percentage minimum', options: { barMinWidth: '50%', barWidth: 1 } },
  { name: 'percentage maximum', options: { barMaxWidth: '10%', barWidth: '100%' } },
  { name: 'minimum over maximum', options: { barMaxWidth: 8, barMinWidth: 30, barWidth: 20 } },
  { name: 'minimum beyond the band', options: { barCategoryGap: '90%', barMinWidth: '150%' } },
  { name: 'subpixel maximum', options: { barMaxWidth: 0.5, barMinWidth: 0.25 } },
  { name: 'default minimum', options: { barMaxWidth: 0.5, barMinWidth: 0 } },
];

const createChart = async (config: ECConfig): Promise<SynChart> => {
  const chart = await fixture<SynChart>(html`<syn-chart .config=${config}></syn-chart>`);
  await chart.updateComplete;
  return chart;
};

const getSeries = (chart: SynChart) => {
  const instance = chart.getInstance()! as unknown as { getModel: () => GlobalModel };
  return {
    instance: chart.getInstance()!,
    series: instance.getModel().getSeriesByIndex(0) as SynergyBulletSeriesModel,
  };
};

describe('synBullet view', () => {
  describe('marker rendering and layering', () => {
    ['vertical', 'horizontal'].forEach((orientation) => {
      it(`renders a centered circular ${orientation} marker with a corner radius`, async () => {
        const isVertical = orientation === 'vertical';
        const chart = await createChart({
          series: [{
            data: [{ current: 4, end: 6, start: 2 }],
            markerStyle: { borderRadius: 10, height: 20, width: 20 },
            type: 'synBullet',
          }],
          xAxis: isVertical ? { data: ['Pressure'], type: 'category' } : { type: 'value' },
          yAxis: isVertical ? { type: 'value' } : { data: ['Pressure'], type: 'category' },
        });
        const { instance, series } = getSeries(chart);
        const checkMarker = () => {
          const group = series.getData().getItemGraphicEl(0) as InstanceType<typeof graphic.Group>;
          const [, marker] = group.children() as Array<InstanceType<typeof graphic.Rect>>;
          const center = instance.convertToPixel({ seriesIndex: 0 }, isVertical ? [0, 4] : [4, 0]);
          expect(marker.shape).to.include({ height: 20, r: 10, width: 20 });
          expect(marker.shape.x + 10).to.equal(center[0]);
          expect(marker.shape.y + 10).to.equal(center[1]);
        };
        checkMarker();
        instance.dispatchAction({ dataIndex: 0, seriesIndex: 0, type: 'highlight' });
        checkMarker();
        instance.resize({ height: 480, width: 960 });
        checkMarker();
      });

      it(`applies custom ${orientation} marker dimensions and border without moving the value`, async () => {
        const isVertical = orientation === 'vertical';
        const chart = await createChart({
          series: [{
            data: [{ current: 4, end: 6, start: 2 }],
            itemStyle: { opacity: 0.4 },
            markerStyle: {
              borderColor: '#123456', borderType: 'dashed', borderWidth: 2, color: '#ffffff', height: 8, opacity: 0.9, width: 36,
            },
            type: 'synBullet',
          }],
          xAxis: isVertical ? { data: ['Pressure'], type: 'category' } : { type: 'value' },
          yAxis: isVertical ? { type: 'value' } : { data: ['Pressure'], type: 'category' },
        });
        const { instance, series } = getSeries(chart);
        const checkMarker = () => {
          const group = series.getData().getItemGraphicEl(0) as InstanceType<typeof graphic.Group>;
          const [, marker] = group.children() as Array<InstanceType<typeof graphic.Rect>>;
          const center = instance.convertToPixel({ seriesIndex: 0 }, isVertical ? [0, 4] : [4, 0]);
          expect(marker.shape.width).to.equal(36);
          expect(marker.shape.height).to.equal(8);
          expect(marker.shape.r).to.be.undefined;
          expect(marker.shape.x + (marker.shape.width / 2)).to.equal(center[0]);
          expect(marker.shape.y + (marker.shape.height / 2)).to.equal(center[1]);
          expect(marker.style).to.include({
            fill: '#ffffff', lineWidth: 2, opacity: 0.9, stroke: '#123456',
          });
          expect(marker.style.lineDash).to.equal('dashed');
        };
        instance.resize({ height: 360, width: 720 });
        checkMarker();
        instance.dispatchAction({ dataIndex: 0, seriesIndex: 0, type: 'highlight' });
        checkMarker();
        instance.resize({ height: 480, width: 960 });
        checkMarker();
      });

      it(`renders the ${orientation} range without a marker when current is omitted`, async () => {
        const isVertical = orientation === 'vertical';
        const dataItem = { end: 6, start: 2 };
        const chart = await createChart({
          // @ts-expect-error current is omitted intentionally to test behavior
          series: [{
            data: [dataItem],
            type: 'synBullet',
          }],
          xAxis: isVertical ? { data: ['Pressure'], type: 'category' } : { type: 'value' },
          yAxis: isVertical ? { type: 'value' } : { data: ['Pressure'], type: 'category' },
        });
        const { series } = getSeries(chart);
        const group = series.getData().getItemGraphicEl(0) as InstanceType<typeof graphic.Group>;
        const [range] = group.children() as Array<InstanceType<typeof graphic.Rect>>;

        expect(group.children()).to.have.length(1);
        expect(range.z2).to.equal(BULLET_SERIES.RANGE_Z_INDEX);
      });

      it(`keeps the ${orientation} marker above the range during emphasis`, async () => {
        const isVertical = orientation === 'vertical';
        const chart = await createChart({
          series: [{
            data: [{ current: 4, end: 6, start: 2 }],
            type: 'synBullet',
          }],
          xAxis: isVertical ? { data: ['Pressure'], type: 'category' } : { type: 'value' },
          yAxis: isVertical ? { type: 'value' } : { data: ['Pressure'], type: 'category' },
        });
        const { instance, series } = getSeries(chart);
        const group = series.getData().getItemGraphicEl(0) as InstanceType<typeof graphic.Group>;
        const [range, marker] = group.children() as Array<InstanceType<typeof graphic.Rect>>;
        expect(marker.z2).to.be.greaterThan(range.z2);

        let renderedPromise = new Promise<void>((resolve) => {
          instance.on('rendered', () => resolve());
        });

        instance.dispatchAction({ dataIndex: 0, seriesIndex: 0, type: 'highlight' });
        await renderedPromise;
        expect(range.currentStates).to.include('emphasis');
        expect(marker.z2).to.be.greaterThan(range.z2);

        renderedPromise = new Promise<void>((resolve) => {
          instance.on('rendered', () => resolve());
        });

        instance.dispatchAction({ dataIndex: 0, seriesIndex: 0, type: 'downplay' });
        await renderedPromise;

        expect(range.currentStates).not.to.include('emphasis');
        expect(marker.z2).to.be.greaterThan(range.z2);
      });
    });
  });

  describe('range styling and series options', () => {
    it('highlights an item without dimming the other items', async () => {
      const chart = await createChart({
        series: [{
          data: [
            { current: 4, end: 6, start: 2 },
            { current: 5, end: 8, start: 3 },
          ],
          type: 'synBullet',
        }],
        xAxis: { data: ['Pressure', 'Flow'], type: 'category' },
        yAxis: { type: 'value' },
      });
      const { instance, series } = getSeries(chart);
      const highlighted = series.getData().getItemGraphicEl(0) as InstanceType<typeof graphic.Group>;
      const other = series.getData().getItemGraphicEl(1) as InstanceType<typeof graphic.Group>;
      const renderedPromise = new Promise<void>((resolve) => {
        instance.on('rendered', () => resolve());
      });
      instance.dispatchAction({ dataIndex: 0, seriesIndex: 0, type: 'highlight' });
      await renderedPromise;

      expect(highlighted.children()[0].currentStates).to.include('emphasis');
      expect(other.children()[0].currentStates).not.to.include('blur');
    });

    it('uses the Synergy palette when range styles are not configured', async () => {
      const chart = await createChart({
        series: [{
          data: [{ current: 4, end: 6, start: 2 }],
          type: 'synBullet',
        }],
        xAxis: { data: ['Pressure'], type: 'category' },
        yAxis: { type: 'value' },
      });
      const { series } = getSeries(chart);
      const group = series.getData().getItemGraphicEl(0) as InstanceType<typeof graphic.Group>;
      const [range, marker] = group.children() as Array<InstanceType<typeof graphic.Rect>>;

      expect(range.style.fill).to.equal(getRealStyleValue('SynChartCategorical01', getThemeModeFromBodyClass()));
      expect(marker.style.fill).to.equal(getRealStyleValue('SynChartPlotLineColor', getThemeModeFromBodyClass()));
    });

    it('applies data-item styles in preference to series styles', async () => {
      const chart = await createChart({
        series: [{
          data: [
            { current: 4, end: 6, start: 2 },
            {
              current: 5,
              emphasis: { itemStyle: { borderWidth: 5 } },
              end: 8,
              itemStyle: { borderWidth: 3 },
              start: 3,
            },
          ],
          emphasis: { itemStyle: { borderWidth: 4, color: '#ff8800' } },
          itemStyle: {
            borderWidth: 2, color: '#00ff00',
          },
          type: 'synBullet',
        }],
        xAxis: { data: ['Pressure', 'Flow'], type: 'category' },
        yAxis: { type: 'value' },
      });
      const { series } = getSeries(chart);
      const defaultGroup = series.getData().getItemGraphicEl(0) as InstanceType<typeof graphic.Group>;
      const itemGroup = series.getData().getItemGraphicEl(1) as InstanceType<typeof graphic.Group>;
      const [defaultRange] = defaultGroup.children() as Array<InstanceType<typeof graphic.Rect>>;
      const [itemRange] = itemGroup.children() as Array<InstanceType<typeof graphic.Rect>>;

      expect(defaultRange.style).to.include({
        fill: '#00ff00', lineWidth: 2,
      });
      expect(itemRange.style).to.include({
        fill: '#00ff00', lineWidth: 3,
      });
      expect(defaultRange.states.emphasis.style).to.include({ fill: '#ff8800', lineWidth: 4 });
      expect(itemRange.states.emphasis.style).to.include({ fill: '#ff8800', lineWidth: 5 });
    });

    it('applies common series options', async () => {
      const chart = await createChart({
        series: [{
          data: [{ current: 4, end: 6, start: 2 }],
          id: 'pressure-range',
          silent: true,
          type: 'synBullet',
          z: 7,
          zlevel: 2,
        }],
        xAxis: { data: ['Pressure'], type: 'category' },
        yAxis: { type: 'value' },
      });
      const { series } = getSeries(chart);
      const group = series.getData().getItemGraphicEl(0) as InstanceType<typeof graphic.Group>;
      const [range] = group.children() as Array<InstanceType<typeof graphic.Rect>>;

      expect(series.id).to.equal('pressure-range');
      expect(group.parent.silent).to.equal(true);
      expect(range.z).to.equal(7);
      expect(range.zlevel).to.equal(2);
    });

    it('preserves the series-level tooltip formatter', async () => {
      const chart = await createChart({
        series: [{
          data: [{ current: 4, end: 6, start: 2 }],
          tooltip: { formatter: 'Pressure tooltip' },
          type: 'synBullet',
        }],
        tooltip: { trigger: 'item' },
        xAxis: { data: ['Pressure'], type: 'category' },
        yAxis: { type: 'value' },
      });
      const { series } = getSeries(chart);

      expect(series.get('tooltip')?.formatter).to.equal('Pressure tooltip');
    });
  });

  describe('range thickness across orientations', () => {
    ['vertical', 'horizontal'].forEach((orientation) => {
      widthCases.forEach(({ name, options }) => {
        it(`matches ECharts ${orientation} bars for ${name} across resize and data updates`, async () => {
          const isVertical = orientation === 'vertical';
          const bulletChart = await fixture<SynChart>(html`<syn-chart></syn-chart>`);
          const barChart = await fixture<SynChart>(html`<syn-chart></syn-chart>`);
          const createConfig = (count: number, type: 'synBullet' | 'bar'): ECConfig => {
            const categories = Array.from({ length: count }, (_, index) => `Category ${index}`);
            return {
              grid: {
                bottom: 40, left: 40, right: 40, top: 40,
              },
              series: type === 'synBullet'
                ? [{
                  ...options,
                  data: categories.map(() => ({ current: 4, end: 6, start: 2 })),
                  type,
                }]
                : [{
                  ...options,
                  data: categories.map(() => 6),
                  type,
                }],
              xAxis: isVertical ? { data: categories, type: 'category' } : { type: 'value' },
              yAxis: isVertical ? { type: 'value' } : { data: categories, type: 'category' },
            };
          };
          const setData = async (count: number) => {
            bulletChart.config = createConfig(count, 'synBullet');
            barChart.config = createConfig(count, 'bar');
            await Promise.all([bulletChart.updateComplete, barChart.updateComplete]);
          };
          const bulletInstance = bulletChart.getInstance()!;
          const barInstance = barChart.getInstance()!;
          const checkWidth = () => {
            const bulletModel = (bulletInstance as unknown as { getModel: () => GlobalModel }).getModel();
            const barModel = (barInstance as unknown as { getModel: () => GlobalModel }).getModel();
            const bullet = bulletModel.getSeriesByIndex(0);
            const bar = barModel.getSeriesByIndex(0);
            const index = Math.floor(bullet.getData().count() / 2);
            const group = bullet.getData().getItemGraphicEl(index) as InstanceType<typeof graphic.Group>;
            const range = group.childAt(0) as InstanceType<typeof graphic.Rect>;
            const marker = group.childAt(1) as InstanceType<typeof graphic.Rect>;
            const barRange = bar.getData().getItemGraphicEl(index) as InstanceType<typeof graphic.Rect>;
            const dimension = isVertical ? 'width' : 'height';
            expect(range.shape[dimension]).to.closeTo(barRange.shape[dimension], 0.00001);
            expect(marker.shape[dimension]).to.equal(range.shape[dimension] + markerOverhang);
          };
          const resizeBoth = (width: number, height: number) => {
            bulletInstance.resize({ height, width });
            barInstance.resize({ height, width });
          };

          await setData(3);
          resizeBoth(720, 360);
          checkWidth();
          resizeBoth(960, 480);
          checkWidth();
          await setData(80);
          checkWidth();
          resizeBoth(320, 240);
          checkWidth();
        });
      });
    });
  });

  describe('incomplete range data', () => {
    (['start', 'end'] as const).forEach((missingBoundary) => {
      it(`renders only the current marker when ${missingBoundary} is omitted`, async () => {
        const dataItem = {
          current: 4, end: 6, start: 2,
        };
        Reflect.deleteProperty(dataItem, missingBoundary);
        const chart = await createChart({
          series: [{
            data: [dataItem],
            type: 'synBullet',
          }],
          xAxis: { data: ['Pressure'], type: 'category' },
          yAxis: { type: 'value' },
        });
        const { series } = getSeries(chart);
        const group = series.getData().getItemGraphicEl(0) as InstanceType<typeof graphic.Group>;
        const [marker] = group.children() as Array<InstanceType<typeof graphic.Rect>>;

        expect(group.children()).to.have.length(1);
        expect(marker.z2).to.equal(BULLET_SERIES.MARKER_Z_INDEX);
      });
    });
  });
});
