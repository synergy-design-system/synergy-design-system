import { expect } from '@open-wc/testing';
import type { PieDataItemOption } from 'echarts/types/src/chart/pie/PieSeries.js';
import type { GraphicComponentGroupOption, GraphicComponentImageOption, GraphicComponentTextOption } from 'echarts/types/src/component/graphic/GraphicModel.js';
import type { GraphicComponentOption } from 'echarts/types/dist/echarts';
import { buildPieSeries } from './utilities.js';
import { GAUGE_SERIES } from '../constants.js';
import { colorSvgDataUrl } from '../utilities.js';
import { getRealStyleValue } from '../../themes/utilities.js';

const getColors = (data: PieDataItemOption[]) => data.map((item) => item.itemStyle?.color);
const getValues = (data: PieDataItemOption[]) => data.map((item) => item.value);
const getGraphicTexts = (graphics: GraphicComponentOption[]) => graphics.filter((el) => el.type === 'text').map((el: GraphicComponentTextOption) => el.style?.text);
const svgDataUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg==';

describe('buildPieSeries', () => {
  it('returns the expected shape with graphic, media, progress and sections', () => {
    const result = buildPieSeries({});

    expect(result).to.have.keys(['graphic', 'media', 'progress', 'sections']);
    expect(result.graphic).to.be.an('array');
    expect(result.media).to.be.an('array');
    expect(result.progress).to.be.an('object');
    expect(result.sections).to.be.an('object');
  });

  it('defaults', () => {
    const { graphic, progress, sections } = buildPieSeries({});
    const graphicTexts = (graphic as GraphicComponentTextOption[]).map((element) => element.style?.text);
    const progressData = (progress.data as PieDataItemOption[]);
    const seriesData = (sections.data as PieDataItemOption[]);

    // Show correct value, min and max labels in the graphic elements
    expect(graphic).to.be.an('array').with.lengthOf(3);
    expect(graphicTexts).to.deep.equal(['50', '0', '100']);

    const progressColor = getColors(progressData);
    const progressValue = getValues(progressData);
    expect(progress.startAngle).to.equal(210);
    expect(progress.endAngle).to.equal(-30);
    expect(progress.type).to.equal('pie');
    expect(progressValue).to.deep.equal([50, 50]);
    expect(progressColor).to.deep.equal([undefined, '#e7e7e7']);

    const seriesColor = getColors(seriesData);
    const seriesValue = getValues(seriesData);
    expect(sections.startAngle).to.equal(210);
    expect(sections.endAngle).to.equal(-30);
    expect(sections.type).to.equal('pie');
    expect(seriesValue).to.deep.equal([19.5, 0.5, 39.5, 0.5, 40]);
    expect(seriesColor).to.deep.equal(['#4fc275', 'transparent', '#f2c500', 'transparent', '#ff696d']);
  });

  describe('value clamping', () => {
    it('clamps a value below min to min', () => {
      const { progress } = buildPieSeries({ value: -50 });

      const data = progress.data as PieDataItemOption[];
      expect(getValues(data)).to.deep.equal([0, 100]);
    });

    it('clamps a value above max to max', () => {
      const { progress } = buildPieSeries({ value: 150 });

      const data = progress.data as PieDataItemOption[];
      expect(getValues(data)).to.deep.equal([100, 0]);
    });
  });

  describe('progress series', () => {
    it('produces correct data values for a given value, min and max', () => {
      const { progress, graphic } = buildPieSeries({ max: 200, min: -10, value: 80 });
      const graphicTexts = (graphic as GraphicComponentTextOption[]).map((element) => element.style?.text);

      const data = progress.data as PieDataItemOption[];
      expect(getValues(data)).to.deep.equal([90, 120]);
      expect(graphicTexts).to.include.members(['80', '-10', '200']);
    });

    it('uses explicit progress color if progressColor is set', () => {
      const { progress } = buildPieSeries({ progressColor: '#aabbcc' });

      const data = progress.data as PieDataItemOption[];
      expect(getColors(data)).to.deep.equal(['#aabbcc', '#e7e7e7']);
    });
  });

  describe('sections series', () => {
    it('uses provided sections configuration', () => {
      const { sections } = buildPieSeries({
        sections: {
          boundaries: [0, 50, 100],
          colors: ['#ff0000', '#00ff00'],
        },
      });

      const data = sections.data as PieDataItemOption[];
      const colors = getColors(data);
      const values = getValues(data);
      expect(colors).to.deep.equal(['#ff0000', 'transparent', '#00ff00']);
      expect(values).to.deep.equal([49.5, 0.5, 50]);
    });

    it('sorts unsorted boundaries before building sections', () => {
      const sorted = buildPieSeries({ sections: { boundaries: [0, 30, 70, 100] } });
      const unsorted = buildPieSeries({ sections: { boundaries: [100, 0, 70, 30] } });
      const sortedData = sorted.sections.data as PieDataItemOption[];
      const unsortedData = unsorted.sections.data as PieDataItemOption[];

      expect(sortedData).to.deep.equal(unsortedData);
    });

    it('at least two boundaries are required', () => {
      const { sections } = buildPieSeries({
        sections: { boundaries: [50] },
      });

      const data = sections.data as PieDataItemOption[];
      expect(data).to.have.lengthOf(0);
    });

    it('cycles colors when fewer colors than sections are provided', () => {
      const { sections } = buildPieSeries({
        sections: {
          boundaries: [0, 25, 50, 75, 100],
          colors: ['#ff0000', '#00ff00'],
        },
      });

      const data = sections.data as PieDataItemOption[];

      const coloredSlices = data.filter((item) => item.itemStyle?.color !== 'transparent');
      expect(getColors(coloredSlices)).to.deep.equal([
        '#ff0000', '#00ff00', '#ff0000', '#00ff00',
      ]);
    });
  });

  describe('automatic progress color from sections', () => {
    const sections = {
      boundaries: [0, 20, 80, 100],
      colors: ['green', 'orange', 'red'],
    };

    it('auto-derives progress color from sections when showSections is true and no explicit color is given', () => {
      const resultStart = buildPieSeries({ sections, showSections: true, value: 10 });
      const resultMid = buildPieSeries({ sections, showSections: true, value: 40 });
      const resultEnd = buildPieSeries({ sections, showSections: true, value: 90 });

      expect(getColors(resultStart.progress.data as PieDataItemOption[])).to.deep.equal(['green', '#e7e7e7']);
      expect(getColors(resultMid.progress.data as PieDataItemOption[])).to.deep.equal(['orange', '#e7e7e7']);
      expect(getColors(resultEnd.progress.data as PieDataItemOption[])).to.deep.equal(['red', '#e7e7e7']);
    });

    it('uses explicit progressColor even when showSections is true', () => {
      const resultStart = buildPieSeries({
        progressColor: 'blue', sections, showSections: true, value: 10,
      });
      const resultMid = buildPieSeries({
        progressColor: 'blue', sections, showSections: true, value: 40,
      });
      const resultEnd = buildPieSeries({
        progressColor: 'blue', sections, showSections: true, value: 90,
      });

      expect(getColors(resultStart.progress.data as PieDataItemOption[])).to.deep.equal(['blue', '#e7e7e7']);
      expect(getColors(resultMid.progress.data as PieDataItemOption[])).to.deep.equal(['blue', '#e7e7e7']);
      expect(getColors(resultEnd.progress.data as PieDataItemOption[])).to.deep.equal(['blue', '#e7e7e7']);
    });

    it('does not auto-derive progress color when showSections is false', () => {
      const { progress } = buildPieSeries({ sections, showSections: false });

      const data = progress.data as PieDataItemOption[];
      expect(getColors(data)).to.deep.equal([undefined, '#e7e7e7']);
    });
  });

  describe('media queries', () => {
    it('produces one media entry per breakpoint', () => {
      const result = buildPieSeries({});

      expect(result.media).to.have.lengthOf(GAUGE_SERIES.BREAKPOINTS.length);
    });
  });

  describe('trend indicator', () => {
    it('renders a trend indicator when showTrend is true', () => {
      const { graphic } = buildPieSeries({ showTrend: true, trend: { value: '5,2%' } });
      const graphics = graphic as GraphicComponentOption[];
      const groups = graphics.filter((el) => el.type === 'group') as GraphicComponentGroupOption[];
      const texts = getGraphicTexts(groups[0].children);
      const image = groups[0].children?.find((el) => el.type === 'image') as GraphicComponentImageOption;
      const iconUp = colorSvgDataUrl(GAUGE_SERIES.TREND_ICON_UP, getRealStyleValue('SynTypographyColorText'));

      expect(groups).to.have.lengthOf(1);
      expect(texts).to.include.members(['5,2%']);
      expect(image).to.not.equal(undefined);
      expect(image.style!.image).to.equal(iconUp);
    });

    it('does not render a group element when showTrend is false', () => {
      const { graphic } = buildPieSeries({ showTrend: false });
      const graphics = graphic as GraphicComponentOption[];
      const groups = graphics.filter((el) => el.type === 'group');
      expect(groups).to.have.lengthOf(0);
    });

    it('uses trend down icon when trend.direction is "down"', () => {
      const { graphic } = buildPieSeries({ showTrend: true, trend: { direction: 'down' } });
      const graphics = graphic as GraphicComponentOption[];
      const groups = graphics.filter((el) => el.type === 'group') as GraphicComponentGroupOption[];
      const image = groups[0].children?.find((el) => el.type === 'image') as GraphicComponentImageOption;

      const iconDown = colorSvgDataUrl(GAUGE_SERIES.TREND_ICON_DOWN, getRealStyleValue('SynTypographyColorText'));
      expect(image.style!.image).to.equal(iconDown);
    });

    it('uses custom trend icon when trend.iconUp is provided', () => {
      const { graphic } = buildPieSeries({ showTrend: true, trend: { iconUp: svgDataUrl } });
      const graphics = graphic as GraphicComponentOption[];
      const groups = graphics.filter((el) => el.type === 'group') as GraphicComponentGroupOption[];
      const image = groups[0].children?.find((el) => el.type === 'image') as GraphicComponentImageOption;
      const coloredIcon = colorSvgDataUrl(svgDataUrl, getRealStyleValue('SynTypographyColorText'));
      expect(image.style!.image).to.equal(coloredIcon);
    });

    it('uses custom trend icon when trend.iconDown is provided', () => {
      const { graphic } = buildPieSeries({ showTrend: true, trend: { direction: 'down', iconDown: svgDataUrl } });
      const graphics = graphic as GraphicComponentOption[];
      const groups = graphics.filter((el) => el.type === 'group') as GraphicComponentGroupOption[];
      const image = groups[0].children?.find((el) => el.type === 'image') as GraphicComponentImageOption;
      const coloredIcon = colorSvgDataUrl(svgDataUrl, getRealStyleValue('SynTypographyColorText'));

      expect(image.style!.image).to.equal(coloredIcon);
    });
  });

  describe('graphic elements', () => {
    it('includes a text elements for the value, min and max label', () => {
      const { graphic } = buildPieSeries({ max: 200, min: -10, value: 42 });
      const graphics = graphic as GraphicComponentTextOption[];
      const texts = getGraphicTexts(graphics);

      expect(graphics.length).to.equal(3);
      expect(texts).to.deep.equal(['42', '-10', '200']);
    });

    it('includes a text element for the unit when unit is non-empty', () => {
      const { graphic } = buildPieSeries({ unit: 'kWh', value: 30 });
      const graphics = graphic as GraphicComponentTextOption[];
      const texts = getGraphicTexts(graphics);
      expect(graphics.length).to.equal(4);
      expect(texts).to.include('kWh');
    });

    it('omits the unit text element when unit is an empty string', () => {
      const { graphic } = buildPieSeries({ unit: '', value: 30 });
      const graphics = graphic as GraphicComponentTextOption[];
      const texts = getGraphicTexts(graphics);

      expect(graphics).to.have.length(3);
      expect(texts).to.not.include('');
    });

    describe('icon rendering', () => {
      it('renders an image element when an icon is provided', () => {
        const { graphic } = buildPieSeries({ icon: svgDataUrl, value: 50 });
        const graphics = graphic as GraphicComponentOption[];

        const images = graphics.filter((el) => el.type === 'image') as GraphicComponentImageOption[];
        expect(images).to.have.length(1);
        expect(images[0].style?.image).to.equal(colorSvgDataUrl(svgDataUrl, getRealStyleValue('SynTypographyColorText')));
      });

      it('does not render an image element when no icon is provided', () => {
        const result = buildPieSeries({ value: 50 });

        const images = (result.graphic as Array<{ type?: string }>).filter((el) => el.type === 'image');
        expect(images).to.have.length(0);
      });

      it('positions icon at LABEL_ICON_TOP_WITH_UNIT when unit is set', () => {
        const { graphic } = buildPieSeries({ icon: 'data:image/svg+xml;base64,PHN2Zy8+', unit: '%', value: 50 });
        const graphics = graphic as GraphicComponentOption[];
        const images = graphics.filter((el) => el.type === 'image') as GraphicComponentImageOption[];
        expect(images[0].top).to.equal(GAUGE_SERIES.LABEL_ICON_TOP_WITH_UNIT);
      });

      it('positions icon at LABEL_ICON_TOP_WITHOUT_UNIT when unit is empty', () => {
        const { graphic } = buildPieSeries({ icon: 'data:image/svg+xml;base64,PHN2Zy8+', unit: '', value: 50 });
        const graphics = graphic as GraphicComponentOption[];
        const images = graphics.filter((el) => el.type === 'image') as GraphicComponentImageOption[];
        expect(images[0].top).to.equal(GAUGE_SERIES.LABEL_ICON_TOP_WITHOUT_UNIT);
      });
    });
  });

  describe('mergeDeep integration', () => {
    it('merges gaugeSeries overrides into the progress series', () => {
      const { progress } = buildPieSeries({ gaugeSeries: { endAngle: 180, startAngle: 0 } });

      expect(progress.startAngle).to.equal(0);
      expect(progress.endAngle).to.equal(180);
    });

    it('merges sectionsSeries overrides into the sections series', () => {
      const { sections } = buildPieSeries({ sectionsSeries: { endAngle: 180, startAngle: 0 } });

      expect(sections.startAngle).to.equal(0);
      expect(sections.endAngle).to.equal(180);
    });
  });
});
