/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../../../components/src/components/card/card.js';
import '../../../components/src/components/button/button.js';
import '../../../components/src/components/icon-button/icon-button.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-card');
const { overrideArgs } = storybookHelpers('syn-card');
const { generateTemplate } = storybookTemplate('syn-card');

const createFooter = ({
  buttonText = 'More Info',
  footerText = 'Optional information',
} = {}) => `
  <footer slot="footer">
    <small>${footerText}</small>
    <nav>
      <syn-button variant="filled" size="small">${buttonText}</syn-button>
    </nav>
  </footer>
  <style>
    syn-card {
      max-width: 400px;
    }

    syn-card footer {
      align-items: center;
      color: var(--syn-color-neutral-800);
      display: flex;
      gap: var(--syn-spacing-x-small);
    }

    syn-card h3 {
      font: var(--syn-body-medium-bold) !important;
      margin: 0 0 var(--syn-spacing-x-small) !important;  
    }

    syn-card small {
      font: var(--syn-body-x-small-regular);
    }

    syn-card footer nav {
      display: flex;
      flex: 1;
      flex-wrap: wrap;
      gap: var(--syn-spacing-x-small);
      justify-content: flex-end;
    }
  </style>
`;

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'image',
      type: 'slot',
      value: '<img slot="image" src="https://synergy-design-system.github.io/card-example.jpg" alt="Multiple persons having lunch in SICK Academy" />',
    },
    {
      name: 'default',
      type: 'slot',
      value: `
        <h3>Headline</h3>
        This are some happy employees, but not just any employees. These are SICK employees.
      `,
    },
    {
      name: 'footer',
      type: 'slot',
      value: createFooter(),
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-card',
  parameters: {
    design: generateFigmaPluginObject('15409-74106'),
    docs: {
      description: {
        component: generateStoryDescription('card', 'default'),
      },
    },
  },
  tags: ['Structure'],
  title: 'Components/syn-card',
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
        story: generateStoryDescription('card', 'default'),
      },
    },
  },
  render: args => generateTemplate({ args }),
};

export const BasicCard: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('card', 'basic-card'),
      },
    },
  },
  render: () => html`
    <syn-card class="card-basic">
      This is just a basic card. No image, no header, and no footer. Just your content.
    </syn-card>
    <style>
    .card-basic {
      max-width: 400px;
    }
    </style>
  `,
};

export const CardWithHeader: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('card', 'with-header'),
      },
    },
  },
  render: () => html`
    <syn-card class="card-header">
      <div slot="header">
        Header Title
        <syn-icon-button color="neutral" name="share" label="Share"></syn-icon-button>
      </div>

      This card has a header. You can put all sorts of things in it!
    </syn-card>

    <style>
      .card-header {
        max-width: 400px;
      }

      .card-header [slot='header'] {
        align-items: center;
        display: flex;
        justify-content: space-between;
      }

      .card-header h3 {
        margin: 0;
      }

      .card-header syn-icon-button {
        font-size: var(--syn-font-size-x-large);
      }
    </style>
  `,
};

export const CardWithFooter: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('card', 'with-footer'),
      },
    },
  },
  render: () => html`
    <syn-card class="card-footer">
      This card has a footer. You can put all sorts of things in it!
      ${unsafeHTML(createFooter({
        buttonText: 'Preview',
        footerText: 'Optional information',
      }))}
    </syn-card>

    <style>
      .card-footer {
        max-width: 400px;
      }
    </style>
  `,
};

export const Images: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('card', 'images'),
      },
    },
  },
  render: () => html`
    <syn-card class="card-image">
      <img slot="image" src="https://synergy-design-system.github.io/card-example.jpg" alt="Multiple persons having lunch in SICK Academy" />
      This are some happy employees, but not just any employees. These are SICK employees.
    </syn-card>

    <style>
      .card-image {
        max-width: 400px;
      }
    </style>
  `,
};

export const SharpCard: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('card', 'sharp'),
      },
    },
  },
  render: () => html`
    <syn-card class="sharp-card" sharp>
      <img slot="image" src="https://synergy-design-system.github.io/card-example.jpg" alt="Multiple persons having lunch in SICK Academy" />
      This are some happy employees, but not just any employees. These are SICK employees.
    </syn-card>

    <style>
      .sharp-card {
        max-width: 400px;
      }
    </style>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  BasicCard,
  CardWithHeader,
  CardWithFooter,
  Images,
  SharpCard,
}, 600);
/* eslint-enable sort-keys */
