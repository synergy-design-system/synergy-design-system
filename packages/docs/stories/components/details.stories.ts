/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
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
      name: 'contained',
      type: 'attribute',
      value: true,
    },
    {
      name: 'default',
      type: 'slot',
      value: `<h3 style="margin: 0 0 var(--syn-spacing-x-small); font: var(--syn-body-small-bold); color: var(--syn-typography-color-text);">Subheadline</h3>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      At vero eos et accusam et justo duo dolores et ea rebum.`,
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
      <h3 style="margin: 0 0 var(--syn-spacing-x-small); font: var(--syn-body-small-bold); color: var(--syn-typography-color-text);">Subheadline</h3>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      At vero eos et accusam et justo duo dolores et ea rebum.
    </syn-details>
  `,
};

export const Contained: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('details', 'contained'),
      },
    },
  },
  render: () => html`
    <syn-details summary="Toggle Me" contained>
      <h3 style="margin: 0 0 var(--syn-spacing-x-small); font: var(--syn-body-small-bold); color: var(--syn-typography-color-text);">Subheadline</h3>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      At vero eos et accusam et justo duo dolores et ea rebum.
    </syn-details>
    <br/>
    <syn-details summary="Toggle Me" open contained>
      <h3 style="margin: 0 0 var(--syn-spacing-x-small); font: var(--syn-body-small-bold); color: var(--syn-typography-color-text);">Subheadline</h3>
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
    <syn-details summary="Toggle Me" contained>
      <h3 style="margin: 0 0 var(--syn-spacing-x-small); font: var(--syn-body-small-bold); color: var(--syn-typography-color-text);">Subheadline</h3>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      At vero eos et accusam et justo duo dolores et ea rebum.
    </syn-details>
  `,
};

const createDisabledStory = (contained: boolean): Story => ({
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('details', 'disabled'),
      },
    },
  },
  render: () => html`
    <syn-details summary="Toggle Me" disabled .contained=${contained}>
      <h3 style="margin: 0 0 var(--syn-spacing-x-small); font: var(--syn-body-small-bold); color: var(--syn-typography-color-text);">Subheadline</h3>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      At vero eos et accusam et justo duo dolores et ea rebum.
    </syn-details>
  `,
});

export const Disabled = createDisabledStory(true);

const DisabledNotContained = createDisabledStory(false);

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('details', 'size'),
      },
    },
  },
  render: () => html`
    <syn-details size="medium" contained>
      <span slot="summary">Toggle Me</span>
      <h3 style="margin: 0 0 var(--syn-spacing-x-small); font: var(--syn-body-small-bold); color: var(--syn-typography-color-text);">Subheadline</h3>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      At vero eos et accusam et justo duo dolores et ea rebum.
    </syn-details>
    <br/>
    <syn-details size="large" contained>
      <span slot="summary">Toggle Me</span>
      <h3 style="margin: 0 0 var(--syn-spacing-x-small); font: var(--syn-body-small-bold); color: var(--syn-typography-color-text);">Subheadline</h3>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      At vero eos et accusam et justo duo dolores et ea rebum.
    </syn-details>
  `,
};

export const PrefixIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('details', 'icon'),
      },
    },
  },
  render: () => html`
    <syn-details open>
      <syn-icon name="home" slot="summary"></syn-icon>
      <span slot="summary">Accordion Element</span>
      <h3 style="margin: 0 0 var(--syn-spacing-x-small); font: var(--syn-body-small-bold); color: var(--syn-typography-color-text);">Subheadline</h3>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      At vero eos et accusam et justo duo dolores et ea rebum.
    </syn-details>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Open,
  Contained,
  DisabledNotContained,
  Disabled,
  Sizes,
  PrefixIcons,
}, 300);
/* eslint-enable sort-keys */
