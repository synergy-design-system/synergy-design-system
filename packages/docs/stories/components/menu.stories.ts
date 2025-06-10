/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-relative-packages */
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../../../components/src/components/menu/menu.js';
import '../../../components/src/components/menu-item/menu-item.js';
import '../../../components/src/components/dropdown/dropdown.js';
import '../../../components/src/components/button/button.js';
import '../../../components/src/components/divider/divider.js';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-menu');
const { overrideArgs } = storybookHelpers('syn-menu');
const { generateTemplate } = storybookTemplate('syn-menu');

const meta: Meta = {
  args: overrideArgs([
    {
      name: 'default',
      type: 'slot',
      value: `
        <syn-menu-item value="undo">Undo</syn-menu-item>
        <syn-menu-item value="redo">Redo</syn-menu-item>
        <syn-divider></syn-divider>
        <syn-menu-item value="cut">Cut</syn-menu-item>
        <syn-menu-item value="copy">Copy</syn-menu-item>
        <syn-menu-item value="paste">Paste</syn-menu-item>
        <syn-menu-item value="delete">Delete</syn-menu-item>
      `,
    },
  ], defaultArgs),
  argTypes,
  component: 'syn-menu',
  parameters: {
    design: generateFigmaPluginObject('11581-378368'),
    docs: {
      description: {
        component: generateStoryDescription('menu', 'default'),
      },
    },
  },
  title: 'Components/syn-menu',
};
export default meta;

type Story = StoryObj;

export const Default = {
  parameters: {
    controls: {
      disable: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('menu', 'default'),
      },
    },
  },
  render: (args: unknown) => html`
    <div style="width: 200px;">
      ${generateTemplate({ args })}
    </div>
  `,
} as Story;

export const InDropdowns: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('menu', 'dropdown'),
      },
      story: {
        height: '250px',
      },
    },
  },
  render: () => html`
    <div style="position: relative">
      <syn-dropdown ?open=${true} placement="bottom-start">
        <syn-button slot="trigger" caret>Edit</syn-button>
        <syn-menu style="width: 200px;">
          <syn-menu-item value="cut">Cut</syn-menu-item>
          <syn-menu-item value="copy">Copy</syn-menu-item>
          <syn-menu-item value="paste">Paste</syn-menu-item>
        </syn-menu>
      </syn-dropdown>
    </div>
  `,
};

export const Submenus: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('menu', 'submenu'),
      },
    },
  },
  render: () => html`
    <syn-menu style="max-width: 200px;">
      <syn-menu-item value="undo">Undo</syn-menu-item>
      <syn-menu-item value="redo">Redo</syn-menu-item>
      
      <syn-divider></syn-divider>
      
      <syn-menu-item value="cut">Cut</syn-menu-item>
      <syn-menu-item value="copy">Copy</syn-menu-item>
      <syn-menu-item value="paste">Paste</syn-menu-item>
      
      <syn-divider></syn-divider>
      
      <syn-menu-item>
        Find
        <syn-menu slot="submenu">
          <syn-menu-item value="find">Find…</syn-menu-item>
          <syn-menu-item value="find-previous">Find Next</syn-menu-item>
          <syn-menu-item value="find-next">Find Previous</syn-menu-item>
        </syn-menu>
      </syn-menu-item>
    </syn-menu>
  `,
};

// Dev story for #368: Test multiple variations of
// loading and checkbox states and the rerender of the menu
// export const Demo = {
//   render: () => html`
//     <syn-menu style="max-width: 200px;">
//       <syn-menu-item value="undo">Undo</syn-menu-item>
//       <syn-menu-item value="redo">Redo</syn-menu-item>

//       <syn-divider></syn-divider>

//       <syn-menu-item id="bla" value="cut">Cut</syn-menu-item>
//       <syn-menu-item value="copy">Copy</syn-menu-item>
//       <syn-menu-item  value="paste">Paste</syn-menu-item>

//       <syn-divider></syn-divider>

//       <syn-menu-item>
//         Find
//         <syn-menu slot="submenu">
//           <syn-menu-item value="find">Find…</syn-menu-item>
//           <syn-menu-item value="find-previous" id="bla2">Find Next</syn-menu-item>
//           <syn-menu-item value="find-next">Find Previous</syn-menu-item>
//         </syn-menu>
//       </syn-menu-item>
//     </syn-menu>

//     <syn-button
//       @click=${() => {
//         const elm = document.querySelector('#bla');
//         elm.loading = !elm.loading;
//       }}
//     >
//       Toggle loading for bla
//     </syn-button>
//     <syn-button
//       @click=${() => {
//         const elm = document.querySelector('#bla');
//         elm.type = elm.type === 'checkbox' ? 'default' : 'checkbox';
//       }}
//     >
//       Toggle checkbox for bla
//     </syn-button>
//     <syn-button
//       @click=${() => {
//         const elm = document.querySelector('#bla2');
//         elm.loading = !elm.loading;
//       }}
//     >
//       Toggle loading for sub item
//     </syn-button>
//   `,
// };

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  InDropdowns,
  Default,
  Submenus,
}, 400);
/* eslint-enable sort-keys */
