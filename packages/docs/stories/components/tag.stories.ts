/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */

import '../../../components/src/components/tag/tag.js';
import '../../../components/src/components/icon/icon.js';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-tag');
const { generateTemplate } = storybookTemplate('syn-tag');
const { overrideArgs } = storybookHelpers('syn-tag');

const meta: Meta = {
  args: overrideArgs([
    { name: 'default', type: 'slot', value: 'Option' },
  ], defaultArgs),
  argTypes,
  component: 'syn-tag',
  parameters: {
    design: generateFigmaPluginObject('2898-58777'),
    docs: {
      description: {
        component: generateStoryDescription('tag', 'default'),
      },
    },
  },
  title: 'Components/syn-tag',
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
        story: generateStoryDescription('tag', 'default'),
      },
    },
  },
  render: (args: unknown) => generateTemplate({ args }),
} as Story;

// TODO: Currently focus is not working because shoelace does not allow tabbing the icon button. 
// As soon as it`s possible, uncomment this story
// export const Focus: Story = {
//   parameters: {
//     chromatic: {
//       disableSnapshot: false,
//     },
//   },
//   play: ({ canvasElement }) => {
//     const tag = canvasElement.querySelector('syn-tag') as SynTag;
//     if (tag) {
//       tag.focus();
//     }
//   },
//   render: () => html`
//   <syn-tag removable>Option</syn-tag>`,
// };

export const WithIcon: Story = {
  render: () => html`
  <syn-tag>
    <syn-icon name="wallpaper"></syn-icon>
    Option
 </syn-tag>`,
};

export const Removable: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('tag', 'removable'),
      },
    },
  },
  render: () => html`
    <div class="tags-removable">
      <syn-tag size="small" removable>Small</syn-tag>
      <syn-tag size="medium" removable>Medium</syn-tag>
      <syn-tag size="large" removable>Large</syn-tag> 
    </div>

    <script type="module">
      const div = document.querySelector('.tags-removable');

      div.addEventListener('syn-remove', event => {
        const tag = event.target;
        tag.style.opacity = '0';
        setTimeout(() => (tag.style.opacity = '1'), 2000);
      });
    </script>

    <style>
      .tags-removable syn-tag {
        transition: var(--syn-transition-medium) opacity;
      }
    </style>`,
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('tag', 'size'),
      },
    },
  },
  render: () => html`
  <syn-tag size="small">Small</syn-tag>
  <syn-tag size="medium">Medium</syn-tag>
  <syn-tag size="large">Large</syn-tag>`,
};

// Bundled screenshot story
export const Screenshot: Story = generateScreenshotStory({
  Default,
  WithIcon,
  Removable,
  Sizes,
});
