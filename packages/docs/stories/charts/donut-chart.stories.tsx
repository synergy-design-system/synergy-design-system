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
        component: generateStoryDescription('chart', 'donut-series-default'),
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
  title: 'Charts/Series Types/Donut Chart',
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'donut-series-preset'),
      },
    },
  },
  render: () => html`
    <syn-chart id="donut-series-preset"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#donut-series-preset');

      charts.forEach(chart => {
        chart.config = {
          series: [
            {
              type: 'synergyDonut',
              data: [10, 20, 30, 15, 25],
            }
          ]
        };
      });
    </script>
  `,
};

export const CustomColors: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'donut-series-colors'),
      },
    },
  },
  render: () => html`
    <syn-chart id="donut-colors"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#donut-colors');

      charts.forEach(chart => {
        chart.config = handle => handle
        .seriesDonut({
          data: [15, 10, 20, 12, 18, 8, 17],
          colors: [
            '#1F6FEB', '#2E9E5B', '#8B6D5C', '#B25FE3',
            '#1B3A8A', '#14827E', '#C22D6E',
          ],
        });
      });
    </script>
  `,
};

export const Labels: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'donut-series-labels'),
      },
    },
  },
  render: () => html`
    <syn-chart id="donut-labels"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#donut-labels');

      charts.forEach(chart => {
        chart.config = handle => handle
        .seriesDonut({
          data: [50, 30, 20],
          labels: [
            {
              text: 'Angular',
              icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNMTIgMkwyIDZsMS42IDEyLjlMMTIgMjJsOC40LTMuMUwyMiA2IDEyIDJ6bTAgMi4yIDcuNiAyLjctMS4yIDEwLjZMMTIgMTkuOGwtNi40LTIuM0w0LjQgNi45IDEyIDQuMnpNMTIgOWwtNCA5aDEuNmwuOC0yaDMuMmwuOCAySDE2bC00LTl6bTAgMi45IDEuMSAyLjdoLTIuMkwxMiAxMS45eiIvPjwvc3ZnPg==",
            },
            {
              text: 'React',
              icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMS40Ij48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIyIiBmaWxsPSJjdXJyZW50Q29sb3IiIHN0cm9rZT0ibm9uZSIvPjxlbGxpcHNlIGN4PSIxMiIgY3k9IjEyIiByeD0iMTAiIHJ5PSI0LjIiLz48ZWxsaXBzZSBjeD0iMTIiIGN5PSIxMiIgcng9IjEwIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSg2MCAxMiAxMikiLz48ZWxsaXBzZSBjeD0iMTIiIGN5PSIxMiIgcng9IjEwIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjAgMTIgMTIpIi8+PC9zdmc+",
            },
            {
              text: 'Vue',
              icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNMiAzaDQuMkwxMiAxM2w1LjgtMTBIMjJMMTIgMjEgMiAzeiIvPjxwYXRoIGQ9Ik04LjQgM2gzLjJMMTIgNS4xIDEzLjQgM2gzLjJMMTIgMTIuOSA4LjQgM3oiLz48L3N2Zz4=",
            },
          ],
        });
      });
    </script>
  `,
};

export const SynergyDonutComponent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Donut chart rendered via dedicated ECharts series type "synergyDonut".',
      },
    },
  },
  render: () => html`
    <syn-chart id="donut-synergy-component"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#donut-synergy-component');

      charts.forEach(chart => {
        chart.config = {
          series: [
            {
              type: 'synergyDonut',
              data: [8, 14, 6, 20, 11, 9],
            }
          ]
        };
      });
    </script>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  CustomColors,
  Labels,
  SynergyDonutComponent,
}, 700);
/* eslint-enable sort-keys */
