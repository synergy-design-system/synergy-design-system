import '../../../components/src/components/checkbox/checkbox.js';
import '../../../components/src/components/fieldset/fieldset.js';
import '../../../components/src/components/textarea/textarea.js';
import '../../../components/src/components/input/input.js';
import '../../../components/src/components/radio-group/radio-group.js';
import '../../../components/src/components/radio/radio.js';
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
      name: 'layout',
      type: 'attribute',
      value: 'two-columns',
    },
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
        <syn-radio-group layout="horizontal" name="item-4" label="Item 4">
          <syn-radio name="radio-1" value="1">Option 1</syn-radio>
          <syn-radio name="radio-2" value="2">Option 2</syn-radio>
          <syn-radio name="radio-3" value="3">Option 3</syn-radio>
        </syn-radio-group>
        <syn-input name="item-5" label="Item 5"></syn-input>
        <syn-textarea name="item-6" label="Item 6"></syn-textarea>
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

export const ItemSpacing: Story = {
  parameters: {
    controls: {
      disable: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('fieldset', 'item-spacing'),
      },
    },
  },
  render: () => html`
    <syn-fieldset
      layout="two-columns"
      legend="Item spacing"
      item-spacing="dense"
    >
      <syn-checkbox name="checkbox-1">Checkbox 1</syn-checkbox>
      <syn-checkbox name="checkbox-2">Checkbox 2</syn-checkbox>
      <syn-checkbox name="checkbox-3">Checkbox 3</syn-checkbox>
      <syn-checkbox name="checkbox-4">Checkbox 4</syn-checkbox>
      <syn-checkbox name="checkbox-5">Checkbox 5</syn-checkbox>
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
  ItemSpacing,
  Disabled,
}, 750);
/* eslint-enable sort-keys */
