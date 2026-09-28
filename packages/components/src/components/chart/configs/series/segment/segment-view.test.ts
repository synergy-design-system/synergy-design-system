import { expect } from '@open-wc/testing';
import type GlobalModel from 'echarts/types/src/model/Global.js';
import type ExtensionAPI from 'echarts/types/src/core/ExtensionAPI.js';
import type { graphic } from 'echarts';
import { SEGMENT_SERIES } from '../../constants.js';
import { SynergySegmentSeriesModel } from './segment-model.js';
import {
  SynergySegmentView,
  computeGapRange,
  computeSegmentRanges,
  getSafeHalfGap,
  resolveWeights,
} from './segment-view.js';
import type { SegmentSeriesOption } from './types.js';
import { getRealStyleValue } from '../../../themes/utilities.js';

const RADIAN = Math.PI / 180;
const FULL_CIRCLE = Math.PI * 2;

const createSeriesModelStub = (
  option: SegmentSeriesOption,
  paletteColors: string[] = ['#111111', '#222222', '#333333'],
): SynergySegmentSeriesModel => {
  const resolvedOption: SegmentSeriesOption = {
    ...SynergySegmentSeriesModel.defaultOption,
    ...option,
  };
  const data = resolvedOption.data ?? [];

  const getDataItem = (index: number) => data[index];
  const getDataValue = (index: number) => {
    const item = getDataItem(index);
    return typeof item === 'object' ? item.value : item;
  };
  const getItemStyle = (index: number) => {
    const item = getDataItem(index);
    return typeof item === 'object' ? item.itemStyle : undefined;
  };
  const getItemVisualStyle = (index: number) => {
    const itemStyle = getItemStyle(index);
    const seriesItemStyle = resolvedOption.itemStyle;

    return {
      fill: itemStyle?.color ?? paletteColors[index % paletteColors.length],
      lineWidth: itemStyle?.borderWidth ?? seriesItemStyle?.borderWidth ?? 0,
      stroke: itemStyle?.borderColor ?? seriesItemStyle?.borderColor,
    };
  };

  return {
    get: (key: keyof SegmentSeriesOption) => resolvedOption[key],
    getColorFromPalette: (name: string) => {
      const match = /(\d+)$/.exec(name);
      const index = match ? Number(match[1]) : 0;
      return paletteColors[index % paletteColors.length];
    },
    getData: () => ({
      count: () => data.length,
      each: (callback: (index: number) => void) => data.forEach((_item, index) => callback(index)),
      get: (key: string, index: number) => (key === 'value' ? getDataValue(index) : undefined),
      getItemModel: (index: number) => {
        const item = getDataItem(index);

        return {
          get: (key: string) => (typeof item === 'object' ? item[key as keyof typeof item] : undefined),
          getModel: (key: string) => ({
            get: (property: string) => {
              const itemValue = typeof item === 'object' ? item[key as keyof typeof item] : undefined;
              const seriesValue = resolvedOption[key as keyof SegmentSeriesOption];
              const value = typeof itemValue === 'object' && itemValue !== null ? itemValue : seriesValue;
              return typeof value === 'object' && value !== null
                ? value[property as keyof typeof value]
                : undefined;
            },
          }),
          option: item,
        };
      },
      getItemVisual: (index: number, key: string) => {
        if (key !== 'style') return undefined;
        return getItemVisualStyle(index);
      },
    }),
    option: resolvedOption,
  } as unknown as SynergySegmentSeriesModel;
};

const createApiStub = (width = 280, height = 280): ExtensionAPI => ({
  getHeight: () => height,
  getWidth: () => width,
}) as unknown as ExtensionAPI;

const renderSegmentChart = (
  partialOption: Partial<SegmentSeriesOption> = {},
  paletteColors?: string[],
  width = 280,
  height = 280,
): SynergySegmentView => {
  const view = new SynergySegmentView();
  const option: SegmentSeriesOption = {
    data: [50, 80, 100],
    type: 'synSegment',
    ...partialOption,
  };

  const seriesModel = createSeriesModelStub(option, paletteColors);
  view.render(seriesModel, {} as GlobalModel, createApiStub(width, height));

  return view;
};

type SegmentChartGraphicElementMap = {
  sector: graphic.Sector;
  polygon: graphic.Polygon;
  text: graphic.Text;
  image: graphic.Image;
};

const isGraphicElementOfType = <TType extends keyof SegmentChartGraphicElementMap>(
  element: unknown,
  type: TType,
): element is SegmentChartGraphicElementMap[TType] & { type: TType } => (
  typeof element === 'object'
  && element !== null
  && 'type' in element
  && (element as { type?: unknown }).type === type
);

const collectByType = <TType extends keyof SegmentChartGraphicElementMap>(
  view: SynergySegmentView,
  type: TType,
): SegmentChartGraphicElementMap[TType][] => {
  const collected: SegmentChartGraphicElementMap[TType][] = [];

  view.group.traverse((element: unknown) => {
    if (isGraphicElementOfType(element, type)) {
      collected.push(element);
    }
  });

  return collected;
};

const getSectors = (view: SynergySegmentView): graphic.Sector[] => collectByType(view, 'sector');
const getCenterCircle = (view: SynergySegmentView): graphic.Sector | undefined => getSectors(view).find((sector) => sector.z === 1);
const getWedges = (view: SynergySegmentView): graphic.Polygon[] => collectByType(view, 'polygon');
const getBackgroundWedges = (view: SynergySegmentView): graphic.Polygon[] => getWedges(view).filter((wedge) => wedge.z === 3);
const getFillWedges = (view: SynergySegmentView): graphic.Polygon[] => getWedges(view).filter((wedge) => wedge.z === 4);
const getLabelTexts = (view: SynergySegmentView): string[] => collectByType(view, 'text')
  .map((element) => element.style.text)
  .filter((text): text is string => text !== undefined);
const svgDataUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg==';

/** Approximate distance from the chart center (140, 140 for the default 280x280 test size). */
const distanceFromCenter = (point: number[], centerX = 140, centerY = 140): number => Math.hypot(point[0] - centerX, point[1] - centerY);

const maxRadius = (wedge: graphic.Polygon, centerX = 140, centerY = 140): number => Math.max(
  ...wedge.shape.points.map((point) => distanceFromCenter(point, centerX, centerY)),
);
const minRadius = (wedge: graphic.Polygon): number => Math.min(...wedge.shape.points.map((point) => distanceFromCenter(point)));

describe('computeGapRange', () => {
  it('centers the gap at the bottom of the circle by default', () => {
    const { startAngle } = computeGapRange(0.5, 0);
    const expectedStartAngle = (SEGMENT_SERIES.GAP_CENTER_ANGLE * RADIAN) + (0.5 * Math.PI);

    expect(startAngle).to.be.closeTo(expectedStartAngle, 0.0001);
  });

  it('rotates the gap according to gapOrientation', () => {
    const base = computeGapRange(0.5, 0);
    const rotated = computeGapRange(0.5, 90);

    expect(rotated.startAngle - base.startAngle).to.be.closeTo(90 * RADIAN, 0.0001);
  });

  it('reserves the full circle for segments when gap is 0', () => {
    const { availableAngle } = computeGapRange(0, 0);
    expect(availableAngle).to.be.closeTo(FULL_CIRCLE, 0.0001);
  });

  it('clamps the gap fraction to the 0-1 range', () => {
    expect(computeGapRange(-1, 0).availableAngle).to.be.closeTo(FULL_CIRCLE, 0.0001);
    expect(computeGapRange(2, 0).availableAngle).to.be.closeTo(0, 0.0001);
  });
});

describe('computeSegmentRanges', () => {
  it('sizes segments proportionally to their weights, normalized to the available angle', () => {
    const { startAngle, availableAngle } = computeGapRange(0.3, 0);
    const ranges = computeSegmentRanges([1, 1, 2], startAngle, availableAngle);

    const sweep = (range: { startAngle: number; endAngle: number }) => range.endAngle - range.startAngle;

    expect(sweep(ranges[2]!)).to.be.closeTo(sweep(ranges[0]!) * 2, 0.0001);
    expect(sweep(ranges[0]!)).to.be.closeTo(sweep(ranges[1]!), 0.0001);
  });

  it('returns null ranges when no angle is available', () => {
    const ranges = computeSegmentRanges([1, 1], 0, 0);
    expect(ranges).to.deep.equal([null, null]);
  });

  it('returns null ranges when all weights are zero', () => {
    const ranges = computeSegmentRanges([0, 0], 0, FULL_CIRCLE);
    expect(ranges).to.deep.equal([null, null]);
  });
});

describe('resolveWeights', () => {
  it('defaults missing weight entries to an equal share', () => {
    const model = createSeriesModelStub({ data: [{ value: 50, weight: 2 }, 50, 50], type: 'synSegment' });
    expect(resolveWeights(model.getData())).to.deep.equal([2, 1, 1]);
  });

  it('uses all provided weights when the array is fully populated', () => {
    const model = createSeriesModelStub({
      data: [{ value: 50, weight: 3 }, { value: 50, weight: 5 }],
      type: 'synSegment',
    });
    expect(resolveWeights(model.getData())).to.deep.equal([3, 5]);
  });
});

describe('getSafeHalfGap', () => {
  it('returns the requested half gap when there is enough room', () => {
    expect(getSafeHalfGap(2, Math.PI / 2, 100)).to.equal(2);
  });

  it('clamps the half gap for very thin segments', () => {
    const clamped = getSafeHalfGap(10, 0.01, 20);
    expect(clamped).to.be.lessThan(10);
    expect(clamped).to.be.at.least(0);
  });

  it('returns 0 for a zero sweep or radius', () => {
    expect(getSafeHalfGap(2, 0, 100)).to.equal(0);
    expect(getSafeHalfGap(2, Math.PI / 2, 0)).to.equal(0);
  });
});

describe('SynergySegmentChartView', () => {
  it('renders a static center circle and one background/fill pair per data point', () => {
    const view = renderSegmentChart();

    const centerCircle = getCenterCircle(view);
    expect(centerCircle).to.not.equal(undefined);
    expect(centerCircle!.style.fill).to.equal(getRealStyleValue('SynChartTrackColor'));

    expect(getBackgroundWedges(view)).to.have.lengthOf(3);
    expect(getFillWedges(view)).to.have.lengthOf(3);
  });

  it('grows the filled portion of a segment radially based on its value', () => {
    const view = renderSegmentChart({ data: [10, 50, 100] });
    const fills = getFillWedges(view);

    expect(maxRadius(fills[0])).to.be.lessThan(maxRadius(fills[1]));
    expect(maxRadius(fills[1])).to.be.lessThan(maxRadius(fills[2]));
  });

  it('does not render a fill sector when the value is at the configured minimum', () => {
    const view = renderSegmentChart({ data: [0, 50], min: 0 });

    expect(getFillWedges(view)).to.have.lengthOf(1);
  });

  it('normalizes the fill ratio using custom min/max values', () => {
    const view = renderSegmentChart({ data: [0.5, 1], max: 1, min: 0 });
    const fills = getFillWedges(view);

    expect(maxRadius(fills[1])).to.be.greaterThan(maxRadius(fills[0]));
  });

  it('makes the center circle 20% smaller and the background wedges start right outside it', () => {
    const view = renderSegmentChart();
    const centerCircle = getCenterCircle(view)!;
    const [background] = getBackgroundWedges(view);

    // The background wedge's inner radius should sit just outside the (smaller) center circle.
    expect(minRadius(background)).to.be.greaterThan(centerCircle.shape.r);
    expect(minRadius(background) - centerCircle.shape.r).to.be.lessThan(centerCircle.shape.r);
  });

  it('positions the chart in the center of the inset layout area', () => {
    const view = renderSegmentChart({
      bottom: 40, left: 20, right: 60, top: 10,
    }, undefined, 300, 240);
    const centerCircle = getCenterCircle(view)!;

    expect(centerCircle.shape.cx).to.equal(130);
    expect(centerCircle.shape.cy).to.equal(105);
  });

  it('scales the complete chart from the smaller inset layout dimension', () => {
    const fullLayout = renderSegmentChart({}, undefined, 340, 340);
    const insetLayout = renderSegmentChart({
      bottom: 85, left: '25%', right: '25%', top: 85,
    }, undefined, 340, 340);

    expect(getCenterCircle(insetLayout)!.shape.r).to.be.closeTo(getCenterCircle(fullLayout)!.shape.r / 2, 0.001);
    expect(maxRadius(getBackgroundWedges(insetLayout)[0], 170, 170)).to.be.closeTo(
      maxRadius(getBackgroundWedges(fullLayout)[0], 170, 170) / 2,
      0.5,
    );
  });

  it('keeps geometry finite when insets collapse the layout area', () => {
    const view = renderSegmentChart({
      bottom: 200, left: 200, right: 200, top: 200,
    }, undefined, 200, 200);
    const centerCircle = getCenterCircle(view)!;

    expect(centerCircle.shape.r).to.equal(0);
    expect(centerCircle.shape.cx).to.equal(200);
    expect(centerCircle.shape.cy).to.equal(200);
    expect(getWedges(view)).to.have.lengthOf(0);
  });

  it('assigns a palette color per segment when no explicit colors are provided', () => {
    const view = renderSegmentChart({ data: [50, 80, 100] }, ['#aaaaaa', '#bbbbbb', '#cccccc']);
    const fills = getFillWedges(view);

    expect(fills.map((fill) => fill.style.fill)).to.deep.equal(['#aaaaaa', '#bbbbbb', '#cccccc']);
  });

  it('uses explicit item and background colors when provided', () => {
    const view = renderSegmentChart({
      data: [
        {
          backgroundStyle: { color: '#000010' }, itemStyle: { color: '#ff0000' }, value: 50, weight: 1,
        },
        {
          backgroundStyle: { color: '#000020' }, itemStyle: { color: '#00ff00' }, value: 80, weight: 1,
        },
      ],
    });

    expect(getFillWedges(view).map((fill) => fill.style.fill)).to.deep.equal(['#ff0000', '#00ff00']);
    expect(getBackgroundWedges(view).map((bg) => bg.style.fill)).to.deep.equal(['#000010', '#000020']);
  });

  it('does not render an outline by default', () => {
    const view = renderSegmentChart();
    expect(getFillWedges(view).every((wedge) => wedge.style.stroke === 'none')).to.equal(true);
  });

  it('renders a configured outline for a segment', () => {
    const view = renderSegmentChart({
      data: [
        { itemStyle: { borderColor: '#ff0000', borderWidth: 1 }, value: 50, weight: 1 },
        { value: 80, weight: 1 },
      ],
    });

    const [outlinedSegment] = getFillWedges(view);
    expect(outlinedSegment.style.stroke).to.equal('#ff0000');
    expect(outlinedSegment.style.lineWidth).to.equal(1);
  });

  it('defaults segment labels to the segment value', () => {
    const view = renderSegmentChart({ data: [50, 80] });
    expect(getLabelTexts(view)).to.include.members(['50', '80']);
  });

  it('overrides segment labels with data item labels', () => {
    const view = renderSegmentChart({ data: [{ label: 'first', value: 50, weight: 1 }, 80] });
    expect(getLabelTexts(view)).to.include('first');
    expect(getLabelTexts(view)).to.include('80');
  });

  it('renders the main label inside the gap when provided', () => {
    const view = renderSegmentChart({ data: [50], name: 'Contamination' });
    expect(getLabelTexts(view)).to.include('Contamination');
  });

  it('does not render a main label when not provided', () => {
    const view = renderSegmentChart({ data: [50] });
    expect(getLabelTexts(view)).to.not.include('');
  });

  it('renders the optional center icon', () => {
    const view = renderSegmentChart({ data: [50], icon: svgDataUrl });
    const images = collectByType(view, 'image');
    expect(images).to.have.lengthOf(1);
    expect(images[0].style.image).to.equal(svgDataUrl);
  });

  it('replaces previous content on repeated render calls', () => {
    const view = new SynergySegmentView();

    view.render(
      createSeriesModelStub({ data: [10, 20], type: 'synSegment' }),
      {} as GlobalModel,
      createApiStub(),
    );

    view.render(
      createSeriesModelStub({ data: [30], type: 'synSegment' }),
      {} as GlobalModel,
      createApiStub(),
    );

    expect(getFillWedges(view)).to.have.lengthOf(1);
  });
});
