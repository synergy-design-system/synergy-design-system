import { expect } from '@open-wc/testing';
import type { SeriesData, SeriesModel } from 'echarts/types/dist/shared.js';
import type { GlobalModel } from '../../types.js';
import { getRealStyleValue, setGlobalThemeStore } from '../../../themes/utilities.js';
import type { LegendEntry, LegendItemStyle, LegendModel } from './types.js';
import { emptySymbolColorVisual } from './utilities.js';

type ItemVisual = {
  symbol: string;
  style: Record<string, unknown>;
};

type SeriesHarness = {
  data: SeriesData;
  itemVisuals: ItemVisual[];
  itemVisualUpdates: Array<{ dataIndex: number; key: string; value: unknown }>;
  seriesVisuals: Record<string, unknown>;
  seriesVisualUpdates: Array<{ key: string; value: unknown }>;
  seriesModel: SeriesModel;
};

function createSeriesHarness(
  options: {
    hasItemOption?: boolean;
    items?: ItemVisual[];
    name?: string;
    seriesVisuals?: Record<string, unknown>;
  } = {},
): SeriesHarness {
  const itemVisuals = options.items ?? [];
  const itemVisualUpdates: SeriesHarness['itemVisualUpdates'] = [];
  const seriesVisuals = options.seriesVisuals ?? {};
  const seriesVisualUpdates: SeriesHarness['seriesVisualUpdates'] = [];

  const data = {
    each: (callback: (dataIndex: number) => void) => itemVisuals.forEach((_, index) => callback(index)),
    getItemVisual: <T extends keyof ItemVisual>(dataIndex: number, key: T) => (itemVisuals[dataIndex][key]),
    getVisual: (key: string) => seriesVisuals[key],
    hasItemOption: options.hasItemOption ?? false,
    setItemVisual: <T extends keyof ItemVisual>(dataIndex: number, key: T, value: ItemVisual[T]) => {
      itemVisualUpdates.push({ dataIndex, key, value });
      itemVisuals[dataIndex][key] = value;
    },
    setVisual: (key: string, value: unknown) => {
      seriesVisualUpdates.push({ key, value });
      seriesVisuals[key] = value;
    },
  } as unknown as SeriesData;

  return {
    data,
    itemVisuals,
    itemVisualUpdates,
    seriesModel: {
      getData: () => data,
      name: options.name ?? 'Revenue',
    } as unknown as SeriesModel,
    seriesVisuals,
    seriesVisualUpdates,
  };
}

function createLegendEntry(options: {
  icon?: string;
  itemStyle?: LegendItemStyle;
  name?: string;
}) {
  const entryOption: LegendEntry['option'] = {
    icon: options.icon,
    itemStyle: options.itemStyle,
  };
  let mergedItemStyle: LegendItemStyle | undefined;
  const entry = {
    get: (path: string) => {
      if (path === 'icon') return options.icon;
      if (path === 'itemStyle') return options.itemStyle;
      return options.name ?? 'Revenue';
    },
    mergeOption: ({ itemStyle }: { itemStyle: LegendItemStyle }) => {
      mergedItemStyle = itemStyle;
    },
    option: entryOption,
  } as LegendEntry;

  return {
    entry,
    get mergedItemStyle() {
      return mergedItemStyle;
    },
  };
}

function createGlobalModel(
  entries: LegendEntry[] = [],
  hasLegend = true,
): GlobalModel {
  const legend: LegendModel = { getData: () => entries };
  return {
    findComponents: () => (hasLegend ? [legend] : []),
  } as unknown as GlobalModel;
}

describe('emptySymbolColorVisual', () => {
  describe('series symbols', () => {
    const symbolMappings = [
      ['emptyArrow', 'arrow'],
      ['emptyCircle', 'circle'],
      ['emptyDiamond', 'diamond'],
      ['emptyPin', 'pin'],
      ['emptyRect', 'rect'],
      ['emptyRoundRect', 'roundRect'],
      ['emptyTriangle', 'triangle'],
    ];

    symbolMappings.forEach(([emptySymbol, filledSymbol]) => {
      it(`converts ${emptySymbol} into ${filledSymbol}`, () => {
        const harness = createSeriesHarness({
          seriesVisuals: { legendIcon: emptySymbol, symbol: emptySymbol },
        });

        emptySymbolColorVisual.reset(harness.seriesModel, createGlobalModel());

        expect(harness.seriesVisuals.symbol).to.equal(filledSymbol);
        expect(harness.seriesVisuals.legendIcon).to.equal(filledSymbol);
      });
    });

    it('fills item symbols and preserves explicitly configured outline styles', () => {
      const harness = createSeriesHarness({
        hasItemOption: true,
        items: [
          {
            style: { fill: '#123456', lineWidth: 4, stroke: '#abcdef' },
            symbol: 'emptyDiamond',
          },
          { style: { fill: '#654321' }, symbol: 'circle' },
        ],
        seriesVisuals: { symbol: 'circle' },
      });

      emptySymbolColorVisual.reset(
        harness.seriesModel,
        createGlobalModel([], false),
      );

      expect(harness.itemVisuals[0]).to.deep.equal({
        style: {
          fill: getRealStyleValue('SynColorNeutral0', 'light'),
          lineWidth: 4,
          stroke: '#abcdef',
        },
        symbol: 'diamond',
      });
      expect(harness.itemVisuals[1]).to.deep.equal({
        style: { fill: '#654321' },
        symbol: 'circle',
      });
      expect(harness.itemVisualUpdates.map(({ key }) => key)).to.deep.equal([
        'style',
        'symbol',
      ]);
      expect(harness.seriesVisualUpdates).to.deep.equal([]);
    });

    it('uses the original fill as stroke and a default line width for hollow items', () => {
      const harness = createSeriesHarness({
        hasItemOption: true,
        items: [{ style: { fill: '#123456' }, symbol: 'emptyRect' }],
        seriesVisuals: { symbol: 'rect' },
      });

      emptySymbolColorVisual.reset(
        harness.seriesModel,
        createGlobalModel([], false),
      );

      expect(harness.itemVisuals[0]).to.deep.equal({
        style: {
          fill: getRealStyleValue('SynColorNeutral0', 'light'),
          lineWidth: 2,
          stroke: '#123456',
        },
        symbol: 'rect',
      });
    });

    it('uses the active theme color for the inner part of hollow symbols', () => {
      const lightHarness = createSeriesHarness({
        hasItemOption: true,
        items: [{ style: { fill: '#123456' }, symbol: 'emptyCircle' }],
        seriesVisuals: { symbol: 'circle' },
      });
      const darkHarness = createSeriesHarness({
        hasItemOption: true,
        items: [{ style: { fill: '#123456' }, symbol: 'emptyCircle' }],
        seriesVisuals: { symbol: 'circle' },
      });

      try {
        setGlobalThemeStore('light');
        emptySymbolColorVisual.reset(lightHarness.seriesModel, createGlobalModel([], false));

        setGlobalThemeStore('dark');
        emptySymbolColorVisual.reset(darkHarness.seriesModel, createGlobalModel([], false));

        const lightFill = lightHarness.itemVisuals[0].style.fill;
        const darkFill = darkHarness.itemVisuals[0].style.fill;
        expect(lightFill).to.equal(getRealStyleValue('SynColorNeutral0', 'light'));
        expect(darkFill).to.equal(getRealStyleValue('SynColorNeutral0', 'dark'));
        expect(darkFill).not.to.equal(lightFill);
      } finally {
        setGlobalThemeStore('light');
      }
    });

    it('does not inspect or update item symbols when there are no item options or hollow series symbol', () => {
      const harness = createSeriesHarness({
        items: [{ style: { fill: '#123456' }, symbol: 'emptyCircle' }],
        seriesVisuals: { symbol: 'circle' },
      });

      emptySymbolColorVisual.reset(
        harness.seriesModel,
        createGlobalModel([], false),
      );

      expect(harness.itemVisualUpdates).to.deep.equal([]);
      expect(harness.seriesVisualUpdates).to.deep.equal([]);
    });
  });

  describe('legend entries', () => {
    it('fills an explicit hollow icon and applies hollow-symbol styling', () => {
      const legendEntry = createLegendEntry({
        icon: 'emptyTriangle',
        itemStyle: {
          borderColor: 'inherit',
          borderWidth: 'auto',
          color: '#123456',
          opacity: 0.8,
        },
      });
      const harness = createSeriesHarness({
        seriesVisuals: { symbol: 'circle' },
      });

      emptySymbolColorVisual.reset(
        harness.seriesModel,
        createGlobalModel([legendEntry.entry]),
      );

      expect(legendEntry.entry.option.icon).to.equal('triangle');
      expect(legendEntry.mergedItemStyle).to.deep.equal({
        borderColor: 'auto',
        borderWidth: 2,
        color: getRealStyleValue('SynColorNeutral0', 'light'),
        opacity: 0.8,
      });
    });

    it('does not change an explicit filled legend icon', () => {
      const legendEntry = createLegendEntry({
        icon: 'circle',
        itemStyle: { color: '#123456' },
      });
      const harness = createSeriesHarness({
        seriesVisuals: { symbol: 'circle' },
      });

      emptySymbolColorVisual.reset(
        harness.seriesModel,
        createGlobalModel([legendEntry.entry]),
      );

      expect(legendEntry.entry.option.icon).to.equal('circle');
      expect(legendEntry.mergedItemStyle).to.be.undefined;
    });

    it('preserves custom legend borders and adapts entries that inherit a hollow series symbol', () => {
      const legendEntry = createLegendEntry({
        icon: 'inherit',
        itemStyle: { borderColor: '#abcdef', borderWidth: 3 },
      });
      const harness = createSeriesHarness({
        seriesVisuals: { symbol: 'emptyCircle' },
      });

      emptySymbolColorVisual.reset(
        harness.seriesModel,
        createGlobalModel([legendEntry.entry]),
      );

      expect(legendEntry.entry.option.icon).to.equal('inherit');
      expect(legendEntry.mergedItemStyle).to.deep.equal({
        borderColor: '#abcdef',
        borderWidth: 3,
        color: getRealStyleValue('SynColorNeutral0', 'light'),
      });
    });

    it('does not change entries with unrelated icons or names', () => {
      const unrelatedIconEntry = createLegendEntry({
        icon: 'circle',
        itemStyle: { color: '#123456' },
      });
      const unrelatedNameEntry = createLegendEntry({
        icon: 'emptyCircle',
        itemStyle: { color: '#654321' },
        name: 'Costs',
      });
      const harness = createSeriesHarness({
        seriesVisuals: { symbol: 'circle' },
      });

      emptySymbolColorVisual.reset(
        harness.seriesModel,
        createGlobalModel([unrelatedIconEntry.entry, unrelatedNameEntry.entry]),
      );

      expect(unrelatedIconEntry.entry.option.icon).to.equal('circle');
      expect(unrelatedIconEntry.mergedItemStyle).to.be.undefined;
      expect(unrelatedNameEntry.entry.option.icon).to.equal('emptyCircle');
      expect(unrelatedNameEntry.mergedItemStyle).to.be.undefined;
    });

    it('returns cleanly when no legend models are present', () => {
      const harness = createSeriesHarness({
        seriesVisuals: { symbol: 'emptyCircle' },
      });

      expect(() => emptySymbolColorVisual.reset(
        harness.seriesModel,
        createGlobalModel([], false),
      )).not.to.throw();
    });
  });
});
