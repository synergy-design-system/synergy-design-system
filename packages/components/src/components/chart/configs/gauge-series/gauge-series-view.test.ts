import { expect } from '@open-wc/testing';
import type GlobalModel from 'echarts/types/src/model/Global.js';
import type ExtensionAPI from 'echarts/types/src/core/ExtensionAPI.js';
import type { graphic } from 'echarts';
import { GAUGE_SERIES } from '../constants.js';
import type { SynergyGaugeSeriesModel } from './gauge-series-model.js';
import { SynergyGaugeView } from './gauge-series-view.js';
import type { SynergyGaugeSeriesOption } from './types.js';
import { getRealStyleValue } from '../../themes/utilities.js';
import { colorSvgDataUrl } from '../utilities.js';

const RADIAN = Math.PI / 180;
const svgDataUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg==';

const createSeriesModelStub = (
  option: SynergyGaugeSeriesOption,
  paletteColor = '#123456',
): SynergyGaugeSeriesModel => {
  const value = option.data?.[0] ?? 0;

  return {
    getColorFromPalette: () => paletteColor,
    getData: () => ({
      get: (key: string) => (key === 'value' ? value : undefined),
    }),
    option,
  } as unknown as SynergyGaugeSeriesModel;
};

const createApiStub = (width = 280, height = 280): ExtensionAPI => ({
  getHeight: () => height,
  getWidth: () => width,
}) as unknown as ExtensionAPI;

const renderGauge = (
  partialOption: Partial<SynergyGaugeSeriesOption> = {},
  paletteColor = '#123456',
  width = 280,
  height = 280,
): SynergyGaugeView => {
  const view = new SynergyGaugeView();
  const option: SynergyGaugeSeriesOption = {
    data: [50],
    type: 'synergyGauge',
    ...partialOption,
  };

  const seriesModel = createSeriesModelStub(option, paletteColor);
  view.render(seriesModel, {} as GlobalModel, createApiStub(width, height));

  return view;
};

type GaugeGraphicElementMap = {
  image: graphic.Image;
  rect: graphic.Rect;
  sector: graphic.Sector;
  text: graphic.Text;
};

const isGraphicElementOfType = <TType extends keyof GaugeGraphicElementMap>(
  element: unknown,
  type: TType,
): element is GaugeGraphicElementMap[TType] & { type: TType } => (
  typeof element === 'object'
  && element !== null
  && 'type' in element
  && (element as { type?: unknown }).type === type
);

const collectByType = <TType extends keyof GaugeGraphicElementMap>(
  view: SynergyGaugeView,
  type: TType,
): GaugeGraphicElementMap[TType][] => {
  const collected: GaugeGraphicElementMap[TType][] = [];

  view.group.traverse((element: unknown) => {
    if (isGraphicElementOfType(element, type)) {
      collected.push(element);
    }
  });

  return collected;
};

const getTextValues = (view: SynergyGaugeView): string[] => (
  collectByType(view, 'text')
    .map((element) => element.style.text)
    .filter((text) => text !== undefined)
);

const getSectors = (view: SynergyGaugeView): graphic.Sector[] => collectByType(view, 'sector');

const getProgressSector = (view: SynergyGaugeView): graphic.Sector | undefined => getSectors(view).find((sector) => sector.z === 3);

const getBackgroundSector = (view: SynergyGaugeView): graphic.Sector | undefined => getSectors(view).find((sector) => sector.z === 2);
const getSectionSectors = (view: SynergyGaugeView): graphic.Sector[] => getSectors(view).filter((sector) => sector.z === 1);
const getProgressColor = (view: SynergyGaugeView): string | undefined => {
  const fill = getProgressSector(view)?.style?.fill;
  return typeof fill === 'string' ? fill : undefined;
};

const startAngle = GAUGE_SERIES.START_ANGLE * RADIAN;
const endAngle = GAUGE_SERIES.END_ANGLE * RADIAN;

describe('SynergyGaugeView', () => {
  it('renders defaults with value, min and max labels plus background and progress arc', () => {
    const view = renderGauge();

    expect(view.group.childCount()).to.equal(1);
    expect(getTextValues(view)).to.deep.equal(['50', '0', '100']);

    const background = getBackgroundSector(view);
    expect(background).to.not.equal(undefined);
    expect(background!.style.fill).to.equal(getRealStyleValue('SynChartTrackColor'));

    const progress = getProgressSector(view);
    expect(progress).to.not.equal(undefined);
    expect(progress!.style.fill).to.equal('#123456');
    expect(progress!.shape.startAngle).to.be.closeTo(startAngle, 0.0001);
    expect(progress!.shape.endAngle).to.be.closeTo((startAngle + endAngle) / 2, 0.0001);
    expect(getSectionSectors(view)).to.have.lengthOf(0);
  });

  it('uses formatter functions for value, min and max labels', () => {
    const view = renderGauge({
      data: [65],
      formatter: {
        max: (value) => `max:${value}`,
        min: (value) => `min:${value}`,
        value: (value) => `value:${value}`,
      },
      max: 130,
      min: 10,
    });

    expect(getTextValues(view)).to.deep.equal(['value:65', 'min:10', 'max:130']);
  });

  it('clamps values below min by skipping progress arc rendering', () => {
    const view = renderGauge({ data: [-50], max: 100, min: 0 });

    expect(getProgressSector(view)).to.equal(undefined);
    expect(getTextValues(view)).to.deep.equal(['0', '0', '100']);
  });

  it('clamps values above max and renders a full progress arc', () => {
    const view = renderGauge({ data: [150], max: 100, min: 0 });

    const progress = getProgressSector(view);
    expect(progress).to.not.equal(undefined);
    expect(progress!.shape.endAngle).to.be.closeTo(endAngle, 0.0001);
    expect(getTextValues(view)).to.deep.equal(['100', '0', '100']);
  });

  it('renders provided sections when showSections is true', () => {
    const view = renderGauge({
      sections: {
        boundaries: [0, 50, 100],
        colors: ['#ff0000', '#00ff00'],
      },
      showSections: true,
    });

    const sectionSectors = getSectionSectors(view);
    expect(sectionSectors).to.have.lengthOf(2);
    expect(sectionSectors.map((sector) => sector.style.fill)).to.deep.equal(['#ff0000', '#00ff00']);
  });

  it('sorts unsorted section boundaries before rendering sections', () => {
    const sorted = renderGauge({
      sections: { boundaries: [0, 30, 70, 100], colors: ['#11', '#22', '#33'] },
      showSections: true,
    });

    const unsorted = renderGauge({
      sections: { boundaries: [100, 0, 70, 30], colors: ['#11', '#22', '#33'] },
      showSections: true,
    });

    const toShapeSnapshot = (view: SynergyGaugeView) => getSectionSectors(view).map((sector) => ({
      color: sector.style.fill,
      end: sector.shape.endAngle,
      start: sector.shape.startAngle,
    }));

    expect(toShapeSnapshot(sorted)).to.deep.equal(toShapeSnapshot(unsorted));
  });

  it('cycles section colors when fewer colors than ranges are provided', () => {
    const view = renderGauge({
      sections: {
        boundaries: [0, 25, 50, 75, 100],
        colors: ['#ff0000', '#00ff00'],
      },
      showSections: true,
    });

    const sectionSectors = getSectionSectors(view);
    expect(sectionSectors.map((sector) => sector.style.fill)).to.deep.equal([
      '#ff0000', '#00ff00', '#ff0000', '#00ff00',
    ]);
  });

  it('auto-derives progress color from sections when showSections is true and no explicit color is given', () => {
    const sections = {
      boundaries: [0, 20, 80, 100],
      colors: ['green', 'orange', 'red'],
    };

    const startView = renderGauge({ data: [10], sections, showSections: true });
    const midView = renderGauge({ data: [40], sections, showSections: true });
    const endView = renderGauge({ data: [90], sections, showSections: true });

    expect(getProgressColor(startView)).to.equal('green');
    expect(getProgressColor(midView)).to.equal('orange');
    expect(getProgressColor(endView)).to.equal('red');
  });

  it('uses explicit progress color even when showSections is true', () => {
    const sections = {
      boundaries: [0, 20, 80, 100],
      colors: ['green', 'orange', 'red'],
    };

    const startView = renderGauge({
      color: 'blue',
      data: [10],
      sections,
      showSections: true,
    });
    const midView = renderGauge({
      color: 'blue',
      data: [40],
      sections,
      showSections: true,
    });
    const endView = renderGauge({
      color: 'blue',
      data: [90],
      sections,
      showSections: true,
    });

    expect(getProgressColor(startView)).to.equal('blue');
    expect(getProgressColor(midView)).to.equal('blue');
    expect(getProgressColor(endView)).to.equal('blue');
  });

  it('does not auto-derive progress color when showSections is false', () => {
    const view = renderGauge({
      data: [40],
      sections: {
        boundaries: [0, 20, 80, 100],
        colors: ['green', 'orange', 'red'],
      },
      showSections: false,
    });

    expect(getProgressColor(view)).to.equal('#123456');
  });

  it('renders trend indicator group when showTrend is true', () => {
    const view = renderGauge({
      showTrend: true,
      trend: {
        value: '5,2%',
      },
    });

    const texts = getTextValues(view);
    const trendBackgroundRects = collectByType(view, 'rect').filter((element) => element.z === 20);
    const trendImages = collectByType(view, 'image').filter((element) => element.z === 21);

    expect(trendBackgroundRects).to.have.lengthOf(1);
    expect(trendImages).to.have.lengthOf(1);
    expect(texts).to.include('5,2%');
  });

  it('does not render trend indicator when showTrend is false', () => {
    const view = renderGauge({ showTrend: false });

    const trendBackgroundRects = collectByType(view, 'rect').filter((element) => element.z === 20);
    expect(trendBackgroundRects).to.have.lengthOf(0);
  });

  it('uses custom trend down icon when direction is down', () => {
    const view = renderGauge({
      showTrend: true,
      trend: {
        direction: 'down',
        iconDown: svgDataUrl,
      },
    });

    const trendImage = collectByType(view, 'image').find((element) => element.z === 21);
    expect(trendImage).to.not.equal(undefined);
    const coloredIcon = colorSvgDataUrl(svgDataUrl, getRealStyleValue('SynTypographyColorText'));
    expect(trendImage!.style.image).to.equal(coloredIcon);
  });

  it('uses custom trend up icon when direction is up', () => {
    const view = renderGauge({
      showTrend: true,
      trend: {
        direction: 'up',
        iconUp: svgDataUrl,
      },
    });

    const trendImage = collectByType(view, 'image').find((element) => element.z === 21);
    expect(trendImage).to.not.equal(undefined);
    const coloredIcon = colorSvgDataUrl(svgDataUrl, getRealStyleValue('SynTypographyColorText'));
    expect(trendImage!.style.image).to.equal(coloredIcon);
  });

  it('renders icon when provided', () => {
    const view = renderGauge({
      icon: svgDataUrl,
    });

    const centerIcon = collectByType(view, 'image').find((element) => element.z === 10);
    expect(centerIcon).to.not.equal(undefined);
    const coloredIcon = colorSvgDataUrl(svgDataUrl, getRealStyleValue('SynTypographyColorText'));
    expect(centerIcon!.style.image).to.equal(coloredIcon);
  });

  it('normalizes reversed min and max correctly', () => {
    const view = renderGauge({ data: [75], max: 0, min: 100 });

    const progress = getProgressSector(view);
    expect(progress).to.not.equal(undefined);
    expect(progress!.shape.endAngle).to.be.closeTo(startAngle + ((endAngle - startAngle) * 0.75), 0.0001);

    expect(getTextValues(view)).to.include.members(['0', '100']);
  });

  it('replaces previous content on repeated render calls', () => {
    const view = new SynergyGaugeView();

    view.render(
      createSeriesModelStub({ data: [20], type: 'synergyGauge' }),
      {} as GlobalModel,
      createApiStub(),
    );
    view.render(
      createSeriesModelStub({ data: [80], type: 'synergyGauge' }),
      {} as GlobalModel,
      createApiStub(),
    );

    expect(view.group.childCount()).to.equal(1);
    expect(getTextValues(view)).to.include('80');
    expect(getTextValues(view)).to.not.include('20');
  });
});
