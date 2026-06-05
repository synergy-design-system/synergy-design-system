import { expect } from '@open-wc/testing';
import type { YAXisOption } from 'echarts/types/dist/shared';
import {
  buildAxisLabelConfigWithIcon,
  colorSvgDataUrl,
  extractYAxisLabelTexts,
  measureMaxTextWidth,
  patchAxisConfig,
} from './utilities.js';

const svgDataUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg==';

function decodeBase64DataUrl(dataUrl: string): string {
  const [, base64 = ''] = dataUrl.split(',');
  return atob(base64);
}

describe('chart axis utilities', () => {
  describe('colorSvgDataUrl', () => {
    it('replaces currentColor inside a valid SVG data URL', () => {
      const result = colorSvgDataUrl(svgDataUrl, '#ff0000');

      expect(decodeBase64DataUrl(result)).to.include('#ff0000');
      expect(decodeBase64DataUrl(result)).to.not.include('currentColor');
    });

    it('returns the original value for malformed data URLs', () => {
      const malformed = 'data:image/svg+xml;base64,%%%';

      expect(colorSvgDataUrl(malformed, '#ff0000')).to.equal(malformed);
    });
  });

  describe('extractYAxisLabelTexts', () => {
    it('reads explicit labels from all configured y-axes', () => {
      const result = extractYAxisLabelTexts({
        yAxis: [
          { data: ['Low', 'High'], type: 'category' },
          { data: [10, 20], type: 'category' },
        ],
      });

      expect(result).to.deep.equal(['Low', 'High', '10', '20']);
    });

    it('falls back to numeric series min and max when the y-axis has no data', () => {
      const result = extractYAxisLabelTexts({
        series: [
          { data: [12, 3, 48], type: 'line' },
          { data: ['ignore', 5, null], type: 'line' },
        ],
        yAxis: { type: 'value' },
      });

      expect(result).to.deep.equal(['3', '48']);
    });
  });

  describe('measureMaxTextWidth', () => {
    it('returns 0 for empty input', () => {
      expect(measureMaxTextWidth([], '16px sans-serif')).to.equal(0);
    });

    it('returns a larger width for longer strings', () => {
      const shortWidth = measureMaxTextWidth(['A'], '16px sans-serif');
      const longWidth = measureMaxTextWidth(['Longer label'], '16px sans-serif');

      expect(shortWidth).to.be.greaterThan(0);
      expect(longWidth).to.be.greaterThan(shortWidth);
    });
  });

  describe('patchAxisConfig', () => {
    it('patches only the selected axis indices in axis arrays', () => {
      const result = patchAxisConfig(
        {
          xAxis: [
            { name: 'Bottom', type: 'category' },
            { name: 'Top', type: 'category' },
          ],
        },
        'xAxis',
        { axisLabel: { show: false } },
        { axisIndex: 1 },
      ) as Array<Record<string, unknown>>;

      expect(result[0]).to.deep.equal({ name: 'Bottom', type: 'category' });
      expect(result[1]).to.deep.equal({
        axisLabel: { show: false },
        name: 'Top',
        type: 'category',
      });
    });

    it('keeps single-axis objects unchanged when their index is not selected', () => {
      const axis: YAXisOption = { name: 'Values', type: 'value' };

      const result = patchAxisConfig(
        { yAxis: axis },
        'yAxis',
        { axisLabel: { show: false } },
        { axisIndex: 1 },
      );

      expect(result).to.equal(axis);
    });
  });

  describe('buildAxisLabelConfigWithIcon', () => {
    it('builds top-positioned x-axis icon labels with colorized rich icons', () => {
      const axisLabel = buildAxisLabelConfigWithIcon({
        config: { xAxis: { data: ['Mon'], type: 'category' } },
        iconColor: '#0088cc',
        iconPosition: 'top',
        iconsStyle: { height: 18 },
        iconUrls: [svgDataUrl],
        labelsStyle: { fontSize: 14 },
      }) as unknown as {
        formatter: (value: string, index: number) => string;
        rich: Record<string, { backgroundColor?: { image?: string }; height?: number; padding?: number[] }>;
      };

      expect(axisLabel.formatter('Mon', 0)).to.equal('{icon_0|}\n{label|Mon}');
      expect(axisLabel.rich.label.padding).to.deep.equal([4, 0, 0, 0]);
      expect(axisLabel.rich.icon_0.height).to.equal(18);
      expect(decodeBase64DataUrl(axisLabel.rich.icon_0.backgroundColor!.image!)).to.include('#0088cc');
    });

    it('uses a fallback label width for left-positioned y-axis icons when none is provided', () => {
      const axisLabel = buildAxisLabelConfigWithIcon({
        config: { yAxis: { type: 'value' } },
        iconColor: '#111111',
        iconPosition: 'left',
        iconsStyle: undefined,
        iconUrls: [svgDataUrl],
        labelsStyle: undefined,
      }) as unknown as {
        formatter: (value: string, index: number) => string;
        rich: Record<string, { width?: number | string; padding?: number[] }>;
      };

      expect(axisLabel.formatter('Revenue', 0)).to.equal('{icon_0|}{label|Revenue}');
      expect(axisLabel.rich.label.padding).to.deep.equal([0, 0, 0, 4]);
      expect(axisLabel.rich.label.width).to.equal(30);
    });

    it('respects an explicit label width override for left-positioned y-axis icons', () => {
      const axisLabel = buildAxisLabelConfigWithIcon({
        config: { yAxis: { data: ['One', 'Two'], type: 'category' } },
        iconColor: '#111111',
        iconPosition: 'left',
        iconsStyle: undefined,
        iconUrls: [svgDataUrl],
        labelsStyle: { width: 96 },
      }) as unknown as {
        rich: Record<string, { width?: number | string }>;
      };

      expect(axisLabel.rich.label.width).to.equal(96);
    });
  });
});
