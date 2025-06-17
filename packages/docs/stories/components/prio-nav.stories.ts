/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import '../../../components/src/components/nav-item/nav-item.js';
import '../../../components/src/components/prio-nav/prio-nav.js';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-prio-nav');
const { overrideArgs } = storybookHelpers('syn-prio-nav');
const { generateTemplate } = storybookTemplate('syn-prio-nav');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'default',
      type: 'slot',
      value: `
        <syn-nav-item current horizontal>Domains</syn-nav-item>
        <syn-nav-item horizontal>Projects</syn-nav-item>
        <syn-nav-item horizontal href="javascript:void(0)">Trainings</syn-nav-item>
      `,
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-prio-nav',
  parameters: {
    design: generateFigmaPluginObject('12362-10968'),
    docs: {
      description: {
        component: generateStoryDescription('prio-nav', 'default'),
      },
      story: {
        height: '200px',
      },
    },
  },
  tags: ['Navigation'],
  title: 'Components/syn-prio-nav',
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
        story: generateStoryDescription('prio-nav', 'default'),
      },
    },
  },
  render: args => generateTemplate({ args }),
};

export const PriorityMenu = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('prio-nav', 'priority-menu'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--syn-spacing-2x-large)">
      <syn-prio-nav style="width: 220px;">
        <syn-nav-item current horizontal>Domains</syn-nav-item>
        <syn-nav-item horizontal href="javascript:void(0)">Projects</syn-nav-item>
        <syn-nav-item horizontal>Trainings</syn-nav-item>
      </syn-prio-nav>
      <syn-prio-nav style="width: 170px;">
        <syn-nav-item current horizontal>Domains</syn-nav-item>
        <syn-nav-item horizontal href="javascript:void(0)">Projects</syn-nav-item>
        <syn-nav-item horizontal>Trainings</syn-nav-item>
      </syn-prio-nav>
    </div>
  `,
};

/**
 * Uncomment this to test automatic adding of nav-items
 */
// export const EXCESSIVE_TESTS = {
//   parameters: {
//     docs: {
//       description: {
//         story: generateStoryDescription('prio-nav', 'priority-menu'),
//       },
//     },
//   },
//   render: () => html`
//     <syn-prio-nav id="demo-ding">
//       <syn-nav-item current horizontal>Domains</syn-nav-item>
//       <syn-nav-item horizontal>Projects</syn-nav-item>
//       <syn-nav-item horizontal>Trainings</syn-nav-item>
//       <syn-nav-item horizontal>Item 1</syn-nav-item>
//       <syn-nav-item horizontal>Item 2</syn-nav-item>
//       <syn-nav-item horizontal>Item 3</syn-nav-item>
//       <syn-menu-item href="#" role="menuitem" horizontal>Hello</syn-menu-item>
//       <syn-nav-item horizontal>Item 4</syn-nav-item>
//     </syn-prio-nav>
//     <syn-button>Add an Item</syn-button>
//     <script type="module">
//     let x = 5;
//     document.querySelector('syn-button').addEventListener('click', () => {
//       const node = document.createElement('syn-nav-item');
//       node.horizontal = true;
//       node.innerText = 'Item ' + x;
//       x++;
//       document.querySelector('#demo-ding').appendChild(node);
//     });
//     </script>
//   `,
// };

// Bundled screenshot story
export const Screenshot: Story = generateScreenshotStory({
  Default,
  PriorityMenu,
}, {
  heightPx: 200,
});
