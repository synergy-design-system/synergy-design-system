/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import '../../../components/src/components/drawer/drawer.js';
import '../../../components/src/components/button/button.js';
import '../../../components/src/components/icon-button/icon-button.js';
import '../../../components/src/components/input/input.js';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { userEvent } from 'storybook/test';
import { html } from 'lit';
import {
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { DisableFocusTrap } from '../../src/shared-components/DisableFocusTrap.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-drawer');
const { overrideArgs } = storybookHelpers('syn-drawer');
const { generateTemplate } = storybookTemplate('syn-drawer');

const meta: Meta = {
  args: defaultArgs,
  argTypes,
  component: 'syn-drawer',
  parameters: {
    design: generateFigmaPluginObject('9983-7882'),
    docs: {
      container: DisableFocusTrap,
      description: {
        component: generateStoryDescription('drawer', 'default'),
      },
      story: {
        height: '400px',
      },
    },
  },
  tags: ['Structure'],
  title: 'Components/syn-drawer',
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  args: overrideArgs([
    {
      name: 'open',
      type: 'attribute',
      value: true,
    },
    {
      name: 'contained',
      type: 'attribute',
      value: false,
    },
    {
      name: 'label',
      type: 'attribute',
      value: 'Drawer',
    },
    {
      name: 'default',
      type: 'slot',
      value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      name: 'footer',
      type: 'slot',
      value: `
        <syn-button class="close-icon" slot="footer" variant="filled">Close</syn-button>
        <script>
          document.querySelector('.close-icon').addEventListener('click', (e) => {
            e.target.closest('syn-drawer').hide();
          });
        </script>
      `,
    },
  ], defaultArgs),
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    controls: {
      disable: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('drawer', 'default'),
      },
    },
  },
  render: args => html`
    ${generateTemplate({ args })}
    <syn-button class="drawer-default-story-opener">Open Drawer</syn-button>
    <script type="module">
    const openButtons = document.querySelectorAll('.drawer-default-story-opener');

    // Make sure to add each event only once!
    Array.from(openButtons).forEach((btn) => {
      if (!btn.classList.contains('story-loaded')) {
        const drawer = btn.parentElement.querySelector('syn-drawer')
        const closeButton = drawer.querySelector('syn-button[variant="filled"]');

        btn.addEventListener('click', () => drawer.show());
        closeButton.addEventListener('click', () => drawer.hide());

        btn.classList.add('story-loaded');
      }
    });
    </script>
  `,
};

export const SlideInFromStart: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('drawer', 'start'),
      },
    },
  },
  render: () => html`
    <syn-drawer label="Drawer" open placement="start" class="drawer-placement-start">
      This drawer slides in from the start.
      <syn-button slot="footer" variant="filled">Close</syn-button>
    </syn-drawer>

    <syn-button>Open Drawer</syn-button>

    <script type="module">
      const drawer = document.querySelector('.drawer-placement-start');
      const openButton = drawer.nextElementSibling;
      const closeButton = drawer.querySelector('syn-button[variant="filled"]');

      openButton.addEventListener('click', () => drawer.show());
      closeButton.addEventListener('click', () => drawer.hide());
    </script>
  `,
};

export const SlideInFromTop: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('drawer', 'top'),
      },
    },
  },
  render: () => html`
    <syn-drawer label="Drawer" open placement="top" class="drawer-placement-top">
      This drawer slides in from the top.
      <syn-button slot="footer" variant="filled">Close</syn-button>
    </syn-drawer>

    <syn-button>Open Drawer</syn-button>

    <script type="module">
      const drawer = document.querySelector('.drawer-placement-top');
      const openButton = drawer.nextElementSibling;
      const closeButton = drawer.querySelector('syn-button[variant="filled"]');

      openButton.addEventListener('click', () => drawer.show());
      closeButton.addEventListener('click', () => drawer.hide());
    </script>
  `,
};

export const SlideInFromBottom: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('drawer', 'bottom'),
      },
    },
  },
  render: () => html`
    <syn-drawer label="Drawer" open placement="bottom" class="drawer-placement-bottom">
      This drawer slides in from the bottom.
      <syn-button slot="footer" variant="filled">Close</syn-button>
    </syn-drawer>

    <syn-button>Open Drawer</syn-button>

    <script type="module">
      const drawer = document.querySelector('.drawer-placement-bottom');
      const openButton = drawer.nextElementSibling;
      const closeButton = drawer.querySelector('syn-button[variant="filled"]');

      openButton.addEventListener('click', () => drawer.show());
      closeButton.addEventListener('click', () => drawer.hide());
    </script>
  `,
};

export const ContainedToAnElement: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('drawer', 'contained'),
      },
    },
  },
  render: () => html`
    <div
      style="position: relative; border: solid 2px var(--syn-panel-border-color); height: 300px; padding: 1rem; margin-bottom: 1rem;"
    >
      The drawer will be contained to this box. This content won't shift or be affected in any way when the drawer opens.

      <syn-drawer label="Drawer" open contained class="drawer-contained" style="--size: 50%;">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        <syn-button slot="footer" variant="filled">Close</syn-button>
      </syn-drawer>
    </div>

    <syn-button>Toggle Drawer</syn-button>

    <script type="module">
      const drawer = document.querySelector('.drawer-contained');
      const openButton = drawer.parentElement.nextElementSibling;
      const closeButton = drawer.querySelector('syn-button[variant="filled"]');

      openButton.addEventListener('click', () => (drawer.open = !drawer.open));
      closeButton.addEventListener('click', () => drawer.hide());
    </script>
  `,
};

export const CustomSize: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('drawer', 'size'),
      },
    },
  },
  render: () => html`
    <syn-drawer label="Drawer" open placement="start" class="drawer-custom-size" style="--size: 50vw;">
      This drawer is always 50% of the viewport.
      <syn-button slot="footer" variant="filled">Close</syn-button>
    </syn-drawer>

    <syn-button>Open Drawer</syn-button>

    <script type="module">
      const drawer = document.querySelector('.drawer-custom-size');
      const openButton = drawer.nextElementSibling;
      const closeButton = drawer.querySelector('syn-button[variant="filled"]');

      openButton.addEventListener('click', () => drawer.show());
      closeButton.addEventListener('click', () => drawer.hide());
    </script>
  `,
};

export const Scrolling: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('drawer', 'scrolling'),
      },
    },
  },
  render: () => html`
    <syn-drawer label="Drawer" open placement="start" class="drawer-scrolling">
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
      <syn-button slot="footer" variant="filled">Close</syn-button>
    </syn-drawer>

    <syn-button>Open Drawer</syn-button>

    <script type="module">
      const drawer = document.querySelector('.drawer-scrolling');
      const openButton = drawer.nextElementSibling;
      const closeButton = drawer.querySelector('syn-button[variant="filled"]');

      openButton.addEventListener('click', () => drawer.show());
      closeButton.addEventListener('click', () => drawer.hide());
    </script>
  `,
};

export const HeaderActions: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('drawer', 'action'),
      },
    },
  },
  render: () => html`
    <syn-drawer label="Drawer" open placement="start" class="drawer-header-actions">
      <syn-icon-button
        class="new-window"
        slot="header-actions"
        name="open_in_new"
        label="Arrow Up"
      ></syn-icon-button>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      <syn-button slot="footer" variant="filled">Close</syn-button>
    </syn-drawer>

    <syn-button>Open Drawer</syn-button>

    <script type="module">
      const drawer = document.querySelector('.drawer-header-actions');
      const openButton = drawer.nextElementSibling;
      const closeButton = drawer.querySelector('syn-button[variant="filled"]');
      const newWindowButton = drawer.querySelector('.new-window');

      openButton.addEventListener('click', () => drawer.show());
      closeButton.addEventListener('click', () => drawer.hide());
      newWindowButton.addEventListener('click', () => window.open(location.href));
    </script>
  `,
};

export const PreventingTheDrawerFromClosing: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('drawer', 'closing'),
      },
    },
  },
  play: async ({ canvasElement }) => {
    const drawer = canvasElement.querySelector('syn-drawer');
    const overlay = drawer?.shadowRoot?.querySelector<HTMLDivElement>('.drawer__overlay');
    if (drawer && overlay) {
      await userEvent.click(overlay);
    }
  },
  render: () => html`
    <syn-drawer label="Drawer" open class="drawer-deny-close">
      This drawer will not close when you click on the overlay.
      <syn-button slot="footer" variant="filled">Close</syn-button>
    </syn-drawer>

    <syn-button>Open Drawer</syn-button>

    <script type="module">
      const drawer = document.querySelector('.drawer-deny-close');
      const openButton = drawer.nextElementSibling;
      const closeButton = drawer.querySelector('syn-button[variant="filled"]');

      openButton.addEventListener('click', () => drawer.show());
      closeButton.addEventListener('click', () => drawer.hide());

      // Prevent the drawer from closing when the user clicks on the overlay
      drawer.addEventListener('syn-request-close', event => {
        if (event.detail.source === 'overlay') {
          event.preventDefault();
        }
      });
    </script>`,
};

export const CustomizingInitialFocus: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('drawer', 'fokus'),
      },
    },
  },
  play: ({ canvasElement }) => {
    const drawer = canvasElement.querySelector('syn-drawer');
    if (drawer) {
      drawer.open = true;
    }
  },
  render: () => html`
    <syn-drawer label="Drawer" class="drawer-focus">
      <syn-input autofocus placeholder="I will have focus when the drawer is opened"></syn-input>
      <syn-button slot="footer" variant="filled">Close</syn-button>
    </syn-drawer>

    <syn-button>Open Drawer</syn-button>

    <script type="module">
      const drawer = document.querySelector('.drawer-focus');
      const input = drawer.querySelector('syn-input');
      const openButton = drawer.nextElementSibling;
      const closeButton = drawer.querySelector('syn-button[variant="filled"]');

      openButton.addEventListener('click', () => drawer.show());
      closeButton.addEventListener('click', () => drawer.hide());
    </script>
  `,
};
