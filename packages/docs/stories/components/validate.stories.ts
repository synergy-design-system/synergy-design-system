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
          label="Inline Validation"
          value="team(at)synergy.com"
        ></syn-input>
      `.trim(),
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-validate',
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
    <syn-validate inline>
      <syn-input
        label="Inline Validation"
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
    <syn-validate hide-icon>
      <syn-radio-group label="Live validation">
        <syn-radio value="wrong">Wrong</syn-radio>
        <syn-radio value="correct">Correct</syn-radio>
      </syn-radio-group>
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
    <syn-validate live>
      <syn-radio-group label="Live validation">
        <syn-radio value="wrong">Wrong</syn-radio>
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
    <syn-validate custom-validation="Include an &quot;@&quot; in the email address, otherwise you will never get our marvelous newsletter">
      <syn-input
        label="Inline Validation"
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
    <syn-validate live>
      TODO
    </syn-validate>  
  `,
};

export const ErrorSummary: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('validate', 'error-summary'),
      },
    },
  },
  render: () => html`
    <syn-validate live>
      <form>
        <syn-radio-group label="Live validation">
          <syn-radio value="wrong">Wrong</syn-radio>
          <syn-radio value="correct">Correct</syn-radio>
        </syn-radio-group>

        <syn-input
          label="Inline Validation"
          value="team(at)synergy.com"
        ></syn-input>

      </form>
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
  ErrorSummary,
});
/* eslint-enable sort-keys */
