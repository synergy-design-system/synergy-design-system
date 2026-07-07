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
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';
import { Chromatic_Modes_Sick_2025 } from '../../.storybook/modes.js';

const meta: Meta = {
  component: 'syn-chart',
  parameters: {
    chromatic: {
      modes: Chromatic_Modes_Sick_2025,
      pauseAnimationAtEnd: false,
    },
    design: generateFigmaPluginObject('41094-279501'),
    docs: {
      description: {
        component: generateStoryDescription('chart', 'legend-default'),
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
  title: 'Charts/Features/Legend',
};
export default meta;

type Story = StoryObj;

export const ShowLegendTop: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'axes-split-lines-hidden'),
      },
    },
  },
  render: () => html`
    <syn-chart id="chart-show-legend-top"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#chart-show-legend-top');

      const baseConfig = {
        series: [
          { data: [150, 230, 224, 218, 135, 147, 260], type: 'line', name: 'Series A' },
          { data: [120, 282, 251, 234, 290, 430, 310], type: 'line', name: 'Series B' },
          { data: [320, 332, 301, 334, 390, 330, 320], type: 'line', name: 'Series C' },
        ],
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          type: 'category', name: 'Days',
        },
        yAxis: { type: 'value', name: 'Values' },
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .showLegend({ position: 'top'});
      });
    </script>
  `,
};

export const ShowLegendLeft: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'axes-split-lines-hidden'),
      },
    },
  },
  render: () => html`
    <syn-chart id="chart-show-legend-left"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#chart-show-legend-left');

      const baseConfig = {
        series: [
          { data: [150, 230, 224, 218, 135, 147, 260], type: 'line', name: 'Series A' },
          { data: [120, 282, 251, 234, 290, 430, 310], type: 'line', name: 'Series B' },
          { data: [320, 332, 301, 334, 390, 330, 320], type: 'line', name: 'Series C' },
        ],
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          type: 'category', name: 'Days',
        },
        yAxis: { type: 'value', name: 'Values' },
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .showLegend({ position: 'left' });
      });
    </script>
  `,
};

export const ShowLegendRight: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'axes-split-lines-hidden'),
      },
    },
  },
  render: () => html`
    <syn-chart id="chart-show-legend-right"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#chart-show-legend-right');

      const baseConfig = {
        series: [
          { data: [150, 230, 224, 218, 135, 147, 260], type: 'line', name: 'Series A' },
          { data: [120, 282, 251, 234, 290, 430, 310], type: 'line', name: 'Series B' },
          { data: [320, 332, 301, 334, 390, 330, 320], type: 'line', name: 'Series C' },
        ],
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          type: 'category', name: 'Days',
        },
        yAxis: { type: 'value', name: 'Values' },
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .showLegend({ position: 'right'});
      });
    </script>
  `,
};

export const ShowLegendBottom: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'axes-split-lines-hidden'),
      },
    },
  },
  render: () => html`
    <syn-chart id="chart-show-legend-bottom"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#chart-show-legend-bottom');

      const baseConfig = {
        series: [
          { data: [150, 230, 224, 218, 135, 147, 260], type: 'line', name: 'Series A' },
          { data: [120, 282, 251, 234, 290, 430, 310], type: 'line', name: 'Series B' },
          { data: [320, 332, 301, 334, 390, 330, 320], type: 'line', name: 'Series C' },
        ],
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          type: 'category', name: 'Days',
        },
        yAxis: { type: 'value', name: 'Values' },
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .showLegend({ position: 'bottom'});
      });
    </script>
  `,
};
