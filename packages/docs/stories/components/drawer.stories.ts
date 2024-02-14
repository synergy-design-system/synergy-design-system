/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import '../../../components/src/components/drawer/drawer';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import {
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-drawer');
const { overrideArgs } = storybookHelpers('syn-drawer');
const { generateTemplate } = storybookTemplate('syn-drawer');

const meta: Meta = {
  args: defaultArgs,
  argTypes,
  component: 'syn-drawer',
  parameters: {
    docs: {
      description: {
        component: generateStoryDescription('drawer', 'default'),
      },
    },
  },
  title: 'Components/syn-drawer',
};
export default meta;

type Story = StoryObj;

export const Default = {
  args: overrideArgs({ name: 'open', type: 'attribute', value: true }, defaultArgs),
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('drawer', 'default'),
      },
    },
  },
  render: (args) => generateTemplate({ args }),
} as Story;

/**
 * By default, drawers slide in from the end.
 * To make the drawer slide in from the start, set the placement attribute to start.
 */
export const SlideInFromStart: Story = {
  render: () => html`<syn-drawer label="Drawer" placement="start" class="drawer-placement-start">
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
</script>`,
};

/**
 * By default, drawers slide in from the end.
 * To make the drawer slide in from the start, set the placement attribute to start.
 * @todo: Remove when ready with base design!
 */
export const BuilderDemo: Story = {
  render: () => html`<syn-drawer open label="Drawer" placement="end" class="drawer-placement-start">
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
</script>`,
};


/**
 * To make the drawer slide in from the top, set the placement attribute to top.
 */
export const SlideInFromTop: Story = {
  render: () => html`<syn-drawer label="Drawer" placement="top" class="drawer-placement-top">
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
</script>`,
};

/**
 * To make the drawer slide in from the bottom, set the placement attribute to bottom.
 */
export const SlideInFromBottom: Story = {
  render: () => html`<syn-drawer label="Drawer" placement="bottom" class="drawer-placement-bottom">
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
</script>`,
};

/**
 * By default, drawers slide out of their , which is usually the viewport.
 * To make a drawer slide out of a parent element,
 * add the contained attribute to the drawer and apply position: relative to its parent.
 * Unlike normal drawers, contained drawers are not modal.
 * This means they do not show an overlay, they do not trap focus,
 * and they are not dismissible with [[Escape]].
 * This is intentional to allow users to interact with elements outside of the drawer.
 */
export const ContainedToAnElement: Story = {
  render: () => html`<div
  style="position: relative; border: solid 2px var(--syn-panel-border-color); height: 300px; padding: 1rem; margin-bottom: 1rem;"
>
  The drawer will be contained to this box. This content won't shift or be affected in any way when the drawer opens.

  <syn-drawer label="Drawer" contained class="drawer-contained" style="--size: 50%;">
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
</script>`,
};

/**
 * Use the --size custom property to set the drawer's size.
 * This will be applied to the drawer's width or height depending on its placement.
 */
export const CustomSize: Story = {
  render: () => html`<syn-drawer label="Drawer" class="drawer-custom-size" style="--size: 50vw;">
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
</script>`,
};

/**
 * By design, a drawer's height will never exceed 100% of its container.
 * As such, drawers will not scroll with the page
 * to ensure the header and footer are always accessible to the user.
 */
export const Scrolling: Story = {
  render: () => html`<syn-drawer label="Drawer" class="drawer-scrolling">
  <div style="height: 150vh; border: dashed 2px var(--syn-color-neutral-200); padding: 0 1rem;">
    <p>Scroll down and give it a try! 👇</p>
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
</script>`,
};

/**
 * The header shows a functional close button by default.
 * You can use the header-actions slot to add additional  if needed.
 */
export const HeaderActions: Story = {
  render: () => html`<syn-drawer label="Drawer" class="drawer-header-actions">
  <syn-icon-button class="new-window" slot="header-actions" name="box-arrow-up-right"></syn-icon-button>
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
</script>`,
};

/**
 * By default, drawers will close when the user clicks the close button,
 * clicks the overlay, or presses the [[Escape]] key.
 * In most cases, the default behavior is the best behavior in terms of UX.
 * However, there are situations where this may be undesirable, such as when data loss will occur.
 * To keep the drawer open in such cases, you can cancel the syn-request-close event.
 * When canceled, the drawer will remain open and pulse briefly to draw the user's attention to it.
 * You can use event.detail.source to determine what triggered the request to close.
 * This example prevents the drawer from closing when the overlay is clicked,
 * but allows the close button or [[Escape]] to dismiss it.
 */
export const PreventingTheDrawerFromClosing: Story = {
  render: () => html`<syn-drawer label="Drawer" class="drawer-deny-close">
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

/**
 * By default, the drawer's panel will gain focus when opened.
 * This allows a subsequent tab press to focus on the first tabbable element in the drawer.
 * If you want a different element to have focus, add the autofocus attribute to it as shown below.
 */
export const CustomizingInitialFocus: Story = {
  render: () => html`<syn-drawer label="Drawer" class="drawer-focus">
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
</script>`,
};
