/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import '../../../components/src/components/combobox/combobox';
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

const { args, argTypes } = storybookDefaults('syn-combobox');
const { overrideArgs } = storybookHelpers('syn-combobox');
const { generateTemplate } = storybookTemplate('syn-combobox');

const meta: Meta = {
  args,
  argTypes,
  component: 'syn-combobox',
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
  title: 'Components/syn-combobox',
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
  'White',
  'Purple',
  'Pink',
  'Black',
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
      value: createColorOptions().join('\n'),
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
  render: (renderArgs: unknown) => generateTemplate({ args: renderArgs }),

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
    <syn-combobox label="Custom result item">
     ${createColorOptionsHtml()}
    </syn-combobox>
    <script type="module">
      const combobox = document.querySelector('syn-combobox');
      
    </script>
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
    <syn-combobox label="Highlight query">
     ${createColorOptionsHtml()}
    </syn-combobox>
    <script type="module">
      const combobox = document.querySelector('syn-combobox');
      combobox.getOption = (option, queryString) => {
        const mark = document.createElement('mark');
        mark.textContent = queryString;
        option.innerHTML = option.innerHTML.replace(new RegExp(queryString, 'i'), mark.outerHTML);
        return option; 
      }
    </script>
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
    <syn-combobox label="Highlight query">
     ${createColorOptionsHtml()}
    </syn-combobox>
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
    <syn-combobox label="Group elements">
      <syn-optgroup label="Colors">
        <syn-option value="Yellow">Yellow</syn-option>
        <syn-option value="Light Green">Light Green</syn-option>
      </syn-optgroup>
    </syn-combobox>
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
    <syn-combobox id="max-height" label="Max Height for list">
      ${createColorOptionsHtml()}
    </syn-combobox>
    <style>
      #max-height::part(listbox) {
        max-height: 112px;
      }
    </style>
  `,
};
