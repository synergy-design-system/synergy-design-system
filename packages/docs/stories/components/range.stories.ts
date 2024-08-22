/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import type { SynRange } from '@synergy-design-system/components';
import type { Meta, StoryObj } from '@storybook/web-components';
import { userEvent } from '@storybook/test';
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
    {
      name: 'value',
      type: 'attribute',
      value: '50',
    },
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
      story: {
        height: '80px',
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
    <syn-range label="Label" max="100" min="0" value="50"></syn-range>
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
    <syn-range
      help-text="Controls the volume of the current song"
      label="Volume"
      max="100"
      min="0"
      value="50"
    ></syn-range>
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
    <syn-range disabled max="100" min="0" value="50"></syn-range>
  `,
};

export const Invalid: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('range', 'invalid'),
      },
    },
  },
  play: async ({ canvasElement }) => {
    try {
      const range = canvasElement.querySelector('syn-range');
      const button = canvasElement.querySelector('syn-button');

      if (range && button) {
        // make sure to always fire both events:
        // 1. userEvent.click is needed for storybooks play function to register
        // 2. button.click is needed to really click the button
        // userEvent.click works on native elements only
        await userEvent.click(button);
        button.click();
      }
    } catch (error) {
      console.error('Error in play function:', error);
    }
  },
  render: () => html`
    <form class="custom-validity">
      <syn-range
        help-text="This is an error text"
        id="range-invalid"
        max="100"
        min="0"
        value="50"
      >

      </syn-range>
      <syn-button type="submit">Submit</syn-button>
    </form>
    <script type="module">
      document.querySelector('form').addEventListener('submit', e => {
        e.preventDefault();
      });

      const range = document.querySelector('#range-invalid');
      range.setCustomValidity('Please enter a valid value');
    </script>
    <style>
      .custom-validity {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      syn-button {
        align-self: flex-start;
      }
    </style>
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
      story: {
        height: '80px',
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
      <syn-range max="100" min="0" value="50"></syn-range>
    </form>
  `,
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('range', 'size'),
      },
    },
  },
  render: () => html`
    <div class="size-wrapper">
      <syn-range label="Small" max="100" min="0" size="small" value="33"></syn-range>
      <syn-range label="Medium" max="100" min="0" size="medium" value="66"></syn-range>
      <syn-range label="Large" max="100" min="0" size="large" value="99"></syn-range>
    </div>
    <style>
      .size-wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--syn-spacing-medium);
      }
    </style>
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
    <syn-range
      help-text="Controls the volume of the current song"
      label="Volume"
      max="100"
      min="0"
      value="50"
    >
      <span slot="prefix">0</span>
      <span slot="suffix">100</span>
    </syn-range>

    <br>
    <p>This can be used to add input fields or icons.</p>
    <br>

    <syn-range label="Estimated Time" class="suffix-input-field" min="0" max="60" value="30">
      <span slot="prefix">0</span>
      <span slot="suffix">
        <div class="suffix-input">
          60
          <syn-input value="30" type="number" no-spin-buttons min="0" max="60">
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
          min-width: 0;
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

          input.addEventListener('syn-input', e => {
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
      story: {
        height: '80px',
      },
    },
  },
  render: () => html`
    <syn-range
      class="custom-track-color"
      max="100"
      min="0"
      value="50"
    ></syn-range>
    <style>
      .custom-track-color {
        --track-color-active: var(--syn-color-success-700);
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
      story: {
        height: '80px',
      },
    },
  },
  render: () => html`
    <syn-range
      class="custom-track-offset"
      max="50"
      min="-50"
      value="-15"
    ></syn-range>
    <style>
      .custom-track-offset {
        --track-active-offset: 50%;
      }
    </style>
  `,
};

export const MultiThumb: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('range', 'multi-knob'),
      },
      story: {
        height: '80px',
      },
    },
  },
  render: () => html`
    <syn-range max="100" min="0" value="30 70"></syn-range>
  `,
};

export const MultiThumbWithRestrictedMovement = {
  parameters: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    docs: {
      description: {
        story: generateStoryDescription('range', 'multi-knob-restrict-movement'),
      },
    },
  },
  render: () => html`
    <syn-range
      class="range-restrict-movement"
      value="30 70"
      label="Demo of restricting values"
      min="0"
      max="100"
      step="1"
    ></syn-range>
    <script type="module">
      Array
        .from(document.querySelectorAll('.range-restrict-movement'))
        .forEach((el) => {
          el.addEventListener('syn-move', e => {
            const { detail, target } = e;
            const values = target.valueAsArray;
            const { element, value } = detail;

            const [firstThumb, lastThumb] = target.thumbs;
            const [firstValue, lastValue] = values;

            if (element === firstThumb && value > lastValue) {
              e.preventDefault();
              target.valueAsArray = [lastValue, lastValue];
            }
            
            if (element === lastThumb && value < firstValue) {
              e.preventDefault();
              target.valueAsArray = [firstValue, firstValue];
            }
          });
        });
    </script>
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
  <div class="wrapper">
    <syn-range
      class="syn-range-with-tick"
      max="100"
      min="0"
      value="50"
      label="Volume"
    >
      <nav slot="ticks">
        <syn-range-tick>0</syn-range-tick>
        <syn-range-tick>50</syn-range-tick>
        <syn-range-tick>100</syn-range-tick>
      </nav>
    </syn-range>
    
    <p>It is possible to divide the space between major ticks for finer scale readings.</p>
   
    <syn-range
      class="syn-range-with-tick"
      max="100"
      min="0"
      value="50"
      label="Volume"
    >
      <nav slot="ticks">
        <syn-range-tick>0</syn-range-tick>
        <syn-range-tick subdivision></syn-range-tick>
        <syn-range-tick subdivision></syn-range-tick>
        <syn-range-tick subdivision></syn-range-tick>
        <syn-range-tick subdivision></syn-range-tick>
        <syn-range-tick>50</syn-range-tick>
        <syn-range-tick subdivision></syn-range-tick>
        <syn-range-tick subdivision></syn-range-tick>
        <syn-range-tick subdivision></syn-range-tick>
        <syn-range-tick subdivision></syn-range-tick>
        <syn-range-tick>100</syn-range-tick>
      </nav>
    </syn-range>

  </div>
    <style>
      .wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--syn-spacing-large);
      }

      .syn-range-with-tick nav {
        justify-content: space-between;
        flex-direction: row;
        display: flex;
      }
    </style>
  `,
};

export const TooltipPlacement: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('range', 'tooltip-placement'),
      },
      story: {
        height: '80px',
      },
    },
  },
  render: () => html`
    <syn-range
      tooltip-placement="bottom"
      max="100"
      min="0"
      value="50"
    ></syn-range>
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
    <syn-range
      max="100"
      min="0"
      tooltip-placement="none"
      value="50"
    ></syn-range>
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
    <syn-range
      class="tooltip-formatter"
      max="100"
      min="0"
      value="50"
    >
      <nav slot="ticks">
        <syn-range-tick>0%</syn-range-tick>
        <syn-range-tick>50%</syn-range-tick>
        <syn-range-tick>100%</syn-range-tick>
      </nav>
    </syn-range>
    <style>
      .tooltip-formatter nav {
        justify-content: space-between;
        flex-direction: row;
        display: flex;
      }
    </style>
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
  Invalid,
  Sizes,
  PrefixSuffixText,
  CustomTrackColors,
  CustomTrackOffset,
  MultiThumb,
  Ticks,
  TooltipPlacement,
  TooltipDisabled,
  TooltipFormatter,
}, 500);
/* eslint-enable sort-keys */
