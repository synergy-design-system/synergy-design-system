import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../../components/src/components/card/card.js';
import '../../../components/src/components/calendar/calendar.js';
import type SynCalendar from '../../../components/src/components/calendar/calendar.js';
import '../../../components/src/translations/fr.js';
import '../../../components/src/translations/ja.js';
import '../../../components/src/translations/zh-cn.js';
import '../../../components/src/translations/es.js';
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

export const Localization: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('calendar', 'localization'),
      },
    },
  },
  render: () => html`
    <div style="align-items: flex-start; display: flex; flex-wrap: wrap; flex-direction: row; gap: var(--syn-spacing-large);">
      ${['fr', 'ja', 'zh', 'es'].map(locale => html`
        <syn-card>
          <span class="syn-heading--medium" slot="header">Locale: ${locale}</span>
          <syn-calendar lang="${locale}"></syn-calendar>
        </syn-card>
      `)}
    </div>
  `,
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('calendar', 'disabled'),
      },
    },
  },
  render: () => html`
    <syn-calendar
      disabled
      mode="range"
      value="2026-10-07 2026-10-12"
    ></syn-calendar>
  `,
};

export const Readonly: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('calendar', 'readonly'),
      },
    },
  },
  render: () => html`
    <syn-calendar
      mode="range"
      readonly
      value="2026-10-07"
    ></syn-calendar>
  `,
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

export const Focus: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('calendar', 'focus'),
      },
    },
  },
  play: ({ canvasElement }) => {
    const calendar = canvasElement.querySelector<SynCalendar>('syn-calendar');
    if (calendar) {
      calendar.focus();
    }
  },
  render: () => html`<syn-calendar value="2026-12-24"></syn-calendar>`,
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
    ></syn-calendar>
  `,
};

export const DisabledDates: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('calendar', 'disabled-dates'),
      },
    },
  },
  render: () => html`
    <syn-calendar
      disabled-dates="2026-12-25"
      mode="single"
      value="2026-12-24"
    ></syn-calendar>
  `,
};

export const CustomDisabledDates: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('calendar', 'custom-disabled-dates'),
      },
    },
  },
  render: () => html`
    <syn-calendar class="custom-disabled-dates" value="2026-11-12"></syn-calendar>

    <script type="module">
    const calendar = document.querySelector('.custom-disabled-dates');
    // Disables all Fridays the 13th
    calendar.isDateDisabled = date => date.getUTCDay() === 5 && date.getUTCDate() === 13;
    </script>
  `,
};

export const RangeSelection: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('calendar', 'range-selection'),
      },
    },
  },
  render: () => html`
    <syn-calendar
      mode="range"
      value="2026-10-06 2026-10-12"
    ></syn-calendar>
  `,
};

export const RangeLengthConstraints: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('calendar', 'range-length-constraints'),
      },
    },
  },
  render: () => html`
    <syn-calendar
      max-range="14"
      min-range="3"
      mode="range"
      value="2026-10-07"
    ></syn-calendar>
  `,
};

export const MultipleSelection: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('calendar', 'multiple-selection'),
      },
    },
  },
  render: () => html`
    <syn-calendar
      mode="multiple"
      value="2026-10-06 2026-10-12"
    ></syn-calendar>
  `,
};

export const CustomDayContent: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('calendar', 'custom-day-content'),
      },
    },
  },
  render: () => html`
    <syn-calendar
      value="2026-12-23"
    >
      <span slot="day-2026-12-24">🎁</span>
  </syn-calendar>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Localization,
  Disabled,
  Readonly,
  Sizes,
  MinDate,
  MaxDate,
  DisabledWeekDays,
  DisabledDates,
  CustomDisabledDates,
  RangeSelection,
  RangeLengthConstraints,
  MultipleSelection,
  CustomDayContent,
}, 350);
/* eslint-enable sort-keys */
