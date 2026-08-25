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
        component: generateStoryDescription('chart', 'gauge-series-default'),
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
  title: 'Charts/Series Types/Gauge Chart',
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'gauge-series-preset'),
      },
    },
  },
  render: () => html`
    <syn-chart id="gauge-series-preset"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#gauge-series-preset');

      charts.forEach(chart => {
         charts.forEach(chart => {
            chart.config = {
              series: [
                {
                  type: 'synergyGauge',
                  data: [45],
                }
              ]
            };
          });
      });
    </script>
  `,
};

export const Sections: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'gauge-series-sections'),
      },
    },
  },
  render: () => html`
    <syn-chart id="gauge-sections"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#gauge-sections');

      charts.forEach(chart => {
         charts.forEach(chart => {
            chart.config = handle => handle
            .seriesGauge({
              showSections: true,
              sections: {
                boundaries: [0, 20, 70, 100],
              },
              value: 80,
            });
          });
      });
    </script>
  `,
};

export const TrendIndicator: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'gauge-series-trend'),
      },
    },
  },
  render: () => html`
    <syn-chart id="gauge-trend"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#gauge-trend');

      charts.forEach(chart => {
         charts.forEach(chart => {
            chart.config = handle => handle
            .seriesGauge({
              showTrend: true,
              trend: {
                value: '5',
              },
              value: 80,  
            });
          });
      });
    </script>
  `,
};

export const Icon: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'gauge-series-icon'),
      },
    },
  },
  render: () => html`
    <syn-chart id="gauge-icon"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#gauge-icon');

      charts.forEach(chart => {
         charts.forEach(chart => {
            chart.config = handle => handle
            .seriesGauge({
              unit: '°C',
              icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSdjdXJyZW50Q29sb3InPjxwYXRoIGQ9Ik0xMiAyMS41cS0xLjg3MyAwLTMuMTg3LTEuMzE0UTcuNSAxOC44NzQgNy41IDE3cTAtMS4xNDMuNTMtMi4xMTdhNC41NiA0LjU2IDAgMCAxIDEuNDctMS42MTRWNXEwLTEuMDQ4LjcyNi0xLjc3NEEyLjQgMi40IDAgMCAxIDEyIDIuNXExLjA0OCAwIDEuNzc0LjcyNlQxNC41IDV2OC4yN2E0LjU2IDQuNTYgMCAwIDEgMS40NyAxLjYxM3EuNTMuOTc0LjUzIDIuMTE3IDAgMS44NzMtMS4zMTMgMy4xODZRMTMuODczIDIxLjUgMTIgMjEuNW0tMS0xMC4zMDhoMnYtMS4yNWgtMXYtLjg4NGgxVjYuOTQyaC0xdi0uODg0aDFWNWEuOTcuOTcgMCAwIDAtLjI4Ny0uNzEzQS45Ny45NyAwIDAgMCAxMiA0YS45Ny45NyAwIDAgMC0uNzEzLjI4N0EuOTcuOTcgMCAwIDAgMTEgNXoiLz48L3N2Zz4=",
              showSections: true,
              value: 80,  
            });
          });
      });
    </script>
  `,
};

export const ValueFormatting: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'gauge-series-formatter'),
      },
    },
  },
  render: () => html`
    <syn-chart id="gauge-formatter"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#gauge-formatter');

      charts.forEach(chart => {
         charts.forEach(chart => {
            chart.config = handle => handle
            .seriesGauge({
              value: 80,
              formatter: {
                max: (value) => Intl.NumberFormat(undefined, { minimumFractionDigits: 3 }).format(value),
                min: (value) => Intl.NumberFormat(undefined, { minimumFractionDigits: 3 }).format(value),
                value: (value) => Intl.NumberFormat(undefined, { minimumFractionDigits: 2 }).format(value),
              },
            });
          });
      });
    </script>
  `,
};
export const SynergyGaugeComponent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Gauge rendered via dedicated ECharts series type "synergyGauge".',
      },
    },
  },
  render: () => html`
    <syn-chart id="gauge-synergy-component"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#gauge-synergy-component');

      charts.forEach(chart => {
         charts.forEach(chart => {
            chart.config = {
              series: [
                {
                  type: 'synergyGauge',
                  data: [45],
                  showTrend: true,
                  trend: { value: 'dsf' },
                  unit: 'gha',
                  showSections: true,
                  sections: {
                    colors: ['magenta', 'orange']
                  },
                  icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSdjdXJyZW50Q29sb3InPjxwYXRoIGQ9Ik0xMiAyMS41cS0xLjg3MyAwLTMuMTg3LTEuMzE0UTcuNSAxOC44NzQgNy41IDE3cTAtMS4xNDMuNTMtMi4xMTdhNC41NiA0LjU2IDAgMCAxIDEuNDctMS42MTRWNXEwLTEuMDQ4LjcyNi0xLjc3NEEyLjQgMi40IDAgMCAxIDEyIDIuNXExLjA0OCAwIDEuNzc0LjcyNlQxNC41IDV2OC4yN2E0LjU2IDQuNTYgMCAwIDEgMS40NyAxLjYxM3EuNTMuOTc0LjUzIDIuMTE3IDAgMS44NzMtMS4zMTMgMy4xODZRMTMuODczIDIxLjUgMTIgMjEuNW0tMS0xMC4zMDhoMnYtMS4yNWgtMXYtLjg4NGgxVjYuOTQyaC0xdi0uODg0aDFWNWEuOTcuOTcgMCAwIDAtLjI4Ny0uNzEzQS45Ny45NyAwIDAgMCAxMiA0YS45Ny45NyAwIDAgMC0uNzEzLjI4N0EuOTcuOTcgMCAwIDAgMTEgNXoiLz48L3N2Zz4=",

                  
                }
              ]
            };
          });
      });
    </script>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Sections,
  TrendIndicator,
  Icon,
  ValueFormatting,
  SynergyGaugeComponent,
}, 700);
/* eslint-enable sort-keys */
