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
import '../../../components/src/components/chart/chart.js';
import { formatter } from '../../../components/src/components/chart/index.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
} from '../../src/helpers/component.js';
import { waitForFinishedChartPlayFunction } from '../../src/playFunction/waitForFinishedCharts.js';
import { chartChromaticConfig } from '../../src/chromatic-config/chromatic-config.js';

declare global {
  interface Window {
    ChartTokens: typeof ChartTokens;
    ComponentTokens: typeof ComponentTokens;
    formatter: typeof formatter;
  }
}

window.ChartTokens = ChartTokens;
window.ComponentTokens = ComponentTokens;
window.formatter = formatter;

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
          <Stories title="" />
        </>
      ),
    },
  },
  play: waitForFinishedChartPlayFunction,
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
        chart.config = handle => handle
        .seriesSegment({
          data: [ 5, 10, 50, 80, 100 ],
          name: 'Contamination',
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
      const charts = document.querySelectorAll('#segment-no-gap');
      charts.forEach(chart => {
        chart.config = handle => handle
        .seriesSegment({
          data: [90, 100, 20, 10, 50, 90, 10, 0, 20, 10, 30, 70, 40, 10, 30, 20],
          gap: 0,
          icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSdjdXJyZW50Q29sb3InPjxwYXRoIGQ9Ik0xMiAyMS41cS0xLjg3MyAwLTMuMTg3LTEuMzE0UTcuNSAxOC44NzQgNy41IDE3cTAtMS4xNDMuNTMtMi4xMTdhNC41NiA0LjU2IDAgMCAxIDEuNDctMS42MTRWNXEwLTEuMDQ4LjcyNi0xLjc3NEEyLjQgMi40IDAgMCAxIDEyIDIuNXExLjA0OCAwIDEuNzc0LjcyNlQxNC41IDV2OC4yN2E0LjU2IDQuNTYgMCAwIDEgMS40NyAxLjYxM3EuNTMuOTc0LjUzIDIuMTE3IDAgMS44NzMtMS4zMTMgMy4xODZRMTMuODczIDIxLjUgMTIgMjEuNW0tMS0xMC4zMDhoMnYtMS4yNWgtMXYtLjg4NGgxVjYuOTQyaC0xdi0uODg0aDFWNWEuOTcuOTcgMCAwIDAtLjI4Ny0uNzEzQS45Ny45NyAwIDAgMCAxMiA0YS45Ny45NyAwIDAgMC0uNzEzLjI4N0EuOTcuOTcgMCAwIDAgMTEgNXoiLz48L3N2Zz4=",
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
          data: [0.9, 1, 0.2, 0.1, 0.5, 0.9, 0.1, 0, 0.4, 1, 0.3],
          min: 0,
          max: 1,
        });
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
