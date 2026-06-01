import { expect } from '@open-wc/testing';
import {
  hideAxesValues,
  hideXAxisValues,
  hideYAxisValues,
  showGridLines,
  showHorizontalGridLines,
  showVerticalGridLines,
  xAxisWithIconLabels,
  yAxisWithIconLabels,
} from './axes.js';

const SAMPLE_ICON = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9ImN1cnJlbnRDb2xvciI+PC9zdmc+';

describe('yAxisWithIconLabels', () => {
  it('keeps all y-axis entries when yAxis is an array', () => {
    const modifier = yAxisWithIconLabels({
      iconUrls: [SAMPLE_ICON, SAMPLE_ICON],
    });

    const result = modifier({
      series: [{ data: [1, 2], type: 'line' }],
      xAxis: { data: ['A', 'B'], type: 'category' },
      yAxis: [
        { name: 'Left', type: 'value' },
        { name: 'Right', type: 'value' },
      ],
    });

    expect(Array.isArray(result.yAxis)).to.equal(true);
    const yAxes = result.yAxis as Array<Record<string, unknown>>;

    expect(yAxes).to.have.length(2);
    expect(yAxes[0].name).to.equal('Left');
    expect(yAxes[1].name).to.equal('Right');

    const firstAxisLabel = yAxes[0].axisLabel as { formatter?: unknown; rich?: unknown };
    const secondAxisLabel = yAxes[1].axisLabel as { formatter?: unknown; rich?: unknown };

    expect(firstAxisLabel.formatter).to.be.a('function');
    expect(firstAxisLabel.rich).to.be.an('object');
    expect(secondAxisLabel.formatter).to.be.a('function');
    expect(secondAxisLabel.rich).to.be.an('object');
  });

  it('patches only selected y-axis when axisIndex is set', () => {
    const modifier = yAxisWithIconLabels({
      axisIndex: 1,
      iconUrls: [SAMPLE_ICON, SAMPLE_ICON],
    });

    const result = modifier({
      series: [{ data: [1, 2], type: 'line' }],
      xAxis: { data: ['A', 'B'], type: 'category' },
      yAxis: [
        { name: 'Left', type: 'value' },
        { name: 'Right', type: 'value' },
      ],
    });

    const yAxes = result.yAxis as Array<Record<string, unknown>>;

    expect((yAxes[0].axisLabel as { formatter?: unknown } | undefined)?.formatter).to.equal(undefined);
    expect((yAxes[1].axisLabel as { formatter?: unknown } | undefined)?.formatter).to.be.a('function');
  });

  it('patches only selected y-axes when axisIndex is an array', () => {
    const modifier = yAxisWithIconLabels({
      axisIndex: [0, 2],
      iconUrls: [SAMPLE_ICON, SAMPLE_ICON],
    });

    const result = modifier({
      series: [{ data: [1, 2], type: 'line' }],
      xAxis: { data: ['A', 'B'], type: 'category' },
      yAxis: [
        { name: 'Left', type: 'value' },
        { name: 'Middle', type: 'value' },
        { name: 'Right', type: 'value' },
      ],
    });

    const yAxes = result.yAxis as Array<Record<string, unknown>>;

    expect((yAxes[0].axisLabel as { formatter?: unknown } | undefined)?.formatter).to.be.a('function');
    expect((yAxes[1].axisLabel as { formatter?: unknown } | undefined)?.formatter).to.equal(undefined);
    expect((yAxes[2].axisLabel as { formatter?: unknown } | undefined)?.formatter).to.be.a('function');
  });
});

describe('xAxisWithIconLabels', () => {
  it('keeps all x-axis entries when xAxis is an array', () => {
    const modifier = xAxisWithIconLabels({
      iconUrls: [SAMPLE_ICON, SAMPLE_ICON],
    });

    const result = modifier({
      xAxis: [{ name: 'Bottom', type: 'category' }, { name: 'Top', type: 'category' }],
    });

    const xAxes = result.xAxis as Array<Record<string, unknown>>;

    expect(Array.isArray(result.xAxis)).to.equal(true);
    expect(xAxes).to.have.length(2);
    expect((xAxes[0].axisLabel as { formatter?: unknown }).formatter).to.be.a('function');
    expect((xAxes[1].axisLabel as { formatter?: unknown }).formatter).to.be.a('function');
  });

  it('patches only selected x-axis when axisIndex is set', () => {
    const modifier = xAxisWithIconLabels({
      axisIndex: 0,
      iconUrls: [SAMPLE_ICON, SAMPLE_ICON],
    });

    const result = modifier({
      xAxis: [{ name: 'Bottom', type: 'category' }, { name: 'Top', type: 'category' }],
    });

    const xAxes = result.xAxis as Array<Record<string, unknown>>;

    expect((xAxes[0].axisLabel as { formatter?: unknown } | undefined)?.formatter).to.be.a('function');
    expect((xAxes[1].axisLabel as { formatter?: unknown } | undefined)?.formatter).to.equal(undefined);
  });

  it('patches only selected x-axes when axisIndex is an array', () => {
    const modifier = xAxisWithIconLabels({
      axisIndex: [0, 2],
      iconUrls: [SAMPLE_ICON, SAMPLE_ICON],
    });

    const result = modifier({
      xAxis: [
        { name: 'Bottom', type: 'category' },
        { name: 'Middle', type: 'category' },
        { name: 'Top', type: 'category' },
      ],
    });

    const xAxes = result.xAxis as Array<Record<string, unknown>>;

    expect((xAxes[0].axisLabel as { formatter?: unknown } | undefined)?.formatter).to.be.a('function');
    expect((xAxes[1].axisLabel as { formatter?: unknown } | undefined)?.formatter).to.equal(undefined);
    expect((xAxes[2].axisLabel as { formatter?: unknown } | undefined)?.formatter).to.be.a('function');
  });
});

describe('axis modifiers with multiple axes', () => {
  it('showHorizontalGridLines keeps all y-axis entries', () => {
    const result = showHorizontalGridLines()({
      yAxis: [{ name: 'Left', type: 'value' }, { name: 'Right', type: 'value' }],
    });

    const yAxes = result.yAxis as Array<Record<string, unknown>>;

    expect(Array.isArray(result.yAxis)).to.equal(true);
    expect(yAxes).to.have.length(2);
    expect((yAxes[0].splitLine as { show?: boolean }).show).to.equal(true);
    expect((yAxes[1].splitLine as { show?: boolean }).show).to.equal(true);
  });

  it('showHorizontalGridLines patches only selected y-axis when axisIndex is set', () => {
    const result = showHorizontalGridLines({ axisIndex: 1 })({
      yAxis: [{ name: 'Left', type: 'value' }, { name: 'Right', type: 'value' }],
    });

    const yAxes = result.yAxis as Array<Record<string, unknown>>;

    expect((yAxes[0].splitLine as { show?: boolean } | undefined)?.show).to.equal(undefined);
    expect((yAxes[1].splitLine as { show?: boolean } | undefined)?.show).to.equal(true);
  });

  it('showHorizontalGridLines patches only selected y-axes when axisIndex is an array', () => {
    const result = showHorizontalGridLines({ axisIndex: [0, 2] })({
      yAxis: [
        { name: 'Left', type: 'value' },
        { name: 'Middle', type: 'value' },
        { name: 'Right', type: 'value' },
      ],
    });

    const yAxes = result.yAxis as Array<Record<string, unknown>>;

    expect((yAxes[0].splitLine as { show?: boolean } | undefined)?.show).to.equal(true);
    expect((yAxes[1].splitLine as { show?: boolean } | undefined)?.show).to.equal(undefined);
    expect((yAxes[2].splitLine as { show?: boolean } | undefined)?.show).to.equal(true);
  });

  it('showVerticalGridLines keeps all x-axis entries', () => {
    const result = showVerticalGridLines()({
      xAxis: [{ name: 'Bottom', type: 'category' }, { name: 'Top', type: 'category' }],
    });

    const xAxes = result.xAxis as Array<Record<string, unknown>>;

    expect(Array.isArray(result.xAxis)).to.equal(true);
    expect(xAxes).to.have.length(2);
    expect((xAxes[0].splitLine as { show?: boolean }).show).to.equal(true);
    expect((xAxes[1].splitLine as { show?: boolean }).show).to.equal(true);
  });

  it('showVerticalGridLines patches only selected x-axis when axisIndex is set', () => {
    const result = showVerticalGridLines({ axisIndex: 0 })({
      xAxis: [{ name: 'Bottom', type: 'category' }, { name: 'Top', type: 'category' }],
    });

    const xAxes = result.xAxis as Array<Record<string, unknown>>;

    expect((xAxes[0].splitLine as { show?: boolean } | undefined)?.show).to.equal(true);
    expect((xAxes[1].splitLine as { show?: boolean } | undefined)?.show).to.equal(undefined);
  });

  it('hideXAxisValues keeps all x-axis entries', () => {
    const result = hideXAxisValues()({
      xAxis: [{ name: 'Bottom', type: 'category' }, { name: 'Top', type: 'category' }],
    });

    const xAxes = result.xAxis as Array<Record<string, unknown>>;

    expect(Array.isArray(result.xAxis)).to.equal(true);
    expect(xAxes).to.have.length(2);
    expect((xAxes[0].axisLabel as { show?: boolean } | undefined)?.show).to.equal(false);
    expect((xAxes[1].axisLabel as { show?: boolean } | undefined)?.show).to.equal(false);
  });

  it('hideXAxisValues patches only selected x-axis when axisIndex is set', () => {
    const result = hideXAxisValues({ axisIndex: 1 })({
      xAxis: [{ name: 'Bottom', type: 'category' }, { name: 'Top', type: 'category' }],
    });

    const xAxes = result.xAxis as Array<Record<string, unknown>>;

    expect((xAxes[0].axisLabel as { show?: boolean } | undefined)?.show).to.equal(undefined);
    expect((xAxes[1].axisLabel as { show?: boolean } | undefined)?.show).to.equal(false);
  });

  it('hideYAxisValues keeps all y-axis entries', () => {
    const result = hideYAxisValues()({
      yAxis: [{ name: 'Left', type: 'value' }, { name: 'Right', type: 'value' }],
    });

    const yAxes = result.yAxis as Array<Record<string, unknown>>;

    expect(Array.isArray(result.yAxis)).to.equal(true);
    expect(yAxes).to.have.length(2);
    expect((yAxes[0].axisLabel as { show?: boolean } | undefined)?.show).to.equal(false);
    expect((yAxes[1].axisLabel as { show?: boolean } | undefined)?.show).to.equal(false);
  });

  it('hideYAxisValues patches only selected y-axis when axisIndex is set', () => {
    const result = hideYAxisValues({ axisIndex: 0 })({
      yAxis: [{ name: 'Left', type: 'value' }, { name: 'Right', type: 'value' }],
    });

    const yAxes = result.yAxis as Array<Record<string, unknown>>;

    expect((yAxes[0].axisLabel as { show?: boolean } | undefined)?.show).to.equal(false);
    expect((yAxes[1].axisLabel as { show?: boolean } | undefined)?.show).to.equal(undefined);
  });

  it('showGridLines can target one x-axis and one y-axis independently', () => {
    const result = showGridLines({ xAxisIndex: 0, yAxisIndex: 1 })({
      xAxis: [{ name: 'Bottom', type: 'category' }, { name: 'Top', type: 'category' }],
      yAxis: [{ name: 'Left', type: 'value' }, { name: 'Right', type: 'value' }],
    });

    const xAxes = result.xAxis as Array<Record<string, unknown>>;
    const yAxes = result.yAxis as Array<Record<string, unknown>>;

    expect((xAxes[0].axisLine as { show?: boolean } | undefined)?.show).to.equal(true);
    expect((xAxes[1].axisLine as { show?: boolean } | undefined)?.show).to.equal(undefined);
    expect((yAxes[0].axisLine as { show?: boolean } | undefined)?.show).to.equal(undefined);
    expect((yAxes[1].axisLine as { show?: boolean } | undefined)?.show).to.equal(true);
  });

  it('hideAxesValues can target one x-axis and one y-axis independently', () => {
    const result = hideAxesValues({ xAxisIndex: 1, yAxisIndex: 0 })({
      xAxis: [{ name: 'Bottom', type: 'category' }, { name: 'Top', type: 'category' }],
      yAxis: [{ name: 'Left', type: 'value' }, { name: 'Right', type: 'value' }],
    });

    const xAxes = result.xAxis as Array<Record<string, unknown>>;
    const yAxes = result.yAxis as Array<Record<string, unknown>>;

    expect((xAxes[0].axisLabel as { show?: boolean } | undefined)?.show).to.equal(undefined);
    expect((xAxes[1].axisLabel as { show?: boolean } | undefined)?.show).to.equal(false);
    expect((yAxes[0].axisLabel as { show?: boolean } | undefined)?.show).to.equal(false);
    expect((yAxes[1].axisLabel as { show?: boolean } | undefined)?.show).to.equal(undefined);
  });
});
