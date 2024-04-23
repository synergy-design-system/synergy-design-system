/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import '../../../components/src/components/progress-bar/progress-bar';
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

const { args: defaultArgs, argTypes } = storybookDefaults('syn-progress-bar');
const { overrideArgs } = storybookHelpers('syn-progress-bar');
const { generateTemplate } = storybookTemplate('syn-progress-bar');

const meta: Meta = {
  args: overrideArgs({
    name: 'value',
    type: 'attribute',
    value: 33.3,
  }, defaultArgs),
  argTypes,
  component: 'syn-progress-bar',
  parameters: {
    design: generateFigmaPluginObject('15533-15734'),
    docs: {
      description: {
        component: generateStoryDescription('progress-bar', 'default'),
      },
    },
  },
  title: 'Components/syn-progress-bar',
};
export default meta;

type Story = StoryObj;

export const Default = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('progress-bar', 'default'),
      },
    },
  },
  render: (args: unknown) => generateTemplate({ args }),
} as Story;

export const Labels: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('progress-bar', 'labels'),
      },
    },
  },
  render: () => html`
    <syn-progress-bar value="25" label="Upload progress">25%</syn-progress-bar>
  `,
};

export const CustomHeight: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('progress-bar', 'custom-height'),
      },
    },
  },
  render: () => html`
    <syn-progress-bar value="50" style="--height: var(--syn-spacing-2x-small);"></syn-progress-bar>
  `,
};

export const ShowingValues: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('progress-bar', 'showing-values'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--syn-spacing-medium);">
      <syn-progress-bar value="60" class="progress-bar-values">60%</syn-progress-bar>

      <div style="display: flex; gap: var(--syn-spacing-x-small);">
        <syn-button variant="outline" size="small">
          <syn-icon name="indeterminate" library="system" label="Decrease"></syn-icon>
        </syn-button>
        <syn-button variant="outline" size="small">
          <syn-icon name="add" library="system" label="Increase"></syn-icon>
        </syn-button>
      </div>
    </div>

    <script type="module">
    const progressBar = document.querySelector('.progress-bar-values');
    const subtractButton = progressBar.nextElementSibling.firstElementChild;
    const addButton = subtractButton.nextElementSibling;

    addButton.addEventListener('click', () => {
      const value = Math.min(100, progressBar.value + 10);
      progressBar.value = value;
      progressBar.textContent = value + '%';
    });

    subtractButton.addEventListener('click', () => {
      const value = Math.max(0, progressBar.value - 10);
      progressBar.value = value;
      progressBar.textContent = value + '%';
    });
    </script>
  `,
};

export const Indeterminate: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('progress-bar', 'indeterminate'),
      },
    },
  },
  render: () => html`
    <syn-progress-bar indeterminate></syn-progress-bar>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Labels,
  CustomHeight,
  ShowingValues,
  Indeterminate,
}, 180);
/* eslint-enable sort-keys */
