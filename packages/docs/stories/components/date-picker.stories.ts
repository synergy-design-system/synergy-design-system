import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../../components/src/components/date-picker/date-picker.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { Chromatic_Modes_All } from '../../.storybook/modes.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-date-picker');
const { overrideArgs } = storybookHelpers('syn-date-picker');
const { generateTemplate } = storybookTemplate('syn-date-picker');

const meta: Meta = {
  args: overrideArgs([], defaultArgs),
  argTypes,
  component: 'syn-date-picker',
  parameters: {
    chromatic: {
      modes: Chromatic_Modes_All,
    },
    docs: {
      description: {
        component: generateStoryDescription('date-picker', 'default'),
      },
    },
  },
  tags: ['Forms'],
  title: 'Components/syn-date-picker',
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
        story: generateStoryDescription('date-picker', 'default'),
      },
    },
  },
  render: args => generateTemplate({ args }),
};

export const Range: Story = {
  render: () => html`
    <syn-date-picker label="Travel period" mode="range" value="2026-10-15 2026-10-20" clearable></syn-date-picker>
  `,
};

export const Multiple: Story = {
  render: () => html`
    <syn-date-picker label="Selected days" mode="multiple" value="2026-10-15 2026-10-20" clearable></syn-date-picker>
  `,
};

export const Localization: Story = {
  render: () => html`
    <div style="display: grid; gap: var(--syn-spacing-medium); max-width: 420px;">
      ${['en-US', 'en-GB', 'de-DE', 'ja-JP'].map(locale => html`
        <syn-date-picker label=${locale} lang=${locale} value="2026-10-15"></syn-date-picker>
      `)}
    </div>
  `,
};

export const Constraints: Story = {
  render: () => html`
    <syn-date-picker
      label="Available travel dates"
      mode="range"
      min="2026-10-01"
      max="2026-12-31"
      min-range="3"
      max-range="14"
      disabled-weekdays="sat sun"
      disabled-dates="2026-12-25"
      value="2026-10-15 2026-10-20"
      .isDateDisabled=${(date: Date) => date.getUTCDay() === 5 && date.getUTCDate() === 13}
    ></syn-date-picker>
  `,
};

export const InteractionStates: Story = {
  render: () => html`
    <div style="display: grid; gap: var(--syn-spacing-medium); max-width: 420px;">
      <syn-date-picker label="Readonly date" readonly value="2026-10-15" clearable></syn-date-picker>
      <syn-date-picker label="Disabled date" disabled value="2026-10-15" clearable></syn-date-picker>
      <syn-date-picker label="Required date" required clearable></syn-date-picker>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: grid; gap: var(--syn-spacing-medium); max-width: 420px;">
      ${['small', 'medium', 'large'].map(size => html`
        <syn-date-picker label=${size} size=${size} value="2026-10-15" clearable></syn-date-picker>
      `)}
    </div>
  `,
};

export const RightToLeft: Story = {
  render: () => html`
    <syn-date-picker label="Date" lang="ar" dir="rtl" value="2026-10-15" clearable></syn-date-picker>
  `,
};

export const CancelableChanges: Story = {
  render: () => html`
    <syn-date-picker
      label="Locked approval date"
      value="2026-10-15"
      clearable
      @syn-before-change=${(event: Event) => event.preventDefault()}
    ></syn-date-picker>
  `,
};

export const FormReset: Story = {
  render: () => html`
    <form @submit=${(event: Event) => event.preventDefault()}>
      <syn-date-picker label="Appointment" name="appointment" value="2026-10-15" required clearable></syn-date-picker>
      <syn-date-picker label="Travel period" name="travel" mode="range" clearable></syn-date-picker>
      <syn-date-picker label="Selected days" name="days" mode="multiple" clearable></syn-date-picker>
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>
  `,
};

export const Demo: Story = {
  render: () => html`
    <form name="something">
      <syn-date-picker
        clearable
        name="something"
        value="2024-06-06"
        required
      >
        <span slot="label">Wurstbrot</span>
        <span slot="prefix">Prefix</span>
        <span slot="suffix">Sufix</span>
        <span slot="help-text">This is some help text.</span>
      </syn-date-picker>

      <syn-date-picker
        clearable
        name="something-else"
        mode="multiple"
        label="Multiple"
        help-text="Please select multiple dates"
      >
      </syn-date-picker>

      <syn-date-picker
        clearable
        name="something-even-elser"
        mode="range"
        label="Range"
        help-text="Please select a date range"
      >
      </syn-date-picker>
      <button type="submit">Submit</button>
    </form>

    <script>
      document.querySelector('form').addEventListener('submit', event => {
        event.preventDefault();
        console.log('Form submitted');

        const fd = new FormData(event.target);
        for (const [key, value] of fd.entries()) {
          console.log(key, value);
        }
      });
    </script>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Range,
  Multiple,
  Localization,
  Constraints,
  InteractionStates,
  Sizes,
  RightToLeft,
}, 350);
/* eslint-enable sort-keys */
