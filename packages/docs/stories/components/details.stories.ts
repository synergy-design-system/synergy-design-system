/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import type { Meta, StoryObj } from '@storybook/web-components';
import type { SynDetails } from '@synergy-design-system/components';
import { html } from 'lit';
import '../../../components/src/components/details/details.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-details');
const { overrideArgs } = storybookHelpers('syn-details');
const { generateTemplate } = storybookTemplate('syn-details');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'summary',
      type: 'attribute',
      value: 'Toggle Me',
    },
    {
      name: 'default',
      type: 'slot',
      value: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-details',
  parameters: {
    design: generateFigmaPluginObject('16771-27087'),
    docs: {
      description: {
        component: generateStoryDescription('details', 'default'),
      },
    },
  },
  title: 'Components/syn-details',
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
        story: generateStoryDescription('details', 'default'),
      },
    },
  },
  render: (args: unknown) => generateTemplate({ args }),
} as Story;

export const Open: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('details', 'open'),
      },
    },
  },
  render: () => html`
    <syn-details summary="Toggle Me" open>
      <h3 style="margin: 0 0 var(--syn-spacing-x-small); font: var(--syn-body-small-bold);">Subheadline</h3>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      At vero eos et accusam et justo duo dolores et ea rebum.
    </syn-details>
  `,
};

export const Focus: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('details', 'focus'),
      },
    },
  },
  play: ({ canvasElement }) => {
    const details = canvasElement.querySelector('syn-details') as SynDetails;
    if (details) {
      details.shadowRoot!.querySelector('summary')!.focus()
    }
  },
  render: () => html`
    <syn-details summary="Toggle Me"></syn-details>
  `,
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('details', 'disabled'),
      },
    },
  },
  render: () => html`
    <syn-details summary="Toggle Me" disabled>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </syn-details>
  `,
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('details', 'size'),
      },
    },
  },
  render: () => html`
    <syn-details size="medium">
      <syn-icon name="wallpaper" slot="summary"></syn-icon>
      <span slot="summary">Toggle Me</span>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </syn-details>
    <syn-details size="large">
      <syn-icon name="wallpaper" slot="summary"></syn-icon>
      <span slot="summary">Toggle Me</span>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </syn-details>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Open,
  Disabled,
  Sizes,
}, 300);
/* eslint-enable sort-keys */
