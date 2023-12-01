/* eslint-disable complexity */
/* eslint-disable import/no-relative-packages */

import '../../../components/src/components/radio-group/radio-group.js';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent } from '@storybook/testing-library';
import { waitUntil } from '@open-wc/testing-helpers';
import docsTokens from '../../../tokens/src/figma-tokens/_docs.json';
import { storybookDefaults, storybookHelpers, storybookTemplate } from '../../src/helpers/component.js';

const { args, argTypes } = storybookDefaults('syn-radio-group');
const { overrideArgs } = storybookHelpers('syn-radio-group');

const generateStoryDescription = (attributeName: string) => ({
  story: (docsTokens?.components?.['radio-group'] as any)?.[attributeName]?.description?.value ?? 'No Description',
});

const meta: Meta = {
  component: 'radio-group',
  args,
  argTypes,
  parameters: {
    docs: {
      description: generateStoryDescription('default'),
    },
  },
  title: 'Components/syn-radio-group',
};
export default meta;

type Story = StoryObj;

export const Default = {
  parameters: {
    docs: {
      description: generateStoryDescription('default'),
    },
  },
  render: () => html`
  <syn-radio-group label="This is a label">
    <syn-radio value="1">Option</syn-radio>
    <syn-radio value="2">Option</syn-radio>
    <syn-radio value="3">Option</syn-radio>
  </syn-radio-group>`,
} as Story;

export const Labels: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('labels'),
    },
  },
  render: () => html`
  <syn-radio-group label="This is a label">
    <syn-radio value="1">Option</syn-radio>
    <syn-radio value="2">Option</syn-radio>
    <syn-radio value="3">Option</syn-radio>
  </syn-radio-group>`,
};

export const HelpText: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('help-text'),
    },
  },
  render: () => html`
  <syn-radio-group label="This is a label" help-text="This is the help-text" name="a">
    <syn-radio value="1">Option</syn-radio>
    <syn-radio value="2">Option</syn-radio>
    <syn-radio value="3">Option</syn-radio>
  </syn-radio-group>`,
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('disabled'),
    },
  },
  render: () => html`
  <syn-radio-group label="This is a label" help-text="This is disabled" name="a">
    <syn-radio value="1">Option</syn-radio>
    <syn-radio value="2" disabled>Option</syn-radio>
    <syn-radio value="3">Option</syn-radio>
  </syn-radio-group>`,
};

export const Checked: Story = {
  render: () => html`
  <syn-radio-group label="This is a label" help-text="This is checked" name="a" value="2">
    <syn-radio value="1">Option</syn-radio>
    <syn-radio value="2">Option</syn-radio>
    <syn-radio value="3">Option</syn-radio>
  </syn-radio-group>`,
};

export const Invalid: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('required'),
    },
  },
  play: async ({ canvasElement }) => {
    try {
      const button = canvasElement.querySelector('syn-button');

      if (button) {
        await userEvent.click(button);
        button.click();
      }
    } catch (error) {
      console.error('Error in play function:', error);
    }
  },
  render: () => html`
  <form class="custom-validity">
    <syn-radio-group label="Select an option" name="a" help-text="This is required" required>
      <syn-radio value="1">Option 1</syn-radio>
      <syn-radio value="2">Option 2</syn-radio>
      <syn-radio value="3">Option 3</syn-radio>
    </syn-radio-group>
    <syn-button type="submit" variant="filled">Submit</syn-button>
  </form>
  <style>
  .custom-validity {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  syn-button {
    align-self: flex-start;
  }
</style>`,
};

export const CustomValidity: Story = {
  parameters: {
    docs: {
      description: generateStoryDescription('setCustomValidity'),
    },
  },
  play: async ({ canvasElement }) => {
    try {
      const radioGroup = canvasElement.querySelector('syn-radio-group');
      const button = canvasElement.querySelector('syn-button');
      const initiallySelectedOption = canvasElement.querySelector('syn-radio[value="1"]');
      const correctRadioOption = canvasElement.querySelector('syn-radio[value="3"]');
      const errorMessage = 'You must choose the last option';

      radioGroup?.setCustomValidity(errorMessage);

      if (initiallySelectedOption) {
        await userEvent.click(initiallySelectedOption);
      }

      if (correctRadioOption && radioGroup?.value === '3') {
        radioGroup?.setCustomValidity('');
      } else {
        radioGroup?.setCustomValidity(errorMessage);
      }

      if (button) {
        await userEvent.click(button);
        button.click();
        if (radioGroup?.checkValidity()) {
          console.log('All fields are valid!');
        } else {
          console.error('Form validation failed');
        }
      }
    } catch (error) {
      console.error('Error in play function:', error);
    }
  },

  render: () => html`
  <form class="custom-validity">
    <syn-radio-group label="Select an option" name="a" value="1">
      <syn-radio value="1">Not me</syn-radio>
      <syn-radio value="2">Me neither</syn-radio>
      <syn-radio value="3">Choose me</syn-radio>
    </syn-radio-group>
    <br />
    <syn-button type="submit" variant="filled">Submit</syn-button>
  </form>`,
};
