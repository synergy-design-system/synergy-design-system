import React from 'react';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import {
  Description,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import { getIconDataURL } from '../../../components/src/utilities/icon-library.js';
import '../../../components/src/components/chart/chart.js';
import { formatter } from '../../../components/src/components/chart/index.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
} from '../../src/helpers/component.js';
import { ChartSeriesDocumentation } from '../../src/helpers/chart-series-documentation.js';
import { chartChromaticConfig } from '../../src/chromatic-config/chromatic-config.js';

declare global {
  interface Window {
    formatter: typeof formatter;
    getIconDataURL: typeof getIconDataURL;
  }
}

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
        component: generateStoryDescription('chart', 'gauge-series-default'),
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <ChartSeriesDocumentation section="Gauge series presets" />
          <Stories title="" />
        </>
      ),
    },
  },
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
        chart.config = {
          series: [
            {
              type: 'synGauge',
              data: [45],
            }
          ]
        };
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
        chart.config = handle => handle
          .seriesGauge({
            sections: {
              boundaries: [0, 20, 70, 100],
              show: true,
            },
            value: 80,
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
        chart.config = handle => handle
          .seriesGauge({
            trend: {
              show: true,
              value: '5',
            },
            value: 80,
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
      // Import the formatter from the chart utilities
      //import { formatter } from '@synergy-design-system/components/components/chart/index.js';
      // Import the getIconDataURL utility from the icon-library module.
      // import { getIconDataURL } from '@synergy-design-system/components/utilities/icon-library.js'.

      const icon = await getIconDataURL('device_thermostat');
      const charts = document.querySelectorAll('#gauge-icon');

      charts.forEach(chart => {
        chart.config = handle => handle
          .seriesGauge({
            icon,
            sections: {
              show: true,
            },
            value: 80,
            formatter: {
              max: formatter.unitFormatter('°C'),
              min: formatter.unitFormatter('°C'),
              value: formatter.unitFormatter('°C'),
            },
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
}, 700);
/* eslint-enable sort-keys */
