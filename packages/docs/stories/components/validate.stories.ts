/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { html } from 'lit';
import '../../../components/src/components/validate/validate.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import '../../src/validate-demo-radio.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

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
    (story) => {
      const uniqueId = new Array(16).fill(0).map(() => Math.random().toString(36)[2]).join('');
      return html`
        <form id=${uniqueId}>
          ${story()}
        </form>
        <script type="module">
          customElements.whenDefined('syn-validate').then(() => {
            const form = document.getElementById('${uniqueId}');
            form.addEventListener('submit', (event) => {
              event.preventDefault();
              // form.querySelector('syn-validate').validate();
            });
          });
        </script>
      `;
    },
  ],
  parameters: {
    design: generateFigmaPluginObject('24853-35456'),
    docs: {
      description: {
        component: generateStoryDescription('validate', 'default'),
      },
    },
  },
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
  render: (args: unknown) => generateTemplate({ args }),
} as Story;

export const Inline: Story = {
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
      inline
    >
      <syn-input
        label="Inline Validation"
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
      inline
    >
      <syn-input
        label="Inline Validation"
        type="email"
        value="team(at)synergy.com"
      ></syn-input>
    </syn-validate>
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
      inline
      on="live"
    >
      <syn-radio-group required label="Live validation">
        <syn-radio>Wrong</syn-radio>
        <syn-radio value="correct">Correct</syn-radio>
      </syn-radio-group>
    </syn-validate>
  `,
};

export const CustomValidation: Story = {
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
      custom-validation="Include an &quot;@&quot; in the email address, otherwise you will never get our marvelous newsletter"
      inline
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
      inline
      on="live"
    >
      <validate-demo-radio name="color"></validate-demo-radio>
    </syn-validate>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Inline,
  HideIcon,
  Live,
  CustomValidation,
  CustomFormField,
});
/* eslint-enable sort-keys */
