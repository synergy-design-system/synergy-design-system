/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import '../../../components/src/components/nav-item/nav-item.js';
import '../../../components/src/components/horizontal-nav/horizontal-nav.js';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-horizontal-nav');
const { overrideArgs } = storybookHelpers('syn-horizontal-nav');
const { generateTemplate } = storybookTemplate('syn-horizontal-nav');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'default',
      type: 'slot',
      value: `
        <syn-nav-item current>Domains</syn-nav-item>
        <syn-nav-item>Projects</syn-nav-item>
        <syn-nav-item>Trainings</syn-nav-item>
      `,
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-horizontal-nav',
  parameters: {
    docs: {
      description: {
        component: generateStoryDescription('horizontal-nav', 'default'),
      },
      story: {
        height: '200px',
      },
    },
  },
  title: 'Components/syn-horizontal-nav',
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
        story: generateStoryDescription('horizontal-nav', 'default'),
      },
    },
  },
  render: (args: unknown) => generateTemplate({ args }),
} as Story;

export const PriorityMenu = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('horizontal-nav', 'priority-menu'),
      },
    },
  },
  render: () => html`
    <syn-horizontal-nav style="width: 400px;">
      <syn-nav-item current>Domains</syn-nav-item>
      <syn-nav-item>Projects</syn-nav-item>
      <syn-nav-item>Trainings</syn-nav-item>
    </syn-horizontal-nav>
  `,
};

export const CS = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('horizontal-nav', 'priority-menu'),
      },
    },
  },
  render: () => html`
    <syn-horizontal-nav id="demo-ding">
      <syn-nav-item current>Domains</syn-nav-item>
      <syn-button>I want to play here, too :(</syn-button>
      <syn-nav-item>Projects</syn-nav-item>
      <syn-nav-item>Trainings</syn-nav-item>
      <syn-nav-item>Item 1</syn-nav-item>
      <syn-nav-item>Item 2</syn-nav-item> 
      <syn-nav-item>Item 3</syn-nav-item>
      <syn-nav-item>Item 4</syn-nav-item>
    </syn-horizontal-nav>
    <syn-button>Add an Item</syn-button>
    <script type="module">
    let x = 5;
    document.querySelector('syn-button').addEventListener('click', () => {
      const node = document.createElement('syn-nav-item');
      node.innerText = 'Item ' + x;
      x++;
      document.querySelector('#demo-ding').appendChild(node);
    });
    </script>
  `,
};

// Bundled screenshot story
export const Screenshot: Story = generateScreenshotStory({
  Default,
  PriorityMenu,
});
