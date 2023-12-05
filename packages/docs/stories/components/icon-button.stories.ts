/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import '../../../components/src/components/icon-button/icon-button';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { SynIconButton } from '@synergy-design-system/components';
import {
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-icon-button');
const { overrideArgs } = storybookHelpers('syn-icon-button');
const { generateTemplate } = storybookTemplate('syn-icon-button');

const meta: Meta = {
  args: overrideArgs([
    { name: 'name', type: 'attribute', value: 'wallpaper' },
    { name: 'label', type: 'attribute', value: 'Wallpaper' },
    { name: 'color', type: 'attribute', value: 'neutral' },
  ], defaultArgs),
  argTypes,
  component: 'icon-button',
  parameters: {
    docs: {
      description: {
        component: generateStoryDescription('icon-button', 'default'),
      },
    },
  },
  title: 'Components/syn-icon-button',
};
export default meta;

type Story = StoryObj;

export const Default = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('icon-button', 'default'),
      },
    },
  },
  render: (args: unknown) => generateTemplate({ args }),
} as Story;

export const Sizes: Story = {
  parameters: {
    controls: { exclude: ['size'] },
    docs: {
      description: {
        story: generateStoryDescription('icon-button', 'sizes'),
      },
    },
  },
  render: (args: unknown) => generateTemplate({
    args,
    axis: {
      x: {
        name: 'size',
        type: 'attribute',
        values: ['small', 'medium', 'large'],
      },
    },
  }),
};

export const Colors: Story = {
  parameters: {
    controls: { exclude: ['color'] },
    docs: {
      description: {
        story: `${generateStoryDescription('icon-button', 'color')} If none of them is set, it's set to "currentColor". This enables to easily style the icon button from outside without any CSS variables.`,
      },
    },
  },
  render: (args: unknown) => generateTemplate({
    args,
    axis: {
      x: {
        name: 'color',
        type: 'attribute',
      },
    },
  }),
};

export const LinkButton: Story = {
  parameters: {
    controls: { exclude: ['href'] },
    docs: {
      description: {
        story: generateStoryDescription('icon-button', 'link'),
      },
    },
  },
  render: (args: any) => generateTemplate({
    args: overrideArgs([
      { name: 'href', type: 'attribute', value: 'https://example.com' },
      { name: 'target', type: 'attribute', value: '_blank' },
    ], args),
  }),
};

// TODO: uncomment this story as soon as the syn-tooltip is available
/**
 * Wrap a tooltip around an icon button to provide contextual information to the user.
 */
// export const IconButtonWithTooltip: Story = {
//   render: () => html`<syn-tooltip content="Settings">
//   <syn-icon-button name="gear" label="Settings"></syn-icon-button>
// </syn-tooltip>`,
// };

export const Disabled: Story = {
  parameters: {
    controls: { exclude: ['disabled'] },
    docs: {
      description: {
        story: generateStoryDescription('icon-button', 'disabled'),
      },
    },
  },
  render: (args: any) => generateTemplate({
    args: overrideArgs([
      { name: 'disabled', type: 'attribute', value: true },
    ], args),
  }),
};

export const Focus: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('icon-button', 'focus'),
      },
    },
  },
  play: ({ canvasElement }: { canvasElement: HTMLElement; }) => {
    const iconButton = canvasElement.querySelector('syn-icon-button') as SynIconButton;
    if (iconButton) {
      iconButton.focus();
    }
  },
  render: (args: any) => generateTemplate({ args }),
};

export const Label: Story = {
  parameters: {
    controls: { exclude: ['label'] },
    docs: {
      description: {
        story: generateStoryDescription('icon-button', 'label'),
      },
    },
  },
  render: (args: any) => generateTemplate({
    args,
    axis: {
      x: {
        name: 'label',
        type: 'attribute',
        values: [
          { title: 'Unset label prop', value: '' },
          { title: 'Set label prop', value: 'Setting' },
        ],
      },
    },
  }),
};
