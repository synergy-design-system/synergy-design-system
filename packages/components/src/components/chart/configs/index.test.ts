import { expect } from '@open-wc/testing';
import type { XAXisOption, YAXisOption } from 'echarts/types/dist/shared';
import { createConfig } from './index.js';

describe('createConfig with apply', () => {
  it('applies an axes preset by name', () => {
    const result = createConfig({
      xAxis: { type: 'category' },
      yAxis: { type: 'value' },
    })
      .apply('axes.split-lines')
      .build();

    expect((result.xAxis as XAXisOption).splitLine?.show).to.equal(true);
    expect((result.yAxis as YAXisOption).splitLine?.show).to.equal(true);
  });

  it('passes typed options to presets', () => {
    const result = createConfig({
      xAxis: [{ name: 'Bottom', type: 'category' }, { name: 'Top', type: 'category' }],
    })
      .apply('axes.x-split-lines', { axisIndex: 1 })
      .build();

    const xAxes = result.xAxis as XAXisOption[];
    expect(xAxes[0].splitLine?.show).to.equal(undefined);
    expect(xAxes[1].splitLine?.show).to.equal(true);
  });
});
