import type { SeriesData, SeriesModel } from 'echarts/types/dist/shared.js';
import type { GlobalModel } from '../../types.js';
import { getRealStyleValue as style } from '../../../themes/utilities.js';
import type { LegendEntry, LegendItemStyle, LegendModel } from './types.js';

/** Maps ECharts' hollow symbol names to their filled equivalents. */
const EMPTY_SYMBOLS: Record<string, string> = {
  emptyArrow: 'arrow',
  emptyCircle: 'circle',
  emptyDiamond: 'diamond',
  emptyPin: 'pin',
  emptyRect: 'rect',
  emptyRoundRect: 'roundRect',
  emptyTriangle: 'triangle',
};

/** Returns the filled equivalent for a hollow symbol, if one is defined. */
const getFilledSymbolName = (symbol: unknown): string | undefined => (typeof symbol === 'string' ? EMPTY_SYMBOLS[symbol] : undefined);

const updateLineSymbolStyle = (data: SeriesData, dataIndex: number, symbol: string) => {
  const itemStyle = data.getItemVisual(dataIndex, 'style');

  const resolvedStyle = { ...itemStyle };

  // Only overwrite stroke and lineWidth if they are not already set (from the user)
  if (resolvedStyle.stroke === undefined) {
    resolvedStyle.stroke = resolvedStyle.fill;
  }
  if (resolvedStyle.lineWidth === undefined) {
    resolvedStyle.lineWidth = 2;
  }
  // Set the inner symbol color to --syn-color-neutral-0
  resolvedStyle.fill = style('SynColorNeutral0');

  data.setItemVisual(dataIndex, 'style', resolvedStyle);
  data.setItemVisual(dataIndex, 'symbol', symbol);
};

/** Replaces hollow series and item symbols with filled symbols and neutral interiors. */
const patchLineSymbols = (data: SeriesData, filledSeriesSymbol: string | undefined) => {
  // Determine if the series has item-level options that may override the series-level style.
  const hasItemOptions = data.hasItemOption;
  if (filledSeriesSymbol || hasItemOptions) {
    data.each((dataIndex) => {
      const itemSymbol = data.getItemVisual(dataIndex, 'symbol');
      const filledItemSymbol = getFilledSymbolName(itemSymbol);
      if (!filledItemSymbol) {
        return;
      }
      updateLineSymbolStyle(data, dataIndex, filledItemSymbol);
    });
  }

  if (filledSeriesSymbol) {
    data.setVisual('symbol', filledSeriesSymbol);
  }
};

/** Updates a matching legend entry to represent a hollow symbol consistently. */
const patchLegendEntry = (entry: LegendEntry, seriesSymbol: string | undefined) => {
  // If icon is set, this also needs to be checked for "empty" symbols and adapted
  const icon = entry.get('icon');
  const filledIcon = getFilledSymbolName(icon);
  const usesSeriesSymbol = !icon || icon === 'inherit';

  // if no "empty" icon is set and no empty series symbol was used, skip the entry
  if (!filledIcon && !(usesSeriesSymbol && seriesSymbol)) {
    return;
  }
  // If an explicit icon is set with "empty", use the filled version of the symbol
  if (filledIcon) {
    const { option } = entry;
    option.icon = filledIcon;
  }

  const currentItemStyle = entry.get('itemStyle') as LegendItemStyle;
  const newStyle: LegendItemStyle = {...currentItemStyle};

  // Only overwrite borderColor and borderWidth if they are not already set (from the user)
  if (currentItemStyle?.borderColor === 'inherit') {
    newStyle.borderColor = 'auto';
  }
  if (currentItemStyle.borderWidth === 'auto') {
    newStyle.borderWidth = 2;
  }
  // Set the inner symbol color to --syn-color-neutral-0
  newStyle.color = style('SynColorNeutral0');
  entry.mergeOption({
    itemStyle: newStyle,
  });
};

/**
 * ECharts visual that recreates hollow line symbols with filled symbols and a neutral interior.
 * Existing user-defined symbol and legend styles are preserved where possible.
 */
export const emptySymbolColorVisual = {
  performRawSeries: true,
  reset(seriesModel: SeriesModel, ecModel: GlobalModel) {
    const data = seriesModel.getData();
    const seriesSymbol = data.getVisual('symbol');
    // Get the filled symbol name for the series-level symbol "empty".
    const filledSeriesSymbol = getFilledSymbolName(seriesSymbol);
    patchLineSymbols(data, filledSeriesSymbol);

    const seriesLegendIcon = data.getVisual('legendIcon');
    const filledSeriesLegendIcon = getFilledSymbolName(seriesLegendIcon);
    if (filledSeriesLegendIcon) {
      data.setVisual('legendIcon', filledSeriesLegendIcon);
    }

    const legendModels = ecModel.findComponents({
      mainType: 'legend',
    });
    if (!legendModels || !legendModels.length) {
      return;
    }

    legendModels.forEach((legend) => {
      const legendData = (legend as unknown as LegendModel).getData();
      legendData.forEach((entry) => {
        if (entry.get('name') !== seriesModel.name) {
          return;
        }

        patchLegendEntry(entry, filledSeriesSymbol);
      });
    });
  },
  seriesType: 'line',
};
