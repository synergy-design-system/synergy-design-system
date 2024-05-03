/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import type { Meta, StoryObj } from '@storybook/web-components';
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

const { args: defaultArgs, argTypes } = storybookDefaults('syn-alert');
const { overrideArgs } = storybookHelpers('syn-alert');
const { generateTemplate } = storybookTemplate('syn-alert');

const meta: Meta = {
  args: overrideArgs([
    // {
    //   name: 'default',
    //   type: 'slot',
    //   value: 'This is a standard alert. You can customize its content and even the icon.',
    // },
    // {
    //   name: 'open',
    //   type: 'attribute',
    //   value: true,
    // },
    // {
    //   name: 'icon',
    //   type: 'slot',
    //   value: '<syn-icon slot="icon" name="info"></syn-icon>',
    // },
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
    <syn-details summary="Toggle Me" size="small">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </syn-details>
    <syn-details summary="Toggle Me" size="medium">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </syn-details>
  `,
};

export const GroupingDetails: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('details', 'grouping'),
      },
    },
  },
  render: () => html`
    <div class="details-group-example">
      <syn-details summary="First" open>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </syn-details>

      <syn-details summary="Second">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </syn-details>

      <syn-details summary="Third">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </syn-details>
    </div>
    <script type="module">
      const container = document.querySelector('.details-group-example');

      // Close all other details when one is shown
      container.addEventListener('syn-show', event => {
        if (event.target.localName === 'syn-details') {
          [...container.querySelectorAll('syn-details')].map(details => (details.open = event.target === details));
        }
      });
    </script>
    <style>
      .details-group-example syn-details:not(:last-of-type) {
        margin-bottom: var(--syn-spacing-2x-small);
      }
    </style>
  `,
};

export const CustomizingTheSummaryIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('details', 'summary-icon'),
      },
    },
  },
  render: () => html`
    <syn-details summary="Toggle Me" class="custom-icons">
      <syn-icon name="open_in_full" slot="expand-icon"></syn-icon>
      <syn-icon name="close" slot="collapse-icon"></syn-icon>

      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </syn-details>
    <style>
      syn-details.custom-icons::part(summary-icon) {
        /* Disable the expand/collapse animation */
        rotate: none;
      }
    </style>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Disabled,
  Sizes,
  GroupingDetails,
  CustomizingTheSummaryIcon,
}, 550);
/* eslint-enable sort-keys */
