/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
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
    },
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

/**
 * Use the placement attribute to set the preferred placement of the tooltip.
 */
export const Placement: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('tooltip', 'placement'),
      },
    },
  },
  render: () => html`
    <div class="tooltip-placement-example">
      <div class="tooltip-placement-example-row">
        <syn-tooltip content="top-start" placement="top-start">
          <syn-button></syn-button>
        </syn-tooltip>

        <syn-tooltip content="top" placement="top">
          <syn-button></syn-button>
        </syn-tooltip>

        <syn-tooltip content="top-end" placement="top-end">
          <syn-button></syn-button>
        </syn-tooltip>
      </div>

      <div class="tooltip-placement-example-row">
        <syn-tooltip content="left-start" placement="left-start">
          <syn-button></syn-button>
        </syn-tooltip>

        <syn-tooltip content="right-start" placement="right-start">
          <syn-button></syn-button>
        </syn-tooltip>
      </div>

      <div class="tooltip-placement-example-row">
        <syn-tooltip content="left" placement="left">
          <syn-button></syn-button>
        </syn-tooltip>

        <syn-tooltip content="right" placement="right">
          <syn-button></syn-button>
        </syn-tooltip>
      </div>

      <div class="tooltip-placement-example-row">
        <syn-tooltip content="left-end" placement="left-end">
          <syn-button></syn-button>
        </syn-tooltip>

        <syn-tooltip content="right-end" placement="right-end">
          <syn-button></syn-button>
        </syn-tooltip>
      </div>

      <div class="tooltip-placement-example-row">
        <syn-tooltip content="bottom-start" placement="bottom-start">
          <syn-button></syn-button>
        </syn-tooltip>

        <syn-tooltip content="bottom" placement="bottom">
        <syn-button></syn-button>
        </syn-tooltip>

        <syn-tooltip content="bottom-end" placement="bottom-end">
          <syn-button></syn-button>
        </syn-tooltip>
      </div>
    </div>

    <style>
      .tooltip-placement-example {
        width: 250px;
        margin: 1rem;
      }

      .tooltip-placement-example-row:after {
        content: '';
        display: table;
        clear: both;
      }

      .tooltip-placement-example syn-button {
        float: left;
        width: 2.5rem;
        margin-right: 0.25rem;
        margin-bottom: 0.25rem;
      }

      .tooltip-placement-example-row:nth-child(1) syn-tooltip:first-child syn-button,
      .tooltip-placement-example-row:nth-child(5) syn-tooltip:first-child syn-button {
        margin-left: calc(40px + 0.25rem);
      }

      .tooltip-placement-example-row:nth-child(2) syn-tooltip:nth-child(2) syn-button,
      .tooltip-placement-example-row:nth-child(3) syn-tooltip:nth-child(2) syn-button,
      .tooltip-placement-example-row:nth-child(4) syn-tooltip:nth-child(2) syn-button {
        margin-left: calc((40px * 3) + (0.25rem * 3));
      }
    </style>
`,
};

// /**
//  * Set the trigger attribute to click to toggle the tooltip on click instead of hover.
//  */
// export const ClickTrigger: Story = {
//   render: () => html`<syn-tooltip content="Click again to dismiss" trigger="click">
//   <syn-button>Click to Toggle</syn-button>
// </syn-tooltip>`,
// };

// /**
//  * Tooltips can be controlled programmatically by setting the trigger attribute to manual. Use the open attribute to control when the tooltip is shown.
//  */
// export const ManualTrigger: Story = {
//   render: () => html`<syn-button style="margin-right: 4rem;">Toggle Manually</syn-button>

// <syn-tooltip content="This is an avatar" trigger="manual" class="manual-tooltip">
//   <syn-avatar label="User"></syn-avatar>
// </syn-tooltip>

// <script type="module">
//   const tooltip = document.querySelector('.manual-tooltip');
//   const toggle = tooltip.previousElementSibling;

//   toggle.addEventListener('click', () => (tooltip.open = !tooltip.open));
// </script>`,
// };

// /**
//  * You can control the size of tooltip arrows by overriding the --syn-tooltip-arrow-size design token. To remove them, set the value to 0 as shown below.
//  */
// export const RemovingArrows: Story = {
//   render: () => html`<syn-tooltip content="This is a tooltip" style="--syn-tooltip-arrow-size: 0;">
//   <syn-button>No Arrow</syn-button>
// </syn-tooltip>`,
// };

// /**
//  * Use the content slot to create tooltips with HTML content. Tooltips are designed only for text and presentational elements. Avoid placing interactive content, such as buttons, links, and form controls, in a tooltip.
//  */
// export const HTMLInTooltips: Story = {
//   render: () => html`<syn-tooltip>
//   <div slot="content">I'm not <strong>just</strong> a tooltip, I'm a <em>tooltip</em> with HTML!</div>

//   <syn-button>Hover me</syn-button>
// </syn-tooltip>`,
// };

// /**
//  * Use the --max-width custom property to change the width the tooltip can grow to before wrapping occurs.
//  */
// export const SettingAMaximumWidth: Story = {
//   render: () => html`<syn-tooltip style="--max-width: 80px;" content="This tooltip will wrap after only 80 pixels.">
//   <syn-button>Hover me</syn-button>
// </syn-tooltip>`,
// };

// /**
//  * Tooltips will be clipped if they're inside a container that has overflow: auto|hidden|scroll. The hoist attribute forces the tooltip to use a fixed positioning strategy, allowing it to break out of the container. In this case, the tooltip will be positioned relative to its , which is usually the viewport unless an ancestor uses a transform, perspective, or filter.  for more details.
//  */
// export const Hoisting: Story = {
//   render: () => html`<div class="tooltip-hoist">
//   <syn-tooltip content="This is a tooltip">
//     <syn-button>No Hoist</syn-button>
//   </syn-tooltip>

//   <syn-tooltip content="This is a tooltip" hoist>
//     <syn-button>Hoist</syn-button>
//   </syn-tooltip>
// </div>

// <style>
//   .tooltip-hoist {
//     position: relative;
//     border: solid 2px var(--syn-panel-border-color);
//     overflow: hidden;
//     padding: var(--syn-spacing-medium);
//   }
// </style>`,
// };
