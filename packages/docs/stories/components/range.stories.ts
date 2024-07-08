/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import type { SynRange } from '@synergy-design-system/components';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../../../components/src/components/range/range.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-range');
const { overrideArgs } = storybookHelpers('syn-range');
const { generateTemplate } = storybookTemplate('syn-range');

const meta: Meta = {
  args: overrideArgs([
  ], defaultArgs),
  argTypes,
  component: 'syn-range',
  parameters: {
    design: generateFigmaPluginObject('20575-35283'),
    docs: {
      description: {
        component: generateStoryDescription('range', 'default'),
      },
    },
  },
  title: 'Components/syn-range',
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  parameters: {
    controls: {
      disable: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('range', 'default'),
      },
    },
  },
  render: (args: unknown) => generateTemplate({ args }),
} as Story;

export const Labels: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('range', 'labels'),
      },
    },
  },
  render: () => html`
    <syn-range label="Label"></syn-range>
  `,
};

export const HelpText: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('range', 'help-text'),
      },
    },
  },
  render: () => html`
    <syn-range label="Volume" help-text="Controls the volume of the current song"></syn-range>
  `,
};

export const Focus: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('range', 'focus'),
      },
    },
  },
  play: ({ canvasElement }) => {
    const input = canvasElement.querySelector('syn-range') as SynRange;
    if (input) {
      input.focus();
    }
  },
  render: () => html`
    <form>
      <syn-range></syn-range>
    </form>
  `,
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('range', 'disabled'),
      },
    },
  },
  render: () => html`
    <syn-range disabled></syn-range>
  `,
};

export const PrefixSuffixText: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('range', 'prefix-suffix'),
      },
    },
  },
  render: () => html`
    <syn-range label="Volume" help-text="Controls the volume of the current song">
      <span slot="prefix">0</span>
      <span slot="suffix">100</span>
    </syn-range>

    <p>This can be used to add input fields or icons.</p>

    <syn-range label="Estimated Time" class="suffix-input-field">
      <span slot="prefix">0</span>
      <span slot="suffix">
        <div class="suffix-input">
          60
          <syn-input value="30" type="number" no-spin-buttons min="0" max="100">
            <span slot="suffix">sec</span>
          </syn-input>
        </div>
      </span>
    </syn-range>
    
    <style>
      .suffix-input {
        align-items: center;
        display: flex;
        gap: var(--syn-spacing-medium);
        syn-input {
          &::part(form-control-input) {
            max-width: 120px;
          }
        }
      }
    </style>
    <script>
      [...document.querySelectorAll('.suffix-input-field')]
        .forEach(range => {
          const input = range.querySelector('syn-input');

          range.addEventListener('syn-input', e => {
            const { target } = e;
            if (target.tagName !== 'SYN-RANGE') return;
            target.querySelector('syn-input').value = target.value;
          });

          input.addEventListener('syn-change', e => {
            const { target } = e;
            target.closest('syn-range').value = target.value;
          });
        });
    </script>
  `,
};

export const CustomTrackColors: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('range', 'custom-track-colors'),
      },
    },
  },
  render: () => html`
    <syn-range class="custom-track-color"></syn-range>
    <style>
      .custom-track-color {
        --track-color-active: var(--syn-color-success-600);
      }
    </style>
  `,
};

export const CustomTrackOffset: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('range', 'custom-track-offset'),
      },
    },
  },
  render: () => html`
    <syn-range class="custom-track-offset"></syn-range>
    <style>
      .custom-track-offset {
        --track-active-offset: 50%;
      }
    </style>
  `,
};

export const MultiKnob: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('range', 'multi-knob'),
      },
    },
  },
  render: () => html`
    <syn-range value="30 70"></syn-range>
  `,
};

export const Ticks: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('range', 'ticks'),
      },
    },
  },
  render: () => html`
    <syn-range>
      <ol slot="ticks">
        <li>0</li>
        <li>25</li>
        <li>50</li>
        <li>75</li>
        <li>100</li>
      </ol>
    </syn-range>
  `,
};

export const TooltipPlacement: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('range', 'tooltip-placement'),
      },
    },
  },
  render: () => html`
    <syn-range tooltip="bottom"></syn-range>
  `,
};

export const TooltipDisabled: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('range', 'tooltip-disabled'),
      },
    },
  },
  render: () => html`
    <syn-range tooltip="none"></syn-range>
  `,
};

export const TooltipFormatter: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('range', 'tooltip-formatter'),
      },
    },
  },
  render: () => html`
    <syn-range class="tooltip-formatter"></syn-range>
    <script>
      document
        .querySelectorAll('.tooltip-formatter')
        .forEach(tip => {
          tip.tooltipFormatter = value => value + '%';
        });
    </script>
  `,
};

// Bundled screenshot story
/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Labels,
  HelpText,
  Disabled,
  PrefixSuffixText,
  CustomTrackColors,
  CustomTrackOffset,
  MultiKnob,
  Ticks,
  TooltipPlacement,
  TooltipDisabled,
  TooltipFormatter,
}, 500);
/* eslint-enable sort-keys */
