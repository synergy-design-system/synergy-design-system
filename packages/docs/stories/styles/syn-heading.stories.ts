import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  args: {
    content: 'Lorem ipsum dolor sit amet',
    variant: 'syn-heading-large',
  },
  argTypes: {
    content: {
      control: {
        type: 'text',
      },
    },
    variant: {
      control: {
        type: 'select',
      },
      options: [
        'syn-heading-large',
        'syn-heading-x-large',
        'syn-heading-2x-large',
        'syn-heading-3x-large',
      ],
    },
  },
  component: 'syn-heading',
  parameters: {
    // design: generateFigmaPluginObject('15172-32035'),
    // docs: {
    //   description: {
    //     component: generateStoryDescription('alert', 'default'),
    //   },
    // },
  },
  title: 'Styles/syn-heading',
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  parameters: {
    controls: {
      disable: false,
    },
    docs: {
      // description: {
      //   story: generateStoryDescription('alert', 'default'),
      // },
    },
  },
  render: ({ content, variant }) => html`
    <h1 class=${variant}>${content}</h1>
  `,
} as Story;
