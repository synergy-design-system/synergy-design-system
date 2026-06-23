import { expect } from '@open-wc/testing';
import { resolveConfigInput } from './config.js';

describe('resolveConfigInput', () => {
  it('returns config object input unchanged', () => {
    const base = { xAxis: { type: 'category' as const } };
    expect(resolveConfigInput(base)).to.deep.equal(base);
  });

  it('supports callback input without baseConfig', () => {
    const result = resolveConfigInput((handle) => {
      handle.axesShowXSplitLines();
    });

    expect((result.xAxis as { splitLine?: { show?: boolean } }).splitLine?.show).to.equal(true);
    expect(result.yAxis).to.equal(undefined);
  });

  it('uses the latest baseConfig call as the new base', () => {
    const result = resolveConfigInput((handle) => {
      handle.baseConfig({
        series: [{ data: [1, 2, 3], type: 'line' }],
        xAxis: { name: 'Old X Axis', type: 'category' },
      });

      handle.baseConfig({
        yAxis: { name: 'New Y Axis', type: 'value' },
      });

      handle.axesShowYSplitLines();
    });

    expect(result.xAxis).to.equal(undefined);
    expect(result.series).to.equal(undefined);
    expect((result.yAxis as { name?: string; splitLine?: { show?: boolean } }).name).to.equal('New Y Axis');
    expect((result.yAxis as { splitLine?: { show?: boolean } }).splitLine?.show).to.equal(true);
  });

  it('applies handle presets inside callback input', () => {
    const result = resolveConfigInput((handle) => {
      handle.baseConfig({
        xAxis: { type: 'category' },
        yAxis: { type: 'value' },
      });
      handle.axesShowSplitLines();
    });

    expect((result.xAxis as { splitLine?: { show?: boolean } }).splitLine?.show).to.equal(true);
    expect((result.yAxis as { splitLine?: { show?: boolean } }).splitLine?.show).to.equal(true);
  });

  it('supports chaining multiple handle methods', () => {
    const result = resolveConfigInput((handle) => {
      handle.baseConfig({ xAxis: { type: 'category' } });
      handle.axesHideXLabels();
      handle.axesShowXSplitLines();
    });

    const xAxis = result.xAxis as {
      axisLabel?: { show?: boolean };
      splitLine?: { show?: boolean };
    };

    expect(xAxis.axisLabel?.show).to.equal(false);
    expect(xAxis.splitLine?.show).to.equal(true);
  });
});
