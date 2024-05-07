/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../../../components/src/components/details/details.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-details');
const { overrideArgs } = storybookHelpers('syn-details');
const { generateTemplate } = storybookTemplate('syn-details');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'summary',
      type: 'attribute',
      value: 'Toggle me',
    },
    {
      name: 'default',
      type: 'slot',
      value: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-details',
  parameters: {
    design: generateFigmaPluginObject('16771-27087'),
    docs: {
      description: {
        component: generateStoryDescription('details', 'default'),
      },
    },
  },
  title: 'Components/syn-details',
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
        story: generateStoryDescription('details', 'default'),
      },
    },
  },
  render: (args: unknown) => html`
    ${generateTemplate({ args })}
    <style>
    syn-details {
      max-width: 400px;
    }
    </style>
  `,
} as Story;

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('details', 'disabled'),
      },
    },
  },
  render: () => html`
    <syn-details class="details-disabled" summary="Toggle Me" disabled>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </syn-details>
    <style>
      .details-disabled {
        max-width: 400px;
      }
    </style>
  `,
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('details', 'size'),
      },
    },
  },
  render: () => html`
    <syn-details class="details-sizes" size="small">
      <syn-icon name="wallpaper" slot="summary"></syn-icon>
      <span slot="summary">Toggle Me</span>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </syn-details>
    <syn-details class="details-sizes" size="medium">
      <syn-icon name="wallpaper" slot="summary"></syn-icon>
      <span slot="summary">Toggle Me</span>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </syn-details>
    <style>
      .details-sizes {
        max-width: 400px;
      }
    </style>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Disabled,
  Sizes,
}, 200);
/* eslint-enable sort-keys */
