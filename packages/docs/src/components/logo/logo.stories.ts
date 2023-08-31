import { html } from '@microsoft/fast-element';
import type { Meta, StoryObj } from '@storybook/html';
import { renderComponent } from '../../helpers';
import { Logo } from './class';

const storyTemplate = html<Logo>`
  <sds-logo
    claim="${x => x.claim}"
    variant="${x => x.variant}"
  ></sds-logo>
`;

const render = renderComponent(storyTemplate);

export default {
  argTypes: {
    claim: {
      control: 'boolean',
      defaultValue: true,
      description: 'Show or hide the claim of the logo. The logo is used without a claim if no advertising message is associated with the logo or if the use of the claim is not possible for reasons of space (width less than 1 cm).',
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    variant: {
      control: 'select',
      defaultValue: 'original',
      description: 'The variant of the logo to use',
      options: [
        'black',
        'white',
        'color',
      ],
      table: {
        defaultValue: {
          summary: 'color',
        },
      },
    },
  },
  render,
  tags: ['autodocs'],
  title: 'Components/Logo',
} as Meta;

export const Default: StoryObj = {};

export const Black: StoryObj = {
  args: {
    variant: 'black',
  },
};

export const White: StoryObj = {
  args: {
    variant: 'white',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const WithoutClaim: StoryObj = {
  args: {
    claim: false,
  },
};

export const WithoutClaimBlack: StoryObj = {
  args: {
    claim: false,
    variant: 'black',
  },
};
