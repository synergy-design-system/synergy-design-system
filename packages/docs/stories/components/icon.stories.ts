/* eslint-disable @typescript-eslint/no-unsafe-return */
import { html } from '@microsoft/fast-element';
import type { Meta, StoryObj } from '@storybook/html';
import { BADGE } from '@geometricpanda/storybook-addon-badges';
import type { Icon } from '@synergy-design-system/components/dist/types/components/icon/class';
import { renderComponent } from '../../src/helpers';
import type { StoryArgs } from '../../src/helpers';

const storyTemplate = html<StoryArgs<Icon>>`<sds-icon label=${x => x.label}>
  ${x => x.defaultSlot}
</sds-icon>`;

const render = renderComponent(storyTemplate);

export default {
  argTypes: {
    defaultSlot: {
      defaultValue: 'menu',
      description: 'The ligature of the icon to use.',
      table: {
        defaultValue: {
          summary: 'empty, no icon will be shown',
        },
      },
    },
    label: {
      control: {
        type: 'text',
      },
      defaultValue: '',
      description: 'The label is used to provide an alternate description for assistive technologies.',
      table: {
        defaultValue: {
          summary: '',
        },
      },
    },
  },
  parameters: {
    badges: [BADGE.STABLE, 'v1', 'needsHandoff'],
  },
  render,
  tags: ['autodocs'],
  title: 'Components/Icon',
} as Meta;

export const Default: StoryObj = {
  args: {
    defaultSlot: 'menu',
    label: '',
  },
};
