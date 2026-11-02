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
import { ResolvedTokens as ChartTokens } from '@synergy-design-system/tokens/charts/resolved';
import isChromatic from 'chromatic';
import {
  generateScreenshotStory,
  generateStoryDescription,
} from '../../src/helpers/component.js';
import { chartChromaticConfig } from '../../src/chromatic-config/chromatic-config.js';
import type SynChart from '../../../components/src/components/chart/chart.js';

declare global {
  interface Window {
    ChartTokens: typeof ChartTokens;
  }
}
window.ChartTokens = ChartTokens;

const meta: Meta = {
  component: 'syn-chart',
  parameters: {
    chromatic: {
      ...chartChromaticConfig,
    },
    docs: {
      description: {
        component: generateStoryDescription('chart', 'histogram-default'),
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
  title: 'Charts/Series Types/Histogram',
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'histogram-preset'),
      },
    },
  },
  render: () => html`
    <syn-chart id="histogram-default"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#histogram-default');

      charts.forEach(chart => {
        chart.config = {
          xAxis: {
            name: 'Value Range',
            type: 'category',
            data: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60'],
          },
          yAxis: {
            name: 'Frequency',
          },
          series: [
            {
              data: [2, 8, 17, 14, 6, 3],
              type: 'bar',
              barCategoryGap: 1,
              barMaxWidth: '100%',
            },
          ]
        }
      });
    </script>
  `,
};

export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'histogram-vertical'),
      },
    },
  },
  render: () => html`
    <syn-chart id="histogram-vertical"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#histogram-vertical');

      const baseConfig = {
        xAxis: {
          name: 'Value Range',
          type: 'category',
          data: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60'],
        },
        yAxis: {
          name: 'Frequency',
        },
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .seriesHistogram([{ data: [2, 8, 17, 14, 6, 3] }])
      });
    </script>
  `,
};

export const Horizontal: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'histogram-horizontal'),
      },
    },
  },
  render: () => html`
    <syn-chart id="histogram-horizontal"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#histogram-horizontal');

      const baseConfig = {
        yAxis: {
          name: 'Value Range',
          type: 'category',
          data: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60'],
        },
        xAxis: {
          name: 'Frequency',
        },
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .seriesHistogram([{ data: [2, 8, 17, 14, 6, 3] }])
      });
    </script>
  `,
};

export const FixedValueRange: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'histogram-value-range'),
      },
    },
  },
  render: () => html`
    <syn-chart id="histogram-value-range"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#histogram-value-range');

      const baseConfig = {
        xAxis: {
          name: 'Value Range',
          type: 'category',
          data: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60'],
        },
        yAxis: {
          min: 0,
          max: 25,
          name: 'Frequency',
        },
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .seriesHistogram([{ data: [2, 8, 17, 14, 6, 3] }])
      });
    </script>
  `,
};

export const NegativeValues: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'histogram-negative'),
      },
    },
  },
  render: () => html`
    <syn-chart id="histogram-negative"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#histogram-negative');

      const baseConfig = {
        yAxis: {
          name: 'Value Range',
          type: 'category',
          data: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60'],
        },
        xAxis: {
          name: 'Frequency',
        },
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .seriesHistogram([{ data: [-2, -8, -17, -14, -6, -3] }])
      });
    </script>
  `,
};

export const PositiveAndNegative: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'histogram-positive-and-negative'),
      },
    },
  },
  render: () => html`
    <syn-chart id="histogram-positive-and-negative"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#histogram-positive-and-negative');

      const baseConfig = {
        xAxis: {
          name: 'Value Range',
          type: 'category',
          data: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60'],
        },
        yAxis: {
          name: 'Frequency',
        },
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .seriesHistogram([{ data: [-6, -2, 8, 14, 6, 3] }])
      });
    </script>
  `,
};

export const CustomBarWidth: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'histogram-custom-width'),
      },
    },
  },
  render: () => html`
    <syn-chart id="histogram-fixed-width"></syn-chart>
    <syn-chart id="histogram-relative-width"></syn-chart>
    <script type="module">
      const fixedWidthCharts = document.querySelectorAll('#histogram-fixed-width');
      const relativeWidthCharts = document.querySelectorAll('#histogram-relative-width');
      const baseConfig = {
        xAxis: {
          name: 'Value Range',
          type: 'category',
          data: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60'],
        },
        yAxis: {
          name: 'Frequency',
        },
      };

      fixedWidthCharts.forEach((fixed) => {
        fixed.config = handle => handle
          .baseConfig(baseConfig)
          .seriesHistogram([{ data: [2, 8, 17, 14, 6, 3], barWidth: 16 }])
      });


      relativeWidthCharts.forEach((relative) => {
        relative.config = handle => handle
          .baseConfig(baseConfig)
          .seriesHistogram([{
            data: [2, 8, 17, 14, 6, 3],
            barWidth: '30%',
          }])
      });
    </script>
  `,
};

export const NoGap: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'histogram-no-gap'),
      },
    },
  },
  render: () => html`
    <syn-chart id="histogram-no-gap"></syn-chart>
    <script type="module">
      const noGapCharts = document.querySelectorAll('#histogram-no-gap');
      const baseConfig = {
        xAxis: {
          name: 'Value Range',
          type: 'category',
          data: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60'],
        },
        yAxis: {
          name: 'Frequency',
        },
      };

      noGapCharts.forEach((noGap) => {
        noGap.config = handle => handle
          .baseConfig(baseConfig)
          .seriesHistogram([{
            data: [2, 8, 17, 14, 6, 3],
            barMaxWidth: '101%',
            barWidth: '101%',
          }])
      });
    </script>
  `,
};

export const CustomColors: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'histogram-custom-color'),
      },
    },
  },
  render: () => html`
    <syn-chart id="histogram-custom-color"></syn-chart>
    <script type="module">
      const getChartColor = token => ChartTokens[token]['light'];
      const charts = document.querySelectorAll('#histogram-custom-color');
      const baseConfig = {
        xAxis: {
          name: 'Value Range',
          type: 'category',
          data: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60'],
        },
        yAxis: {
          name: 'Frequency',
        },
        color: [getChartColor('SynChartSequential02_70')],
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .seriesHistogram([{ data: [2, 8, 17, 14, 6, 3] }])
      });
    </script>
  `,
};

export const Tooltip: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('chart', 'histogram-tooltip'),
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Only run this code when running in Chromatic, as it is used to show the tooltip for the snapshot.
    if (isChromatic()) {
      const chart = canvasElement.querySelector<SynChart>('#histogram-tooltip');
      if (!chart) return;
      const instance = chart.getInstance()!;

      const finishedPromise = new Promise<void>(resolve => {
        instance.on('finished', () => {
          instance.dispatchAction({
            type: 'showTip',
            x: 320,
            y: 50,
          });
          resolve();
        });
      });

      await finishedPromise;
    }
  },
  render: () => html`
    <syn-chart id="histogram-tooltip"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#histogram-tooltip');

      const baseConfig = {
        xAxis: {
          name: 'Value Range',
          type: 'category',
          data: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60'],
        },
        yAxis: {
          name: 'Frequency',
        },
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .seriesHistogram([{ data: [2, 8, 17, 14, 6, 3] }])
          .tooltipShow({ axisPointer: { type: 'shadow' } })
      });
    </script>
  `,
};

export const LargeDataSet: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('chart', 'histogram-large-data'),
      },
    },
  },
  render: () => html`
    <syn-chart id="histogram-image-processing"></syn-chart>
    <script type="module">
      const charts = document.querySelectorAll('#histogram-image-processing');
      const binCount = 256;
      const intensities = Array.from({ length: binCount }, (_, intensity) => String(intensity));
      // Model an image with shadow, midtone, and highlight regions.
      const frequencies = Array.from({ length: binCount }, (_, intensity) => {
        const shadows = 9000 * Math.exp(-0.5 * ((intensity - 42) / 18) ** 2);
        const midtones = 14000 * Math.exp(-0.5 * ((intensity - 128) / 30) ** 2);
        const highlights = 6500 * Math.exp(-0.5 * ((intensity - 214) / 22) ** 2);
        return Math.round(shadows + midtones + highlights);
      });

      const baseConfig = {
        xAxis: {
          data: intensities,
          name: 'Grayscale intensity (0-255)',
          type: 'category',
        },
        yAxis: {
          name: 'Pixel frequency',
        },
      };

      charts.forEach(chart => {
        chart.config = handle => handle
          .baseConfig(baseConfig)
          .seriesHistogram([{
            data: frequencies,
            barMaxWidth: '101%',
            barWidth: '101%',
          }]);
      });
    </script>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Vertical,
  Horizontal,
  FixedValueRange,
  NegativeValues,
  PositiveAndNegative,
  CustomBarWidth,
  NoGap,
  CustomColors,
  LargeDataSet,
}, 700);
/* eslint-enable sort-keys */
