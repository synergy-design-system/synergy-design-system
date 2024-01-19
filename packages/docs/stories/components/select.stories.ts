/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import '../../../components/src/components/select/select';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';

const { args, argTypes } = storybookDefaults('syn-select');
const { overrideArgs } = storybookHelpers('syn-select');
const { generateTemplate } = storybookTemplate('syn-select');

const meta: Meta = {
  args,
  argTypes,
  component: 'syn-select',
  parameters: {
    docs: {
      description: {
        component: generateStoryDescription('select', 'default'),
      },
      story: {
        height: '250px',
      },
    },
  },
  title: 'Components/syn-select',
};
export default meta;

type Story = StoryObj;

export const Default = {
  parameters: {
    args: overrideArgs({
      name: 'default',
      type: 'slot',
      value: `
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2">Option 2</syn-option>
        <syn-option value="option-3">Option 3</syn-option>
      `,
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

export const Focus: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('select', 'focus'),
      },
    },
  },
  play: ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const elm = canvasElement.querySelector('syn-select');
    if (elm) {
      elm.focus();
    }
  },
  render: () => html`
    <syn-select label="Select one">
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-select>
  `,
};

export const Labels: Story = {
  name: 'Labels',
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'labels'),
      },
    },
  },
  render: () => html`
    <syn-select label="Select one">
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-select>
  `,
};

export const HelpText: Story = {
  name: 'Help Text',
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'help-text'),
      },
    },
  },
  render: () => html`
    <syn-select label="Experience" help-text="Please tell us your skill level.">
      <syn-option value="1">Novice</syn-option>
      <syn-option value="2">Intermediate</syn-option>
      <syn-option value="3">Advanced</syn-option>
    </syn-select>
  `,
};

export const Placeholders: Story = {
  name: 'Placeholders',
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'placeholder'),
      },
    },
  },
  render: () => html`
    <syn-select placeholder="Select one">
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-select>
  `,
};

export const Clearable: Story = {
  name: 'Clearable',
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'clearable'),
      },
    },
  },
  render: () => html`
    <syn-select clearable value="option-1">
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-select>
  `,
};

export const Disabled: Story = {
  name: 'Disabled',
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'disabled'),
      },
    },
  },
  render: () => html`
    <syn-select placeholder="Disabled" disabled>
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-select>
  `,
};

export const Multiple: Story = {
  name: 'Multiple',
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'multiple'),
      },
    },
  },
  render: () => html`
    <syn-select label="Select a Few" value="option-1 option-2 option-3" multiple clearable>
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
      <syn-option value="option-4">Option 4</syn-option>
      <syn-option value="option-5">Option 5</syn-option>
      <syn-option value="option-6">Option 6</syn-option>
    </syn-select>
  `,
};

export const SettingInitialValues: Story = {
  name: 'Setting Initial Values',
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'initialvalue'),
      },
    },
  },
  render: () => html`
    <syn-select value="option-1 option-2 option-3 option-4" multiple clearable>
      <syn-option value="option-1">Option</syn-option>
      <syn-option value="option-2">Option 1</syn-option>
      <syn-option value="option-3">Option 2</syn-option>
      <syn-option value="option-4">Option 3</syn-option>
    </syn-select>
  `,
};

export const GroupingOptions: Story = {
  name: 'Grouping Options',
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'group'),
      },
    },
  },
  render: () => html`
    <syn-select>
      <syn-optgroup label="Option">
        <syn-option value="1">Option</syn-option>
        <syn-option value="2">Option</syn-option>
      </syn-optgroup>
      <syn-optgroup label="Option">
        <syn-option value="3">Option</syn-option>
      </syn-optgroup>
    </syn-select>
  `,
};

export const MultipleWithGroupingOptions: Story = {
  name: 'Multiple with Grouping Options',
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'multiple'),
      },
    },
  },
  render: () => html`
    <syn-select value="option-1 option-2 option-3" multiple clearable>
      <syn-optgroup label="Option">
        <syn-option value="option-1">Option</syn-option>
        <syn-option value="option-2">Option</syn-option>
      </syn-optgroup>
      <syn-optgroup label="Option">
        <syn-option value="option-3">Option</syn-option>
      </syn-optgroup>
    </syn-select>
  `,
};

export const Sizes: Story = {
  name: 'Sizes',
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'size'),
      },
    },
  },
  render: () => html`
    <syn-select placeholder="Small" size="small">
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-select>

    <br />

    <syn-select placeholder="Medium" size="medium">
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-select>

    <br />

    <syn-select placeholder="Large" size="large">
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-select>
  `,
};

export const PrefixSuffixTextAndIcons: Story = {
  name: 'Prefix Suffix Text and Icons',
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'prefix'),
      },
    },
  },
  render: () => html`
    <syn-select placeholder="Small" size="small" clearable>
      <syn-icon name="wallpaper" slot="prefix"></syn-icon>
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-select>
    <br />
    <syn-select placeholder="Medium" size="medium" clearable>
      <syn-icon name="wallpaper" slot="prefix"></syn-icon>
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-select>
    <br />
    <syn-select placeholder="Large" size="large" clearable>
      <syn-icon name="wallpaper" slot="prefix"></syn-icon>
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-select>
  `,
};

export const CustomTags: Story = {
  name: 'Custom Tags',
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'gettag'),
      },
    },
  },
  render: () => html`
    <syn-select
      placeholder="Select one"
      value="option email phone"
      multiple
      clearable
      class="custom-tag"
    >
      <syn-option value="option">Option</syn-option>
      <syn-option value="email">
        <syn-icon slot="prefix" name="mail_lock"></syn-icon>
        Email
      </syn-option>
      <syn-option value="phone">
        <syn-icon slot="prefix" name="phone_callback"></syn-icon>
        Phone
      </syn-option>
      <syn-option value="chat">
        <syn-icon slot="prefix" name="chat_bubble"></syn-icon>
        Chat
      </syn-option>
    </syn-select>

    <script type="module">
      const select = document.querySelector('.custom-tag');

      select.getTag = (option, index) => {
        // Use the same icon used in the <syn-option>
        const optionElement = option.querySelector('syn-icon[slot="prefix"]');
        
        if (!optionElement) {
          return \`
          <syn-tag removable>
          \${option.getTextLabel()}
          </syn-tag>
          \`;
        }
        
        const { name } = optionElement;

        // You can return a string, a Lit Template, or an HTMLElement here
        return \`
          <syn-tag removable>
            <syn-icon name="\${name}"></syn-icon>
            \${option.getTextLabel()}
          </syn-tag>
        \`;
      };
    </script>
  `,
};

// Bundled screenshot story
export const Screenshot: Story = generateScreenshotStory([
  Labels,
  HelpText,
  Placeholders,
  Clearable,
  Disabled,
  Multiple,
  SettingInitialValues,
  GroupingOptions,
  MultipleWithGroupingOptions,
  Sizes,
  PrefixSuffixTextAndIcons,
  CustomTags,
], 280);
