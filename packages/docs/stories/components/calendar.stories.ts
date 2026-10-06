import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../../components/src/components/calendar/calendar.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { Chromatic_Modes_All } from '../../.storybook/modes.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-calendar');
const { overrideArgs } = storybookHelpers('syn-calendar');
const { generateTemplate } = storybookTemplate('syn-calendar');

const meta: Meta = {
  args: overrideArgs([], defaultArgs),
  argTypes,
  component: 'syn-calendar',
  parameters: {
    chromatic: {
      modes: Chromatic_Modes_All,
    },
    docs: {
      description: {
        component: generateStoryDescription('calendar', 'default'),
      },
    },
  },
  tags: ['Forms'],
  title: 'Components/syn-calendar',
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
        story: generateStoryDescription('calendar', 'default'),
      },
    },
  },
  render: args => generateTemplate({ args }),
};

export const MinDate: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('calendar', 'min-date'),
      },
    },
  },
  render: () => html`
    <syn-calendar
      min="2026-12-15"
      value="2026-12-24"
    ></syn-calendar>
  `,
};

export const MaxDate: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('calendar', 'max-date'),
      },
    },
  },
  render: () => html`
    <syn-calendar
      max="2026-12-31"
      value="2026-12-24"
    ></syn-calendar>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  MinDate,
  MaxDate,
}, 100);
/* eslint-enable sort-keys */
