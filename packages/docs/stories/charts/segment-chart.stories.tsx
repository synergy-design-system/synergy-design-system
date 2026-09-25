import React from 'react';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import {
  Description,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import '../../../components/src/components/chart/chart.js';
import { formatter } from '../../../components/src/components/chart/index.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
} from '../../src/helpers/component.js';
import { Chromatic_Modes_Sick_2025 } from '../../.storybook/modes.js';
import { waitForFinishedChartPlayFunction } from '../../src/playFunction/waitForFinishedCharts.js';

declare global {
  interface Window {
    formatter: typeof formatter;
  }
}

window.formatter = formatter;

const meta: Meta = {
  component: 'syn-chart',
  parameters: {
    chromatic: {
      modes: Chromatic_Modes_Sick_2025,
    },
    docs: {
      description: {
        component: generateStoryDescription('chart', 'segment-chart-series-default'),
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
        story: generateStoryDescription('chart', 'segment-chart-series-preset'),
      },
    },
  },
  render: () => html`
    <syn-chart id="segment-chart-preset"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#segment-chart-preset');

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

export const Gap: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'segment-chart-series-gap'),
      },
    },
  },
  render: () => html`
    <syn-chart id="segment-chart-half"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#segment-chart-half');

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
        story: generateStoryDescription('chart', 'segment-chart-series-gap'),
      },
    },
  },
  render: () => html`
    <syn-chart id="segment-chart-no-gap"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#segment-chart-no-gap');
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
        story: generateStoryDescription('chart', 'segment-chart-series-gap'),
      },
    },
  },
  render: () => html`
    <syn-chart id="segment-chart-no-gap"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#segment-chart-no-gap');
      charts.forEach(chart => {
        chart.config = handle => handle
        .seriesSegment({
          data: [0.9, 1, 0.2, 0.1, 0.5, 0.9, 0.1, 0, 0.4, 1, 0.3],
          min: 0,
          max: 1,
          icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSdjdXJyZW50Q29sb3InPjxwYXRoIGQ9Ik0xMiAyMS41cS0xLjg3MyAwLTMuMTg3LTEuMzE0UTcuNSAxOC44NzQgNy41IDE3cTAtMS4xNDMuNTMtMi4xMTdhNC41NiA0LjU2IDAgMCAxIDEuNDctMS42MTRWNXEwLTEuMDQ4LjcyNi0xLjc3NEEyLjQgMi40IDAgMCAxIDEyIDIuNXExLjA0OCAwIDEuNzc0LjcyNlQxNC41IDV2OC4yN2E0LjU2IDQuNTYgMCAwIDEgMS40NyAxLjYxM3EuNTMuOTc0LjUzIDIuMTE3IDAgMS44NzMtMS4zMTMgMy4xODZRMTMuODczIDIxLjUgMTIgMjEuNW0tMS0xMC4zMDhoMnYtMS4yNWgtMXYtLjg4NGgxVjYuOTQyaC0xdi0uODg0aDFWNWEuOTcuOTcgMCAwIDAtLjI4Ny0uNzEzQS45Ny45NyAwIDAgMCAxMiA0YS45Ny45NyAwIDAgMC0uNzEzLjI4N0EuOTcuOTcgMCAwIDAgMTEgNXoiLz48L3N2Zz4=",
        });
      });
    </script>
  `,
};

export const LabelFormatting: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'segment-chart-series-gap'),
      },
    },
  },
  render: () => html`
    <syn-chart id="segment-chart-half"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#segment-chart-half');

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

export const Weights: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'segment-chart-series-gap'),
      },
    },
  },
  render: () => html`
    <syn-chart id="segment-chart-half"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#segment-chart-half');

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
        story: generateStoryDescription('chart', 'segment-chart-series-styling'),
      },
    },
  },
  render: () => html`
    <syn-chart id="segment-chart-custom"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#segment-chart-custom');

      charts.forEach(chart => {
        chart.config = handle => handle
        .seriesSegment({
          data: [
            { 
              value: 60,
              itemStyle: {
                color: '#D98CAE',
                borderColor: '#C7A75B',
                borderWidth: 2,
              },
              label: 'one',
              labelTextStyle: {
                fill: '#C7226B',
              },
            },
            { 
              value: 30,
              itemStyle: {
                borderColor: '#D6293E',
                borderWidth: 1,
              },
              label: 'two',
              labelTextStyle: {
                fill: '#D6293E',
              },
            },
            { 
              value: 50,
              backgroundStyle: {
                color: '#ccc',
              },
              itemStyle: {
                color: '#fff7d3',
              },
              label: 'three',
              labelTextStyle: {
                fill: '#9AA0A6',
              },
            },
            { 
              value: 80,
              itemStyle: {
                color: '#7C9A6B',
              },
              label: 'four',
              labelTextStyle: {
                fill: '#4C7A3D',
              },
            },
          ],
          icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSdjdXJyZW50Q29sb3InPjxwYXRoIGQ9Ik0xMiAyMS41cS0xLjg3MyAwLTMuMTg3LTEuMzE0UTcuNSAxOC44NzQgNy41IDE3cTAtMS4xNDMuNTMtMi4xMTdhNC41NiA0LjU2IDAgMCAxIDEuNDctMS42MTRWNXEwLTEuMDQ4LjcyNi0xLjc3NEEyLjQgMi40IDAgMCAxIDEyIDIuNXExLjA0OCAwIDEuNzc0LjcyNlQxNC41IDV2OC4yN2E0LjU2IDQuNTYgMCAwIDEgMS40NyAxLjYxM3EuNTMuOTc0LjUzIDIuMTE3IDAgMS44NzMtMS4zMTMgMy4xODZRMTMuODczIDIxLjUgMTIgMjEuNW0tMS0xMC4zMDhoMnYtMS4yNWgtMXYtLjg4NGgxVjYuOTQyaC0xdi0uODg0aDFWNWEuOTcuOTcgMCAwIDAtLjI4Ny0uNzEzQS45Ny45NyAwIDAgMCAxMiA0YS45Ny45NyAwIDAgMC0uNzEzLjI4N0EuOTcuOTcgMCAwIDAgMTEgNXoiLz48L3N2Zz4=",
          backgroundStyle: {
            color: '#e7e7e7',
          },
        });
      });
    </script>
  `,
};

export const WithLegend: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'segment-chart-series-gap'),
      },
    },
  },
  render: () => html`
    <syn-chart id="segment-chart-half"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#segment-chart-half');

      charts.forEach(chart => {
        chart.config = handle => handle
        .seriesSegment({
          data: [
          {
            value: 5,
            name: 'Five',
          },
          {
            value: 10,
            name: 'Ten',
          },
          {
            value: 50,
            name: 'Fifty',
          },
          {
            value: 80,
            name: 'Eighty',
          },
          {
            value: 100,
            name: 'One Hundred',
          },
        ],
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
  Gap,
  NoGap,
  MinMax,
  LabelFormatting,
  Weights,
  CustomStyling,
  WithLegend,
}, 700);
/* eslint-enable sort-keys */
