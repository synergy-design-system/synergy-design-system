import { expect } from '@open-wc/testing';
import {
  colorSvgDataUrl, compose, getAsArray, mergeConfigs, mergeDeep,
} from './utilities.js';

const svgWithCurrentColor = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg==';
const svgWithFillAttr = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiMwMDAwMDAiLz48L3N2Zz4=';

function decodeBase64DataUrl(dataUrl: string): string {
  const [, base64 = ''] = dataUrl.split(',');
  return atob(base64);
}

describe('mergeDeep', () => {
  it('deep-merges nested objects into a new object', () => {
    const target = {
      xAxis: {
        axisLabel: {
          show: true,
        },
        type: 'category',
      },
    };

    const source = {
      xAxis: {
        axisLabel: {
          rotate: 45,
        },
      },
    };

    const merged = mergeDeep(target, source);

    expect(merged).to.deep.equal({
      xAxis: {
        axisLabel: {
          rotate: 45,
          show: true,
        },
        type: 'category',
      },
    });

    expect(merged).to.not.equal(target);
    expect(merged).to.not.equal(source);
    expect(target).to.deep.equal({
      xAxis: {
        axisLabel: {
          show: true,
        },
        type: 'category',
      },
    });
    expect(source).to.deep.equal({
      xAxis: {
        axisLabel: {
          rotate: 45,
        },
      },
    });
  });

  it('merges arrays by index with source precedence', () => {
    const merged = mergeDeep(
      [{ data: [1, 2], id: 'a', type: 'line' }],
      [{ data: [3, 4], name: 'Latest', type: 'line' }],
    );

    expect(merged).to.deep.equal([
      {
        data: [3, 4], id: 'a', name: 'Latest', type: 'line',
      },
    ]);
  });

  it('merges object and array conflicts into the first array index', () => {
    const objectIntoArray = mergeDeep(
      {
        axisLabel: { show: true },
        type: 'category',
      },
      [{ axisLabel: { rotate: 45 } }],
    );

    const arrayIntoObject = mergeDeep(
      [{ axisLabel: { show: true }, name: 'Base Axis' }],
      {
        axisLabel: { rotate: 30 },
        type: 'value',
      },
    );

    expect(objectIntoArray).to.deep.equal([
      {
        axisLabel: { rotate: 45, show: true },
        type: 'category',
      },
    ]);

    expect(arrayIntoObject).to.deep.equal([
      {
        axisLabel: { rotate: 30, show: true },
        name: 'Base Axis',
        type: 'value',
      },
    ]);
  });

  it('returns the source when called with an undefined target at runtime', () => {
    const source = {
      xAxis: {
        type: 'category',
      },
    };

    const merged = mergeDeep(undefined as unknown as object, source);

    expect(merged).to.deep.equal(source);
  });

  it('returns the target when called with an undefined source at runtime', () => {
    const target = {
      xAxis: {
        type: 'category',
      },
    };

    const merged = mergeDeep(target, undefined as unknown as object);

    expect(merged).to.deep.equal(target);
  });

  it('allows undefined source values to overwrite existing nested values', () => {
    const merged = mergeDeep(
      {
        xAxis: {
          axisLabel: {
            rotate: 45,
            show: true,
          },
          name: 'Days',
        },
      },
      {
        xAxis: {
          axisLabel: {
            rotate: undefined,
          },
          name: undefined,
        },
      },
    );

    expect(merged).to.deep.equal({
      xAxis: {
        axisLabel: {
          rotate: undefined,
          show: true,
        },
        name: undefined,
      },
    });
  });
});

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

  it('merges arrays by index with source precedence', () => {
    const merged = mergeConfigs(
      {
        series: [{ data: [1, 2], id: 'a', type: 'line' }],
      },
      {
        series: [{ data: [3, 4], name: 'Latest', type: 'line' }],
      },
    );

    expect(merged.series).to.deep.equal([
      {
        data: [3, 4], id: 'a', name: 'Latest', type: 'line',
      },
    ]);
  });

  it('keeps non-overlapping array entries from both layers', () => {
    const merged = mergeConfigs(
      {
        series: [
          { id: 'base-0', type: 'line' },
          { id: 'base-1', type: 'bar' },
        ],
      },
      {
        series: [
          { data: [1, 2, 3], id: 'base-0' },
          { id: 'latest-1', stack: 'total' },
          { id: 'latest-2', type: 'scatter' },
        ],
      },
    );

    expect(merged.series).to.deep.equal([
      { data: [1, 2, 3], id: 'base-0', type: 'line' },
      { id: 'latest-1', stack: 'total', type: 'bar' },
      { id: 'latest-2', type: 'scatter' },
    ]);
  });

  it('merges object and array conflicts into the first array index', () => {
    const objectIntoArray = mergeConfigs(
      {
        xAxis: {
          axisLabel: { show: true },
          type: 'category',
        },
      },
      {
        xAxis: [{ axisLabel: { rotate: 45 } }],
      },
    );

    const arrayIntoObject = mergeConfigs(
      {
        xAxis: [{ axisLabel: { show: true }, name: 'Base Axis' }],
      },
      {
        xAxis: {
          axisLabel: { rotate: 30 },
          type: 'value',
        },
      },
    );

    expect(objectIntoArray.xAxis).to.deep.equal([
      {
        axisLabel: { rotate: 45, show: true },
        type: 'category',
      },
    ]);

    expect(arrayIntoObject.xAxis).to.deep.equal([
      {
        axisLabel: { rotate: 30, show: true },
        name: 'Base Axis',
        type: 'value',
      },
    ]);
  });
});

describe('colorSvgDataUrl', () => {
  it('replaces currentColor inside a valid SVG data URL', () => {
    const result = colorSvgDataUrl(svgWithCurrentColor, '#ff0000');

    expect(decodeBase64DataUrl(result)).to.include('#ff0000');
    expect(decodeBase64DataUrl(result)).to.not.include('currentColor');
  });

  it('replaces fill attribute value when currentColor is not present', () => {
    const result = colorSvgDataUrl(svgWithFillAttr, '#aabbcc');

    expect(decodeBase64DataUrl(result)).to.include('#aabbcc');
    expect(decodeBase64DataUrl(result)).to.not.include('#000000');
  });

  it('returns the original value for malformed data URLs', () => {
    const malformed = 'data:image/svg+xml;base64,%%%';

    expect(colorSvgDataUrl(malformed, '#ff0000')).to.equal(malformed);
  });

  it('returns the original value when there is no base64 segment', () => {
    expect(colorSvgDataUrl('data:image/svg+xml;base64,', '#ff0000')).to.equal('data:image/svg+xml;base64,');
  });
});

describe('getAsArray', () => {
  it('wraps a single value in an array', () => {
    expect(getAsArray('a')).to.deep.equal(['a']);
    expect(getAsArray(42)).to.deep.equal([42]);
    expect(getAsArray({ x: 1 })).to.deep.equal([{ x: 1 }]);
  });

  it('returns the same array reference when already an array', () => {
    const arr = ['a', 'b'];
    expect(getAsArray(arr)).to.equal(arr);
  });

  it('handles empty arrays', () => {
    expect(getAsArray([])).to.deep.equal([]);
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
