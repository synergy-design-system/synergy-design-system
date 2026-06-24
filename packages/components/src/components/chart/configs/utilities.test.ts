import { expect } from '@open-wc/testing';
import { compose, mergeConfigs } from './utilities.js';

describe('mergeConfigs', () => {
  it('deep-merges nested objects with last layer precedence', () => {
    const merged = mergeConfigs(
      {
        xAxis: {
          axisLabel: {
            show: true,
          },
          type: 'category',
        },
      },
      {
        xAxis: {
          axisLabel: {
            rotate: 45,
          },
        },
      },
    );

    expect(merged).to.deep.equal({
      xAxis: {
        axisLabel: {
          rotate: 45,
          show: true,
        },
        type: 'category',
      },
    });
  });

  it('replaces arrays with the latest layer by default', () => {
    const merged = mergeConfigs(
      {
        series: [{ data: [1, 2], type: 'line' }],
      },
      {
        series: [{ data: [3, 4], type: 'line' }],
      },
    );

    expect(merged.series).to.deep.equal([{ data: [3, 4], type: 'line' }]);
  });
});

describe('compose', () => {
  it('returns the input config unchanged when called with no arguments', () => {
    const base = { xAxis: { type: 'category' as const } };
    expect(compose()(base)).to.deep.equal(base);
  });

  it('applies a single modifier', () => {
    const addName = () => ({ xAxis: { name: 'Days' } });
    const result = compose(addName)({ xAxis: { type: 'category' } });
    expect(result).to.deep.equal({ xAxis: { name: 'Days', type: 'category' } });
  });

  it('composes multiple modifiers left-to-right', () => {
    const addName = () => ({ xAxis: { name: 'Days' } });
    const addRotate = () => ({ xAxis: { axisLabel: { rotate: 45 } } });
    const combined = compose(addName, addRotate);

    const result = combined({ xAxis: { type: 'category' } });
    expect(result).to.deep.equal({
      xAxis: { axisLabel: { rotate: 45 }, name: 'Days', type: 'category' },
    });
  });

  it('composes composed modifiers (nested composition)', () => {
    const setX = () => ({ xAxis: { name: 'X' } });
    const setY = () => ({ yAxis: { name: 'Y' } });
    const setZ = () => ({ xAxis: { type: 'category' as const } });

    const inner = compose(setX, setY);
    const outer = compose(inner, setZ);

    const result = outer({});
    expect(result).to.deep.equal({
      xAxis: { name: 'X', type: 'category' },
      yAxis: { name: 'Y' },
    });
  });
});
