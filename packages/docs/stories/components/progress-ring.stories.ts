/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import '../../../components/src/components/progress-ring/progress-ring';
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

const { args: defaultArgs, argTypes } = storybookDefaults('syn-progress-ring');
const { overrideArgs } = storybookHelpers('syn-progress-ring');
const { generateTemplate } = storybookTemplate('syn-progress-ring');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'default',
      type: 'slot',
      value: '',
    },
    {
      name: 'value',
      type: 'attribute',
      value: '25',
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-progress-ring',
  parameters: {
    design: generateFigmaPluginObject('14207-8709'),
    docs: {
      description: {
        component: generateStoryDescription('progress-ring', 'default'),
      },
    },
  },
  title: 'Components/syn-progress-ring',
};
export default meta;

type Story = StoryObj;

export const Default = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('progress-ring', 'default'),
      },
    },
  },
  render: (args: unknown) => generateTemplate({ args }),
} as Story;

export const Size: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('progress-ring', 'size'),
      },
    },
  },
  render: () => html`
    <syn-progress-ring value="35" style="--size: 48px;"></syn-progress-ring>
  `,
};

export const TrackAndIndicatorWidth: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('progress-ring', 'track-indicator-width'),
      },
    },
  },
  render: () => html`
    <syn-progress-ring value="50" style="--track-width: 4px; --indicator-width: 8px;"></syn-progress-ring>
  `,
};

export const Colors: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('progress-ring', 'color'),
      },
    },
  },
  render: () => html`
    <syn-progress-ring
      value="50"
      style="--indicator-color: var(--syn-color-success-600);"
    ></syn-progress-ring>`,
};

export const Labels: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('progress-ring', 'labels'),
      },
    },
  },
  render: () => html`
    <syn-progress-ring value="50" label="Upload progress"></syn-progress-ring>
  `,
};

export const ShowingValues: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('progress-ring', 'show-values'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--syn-spacing-medium);">
      <syn-progress-ring value="50" class="progress-ring-values">50%</syn-progress-ring>
      <div style="display: flex; gap: var(--syn-spacing-x-small);">
        <syn-button variant="outline">
          <syn-icon name="indeterminate" library="system" label="Decrease"></syn-icon>
        </syn-button>
        <syn-button variant="outline">
          <syn-icon name="add" library="system" label="Increase"></syn-icon>
        </syn-button>
      </div>
    </div>

    <script type="module">
    const progressRing = document.querySelector('.progress-ring-values');
    const subtractButton = progressRing.nextElementSibling.firstElementChild;
    const addButton = subtractButton.nextElementSibling;

    addButton.addEventListener('click', () => {
      const value = Math.min(100, progressRing.value + 10);
      progressRing.value = value;
      progressRing.textContent = value + '%';
    });

    subtractButton.addEventListener('click', () => {
      const value = Math.max(0, progressRing.value - 10);
      progressRing.value = value;
      progressRing.textContent = value + '%';
    });
    </script>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Size,
  TrackAndIndicatorWidth,
  Colors,
  Labels,
  ShowingValues,
}, 300);
/* eslint-enable sort-keys */
