import { html } from '@microsoft/fast-element';
import type { Meta, StoryObj } from '@storybook/html';
import { renderComponent } from '../../helpers';
import { Logo } from './class';

const storyTemplate = html<Logo>`
  <sds-logo
    variant="${x => x.variant}"
  >
  </sds-logo>
`;

const render = renderComponent(storyTemplate);

export default {
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'small',
        'default',
      ],
    },
  },
  render,
  tags: ['autodocs'],
  title: 'Components/Logo',
} as Meta;

export const Default: StoryObj = {};
export const Small: StoryObj = {
  args: {
    variant: 'small',
  },
};
