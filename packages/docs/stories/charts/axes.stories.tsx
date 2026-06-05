import React from 'react';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../../components/src/components/select/select.js';
import '../../../components/src/components/option/option.js';
import {
  Description,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import {
  enhanceConfig,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - Can be ignored as this is a monorepo workspace problem
} from '../../../components/src/components/chart/configs/index.js';
import '../../../components/src/components/chart/chart.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';
import { Chromatic_Modes_All } from '../../.storybook/modes.js';

declare global {
  interface Window {
    enhanceConfig: typeof enhanceConfig;
  }
}

window.enhanceConfig = enhanceConfig;

const meta: Meta = {
  component: 'syn-chart',
  parameters: {
    chromatic: {
      modes: Chromatic_Modes_All,
    },
    design: generateFigmaPluginObject('41094-279501'),
    docs: {
      description: {
        component: generateStoryDescription('chart', 'axes-default'),
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
  tags: ['Charting', 'Data Visualization'],
  title: 'Charts/Axes',
};
export default meta;

type Story = StoryObj;

export const AxesSplitLinesHidden: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'axes-split-lines-hidden'),
      },
    },
  },
  render: () => html`
    <syn-chart id="chart-lines-hidden"></syn-chart>
    <script type="module">
      const chart = document.querySelector('#chart-lines-hidden');

      chart.config = {
          series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: 'line' }],
          xAxis: { 
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            type: 'category', name: 'Days',
          },
          yAxis: { type: 'value', name: 'Values' },
      };
    </script>
  `,
};

export const AxesSplitLinesVisible: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'axes-split-lines-visible'),
      },
    },
  },
  render: () => html`
    <syn-chart id="chart-lines-visible"></syn-chart>
    <script type="module">
      const chart = document.querySelector('#chart-lines-visible');

      const baseConfig = {
        series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: 'line' }],
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          name: 'Days',
          type: 'category',
        },
        yAxis: {
          name: 'Values',
          type: 'value',
        },
      };

      chart.config = enhanceConfig(baseConfig).usePreset('axes.split-lines').build();
    </script>
  `,
};

export const HorizontalSplitLinesVisible: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'axes-horizontal-split-lines'),
      },
    },
  },
  render: () => html`
    <syn-chart id="chart-horizontal-lines-visible"></syn-chart>
    <script type="module">
      const chart = document.querySelector('#chart-horizontal-lines-visible');

      const baseConfig = {
        series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: 'line' }],
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          name: 'Days',
          type: 'category',
        },
        yAxis: {
          name: 'Values',
          type: 'value',
        },
      };

      chart.config = enhanceConfig(baseConfig).usePreset('axes.y-split-lines').build();
    </script>
  `,
};

export const VerticalSplitLinesVisible: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'axes-vertical-split-lines'),
      },
    },
  },
  render: () => html`
    <syn-chart id="chart-vertical-lines-visible"></syn-chart>
    <script type="module">
      const chart = document.querySelector('#chart-vertical-lines-visible');

      const baseConfig = {
        series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: 'line' }],
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          name: 'Days',
          type: 'category',
        },
        yAxis: {
          name: 'Values',
          type: 'value',
        },
      };

      chart.config = enhanceConfig(baseConfig).usePreset('axes.x-split-lines').build();
    </script>
  `,
};

export const AxesLabelsHidden: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'axes-labels-hidden'),
      },
    },
  },
  render: () => html`
    <syn-chart id="chart-lines-hidden-values-hidden"></syn-chart>
    <script type="module">
        const chart = document.querySelector('#chart-lines-hidden-values-hidden');

        const baseConfig = {
          series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: 'line' }],
          xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            name: 'Days',
            type: 'category',
          },
          yAxis: {
            name: 'Values',
            type: 'value',
          },
        };
        chart.config = enhanceConfig(baseConfig).usePreset('axes.hide-labels').build();
    </script>
  `,
};

export const AxesLinesVisibleWithLabelsHidden: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'axes-lines-visible-labels-hidden'),
      },
    },
  },
  render: () => html`
      <syn-chart id="chart-lines-visible-values-hidden"></syn-chart>
      <script type="module">
        const baseConfig = {
          series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: 'line' }],
          xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            name: 'Days',
            type: 'category',
          },
          yAxis: {
            name: 'Values',
            type: 'value',
          },
        };

        const chart = document.querySelector('#chart-lines-visible-values-hidden');
        chart.config = enhanceConfig(baseConfig)
          .usePreset('axes.hide-labels')
          .usePreset('axes.split-lines')
          .build();
      </script>
    `
  ,
};

export const AxesLabelsWithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'axes-labels-with-icons'),
      },
    },
  },
  render: () => html`
      <div class="controls">
        <syn-select value="top" label="x-axis icon position" id="x-axis-icon-position">
          <syn-option value="top">Top</syn-option>
          <syn-option value="bottom">Bottom</syn-option>
        </syn-select>
        <syn-select value="left" label="y-axis icon position" id="y-axis-icon-position">
          <syn-option value="left">Left</syn-option>
          <syn-option value="right">Right</syn-option>
        </syn-select>
      </div>
      <syn-chart id="chart-axis-prefix-icons"></syn-chart>
      <script type="module">
        const XAXIS_ICONS = ['calendar_today', 'event_available', 'schedule', 'event_note', 'event_upcoming', 'weekend', 'sunny'];
        const YAXIS_ICONS = ['wallpaper', 'tune', 'watch', 'format_paint', 'brush', 'gradient', 'format_color_reset'];

        let yAxisIconUrls = [];
        let xAxisIconUrls = [];

        const fetchIcons = async () => {
          xAxisIconUrls = await Promise.all(
            XAXIS_ICONS.map(async (iconName) => {
              const svg = await fetch('/assets/sick2025/' + iconName + '.svg').then(r => r.text());
              return 'data:image/svg+xml;base64,' + btoa(svg);
            })
          );
          yAxisIconUrls = await Promise.all(
            YAXIS_ICONS.map(async (iconName) => {
              const svg = await fetch('/assets/sick2025/' + iconName + '.svg').then(r => r.text());
              return 'data:image/svg+xml;base64,' + btoa(svg);
            })
          );
        };

        const xAxisIconPositionSelect = document.querySelector('#x-axis-icon-position');
        const yAxisIconPositionSelect = document.querySelector('#y-axis-icon-position');

        const setConfig = async () => {        
          const baseConfig = {
            series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: 'line' }],
            xAxis: {
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              name: 'Days',
              type: 'category',
            },
            yAxis: {
              name: 'Values',
              type: 'value',
            },
          };

          const yAxisIconPosition = yAxisIconPositionSelect.value;
          const xAxisIconPosition = xAxisIconPositionSelect.value;

          const chart = document.querySelector('#chart-axis-prefix-icons');
          chart.config = enhanceConfig(baseConfig)
            .usePreset('axes.split-lines')
            .usePreset('axes.x-label-icons', {
              iconUrls: xAxisIconUrls,
              iconPosition: xAxisIconPosition,
            })
            .usePreset('axes.y-label-icons', {
              iconUrls: yAxisIconUrls,
              iconPosition: yAxisIconPosition,
            })
            .build();
        };

        fetchIcons().then(setConfig);
        xAxisIconPositionSelect.addEventListener('syn-change', setConfig);
        yAxisIconPositionSelect.addEventListener('syn-change', setConfig);
      </script>
      <style>
        .controls {
          display: flex;
          gap: var(--syn-spacing-large);
          margin-bottom: var(--syn-spacing-large);
        }
      </style>
    `
  ,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  AxesSplitLinesHidden,
  AxesSplitLinesVisible,
  HorizontalSplitLinesVisible,
  VerticalSplitLinesVisible,
  AxesLabelsHidden,
  AxesLinesVisibleWithLabelsHidden,
  AxesLabelsWithIcons,
}, 700);
/* eslint-enable sort-keys */
