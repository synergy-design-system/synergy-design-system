/* eslint-disable */

/* eslint-disable import/no-relative-packages */

import '../../../components/src/components/select/select';
import type { Meta, StoryObj } from '@storybook/web-components';
import { TemplateResult, html } from 'lit';
import { storybookDefaults, storybookHelpers, storybookTemplate, generateStoryDescription } from '../../src/helpers/component.js';
const { args, argTypes } = storybookDefaults('syn-select');
const { overrideArgs } = storybookHelpers('syn-select');
const { generateTemplate } = storybookTemplate('syn-select');

/**
 * Wraps the template output and provides a wrapper that adds some height to the items
 * @param template 
 * @returns 
 */
const renderWithAdjustedHeight = (template: TemplateResult) => html`
  <div style="height: 150px">
    ${template}
  </div>
`;

const meta: Meta = {
  component: 'syn-select',
  args,
  argTypes,
  title: 'Components/syn-select',
  parameters: {
    docs: {
      description: {
        component: generateStoryDescription('select', 'default'),
      },
    }
  }
};
export default meta;

type Story = StoryObj;

export const Default = {
  render: (args: any) => {
    return renderWithAdjustedHeight(generateTemplate({ args }));
  },
  parameters: {
    args: overrideArgs({
      name: 'default',
      type: 'slot',
      value: `
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2">Option 2</syn-option>
        <syn-option value="option-3">Option 3</syn-option>
      `,
    }, args),
    controls: {
      disable: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('select', 'default'),
      }
    }
  }
} as Story;

/**
 * @todo: Add this from docs tokens!
 * The focus event gives the user feedback that the select has been focused by the keyboard interaction.
 */
export const Focus: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        // story: generateStoryDescription('select', 'focus'),
      },
    },
  },
  play: ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const elm = canvasElement.querySelector('syn-select');
    if (elm) {
      elm.focus();
    }
  },
  render: () => renderWithAdjustedHeight(html`
    <syn-select label="Select one">
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-select>
  `),
};

/**
 * Use the label attribute to give the select an accessible label. For labels that contain HTML, use the label slot instead.
 */
export const Labels: Story = {
  render: () => renderWithAdjustedHeight(html`<syn-select label="Select one">
  <syn-option value="option-1">Option 1</syn-option>
  <syn-option value="option-2">Option 2</syn-option>
  <syn-option value="option-3">Option 3</syn-option>
</syn-select>`),
};

/**
 * Add descriptive help text to a select with the help-text attribute. For help texts that contain HTML, use the help-text slot instead.
 */
export const HelpText: Story = {
  render: () => renderWithAdjustedHeight(html`<syn-select label="Experience" help-text="Please tell us your skill level.">
  <syn-option value="1">Novice</syn-option>
  <syn-option value="2">Intermediate</syn-option>
  <syn-option value="3">Advanced</syn-option>
</syn-select>`),
};

/**
 * Use the placeholder attribute to add a placeholder.
 */
export const Placeholders: Story = {
  render: () => renderWithAdjustedHeight(html`<syn-select placeholder="Select one">
  <syn-option value="option-1">Option 1</syn-option>
  <syn-option value="option-2">Option 2</syn-option>
  <syn-option value="option-3">Option 3</syn-option>
</syn-select>`),
};

/**
 * Use the clearable attribute to make the control clearable. The clear button only appears when an option is selected.
 */
export const Clearable: Story = {
  render: () => renderWithAdjustedHeight(html`<syn-select clearable value="option-1">
  <syn-option value="option-1">Option 1</syn-option>
  <syn-option value="option-2">Option 2</syn-option>
  <syn-option value="option-3">Option 3</syn-option>
</syn-select>`),
};

/**
 * Add the filled attribute to draw a filled select.
 */
export const FilledSelects: Story = {
  render: () => renderWithAdjustedHeight(html`<syn-select filled>
  <syn-option value="option-1">Option 1</syn-option>
  <syn-option value="option-2">Option 2</syn-option>
  <syn-option value="option-3">Option 3</syn-option>
</syn-select>`),
};

/**
 * Use the disabled attribute to disable a select.
 */
export const Disabled: Story = {
  render: () => renderWithAdjustedHeight(html`<syn-select placeholder="Disabled" disabled>
  <syn-option value="option-1">Option 1</syn-option>
  <syn-option value="option-2">Option 2</syn-option>
  <syn-option value="option-3">Option 3</syn-option>
</syn-select>`),
};

/**
 * To allow multiple options to be selected, use the multiple attribute. It's a good practice to use clearable when this option is enabled. To set multiple values at once, set value to a space-delimited list of values.
 */
export const Multiple: Story = {
  render: () => renderWithAdjustedHeight(html`<syn-select label="Select a Few" value="option-1 option-2 option-3" multiple clearable>
  <syn-option value="option-1">Option 1</syn-option>
  <syn-option value="option-2">Option 2</syn-option>
  <syn-option value="option-3">Option 3</syn-option>
  <syn-option value="option-4">Option 4</syn-option>
  <syn-option value="option-5">Option 5</syn-option>
  <syn-option value="option-6">Option 6</syn-option>
</syn-select>`),
};

/**
 * Use the value attribute to set the initial selection.When using multiple, the value  uses space-delimited values to select more than one option. Because of this, <syn-option> values cannot contain spaces. If you're accessing the value  through Javascript, it will be an array.
 */
export const SettingInitialValues: Story = {
  render: () => renderWithAdjustedHeight(html`<syn-select value="option-1 option-2" multiple clearable>
  <syn-option value="option-1">Option 1</syn-option>
  <syn-option value="option-2">Option 2</syn-option>
  <syn-option value="option-3">Option 3</syn-option>
  <syn-option value="option-4">Option 4</syn-option>
</syn-select>`),
};

/**
 * Use <syn-divider> to group listbox items visually. You can also use <small> to provide labels, but they won't be announced by most assistive devices.
 */
export const GroupingOptions: Story = {
  render: () => renderWithAdjustedHeight(html`<syn-select>
  <small>Section 1</small>
  <syn-option value="option-1">Option 1</syn-option>
  <syn-option value="option-2">Option 2</syn-option>
  <syn-option value="option-3">Option 3</syn-option>
  <syn-divider></syn-divider>
  <small>Section 2</small>
  <syn-option value="option-4">Option 4</syn-option>
  <syn-option value="option-5">Option 5</syn-option>
  <syn-option value="option-6">Option 6</syn-option>
</syn-select>`),
};

/**
 * Use the size attribute to change a select's size. Note that size does not apply to listbox options.
 */
export const Sizes: Story = {
  render: () => renderWithAdjustedHeight(html`<syn-select placeholder="Small" size="small">
  <syn-option value="option-1">Option 1</syn-option>
  <syn-option value="option-2">Option 2</syn-option>
  <syn-option value="option-3">Option 3</syn-option>
</syn-select>

<br />

<syn-select placeholder="Medium" size="medium">
  <syn-option value="option-1">Option 1</syn-option>
  <syn-option value="option-2">Option 2</syn-option>
  <syn-option value="option-3">Option 3</syn-option>
</syn-select>

<br />

<syn-select placeholder="Large" size="large">
  <syn-option value="option-1">Option 1</syn-option>
  <syn-option value="option-2">Option 2</syn-option>
  <syn-option value="option-3">Option 3</syn-option>
</syn-select>`),
};

/**
 * The preferred placement of the select's listbox can be set with the placement attribute. Note that the actual position may vary to ensure the panel remains in the viewport. Valid placements are top and bottom.
 */
export const Placement: Story = {
  render: () => renderWithAdjustedHeight(html`<syn-select placement="top">
  <syn-option value="option-1">Option 1</syn-option>
  <syn-option value="option-2">Option 2</syn-option>
  <syn-option value="option-3">Option 3</syn-option>
</syn-select>`),
};

/**
 * Use the prefix slot to prepend an icon to the control.
 */
export const PrefixIcons: Story = {
  render: () => renderWithAdjustedHeight(html`<syn-select placeholder="Small" size="small" clearable>
  <syn-icon name="house" slot="prefix"></syn-icon>
  <syn-option value="option-1">Option 1</syn-option>
  <syn-option value="option-2">Option 2</syn-option>
  <syn-option value="option-3">Option 3</syn-option>
</syn-select>
<br />
<syn-select placeholder="Medium" size="medium" clearable>
  <syn-icon name="house" slot="prefix"></syn-icon>
  <syn-option value="option-1">Option 1</syn-option>
  <syn-option value="option-2">Option 2</syn-option>
  <syn-option value="option-3">Option 3</syn-option>
</syn-select>
<br />
<syn-select placeholder="Large" size="large" clearable>
  <syn-icon name="house" slot="prefix"></syn-icon>
  <syn-option value="option-1">Option 1</syn-option>
  <syn-option value="option-2">Option 2</syn-option>
  <syn-option value="option-3">Option 3</syn-option>
</syn-select>`),
};

/**
 * When multiple options can be selected, you can provide custom tags by passing a function to the getTag property. Your function can return a string of HTML, a <a href="https://lit.dev/docs/templates/overview/">Lit Template</a>, or an . The getTag() function will be called for each option. The first argument is an <syn-option> element and the second argument is the tag's index (its position in the tag list).Remember that custom tags are rendered in a shadow root. To style them, you can use the style attribute in your template or you can add your own  and target them with the  selector.
 */
export const CustomTags: Story = {
  render: () => renderWithAdjustedHeight(html`<syn-select
  placeholder="Select one"
  value="email phone"
  multiple
  clearable
  class="custom-tag"
>
  <syn-option value="email">
    <syn-icon slot="prefix" name="mail_lock"></syn-icon>
    Email
  </syn-option>
  <syn-option value="phone">
    <syn-icon slot="prefix" name="phone_callback"></syn-icon>
    Phone
  </syn-option>
  <syn-option value="chat">
    <syn-icon slot="prefix" name="chat_bubble"></syn-icon>
    Chat
  </syn-option>
</syn-select>

<script type="module">
  const select = document.querySelector('.custom-tag');

  select.getTag = (option, index) => {
    // Use the same icon used in the <syn-option>
    const name = option.querySelector('syn-icon[slot="prefix"]').name;

    // You can return a string, a Lit Template, or an HTMLElement here
    return \`
      <syn-tag removable>
        <syn-icon name="\${name}" style="padding-inline-end: .5rem;"></syn-icon>
        \${option.getTextLabel()}
      </syn-tag>
    \`;
  };
</script>`),
};
