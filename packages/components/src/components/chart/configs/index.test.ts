import { expect } from '@open-wc/testing';
import type { XAXisOption, YAXisOption } from 'echarts/types/dist/shared';
import { enhanceConfig } from './index.js';

describe('enhanceConfig with usePreset', () => {
  it('applies an axes preset by name', () => {
    const result = enhanceConfig({
      xAxis: { type: 'category' },
      yAxis: { type: 'value' },
    })
      .usePreset('axes.split-lines')
      .build();

    expect((result.xAxis as XAXisOption).splitLine?.show).to.equal(true);
    expect((result.yAxis as YAXisOption).splitLine?.show).to.equal(true);
  });

  it('chains usePreset and with together', () => {
    const result = enhanceConfig({ xAxis: { type: 'category' } })
      .usePreset('axes.hide-x-labels')
      .with(() => ({ xAxis: { name: 'Days' } }))
      .build();

    const xAxis = result.xAxis as XAXisOption;
    expect(xAxis.axisLabel?.show).to.equal(false);
    expect(xAxis.name).to.equal('Days');
  });

  it('passes typed options to presets', () => {
    const result = enhanceConfig({
      xAxis: [{ name: 'Bottom', type: 'category' }, { name: 'Top', type: 'category' }],
    })
      .usePreset('axes.x-split-lines', { axisIndex: 1 })
      .build();

    const xAxes = result.xAxis as XAXisOption[];
    expect(xAxes[0].splitLine?.show).to.equal(undefined);
    expect(xAxes[1].splitLine?.show).to.equal(true);
  });
});
