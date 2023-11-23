/* eslint-disable */

/* eslint-disable import/no-relative-packages */

import '../../../components/src/components/checkbox/checkbox';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { userEvent } from '@storybook/testing-library';
import { waitUntil } from '@open-wc/testing-helpers';
import docsTokens from '../../../tokens/src/figma-tokens/_docs.json';
import { storybookDefaults, storybookHelpers, storybookTemplate } from '../../src/helpers/component.js';
const { args, argTypes } = storybookDefaults('syn-checkbox');
const { overrideArgs } = storybookHelpers('syn-checkbox');
const { generateTemplate } = storybookTemplate('syn-checkbox');

const generateStoryDescription = (attributeName: string = '') => {
  const story = attributeName
    ? (docsTokens?.components?.checkbox as Record<string, any>)?.[attributeName]?.description?.value ?? 'No Description'
    : (docsTokens?.components?.checkbox as Record<string, any>)?.description?.value ?? 'No Description';
  return {
    story,
  }
};

const meta: Meta = {
  component: 'checkbox',
  args: overrideArgs([
    { name: 'default', type: 'slot', value: 'Checkbox' }
  ]),
  argTypes,
  title: 'Components/syn-checkbox',
  parameters: {
    docs: {
      description: generateStoryDescription(),
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
      description: generateStoryDescription(),
    }
  }
} as Story;


/**
 * Use the checked attribute to activate the checkbox.
 */
export const Checked: Story = {
  render: () => html`<syn-checkbox checked>Checked</syn-checkbox>`,
};

/**
 * Use the indeterminate attribute to make the checkbox indeterminate.
 */
export const Indeterminate: Story = {
  render: () => html`<syn-checkbox indeterminate>Indeterminate</syn-checkbox>`,
};

/**
 * Use the disabled attribute to disable the checkbox.
 */
export const Disabled: Story = {
  render: () => html`<syn-checkbox disabled>Disabled</syn-checkbox>`,
};

/**
 * Use the size attribute to change a checkbox's size.
 */
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <syn-checkbox size="small">Small</syn-checkbox>
      <syn-checkbox size="medium">Medium</syn-checkbox>
      <syn-checkbox size="large">Large</syn-checkbox>
    </div>
  `,
};

/**
 * Use the setCustomValidity() method to set a custom validation message. This will prevent the form from submitting and make the browser display the error message you provide. To clear the error, call this function with an empty string.
 */
export const CustomValidity: Story = {
  play: async ({ canvasElement }) => {
    try {
      const button = canvasElement.querySelector('button');

      await waitUntil(() => customElements.whenDefined('syn-checkbox'));

      if (button) {
        await userEvent.click(button);
      }
    } catch (error) {
      console.error('Error in play function:', error);
    }
  },
  render: () => html`
    <form class="custom-validity">
      <syn-checkbox name="checked" value="on">Check me</syn-checkbox>
      <br />
      <button type="submit">Submit</button>
    </form>
    <style>
    form {
      display: flex;
      flex-direction: column;
    }

    button {
      margin-top: 1rem;
      align-self: flex-start;
      padding: 0.5rem 1rem;
      min-width: 5%;
    }
    </style>

    <script type="module">
      const form = document.querySelector('.custom-validity');
      const checkbox = form.querySelector('syn-checkbox');
      const errorMessage = \`Don't forget to check me!\`;

      // Set initial validity as soon as the element is defined
      customElements.whenDefined('syn-checkbox').then(async () => {
        await checkbox.updateComplete;
        checkbox.setCustomValidity(errorMessage);
      });

      // Update validity on change
      checkbox.addEventListener('syn-change', () => {
        checkbox.setCustomValidity(checkbox.checked ? '' : errorMessage);
      });

      // Handle submit
      form.addEventListener('submit', event => {
        event.preventDefault();
        alert('All fields are valid!');
      });
    </script>
  `,
};
