import type { Meta, StoryObj as Story } from '@storybook/web-components-vite';
import { html } from 'lit';
import '../../../components/src/components/validate/validate.js';
import '../../../components/src/components/input/input.js';
import '../../../components/src/components/button/button.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import '../../src/validate-demo-radio.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';
import { Chromatic_Modes_All } from '../../.storybook/modes.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-validate');
const { overrideArgs } = storybookHelpers('syn-validate');
const { generateTemplate } = storybookTemplate('syn-validate');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'default',
      type: 'slot',
      value: `
<syn-input
  label="Invalid input"
  type="email"
  value="team(at)synergy.com"
></syn-input>
      `.trim(),
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-validate',
  decorators: [
    (story, options) => {
      const uniqueId = `${options.id}-validate-demo-form`;
      return html`
        <form id=${uniqueId}>
          ${story()}
          <p>
            <syn-button type="submit">Submit</syn-button>
          </p>
        </form>
        <script type="module">
          customElements.whenDefined('syn-validate').then(() => {
            const form = document.getElementById('${uniqueId}');
            form.addEventListener('submit', (event) => {
              event.preventDefault();
            });
          });
        </script>
      `;
    },
  ],
  parameters: {
    chromatic: {
      modes: Chromatic_Modes_All,
    },
    design: generateFigmaPluginObject('24853-35456'),
    docs: {
      description: {
        component: generateStoryDescription('validate', 'default'),
      },
    },
  },
  tags: ['Form'],
  title: 'Components/syn-validate',
};
export default meta;

export const Default: Story = {
  parameters: {
    controls: {
      disable: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('validate', 'default'),
      },
    },
  },
  render: args => generateTemplate({ args }),
};

export const TooltipVariant: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('validate', 'tooltip'),
      },
    },
  },
  render: () => html`
    <syn-validate
      class="validation-tooltip"
      variant="tooltip"
      on="live"
      eager
    >
      <syn-input
        label="Invalid input"
        type="email"
        value="team(at)synergy.com"
        required
      ></syn-input>
    </syn-validate>`,
};

export const InlineVariant: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('validate', 'inline'),
      },
    },
  },
  render: () => html`
    <syn-validate
      class="validation-inline"
      variant="inline"
    >
      <syn-input
        label="Inline validation"
        type="email"
        value="team(at)synergy.com"
      ></syn-input>
    </syn-validate>
  `,
};

export const HideIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('validate', 'hide-icon'),
      },
    },
  },
  render: () => html`
    <syn-validate
      class="validation-hide-icon"
      hide-icon
      variant="inline"
    >
      <syn-input
        label="Hide icon"
        type="email"
        value="team(at)synergy.com"
      ></syn-input>
    </syn-validate>
  `,
};

export const Sizes: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('validate', 'size'),
      },
    },
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: var(--syn-spacing-large);">
      ${['small', 'medium', 'large'].map(size => html`
        <syn-validate eager variant="inline">
          <syn-input
            label="Size ${size}"
            size="${size}"
            type="email"
            value="team(at)synergy.com"
          ></syn-input>       
        </syn-validate>  
      `)}
    </div>
  `,
};

export const Live: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('validate', 'live'),
      },
    },
  },
  render: () => html`
    <syn-validate
      class="validation-live"
      variant="inline"
      on="live"
    >
      <syn-input
        label="Invalid input"
        type="email"
        value="team(at)synergy.com"
      ></syn-input>
    </syn-validate>
  `,
};

export const CustomValidationMessage: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('validate', 'custom-validation'),
      },
    },
  },
  render: () => html`
    <syn-validate
      class="validation-custom-validation"
      custom-validation-message="Include an &quot;@&quot; in the email address, otherwise you will never get our marvelous newsletter"
      variant="inline"
    >
      <syn-input
        label="Custom validation"
        type="email"
        value="team(at)synergy.com"
      ></syn-input>
    </syn-validate>
  `,
};

export const CustomFormField: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('validate', 'custom-form-field'),
      },
    },
  },
  render: () => html`
    <h3 style="margin: 0; padding: 0;">Choose SICK´s brand color</h3>
    <syn-validate
      class="validation-custom-form-field"
      on="live"
      variant="inline"
    >
      <validate-demo-radio name="color" required></validate-demo-radio>
    </syn-validate>
  `,
};

export const BindingToCustomEventNames: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('validate', 'custom-event-names'),
      },
    },
  },
  render: () => html`
    <syn-validate
      class="validation-custom-validation"
      on="mouseover blur"
      variant="inline"
    >
      <syn-input
        label="Custom validation (triggered on hover and blur)"
        type="email"
        value="team(at)synergy.com"
      ></syn-input>
    </syn-validate>
  `,
};

export const Eager: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('validate', 'eager'),
      },
    },
  },
  render: () => html`
    <syn-validate eager variant="inline">
      <syn-input
        label="Eager validation (triggered on page load)"
        type="email"
        value="team(at)synergy.com"
      ></syn-input>
    </syn-validate>
`,
};

// This is a custom demo that showcases how the sync between
// the input and the validation message can be controlled.
// As we do not an official story for this, it was left here on purpose for
// developers that want to try it out.
// Just uncomment the code below to interact in storybook
/*
export const CustomValidationDemo = {
  render: () => html`
    <syn-validate variant="inline" on="live" id="something-testing">
      <syn-input label="E-Mail" required type="email"></syn-input>
    </syn-validate>
    <syn-button
      onclick='document.getElementById("something-testing").customValidationMessage="Something"'
    >Set custom message</syn-button>
    <syn-button
      onclick='document.getElementById("something-testing").customValidationMessage=""'
    >Reset custom message</syn-button>
    <syn-button
      onclick='document.getElementById("something-testing").variant="inline"'
    >Variant inline</syn-button>
    <syn-button
      onclick='document.getElementById("something-testing").variant="native"'
    >Variant Native</syn-button>
  `,
};
*/

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  TooltipVariant,
  InlineVariant,
  HideIcon,
  Live,
  CustomValidationMessage,
  CustomFormField,
  Eager,
}, 200);
/* eslint-enable sort-keys */
