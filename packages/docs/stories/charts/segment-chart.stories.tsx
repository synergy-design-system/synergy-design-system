import React from 'react';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import {
  Description,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import { ResolvedTokens as ChartTokens } from '@synergy-design-system/tokens/charts/resolved';
import { ResolvedTokens as ComponentTokens } from '@synergy-design-system/tokens/resolved';
import isChromatic from 'chromatic';
import '../../../components/src/components/chart/chart.js';
import { expect, waitFor } from 'storybook/test';
import { getIconDataURL } from '../../../components/src/utilities/icon-library.js';
import type SynChart from '../../../components/src/components/chart/chart.js';
import { formatter } from '../../../components/src/components/chart/index.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
} from '../../src/helpers/component.js';
import { ChartSeriesDocumentation } from '../../src/helpers/chart-series-documentation.js';
import { chartChromaticConfig } from '../../src/chromatic-config/chromatic-config.js';

declare global {
  interface Window {
    ChartTokens: typeof ChartTokens;
    ComponentTokens: typeof ComponentTokens;
    formatter: typeof formatter;
    getIconDataURL: typeof getIconDataURL;
  }
}

window.ChartTokens = ChartTokens;
window.ComponentTokens = ComponentTokens;
window.formatter = formatter;
window.getIconDataURL = getIconDataURL;

const meta: Meta = {
  component: 'syn-chart',
  parameters: {
    chromatic: {
      ...chartChromaticConfig,
    },
    docs: {
      description: {
        component: generateStoryDescription('chart', 'segment-series-default'),
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <ChartSeriesDocumentation section="Segment series presets" />
          <Stories title="" />
        </>
      ),
    },
  },
  tags: ['Charting', 'Data Visualization'],
  title: 'Charts/Series Types/Segment Chart',
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'segment-series-preset'),
      },
    },
  },
  render: () => html`
    <syn-chart id="segment-preset"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#segment-preset');

      charts.forEach(chart => {
        chart.config = {
          series: [
            {
              type: 'synSegment',
              data: [5, 10, 50, 80, 100],
            }
          ]
        };
      });
    </script>
  `,
};

export const Name: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'segment-series-name'),
      },
    },
  },
  render: () => html`
    <syn-chart id="segment-name"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#segment-name');
      charts.forEach(chart => {
        const halfChartSize =  () => Math.min(chart.offsetWidth, chart.offsetHeight) / 2;
        let nameWidth = halfChartSize();
        chart.config = handle => handle
          .seriesSegment({
            data: [ 5, 10, 50, 80, 100 ],
            name: 'This is a very long name',
            nameTextStyle: {
              overflow: 'break',
              width: nameWidth
            }
          });

        setTimeout(() => {
          const instance = chart.getInstance();
          // Adapt the name width when the chart is resized, so it breaks correctly
          window.addEventListener('resize', () => {
            nameWidth = halfChartSize();
            instance.setOption({ series:[ { nameTextStyle: { width: nameWidth  } } ]});
          });
        });
      });
    </script>
  `,
};

export const CustomColors: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'segment-series-colors'),
      },
    },
  },
  render: () => html`
    <syn-chart id="segment-colors"></syn-chart>
    <script type="module">
      // To use Synergy chart colors, import the resolved chart tokens. The chart
      // configuration currently requires hex values, which can be retrieved
      // directly from the chart tokens object:
      //
      // import { ResolvedTokens as ChartTokens } from '@synergy-design-system/tokens/charts/resolved';

      const charts = document.querySelectorAll('#segment-colors');
      const getChartColor = (token) => {
        return ChartTokens[token]['light'];
      };

      charts.forEach(chart => {
        chart.config = handle => handle
        .baseConfig({
          color: [
            getChartColor('SynChartSequential01_100'),
            getChartColor('SynChartSequential01_90'),
            getChartColor('SynChartSequential01_80'),
            getChartColor('SynChartSequential01_70'),
            getChartColor('SynChartSequential01_60'),
            getChartColor('SynChartSequential01_50'),
            getChartColor('SynChartSequential01_40')
          ]
          })
        .seriesSegment({
          data: [ 70, 80, 90, 75, 60, 50 ],
        });
      });
    </script>
  `,
};

export const LabelFormatting: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'segment-series-label-formatting'),
      },
    },
  },
  render: () => html`
    <syn-chart id="segment-label-formatting"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#segment-label-formatting');

      charts.forEach(chart => {
        chart.config = handle => handle
        .seriesSegment({
            data: [
            {
              value: 70,
              label: 'Custom string',
            },
            {
              value: 70,
              label: undefined,
            },
            {
              value: 70,
              label: formatter.unitFormatter('ms'),
            },
            {
              value: 70,
              label: formatter.numberShorthandFormatter(),
            },
            {
              value: 70,
              label: formatter.numberFormatter(undefined, { minimumFractionDigits: 2 }),
            },
            {
              value: 70,
            },
          ],
        });
      });
    </script>
  `,
};

export const Gap: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'segment-series-gap'),
      },
    },
  },
  render: () => html`
    <syn-chart id="segment-gap"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#segment-gap');

      charts.forEach(chart => {
        chart.config = handle => handle
        .seriesSegment({
          data: [ 5, 10, 50, 80, 100 ],
          gap: 0.5,
          gapOrientation: 90,
        });
      });
    </script>
  `,
};

export const NoGap: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'segment-series-no-gap'),
      },
    },
  },
  render: () => html`
    <syn-chart id="segment-no-gap"></syn-chart>
    <script type="module">
      // Import getIconDataURL from '@synergy-design-system/components/utilities/icon-library.js'.
      const icon = await getIconDataURL('device_thermostat');
      const charts = document.querySelectorAll('#segment-no-gap');
      charts.forEach(chart => {
        chart.config = handle => handle
        .seriesSegment({
          data: [90, 100, 20, 10, 50, 90, 10, 0, 20, 10, 30, 70, 40, 10, 30, 20],
          gap: 0,
          icon,
        });
      });
    </script>
  `,
};

export const MinMax: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'segment-series-min-max'),
      },
    },
  },
  render: () => html`
    <syn-chart id="segment-min-max"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#segment-min-max');
      charts.forEach(chart => {
        chart.config = handle => handle
        .seriesSegment({
          top: 80,
          min: -5,
          max: 20,
          data: [
            { value: -1, name: 'January', label: formatter.unitFormatter('°C') },
            { value: 2, name: 'February', label: formatter.unitFormatter('°C') },
            { value: 5, name: 'March', label: formatter.unitFormatter('°C') },
            { value: 9, name: 'April', label: formatter.unitFormatter('°C') },
            { value: 14, name: 'May', label: formatter.unitFormatter('°C') },
            { value: 17, name: 'June', label: formatter.unitFormatter('°C') },
            { value: 19, name: 'July', label: formatter.unitFormatter('°C') },
            { value: 18, name: 'August', label: formatter.unitFormatter('°C') },
            { value: 14, name: 'September', label: formatter.unitFormatter('°C') },
            { value: 10, name: 'October', label: formatter.unitFormatter('°C') },
            { value: 5, name: 'November', label: formatter.unitFormatter('°C') },
            { value: -0.5, name: 'December', label: formatter.unitFormatter('°C') },
          ],
          name: 'Temperature',
        }).legendShow();
      });
    </script>
  `,
};

export const Weights: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'segment-series-weights'),
      },
    },
  },
  render: () => html`
    <syn-chart id="segment-weights"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#segment-weights');

      charts.forEach(chart => {
        chart.config = handle => handle
        .seriesSegment({
            data: [
            {
              label: formatter.unitFormatter('%'),
              value: 15,
              weight: 0.2,
            },
            {
              label: formatter.unitFormatter('%'),
              value: 30,
            },
            {
              label: formatter.unitFormatter('%'),
              value: 50,
              weight: 0.5,
            },
            {
              label: formatter.unitFormatter('%'),
              value: 80,
              weight: 0.3
            },
            {
              label: formatter.unitFormatter('%'),
              value: 70,
              weight: 0.7,
            },
          ],
        });
      });
    </script>
  `,
};

export const CustomStyling: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'segment-series-styling'),
      },
    },
  },
  render: () => html`
    <syn-chart id="segment-styling"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#segment-styling');

      const getColor = (token) => {
        return ComponentTokens[token]['light'];
      };

      charts.forEach(chart => {
        chart.config = handle => handle
        .seriesSegment({
          data: [
            {
              value: 60,
              itemStyle: {
                color: getColor('SynNamurErrorColor'),
              },
              label: 'one',
              labelTextStyle: {
                fill: getColor('SynNamurErrorColor'),
              },
            },
            {
              value: 30,
              itemStyle: {
                color: getColor('SynNamurWarningColor'),
                borderWidth: 1,
              },
              label: 'two',
              labelTextStyle: {
                fill: getColor('SynNamurWarningColor'),
              },
            },
            {
              value: 50,
              backgroundStyle: {
                 color: getColor('SynColorNeutral200'),
              },
              itemStyle: {
                borderColor: getColor('SynNamurErrorColor'),
                borderWidth: 3,
                color: getColor('SynNamurSuccessColor'),
              },
              label: 'three',
              labelTextStyle: {
                fill: getColor('SynNamurSuccessColor'),
                fontSize: 24
              },
            },
          ],
          itemStyle: {
              color: getColor('SynNamurNeutralColor'),
              borderColor: getColor('SynColorNeutral950'),
              borderWidth: 1,
          },
          backgroundStyle: {
            color: getColor('SynColorNeutral100'),
          },
          labelTextStyle: {
            fontSize: 12,
          }
        });
      });
    </script>
  `,
};

export const Insets: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'segment-series-insets'),
      },
    },
  },
  render: () => html`
    <syn-chart id="segment-insets"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#segment-insets');

      charts.forEach(chart => {
        chart.config = handle => handle
        .seriesSegment({
          top: 20,
          right: 30,
          bottom: '20%',
          left: 60,
          data: [10, 20, 30, 40],
        });
      });
    </script>
  `,
};

export const WithLegend: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'segment-series-legend'),
      },
    },
  },
  render: () => html`
    <syn-chart id="segment-legend"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#segment-legend');

      charts.forEach(chart => {
        chart.config = handle => handle
        .seriesSegment({
          data: [
            {
              value: 15,
              name: 'One',
            },
            {
              value: 30,
              name: 'Two',
            },
            {
              value: 50,
              name: 'Three',
            },
            {
              value: 80,
              name: 'Four',
            },
          ],
          top: 20
        })
        .legendShow()
        ;
      });
    </script>
  `,
};

export const Tooltip: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    docs: { description: { story: generateStoryDescription('chart', 'segment-series-tooltip') } },
  },
  play: async ({ canvasElement }) => {
    if (!isChromatic()) return;

    const chart = canvasElement.querySelector<SynChart>('#segment-tooltip');
    if (!chart) return;

    // Wait for the inline module's config and the switch to the SVG instance.
    await waitFor(async () => {
      await expect(chart.getInstance()?.getOption()).toMatchObject({
        series: [{ type: 'synSegment' }],
      });
    }, { timeout: 5000 });

    const instance = chart.getInstance()!;
    const showTooltip = () => {
      instance.dispatchAction({ dataIndex: 0, seriesIndex: 0, type: 'showTip' });
    };

    // Storybook applies the theme after play, which redraws the chart and removes the tooltip.
    instance.on('finished', showTooltip);
    showTooltip();
  },
  render: () => html`
    <syn-chart id="segment-tooltip"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#segment-tooltip');

      charts.forEach(chart => {
        chart.config = handle => handle
          .seriesSegment({
            data: [
              { name: 'Temperature', value: 70 },
              { name: 'Pressure', value: 30 },
              { name: 'Humidity', value: 50 },
            ],
          })
          .tooltipShow();
      });
    </script>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Name,
  CustomColors,
  LabelFormatting,
  Gap,
  NoGap,
  MinMax,
  Weights,
  CustomStyling,
  Insets,
  WithLegend,
}, 200);
/* eslint-enable sort-keys */
