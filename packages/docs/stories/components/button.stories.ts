/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import '../../../components/src/components/button/button.js';
import '../../../components/src/components/icon/icon.js';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import type { SynButton } from '@synergy-design-system/components';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';
import { paddingDecorator } from '../../src/decorators/PaddingDecorator.js';
import { Chromatic_Modes_All } from '../../.storybook/modes.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-button');
const { overrideArgs } = storybookHelpers('syn-button');
const { generateTemplate } = storybookTemplate('syn-button');

const meta: Meta = {
  args: overrideArgs({ name: 'default', type: 'slot', value: 'Button' }, defaultArgs),
  argTypes,
  component: 'syn-button',
  parameters: {
    chromatic: {
      modes: Chromatic_Modes_All,
    },
    design: generateFigmaPluginObject('1055-22957'),
    docs: {
      description: {
        component: generateStoryDescription('button', 'default'),
      },
    },
  },
  tags: ['Form', 'Navigation', 'SICK2018', 'SICK2025'],
  title: 'Components/syn-button',
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
        story: generateStoryDescription('button', 'default'),
      },
    },
  },
  render: args => generateTemplate({ args }),
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('button', 'variant'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: row; gap: var(--syn-spacing-large);">
      <syn-button variant="filled">Filled</syn-button>
      <syn-button variant="outline">Outline</syn-button>
      <syn-button variant="text">Text</syn-button>
    </div>
  `,
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('button', 'size'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: row; gap: var(--syn-spacing-large);">
      <syn-button size="small">Small</syn-button>
      <syn-button size="medium">Medium</syn-button>
      <syn-button size="large">Large</syn-button>
    </div>
  `,
};

export const Focus: Story = {
  decorators: [paddingDecorator()],
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('button', 'focus'),
      },
    },
  },
  play: ({ canvasElement }) => {
    const button = canvasElement.querySelector<SynButton>('syn-button');
    if (button) {
      button.focus();
    }
  },
  render: () => html`<syn-button>Default</syn-button>`,
};

export const LinkButtons: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('button', 'link'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: row; gap: var(--syn-spacing-large);">
      <syn-button href="https://example.com/">Link</syn-button>
      <syn-button href="https://example.com/" target="_blank">New Window</syn-button>
      <syn-button href="/assets/images/wordmark.svg" download="synergy.svg">Download</syn-button>
      <syn-button href="https://example.com/" disabled>Disabled</syn-button>
    </div>
  `,
};

export const SettingACustomWidth: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('button', 'width'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: row; gap: var(--syn-spacing-large);">
      <syn-button size="small" style="width: 100%; margin-bottom: 1rem;">Small</syn-button>
      <syn-button size="medium" style="width: 100%; margin-bottom: 1rem;">Medium</syn-button>
      <syn-button size="large" style="width: 100%;">Large</syn-button>
    </div>
  `,
};

export const IconOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('button', 'icon-only'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: row; gap: var(--syn-spacing-large); margin-bottom: var(--syn-spacing-small);">
      <syn-button size="small" variant="filled">
        <syn-icon name="settings" label="Settings"></syn-icon>
      </syn-button>
      <syn-button size="small">
        <syn-icon name="settings" label="Settings"></syn-icon>
      </syn-button>
      <syn-button size="small" variant="text">
        <syn-icon name="settings" label="Settings"></syn-icon>
      </syn-button>
    </div>

    <div style="display: flex; flex-direction: row; gap: var(--syn-spacing-large); margin-bottom: var(--syn-spacing-small);">
      <syn-button size="medium" variant="filled">
        <syn-icon name="settings" label="Settings"></syn-icon>
      </syn-button>
      <syn-button size="medium">
        <syn-icon name="settings" label="Settings"></syn-icon>
      </syn-button>
      <syn-button size="medium" variant="text">
        <syn-icon name="settings" label="Settings"></syn-icon>
      </syn-button>
    </div>

    <div style="display: flex; flex-direction: row; gap: var(--syn-spacing-large); margin-bottom: var(--syn-spacing-small);">
      <syn-button size="large" variant="filled">
        <syn-icon name="settings" label="Settings"></syn-icon>
      </syn-button>
      <syn-button size="large">
        <syn-icon name="settings" label="Settings"></syn-icon>
      </syn-button>
      <syn-button size="large" variant="text">
        <syn-icon name="settings" label="Settings"></syn-icon>
      </syn-button>
    </div>
  `,
};

export const PrefixAndSuffixIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('button', 'prefix-suffix'),
      },
    },
  },
  render: () => html`
  <syn-button size="small">
    <syn-icon slot="prefix" name="settings"></syn-icon>
    Settings
  </syn-button>

  <syn-button size="small">
    <syn-icon slot="suffix" name="refresh"></syn-icon>
    Refresh
  </syn-button>

  <syn-button size="small">
    <syn-icon slot="prefix" name="link"></syn-icon>
    <syn-icon slot="suffix" name="launch"></syn-icon>
    Open
  </syn-button>

  <br/><br/>

  <syn-button>
    <syn-icon slot="prefix" name="settings"></syn-icon>
    Settings
  </syn-button>

  <syn-button>
    <syn-icon slot="suffix" name="refresh"></syn-icon>
    Refresh
  </syn-button>

  <syn-button>
    <syn-icon slot="prefix" name="link"></syn-icon>
    <syn-icon slot="suffix" name="launch"></syn-icon>
    Open
  </syn-button>

  <br/><br/>

  <syn-button size="large">
    <syn-icon slot="prefix" name="settings"></syn-icon>
    Settings
  </syn-button>

  <syn-button size="large">
    <syn-icon slot="suffix" name="refresh"></syn-icon>
    Refresh
  </syn-button>

  <syn-button size="large">
    <syn-icon slot="prefix" name="link"></syn-icon>
    <syn-icon slot="suffix" name="launch"></syn-icon>
    Open
  </syn-button>
  <style>
    syn-button {
      margin: 0.2rem;
    }
  </style>`,
};

export const Caret: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('button', 'caret'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: row; gap: var(--syn-spacing-large);">
      <syn-button size="small" caret>Small</syn-button>
      <syn-button size="medium" caret>Medium</syn-button>
      <syn-button size="large" caret>Large</syn-button>
    </div>
  `,
};

export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('button', 'loading'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: row; gap: var(--syn-spacing-large);">
      <syn-button variant="filled" loading>Filled</syn-button>
      <syn-button variant="outline" loading>Outline</syn-button>
      <syn-button variant="text" loading>Text</syn-button>
    </div>
  `,
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('button', 'disabled'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: row; gap: var(--syn-spacing-large);">
      <syn-button variant="filled" disabled>
        <syn-icon name="wallpaper" slot="prefix"></syn-icon>
        Button
        <syn-icon name="wallpaper" slot="suffix"></syn-icon>
      </syn-button>

      <syn-button variant="outline" disabled>
        <syn-icon name="wallpaper" slot="prefix"></syn-icon>
        Button
        <syn-icon name="wallpaper" slot="suffix"></syn-icon>
      </syn-button>

      <syn-button variant="text" disabled>
        <syn-icon name="wallpaper" slot="prefix"></syn-icon>
        Button
        <syn-icon name="wallpaper" slot="suffix"></syn-icon>
      </syn-button>
    </div>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Variants,
  Sizes,
  LinkButtons,
  SettingACustomWidth,
  IconOnly,
  PrefixAndSuffixIcons,
  Caret,
  Loading,
  Disabled,
}, 280);
/* eslint-enable sort-keys */
