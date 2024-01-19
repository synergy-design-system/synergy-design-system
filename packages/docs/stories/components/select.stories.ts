/* eslint-disable */

/* eslint-disable import/no-relative-packages */

import '../../../components/src/components/select/select';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { generateScreenshotStory, storybookDefaults, storybookHelpers, storybookTemplate, generateStoryDescription } from '../../src/helpers/component.js';
const { args, argTypes } = storybookDefaults('syn-select');
const { overrideArgs } = storybookHelpers('syn-select');
const { generateTemplate } = storybookTemplate('syn-select');

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
      story: {
        height: '250px',
      }
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
  render: () => html`
    <syn-select label="Select one">
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-select>
  `,
};

/**
 * Use the label attribute to give the select an accessible label. For labels that contain HTML, use the label slot instead.
 */
export const Labels: Story = {
  name: 'Labels',
  render: () => html`
    <syn-select label="Select one">
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-select>
  `,
};

/**
 * Add descriptive help text to a select with the help-text attribute. For help texts that contain HTML, use the help-text slot instead.
 */
export const HelpText: Story = {
  name: 'Help Text',
  render: () => html`
    <syn-select label="Experience" help-text="Please tell us your skill level.">
      <syn-option value="1">Novice</syn-option>
      <syn-option value="2">Intermediate</syn-option>
      <syn-option value="3">Advanced</syn-option>
    </syn-select>
  `,
};

/**
 * Use the placeholder attribute to add a placeholder.
 */
export const Placeholders: Story = {
  name: 'Placeholders',
  render: () => html`
    <syn-select placeholder="Select one">
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-select>
  `,
};

/**
 * Use the clearable attribute to make the control clearable. The clear button only appears when an option is selected.
 */
export const Clearable: Story = {
  name: 'Clearable',
  render: () => html`
    <syn-select clearable value="option-1">
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-select>
  `,
};

/**
 * Use the disabled attribute to disable a select.
 */
export const Disabled: Story = {
  name: 'Disabled',
  render: () => html`
    <syn-select placeholder="Disabled" disabled>
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
    </syn-select>
  `,
};

/**
 * To allow multiple options to be selected, use the multiple attribute. It's a good practice to use clearable when this option is enabled. To set multiple values at once, set value to a space-delimited list of values.
 */
export const Multiple: Story = {
  name: 'Multiple',
  render: () => html`
    <syn-select label="Select a Few" value="option-1 option-2 option-3" multiple clearable>
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
      <syn-option value="option-4">Option 4</syn-option>
      <syn-option value="option-5">Option 5</syn-option>
      <syn-option value="option-6">Option 6</syn-option>
    </syn-select>
  `,
};

/**
 * To allow multiple options to be selected, use the multiple attribute. You may also group the options
 */
export const MultipleGrouped: Story = {
  name: 'Multiple Grouped',
  render: () => html`
    <syn-select label="Select a Few" value="option-1 option-2 option-3" multiple clearable>
      <syn-optgroup label="First Group">
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2">Option 2</syn-option>
      </syn-optgroup>
      <syn-optgroup label="Second Group">
        <syn-option value="option-3">Option 3</syn-option>
        <syn-option value="option-4">Option 4</syn-option>
      </syn-optgroup>
      <syn-optgroup label="Third Group">
        <syn-option value="option-5">Option 5</syn-option>
        <syn-option value="option-6">Option 6</syn-option>
      </syn-optgroup>
    </syn-select>
  `,
};

/**
 * Use the value attribute to set the initial selection.When using multiple, the value  uses space-delimited values to select more than one option. Because of this, <syn-option> values cannot contain spaces. If you're accessing the value  through Javascript, it will be an array.
 */
export const SettingInitialValues: Story = {
  name: 'Setting Initial Values',
  render: () => html`
    <syn-select value="option-1 option-2" multiple clearable>
      <syn-option value="option-1">Option 1</syn-option>
      <syn-option value="option-2">Option 2</syn-option>
      <syn-option value="option-3">Option 3</syn-option>
      <syn-option value="option-4">Option 4</syn-option>
    </syn-select>
  `,
};

/**
 * Use <syn-divider> to group listbox items visually.
 */
export const GroupingOptions: Story = {
  name: 'Grouping Options',
  render: () => html`
    <syn-select>
      <syn-optgroup label="Option">
        <syn-option value="1">Option</syn-option>
        <syn-option value="2">Option</syn-option>
      </syn-optgroup>
      <syn-optgroup label="Option">
        <syn-option value="3">Option</syn-option>
      </syn-optgroup>
    </syn-select>
  `,
};

/**
 * Use the size attribute to change a select's size. Note that size does not apply to listbox options.
 */
export const Sizes: Story = {
  name: 'Sizes',
  render: () => html`
    <syn-select placeholder="Small" size="small">
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
    </syn-select>
  `,
};

/**
 * The preferred placement of the select's listbox can be set with the placement attribute. Note that the actual position may vary to ensure the panel remains in the viewport. Valid placements are top and bottom.
 */
export const Placement: Story = {
  name: 'Placement',
  render: () => html`
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu euismod est. Aliquam leo purus, dignissim vitae pretium et, scelerisque at sapien. Pellentesque vehicula vulputate orci a sagittis. Nunc aliquam enim ex, non mattis est scelerisque at. Suspendisse potenti. Phasellus in felis dolor. Aenean laoreet malesuada tristique. Sed consectetur dictum ex id imperdiet. Proin dapibus tellus eu dui rhoncus, at molestie arcu malesuada. Integer quis sollicitudin eros, eu auctor nibh. Donec pharetra nunc a tristique molestie. Aliquam vitae convallis libero, eget commodo lacus. Donec pellentesque ut turpis eu sagittis.</p>
    <p>Aenean semper, ante ac aliquet varius, leo elit eleifend lacus, sed ullamcorper dolor felis in turpis. Morbi vestibulum vitae nibh et pulvinar. Fusce a tortor sed magna aliquet luctus id at mauris. Curabitur sed ex ligula. Phasellus porttitor metus ac nulla malesuada, eget convallis tellus sodales. Nullam eu interdum mauris. Etiam a quam id ligula suscipit dictum at nec velit. Sed ac faucibus tortor.</P>
    <p>Fusce quam neque, euismod non ipsum vel, vehicula volutpat massa. Nam vulputate accumsan dolor eu elementum. Etiam semper a ligula vitae condimentum. Aenean imperdiet arcu libero, ut porttitor ante mollis id. Proin ullamcorper leo est, in auctor justo congue sed. Aliquam ut mi et nunc pharetra accumsan in sed neque. Nulla eu lacinia elit, id mattis sapien. Morbi in tellus convallis, tempus tortor id, facilisis augue. In ultricies faucibus vulputate. Suspendisse luctus dolor leo, ut rutrum velit condimentum at. Maecenas fermentum finibus quam eget rhoncus. Sed rhoncus scelerisque odio vel fringilla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
    <syn-select placement="top">
      <syn-option value="1">Option 1</syn-option>
      <syn-option value="2">Option 2</syn-option>
      <syn-option value="3">Option 3</syn-option>
      <syn-option value="4">Option 4</syn-option>
      <syn-option value="5">Option 5</syn-option>
      <syn-option value="6">Option 6</syn-option>
      <syn-option value="7">Option 7</syn-option>
      <syn-option value="8">Option 8</syn-option>
      <syn-option value="9">Option 9</syn-option>
      <syn-option value="10">Option 10</syn-option>
      <syn-option value="11">Option 11</syn-option>
      <syn-option value="12">Option 12</syn-option>
      <syn-option value="13">Option 13</syn-option>
      <syn-option value="14">Option 14</syn-option>
      <syn-option value="15">Option 15</syn-option>
    </syn-select>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu euismod est. Aliquam leo purus, dignissim vitae pretium et, scelerisque at sapien. Pellentesque vehicula vulputate orci a sagittis. Nunc aliquam enim ex, non mattis est scelerisque at. Suspendisse potenti. Phasellus in felis dolor. Aenean laoreet malesuada tristique. Sed consectetur dictum ex id imperdiet. Proin dapibus tellus eu dui rhoncus, at molestie arcu malesuada. Integer quis sollicitudin eros, eu auctor nibh. Donec pharetra nunc a tristique molestie. Aliquam vitae convallis libero, eget commodo lacus. Donec pellentesque ut turpis eu sagittis.</p>
    <p>Aenean semper, ante ac aliquet varius, leo elit eleifend lacus, sed ullamcorper dolor felis in turpis. Morbi vestibulum vitae nibh et pulvinar. Fusce a tortor sed magna aliquet luctus id at mauris. Curabitur sed ex ligula. Phasellus porttitor metus ac nulla malesuada, eget convallis tellus sodales. Nullam eu interdum mauris. Etiam a quam id ligula suscipit dictum at nec velit. Sed ac faucibus tortor.</P>
    <p>Fusce quam neque, euismod non ipsum vel, vehicula volutpat massa. Nam vulputate accumsan dolor eu elementum. Etiam semper a ligula vitae condimentum. Aenean imperdiet arcu libero, ut porttitor ante mollis id. Proin ullamcorper leo est, in auctor justo congue sed. Aliquam ut mi et nunc pharetra accumsan in sed neque. Nulla eu lacinia elit, id mattis sapien. Morbi in tellus convallis, tempus tortor id, facilisis augue. In ultricies faucibus vulputate. Suspendisse luctus dolor leo, ut rutrum velit condimentum at. Maecenas fermentum finibus quam eget rhoncus. Sed rhoncus scelerisque odio vel fringilla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
  `,
}

/**
 * Use the prefix slot to prepend an icon to the control.
 */
export const PrefixIcons: Story = {
  name: 'Prefix Icons',
  render: () => html`
    <syn-select placeholder="Small" size="small" clearable>
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
    </syn-select>
  `,
};

/**
 * When multiple options can be selected, you can provide custom tags by passing a function to the getTag property. Your function can return a string of HTML, a <a href="https://lit.dev/docs/templates/overview/">Lit Template</a>, or an . The getTag() function will be called for each option. The first argument is an <syn-option> element and the second argument is the tag's index (its position in the tag list).Remember that custom tags are rendered in a shadow root. To style them, you can use the style attribute in your template or you can add your own  and target them with the  selector.
 */
export const CustomTags: Story = {
  name: 'Custom Tags',
  render: () => html`
    <syn-select
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
            <syn-icon name="\${name}"></syn-icon>
            \${option.getTextLabel()}
          </syn-tag>
        \`;
      };
    </script>
  `,
};

// Bundled screenshot story
export const Screenshot: Story = generateScreenshotStory([
  Labels,
  HelpText,
  Placeholders,
  Clearable,
  Disabled,
  Multiple,
  MultipleGrouped,
  SettingInitialValues,
  GroupingOptions,
  Sizes,
  // Placement,
  PrefixIcons,
  CustomTags,
], 280);
