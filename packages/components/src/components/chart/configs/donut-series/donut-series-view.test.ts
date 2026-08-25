import { expect } from '@open-wc/testing';
import type GlobalModel from 'echarts/types/src/model/Global.js';
import type ExtensionAPI from 'echarts/types/src/core/ExtensionAPI.js';
import type { graphic } from 'echarts';
import { DONUT_SERIES } from '../constants.js';
import type { SynergyDonutSeriesModel } from './donut-series-model.js';
import { SynergyDonutView } from './donut-series-view.js';
import type { SynergyDonutSeriesOption } from './types.js';
import { getRealStyleValue } from '../../themes/utilities.js';

const RADIAN = Math.PI / 180;
const FULL_CIRCLE = Math.PI * 2;

const createSeriesModelStub = (
  option: SynergyDonutSeriesOption,
  paletteColors: string[] = ['#111111', '#222222', '#333333'],
): SynergyDonutSeriesModel => {
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
  } as unknown as SynergyDonutSeriesModel;
};

const createApiStub = (width = 280, height = 280): ExtensionAPI => ({
  getHeight: () => height,
  getWidth: () => width,
}) as unknown as ExtensionAPI;

const renderDonut = (
  partialOption: Partial<SynergyDonutSeriesOption> = {},
  paletteColors?: string[],
  width = 280,
  height = 280,
): SynergyDonutView => {
  const view = new SynergyDonutView();
  const option: SynergyDonutSeriesOption = {
    data: [10, 20, 30],
    type: 'synergyDonut',
    ...partialOption,
  };

  const seriesModel = createSeriesModelStub(option, paletteColors);
  view.render(seriesModel, {} as GlobalModel, createApiStub(width, height));

  return view;
};

type DonutGraphicElementMap = {
  sector: graphic.Sector;
  text: graphic.Text;
  image: graphic.Image;
};

const isGraphicElementOfType = <TType extends keyof DonutGraphicElementMap>(
  element: unknown,
  type: TType,
): element is DonutGraphicElementMap[TType] & { type: TType } => (
  typeof element === 'object'
  && element !== null
  && 'type' in element
  && (element as { type?: unknown }).type === type
);

const collectByType = <TType extends keyof DonutGraphicElementMap>(
  view: SynergyDonutView,
  type: TType,
): DonutGraphicElementMap[TType][] => {
  const collected: DonutGraphicElementMap[TType][] = [];

  view.group.traverse((element: unknown) => {
    if (isGraphicElementOfType(element, type)) {
      collected.push(element);
    }
  });

  return collected;
};

const getSectors = (view: SynergyDonutView): graphic.Sector[] => collectByType(view, 'sector');

const getTrackSector = (view: SynergyDonutView): graphic.Sector | undefined => getSectors(view).find((sector) => sector.z === 1);
const getSegmentSectors = (view: SynergyDonutView): graphic.Sector[] => getSectors(view).filter((sector) => sector.z === 2);
const getLabelTexts = (view: SynergyDonutView): string[] => collectByType(view, 'text')
  .map((element) => element.style.text)
  .filter((text): text is string => text !== undefined);
const getLabelIcons = (view: SynergyDonutView): graphic.Image[] => collectByType(view, 'image');

const startAngle = DONUT_SERIES.START_ANGLE * RADIAN;
const svgDataUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg==';

describe('SynergyDonutView', () => {
  it('renders a static inner track ring and one segment per data point', () => {
    const view = renderDonut();

    expect(view.group.childCount()).to.equal(1);

    const track = getTrackSector(view);
    expect(track).to.not.equal(undefined);
    expect(track!.style.fill).to.equal(getRealStyleValue('SynChartTrackColor'));
    expect(track!.shape.startAngle).to.equal(0);
    expect(track!.shape.endAngle).to.be.closeTo(FULL_CIRCLE, 0.0001);

    const segments = getSegmentSectors(view);
    expect(segments).to.have.lengthOf(3);
  });

  it('sizes segments proportionally to their value, normalized to 360 degrees', () => {
    const view = renderDonut({ data: [25, 25, 50] });
    const segments = getSegmentSectors(view);

    const sweep = (sector: graphic.Sector) => sector.shape.endAngle - sector.shape.startAngle;

    // Segment sweeps should roughly follow the 1:1:2 value ratio (small gaps reduce the exact sweep slightly).
    expect(sweep(segments[2])).to.be.greaterThan(sweep(segments[0]));
    expect(sweep(segments[0])).to.be.closeTo(sweep(segments[1]), 0.01);
  });

  it('starts the first segment at the configured start angle', () => {
    const view = renderDonut({ data: [10, 20, 30] });
    const [firstSegment] = getSegmentSectors(view);

    expect(firstSegment.shape.startAngle).to.be.greaterThan(startAngle);
    expect(firstSegment.shape.startAngle).to.be.closeTo(startAngle, 0.1);
  });

  it('assigns a palette color per segment when no explicit colors are provided', () => {
    const view = renderDonut({ data: [10, 20, 30] }, ['#aaaaaa', '#bbbbbb', '#cccccc']);
    const segments = getSegmentSectors(view);

    expect(segments.map((segment) => segment.style.fill)).to.deep.equal(['#aaaaaa', '#bbbbbb', '#cccccc']);
  });

  it('uses explicit colors and cycles them when fewer colors than data points are provided', () => {
    const view = renderDonut({ colors: ['#ff0000', '#00ff00'], data: [10, 20, 30, 40] });
    const segments = getSegmentSectors(view);

    expect(segments.map((segment) => segment.style.fill)).to.deep.equal([
      '#ff0000', '#00ff00', '#ff0000', '#00ff00',
    ]);
  });

  it('renders no segments when all values are zero', () => {
    const view = renderDonut({ data: [0, 0, 0] });

    expect(getSegmentSectors(view)).to.have.lengthOf(0);
    expect(getTrackSector(view)).to.not.equal(undefined);
  });

  it('renders no segments for empty data', () => {
    const view = renderDonut({ data: [] });

    expect(getSegmentSectors(view)).to.have.lengthOf(0);
  });

  it('makes the outer segment ring only half as thick as the inner track ring', () => {
    const view = renderDonut();

    const track = getTrackSector(view)!;
    const [segment] = getSegmentSectors(view);

    const trackThickness = track.shape.r - track.shape.r0;
    const segmentThickness = segment.shape.r - segment.shape.r0;

    expect(segmentThickness).to.be.closeTo(trackThickness / 2, 0.01);
  });

  it('does not render labels when no labels are configured', () => {
    const view = renderDonut({ data: [10, 20, 30] });

    expect(getLabelTexts(view)).to.have.lengthOf(0);
    expect(getLabelIcons(view)).to.have.lengthOf(0);
  });

  it('renders a text label centered on each segment', () => {
    const view = renderDonut({
      data: [10, 20, 30],
      labels: [{ text: 'First' }, { text: 'Second' }, { text: 'Third' }],
    });

    expect(getLabelTexts(view)).to.deep.equal(['First', 'Second', 'Third']);
  });

  it('renders an icon before the label text when an icon is provided', () => {
    const view = renderDonut({
      data: [10, 20, 30],
      labels: [{ icon: svgDataUrl, text: 'First' }],
    });

    const icons = getLabelIcons(view);
    expect(icons).to.have.lengthOf(1);
    expect(icons[0].style.image).to.equal(svgDataUrl);
    expect(getLabelTexts(view)).to.include('First');
  });

  it('skips labels for segments without a matching label entry', () => {
    const view = renderDonut({
      data: [10, 20, 30],
      labels: [{ text: 'Only First' }],
    });

    expect(getLabelTexts(view)).to.deep.equal(['Only First']);
  });

  it('does not render labels for zero-value data', () => {
    const view = renderDonut({
      data: [0, 0, 0],
      labels: [{ text: 'First' }, { text: 'Second' }, { text: 'Third' }],
    });

    expect(getLabelTexts(view)).to.have.lengthOf(0);
  });

  it('replaces previous content on repeated render calls', () => {
    const view = new SynergyDonutView();

    view.render(
      createSeriesModelStub({ data: [10, 20], type: 'synergyDonut' }),
      {} as GlobalModel,
      createApiStub(),
    );

    view.render(
      createSeriesModelStub({ data: [30], type: 'synergyDonut' }),
      {} as GlobalModel,
      createApiStub(),
    );

    expect(view.group.childCount()).to.equal(1);
    expect(getSegmentSectors(view)).to.have.lengthOf(1);
  });
});
