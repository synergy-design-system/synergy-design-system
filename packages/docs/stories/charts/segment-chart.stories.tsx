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
import {
  generateScreenshotStory,
  generateStoryDescription,
} from '../../src/helpers/component.js';
import { Chromatic_Modes_Sick_2025 } from '../../.storybook/modes.js';
import { waitForFinishedChartPlayFunction } from '../../src/playFunction/waitForFinishedCharts.js';

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
              type: 'synergySegmentChart',
              data: [5, 10, 50, 80, 100],
              weights: [1, 1, 1.5, 1.2, 1.6],
              segmentLabels: ['5%', '10%', '50%', '80%', '100%'],
            }
          ]
        };
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
        .seriesSegmentChart({
          data: [0.9, 1, 0.2, 0.1, 0.5, 0.9, 0.1, 0, 0.2, 1, 0.3, 0.7, 0.4, 0.1, 0.3, 0.2],
          weights: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          min: 0,
          max: 1,
          gap: 0,
          icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSdjdXJyZW50Q29sb3InPjxwYXRoIGQ9Ik0xMiAyMS41cS0xLjg3MyAwLTMuMTg3LTEuMzE0UTcuNSAxOC44NzQgNy41IDE3cTAtMS4xNDMuNTMtMi4xMTdhNC41NiA0LjU2IDAgMCAxIDEuNDctMS42MTRWNXEwLTEuMDQ4LjcyNi0xLjc3NEEyLjQgMi40IDAgMCAxIDEyIDIuNXExLjA0OCAwIDEuNzc0LjcyNlQxNC41IDV2OC4yN2E0LjU2IDQuNTYgMCAwIDEgMS40NyAxLjYxM3EuNTMuOTc0LjUzIDIuMTE3IDAgMS44NzMtMS4zMTMgMy4xODZRMTMuODczIDIxLjUgMTIgMjEuNW0tMS0xMC4zMDhoMnYtMS4yNWgtMXYtLjg4NGgxVjYuOTQyaC0xdi0uODg0aDFWNWEuOTcuOTcgMCAwIDAtLjI4Ny0uNzEzQS45Ny45NyAwIDAgMCAxMiA0YS45Ny45NyAwIDAgMC0uNzEzLjI4N0EuOTcuOTcgMCAwIDAgMTEgNXoiLz48L3N2Zz4=",
        });
      });
    </script>
  `,
};

export const HalfCircle: Story = {
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
        .seriesSegmentChart({
          data: [5, 10, 50, 80, 100],
          weights: [1, 1, 1.5, 1.2, 1.6],
          segmentLabels: ['5%', '10%', '50%', '80%', '100%'],
          gap: 0.5,
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
        .seriesSegmentChart({
          data: [100, 30, 0, 100],
          weights: [1, 1, 1, 1],
          mainLabel: 'Contamination',
          icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSdjdXJyZW50Q29sb3InPjxwYXRoIGQ9Ik0xMiAyMS41cS0xLjg3MyAwLTMuMTg3LTEuMzE0UTcuNSAxOC44NzQgNy41IDE3cTAtMS4xNDMuNTMtMi4xMTdhNC41NiA0LjU2IDAgMCAxIDEuNDctMS42MTRWNXEwLTEuMDQ4LjcyNi0xLjc3NEEyLjQgMi40IDAgMCAxIDEyIDIuNXExLjA0OCAwIDEuNzc0LjcyNlQxNC41IDV2OC4yN2E0LjU2IDQuNTYgMCAwIDEgMS40NyAxLjYxM3EuNTMuOTc0LjUzIDIuMTE3IDAgMS44NzMtMS4zMTMgMy4xODZRMTMuODczIDIxLjUgMTIgMjEuNW0tMS0xMC4zMDhoMnYtMS4yNWgtMXYtLjg4NGgxVjYuOTQyaC0xdi0uODg0aDFWNWEuOTcuOTcgMCAwIDAtLjI4Ny0uNzEzQS45Ny45NyAwIDAgMCAxMiA0YS45Ny45NyAwIDAgMC0uNzEzLjI4N0EuOTcuOTcgMCAwIDAgMTEgNXoiLz48L3N2Zz4=",
          segmentLabels: ['one', 'two', 'three', 'four'],
          segmentColors: ['#D98CAE', 'transparent', '#E8E8E8', '#7C9A6B'],
          segmentBackgroundColors: ['#2E2E38', '#2E2E38', '#E8E8E8', '#2E2E38'],
          segmentOutlineColor: ['#C7A75B', '#D6293E', undefined, undefined],
          segmentLabelColors: ['#C7226B', '#D6293E', '#9AA0A6', '#4C7A3D'],
        });
      });
    </script>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  NoGap,
  HalfCircle,
  CustomStyling,
}, 700);
/* eslint-enable sort-keys */
