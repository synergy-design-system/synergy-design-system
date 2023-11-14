/* eslint-disable import/no-relative-packages */

import '../../../components/src/components/radio/radio.js';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent } from '@storybook/testing-library';
import { waitUntil } from '@open-wc/testing-helpers';
import docsTokens from '../../../tokens/src/figma-tokens/_docs.json';
import { storybookDefaults, storybookHelpers, storybookTemplate } from '../../src/helpers/component.js';

const { args, argTypes } = storybookDefaults('syn-radio');
const { overrideArgs } = storybookHelpers('syn-radio');
const { generateTemplate } = storybookTemplate('syn-radio');

const meta: Meta = {
  component: 'radio',
  args,
  argTypes,
  title: 'Components/syn-radio',
  parameters: {
    docs: {
      description: {
        component: docsTokens?.components?.radio?.default?.description?.value ?? 'No Description',
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default = {
  render: (args: any) => generateTemplate({ args }),
  parameters: {
    docs: {
      description: {
        story: docsTokens?.components?.radio?.default?.description?.value ?? 'No Description',
      },
    },
  },
} as Story;

/**
 * To set the initial value and checked state,
 * use the value attribute on the containing radio group.
 */
export const InitialValue: Story = {
  render: () => html`<radio-group label="Select an option" name="a" value="3">
  <syn-radio value="1">Option 1</syn-radio>
  <syn-radio value="2">Option 2</syn-radio>
  <syn-radio value="3">Option 3</syn-radio>
</radio-group>`,
};

/**
 * Use the disabled attribute to disable a radio.
 */
export const Disabled: Story = {
  render: () => html`
  <form>
  <legend>Select an option</legend>
    <syn-radio value="1">Option 1</syn-radio>
    <syn-radio value="2" disabled>Option 2</syn-radio>
    <syn-radio value="3">Option 3</syn-radio>
  </form>
  <style>
  legend {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  </style>`,
};

export const Focus: Story = {
  play: ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const radio = canvasElement.querySelector('syn-radio') as unknown as HTMLInputElement;
    if (radio) {
      radio.focus();
    }
  },
  render: () => html`
    <syn-radio value="1">Option 1</syn-radio>`,
};

export const Invalid: Story = {
  render: () => html`
  <form>
  <legend>Select an option</legend>
    <syn-radio value="1">Option 1</syn-radio>
    <syn-radio value="2">Option 2</syn-radio>
    <syn-radio value="3">Option 3</syn-radio>
  </form>
  <style>
  legend {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  </style>`,
};

export const Sizes: Story = {
  render: () => html`
  <form>
  <legend>Select an option</legend>
    <syn-radio value="1" size="small">Option 1</syn-radio>
    <syn-radio value="2" size="medium">Option 2</syn-radio>
    <syn-radio value="3" size="large">Option 3</syn-radio>
  </form>
  <style>
  legend {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  </style>`,
};
