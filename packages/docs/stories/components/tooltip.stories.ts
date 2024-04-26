/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../../../components/src/components/tooltip/tooltip.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-tooltip');
const { overrideArgs } = storybookHelpers('syn-tooltip');
const { generateTemplate } = storybookTemplate('syn-tooltip');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'content',
      type: 'attribute',
      value: 'This is a tooltip',
    },
    {
      name: 'open',
      type: 'attribute',
      value: true,
    },
    {
      name: 'default',
      type: 'slot',
      value: '<syn-button>Hover me</syn-button>',
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-tooltip',
  parameters: {
    design: generateFigmaPluginObject('12852-79550'),
    docs: {
      description: {
        component: generateStoryDescription('tooltip', 'default'),
      },
      story: {
        height: '200px',
        // Unfortunately we need the iframes here, otherwise the tooltips placing is broken
        inline: false,
      },
    },
    layout: 'centered',
  },
  title: 'Components/syn-tooltip',
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
        story: generateStoryDescription('tooltip', 'default'),
      },
    },
  },
  render: (args: unknown) => generateTemplate({ args }),
} as Story;

export const Placement: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('tooltip', 'placement'),
      },
      story: {
        height: '450px',
      },
    },
    layout: 'padded',
  },
  render: () => html`
    <div class="tooltip-placement-example">
      <div class="tooltip-placement-example-row">
        <syn-tooltip content="top-start" placement="top-start" open>
          <syn-button></syn-button>
        </syn-tooltip>

        <syn-tooltip content="top" placement="top" open>
          <syn-button></syn-button>
        </syn-tooltip>

        <syn-tooltip content="top-end" placement="top-end" open>
          <syn-button></syn-button>
        </syn-tooltip>
      </div>

      <div class="tooltip-placement-example-row">
        <syn-tooltip content="left-start" placement="left-start" open>
          <syn-button></syn-button>
        </syn-tooltip>

        <syn-tooltip content="right-start" placement="right-start" open>
          <syn-button></syn-button>
        </syn-tooltip>
      </div>

      <div class="tooltip-placement-example-row">
        <syn-tooltip content="left" placement="left" open>
          <syn-button></syn-button>
        </syn-tooltip>

        <syn-tooltip content="right" placement="right" open>
          <syn-button></syn-button>
        </syn-tooltip>
      </div>

      <div class="tooltip-placement-example-row">
        <syn-tooltip content="left-end" placement="left-end" open>
          <syn-button></syn-button>
        </syn-tooltip>

        <syn-tooltip content="right-end" placement="right-end" open>
          <syn-button></syn-button>
        </syn-tooltip>
      </div>

      <div class="tooltip-placement-example-row">
        <syn-tooltip content="bottom-start" placement="bottom-start" open>
          <syn-button></syn-button>
        </syn-tooltip>

        <syn-tooltip content="bottom" placement="bottom" open>
        <syn-button></syn-button>
        </syn-tooltip>

        <syn-tooltip content="bottom-end" placement="bottom-end" open>
          <syn-button></syn-button>
        </syn-tooltip>
      </div>
    </div>

    <style>
      .tooltip-placement-example {
        width: 500px;
        margin: 5rem 6rem;
      }

      .tooltip-placement-example-row:after {
        content: '';
        display: table;
        clear: both;
      }

      .tooltip-placement-example syn-button {
        float: left;
        width: var(--syn-spacing-2x-large);
        margin-bottom: var(--syn-spacing-medium);
      }

      .tooltip-placement-example-row:nth-child(1) syn-tooltip:first-child syn-button,
      .tooltip-placement-example-row:nth-child(5) syn-tooltip:first-child syn-button {
        margin-left: var(--syn-spacing-3x-large);
        margin-right: var(--syn-spacing-4x-large);
      }

      .tooltip-placement-example-row:nth-child(1) syn-tooltip:nth-child(2) syn-button,
      .tooltip-placement-example-row:nth-child(5) syn-tooltip:nth-child(2) syn-button {
        margin-right: var(--syn-spacing-4x-large);
      }

      .tooltip-placement-example-row:nth-child(2) syn-tooltip:nth-child(2) syn-button,
      .tooltip-placement-example-row:nth-child(3) syn-tooltip:nth-child(2) syn-button,
      .tooltip-placement-example-row:nth-child(4) syn-tooltip:nth-child(2) syn-button {
        margin-left: calc((var(--syn-spacing-2x-large) * 3) + (var(--syn-spacing-4x-large) * 2) + (var(--syn-spacing-medium) * 2));
      }
    </style>
`,
};

export const ClickTrigger: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('tooltip', 'onclick'),
      },
    },
  },
  render: () => html`
  <syn-tooltip content="Click again to dismiss" trigger="click" open>
    <syn-button>Click to Toggle</syn-button>
  </syn-tooltip>
  `,
};

export const ManualTrigger: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('tooltip', 'manuel'),
      },
    },
  },
  render: () => html`
  <syn-button style="margin-right: 4rem;">Toggle Manually</syn-button>
  <syn-tooltip content="This is an avatar" trigger="manual" class="manual-tooltip" open>
    <syn-icon-button name="person" label="Person" size="medium" color="neutral"></syn-icon-button>
  </syn-tooltip>

  <script type="module">
    const tooltip = document.querySelector('.manual-tooltip');
    const toggle = tooltip.previousElementSibling;

    toggle.addEventListener('click', () => (tooltip.open = !tooltip.open));
  </script>
  `,
};

export const RemovingArrows: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('tooltip', 'removingarrows'),
      },
    },
  },
  render: () => html`
  <syn-tooltip content="This is a tooltip" style="--syn-tooltip-arrow-size: 0;" open>
    <syn-button>No Arrow</syn-button>
  </syn-tooltip>
  `,
};

export const HTMLInTooltips: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('tooltip', 'htmltooltip'),
      },
    },
  },
  render: () => html`
  <syn-tooltip open>
    <div slot="content">I'm not <strong>just</strong> a tooltip, I'm a <em>tooltip</em> with HTML!</div>

    <syn-button>Hover me</syn-button>
  </syn-tooltip>
`,
};

export const SettingAMaximumWidth: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('tooltip', 'maxwith'),
      },
      story: {
        height: '400px',
      },
    },
  },
  render: () => html`
  <syn-tooltip style="--max-width: 80px;" content="This tooltip will wrap after only 80 pixels." open>
    <syn-button>Hover me</syn-button>
  </syn-tooltip>
  `,
};

export const Hoisting: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('tooltip', 'hoisting'),
      },
    },
  },
  render: () => html`
  <div class="tooltip-hoist">
    <syn-tooltip content="This is a tooltip" open placement="bottom">
      <syn-button>No Hoist</syn-button>
    </syn-tooltip>

    <syn-tooltip content="This is a tooltip" hoist open>
      <syn-button>Hoist</syn-button>
    </syn-tooltip>
  </div>

  <style>
    .tooltip-hoist {
      position: relative;
      border: solid 2px var(--syn-panel-border-color);
      overflow: hidden;
      padding: var(--syn-spacing-large);
    }
  </style>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Placement,
  ClickTrigger,
  ManualTrigger,
  RemovingArrows,
  HTMLInTooltips,
  SettingAMaximumWidth,
  Hoisting,
}, {
  styleHeading: {
    'margin-bottom': '180px',
  },
  heightPx: 550,
});
