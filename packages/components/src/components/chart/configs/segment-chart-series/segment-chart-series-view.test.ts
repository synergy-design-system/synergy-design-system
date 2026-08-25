import { expect } from '@open-wc/testing';
import type GlobalModel from 'echarts/types/src/model/Global.js';
import type ExtensionAPI from 'echarts/types/src/core/ExtensionAPI.js';
import type { graphic } from 'echarts';
import { SEGMENT_CHART_SERIES } from '../constants.js';
import type { SynergySegmentChartSeriesModel } from './segment-chart-series-model.js';
import {
  SynergySegmentChartView,
  computeGapRange,
  computeSegmentRanges,
  getSafeHalfGap,
  resolveWeights,
} from './segment-chart-series-view.js';
import type { SynergySegmentChartSeriesOption } from './types.js';
import { getRealStyleValue } from '../../themes/utilities.js';

const RADIAN = Math.PI / 180;
const FULL_CIRCLE = Math.PI * 2;

const createSeriesModelStub = (
  option: SynergySegmentChartSeriesOption,
  paletteColors: string[] = ['#111111', '#222222', '#333333'],
): SynergySegmentChartSeriesModel => {
  const data = option.data ?? [];

  return {
    getColorFromPalette: (name: string) => {
      const match = /(\d+)$/.exec(name);
      const index = match ? Number(match[1]) : 0;
      return paletteColors[index % paletteColors.length];
    },
    getData: () => ({
      count: () => data.length,
      get: (key: string, index: number) => (key === 'value' ? data[index] : undefined),
    }),
    option,
  } as unknown as SynergySegmentChartSeriesModel;
};

const createApiStub = (width = 280, height = 280): ExtensionAPI => ({
  getHeight: () => height,
  getWidth: () => width,
}) as unknown as ExtensionAPI;

const renderSegmentChart = (
  partialOption: Partial<SynergySegmentChartSeriesOption> = {},
  paletteColors?: string[],
  width = 280,
  height = 280,
): SynergySegmentChartView => {
  const view = new SynergySegmentChartView();
  const option: SynergySegmentChartSeriesOption = {
    data: [50, 80, 100],
    type: 'synergySegmentChart',
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
  view: SynergySegmentChartView,
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

const getSectors = (view: SynergySegmentChartView): graphic.Sector[] => collectByType(view, 'sector');
const getCenterCircle = (view: SynergySegmentChartView): graphic.Sector | undefined => getSectors(view).find((sector) => sector.z === 1);
const getWedges = (view: SynergySegmentChartView): graphic.Polygon[] => collectByType(view, 'polygon');
const getBackgroundWedges = (view: SynergySegmentChartView): graphic.Polygon[] => getWedges(view).filter((wedge) => wedge.z === 3);
const getFillWedges = (view: SynergySegmentChartView): graphic.Polygon[] => getWedges(view).filter((wedge) => wedge.z === 4);
const getOutlineWedges = (view: SynergySegmentChartView): graphic.Polygon[] => getWedges(view).filter((wedge) => wedge.z === 5);
const getLabelTexts = (view: SynergySegmentChartView): string[] => collectByType(view, 'text')
  .map((element) => element.style.text)
  .filter((text): text is string => text !== undefined);
const svgDataUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg==';

/** Approximate distance from the chart center (140, 140 for the default 280x280 test size). */
const distanceFromCenter = (point: number[], centerX = 140, centerY = 140): number => Math.hypot(point[0] - centerX, point[1] - centerY);

const maxRadius = (wedge: graphic.Polygon): number => Math.max(...wedge.shape.points.map((point) => distanceFromCenter(point)));
const minRadius = (wedge: graphic.Polygon): number => Math.min(...wedge.shape.points.map((point) => distanceFromCenter(point)));

describe('computeGapRange', () => {
  it('centers the gap at the bottom of the circle by default', () => {
    const { startAngle } = computeGapRange(0.5, 0);
    const expectedStartAngle = (SEGMENT_CHART_SERIES.GAP_CENTER_ANGLE * RADIAN) + (0.5 * Math.PI);

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
    expect(resolveWeights([50, 50, 50], [2])).to.deep.equal([2, 1, 1]);
  });

  it('uses all provided weights when the array is fully populated', () => {
    expect(resolveWeights([50, 50], [3, 5])).to.deep.equal([3, 5]);
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

  it('assigns a palette color per segment when no explicit segmentColors are provided', () => {
    const view = renderSegmentChart({ data: [50, 80, 100] }, ['#aaaaaa', '#bbbbbb', '#cccccc']);
    const fills = getFillWedges(view);

    expect(fills.map((fill) => fill.style.fill)).to.deep.equal(['#aaaaaa', '#bbbbbb', '#cccccc']);
  });

  it('uses explicit segmentColors and segmentBackgroundColors when provided', () => {
    const view = renderSegmentChart({
      data: [50, 80],
      segmentBackgroundColors: ['#000010', '#000020'],
      segmentColors: ['#ff0000', '#00ff00'],
    });

    expect(getFillWedges(view).map((fill) => fill.style.fill)).to.deep.equal(['#ff0000', '#00ff00']);
    expect(getBackgroundWedges(view).map((bg) => bg.style.fill)).to.deep.equal(['#000010', '#000020']);
  });

  it('does not render an outline by default', () => {
    const view = renderSegmentChart();
    expect(getOutlineWedges(view)).to.have.lengthOf(0);
  });

  it('renders a 1px outline for segments with a configured segmentOutlineColor', () => {
    const view = renderSegmentChart({
      data: [50, 80],
      segmentOutlineColor: ['#ff0000'],
    });

    const outlines = getOutlineWedges(view);
    expect(outlines).to.have.lengthOf(1);
    expect(outlines[0].style.stroke).to.equal('#ff0000');
    expect(outlines[0].style.lineWidth).to.equal(1);
  });

  it('defaults segment labels to the segment value', () => {
    const view = renderSegmentChart({ data: [50, 80] });
    expect(getLabelTexts(view)).to.include.members(['50', '80']);
  });

  it('overrides segment labels with segmentLabels', () => {
    const view = renderSegmentChart({ data: [50, 80], segmentLabels: ['first'] });
    expect(getLabelTexts(view)).to.include('first');
    expect(getLabelTexts(view)).to.include('80');
  });

  it('renders the main label inside the gap when provided', () => {
    const view = renderSegmentChart({ data: [50], mainLabel: 'Contamination', weights: [1] });
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
    const view = new SynergySegmentChartView();

    view.render(
      createSeriesModelStub({ data: [10, 20], type: 'synergySegmentChart' }),
      {} as GlobalModel,
      createApiStub(),
    );

    view.render(
      createSeriesModelStub({ data: [30], type: 'synergySegmentChart' }),
      {} as GlobalModel,
      createApiStub(),
    );

    expect(getFillWedges(view)).to.have.lengthOf(1);
  });
});
