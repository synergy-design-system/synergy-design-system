import { expect } from '@open-wc/testing';
import { seriesArea, seriesAreaRange, seriesLine } from './presets.js';
import type { LineSeriesOption } from './types.js';
import type { ECConfig } from '../../../types.js';

describe('seriesLine', () => {
  describe('basic functionality', () => {
    it('should create series with type "line"', () => {
      const options: LineSeriesOption[] = [
        { data: [1, 2, 3], name: 'Series 1' },
      ];
      const modifier = seriesLine(options);
      const config: ECConfig = {};

      const result = modifier(config) as { series: LineSeriesOption[] };

      expect(result.series).to.be.an('array').with.lengthOf(1);
      expect(result.series[0]).to.have.property('type', 'line');
    });

    it('should preserve provided LineSeriesOption properties', () => {
      const options: LineSeriesOption[] = [
        {
          data: [10, 15, 20, 25],
          name: 'Temperature',
          smooth: true,
        },
      ];
      const modifier = seriesLine(options);
      const config: ECConfig = {};

      const result = modifier(config) as { series: LineSeriesOption[] };

      expect(result.series[0]).to.deep.include({
        data: [10, 15, 20, 25],
        name: 'Temperature',
        smooth: true,
        type: 'line',
      });
    });
  });

  describe('array appending', () => {
    it('should append series to existing series array', () => {
      const existingConfig: ECConfig = {
        series: [
          { data: [1, 2, 3], name: 'Existing Series', type: 'line' },
        ],
      };

      const newLineSeries: LineSeriesOption[] = [
        { data: [4, 5, 6], name: 'New Series' },
      ];

      const modifier = seriesLine(newLineSeries);
      const result = modifier(existingConfig) as { series: LineSeriesOption[] };

      expect(result.series).to.be.an('array').with.lengthOf(2);
      expect(result.series[0]).to.include({ name: 'Existing Series' });
      expect(result.series[1]).to.deep.include({
        data: [4, 5, 6],
        name: 'New Series',
        type: 'line',
      });
    });

    it('should append multiple series at once', () => {
      const existingConfig: ECConfig = {
        series: [
          { data: [1], name: 'Series A', type: 'line' },
        ],
      };

      const newOptions: LineSeriesOption[] = [
        { data: [2], name: 'Series B' },
        { data: [3], name: 'Series C' },
      ];

      const modifier = seriesLine(newOptions);
      const result = modifier(existingConfig) as { series: LineSeriesOption[] };

      expect(result.series).to.be.an('array').with.lengthOf(3);
      expect(result.series[0]).to.include({ name: 'Series A' });
      expect(result.series[1]).to.include({ name: 'Series B' });
      expect(result.series[2]).to.include({ name: 'Series C' });
    });
  });
});

describe('seriesArea', () => {
  it('should add line type and default area styling', () => {
    const result = seriesArea([{ data: [1, 2, 3], name: 'Area' }])({}) as {
      series: LineSeriesOption[];
    };

    expect(result.series).to.have.lengthOf(1);
    expect(result.series[0]).to.include({ name: 'Area', type: 'line' });
    expect(result.series[0].areaStyle).to.deep.equal({ opacity: 0.2 });
  });

  it('should preserve provided options and append to existing series', () => {
    const existingConfig: ECConfig = {
      series: [{ data: [1], name: 'Existing', type: 'line' }],
    };
    const result = seriesArea([{
      areaStyle: { opacity: 0.5 },
      data: [2, 3],
      name: 'Area',
      smooth: true,
    }])(existingConfig) as { series: LineSeriesOption[] };

    expect(result.series).to.have.lengthOf(2);
    expect(result.series[0]).to.include({ name: 'Existing' });
    expect(result.series[1]).to.deep.include({
      areaStyle: { opacity: 0.5 },
      data: [2, 3],
      name: 'Area',
      smooth: true,
      type: 'line',
    });
  });
});

describe('seriesAreaRange', () => {
  it('should create stacked boundary series and format the original range in the tooltip', () => {
    const result = seriesAreaRange([[1, 4], [3, 7], [2, 5]])({}) as {
      series: LineSeriesOption[];
    };

    expect(result.series).to.have.lengthOf(2);
    const [lowerSeries, upperSeries] = result.series;
    expect(lowerSeries).to.include({
      name: lowerSeries.stack,
      stackStrategy: 'all',
      type: 'line',
    });
    expect(lowerSeries.stack).to.be.a('string').and.not.be.empty;
    expect(lowerSeries.data).to.deep.equal([1, 3, 2]);
    expect(lowerSeries.tooltip).to.deep.equal({ show: false });
    expect(upperSeries).to.include({
      name: lowerSeries.name,
      stack: lowerSeries.stack,
      stackStrategy: 'all',
      type: 'line',
    });
    expect(upperSeries.data).to.deep.equal([3, 4, 3]);
    expect(upperSeries.areaStyle).to.deep.equal({ opacity: 0.2 });

    const valueFormatter = upperSeries.tooltip?.valueFormatter as (
      value: unknown,
      dataIndex: number,
    ) => string;
    expect(valueFormatter(0, 1)).to.equal('3 - 7');
  });

  it('should apply supplied name, stack, and area styling to both boundaries', () => {
    const result = seriesAreaRange([[2, 6]], {
      areaStyle: { opacity: 0.5 },
      name: 'Confidence interval',
      smooth: true,
      stack: 'confidence',
    })({}) as { series: LineSeriesOption[] };

    expect(result.series).to.have.lengthOf(2);
    result.series.forEach((series) => {
      expect(series).to.include({
        name: 'Confidence interval',
        smooth: true,
        stack: 'confidence',
        stackStrategy: 'all',
        type: 'line',
      });
    });
    expect(result.series[1].areaStyle).to.deep.equal({ opacity: 0.5 });
    expect(result.series[0].data).to.deep.equal([2]);
    expect(result.series[1].data).to.deep.equal([4]);
  });

  it('should append both boundary series to the existing series array', () => {
    const existingConfig: ECConfig = {
      series: [{ data: [10], name: 'Existing', type: 'line' }],
    };

    const result = seriesAreaRange([[1, 5]], { name: 'Range' })(existingConfig) as {
      series: LineSeriesOption[];
    };

    expect(result.series).to.have.lengthOf(3);
    expect(result.series[0]).to.include({ name: 'Existing' });
    expect(result.series[1]).to.include({ name: 'Range' });
    expect(result.series[1].data).to.deep.equal([1]);
    expect(result.series[2]).to.include({ name: 'Range' });
    expect(result.series[2].data).to.deep.equal([4]);
  });
});
