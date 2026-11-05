import { expect } from '@open-wc/testing';
import { seriesBar, seriesBarStacked } from './presets.js';
import type { BarSeriesOption } from './types.js';
import type { ECConfig } from '../../../types.js';

describe('seriesBarStacked', () => {
  it('should apply type:"bar", a border and vertical label defaults', () => {
    const result = seriesBarStacked([{ data: [1, 2], name: 'Series A' }])({}) as {
      series: BarSeriesOption[];
    };

    expect(result.series).to.have.lengthOf(1);
    expect(result.series[0]).to.deep.include({
      data: [1, 2],
      itemStyle: { borderColor: 'transparent', borderWidth: 1 },
      label: { color: 'inherit', position: 'left', show: true },
      name: 'Series A',
      type: 'bar',
    });
  });

  it('should use left labels for explicitly vertical bars', () => {
    const result = seriesBarStacked([{}], { orientation: 'vertical' })({}) as {
      series: BarSeriesOption[];
    };

    expect(result.series[0].label).to.have.property('position', 'left');
  });

  it('should use top labels for horizontal bars without changing axes', () => {
    const config: ECConfig = {
      xAxis: { type: 'value' },
      yAxis: { data: ['Category A'], type: 'category' },
    };
    const result = seriesBarStacked([{}], { orientation: 'horizontal' })(config) as
      ECConfig & { series: BarSeriesOption[] };

    expect(result.series[0].label).to.deep.equal({
      color: 'inherit', position: 'top', show: true,
    });
    expect(result.xAxis).to.deep.equal(config.xAxis);
    expect(result.yAxis).to.deep.equal(config.yAxis);
  });

  it('should generate one shared stack name when none is provided', () => {
    const result = seriesBarStacked([{}, {}])({}) as { series: BarSeriesOption[] };

    expect(result.series[0].stack).to.be.a('string').and.match(/^stack-[a-z0-9]+$/);
    expect(result.series[1].stack).to.equal(result.series[0].stack);
  });

  it('should generate a stack name for an explicitly empty stack name', () => {
    const result = seriesBarStacked([{}], { stackName: '' })({}) as {
      series: BarSeriesOption[];
    };

    expect(result.series[0].stack).to.be.a('string').and.match(/^stack-[a-z0-9]+$/);
  });

  it('should apply a provided stack name to all series', () => {
    const result = seriesBarStacked([{}, {}], { stackName: 'total' })({}) as {
      series: BarSeriesOption[];
    };

    expect(result.series.map((series) => series.stack)).to.deep.equal(['total', 'total']);
  });

  it('should merge individual overrides without affecting other series or inputs', () => {
    const options: BarSeriesOption[] = [
      {
        data: [10, 20],
        itemStyle: { borderWidth: 3, color: 'red' },
        label: { position: 'inside', show: false },
        stack: 'custom',
      },
      { data: [30, 40] },
    ];
    const result = seriesBarStacked(options, { stackName: 'total' })({}) as {
      series: BarSeriesOption[];
    };

    expect(result.series[0]).to.deep.include({
      data: [10, 20],
      itemStyle: { borderColor: 'transparent', borderWidth: 3, color: 'red' },
      label: { color: 'inherit', position: 'inside', show: false },
      stack: 'custom',
      type: 'bar',
    });
    expect(result.series[1]).to.deep.include({
      data: [30, 40],
      itemStyle: { borderColor: 'transparent', borderWidth: 1 },
      label: { color: 'inherit', position: 'left', show: true },
      stack: 'total',
      type: 'bar',
    });
  });

  it('should append multiple series while preserving the existing configuration', () => {
    const config: ECConfig = {
      series: [{ data: [1], name: 'Existing', type: 'line' }],
      title: { text: 'Chart title' },
    };
    const result = seriesBarStacked([
      { data: [2], name: 'Series A' },
      { data: [3], name: 'Series B' },
    ], { stackName: 'total' })(config) as ECConfig & { series: BarSeriesOption[] };

    expect(result.series).to.have.lengthOf(3);
    expect(result.series[0]).to.deep.equal({ data: [1], name: 'Existing', type: 'line' });
    expect(result.series[1]).to.deep.include({
      data: [2], name: 'Series A', stack: 'total', type: 'bar',
    });
    expect(result.series[2]).to.deep.include({
      data: [3], name: 'Series B', stack: 'total', type: 'bar',
    });
    expect(result.title).to.deep.equal({ text: 'Chart title' });
    expect(config).to.deep.equal({
      series: [{ data: [1], name: 'Existing', type: 'line' }],
      title: { text: 'Chart title' },
    });
  });
});

describe('seriesBar', () => {
  describe('basic functionality', () => {
    it('should create series with type "bar"', () => {
      const options: BarSeriesOption[] = [
        { data: [1, 2, 3], name: 'Series 1' },
      ];
      const modifier = seriesBar(options);
      const config: ECConfig = {};

      const result = modifier(config) as { series: BarSeriesOption[] };

      expect(result.series).to.be.an('array').with.lengthOf(1);
      expect(result.series[0]).to.have.property('type', 'bar');
    });

    it('should preserve provided BarSeriesOption properties', () => {
      const options: BarSeriesOption[] = [
        {
          data: [10, 15, 20, 25],
          name: 'Temperature',
          stack: 'total',
        },
      ];
      const modifier = seriesBar(options);
      const config: ECConfig = {};

      const result = modifier(config) as { series: BarSeriesOption[] };

      expect(result.series[0]).to.deep.include({
        data: [10, 15, 20, 25],
        name: 'Temperature',
        stack: 'total',
        type: 'bar',
      });
    });
  });

  describe('array appending', () => {
    it('should append series to existing series array', () => {
      const existingConfig: ECConfig = {
        series: [
          { data: [1, 2, 3], name: 'Existing Series', type: 'bar' },
        ],
      };

      const newBarSeries: BarSeriesOption[] = [
        { data: [4, 5, 6], name: 'New Series' },
      ];

      const modifier = seriesBar(newBarSeries);
      const result = modifier(existingConfig) as { series: BarSeriesOption[] };

      expect(result.series).to.be.an('array').with.lengthOf(2);
      expect(result.series[0]).to.include({ name: 'Existing Series' });
      expect(result.series[1]).to.deep.include({
        data: [4, 5, 6],
        name: 'New Series',
        type: 'bar',
      });
    });

    it('should append multiple series at once', () => {
      const existingConfig: ECConfig = {
        series: [
          { data: [1], name: 'Series A', type: 'bar' },
        ],
      };

      const newOptions: BarSeriesOption[] = [
        { data: [2], name: 'Series B' },
        { data: [3], name: 'Series C' },
      ];

      const modifier = seriesBar(newOptions);
      const result = modifier(existingConfig) as { series: BarSeriesOption[] };

      expect(result.series).to.be.an('array').with.lengthOf(3);
      expect(result.series[0]).to.include({ name: 'Series A' });
      expect(result.series[1]).to.include({ name: 'Series B' });
      expect(result.series[2]).to.include({ name: 'Series C' });
    });
  });
});
