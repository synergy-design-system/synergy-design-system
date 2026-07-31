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
import { waitForFinishedChartPlayFunction } from '../../src/playFunction/waitForFinishedCharts.js';

const meta: Meta = {
  component: 'syn-chart',
  parameters: {
    chromatic: {
      modes: Chromatic_Modes_Sick_2025,
    },
    design: generateFigmaPluginObject('3322-8526', true),
    docs: {
      description: {
        component: generateStoryDescription('chart', 'zooming-default'),
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
  title: 'Charts/Features/Zooming & Panning',
};
export default meta;

type Story = StoryObj;

export const IntegratedZooming: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'integrated-zooming'),
      },
    },
  },
  render: () => html`
    <syn-chart id="integrated-zooming"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#integrated-zooming');

      const baseConfig = {
        xAxis: {
          data: Array.from({ length: 30 }, (_, i) => {
            const d = new Date(2026, 0, 1 + i);
            return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          }),
          type: 'category', name: 'Date',
        },
        yAxis: { type: 'value', name: 'Values' },
        dataZoom: [{
          type: 'inside',
          start: 30,
          end: 70,
        }],
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .seriesLine([
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320, 620, 732, 701, 734, 1090, 1130, 1120, 420, 532, 501, 534, 890, 930, 920, 320, 432, 401, 434, 790, 830, 820, 220, 332],
            },
            {
              data: [450, 680, 550, 890, 720, 850, 610, 1100, 950, 820, 1050, 650, 780, 560, 920, 1200, 680, 750, 1040, 590, 875, 1150, 740, 920, 680, 1080, 620, 950, 1220, 750],
            },
          ])
      });
    </script>
  `,
};

export const SliderZooming: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'slider-zooming'),
      },
    },
  },
  render: () => html`
    <syn-chart id="slider-zooming"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#slider-zooming');

      const baseConfig = {
        xAxis: {
          data: Array.from({ length: 30 }, (_, i) => {
            const d = new Date(2026, 0, 1 + i);
            return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          }),
          type: 'category', name: 'Date',
        },
        yAxis: { type: 'value', name: 'Values' },
        dataZoom: [{
          type: 'slider',
          start: 30,
          end: 70,
        }],
        grid: {
          bottom: 120,
        }
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .seriesLine([
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320, 620, 732, 701, 734, 1090, 1130, 1120, 420, 532, 501, 534, 890, 930, 920, 320, 432, 401, 434, 790, 830, 820, 220, 332],
            },
            {
              data: [450, 680, 550, 890, 720, 850, 610, 1100, 950, 820, 1050, 650, 780, 560, 920, 1200, 680, 750, 1040, 590, 875, 1150, 740, 920, 680, 1080, 620, 950, 1220, 750],
            },
          ])
      });
    </script>
  `,
};

export const Screenshot: Story = generateScreenshotStory({
  IntegratedZooming,
  SliderZooming,
}, 700);
