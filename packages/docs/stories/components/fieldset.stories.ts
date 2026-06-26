import '../../../components/src/components/button/button.js';
import '../../../components/src/components/combobox/combobox.js';
import '../../../components/src/components/checkbox/checkbox.js';
import '../../../components/src/components/fieldset/fieldset.js';
import '../../../components/src/components/input/input.js';
import '../../../components/src/components/select/select.js';
import '../../../components/src/components/option/option.js';
import '../../../components/src/components/textarea/textarea.js';
import { html } from 'lit';
import type { Meta, StoryObj as Story } from '@storybook/web-components-vite';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';
import { Chromatic_Modes_All } from '../../.storybook/modes.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-fieldset');
const { overrideArgs } = storybookHelpers('syn-fieldset');
const { generateTemplate } = storybookTemplate('syn-fieldset');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'legend',
      type: 'attribute',
      value: 'Personal Information',
    },
    {
      name: 'description',
      type: 'attribute',
      value: 'Description text for the fieldset. This is optional and can be used to provide additional information about the fieldset.',
    },
    {
      name: 'default',
      type: 'slot',
      value: `
        <syn-input name="customerNr" label="Customer Number"></syn-input>
        <syn-input
          name="companyName"
          required=""
          label="Company name"
        ></syn-input>
        <syn-input name="address" required="" label="Address"></syn-input>
        <syn-input name="zip" required="" label="Postal Code"></syn-input>
        <syn-input name="city" required="" label="City"></syn-input>

        <syn-select name="country" required="" label="Country">
          <syn-option value="0">Deutschland</syn-option>

          <syn-option value="1">USA</syn-option>

          <syn-option value="2">China</syn-option>
        </syn-select>

        <syn-combobox
          name="salesPerson"
          required=""
          label="Your reference contact"
        >
          <syn-option>Max Mustermann</syn-option>
          <syn-option>John Doe</syn-option>
          <syn-option>Jane Row</syn-option>
          <syn-option>Average Joe</syn-option>
        </syn-combobox>
        <syn-input type="tel" name="phone" label="Phone number"></syn-input>
        <syn-input type="tel" name="fax" label="Fax number"></syn-input>
        <syn-input
          type="email"
          name="mail"
          required=""
          label="E-Mail address"
        ></syn-input>
      `,
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-fieldset',
  parameters: {
    chromatic: {
      modes: Chromatic_Modes_All,
    },
    design: generateFigmaPluginObject('41310-271865'),
    docs: {
      description: {
        component: generateStoryDescription('fieldset', 'default'),
      },
    },
  },
  tags: ['Form', 'Structure'],
  title: 'Components/syn-fieldset',
};
export default meta;

export const Default: Story = {
  parameters: {
    controls: {
      disable: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('file', 'default'),
      },
    },
  },
  render: args => html`
    <form method="get" class="fieldset-demo">
      <syn-fieldset
        .disabled=${args.disabled}
        item-spacing="dense"
        layout="two-columns"
        legend="Topic"
      >
        <syn-checkbox name="topic[0]" value="Inquiry/offer">
          Inquiry/offer
        </syn-checkbox>

        <syn-checkbox name="topic[1]" value="Orders/invoices">
          Orders/invoices
        </syn-checkbox>

        <syn-checkbox name="topic[2]" value="Returns/complaint">
          Returns/complaint
        </syn-checkbox>

        <syn-checkbox name="topic[3]" value="Documentation/CAD">
          Documentation/CAD
        </syn-checkbox>

        <syn-checkbox name="topic[4]" value="Accessories selection">
          Accessories selection
        </syn-checkbox>

        <syn-checkbox name="topic[5]" value="Application review">
          Application review
        </syn-checkbox>

        <syn-checkbox name="topic[6]" value="Commissioning support">
          Commissioning support
        </syn-checkbox>
      </syn-fieldset>

      <syn-fieldset
        .disabled=${args.disabled}
        item-spacing=${args.itemSpacing}
        layout="one-column"
        legend="Question"
      >
        <div slot="description">
          It is very helpful if the description is as precise as possible to
          enable us to process your enquiry correctly. When describing
          applications, please specify the material/dimensions/speed, if
          applicable.
        </div>

        <syn-textarea name="message" required="" label="Message"></syn-textarea>
      </syn-fieldset>


      ${generateTemplate({ args })}

      <syn-button type="submit">Submit</syn-button>
    </form>
    <style>
    .fieldset-demo {
      background: var(--syn-color-neutral-0);
      margin: 0 auto;
      padding: var(--syn-spacing-x-large);
      max-width: 750px;
    }
    </style>
    <script>
    document.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());
      console.log('Form submitted:', data);
    });
    </script>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
}, 750);
/* eslint-enable sort-keys */
