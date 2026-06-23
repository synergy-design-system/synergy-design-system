import { expect } from '@open-wc/testing';
import type { XAXisOption, YAXisOption } from 'echarts/types/dist/shared';
import {
  axesAddXLabelIcons,
  axesAddYLabelIcons,
  axesHideLabels,
  axesHideXLabels,
  axesHideYLabels,
  axesShowSplitLines,
  axesShowXSplitLines,
  axesShowYSplitLines,
} from './presets.js';
import type { ECConfig } from '../../types.js';

function decodeBase64DataUrl(dataUrl: string): string {
  const [, base64 = ''] = dataUrl.split(',');
  return atob(base64);
}

const svgDataUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg==';

describe('chart axes presets', () => {
  describe('axesShowYSplitLines', () => {
    it('enables splitLine visibility on the default y-axis', () => {
      const config: ECConfig = {
        yAxis: { type: 'value' },
      };

      const result = axesShowYSplitLines()(config);

      expect((result.yAxis as YAXisOption).splitLine?.show).to.equal(true);
    });

    it('applies to specific y-axis index', () => {
      const config: ECConfig = {
        yAxis: [
          { splitLine: { show: false }, type: 'value' },
          { splitLine: { show: false }, type: 'value' },
        ],
      };

      const result = axesShowYSplitLines({ axisIndex: 1 })(config);
      const yAxis = result.yAxis as YAXisOption[];

      expect(yAxis[0].splitLine?.show).to.equal(false);
      expect(yAxis[1].splitLine?.show).to.equal(true);
    });

    it('preserves other axis properties', () => {
      const config: ECConfig = {
        yAxis: {
          axisLabel: { show: false },
          name: 'Revenue',
          type: 'value',
        },
      };

      const result = axesShowYSplitLines()(config);
      const yAxis = result.yAxis as YAXisOption;

      expect(yAxis.splitLine?.show).to.equal(true);
      expect(yAxis.name).to.equal('Revenue');
      expect(yAxis.axisLabel?.show).to.equal(false);
    });
  });

  describe('axesShowXSplitLines', () => {
    it('enables splitLine visibility on the default x-axis', () => {
      const config: ECConfig = {
        xAxis: { type: 'category' },
      };

      const result = axesShowXSplitLines()(config);

      expect((result.xAxis as XAXisOption).splitLine?.show).to.equal(true);
    });

    it('applies to specific x-axis index', () => {
      const config: ECConfig = {
        xAxis: [
          { splitLine: { show: false }, type: 'category' },
          { splitLine: { show: false }, type: 'category' },
        ],
      };

      const result = axesShowXSplitLines({ axisIndex: 1 })(config);
      const xAxis = result.xAxis as XAXisOption[];

      expect(xAxis[0].splitLine?.show).to.equal(false);
      expect(xAxis[1].splitLine?.show).to.equal(true);
    });
  });

  describe('axesShowSplitLines', () => {
    it('enables splitLine and axisLine on both x and y axes', () => {
      const config: ECConfig = {
        xAxis: { type: 'category' },
        yAxis: { type: 'value' },
      };

      const result = axesShowSplitLines()(config);

      expect((result.xAxis as XAXisOption).splitLine?.show).to.equal(true);
      expect((result.yAxis as YAXisOption).splitLine?.show).to.equal(true);
      expect((result.xAxis as XAXisOption).axisLine?.show).to.equal(true);
      expect((result.yAxis as YAXisOption).axisLine?.show).to.equal(true);
    });

    it('applies to specific x and y axis indices', () => {
      const config: ECConfig = {
        xAxis: [
          { axisLine: { show: false }, splitLine: { show: false }, type: 'category' },
          { axisLine: { show: false }, splitLine: { show: false }, type: 'category' },
        ],
        yAxis: [
          { axisLine: { show: false }, splitLine: { show: false }, type: 'value' },
          { axisLine: { show: false }, splitLine: { show: false }, type: 'value' },
        ],
      };

      const result = axesShowSplitLines({ xAxisIndex: 1, yAxisIndex: 0 })(config);
      const xAxis = result.xAxis as XAXisOption[];
      const yAxis = result.yAxis as YAXisOption[];

      expect(xAxis[0].splitLine?.show).to.equal(false);
      expect(xAxis[1].splitLine?.show).to.equal(true);
      expect(yAxis[0].splitLine?.show).to.equal(true);
      expect(yAxis[1].splitLine?.show).to.equal(false);
    });
  });

  describe('axesHideXLabels', () => {
    it('hides x-axis labels on the default axis', () => {
      const config: ECConfig = {
        xAxis: { type: 'category' },
      };

      const result = axesHideXLabels()(config);

      expect((result.xAxis as XAXisOption).axisLabel?.show).to.equal(false);
    });

    it('sets nameGap to a small value when hiding x-axis labels', () => {
      const config: ECConfig = {
        xAxis: { type: 'category' },
      };

      const result = axesHideXLabels()(config);
      const { nameGap } = (result.xAxis as XAXisOption);

      expect(nameGap).to.equal(12);
    });

    it('applies to specific x-axis index', () => {
      const config: ECConfig = {
        xAxis: [
          { axisLabel: { show: true }, type: 'category' },
          { axisLabel: { show: true }, type: 'category' },
        ],
      };

      const result = axesHideXLabels({ axisIndex: 1 })(config);
      const xAxis = result.xAxis as XAXisOption[];

      expect(xAxis[0].axisLabel?.show).to.equal(true);
      expect(xAxis[1].axisLabel?.show).to.equal(false);
    });
  });

  describe('axesHideYLabels', () => {
    it('hides y-axis labels on the default axis', () => {
      const config: ECConfig = {
        yAxis: { type: 'value' },
      };

      const result = axesHideYLabels()(config);

      expect((result.yAxis as YAXisOption).axisLabel?.show).to.equal(false);
    });

    it('sets nameTextStyle with left alignment when hiding y-axis labels', () => {
      const config: ECConfig = {
        yAxis: { type: 'value' },
      };

      const result = axesHideYLabels()(config);
      const nameTextStyle = (result.yAxis as YAXisOption).nameTextStyle as Record<string, unknown>;

      expect(nameTextStyle.align).to.equal('left');
    });

    it('hides labels on a specific y-axis index', () => {
      const config: ECConfig = {
        yAxis: [
          { axisLabel: { show: true }, type: 'value' },
          { axisLabel: { show: true }, type: 'value' },
        ],
      };

      const result = axesHideYLabels({ axisIndex: 0 })(config);
      const yAxis = result.yAxis as YAXisOption[];

      expect(yAxis[0].axisLabel?.show).to.equal(false);
      expect(yAxis[1].axisLabel?.show).to.equal(true);
    });

    it('hides labels on multiple y-axis indices', () => {
      const config: ECConfig = {
        yAxis: [
          { type: 'value' },
          { type: 'value' },
          { type: 'value' },
        ],
      };

      const result = axesHideYLabels({ axisIndex: [1, 2] })(config);
      const yAxis = result.yAxis as YAXisOption[];

      expect(yAxis[0].axisLabel?.show).to.equal(undefined);
      expect(yAxis[1].axisLabel?.show).to.equal(false);
      expect(yAxis[2].axisLabel?.show).to.equal(false);
    });

    it('preserves other y-axis properties', () => {
      const config: ECConfig = {
        yAxis: {
          max: 1000,
          min: 0,
          name: 'Revenue',
          type: 'value',
        },
      };

      const result = axesHideYLabels()(config);
      const yAxis = result.yAxis as YAXisOption;

      expect(yAxis.axisLabel?.show).to.equal(false);
      expect(yAxis.name).to.equal('Revenue');
      expect(yAxis.min).to.equal(0);
      expect(yAxis.max).to.equal(1000);
    });
  });

  describe('axesHideLabels', () => {
    it('hides labels on both default x-axis and y-axis', () => {
      const config: ECConfig = {
        xAxis: { type: 'category' },
        yAxis: { type: 'value' },
      };

      const result = axesHideLabels()(config);

      expect((result.xAxis as XAXisOption).axisLabel?.show).to.equal(false);
      expect((result.yAxis as YAXisOption).axisLabel?.show).to.equal(false);
    });

    it('hides labels on specific x and y axis indices', () => {
      const config: ECConfig = {
        xAxis: [
          { axisLabel: { show: true }, type: 'category' },
          { axisLabel: { show: true }, type: 'category' },
        ],
        yAxis: [
          { axisLabel: { show: true }, type: 'value' },
          { axisLabel: { show: true }, type: 'value' },
        ],
      };

      const result = axesHideLabels({ xAxisIndex: 1, yAxisIndex: 0 })(config);
      const xAxis = result.xAxis as XAXisOption[];
      const yAxis = result.yAxis as YAXisOption[];

      expect(xAxis[0].axisLabel?.show).to.equal(true);
      expect(xAxis[1].axisLabel?.show).to.equal(false);
      expect(yAxis[0].axisLabel?.show).to.equal(false);
      expect(yAxis[1].axisLabel?.show).to.equal(true);
    });

    it('hides labels on multiple indices for both axes', () => {
      const config: ECConfig = {
        xAxis: [
          { type: 'category' },
          { type: 'category' },
          { type: 'category' },
        ],
        yAxis: [
          { type: 'value' },
          { type: 'value' },
        ],
      };

      const result = axesHideLabels({ xAxisIndex: [0, 2], yAxisIndex: [1] })(config);
      const xAxis = result.xAxis as XAXisOption[];
      const yAxis = result.yAxis as YAXisOption[];

      expect(xAxis[0].axisLabel?.show).to.equal(false);
      expect(xAxis[1].axisLabel?.show).to.equal(undefined);
      expect(xAxis[2].axisLabel?.show).to.equal(false);
      expect(yAxis[0].axisLabel?.show).to.equal(undefined);
      expect(yAxis[1].axisLabel?.show).to.equal(false);
    });

    it('applies y-axis-specific nameTextStyle to all specified y-axes', () => {
      const config: ECConfig = {
        xAxis: { type: 'category' },
        yAxis: [
          { type: 'value' },
          { type: 'value' },
        ],
      };

      const result = axesHideLabels({ yAxisIndex: [0, 1] })(config);
      const yAxis = result.yAxis as YAXisOption[];

      expect((yAxis[0].nameTextStyle!).align).to.equal('left');
      expect((yAxis[1].nameTextStyle!).align).to.equal('left');
    });
  });

  describe('axesAddXLabelIcons', () => {
    it('adds icons to x-axis labels at the default top position', () => {
      const config: ECConfig = {
        xAxis: { data: ['Mon', 'Tue'], type: 'category' },
      };

      const result = axesAddXLabelIcons({ iconUrls: [svgDataUrl, svgDataUrl] })(config);
      const xAxis = result.xAxis as XAXisOption;
      expect(xAxis.axisLabel).to.exist;
      expect(xAxis.axisLabel?.rich).to.exist;
      const rich = xAxis.axisLabel!.rich!;
      const keys = Object.keys(rich);
      expect(keys).to.deep.equal(['label', 'icon_0', 'icon_1']);
      expect(xAxis.axisLabel?.formatter).to.be.a('function');
    });

    it('uses the provided icon color when specified', () => {
      const config: ECConfig = {
        xAxis: { data: ['Mon'], type: 'category' },
      };

      const customColor = '#ff5500';
      const result = axesAddXLabelIcons({
        iconColor: customColor,
        iconUrls: [svgDataUrl],
      })(config);

      const axisLabel = (result.xAxis as XAXisOption).axisLabel!;
      const rich = axisLabel.rich!;
      const icon = rich.icon_0;
      const bgImage = icon.backgroundColor as { image: string };

      expect(decodeBase64DataUrl(bgImage.image)).to.include(customColor);
    });

    it('positions icons at the top when specified', () => {
      const config: ECConfig = {
        xAxis: { data: ['Mon', 'Tue'], type: 'category' },
      };

      const result = axesAddXLabelIcons({
        iconPosition: 'top',
        iconUrls: [svgDataUrl, svgDataUrl],
      })(config);

      const axisLabel = (result.xAxis as XAXisOption).axisLabel!;
      const formatter = axisLabel.formatter as (value: string, index: number) => string;

      expect(formatter('Mon', 0)).to.include('{icon_0|}');
      expect(formatter('Mon', 0)).to.include('\n{label|Mon}');
    });

    it('positions icons at the bottom when specified', () => {
      const config: ECConfig = {
        xAxis: { data: ['Mon', 'Tue'], type: 'category' },
      };

      const result = axesAddXLabelIcons({
        iconPosition: 'bottom',
        iconUrls: [svgDataUrl, svgDataUrl],
      })(config);

      const axisLabel = (result.xAxis as XAXisOption).axisLabel!;
      const formatter = axisLabel.formatter as (value: string, index: number) => string;

      expect(formatter('Mon', 0)).to.include('{label|Mon}');
      expect(formatter('Mon', 0)).to.include('\n{icon_0|}');
    });

    it('applies icons to a specific x-axis index', () => {
      const config: ECConfig = {
        xAxis: [
          { axisLabel: { show: true }, data: ['Mon'], type: 'category' },
          { axisLabel: { show: true }, data: ['Mon'], type: 'category' },
        ],
      };

      const result = axesAddXLabelIcons({
        axisIndex: 1,
        iconUrls: [svgDataUrl],
      })(config);

      const xAxis = result.xAxis as XAXisOption[];
      const xAxisLabel0 = xAxis[0].axisLabel!;
      const xAxisLabel1 = xAxis[1].axisLabel!;

      expect(xAxisLabel1).to.have.property('rich');
      expect(xAxisLabel1).to.have.property('formatter');
      expect(xAxisLabel0).to.not.have.property('rich');
      expect(xAxisLabel0).to.not.have.property('formatter');
    });

    it('applies icons to multiple x-axis indices', () => {
      const config: ECConfig = {
        xAxis: [
          { data: ['Mon'], type: 'category' },
          { data: ['Mon'], type: 'category' },
          { data: ['Mon'], type: 'category' },
        ],
      };

      const result = axesAddXLabelIcons({
        axisIndex: [0, 2],
        iconUrls: [svgDataUrl],
      })(config);

      const xAxis = result.xAxis as XAXisOption[];
      expect(xAxis[0].axisLabel).to.be.an('object');
      expect(xAxis[1].axisLabel).to.equal(undefined);
      expect(xAxis[2].axisLabel).to.be.an('object');
    });

    it('applies custom icon styles when provided', () => {
      const config: ECConfig = {
        xAxis: { data: ['Mon'], type: 'category' },
      };

      const result = axesAddXLabelIcons({
        iconsStyle: { height: 24, width: 24 },
        iconUrls: [svgDataUrl],
      })(config);

      const axisLabel = (result.xAxis as XAXisOption).axisLabel!;
      const rich = axisLabel.rich!;
      const icon = rich.icon_0;

      expect(icon.height).to.equal(24);
      expect(icon.width).to.equal(24);
    });

    it('applies custom label styles when provided', () => {
      const config: ECConfig = {
        xAxis: { data: ['Mon'], type: 'category' },
      };

      const result = axesAddXLabelIcons({
        iconUrls: [svgDataUrl],
        labelsStyle: { fontSize: 16, fontWeight: 'bold' },
      })(config);

      const axisLabel = (result.xAxis as XAXisOption).axisLabel!;
      const rich = axisLabel.rich!;
      const { label } = rich;

      expect(label.fontSize).to.equal(16);
      expect(label.fontWeight).to.equal('bold');
    });

    it('leaves unmatched labels without icons when fewer icons than labels', () => {
      const config: ECConfig = {
        xAxis: { data: ['Mon', 'Tue', 'Wed'], type: 'category' },
      };

      const result = axesAddXLabelIcons({
        iconUrls: [svgDataUrl], // Only one icon for three labels
      })(config);

      const axisLabel = (result.xAxis as XAXisOption).axisLabel!;
      const rich = axisLabel.rich!;
      expect(Object.keys(rich)).to.deep.equal(['label', 'icon_0']);
    });
  });

  describe('axesAddYLabelIcons', () => {
    it('adds icons to y-axis labels at the default left position', () => {
      const config: ECConfig = {
        yAxis: { type: 'value' },
      };

      const result = axesAddYLabelIcons({ iconUrls: [svgDataUrl, svgDataUrl] })(config);
      const yAxis = result.yAxis as YAXisOption;

      expect(yAxis.axisLabel).to.exist;
      expect(yAxis.axisLabel?.rich).to.exist;
      const rich = yAxis.axisLabel!.rich!;
      const keys = Object.keys(rich);
      expect(keys).to.deep.equal(['label', 'icon_0', 'icon_1']);
      expect(yAxis.axisLabel?.formatter).to.be.a('function');
    });

    it('uses the provided icon color when specified', () => {
      const config: ECConfig = {
        yAxis: { type: 'value' },
      };

      const customColor = '#00cc99';
      const result = axesAddYLabelIcons({
        iconColor: customColor,
        iconUrls: [svgDataUrl],
      })(config);

      const axisLabel = (result.yAxis as YAXisOption).axisLabel!;
      const rich = axisLabel.rich!;
      const icon = rich.icon_0;
      const bgImage = icon.backgroundColor as { image: string };

      expect(decodeBase64DataUrl(bgImage.image)).to.include(customColor);
    });

    it('positions icons on the left when specified', () => {
      const config: ECConfig = {
        yAxis: { type: 'value' },
      };

      const result = axesAddYLabelIcons({
        iconPosition: 'left',
        iconUrls: [svgDataUrl],
      })(config);

      const axisLabel = (result.yAxis as YAXisOption).axisLabel!;
      const formatter = axisLabel.formatter as (value: string, index: number) => string;

      expect(formatter('Revenue', 0)).to.include('{icon_0|}{label|Revenue}');
    });

    it('positions icons on the right when specified', () => {
      const config: ECConfig = {
        yAxis: { type: 'value' },
      };

      const result = axesAddYLabelIcons({
        iconPosition: 'right',
        iconUrls: [svgDataUrl],
      })(config);

      const axisLabel = (result.yAxis as YAXisOption).axisLabel!;
      const formatter = axisLabel.formatter as (value: string, index: number) => string;

      expect(formatter('Revenue', 0)).to.include('{label|Revenue}{icon_0|}');
    });

    it('applies icons to a specific y-axis index', () => {
      const config: ECConfig = {
        yAxis: [
          { axisLabel: { show: true }, type: 'value' },
          { axisLabel: { show: true }, type: 'value' },
        ],
      };

      const result = axesAddYLabelIcons({
        axisIndex: 0,
        iconUrls: [svgDataUrl],
      })(config);

      const yAxisLabel0 = (result.yAxis as YAXisOption[])[0].axisLabel!;
      const yAxisLabel1 = (result.yAxis as YAXisOption[])[1].axisLabel!;

      expect(yAxisLabel0).to.have.property('rich');
      expect(yAxisLabel0).to.have.property('formatter');
      expect(yAxisLabel1).to.not.have.property('rich');
      expect(yAxisLabel1).to.not.have.property('formatter');
    });

    it('applies icons to multiple y-axis indices', () => {
      const config: ECConfig = {
        yAxis: [
          { type: 'value' },
          { type: 'value' },
          { type: 'value' },
        ],
      };

      const result = axesAddYLabelIcons({
        axisIndex: [0, 2],
        iconUrls: [svgDataUrl],
      })(config);

      const yAxis = result.yAxis as YAXisOption[];
      expect(yAxis[0].axisLabel).to.be.an('object');
      expect(yAxis[1].axisLabel).to.equal(undefined);
      expect(yAxis[2].axisLabel).to.be.an('object');
    });

    it('applies custom icon styles when provided', () => {
      const config: ECConfig = {
        yAxis: { type: 'value' },
      };

      const result = axesAddYLabelIcons({
        iconsStyle: { height: 20, width: 20 },
        iconUrls: [svgDataUrl],
      })(config);

      const axisLabel = (result.yAxis as YAXisOption).axisLabel!;
      const rich = axisLabel.rich!;
      const icon = rich.icon_0;

      expect(icon.height).to.equal(20);
      expect(icon.width).to.equal(20);
    });

    it('applies custom label styles when provided', () => {
      const config: ECConfig = {
        yAxis: { type: 'value' },
      };

      const result = axesAddYLabelIcons({
        iconUrls: [svgDataUrl],
        labelsStyle: { color: '#333333', fontSize: 14 },
      })(config);

      const axisLabel = (result.yAxis as YAXisOption).axisLabel!;
      const rich = axisLabel.rich!;
      const { label } = rich;

      expect(label.fontSize).to.equal(14);
      expect(label.color).to.equal('#333333');
    });

    it('leaves unmatched labels without icons when fewer icons than labels', () => {
      const config: ECConfig = {
        yAxis: { data: ['Low', 'Medium', 'High'], type: 'category' },
      };

      const result = axesAddYLabelIcons({
        iconUrls: [svgDataUrl], // Only one icon for three labels
      })(config);

      const axisLabel = (result.yAxis as YAXisOption).axisLabel!;
      const rich = axisLabel.rich!;

      expect(Object.keys(rich)).to.deep.equal(['label', 'icon_0']);
    });
  });
});
