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

export const Default = {
  parameters: {
    args: overrideArgs({
      name: 'default',
      type: 'slot',
      value: `
        <syn-option value="Option_1"><span>Abc 1</span></syn-option>
        <syn-option value="Option_2">BBB 2</syn-option>
        <syn-option value="Option_3">ccc 3</syn-option>
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

export const Labels: Story = {
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

export const Placeholder: Story = {
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
    const elm = canvasElement.querySelector<SynSelect>('syn-select');
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    elm?.focus();
  },
  render: () => html`
    <syn-select label="Select one">
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-select>
  `,
};

export const Disabled: Story = {
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
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'multiple'),
      },
    },
  },
  render: () => html`
    <syn-select label="Select a Few" value="Option_1 Option_2 Option_3" multiple clearable>
      <syn-option value="Option_1">Option 1</syn-option>
      <syn-option value="Option_2">Option 2</syn-option>
      <syn-option value="Option_3">Option 3</syn-option>
      <syn-option value="Option_4">Option 4</syn-option>
      <syn-option value="Option_5">Option 5</syn-option>
      <syn-option value="Option_6">Option 6</syn-option>
    </syn-select>
  `,
};

export const SettingInitialValues: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'initialvalue'),
      },
    },
  },
  render: () => html`
    <syn-select value="option-1 option-2 option-3 option-4" multiple clearable class="custom-tag">
      <syn-option value="option-1">Option</syn-option>
      <syn-option value="option-2">Option 1</syn-option>
      <syn-option value="option-3">Option 2</syn-option>
      <syn-option value="option-4">Option 3</syn-option>
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

export const GroupingOptions: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'group'),
      },
    },
  },
  render: () => html`
    <syn-select placeholder="This is a value">
      <syn-optgroup label="Section 1">
        <syn-option value="1">Option</syn-option>
        <syn-option value="2">Option</syn-option>
      </syn-optgroup>
      <syn-optgroup label="Section 2">
        <syn-option value="3">Option</syn-option>
        <syn-option value="4">Option</syn-option>
      </syn-optgroup>
    </syn-select>
  `,
};

export const Sizes: Story = {
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

export const Invalid: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('select', 'invalid'),
      },
    },
  },
  play: async ({ canvasElement }) => {
    try {
      const form = canvasElement.querySelector('form')!;
      const select = form.querySelector('syn-select');
      const button = form.querySelector('syn-button') as SynButton;

      if (button && select) {
        // make sure to always fire both events:
        // 1. userEvent.click is needed for storybooks play function to register
        // 2. button.click is needed to really click the button
        // userEvent.click works on native elements only
        await userEvent.click(button);
        button.click();
      }
    } catch (error) {
      console.error('Error in play function:', error);
    }
  },
  render: () => html`

    <form class="custom-validity">
      <syn-select label="Select one" required>
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2">Option 2</syn-option>
        <syn-option value="option-3">Option 3</syn-option>
      </syn-select>
      <syn-button type="submit" variant="filled">Submit</syn-button>
    </form>
    <style>
    .custom-validity {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    syn-button {
      align-self: flex-start;
    }
    </style>
  `,
};

export const PrefixIcons: Story = {
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
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('select', 'gettag'),
      },
    },
  },
  render: () => html`
    <syn-select
      clearable
      id="custom-tags-story"
      multiple
      placeholder="Select one"
      value="phone email"
    >
      <syn-option value="email">
        <syn-icon slot="prefix" name="mail_outline"></syn-icon>
        Email
      </syn-option>
      <syn-option value="phone">
        <syn-icon slot="prefix" name="phone"></syn-icon>
        Phone
      </syn-option>
      <syn-option value="chat">
        <syn-icon slot="prefix" name="chat_bubble_outline"></syn-icon>
        Chat
      </syn-option>
    </syn-select>

    <script type="module">
      const select = document.querySelector('#custom-tags-story');

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

const ScreenshotStoryDefault: Story = {
  render: () => html`
    <syn-select
      clearable
      help-text="Help-Text"
      label="Label"
      placeholder="Placeholder"
    >
      <syn-icon name="wallpaper" slot="prefix"></syn-icon>
      <syn-option value="Option_1">Option 1</syn-option>
      <syn-option value="Option_2">Option 2</syn-option>
      <syn-option value="Option_3">Option 3</syn-option>
    </syn-select>
  `,
};

const ScreenshotStoryMultiple: Story = {
  render: () => html`
    <syn-select
      class="custom-tag"
      clearable
      help-text="Help-Text"
      label="Label"
      multiple
      placeholder="Placeholder"
      value="Option_1 Option_2 Option_3 Option_7"
    >
      <syn-option value="Option_1">
        <syn-icon slot="prefix" name="wallpaper"></syn-icon>
        Option 1
      </syn-option>
      <syn-option value="Option_2">Option 2</syn-option>
      <syn-option value="Option_3">Option 3</syn-option>
      <syn-option value="Option_4">Option 4</syn-option>
      <syn-option value="Option_5">Option 5</syn-option>
      <syn-option value="Option_6">Option 6</syn-option>
      
      <syn-optgroup label="Section 1">
        <syn-option value="Option_7">Option 7</syn-option>
        <syn-option value="Option_8">Option 8</syn-option>
      </syn-optgroup>
      <syn-optgroup label="Section 2">
        <syn-option value="Option_9">Option 9</syn-option>
      </syn-optgroup>

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
// Note we are not able to screenshot more than the Screenshot story
// because of the reasons outlined above!
export const ScreenshotDefault: Story = generateScreenshotStory({
  ScreenshotStoryDefault,
}, {
  afterRender: openSelect('syn-select'),
  heightPx: 400,
});

// Bundled screenshot story
// Note we are not able to screenshot more than the Screenshot story
// because of the reasons outlined above!
export const ScreenshotMultiple: Story = generateScreenshotStory({
  ScreenshotStoryMultiple,
}, {
  afterRender: openSelect('syn-select'),
  heightPx: 400,
});
