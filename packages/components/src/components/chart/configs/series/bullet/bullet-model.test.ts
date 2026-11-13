import '../../../../../../dist/components/chart/chart.js';
import {
  expect, fixture, html, waitUntil,
} from '@open-wc/testing';
import { TooltipMarkupStyleCreator } from 'echarts/lib/component/tooltip/tooltipMarkup.js';
import type { TooltipOption } from 'echarts/types/dist/shared.js';
import type SynChart from '../../../chart.component.js';
import type { ECConfig } from '../../../types.js';
import type { GlobalModel } from '../../types.js';
import { SynergyBulletSeriesModel } from './bullet-model.js';
import type { SynergyBulletSeriesConfig, SynergyBulletSeriesOption } from './types.js';
import { BULLET_SERIES } from '../../constants.js';

const createChart = async (
  seriesOptions: Partial<SynergyBulletSeriesConfig> = {},
  tooltip: TooltipOption = {},
  horizontal = false,
  categories = ['Category'],
) => {
  const config: ECConfig = {
    series: [{
      data: [{
        current: 65, end: 100, itemStyle: { color: '#123456' }, name: 'Pressure', start: 5,
      }],
      markerStyle: { color: '#654321' },
      type: 'synBullet',
      ...seriesOptions,
    }],
    tooltip: { className: 'tooltip', trigger: 'item', ...tooltip },
    xAxis: horizontal ? { type: 'value' } : { data: categories, type: 'category' },
    yAxis: horizontal ? { data: categories, type: 'category' } : { type: 'value' },
  };
  const chart = await fixture<SynChart>(html`<syn-chart .config=${config}></syn-chart>`);
  await chart.updateComplete;
  const instance = chart.getInstance()!;
  const model = (instance as unknown as { getModel(): GlobalModel }).getModel();
  return { chart, instance, series: model.getSeriesByIndex(0) as SynergyBulletSeriesModel };
};

type AxisTypes = {
  x?: string;
  y?: string;
};

const createModel = (
  option: SynergyBulletSeriesOption,
  axisTypes: AxisTypes = { x: 'category', y: 'value' },
): SynergyBulletSeriesModel => {
  const ecModel = {
    getComponent: (component: string) => {
      const type = component === 'xAxis' ? axisTypes.x : axisTypes.y;
      return type ? { get: () => type } : undefined;
    },
  } as unknown as GlobalModel;
  const model = Object.create(SynergyBulletSeriesModel.prototype) as SynergyBulletSeriesModel;

  Object.assign(model, { ecModel, option });
  return model;
};

describe('synBullet model', () => {
  describe('tooltip', () => {
    it('renders a line marker for the current value and a circle marker for the range in the tooltip', async () => {
      const { chart, instance } = await createChart();
      const tooltip = chart.shadowRoot!.querySelector('.tooltip')!;
      instance.dispatchAction({ dataIndex: 0, seriesIndex: 0, type: 'showTip' });
      const tooltipText = tooltip.textContent;
      expect(tooltipText).to.include('Pressure');
      expect(tooltipText).to.include('65');
      expect(tooltipText).to.include('5 - 100');
      const symbols = tooltip.querySelectorAll<HTMLSpanElement>('span[style*="background-color"]');
      expect(symbols.length).to.equal(2);
      const line = symbols[0];
      const circle = symbols[1];
      expect(line.style.height).to.equal('2px');
      expect(line.style.width).to.equal('10px');
      expect(line.style.backgroundColor).to.equal('rgb(101, 67, 33)'); // #654321
      expect(circle.style.height).to.equal('10px');
      expect(circle.style.borderRadius).to.equal('10px');
      expect(circle.style.backgroundColor).to.equal('rgb(18, 52, 86)'); // #123456
      expect(line.parentElement!.textContent).to.equal('65');
      expect(circle.parentElement!.textContent).to.equal('5 - 100');
    });

    [false, true].forEach((horizontal) => {
      it(`uses the ${horizontal ? 'horizontal' : 'vertical'} category-axis label when the item has no name`, async () => {
        const { chart, instance } = await createChart({
          data: [{ current: 0, end: -10, start: 5 }],
        }, {}, horizontal);
        const tooltip = chart.shadowRoot!.querySelector('.tooltip')!;
        instance.dispatchAction({ dataIndex: 0, seriesIndex: 0, type: 'showTip' });
        const tooltipText = tooltip.textContent;
        expect(tooltipText).to.include('Category');
        expect(tooltipText).to.include('5 - -10');
      });

      it(`shows the ${horizontal ? 'horizontal' : 'vertical'} category heading for axis tooltips`, async () => {
        const { chart, instance } = await createChart({
          data: [{
            current: 65, end: 80, name: 'test', start: 10,
          }],
        }, { trigger: 'axis' }, horizontal, ['Pressure']);
        const tooltip = chart.shadowRoot!.querySelector('.tooltip')!;
        instance.dispatchAction({ dataIndex: 0, seriesIndex: 0, type: 'showTip' });
        await waitUntil(() => tooltip.textContent.includes('65'));
        expect(tooltip.textContent).to.equal('Pressuretest6510 - 80');
      });
    });

    it('shows the item name as a header for item tooltips', async () => {
      const { chart, instance } = await createChart({
        data: [{
          current: 65, end: 80, name: 'test', start: 10,
        }],
        name: 'Actual',
      }, {}, false, ['Pressure']);
      const tooltip = chart.shadowRoot!.querySelector('.tooltip')!;
      instance.dispatchAction({ dataIndex: 0, seriesIndex: 0, type: 'showTip' });
      expect(tooltip.textContent).to.equal('test6510 - 80');
    });

    it('shows the category when the global tooltip trigger is omitted', async () => {
      const config: ECConfig = {
        series: [{
          data: [{
            current: 65, end: 80, name: 'test', start: 10,
          }],
          type: 'synBullet',
        }],
        tooltip: { className: 'tooltip' },
        xAxis: { data: ['Pressure'], type: 'category' },
        yAxis: { type: 'value' },
      };
      const chart = await fixture<SynChart>(html`<syn-chart .config=${config}></syn-chart>`);
      await chart.updateComplete;
      const tooltip = chart.shadowRoot!.querySelector('.tooltip')!;
      chart.getInstance()!.dispatchAction({ dataIndex: 0, seriesIndex: 0, type: 'showTip' });
      await waitUntil(() => tooltip.textContent.includes('65'));
      expect(tooltip.textContent).to.equal('Pressuretest6510 - 80');
    });

    it('shows both bullets in the shared axis tooltip', async () => {
      const { chart, instance } = await createChart({
        data: [{
          current: 65, end: 80, name: 'First item', start: 10,
        }],
        name: 'Actual',
      }, { trigger: 'axis' }, false, ['Pressure']);
      instance.setOption({
        series: [
          {},
          {
            data: [{
              current: 40, end: 60, name: 'Second item', start: 20,
            }],
            name: 'Target',
            type: 'synBullet',
          },
        ],
      });
      const tooltip = chart.shadowRoot!.querySelector('.tooltip')!;
      instance.dispatchAction({ dataIndex: 0, seriesIndex: 0, type: 'showTip' });
      await waitUntil(() => tooltip.textContent.includes('10 - 80'));
      await waitUntil(() => tooltip.textContent.includes('20 - 60'));
      expect(tooltip.textContent).to.equal('PressureFirst item6510 - 80Second item4020 - 60');
    });

    it('respects an explicit series axis trigger', async () => {
      const { chart, instance } = await createChart({
        data: [{
          current: 65, end: 80, name: 'test', start: 10,
        }],
        tooltip: { trigger: 'axis' },
      }, { trigger: 'axis' }, false, ['Pressure']);
      const tooltip = chart.shadowRoot!.querySelector('.tooltip')!;
      instance.dispatchAction({ dataIndex: 0, seriesIndex: 0, type: 'showTip' });
      await waitUntil(() => tooltip.textContent.includes('65'));
      expect(tooltip.textContent).to.equal('Pressuretest6510 - 80');
    });

    it('shows the line series and bullet values under the shared axis heading', async () => {
      const { chart, instance } = await createChart({
        data: [{
          current: 65, end: 80, name: 'Sensor', start: 10,
        }],
      }, { trigger: 'axis' }, false, ['Pressure']);
      instance.setOption({
        series: [
          {},
          { data: [25], name: 'Line', type: 'line' },
        ],
      });
      const tooltip = chart.shadowRoot!.querySelector('.tooltip')!;
      instance.dispatchAction({ dataIndex: 0, seriesIndex: 1, type: 'showTip' });
      await waitUntil(() => tooltip.textContent.includes('10 - 80'));
      expect(tooltip.textContent).to.equal('PressureSensor6510 - 80Line25');
      const markers = tooltip.querySelectorAll<HTMLSpanElement>('span[style*="background-color"]');
      expect(markers.length).to.equal(3);
      expect(markers[0].parentElement!.textContent).to.equal('Sensor65');
      expect(markers[1].parentElement!.textContent).to.equal('10 - 80');
      expect(markers[2].parentElement!.textContent).to.equal('Line25');
    });

    it('does not show a tooltip when the series trigger is none', async () => {
      const { chart, instance } = await createChart({
        tooltip: { trigger: 'none' },
      }, { trigger: 'axis' });
      const tooltip = chart.shadowRoot!.querySelector('.tooltip')!;
      instance.dispatchAction({ dataIndex: 0, seriesIndex: 0, type: 'showTip' });
      expect(tooltip.textContent).to.equal('');
    });

    it('respects the global none trigger', async () => {
      const { chart, instance } = await createChart({}, { trigger: 'none' });
      const tooltip = chart.shadowRoot!.querySelector('.tooltip')!;
      instance.dispatchAction({ dataIndex: 0, seriesIndex: 0, type: 'showTip' });
      expect(tooltip.textContent).to.equal('');
    });

    [
      { dimensions: ['current'], expected: 'Pressure65', markers: 1 },
      { dimensions: ['start'], expected: 'Pressure5 - 100', markers: 1 },
      { dimensions: ['end'], expected: 'Pressure5 - 100', markers: 1 },
      { dimensions: ['category'], expected: 'Pressure', markers: 0 },
      { dimensions: [3, 2], expected: 'Pressure655 - 100', markers: 2 },
      { dimensions: [], expected: 'Pressure', markers: 0 },
    ].forEach(({ dimensions, expected, markers }) => {
      it(`shows only rows selected by tooltip dimensions ${JSON.stringify(dimensions)}`, async () => {
        const { chart, instance } = await createChart({ encode: { tooltip: dimensions } });
        const tooltip = chart.shadowRoot!.querySelector('.tooltip')!;
        instance.dispatchAction({ dataIndex: 0, seriesIndex: 0, type: 'showTip' });
        expect(tooltip.textContent).to.equal(expected);
        expect(tooltip.querySelectorAll('span[style*="background-color"]').length).to.equal(markers);
      });
    });

    (['item', 'axis'] as const).forEach((trigger) => {
      [false, true].forEach((named) => {
        [
          { dimensions: ['start'], rangeName: trigger === 'axis' && named ? 'Sensor' : '' },
          { dimensions: ['end'], rangeName: trigger === 'axis' && named ? 'Sensor' : '' },
          { dimensions: ['start', 'current'], rangeName: '' },
        ].forEach(({ dimensions, rangeName }) => {
          it(`shows the correct range name for ${trigger} trigger, ${named ? 'named' : 'unnamed'} item and ${dimensions.join('+')}`, async () => {
            const { chart, instance } = await createChart({
              data: [{
                current: 65, end: 80, ...(named ? { name: 'Sensor' } : {}), start: 10,
              }],
              encode: { tooltip: dimensions },
            }, { trigger }, false, ['Pressure']);
            const tooltip = chart.shadowRoot!.querySelector('.tooltip')!;
            instance.dispatchAction({ dataIndex: 0, seriesIndex: 0, type: 'showTip' });
            await waitUntil(() => tooltip.textContent.includes('10 - 80'));
            const markers = tooltip.querySelectorAll<HTMLSpanElement>('span[style*="background-color"]');
            expect(markers[markers.length - 1].parentElement!.textContent).to.equal(`${rangeName}10 - 80`);
            expect(tooltip.textContent.startsWith(trigger === 'item' && named ? 'Sensor' : 'Pressure')).to.equal(true);
          });
        });
      });
    });

    it('applies updated tooltip dimensions and value formatting when the global trigger is axis', async () => {
      const { chart, instance } = await createChart({
        encode: { tooltip: 'current' },
      }, { trigger: 'axis', valueFormatter: value => `${String(value)} bar` });
      const tooltip = chart.shadowRoot!.querySelector('.tooltip')!;
      instance.dispatchAction({ dataIndex: 0, seriesIndex: 0, type: 'showTip' });
      await waitUntil(() => tooltip.textContent.includes('65 bar'));
      expect(tooltip.textContent).to.equal('CategoryPressure65 bar');

      instance.setOption({ series: [{ encode: { tooltip: ['start'] } }] });
      instance.dispatchAction({ dataIndex: 0, seriesIndex: 0, type: 'showTip' });
      await waitUntil(() => tooltip.textContent.includes('5 bar - 100 bar'));
      expect(tooltip.textContent).to.equal('CategoryPressure5 bar - 100 bar');
    });

    it('does not duplicate the category in an axis tooltip when the item has no name', async () => {
      const { chart, instance } = await createChart({
        data: [{ current: 65, end: 80, start: 10 }],
      }, { trigger: 'axis' }, false, ['Pressure']);
      const tooltip = chart.shadowRoot!.querySelector('.tooltip')!;
      instance.dispatchAction({ dataIndex: 0, seriesIndex: 0, type: 'showTip' });
      await waitUntil(() => tooltip.textContent.includes('65'));
      expect(tooltip.textContent).to.equal('Pressure6510 - 80');
    });

    it('renders item names and formatted values as text instead of interpreting markup', async () => {
      const { chart, instance } = await createChart({
        data: [{
          current: 5, end: 10, name: '<img src=x />', start: 2,
        }],
      }, { valueFormatter: value => `<b>${String(value)}</b>` });
      const tooltip = chart.shadowRoot!.querySelector('.tooltip')!;
      instance.dispatchAction({ dataIndex: 0, seriesIndex: 0, type: 'showTip' });
      await waitUntil(() => chart.shadowRoot!.querySelector('.chart')!.textContent.includes('<b>5</b>'));
      expect(tooltip.querySelector('img, b')).to.equal(null);
      expect(tooltip.textContent).to.equal('<img src=x /><b>5</b><b>2</b> - <b>10</b>');
    });

    it('uses the series value formatter for the current value and both range endpoints', async () => {
      const { chart, instance } = await createChart({
        tooltip: { valueFormatter: value => `${String(value)} bar` },
      }, { valueFormatter: value => `${String(value)} global` });
      const tooltip = chart.shadowRoot!.querySelector('.tooltip')!;
      instance.dispatchAction({ dataIndex: 0, seriesIndex: 0, type: 'showTip' });
      expect(tooltip.textContent).to.equal('Pressure65 bar5 bar - 100 bar');
    });

    it('uses theme marker colors and refreshes tooltip content after setOption', async () => {
      const { chart, instance } = await createChart({
        data: [{
          current: 20, end: 30, itemStyle: {}, name: 'Original', start: -5,
        }],
        markerStyle: { },
      });
      const tooltip = chart.shadowRoot!.querySelector('.tooltip')!;
      instance.dispatchAction({ dataIndex: 0, seriesIndex: 0, type: 'showTip' });
      const symbolsBefore = tooltip.querySelectorAll<HTMLSpanElement>('span[style*="background-color"]');
      expect(symbolsBefore[0].style.backgroundColor).to.equal('rgb(0, 0, 0)');
      expect(symbolsBefore[1].style.backgroundColor).to.equal('rgb(0, 90, 255)');
      expect(tooltip.textContent).to.equal('Original20-5 - 30');
      instance.setOption({
        series: [{
          data: [{
            current: 25, end: 30, itemStyle: { color: '#abcdef' }, name: 'Updated', start: -5,
          }],
          markerStyle: { color: '#fedcba' },
        }],
      });
      instance.dispatchAction({ dataIndex: 0, seriesIndex: 0, type: 'showTip' });
      const symbols = tooltip.querySelectorAll<HTMLSpanElement>('span[style*="background-color"]');
      expect(symbols[0].style.backgroundColor).to.equal('rgb(254, 220, 186)');
      expect(symbols[1].style.backgroundColor).to.equal('rgb(171, 205, 239)');
      expect(tooltip.textContent).to.equal('Updated25-5 - 30');
    });

    it('registers the line marker dimensions for rich-text tooltip rendering', () => {
      const styleCreator = new TooltipMarkupStyleCreator();
      const marker = styleCreator.makeTooltipMarker(BULLET_SERIES.VALUE_MARKER_TYPE, '#654321', 'richText');
      const markerId = marker.match(/^\{([^|]+)\|/)?.[1];

      expect(markerId).to.be.a('string');
      expect(styleCreator.richTextStyles[markerId!]).to.include({
        backgroundColor: '#654321',
        height: 2,
        width: 10,
      });
    });

    ['global', 'series'].forEach((level) => {
      it(`uses the ${level} custom tooltip formatter`, async () => {
        const formatter = () => `Custom bullet tooltip on ${level}`;
        const { chart, instance } = await createChart(
          level === 'series' ? { tooltip: { formatter } } : {},
          level === 'global' ? { formatter } : {},
        );
        instance.dispatchAction({ dataIndex: 0, seriesIndex: 0, type: 'showTip' });
        const tooltip = chart.shadowRoot!.querySelector('.tooltip')!;
        expect(tooltip.textContent).to.equal(`Custom bullet tooltip on ${level}`);
      });
    });
  });

  describe('legend', () => {
    it('exposes named bullet items and their encoded values to the legend', async () => {
      const { series } = await createChart({
        data: [
          {
            current: 4, end: 6, name: 'Pressure', start: -4,
          },
          {
            current: 5, end: 10, name: 'Flow', start: 2,
          },
        ],
      }, {}, false, ['Pressure', 'Flow']);
      expect(series.type).to.equal('series.synBullet');
      const dataParams = series.getDataParams(0);
      expect(dataParams).to.include({ name: 'Pressure' });
      expect(dataParams.data).to.deep.equal({
        current: 4, end: 6, name: 'Pressure', start: -4, value: [0, -4, 6, 4],
      });
      expect(dataParams.value).to.deep.equal([0, -4, 6, 4]);
      expect(series.legendVisualProvider.getAllNames()).to.deep.equal(['Pressure', 'Flow']);
    });
  });
});

describe('SynergyBulletSeriesModel', () => {
  describe('data dimensions and encoding', () => {
    it('creates range dimensions and indexes category values', () => {
      const model = createModel({
        data: [
          {
            current: 4, end: 6, name: 'Pressure', start: -4,
          },
          {
            current: 5, end: 10, name: 'Flow', start: 2,
          },
        ],
      });
      const data = model.getInitialData(model.option, model.ecModel);

      expect(data.dimensions).to.deep.equal(['category', 'start', 'end', 'current']);
      expect(data.mapDimensionsAll('x')).to.deep.equal(['category']);
      expect(data.mapDimensionsAll('y')).to.deep.equal(['start', 'end', 'current']);
      expect(data.mapDimensionsAll('defaultedTooltip')).to.deep.equal(['start', 'end', 'current']);
      expect(data.getRawDataItem(0)).to.deep.equal({
        current: 4, end: 6, name: 'Pressure', start: -4, value: [0, -4, 6, 4],
      });
      expect(data.get('start', 0)).to.equal(-4);
      expect(data.get('end', 0)).to.equal(6);
      expect(data.get('current', 0)).to.equal(4);
    });

    it('maps ranges to the value axis and preserves reversed boundaries with a vertical category axis', () => {
      const model = createModel({
        data: [{
          current: 0, end: -2, name: 'Pressure', start: 3,
        }],
      }, { x: 'value', y: 'category' });
      const data = model.getInitialData(model.option, model.ecModel);

      expect(data.mapDimensionsAll('x')).to.deep.equal(['start', 'end', 'current']);
      expect(data.mapDimensionsAll('y')).to.deep.equal(['category']);
      expect(data.get('category', 0)).to.equal(0);
      expect(data.get('start', 0)).to.equal(3);
      expect(data.get('end', 0)).to.equal(-2);
    });

    it('preserves explicitly configured category and tooltip encodings', () => {
      const model = createModel({
        data: [{
          current: 8,
          end: 10,
          start: 2,
        }],
        encode: {
          tooltip: 'current',
          x: 'category',
        },
      });
      const data = model.getInitialData(model.option, model.ecModel);

      expect(data.mapDimensionsAll('x')).to.deep.equal(['category']);
      expect(data.mapDimensionsAll('y')).to.deep.equal(['start', 'end', 'current']);
      expect(data.mapDimensionsAll('tooltip')).to.deep.equal(['current']);
    });
  });
});
