/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../../../components/src/components/range-tick/range-tick.js';
import {
  generateScreenshotStory,
  // generateStoryDescription,
  storybookDefaults,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-range-tick');
const { generateTemplate } = storybookTemplate('syn-range-tick');

const meta: Meta = {
  args: defaultArgs,
  argTypes,
  component: 'syn-range-tick',
  parameters: {
    design: generateFigmaPluginObject('0628-87581'),
    docs: {
      description: {
        // TODO: exchange asap as available
        // component: generateStoryDescription('range-tick', 'default'),
      },
    },
  },
  title: 'Components/syn-range-tick',
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
        // TODO: exchange asap as available
        // story: generateStoryDescription('range-tick', 'default'),
      },
    },
  },
  render: (args: unknown) => generateTemplate({ args }),
} as Story;

export const Labels: Story = {
  parameters: {
    docs: {
      description: {
        // TODO: exchange asap as available
        // story: generateStoryDescription('range-tick', 'labels'),
      },
    },
  },
  render: () => html`
    <syn-range-tick label="0"></syn-range-tick>
  `,
};

export const Grouping: Story = {
  parameters: {
    docs: {
      description: {
        // TODO: exchange asap as available
        // story: generateStoryDescription('range', 'labels'),
      },
    },
  },
  render: () => html`
    <div class="groupings">
      <div class="even-group">
        <syn-range-tick label="0"></syn-range-tick>
        <syn-range-tick label="50"></syn-range-tick>
        <syn-range-tick label="100"></syn-range-tick> 
      </div>

      <div class="uneven-group">
        <syn-range-tick label="1"></syn-range-tick>
        <syn-range-tick label="2"></syn-range-tick>
        <syn-range-tick label="3"></syn-range-tick> 
        <syn-range-tick label="5"></syn-range-tick> 
        <syn-range-tick label="8"></syn-range-tick> 
        <syn-range-tick label="13"></syn-range-tick> 
      </div>
    </div>
    <style>
      .groupings {
        display: flex;
        flex-direction: column;
        gap: var(--syn-spacing-4x-large);
      }

      .even-group {
        justify-content: space-between;
        flex-direction: row;
        display: flex;
      }

      .uneven-group {
        justify-content: space-between;
        flex-direction: row;
        display: flex;
      }

      .uneven-group syn-range-tick {
        flex-grow: 1;
      }
   
      .uneven-group syn-range-tick:nth-child(3) {
        flex-grow: 2;
      }

      .uneven-group syn-range-tick:nth-child(4) {
        flex-grow: 3;
      }

      .uneven-group syn-range-tick:nth-child(5) {
        flex-grow: 5;
      }
    </style>
  `,
};

// Bundled screenshot story
/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Labels,
  Grouping,
}, 230);
/* eslint-enable sort-keys */
