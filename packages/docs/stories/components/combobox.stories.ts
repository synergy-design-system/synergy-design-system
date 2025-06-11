/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import '../../../components/src/components/combobox/combobox.js';
import '../../../components/src/components/button/button.js';
import '../../../components/src/components/icon/icon.js';
import '../../../components/src/components/option/option.js';
import '../../../components/src/components/optgroup/optgroup.js';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { SynCombobox } from '@synergy-design-system/components';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { userEvent } from '@storybook/test';
import { highlightOptionRenderer } from '../../../components/src/components/combobox/option-renderer.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';
import { paddingDecorator } from '../../src/decorators/PaddingDecorator.js';

const { args, argTypes } = storybookDefaults('syn-combobox');
const { overrideArgs } = storybookHelpers('syn-combobox');
const { generateTemplate } = storybookTemplate('syn-combobox');

const meta: Meta = {
  args,
  argTypes,
  component: 'syn-combobox',
  parameters: {
    design: generateFigmaPluginObject('25272-35634'),
    docs: {
      description: {
        component: generateStoryDescription('combobox', 'default'),
      },
      story: {
        height: '250px',
      },
    },
  },
  title: 'Components/syn-combobox',
};
export default meta;

type Story = StoryObj;

const colors = [
  'Yellow',
  'Light Green',
  'Grey',
  'Green',
  'Blue',
  'Red',
  'Orange',
  'Magenta',
  'White',
  'Purple',
  'Pink',
  'Black',
  'Brown',
].sort();

const createColorOption = (color: string) => `<syn-option value="${color.replaceAll(' ', '_')}">${color}</syn-option>`;

const createColorOptionHtml = (color: string) => unsafeHTML(createColorOption(color));

const createColorOptions = () => colors.map(createColorOption);

const createColorOptionsHtml = () => unsafeHTML(createColorOptions().join('\n'));

export const Default = {
  parameters: {
    args: overrideArgs({
      name: 'default',
      type: 'slot',
      value: `
      <syn-option>Option 1</syn-option>
      <syn-option>Option 2</syn-option>
      <syn-option>Option 3</syn-option>`,
    }, args),
    controls: {
      disable: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('combobox', 'default'),
      },
    },
  },
  render: (renderArgs: unknown) => generateTemplate({ args: renderArgs }),

} as Story;

export const Labels: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('combobox', 'label'),
      },
    },
  },
  render: () => html`
    <syn-combobox label="State">
      <syn-option>Option 1</syn-option>
      <syn-option>Option 2</syn-option>
      <syn-option>Option 3</syn-option>
    </syn-combobox>
  `,
};

export const HelpText: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('combobox', 'help-text'),
      },
    },
  },
  render: () => html`
    <syn-combobox label="State" help-text="Select a State">
      <syn-option>Option 1</syn-option>
      <syn-option>Option 2</syn-option>
      <syn-option>Option 3</syn-option>
    </syn-combobox>
  `,
};

export const Placeholder: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('combobox', 'placeholder'),
      },
    },
  },
  render: () => html`
    <syn-combobox label="State" help-text="Select a State" placeholder="Select a State">
      <syn-option>Option 1</syn-option>
      <syn-option>Option 2</syn-option>
      <syn-option>Option 3</syn-option>
    </syn-combobox>
  `,
};

export const Focus: Story = {
  decorators: [paddingDecorator()],
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('combobox', 'focus'),
      },
    },
  },
  play: ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const elm = canvasElement.querySelector<SynCombobox>('syn-combobox');
    if (elm) {
      elm.focus();
    }
  },
  render: () => html`
    <syn-combobox>
      <syn-option>Option 1</syn-option>
      <syn-option>Option 2</syn-option>
      <syn-option>Option 3</syn-option>
    </syn-combobox>
  `,
};

export const Clearable: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('combobox', 'clearable'),
      },
    },
  },
  render: () => html`
    <syn-combobox value="Green" clearable>
      ${createColorOptionsHtml()}
    </syn-combobox>
  `,
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('combobox', 'disabled'),
      },
    },
  },
  render: () => html`
    <syn-combobox  disabled placeholder="Disabled">
      ${createColorOptionsHtml()}
    </syn-combobox>
  `,
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('combobox', 'size'),
      },
    },
  },
  render: () => html`
    <syn-combobox size="small" placeholder="Small">
      ${createColorOptionsHtml()}
    </syn-combobox>

    <br />

    <syn-combobox size="medium" placeholder="Medium">
      ${createColorOptionsHtml()}
    </syn-combobox>

    <br />

    <syn-combobox size="large" placeholder="Large">
      ${createColorOptionsHtml()}
    </syn-combobox>
  `,
};

export const Invalid: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('combobox', 'invalid'),
      },
    },
  },
  play: async ({ canvasElement }) => {
    const form = canvasElement.querySelector('form')!;
    const combobox = form.querySelector('syn-combobox');
    const button = form.querySelector('syn-button');

    if (button && combobox) {
      // make sure to always fire both events:
      // 1. userEvent.click is needed for storybooks play function to register
      // 2. button.click is needed to really click the button
      // userEvent.click works on native elements only
      await userEvent.click(button);
      button.click();
    }
  },
  render: () => html`
    <form class="custom-validity">
      <syn-combobox required placeholder="Type something" help-text="This is required">
        ${createColorOptionsHtml()}
      </syn-combobox>
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
    </style>
  `,
};

export const PrefixSuffixTextAndIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('combobox', 'preffix-sufffix'),
      },
    },
  },
  render: () => html`
    <syn-combobox placeholder="Small" size="small" clearable>
      <span slot="prefix">prefix</span>
      <span slot="suffix">suffix</span>
      ${createColorOptionsHtml()}
    </syn-combobox>
    <br />
    <syn-combobox placeholder="Medium" size="medium" clearable>
      <span slot="prefix">prefix</span>
      <span slot="suffix">suffix</span>
      ${createColorOptionsHtml()}
    </syn-combobox>
    <br />
    <syn-combobox placeholder="Large" size="large" clearable>
      <span slot="prefix">prefix</span>
      <span slot="suffix">suffix</span>
      ${createColorOptionsHtml()}
    </syn-combobox>

    <br />

    <syn-combobox placeholder="Small" size="small" clearable>
      <syn-icon name="wallpaper" slot="prefix"></syn-icon>
      ${createColorOptionsHtml()}
      <syn-icon name="wallpaper" slot="suffix"></syn-icon>
    </syn-combobox>
    <br />
    <syn-combobox placeholder="Medium" size="medium" clearable>
      <syn-icon name="wallpaper" slot="prefix"></syn-icon>
      ${createColorOptionsHtml()}
      <syn-icon name="wallpaper" slot="suffix"></syn-icon>
    </syn-combobox>
    <br />
    <syn-combobox placeholder="Large" size="large" clearable>
      <syn-icon name="wallpaper" slot="prefix"></syn-icon>
      ${createColorOptionsHtml()}
      <syn-icon name="wallpaper" slot="suffix"></syn-icon>
    </syn-combobox>
  `,
};

export const SimpleSuggests: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('combobox', 'simple'),
      },
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const combobox = canvasElement.querySelector<SynCombobox>('syn-combobox')!;
    await combobox.updateComplete;
    await combobox.show();
  },
  render: () => html`
    <syn-combobox label="Preferred Color" value="g">
     ${createColorOptionsHtml()}
    </syn-combobox>
  `,
};

export const HighlightQuery: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('combobox', 'highlight'),
      },
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const combobox = canvasElement.querySelector<SynCombobox>('syn-combobox')!;
    await combobox.updateComplete;
    await combobox.show();
  },
  render: () => {
    const optionRenderer = highlightOptionRenderer;
    return html`
    <syn-combobox label="Preferred color" class="highlight-combobox" value="g">
     ${createColorOptionsHtml()}
    </syn-combobox>
    <script type="module">
      // the highlight option renderer utility function can be imported via:
      // import { highlightOptionRenderer } from '@synergy-design-system/components';

      // preview-ignore:start
      const highlightOptionRenderer = ${optionRenderer};
      // preview-ignore:end
    
      const comboboxes = document.querySelectorAll('.highlight-combobox');
      comboboxes.forEach((combobox) => {
        combobox.getOption = highlightOptionRenderer;
      });
    </script>
  `;
  },
};

export const GroupingQuery: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('combobox', 'grouping'),
      },
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const combobox = canvasElement.querySelector<SynCombobox>('syn-combobox')!;
    await combobox.updateComplete;
    await combobox.show();
  },
  render: () => html`
    <syn-combobox label="Group elements" value="g">
      <syn-optgroup label="B">
        ${createColorOptionHtml('Black')}
        ${createColorOptionHtml('Blue')}
        ${createColorOptionHtml('Brown')}
      </syn-optgroup>
      <syn-optgroup label="G">
        ${createColorOptionHtml('Green')}
        ${createColorOptionHtml('Grey')}
      </syn-optgroup>
      <syn-optgroup label="L">
        ${createColorOptionHtml('Light Green')}
      </syn-optgroup>
      <syn-optgroup label="M">
        ${createColorOptionHtml('Magenta')}
      </syn-optgroup>
      <syn-optgroup label="O">
        ${createColorOptionHtml('Orange')}
      </syn-optgroup>
      <syn-optgroup label="W">
        ${createColorOptionHtml('White')}
      </syn-optgroup>
      <syn-optgroup label="P">
        ${createColorOptionHtml('Pink')}
        ${createColorOptionHtml('Purple')}
      </syn-optgroup>
      <syn-optgroup label="R">
        ${createColorOptionHtml('Red')}
      </syn-optgroup>
      <syn-optgroup label="W">
        ${createColorOptionHtml('White')}
      </syn-optgroup>
      <syn-optgroup label="Y">
        ${createColorOptionHtml('Yellow')}
      </syn-optgroup>
    </syn-combobox>
  `,
};

export const SuggestionContainerHeight: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('combobox', 'container-height'),
      },
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const combobox = canvasElement.querySelector<SynCombobox>('syn-combobox')!;
    await combobox.updateComplete;
    await combobox.show();
  },
  render: () => html`
    <syn-combobox id="max-height" label="Preferred color" value="g">
      ${createColorOptionsHtml()}
    </syn-combobox>
    <style>
      #max-height::part(listbox) {
        /* if there is not enough space for the desired height, use the available calculated height */
        max-height: min(var(--auto-size-available-height), 112px);
      }
    </style>
  `,
};

export const AsyncOptions: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('combobox', 'async-options'),
      },
    },
  },
  render: () => html`
    <syn-combobox label="Async options" class="async-combobox">
      <syn-option>Option 1</syn-option>
      <syn-option>Option 2</syn-option>
      <syn-option>Option 3</syn-option>
    </syn-combobox>
    <script type="module">
      const comboboxes = document.querySelectorAll('.async-combobox');
      comboboxes.forEach((combobox) => {
        // After api request the options are added async
        let index = 4;
        let timeout = setInterval(() => {
          const option = document.createElement('syn-option');
          const value = 'Option ' + index++;
          option.textContent = value;
          combobox.appendChild(option);
          if(index > 10) {
            clearInterval(timeout);
          }
        }, 4000);
      });
    </script>
  `,
};

export const CustomFilter: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('combobox', 'custom-filter'),
      },
    },
  },
  render: () => html`
    <syn-combobox label="Custom Filter" class="filter-combobox">
      ${createColorOptionsHtml()}
    </syn-combobox>
    <script type="module">
      const comboboxes = document.querySelectorAll('.filter-combobox');
      comboboxes.forEach((combobox) => {
        const oldFilter = combobox.filter;
        combobox.filter = (option, queryString) => {
          // only show options for more than 2 characters on text input
          if(queryString && queryString.length > 2) {
            return oldFilter(option, queryString);
          }
          return false;
        }
      });
    </script>
  `,
};

// Bundled screenshot story
/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Labels,
  HelpText,
  Placeholder,
  Clearable,
  Disabled,
  Sizes,
  PrefixSuffixTextAndIcons,
  AsyncOptions,
  CustomFilter,
}, 500);
/* eslint-enable sort-keys */
