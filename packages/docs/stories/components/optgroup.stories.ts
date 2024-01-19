/* eslint-disable */

/* eslint-disable import/no-relative-packages */

import '../../../components/src/components/optgroup/optgroup';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { storybookDefaults, storybookHelpers, storybookTemplate, generateStoryDescription } from '../../src/helpers/component.js';
const { args, argTypes } = storybookDefaults('syn-optgroup');
const { overrideArgs } = storybookHelpers('syn-optgroup');
const { generateTemplate } = storybookTemplate('syn-optgroup');

const meta: Meta = {
  component: 'syn-optgroup',
  args,
  argTypes,
  title: 'Components/syn-optgroup',
  parameters: {
    docs: {
      description: {
        component: generateStoryDescription('optgroup', 'default'),
      },
    }
  }
};
export default meta;

type Story = StoryObj;

export const Default = {
  render: (args: any) => {
    return html`
      <syn-select>
        <syn-optgroup label="Group 1 (via prop)">
          <syn-option value="1">Option 1</syn-option>
          <syn-option value="2">Option 2</syn-option>
          <syn-option value="3">Option 3</syn-option>
          <syn-option value="4">Option 4</syn-option>
          <syn-option value="5">Option 5</syn-option>
        </syn-optgroup>
        <syn-optgroup>
          <syn-icon slot="prefix" name="email"></syn-icon>
          <syn-icon slot="suffix" name="email"></syn-icon>
          <em slot="label">Group 2 (custom slotted)</em>
          <syn-option value="6">Option 6</syn-option>
          <syn-option value="7">Option 7</syn-option>
          <syn-option value="8">Option 8</syn-option>
          <syn-option value="9">Option 9</syn-option>
          <syn-option value="10">Option 10</syn-option>
        </syn-optgroup>
        <syn-optgroup id="disable-toggle" disabled label="Group 3 - Prefix only">
          <syn-icon slot="prefix" name="email"></syn-icon>
          <syn-option value="11">Option 11</syn-option>
          <syn-option value="12">Option 12</syn-option>
        </syn-optgroup>
        <syn-optgroup label="Group 4 - Suffix only">
          <syn-icon slot="suffix" name="email"></syn-icon>
          <syn-option value="13">Option 13</syn-option>
          <syn-option value="14">Option 14</syn-option>
        </syn-optgroup>
        <syn-optgroup>
          <syn-option value="15">Option 15 (no label)</syn-option>
        </syn-optgroup>
      </syn-select>
      <syn-button>Toggle disabled</syn-button>
      <script>
      document.querySelector('syn-button').addEventListener('click', () => {
        const elm = document.querySelector('#disable-toggle');
        elm.disabled = !elm.disabled;
      });
      </script>
    `;
    // return generateTemplate({ args });
  },
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('optgroup', 'default'),
      }
    }
  }
} as Story;
