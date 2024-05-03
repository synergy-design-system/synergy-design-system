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

const { args: defaultArgs, argTypes } = storybookDefaults('syn-details');
const { overrideArgs } = storybookHelpers('syn-details');
const { generateTemplate } = storybookTemplate('syn-details');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'summary',
      type: 'attribute',
      value: 'Toggle me',
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

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('details', 'disabled'),
      },
    },
  },
  render: () => html`
    <syn-details class="details-disabled" summary="Toggle Me" disabled>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </syn-details>
    <style>
      .details-disabled {
        max-width: 400px;
      }
    </style>
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
    <syn-details class="details-sizes" size="small">
      <span slot="summary">
        <syn-icon name="wallpaper"></syn-icon>
        Toggle Me
      </span>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </syn-details>
    <syn-details class="details-sizes" size="medium">
      <span slot="summary">
        <syn-icon name="wallpaper"></syn-icon>
        Toggle Me
      </span>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </syn-details>
    <style>
      .details-sizes {
        max-width: 400px;
      }
    </style>
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
      <syn-details class="details-grouping" summary="First" open>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </syn-details>

      <syn-details class="details-grouping" summary="Second">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </syn-details>

      <syn-details class="details-grouping" summary="Third">
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
      .details-grouping {
        max-width: 400px;
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
    <syn-details class="details-custom-icon" summary="Toggle Me" class="custom-icons">
      <syn-icon name="open_in_full" slot="expand-icon"></syn-icon>
      <syn-icon name="close" slot="collapse-icon"></syn-icon>

      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </syn-details>
    <style>
      .details-custom-icon {
        max-width: 400px;
      }

      .details-custom-icon::part(summary-icon) {
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
