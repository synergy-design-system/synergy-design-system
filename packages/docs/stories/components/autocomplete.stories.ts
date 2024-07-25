/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import '../../../components/src/components/autocomplete/autocomplete';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { SynButton } from '@synergy-design-system/components';
import { html } from 'lit';
import { userEvent } from '@storybook/test';
import { openSelect } from '../../src/helpers/select.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const { args, argTypes } = storybookDefaults('syn-autocomplete');
const { overrideArgs } = storybookHelpers('syn-autocomplete');
const { generateTemplate } = storybookTemplate('syn-autocomplete');

const meta: Meta = {
  args,
  argTypes,
  component: 'syn-autocomplete',
  parameters: {
    design: generateFigmaPluginObject('5069-7562'),
    docs: {
      description: {
        component: generateStoryDescription('select', 'default'),
      },
      story: {
        height: '250px',
      },
    },
  },
  title: 'Components/syn-autocomplete',
};
export default meta;

type Story = StoryObj;

const colors = [
  'Yellow',
  'Light Green',
  'Grey',
  'Green',
  'Blue',
  'Red',
  'Orange',
  'Magenta',
  'Black',
  'White',
  'Purple',
  'Pink',
  'Brown',
].sort();

const createColorOption = (color: string) => `<syn-option value="${color}">${color}</syn-option>`;

const createColorOptionHtml = (color: string) => unsafeHTML(createColorOption(color));

const createColorOptions = () => colors.map(createColorOption);

const createColorOptionsHtml = () => unsafeHTML(createColorOptions().join('\n'));

export const Default = {
  parameters: {
    args: overrideArgs({
      name: 'default',
      type: 'slot',
      value: createColorOptions(),
    }, args),
    controls: {
      disable: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('select', 'default'),
      },
    },
  },
  render: (renderArgs: unknown) => html`
    ${generateTemplate({ args: renderArgs })}
    <script type="module">
      const auto = document.querySelector('syn-autocomplete');
      auto.addEventListener('syn-change', (event) => {
        // console.log('change', event.target.value);
      });
      auto.addEventListener('syn-input', (event) => {
        // console.log('input', event.target.value);
      });
    </script>
  `,
} as Story;

// TODO: do we still need this?
export const CustomResultItem: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'labels'),
      },
    },
  },
  render: () => html`
    <syn-autocomplete label="Custom result item">
     ${createColorOptionsHtml()}
    </syn-autocomplete>
  `,
};

export const HighlightQuery: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'labels'),
      },
    },
  },
  render: () => html`
    <syn-autocomplete label="Highlight query" highlight>
     ${createColorOptionsHtml()}
    </syn-autocomplete>
  `,
};

export const OpenOnClick: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'labels'),
      },
    },
  },
  render: () => html`
    <syn-autocomplete label="Highlight query" highlight>
     ${createColorOptionsHtml()}
    </syn-autocomplete>
  `,
};

export const GroupElements: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'labels'),
      },
    },
  },
  render: () => html`
    <syn-autocomplete label="Group elements" highlight>
      <syn-optgroup label="Colors">
        <syn-option value="Yellow">Yellow</syn-option>
        <syn-option value="Light Green">Light Green</syn-option>
    </syn-optgroup>
    </syn-autocomplete>
  `,
};

export const SuggestionContainerHeight: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'labels'),
      },
    },
  },
  render: () => html`
    <syn-autocomplete id="max-height" label="Max Height for list" highlight>
      ${createColorOptionsHtml()}
    </syn-autocomplete>
    <style>
      #max-height::part(listbox) {
        max-height: 112px;
      }
    </style>
  `,
};
