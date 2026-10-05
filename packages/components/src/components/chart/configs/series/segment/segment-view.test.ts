import { expect } from '@open-wc/testing';
import { Model, type graphic } from 'echarts';
import { SEGMENT_SERIES } from '../../constants.js';
import { SynergySegmentSeriesModel } from './segment-model.js';
import { SynergySegmentView } from './segment-view.js';
import type { SegmentDataItem, SegmentDataValue, SynergySegmentSeriesOption } from './types.js';
import {
  CURRENT_COLOR_SVG_DATA_URL, collectByType, createApiStub, getImages, getSectors, getTextElements,
  getTextValues,
} from '../../testHelper.js';
import type { GlobalModel } from '../../types.js';
import { colorSvgDataUrl } from '../../utilities.js';
import { getRealStyleValue, getRealValueWithoutUnit } from '../../../themes/utilities.js';

const createSeriesModel = (
  option: Partial<SynergySegmentSeriesOption> = {},
  defaultData: SegmentDataValue[] = [
    { value: 10 },
    { value: 20 },
    { value: 30 },
  ],
): SynergySegmentSeriesModel => {
  const seriesOption: SynergySegmentSeriesOption = {
    data: defaultData,
    type: SEGMENT_SERIES.TYPE_NAME,
    ...option,
  };
  const ecModel = { getTheme: () => new Model({}) } as unknown as GlobalModel;
  const model = new SynergySegmentSeriesModel(seriesOption, null as unknown as Model, ecModel);
  model.init(seriesOption, null as unknown as Model, ecModel);
  const data = model.getInitialData(seriesOption);
  model.setData(data);
  data.each((index) => {
    data.setItemVisual(index, 'style', data.getItemModel<SegmentDataItem>(index).getModel('itemStyle').getItemStyle());
  });
  return model;
};

const renderSegment = (
  partialOption: Partial<SynergySegmentSeriesOption> = {},
  data: SegmentDataValue[] = [
    { value: 10 },
    { value: 20 },
    { value: 30 },
  ],
  width: number = SEGMENT_SERIES.REFERENCE_HEIGHT,
  height: number = SEGMENT_SERIES.REFERENCE_HEIGHT,
): SynergySegmentView => {
  const view = new SynergySegmentView();
  const option = {
    data,
    type: SEGMENT_SERIES.TYPE_NAME,
    ...partialOption,
  } as SynergySegmentSeriesOption;

  view.render(createSeriesModel(option, data), {} as GlobalModel, createApiStub(width, height));
  return view;
};

const getSegmentPolygons = (view: SynergySegmentView) => collectByType<graphic.Polygon>(view, 'polygon');

// The first two points of the polygon define the inner and outer edges of the radial segment. The radial extent is the distance between these two points.
const getRadialExtent = (polygon: graphic.Polygon): number => {
  const [[innerX, innerY], [outerX, outerY]] = polygon.shape.points as [number, number][];
  return Math.hypot(outerX - innerX, outerY - innerY);
};

const getAngularExtent = (polygon: graphic.Polygon, centerX: number, centerY: number): number => {
  const points = polygon.shape.points as [number, number][];
  const outerRadius = Math.max(...points.map(([x, y]) => Math.hypot(x - centerX, y - centerY)));
  const outerArcPoints = points.filter(([x, y]) => (
    Math.abs(Math.hypot(x - centerX, y - centerY) - outerRadius) < 0.001
  ));
  const angle = ([x, y]: [number, number]) => Math.atan2(y - centerY, x - centerX);
  const firstAngle = angle(outerArcPoints[0]);
  const lastAngle = angle(outerArcPoints[outerArcPoints.length - 1]);
  return (lastAngle - firstAngle + (2 * Math.PI)) % (2 * Math.PI);
};

const backgroundPolygons = (view: SynergySegmentView) => collectByType<graphic.Polygon>(view, 'polygon').filter((polygon) => polygon.z === 3);

const fillPolygons = (view: SynergySegmentView) => collectByType<graphic.Polygon>(view, 'polygon').filter((polygon) => polygon.z === 4);

describe('SynergySegmentView', () => {
  it('renders a static center circle and a background + fill polygon for each data item', () => {
    const view = renderSegment({
      data: [10, 20, 30, 40],
    });

    // Static center circle
    const centerCirlce = getSectors(view);
    const backgroundSegments = backgroundPolygons(view);
    const fillSegments = fillPolygons(view);
    const texts = getTextElements(view);

    expect(view.group.childCount()).to.equal(1);
    expect(centerCirlce).to.have.lengthOf(1);
    expect(backgroundSegments).to.have.lengthOf(4);
    expect(fillSegments).to.have.lengthOf(4);
    expect(texts).to.have.lengthOf(4);
  });

  [{ data: [10, 20, 50, 100], title: 'with only numbers' }, { data: [{ value: 10 }, { value: 20 }, { value: 50 }, { value: 100 }], title: 'with value objects' }].forEach(({ data, title }) => {
    it(`handles data array ${title} correctly`, () => {
      const view = renderSegment({
        data,
      });

      const fillSegments = fillPolygons(view);
      const textValues = getTextValues(view);
      const backgroundSegments = backgroundPolygons(view);
      const maxSegmentLength = getRadialExtent(backgroundSegments[0]);

      // Check that the filled polygon size corresponds to the data values
      fillSegments.forEach((polygon, index) => {
        const segmentLength = getRadialExtent(polygon);
        const segmentPercentage = (segmentLength * 100) / maxSegmentLength;
        const expectedValue = typeof data[index] === 'number' ? data[index] : data[index].value;
        expect(segmentPercentage).to.be.closeTo(expectedValue, 0.01);
      });

      expect(fillSegments).to.have.lengthOf(4);
      expect(textValues).to.deep.equal(['10', '20', '50', '100']);
    });
  });

  it('uses min and max to normalize the filled sector length', () => {
    const viewNormal = renderSegment({
      data: [{ value: 20 }],
    });

    const view = renderSegment({
      data: [{ value: 20 }],
      max: 50,
      min: 10,
    });

    const filledNormal = fillPolygons(viewNormal)[0];
    const backgroundNormal = backgroundPolygons(viewNormal)[0];

    const filled = fillPolygons(view)[0];
    const background = backgroundPolygons(view)[0];

    const segmentPercentageNormal = (getRadialExtent(filledNormal) * 100) / getRadialExtent(backgroundNormal);
    const segmentPercentage = (getRadialExtent(filled) * 100) / getRadialExtent(background);

    expect(segmentPercentageNormal).to.be.closeTo(20, 0.01);
    expect(segmentPercentageNormal).to.not.equal(segmentPercentage);
    expect(segmentPercentage).to.be.closeTo(25, 0.01);
  });

  it('applies backgroundStyle and itemStyle values for each item or falls back to the root styles otherwise', () => {
    const view = renderSegment({
      backgroundStyle: { borderColor: 'black', borderWidth: 2, color: 'white' },
      data: [
        { itemStyle: { borderColor: 'blue', borderWidth: 1, color: 'red' }, value: 10 },
        { backgroundStyle: { borderColor: 'green', borderWidth: 3, color: 'yellow' }, value: 20 },
      ],
      itemStyle: { borderColor: 'black', borderWidth: 3, color: 'white' },
    });

    const filled = fillPolygons(view);
    const background = backgroundPolygons(view);

    expect(background[0].style.fill).to.equal('white');
    expect(background[0].style.stroke).to.equal('black');
    expect(background[0].style.lineWidth).to.equal(2);
    expect(filled[0].style.fill).to.equal('red');
    expect(filled[0].style.stroke).to.equal('blue');
    expect(filled[0].style.lineWidth).to.equal(1);
    expect(background[1].style.fill).to.equal('yellow');
    expect(background[1].style.stroke).to.equal('green');
    expect(background[1].style.lineWidth).to.equal(3);
    expect(filled[1].style.fill).to.equal('white');
    expect(filled[1].style.stroke).to.equal('black');
    expect(filled[1].style.lineWidth).to.equal(3);
  });

  it('renders labels from the data item via string, function based or value if not set', () => {
    const view = renderSegment({
      data: [
        { label: 'First', value: 10 },
        { label: (value: number) => `${value}%`, value: 20 },
        { value: 30 },
        // does not render a label at all if set to undefined
        { label: undefined, value: 40 },
      ],
    });

    const elements = getTextValues(view);
    expect(elements).to.deep.equal(['First', '20%', '30']);
  });

  it('truncates long labels to the available layout width if not overwritten by labelTextStyle', () => {
    const view = renderSegment({
      data: [
        { label: 'A very long segment label that should not overflow', value: 10 },
        { label: 'Another very long segment label that should overflow', labelTextStyle: { overflow: 'none' }, value: 10 },
      ],
    }, undefined, 180, 340);
    const labelNotOverflow = getTextElements(view).find(element => element.style.text?.startsWith('A very long'));
    const labelOverflow = getTextElements(view).find(element => element.style.text?.startsWith('Another very long'));

    expect(labelNotOverflow).to.not.equal(undefined);
    expect(labelNotOverflow!.style.overflow).to.equal('truncate');
    expect(labelNotOverflow!.style.width).to.be.a('number').and.greaterThan(0);
    expect(labelOverflow).to.not.equal(undefined);
    expect(labelOverflow!.style.overflow).to.equal('none');
    expect(labelOverflow!.style.width).to.be.a('number').and.greaterThan(0);
  });

  it('default label text styling can be overwritten via labelTextStyle', () => {
    const view = renderSegment({
      data: [
        { label: 'Default', value: 10 },
        { label: 'Custom', labelTextStyle: { fill: 'red', fontWeight: 'bold' }, value: 20 },
      ],
    });

    const elements = getTextElements(view);
    expect(elements[0].style.fill).to.equal('#0d0d0d');
    expect(elements[0].style.fontWeight).to.equal(400);
    expect(elements[1].style.fill).to.equal('red');
    expect(elements[1].style.fontWeight).to.equal('bold');
  });

  it('Per item labelTextStyle has precedence over root labelTextStyle', () => {
    const view = renderSegment({
      data: [
        { label: 'Default', value: 10 },
        { label: 'Custom', labelTextStyle: { fill: 'red', fontWeight: 'bold' }, value: 20 },
      ],
      labelTextStyle: { fill: 'blue', fontSize: 16, fontWeight: 'normal' },
    });

    const elements = getTextElements(view);
    expect(elements[0].style.fill).to.equal('blue');
    expect(elements[0].style.fontWeight).to.equal('normal');
    expect(elements[0].style.fontSize).to.equal(16);
    expect(elements[1].style.fill).to.equal('red');
    expect(elements[1].style.fontWeight).to.equal('bold');
    expect(elements[1].style.fontSize).to.equal(16);
  });

  it('uses default weight if not set explicitly and keeps the sector widths equal', () => {
    const view = renderSegment({
      data: [10, 20, 30],
    });

    const center = getSectors(view)[0].shape;
    const angularExtents = backgroundPolygons(view).map((polygon) => getAngularExtent(polygon, center.cx, center.cy));
    const totalAngularExtent = angularExtents.reduce((total, extent) => total + extent, 0);
    const angularShares = angularExtents.map((extent) => extent / totalAngularExtent);
    const totalShare = angularShares.reduce((total, share) => total + share, 0);

    expect(angularShares[0]).to.be.closeTo(0.33, 0.01);
    expect(angularShares[1]).to.be.closeTo(0.33, 0.01);
    expect(angularShares[2]).to.be.closeTo(0.33, 0.01);
    expect(totalShare).to.equal(1);
  });

  it('uses custom weights for the used sector widths', () => {
    const view = renderSegment({
      data: [{ value: 10, weight: 2 }, { value: 20, weight: 0.5 }, { value: 30 }],
    });

    const center = getSectors(view)[0].shape;
    const angularExtents = backgroundPolygons(view).map((polygon) => getAngularExtent(polygon, center.cx, center.cy));
    const totalAngularExtent = angularExtents.reduce((total, extent) => total + extent, 0);
    const angularShares = angularExtents.map((extent) => extent / totalAngularExtent);
    const totalShare = angularShares.reduce((total, share) => total + share, 0);

    expect(angularShares[0]).to.be.closeTo(0.57, 0.01);
    expect(angularShares[1]).to.be.closeTo(0.14, 0.01);
    expect(angularShares[2]).to.be.closeTo(0.28, 0.01);
    expect(totalShare).to.equal(1);
  });

  it('keeps negative and zero-weight segments out of the angular distribution', () => {
    const view = renderSegment({
      data: [
        { value: 10, weight: 0 },
        { value: 20, weight: 1 },
        { value: 30, weight: 3 },
        { value: 40, weight: -2 },
      ],
    });

    const backgrounds = backgroundPolygons(view);
    const center = getSectors(view)[0].shape;
    const angularExtents = backgrounds.map(polygon => getAngularExtent(polygon, center.cx, center.cy));

    expect(backgrounds).to.have.lengthOf(2);
    expect(angularExtents[0] / angularExtents[1]).to.be.closeTo(1 / 3, 0.01);
  });

  it('keeps finite geometry for very large weights and falls back for non-finite weights', () => {
    const view = renderSegment({
      data: [
        { value: 10, weight: Number.MAX_VALUE },
        { value: 20, weight: Number.MAX_VALUE },
        { value: 30, weight: Number.POSITIVE_INFINITY },
      ],
    });

    const points = backgroundPolygons(view).flatMap(polygon => polygon.shape.points);
    expect(points.every(([x, y]) => Number.isFinite(x) && Number.isFinite(y))).to.equal(true);
  });

  it('renders the optional center icon when icon is provided', () => {
    const view = renderSegment({
      data: [{ value: 10, weight: 1 }],
      icon: CURRENT_COLOR_SVG_DATA_URL,
    });

    const images = getImages(view);
    expect(images).to.have.lengthOf(1);
    expect(images[0].style.image).to.equal(colorSvgDataUrl(CURRENT_COLOR_SVG_DATA_URL, getRealStyleValue('SynColorNeutral950')));
  });

  it('uses default gap and gapOrientation if omitted', () => {
    const view = renderSegment({
      data: [{ label: undefined, value: 10 }, { label: undefined, value: 20 }],
      name: 'Gap (30%)',
    });
    const center = getSectors(view)[0].shape;
    const backgrounds = backgroundPolygons(view);
    const angularExtent = backgrounds
      .map((polygon) => getAngularExtent(polygon, center.cx, center.cy))
      .reduce((total, extent) => total + extent, 0);

    const percentageOfCircle = (angularExtent / (2 * Math.PI)) * 100;
    // It is a bit inaccurate, as there is a gap between the segments, which is not integrated
    expect(percentageOfCircle).to.be.closeTo(70, 0.5);
    // The outer first point of the first background polygon radius
    const [startX, startY] = backgrounds[0].shape.points[1];
    const startAngle = (Math.atan2(startY - center.cy, startX - center.cx) + (2 * Math.PI)) % (2 * Math.PI);
    expect(startAngle).to.be.closeTo((144 * Math.PI) / 180, 0.03);
  });

  it('supports custom gap and gapOrientation', () => {
    const view = renderSegment({
      data: [{ label: undefined, value: 10 }, { label: undefined, value: 20 }],
      gap: 0.6,
      gapOrientation: 90,
      name: 'Gap (60%)',
    });
    const backgrounds = backgroundPolygons(view);

    const center = getSectors(view)[0].shape;
    const angularExtent = backgrounds
      .map((polygon) => getAngularExtent(polygon, center.cx, center.cy))
      .reduce((total, extent) => total + extent, 0);

    const percentageOfCircle = (angularExtent / (2 * Math.PI)) * 100;
    // It is a bit inaccurate, as there is a gap between the segments, which is not integrated
    expect(percentageOfCircle).to.be.closeTo(40, 0.5);
    // The outer first point of the first background polygon radius
    const [startX, startY] = backgrounds[0].shape.points[1];
    const startAngle = (Math.atan2(startY - center.cy, startX - center.cx) + (2 * Math.PI)) % (2 * Math.PI);
    expect(startAngle).to.be.closeTo((288 * Math.PI) / 180, 0.03);
  });

  it('renders the series name in the gap and applies nameTextStyle overrides', () => {
    const view = renderSegment({
      data: [{ label: undefined, value: 10 }, { label: undefined, value: 20 }],
      name: 'Default',
    });
    const viewCustomStyle = renderSegment({
      data: [{ label: undefined, value: 10 }, { label: undefined, value: 20 }],
      gapOrientation: 90,
      name: 'Custom Style',
      nameTextStyle: { fill: '#123456', fontWeight: 'bold' },
    });

    const center = getSectors(view)[0].shape;
    const nameText = getTextElements(view).find((element) => element.style.text === 'Default')!;

    // Defaults
    expect(nameText).to.not.equal(undefined);
    expect(nameText.style.fill).to.equal('#0d0d0d');
    expect(nameText.style.fontWeight).to.equal(400);
    expect(nameText.style.x).to.equal(center.cx);
    expect(nameText.style.y).to.be.greaterThan(center.cy);

    const centerCustom = getSectors(viewCustomStyle)[0].shape;
    const nameTextCustom = getTextElements(viewCustomStyle).find((element) => element.style.text === 'Custom Style')!;
    // Custom Style and other gapOrientation
    expect(nameTextCustom).to.not.equal(undefined);
    expect(nameTextCustom.style.fill).to.equal('#123456');
    expect(nameTextCustom.style.fontWeight).to.equal('bold');
    expect(nameTextCustom.style.x).to.be.lessThan(centerCustom.cx);
    expect(nameTextCustom.style.y).to.equal(centerCustom.cy);
  });

  it('positions the chart within the configured layout insets', () => {
    const view = renderSegment({
      bottom: '25%',
      data: [10, 20],
      left: 40,
      right: '10%',
      top: 20,
    }, undefined, SEGMENT_SERIES.REFERENCE_HEIGHT, SEGMENT_SERIES.REFERENCE_HEIGHT);

    const center = getSectors(view)[0].shape;
    expect(center.cx).to.equal(173);
    expect(center.cy).to.equal(137.5);
    const background = backgroundPolygons(view)[0];
    const polygonRadius = Math.max(...background.shape.points.map(([x, y]) => Math.hypot(x - center.cx, y - center.cy)));
    const layoutHeight = (SEGMENT_SERIES.REFERENCE_HEIGHT * 0.75) - 20;
    const reservedLabelSpace = getRealValueWithoutUnit('SynSpacingSmall') + getRealValueWithoutUnit('SynFontSizeSmall');
    const expectedRadius = (layoutHeight / 2) - ((layoutHeight / SEGMENT_SERIES.REFERENCE_HEIGHT) * reservedLabelSpace);
    expect(polygonRadius).to.be.closeTo(expectedRadius, 0.001);
  });

  it('replaces previous content on repeated render calls', () => {
    const view = new SynergySegmentView();

    view.render(createSeriesModel({ data: [{ value: 10, weight: 1 }] }), {} as GlobalModel, createApiStub());
    view.render(createSeriesModel({ data: [{ value: 20, weight: 1 }, { value: 30, weight: 1 }] }), {} as GlobalModel, createApiStub());

    expect(getSectors(view)).to.have.lengthOf(1);
    expect(getSegmentPolygons(view)).to.have.lengthOf(4);
  });
});
