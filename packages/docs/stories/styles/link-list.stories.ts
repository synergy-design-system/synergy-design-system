/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
} from '../../src/helpers/component.js';
import { renderStyles } from '../../src/helpers/styles.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const { args, argTypes } = storybookDefaults('syn-link-list');

const generateLinks = (amount = 4, size = 'medium') => new Array(amount)
  .fill(undefined)
  .map(() => `
    <li>
      <a href="javascript:void()" class="syn-link syn-link--${size}">
        <syn-icon name="keyboard_arrow_right"></syn-icon>
        Link
      </a>
    </li>
  `.trim())
  .join('');

const meta: Meta = {
  args,
  argTypes,
  component: 'syn-link-list',
  parameters: {
    design: generateFigmaPluginObject('28388-133752'),
    docs: {
      description: {
        component: generateStoryDescription('styles', 'link-list'),
      },
    },
  },
  title: 'Styles/syn-link-list',
};
export default meta;

export const Default: StoryObj = {
  parameters: {
    controls: {
      disable: false,
    },
  },
  render: (storyArgs) => {
    const sizeClass = storyArgs['syn-link-list']! as string;
    const usedSize = sizeClass.split('--').at(-1);
    const defaultSlot = generateLinks(4, usedSize);
    const finalArgs = {
      ...storyArgs,
      'default-slot': defaultSlot,
    };
    return renderStyles(finalArgs, 'ul', {
      class: 'syn-link-list',
    });
  },
};

export const Horizontal: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('link-list', 'horizontal'),
      },
    },
  },
  render: () => html`
    <ul class="syn-link-list syn-link-list--horizontal">
      ${unsafeHTML(generateLinks(4, 'medium'))}
    </ul>
  `,
};

export const Multiline: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('link-list', 'multiline'),
      },
    },
  },
  render: () => html`
    <ul class="syn-link-list syn-link-list--horizontal" style="width: 480px">
      ${unsafeHTML(generateLinks(8, 'medium'))}
    </ul>
  `,
};

export const Size: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('link-list', 'size'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <ul class="syn-link-list syn-link-list--small syn-link-list--horizontal">
        ${unsafeHTML(generateLinks(4, 'small'))}
      </ul>
      <ul class="syn-link-list syn-link-list--medium syn-link-list--horizontal">
        ${unsafeHTML(generateLinks(4, 'medium'))}
      </ul>
      <ul class="syn-link-list syn-link-list--large syn-link-list--horizontal">
        ${unsafeHTML(generateLinks(4, 'large'))}
      </ul>
    </div>
  `,
};

export const Screenshot: StoryObj = generateScreenshotStory({
  Default,
  Horizontal,
  Multiline,
  Size,
}, 300);
