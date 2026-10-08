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

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('calendar', 'size'),
      },
    },
  },
  render: () => html`
    <div style="align-items: flex-start; display: flex; flex-direction: row; gap: var(--syn-spacing-large);">
      <syn-calendar size="small" mode="single" value="2026-12-24"></syn-calendar>
      <syn-calendar size="medium" mode="single" value="2026-12-24"></syn-calendar>
      <syn-calendar size="large" mode="single" value="2026-12-24"></syn-calendar>
    </div>
  `,
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
      mode="single"
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
      mode="single"
      max="2026-12-31"
      value="2026-12-24"
    ></syn-calendar>
  `,
};

export const DisabledWeekDays: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('calendar', 'disabled-weekdays'),
      },
    },
  },
  render: () => html`
  <syn-calendar
    disabled-weekdays="sat sun"
    mode="single"
    value="2026-10-06"
  ></syn-calendar>`,
};

export const DisabledDates: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('calendar', 'disabled-dates'),
      },
    },
  },
  render: () => html`<syn-calendar
    disabled-dates="2026-12-25"
    mode="single"
    value="2026-12-24"
  ></syn-calendar>`,
};

export const RangeSelection: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('calendar', 'range-selection'),
      },
    },
  },
  render: () => html`<syn-calendar
    mode="range"
    value="2026-10-06 2026-10-12"
  ></syn-calendar>`,
};

export const MultipleSelection: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('calendar', 'multiple-selection'),
      },
    },
  },
  render: () => html`<syn-calendar
    mode="multiple"
    value="2026-10-06 2026-10-12"
  ></syn-calendar>`,
};

export const MultipleEmpty: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('calendar', 'multiple-empty'),
      },
    },
  },
  render: () => html`<syn-calendar mode="multiple" value=""></syn-calendar>`,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  MultipleEmpty,
  MultipleSelection,
  MinDate,
  MaxDate,
  DisabledWeekDays,
  DisabledDates,
  RangeSelection,
}, 100);
/* eslint-enable sort-keys */
