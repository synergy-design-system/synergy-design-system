import { expect } from '@open-wc/testing';
import { seriesHistogram } from './presets.js';
import type { BarSeriesOption } from '../bar/types.js';
import type { ECConfig } from '../../../types.js';
import { getRealValueWithoutUnit as styleWithoutUnit } from '../../../themes/utilities.js';

describe('seriesHistogram', () => {
  it('should apply the default bar series options', () => {
    const result = seriesHistogram([{ data: [1, 2], name: 'Series A' }])({}) as {
      series: BarSeriesOption[];
    };

    expect(result.series).to.have.lengthOf(1);
    expect(result.series[0]).to.deep.include({
      barCategoryGap: styleWithoutUnit('SynSpacing4xSmall'),
      barMaxWidth: '100%',
      data: [1, 2],
      name: 'Series A',
      type: 'bar',
    });
  });

  it('should let individual series options override defaults', () => {
    const result = seriesHistogram([{
      barCategoryGap: '20%',
      barMaxWidth: 48,
      data: [3, 4],
    }])({}) as { series: BarSeriesOption[] };

    expect(result.series[0]).to.deep.include({
      barCategoryGap: '20%',
      barMaxWidth: 48,
      data: [3, 4],
      type: 'bar',
    });
  });

  it('should append series and preserve the incoming configuration', () => {
    const config: ECConfig = {
      series: [{ data: [1], name: 'Existing', type: 'line' }],
      title: { text: 'Chart title' },
    };
    const result = seriesHistogram([{ data: [2], name: 'Histogram' }])(config) as
      ECConfig & { series: BarSeriesOption[] };

    expect(result.series).to.have.lengthOf(2);
    expect(result.series[0]).to.deep.equal({ data: [1], name: 'Existing', type: 'line' });
    expect(result.series[1]).to.deep.include({
      data: [2],
      name: 'Histogram',
      type: 'bar',
    });
    expect(result.title).to.deep.equal({ text: 'Chart title' });
    expect(config.series).to.have.lengthOf(1);
  });
});
