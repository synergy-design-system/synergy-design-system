/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */

import '../../../components/src/components/button/button';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { SynButton } from '@synergy-design-system/components';
import {
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-button');
const { overrideArgs } = storybookHelpers('syn-button');
const { generateTemplate } = storybookTemplate('syn-button');

const meta: Meta = {
  args: overrideArgs({ name: 'default', type: 'slot', value: 'Button' }, defaultArgs),
  argTypes,
  component: 'button',
  parameters: {
    docs: {
      description: {
        component: generateStoryDescription('button', 'default'),
      },
    },
  },
  title: 'Components/syn-button',
};
export default meta;

type Story = StoryObj;

export const Default = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('button', 'default'),
      },
    },
  },
  render: (args: unknown) => generateTemplate({ args }),
} as Story;

export const Variants: Story = {
  parameters: {
    controls: { exclude: ['variant'] },
    docs: {
      description: {
        story: generateStoryDescription('button', 'variant'),
      },
    },
  },
  render: (args: any) => generateTemplate({
    args,
    axis: {
      x: {
        name: 'variant',
        type: 'attribute',
      },
    },
  }),
};

export const Sizes: Story = {
  parameters: {
    controls: { exclude: ['size'] },
    docs: {
      description: {
        story: generateStoryDescription('button', 'size'),
      },
    },
  },
  render: (args: any) => generateTemplate({
    args,
    axis: {
      x: {
        name: 'size',
        type: 'attribute',
      },
    },
  }),
};

export const Focus: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('button', 'focus'),
      },
    },
  },
  play: ({ canvasElement }) => {
    const button = canvasElement.querySelector('syn-button') as SynButton;
    if (button) {
      button.focus();
    }
  },
  render: (args: unknown) => generateTemplate({ args }),
};

// export const LinkButtons: Story = {
//   parameters: {
//     controls: {
//       disable: true,
//     },
//     docs: {
//       description: {
//         story: generateStoryDescription('button', 'link'),
//       },
//     },
//   },
//   render: () => html`
//   <syn-button href="https://example.com/">Link</syn-button>
//   <syn-button href="https://example.com/" target="_blank">New Window</syn-button>
//   <syn-button href="/assets/images/wordmark.svg" download="synergy.svg">Download</syn-button>
//   <syn-button href="https://example.com/" disabled>Disabled</syn-button>
//   <style>
//     syn-button {
//       margin: 0.2rem;
//     }
//   </style>`,
// };
export const LinkButtons: Story = {
  parameters: {
    controls: {
      controls: { exclude: ['href', 'target', 'download'] },
    },
    docs: {
      description: {
        story: generateStoryDescription('button', 'link'),
      },
    },
  },
  render: (args: any) => html`${[
    generateTemplate({ args: overrideArgs([{ name: 'href', type: 'attribute', value: 'https://example.com/' }, { name: 'default', type: 'slot', value: 'Link' }], args) }),
    generateTemplate({ args: overrideArgs([{ name: 'href', type: 'attribute', value: 'https://example.com/' }, { name: 'default', type: 'slot', value: 'New Window' }, { name: 'target', type: 'attribute', value: '_blank' }], args) }),
    generateTemplate({ args: overrideArgs([{ name: 'href', type: 'attribute', value: '/assets/images/wordmark.svg' }, { name: 'default', type: 'slot', value: 'Download' }, { name: 'download', type: 'attribute', value: 'synergy.svg' }], args) }),
    generateTemplate({ args: overrideArgs([{ name: 'href', type: 'attribute', value: 'https://example.com/' }, { name: 'default', type: 'slot', value: 'Disabled' }, { name: 'disabled', type: 'attribute', value: true }], args) }),
  ]}`,
};

export const SettingACustomWidth: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    docs: {
      description: {
        story: generateStoryDescription('button', 'width'),
      },
    },
  },
  render: () => html`
  <syn-button size="small" style="width: 100%; margin-bottom: 1rem;">Small</syn-button>
  <syn-button size="medium" style="width: 100%; margin-bottom: 1rem;">Medium</syn-button>
  <syn-button size="large" style="width: 100%;">Large</syn-button>`,
};

export const PrefixAndSuffixIcons: Story = {
  parameters: {
    controls: {
      disable: true,
    },
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
    controls: { exclude: ['caret'] },
    docs: {
      description: {
        story: generateStoryDescription('button', 'caret'),
      },
    },
  },
  render: (args: any) => generateTemplate({
    args: overrideArgs({ name: 'caret', type: 'attribute', value: true }, args),
  }),
};

export const Loading: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    docs: {
      description: {
        story: generateStoryDescription('button', 'loading'),
      },
    },
  },
  render: (args: any) => generateTemplate({
    args: overrideArgs({ name: 'caret', type: 'attribute', value: true }, args),
  }),
};
//   render: () => html`
//   <syn-button variant="filled" loading>Filled</syn-button>
//   <syn-button variant="outline" loading>Outline</syn-button>
//   <syn-button variant="text" loading>Text</syn-button>
//   <style>
//     syn-button {
//       margin: 0.2rem;
//     }
//   </style>`,
// };

export const Disabled: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    docs: {
      description: {
        story: generateStoryDescription('button', 'disabled'),
      },
    },
  },
  render: () => html`
  <syn-button variant="filled" disabled>Filled</syn-button>
  <syn-button variant="outline" disabled>Outline</syn-button>
  <syn-button variant="text" disabled>Text</syn-button>`,
};
