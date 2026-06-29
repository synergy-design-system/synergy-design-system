import '../../../components/src/components/button/button.js';
import '../../../components/src/components/combobox/combobox.js';
import '../../../components/src/components/checkbox/checkbox.js';
import '../../../components/src/components/fieldset/fieldset.js';
import '../../../components/src/components/input/input.js';
import '../../../components/src/components/select/select.js';
import '../../../components/src/components/option/option.js';
import '../../../components/src/components/textarea/textarea.js';
import { html } from 'lit';
import type { Meta, StoryObj as Story } from '@storybook/web-components-vite';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';
import { Chromatic_Modes_All } from '../../.storybook/modes.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-fieldset');
const { overrideArgs } = storybookHelpers('syn-fieldset');
const { generateTemplate } = storybookTemplate('syn-fieldset');

const createFields = (amount = 3) => Array.from(
  { length: amount },
  (_, i) => html`
    <syn-input
      name="item-${i + 1}"
      label="Item ${i + 1}">
    </syn-input>
  `,
);

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'legend',
      type: 'attribute',
      value: 'Legend',
    },
    {
      name: 'description',
      type: 'attribute',
      value: 'Description text for the fieldset. This is optional and can be used to provide additional information about the fieldset.',
    },
    {
      name: 'default',
      type: 'slot',
      value: `
        <syn-input name="item-1" label="Item 1"></syn-input>
        <syn-input name="item-2" label="Item 2"></syn-input>
        <syn-input name="item-3" label="Item 3"></syn-input>
      `,
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-fieldset',
  parameters: {
    chromatic: {
      modes: Chromatic_Modes_All,
    },
    design: generateFigmaPluginObject('41310-271865'),
    docs: {
      description: {
        component: generateStoryDescription('fieldset', 'default'),
      },
    },
  },
  tags: ['Form', 'Structure'],
  title: 'Components/syn-fieldset',
};
export default meta;

export const Default: Story = {
  parameters: {
    controls: {
      disable: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('fieldset', 'default'),
      },
    },
  },
  render: args => generateTemplate({ args }),
};

export const OneColumnLayout: Story = {
  parameters: {
    controls: {
      disable: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('fieldset', 'one-column-layout'),
      },
    },
  },
  render: () => html`
    <syn-fieldset
      description="For container widths < 640px"
      layout="one-column"
      legend="One column layout"
    >
      ${createFields(6)}
    </syn-fieldset>
  `,
};

export const TwoColumnLayout: Story = {
  parameters: {
    controls: {
      disable: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('fieldset', 'two-column-layout'),
      },
    },
  },
  render: () => html`
    <syn-fieldset
      description="For container widths ≥ 640px"
      layout="two-columns"
      legend="Two column layout"
    >
      ${createFields(6)}
    </syn-fieldset>
  `,
};

export const Disabled: Story = {
  parameters: {
    controls: {
      disable: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('fieldset', 'disabled'),
      },
    },
  },
  render: () => html`
    <syn-fieldset
      disabled
      layout="two-columns"
      legend="Disabled fieldset"
    >
      ${createFields(6)}
    </syn-fieldset>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  OneColumnLayout,
  TwoColumnLayout,
  Disabled,
}, 750);
/* eslint-enable sort-keys */
