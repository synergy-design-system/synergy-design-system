/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import '../../../components/src/components/icon-button/icon-button.js';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import type { SynIconButton } from '@synergy-design-system/components';
import { html } from 'lit';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-icon-button');
const { overrideArgs } = storybookHelpers('syn-icon-button');
const { generateTemplate } = storybookTemplate('syn-icon-button');

const meta: Meta = {
  args: overrideArgs([
    { name: 'name', type: 'attribute', value: 'wallpaper' },
    { name: 'label', type: 'attribute', value: 'Wallpaper' },
    // { name: 'color', type: 'attribute', value: 'neutral' },
    { name: 'size', type: 'attribute', value: 'medium' },
  ], defaultArgs),
  argTypes,
  component: 'syn-icon-button',
  parameters: {
    design: generateFigmaPluginObject('2986-3736'),
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
    controls: {
      disable: false,
    },
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
    docs: {
      description: {
        story: generateStoryDescription('icon-button', 'sizes'),
      },
    },
  },
  render: () => html`<syn-icon-button name="wallpaper" label="Wallpaper" color="neutral" size="small"></syn-icon-button>
    <syn-icon-button name="wallpaper" label="Wallpaper" color="neutral" size="medium"></syn-icon-button>
    <syn-icon-button name="wallpaper" label="Wallpaper" color="neutral" size="large"></syn-icon-button>`,
};

export const Colors: Story = {
  parameters: {
    docs: {
      description: {
        story: `${generateStoryDescription('icon-button', 'color')}`,
      },
    },
  },
  render: () => html`<syn-icon-button name="wallpaper" label="Wallpaper" color="neutral" size="medium"></syn-icon-button>
    <syn-icon-button name="wallpaper" label="Wallpaper" color="primary" size="medium"></syn-icon-button>`,
};

export const LinkButton: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('icon-button', 'link'),
      },
    },
  },
  render: () => html`<syn-icon-button name="wallpaper" label="Wallpaper" color="neutral" href="https://example.com" target="_blank" size="medium"></syn-icon-button>`,
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
    docs: {
      description: {
        story: generateStoryDescription('icon-button', 'disabled'),
      },
    },
  },
  render: () => html`<syn-icon-button name="wallpaper" label="Wallpaper" color="neutral" disabled size="medium"></syn-icon-button>`,
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
  render: () => html`<syn-icon-button name="wallpaper" label="Wallpaper" color="neutral" size="medium"></syn-icon-button>`,
};

export const Label: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('icon-button', 'label'),
      },
    },
  },
  render: () => html`
  <div class="grid">
    <span>Unset label property: </span>
    <syn-icon-button name="wallpaper" color="neutral" size="medium"></syn-icon-button>
    <span>Set label property: </span>
    <syn-icon-button name="wallpaper" label="Wallpaper" color="neutral" size="medium"></syn-icon-button>
  </div>
  <style>
    .grid {
      font-size: var(--syn-font-size-x-small);
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }

  </style>`,
};

// Bundled screenshot story
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Sizes,
  Colors,
  LinkButton,
  Disabled,
  Label,
});
