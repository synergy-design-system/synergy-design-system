/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../../../components/src/components/dialog/dialog.js';
import '../../../components/src/components/button/button.js';
import '../../../components/src/components/icon-button/icon-button.js';
import '../../../components/src/components/input/input.js';
import {
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-dialog');
const { overrideArgs } = storybookHelpers('syn-dialog');
const { generateTemplate } = storybookTemplate('syn-dialog');

/**
 * Shared helper to draw the footer
 */
const createFooter = (className: string) => `
  <syn-button class="${className}" variant="filled" slot="footer">Close</syn-button>
  <script>
    [...document.querySelectorAll('.${className}')].forEach(elm => {
      elm.addEventListener('click', (e) => {
        const dialog = e.target.closest('syn-dialog');
        dialog.label += ' - Clicked';
        dialog.hide();
        dialog.modal.deactivateExternal();
      });  
    });
  </script>
`;

/**
 * Create a opener for the story helper to draw the default open button
 */
const createOpener = (className: string) => html`
  <syn-button class="${className}">Open Dialog</syn-button>
  <script type="module">
    const createOpener = (opener) => {
      // Storybook only: When loading the docs page, all dialogs are applying a focus trap.
      // Remove the initial trap and make sure to do the same when recreating the story.
      const loadedDialog = opener.parentElement.querySelector('syn-dialog');
      loadedDialog.modal.activateExternal();

      opener.addEventListener('click', (e) => {
        const currentDialog = e.target.parentElement.querySelector('syn-dialog');
        currentDialog.show();
        currentDialog.modal.activateExternal();
      });
    };

    [...document.querySelectorAll('.${className}')].forEach(i => { createOpener(i) })
  </script>
`;

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'open',
      type: 'attribute',
      value: true,
    },
    {
      name: 'label',
      type: 'attribute',
      value: 'Dialog',
    },
    {
      name: 'default',
      type: 'slot',
      value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      name: 'footer',
      type: 'slot',
      value: createFooter('default-close-icon'),
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-dialog',
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    design: generateFigmaPluginObject('14953-11300'),
    docs: {
      description: {
        component: generateStoryDescription('dialog', 'default'),
      },
      story: {
        height: '400px',
      },
    },
  },
  title: 'Components/syn-dialog',
};
export default meta;

type Story = StoryObj;

export const Default = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    controls: {
      disable: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('dialog', 'default'),
      },
    },
  },
  render: (args: unknown) => html`
    ${generateTemplate({ args })}
    ${createOpener('dialog-default-story-opener')}
  `,
};

export const CustomWidth: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('dialog', 'custom-width'),
      },
    },
  },
  render: () => html`
    <syn-dialog open label="Dialog" style="--width: 50vw;">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      ${unsafeHTML(createFooter('dialog-custom-width'))}
    </syn-dialog>
    ${createOpener('dialog-custom-width-story-opener')}
  `,
};

export const Scrolling: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('dialog', 'scrolling'),
      },
    },
  },
  render: () => html`
    <syn-dialog open label="Dialog">
      <div>
        <p>Scroll down and give it a try! 👇</p>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          At vero eos et accusam et justo duo dolores et ea rebum.
          Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          At vero eos et accusam et justo duo dolores et ea rebum.
          Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          At vero eos et accusam et justo duo dolores et ea rebum.
          Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          At vero eos et accusam et justo duo dolores et ea rebum.
          Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          At vero eos et accusam et justo duo dolores et ea rebum.
          Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          At vero eos et accusam et justo duo dolores et ea rebum.
          Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          At vero eos et accusam et justo duo dolores et ea rebum.
          Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </p>
      </div>
      ${unsafeHTML(createFooter('dialog-scrolling'))}
    </syn-dialog>
    ${createOpener('dialog-scrolling-story-opener')}
  `,
};

export const HeaderActions: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('dialog', 'header-actions'),
      },
    },
  },
  render: () => html`
    <syn-dialog open label="Dialog">
      <syn-icon-button class="new-window" slot="header-actions" name="open_in_new" label="Open in new Tab"></syn-icon-button>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      ${unsafeHTML(createFooter('dialog-header-actions'))}
    </syn-dialog>
    <script type="module">
      document.querySelector('.new-window').addEventListener('click', () => window.open(location.href));
    </script>
    ${createOpener('dialog-header-actions-story-opener')}
  `,
};

export const PreventingTheDialogFromClosing: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('dialog', 'prevent-closing'),
      },
    },
  },
  render: () => html`
    <syn-dialog open label="Dialog" class="dialog-deny-close">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      ${unsafeHTML(createFooter('dialog-deny-close-actions'))}
    </syn-dialog>
    <script type="module">
      const dialog = document.querySelector('.dialog-deny-close');
      dialog.addEventListener('syn-request-close', (event) => {
        if (event.detail.source === 'overlay') {
          event.preventDefault();
        }
      });
    </script>
    ${createOpener('dialog-deny-close-story-opener')}
  `,
};

export const CustomizingInitialFocus: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('dialog', 'focus'),
      },
    },
  },
  render: () => html`
    <syn-dialog label="Dialog">
      <syn-input autofocus placeholder="I will have focus when the dialog is opened"></syn-input>
      ${unsafeHTML(createFooter('dialog-initial-focus-actions'))}
    </syn-dialog>
    ${createOpener('dialog-initial-focus-story-opener')}
  `,
};
