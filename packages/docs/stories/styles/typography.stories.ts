import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { generateScreenshotStory } from '../../src/helpers/component.js';

const render = ({
  size = 'syn-body-medium',
  weight = 'syn-weight-normal',
}) => (size.includes('heading')
  ? html`
    <div class="${size} ${weight}" role="heading" aria-level="1">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </div>
  `
  : html`
    <p class="${size} ${weight}">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Praesent feugiat urna metus, ac accumsan turpis malesuada at.
      Duis efficitur nisi sed libero consectetur, sit amet rutrum nisi blandit.
      Curabitur sed arcu a lectus elementum rhoncus a sit amet lorem.
      Praesent et faucibus ante.
      Ut tincidunt placerat dui, sit amet scelerisque mauris suscipit in.
      In consequat faucibus posuere. Phasellus eu fringilla ex, a congue nisi.
      Curabitur vitae euismod diam, vitae scelerisque arcu. In ullamcorper semper blandit.
      Proin lacinia laoreet libero, sed varius eros sollicitudin non.
      Proin vulputate arcu a gravida ultricies.
      Praesent quis faucibus dui.
    </p>
`);

/**
 * **@synergy-design-system/styles** provides helpers that make it easier to apply
 * body and headline styles according to the Synergy Design System in an easy to use way
 * **without using custom components**.
 */
const meta: Meta = {
  argTypes: {
    size: {
      control: { type: 'select' },
      description: 'CSS Font definitions for body text and headlines.',
      options: [
        '',
        'syn-body-x-small',
        'syn-body-small',
        'syn-body-medium',
        'syn-body-large',
        'syn-heading-large',
        'syn-heading-x-large',
        'syn-heading-2x-large',
        'syn-heading-3x-large',
      ],
      table: {
        defaultValue: {
          summary: 'syn-body-medium',
        },
      },
    },
    weight: {
      control: { type: 'select' },
      description: 'The font weight to apply',
      options: [
        '',
        'syn-weight-normal',
        'syn-weight-semibold',
        'syn-weight-bold',
      ],
      table: {
        defaultValue: {
          summary: 'syn-weight-normal',
        },
      },
    },
  },
  title: 'Styles/Typography',
};
export default meta;

export const Default: StoryObj = {
  args: {
    size: 'syn-body-medium',
    weight: 'syn-weight-normal',
  },
  parameters: {
    controls: {
      disable: false,
    },
  },
  render,
};

export const SynBodyXSmall: StoryObj = {
  name: '.syn-body-x-small',
  render: () => render({ size: 'syn-body-x-small' }),
};

export const SynBodySmall: StoryObj = {
  name: '.syn-body-small',
  render: () => render({ size: 'syn-body-small' }),
};

export const SynBodyMedium: StoryObj = {
  name: '.syn-body-medium',
  render: () => render({ size: 'syn-body-medium' }),
};

export const SynBodyLarge: StoryObj = {
  name: '.syn-body-large',
  render: () => render({ size: 'syn-body-large' }),
};

export const SynHeadingLarge: StoryObj = {
  name: '.syn-heading-large',
  render: () => render({ size: 'syn-heading-large' }),
};

export const SynHeadingXLarge: StoryObj = {
  name: '.syn-heading-x-large',
  render: () => render({ size: 'syn-heading-x-large' }),
};

export const SynHeading2XLarge: StoryObj = {
  name: '.syn-heading-2x-large',
  render: () => render({ size: 'syn-heading-2x-large' }),
};

export const SynHeading3XLarge: StoryObj = {
  name: '.syn-heading-3x-large',
  render: () => render({ size: 'syn-heading-3x-large' }),
};

// Bundled screenshot story
/* eslint-disable sort-keys */
export const Screenshot: StoryObj = generateScreenshotStory({
  SynBodyXSmall,
  SynBodySmall,
  SynBodyMedium,
  SynBodyLarge,
  SynHeadingLarge,
  SynHeadingXLarge,
  SynHeading2XLarge,
  SynHeading3XLarge,
}, 200);
/* eslint-enable sort-keys */
