import { expect } from '@open-wc/testing';
import {
  clamp,
  colorSvgDataUrl,
  colorSvgImageUri,
  compose,
  convertDegreeToRadian,
  getAsArray,
  mergeConfigs,
  mergeDeep,
  normalizeAngle,
  polarPoint,
} from './utilities.js';

const svgWithCurrentColor = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg==';
const svgWithFillAttr = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiMwMDAwMDAiLz48L3N2Zz4=';
const imageSvgWithCurrentColor = `image://data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg"><path fill="currentColor"/></svg>')}`;
const imageSvgWithFillAttr = `image://data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg"><path fill="#000000"/></svg>')}`;

function decodeBase64DataUrl(dataUrl: string): string {
  const [, base64 = ''] = dataUrl.split(',');
  return atob(base64);
}

function decodeImageSvgUri(imageUri: string): string {
  const urlData = imageUri.slice(8);
  const [, encodedSvg = ''] = urlData.split(',');
  return decodeURIComponent(encodedSvg);
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

  it('appends arrays when array strategy is append', () => {
    const merged = mergeDeep(
      [{ data: [1, 2], id: 'base', type: 'line' }],
      [
        { data: [3, 4], id: 'latest-1', type: 'line' },
        { data: [5, 6], id: 'latest-2', type: 'bar' },
      ],
      { arrayStrategy: 'append' },
    );

    expect(merged).to.deep.equal([
      { data: [1, 2], id: 'base', type: 'line' },
      { data: [3, 4], id: 'latest-1', type: 'line' },
      { data: [5, 6], id: 'latest-2', type: 'bar' },
    ]);
  });

  it('appends nested arrays when array strategy is append', () => {
    const merged = mergeDeep(
      {
        series: [{ id: 'base-0', type: 'line' }],
      },
      {
        series: [
          { data: [1, 2, 3], id: 'latest-0' },
          { id: 'latest-1', type: 'scatter' },
        ],
      },
      { arrayStrategy: 'append' },
    );

    expect(merged).to.deep.equal({
      series: [
        { id: 'base-0', type: 'line' },
        { data: [1, 2, 3], id: 'latest-0' },
        { id: 'latest-1', type: 'scatter' },
      ],
    });
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

  it('appends arrays when configured with append strategy', () => {
    const merged = mergeConfigs(
      {
        series: [{ id: 'base', type: 'line' }],
      },
      {
        series: [
          { id: 'latest-1', type: 'bar' },
          { id: 'latest-2', type: 'scatter' },
        ],
      },
      { arrayStrategy: 'append' },
    );

    expect(merged.series).to.deep.equal([
      { id: 'base', type: 'line' },
      { id: 'latest-1', type: 'bar' },
      { id: 'latest-2', type: 'scatter' },
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

  it('ignores nullish layers and honors arrayStrategy from the trailing options object', () => {
    const merged = mergeConfigs(
      null,
      {
        series: [{ id: 'base-0', type: 'line' }],
      },
      undefined,
      {
        series: [{ id: 'latest-0', type: 'bar' }],
      },
      { arrayStrategy: 'append' },
    );

    expect(merged).to.deep.equal({
      series: [
        { id: 'base-0', type: 'line' },
        { id: 'latest-0', type: 'bar' },
      ],
    });
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

describe('clamp', () => {
  it('clamps values to the inclusive range bounds', () => {
    expect(clamp(-10, 0, 10)).to.equal(0);
    expect(clamp(5, 0, 10)).to.equal(5);
    expect(clamp(25, 0, 10)).to.equal(10);
  });
});

describe('normalizeAngle', () => {
  it('wraps angles into the [0, 2π) range', () => {
    expect(normalizeAngle(0)).to.equal(0);
    expect(normalizeAngle(Math.PI * 2)).to.equal(0);
    expect(normalizeAngle(-Math.PI / 2)).to.equal((3 * Math.PI) / 2);
    expect(normalizeAngle((3 * Math.PI) / 2)).to.equal((3 * Math.PI) / 2);
  });
});

describe('polarPoint', () => {
  it('converts polar coordinates to cartesian coordinates', () => {
    expect(polarPoint(10, 20, 5, 0)).to.deep.equal({ x: 15, y: 20 });
    expect(polarPoint(10, 20, 5, Math.PI / 2)).to.deep.equal({ x: 10, y: 25 });
    const polarPointResult = polarPoint(0, 0, 10, Math.PI);
    expect(polarPointResult.x).to.equal(-10);
    // Javascript floating point math produces error, so we use a tolerance for the y-coordinate check
    expect(polarPointResult.y).to.be.closeTo(0, 1e-10);
  });
});

describe('convertDegreeToRadian', () => {
  it('converts degrees to radians', () => {
    expect(convertDegreeToRadian(0)).to.equal(0);
    expect(convertDegreeToRadian(90)).to.equal(Math.PI / 2);
    expect(convertDegreeToRadian(180)).to.equal(Math.PI);
    expect(convertDegreeToRadian(270)).to.equal((3 * Math.PI) / 2);
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

describe('colorSvgImageUri', () => {
  it('replaces currentColor inside a valid image-prefixed SVG URI', () => {
    const result = colorSvgImageUri(imageSvgWithCurrentColor, '#ff0000');

    expect(decodeImageSvgUri(result)).to.include('#ff0000');
    expect(decodeImageSvgUri(result)).to.not.include('currentColor');
  });

  it('replaces fill attribute value when currentColor is not present', () => {
    const result = colorSvgImageUri(imageSvgWithFillAttr, '#aabbcc');

    expect(decodeImageSvgUri(result)).to.include('#aabbcc');
    expect(decodeImageSvgUri(result)).to.not.include('#000000');
  });

  it('returns the original value for malformed encoded SVG payloads', () => {
    const malformed = 'image://data:image/svg+xml,%%%';

    expect(colorSvgImageUri(malformed, '#ff0000')).to.equal(malformed);
  });

  it('returns the original value when there is no encoded SVG segment', () => {
    expect(colorSvgImageUri('image://data:image/svg+xml,', '#ff0000')).to.equal('image://data:image/svg+xml,');
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
