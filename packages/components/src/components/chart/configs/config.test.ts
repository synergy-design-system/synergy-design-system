import { expect } from '@open-wc/testing';
import { type ConfigModifier, compose, enhanceConfig } from './config.js';
import { mergeConfigs } from './config.js';

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

describe('enhanceConfig', () => {
  it('returns the base config unchanged when no modifiers are applied', () => {
    const base = { xAxis: { type: 'category' as const } };
    expect(enhanceConfig(base).build()).to.deep.equal(base);
  });

  it('applies a single ConfigModifier via .with()', () => {
    const addName: ConfigModifier = () => ({ xAxis: { name: 'Days' } });
    const result = enhanceConfig({ xAxis: { type: 'category' } }).with(addName).build();
    expect(result).to.deep.equal({ xAxis: { name: 'Days', type: 'category' } });
  });

  it('applies multiple modifiers left-to-right via chained .with()', () => {
    const addName: ConfigModifier = () => ({ xAxis: { name: 'Days' } });
    const addRotate: ConfigModifier = () => ({ xAxis: { axisLabel: { rotate: 45 } } });

    const result = enhanceConfig({ xAxis: { type: 'category' } })
      .with(addName)
      .with(addRotate)
      .build();

    expect(result).to.deep.equal({
      xAxis: { axisLabel: { rotate: 45 }, name: 'Days', type: 'category' },
    });
  });

  it('later modifiers override earlier ones for the same key', () => {
    const setNameA: ConfigModifier = () => ({ xAxis: { name: 'First' } });
    const setNameB: ConfigModifier = () => ({ xAxis: { name: 'Second' } });

    const result = enhanceConfig({}).with(setNameA).with(setNameB).build();
    expect((result.xAxis as { name: string }).name).to.equal('Second');
  });

  it('passes the accumulated config into each subsequent modifier', () => {
    const visited: string[] = [];

    const modifierA: ConfigModifier = () => {
      visited.push('A');
      return { xAxis: { name: 'A' } };
    };
    const modifierB: ConfigModifier = (config) => {
      visited.push('B');
      // B can read what A wrote
      expect((config.xAxis as { name: string }).name).to.equal('A');
      return { yAxis: { name: 'B' } };
    };

    enhanceConfig({}).with(modifierA).with(modifierB).build();
    expect(visited).to.deep.equal(['A', 'B']);
  });
});

describe('compose', () => {
  it('returns the input config unchanged when called with no arguments', () => {
    const base = { xAxis: { type: 'category' as const } };
    expect(compose()(base)).to.deep.equal(base);
  });

  it('applies a single modifier', () => {
    const addName: ConfigModifier = () => ({ xAxis: { name: 'Days' } });
    const result = compose(addName)({ xAxis: { type: 'category' } });
    expect(result).to.deep.equal({ xAxis: { name: 'Days', type: 'category' } });
  });

  it('composes multiple modifiers left-to-right', () => {
    const addName: ConfigModifier = () => ({ xAxis: { name: 'Days' } });
    const addRotate: ConfigModifier = () => ({ xAxis: { axisLabel: { rotate: 45 } } });
    const combined = compose(addName, addRotate);

    const result = combined({ xAxis: { type: 'category' } });
    expect(result).to.deep.equal({
      xAxis: { axisLabel: { rotate: 45 }, name: 'Days', type: 'category' },
    });
  });

  it('can be nested inside enhanceConfig .with()', () => {
    const addName: ConfigModifier = () => ({ xAxis: { name: 'Days' } });
    const addType: ConfigModifier = () => ({ xAxis: { type: 'category' } });
    const combined = compose(addName, addType);

    const result = enhanceConfig({}).with(combined).build();
    expect(result).to.deep.equal({ xAxis: { name: 'Days', type: 'category' } });
  });

  it('composes composed modifiers (nested composition)', () => {
    const setX: ConfigModifier = () => ({ xAxis: { name: 'X' } });
    const setY: ConfigModifier = () => ({ yAxis: { name: 'Y' } });
    const setZ: ConfigModifier = () => ({ xAxis: { type: 'category' } });

    const inner = compose(setX, setY);
    const outer = compose(inner, setZ);

    const result = outer({});
    expect(result).to.deep.equal({
      xAxis: { name: 'X', type: 'category' },
      yAxis: { name: 'Y' },
    });
  });
});
