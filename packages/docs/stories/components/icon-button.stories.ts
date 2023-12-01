/* eslint-disable */

/* eslint-disable import/no-relative-packages */

import '../../../components/src/components/icon-button/icon-button';
import type { Meta, StoryObj } from '@storybook/web-components';
import docsTokens from '../../../tokens/src/figma-tokens/_docs.json';
import { storybookDefaults, storybookHelpers, storybookTemplate } from '../../src/helpers/component.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-icon-button');
const { overrideArgs } = storybookHelpers('syn-icon-button');
const { generateTemplate } = storybookTemplate('syn-icon-button');

const generateStoryDescription = (attributeName: string) => {
  return (docsTokens?.components?.['icon-button'] as Record<string, any>)?.[attributeName]?.description?.value ?? 'No Description';
};


const meta: Meta = {
  component: 'icon-button',
  args: overrideArgs([
    { type: 'attribute', value: 'gear', name: 'name' },
    { type: 'attribute', value: 'Settings', name: 'label' },
    { type: 'attribute', value: 'neutral', name: 'color' },
  ], defaultArgs),
  argTypes,
  title: 'Components/syn-icon-button',
  parameters: {
    docs: {
      description: {
        component: generateStoryDescription('default'),
      },
    }
  }
};
export default meta;

type Story = StoryObj;

export const Default = {
  render: (args: any) => {
    return generateTemplate({ args });
  },
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('default'),
      }
    }
  }
} as Story;


export const Sizes: Story = {
  parameters: {
    controls: { exclude: ['size'] },
    docs: {
      description: {
        story: generateStoryDescription('sizes'),
      }
    }
  },
  render: (args: any) => {
    return generateTemplate({
      axis: {
        x: {
          type: 'attribute',
          name: 'size',
          values: ['small', 'medium', 'large']
        }
      },
      args
    });
  }
};


export const Colors: Story = {
  parameters: {
    controls: { exclude: ['color'] },
    docs: {
      description: {
        story: generateStoryDescription('color'),
      }
    }
  },
  render: (args: any) => {
    return generateTemplate({
      axis: {
        x: {
          type: 'attribute',
          name: 'color',
        }
      },
      args
    });
  }
};


/**
 * Use the href attribute to convert the icon button to a link.
 */
export const LinkButton: Story = {
  parameters: {
    controls: { exclude: ['href'] },
  },
  render: (args: any) => {
    return generateTemplate({
      args: overrideArgs([
        { type: 'attribute', value: 'https://example.com', name: 'href' },
        { type: 'attribute', value: '_blank', name: 'target' },
      ], args)
    });
  }
};

// TODO: uncomment this story as soon as the syn-tooltip is available
/**
 * Wrap a tooltip around an icon button to provide contextual information to the user.
 */
// export const IconButtonWithTooltip: Story = {
//   render: () => html`<syn-tooltip content="Settings">
//   <syn-icon-button name="gear" label="Settings"></syn-icon-button>
// </syn-tooltip>`,
// };


export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('disabled'),
      }
    },
    controls: { exclude: ['disabled'] },
  },
  render: (args: any) => {
    console.log(argTypes);
    return generateTemplate({
      args: overrideArgs([
        { type: 'attribute', value: true, name: 'disabled' },
      ], args)
    });
  }
};


export const Focus: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('focus'),
      }
    },
  },
  play: ({ canvasElement }: { canvasElement: HTMLElement; }) => {
    const iconButton = canvasElement.querySelector('syn-icon-button') as HTMLInputElement;
    if (iconButton) {
      iconButton.focus();
    }
  },
  render: (args: any) => generateTemplate({ args }),
};


export const Label: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('label'),
      }
    },
    controls: { exclude: ['label'] },
  },
  render: (args: any) => generateTemplate({
    axis: {
      x: {
        type: 'attribute',
        name: 'label',
        values: [
          { value: '', title: 'Unset label prop' },
          { value: 'Setting', title: 'Set label prop' }
        ]
      }
    },
    args
   }),
};
