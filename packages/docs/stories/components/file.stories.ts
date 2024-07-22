/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import '../../../components/src/components/file/file.js';
import type { SynFile } from '@synergy-design-system/components';
import { html } from 'lit';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-file');
const { overrideArgs } = storybookHelpers('syn-file');
const { generateTemplate } = storybookTemplate('syn-file');

const meta: Meta = {
  args: overrideArgs([
    // { name: 'label', type: 'slot', value: '<span slot="label">App Name</span>' },
  ], defaultArgs),
  argTypes,
  component: 'syn-file',
  parameters: {
    design: generateFigmaPluginObject('10540-8605'),
    docs: {
      description: {
        component: generateStoryDescription('file', 'default'),
      },
    },
  },
  title: 'Components/syn-file',
};
export default meta;

export const Default: Story = {
  parameters: {
    controls: {
      disable: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('file', 'default'),
      },
    },
  },
  render: (args: unknown) => generateTemplate({ args }),
} as Story;

export const Label: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('file', 'label'),
      },
    },
  },
  render: () => html`
    <syn-file label="This is a label"></syn-file>
  `,
} as Story;

export const HelpText: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('file', 'help-text'),
      },
    },
  },
  render: () => html`
    <syn-file
      help-text="This is a help text."
      label="This is a label"
    ></syn-file>
  `,
} as Story;

export const HideValue: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('file', 'hide-value'),
      },
    },
  },
  render: () => html`
    <syn-file
      hide-value
      label="This is a label"
    ></syn-file>
  `,
} as Story;

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('file', 'disabled'),
      },
    },
  },
  render: () => html`
    <syn-file
      disabled
      label="This is a label"
    ></syn-file>
  `,
} as Story;

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('file', 'sizes'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <syn-file size="small" label="Small"></syn-file>
      <syn-file size="medium" label="Medium"></syn-file>
      <syn-file size="large" label="Large"></syn-file>
    </div>
  `,
} as Story;

export const Dropzone: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('file', 'dropzone'),
      },
    },
  },
  render: () => html`
    <syn-file
      dropzone
      help-text="This is a help text"
      label="This is a label"
    ></syn-file>
  `,
} as Story;

export const Focus: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('file', 'focus'),
      },
    },
  },
  play: ({ canvasElement }) => {
    const input = canvasElement.querySelector('syn-file') as SynFile;
    if (input) {
      input.focus();
    }
  },
  render: () => html`
    <syn-file label="This is a label"></syn-file>
  `,
} as Story;

export const Invalid: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('file', 'focus'),
      },
    },
  },
  play: async ({ canvasElement }) => {
    console.log('TODO: Implement play function', canvasElement);
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  },
  render: () => html`
    <form>
      <syn-file label="This is a label TODO: ERROR HANDLING!"></syn-file>
    </form>
  `,
} as Story;

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Label,
  HelpText,
  HideValue,
  Disabled,
  Sizes,
  Dropzone,
});
/* eslint-enable sort-keys */
