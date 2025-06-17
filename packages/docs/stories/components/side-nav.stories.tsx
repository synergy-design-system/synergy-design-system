/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import '../../../components/src/components/side-nav/side-nav.js';
import '../../../components/src/components/nav-item/nav-item.js';
import '../../../components/src/components/icon/icon.js';
import '../../../components/src/components/header/header.js';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { DisableFocusTrap } from '../../src/shared-components/DisableFocusTrap.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-side-nav');
const { overrideArgs } = storybookHelpers('syn-side-nav');
const { generateTemplate } = storybookTemplate('syn-side-nav');

const meta: Meta = {
  args: overrideArgs([], defaultArgs),
  argTypes,
  component: 'syn-side-nav',
  parameters: {
    design: generateFigmaPluginObject('12362-10883'),
    docs: {
      container: DisableFocusTrap,
      description: {
        component: generateStoryDescription('side-nav', 'default'),
      },
    },
  },
  tags: ['Application Shell'],
  title: 'Components/syn-side-nav',
};

export default meta;

type Story = StoryObj;

const createNavItems = () => html`
    <syn-nav-item current>
      <syn-icon name="wallpaper" slot="prefix"></syn-icon>
      Navigation Item
    </syn-nav-item>
    <syn-nav-item divider>
      <syn-icon name="wallpaper" slot="prefix"></syn-icon>
      Navigation Item
    </syn-nav-item>
    <syn-nav-item divider>
      <syn-icon name="wallpaper" slot="prefix"></syn-icon>
      Navigation Item
    </syn-nav-item>
    <syn-nav-item divider>
      <syn-icon name="wallpaper" slot="prefix"></syn-icon>
      Navigation Item
    </syn-nav-item>
    <syn-nav-item divider>
      <syn-icon name="wallpaper" slot="prefix"></syn-icon>
      Navigation Item
    </syn-nav-item>
`;

const createDummyActiveNavItemListener = (selector: string) => html`
  <script type="module">
    // This emulates a click on the side-nav and updates the main content
    // This will usually be provided by the application itself, e.g. via
    // built in routing functions like angular-router, react-router or vue-router
    Array.from(document.querySelectorAll('${selector}')).forEach((nav) => {
      nav.addEventListener('click', (e) => {
        const target = e.target.closest('syn-nav-item');

        if (!target) {
          return;
        }
        
        // Update the current indicator
        nav.querySelectorAll('syn-nav-item').forEach(item => {
          item.removeAttribute('current');
          if (item === target) {
            item.setAttribute('current', '');
          }
        });
      });
    });
  </script>
`;

export const Default: Story = {
  args: overrideArgs([
    {
      name: 'open',
      type: 'attribute',
      value: true,
    },
    {
      name: 'default',
      type: 'slot',
      value: createNavItems().strings.join('\n'),
    },
  ], defaultArgs),
  parameters: {
    controls: {
      disable: false,
    },
    docs: {
      description: {
        story: generateStoryDescription('side-nav', 'default'),
      },
    },
  },
  render: args => html`
    <syn-header label="Side Navigation"></syn-header>
    <main style="position: relative; height: 500px; background-color: var(--syn-color-neutral-200);" class="side-nav-default">
      ${generateTemplate({ args })}
    </main> 
    <script type="module">
      const mainContents = document.querySelectorAll('.side-nav-default');

      Array.from(mainContents).forEach((mainContent, index) => {
        const selector = 'story-loaded-'.concat(index);
        if(!mainContent.classList.contains(selector)) {
          const header = mainContent.previousElementSibling;
          const sideNav = mainContent.querySelector('syn-side-nav');
          header.connectSideNavigation(sideNav);
          mainContent.classList.add(selector);
        }
      });
    </script>
    ${createDummyActiveNavItemListener('.side-nav-default')}
  `,
};

export const Rail: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('side-nav', 'rail'),
      },
    },
  },
  render: () => html`
    <syn-header class="header-rail" label="Side Navigation"></syn-header>
    <main class="main-rail">
      <syn-side-nav class="side-nav-rail" variant="rail">
        ${createNavItems()}
      </syn-side-nav>
      <div class="content-rail">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
        At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.    
      </div>
    </main>
    <script type="module">
      // Only needed to have correct behavior in our documentation "Docs" page
      const header = document.querySelector('#storybook-docs .header-rail') || document.querySelector('.header-rail');
      const sideNav = document.querySelector('#storybook-docs .side-nav-rail') || document.querySelector('.side-nav-rail');
      if(sideNav && header){
        header.connectSideNavigation(sideNav);
      }
    </script>
    ${createDummyActiveNavItemListener('.side-nav-rail')}
    <style>
      .main-rail {
        position: relative;
        height: 500px;
        display: flex;
        overflow: hidden;
        background-color: var(--syn-color-neutral-200);
      }

      .content-rail {
        padding: var(--syn-spacing-large);
        margin: var(--syn-spacing-large);
        border-radius: var(--syn-border-radius-medium);
        background-color: var(--syn-color-neutral-0);
        overflow-y: auto;
      }
    </style>
  `,
};

export const Sticky: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('side-nav', 'sticky'),
      },
    },
  },
  render: () => html`
    <syn-header class="header-sticky" label="Side Navigation"></syn-header>
    <main class="main-sticky">
      <syn-side-nav class="side-nav-sticky" variant="sticky">
        ${createNavItems()}
      </syn-side-nav>
      <div class="content-sticky">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
        At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.    
      </div>
    </main>
    <script type="module">
      // Only needed to have correct behavior in our documentation "Docs" page
      const header = document.querySelector('#storybook-docs .header-sticky') || document.querySelector('.header-sticky');
      const sideNav = document.querySelector('#storybook-docs .side-nav-sticky') || document.querySelector('.side-nav-sticky');
      if(sideNav && header){
        header.connectSideNavigation(sideNav);
      }
    </script>
    ${createDummyActiveNavItemListener('.side-nav-sticky')}
    <style>
      .main-sticky {
        position: relative;
        height: 500px;
        display: flex;
        overflow: hidden;
        background-color: var(--syn-color-neutral-200);
      }

      .content-sticky {
        padding: var(--syn-spacing-large);
        margin: var(--syn-spacing-large);
        border-radius: var(--syn-border-radius-medium);
        background-color: var(--syn-color-neutral-0);
        overflow-y: auto;
      }
    </style>
  `,
};

export const Footer: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('side-nav', 'footer'),
      },
    },
  },
  render: () => html`
    <syn-header class="header-footer" label="Side Navigation"></syn-header>
    <main class="main-footer">
      <syn-side-nav class="side-nav-footer" open>
        ${createNavItems()}
        <syn-nav-item slot="footer">
          <syn-icon name="wallpaper" slot="prefix"></syn-icon>
          Footer Item
        </syn-nav-item>
        <syn-nav-item divider slot="footer">
          <syn-icon name="wallpaper" slot="prefix"></syn-icon>
          Footer Item
        </syn-nav-item>
      </syn-side-nav>
    </main>
    <script type="module">
      // Only needed to have correct behavior in our documentation "Docs" page
      const header = document.querySelector('#storybook-docs .header-footer') || document.querySelector('.header-footer');
      const sideNav = document.querySelector('#storybook-docs .side-nav-footer') || document.querySelector('.side-nav-footer');
      if(sideNav && header){
        header.connectSideNavigation(sideNav);
      }
    </script>
    ${createDummyActiveNavItemListener('.side-nav-footer')}
    <style>
      .main-footer {
        position: relative;
        height: 500px;
        background-color: var(--syn-color-neutral-200);
      }
    </style>
  `,
};

export const Fixed: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('side-nav', 'fixed'),
      },
    },
  },
  render: () => html`
    <div class="container-fixed">
      <syn-header class="header-fixed" label="Side Navigation"></syn-header>
      <main class="main-fixed">
        <syn-side-nav class="side-nav-fixed" open>
          ${createNavItems()}
        </syn-side-nav>
        <div class="content-fixed">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.     
        </div>
      </main>
    </div>
    <script type="module">
      // Only needed to have correct behavior in our documentation "Docs" page
      const header = document.querySelector('#storybook-docs .header-fixed') || document.querySelector('.header-fixed');
      const sideNav = document.querySelector('#storybook-docs .side-nav-fixed') || document.querySelector('.side-nav-fixed');
      if(sideNav && header){
        header.connectSideNavigation(sideNav);
      }
    </script>
    ${createDummyActiveNavItemListener('.side-nav-fixed')}
    <style>
      .container-fixed {
        display: flex;
        flex-direction: column;
      }

      .main-fixed {
        position: relative;
        height: 500px;
        background-color: var(--syn-color-neutral-200);
      }

      .content-fixed {
        padding: var(--syn-spacing-large);
        margin: var(--syn-spacing-large);
        border-radius: var(--syn-border-radius-medium);
        background-color: var(--syn-color-neutral-0);
      }
    </style>
  `,
};

export const Shrink: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('side-nav', 'shrinking'),
      },
    },
  },
  render: () => html`
    <syn-header class="header-shrink" label="Side Navigation"></syn-header>
    <main class="main-shrink">
      <syn-side-nav open class="side-nav-shrink" no-focus-trapping>
        ${createNavItems()}
      </syn-side-nav>
      <div class="content-shrink">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
        At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   
      </div>
    </main>
    <script type="module">
      // Only needed to have correct behavior in our documentation "Docs" page
      const header = document.querySelector('#storybook-docs .header-shrink') || document.querySelector('.header-shrink');
      const sideNav = document.querySelector('#storybook-docs .side-nav-shrink') || document.querySelector('.side-nav-shrink');
      if(sideNav && header){
        header.connectSideNavigation(sideNav);
      }
    </script>
    ${createDummyActiveNavItemListener('.side-nav-shrink')}
    <style>
      .main-shrink {
        position: relative;
        height: 500px;
        display: flex;
        overflow: hidden;
        background-color: var(--syn-color-neutral-200);
      }

      .side-nav-shrink::part(overlay) {
        display: none;
      }
      
      .content-shrink {
        padding: var(--syn-spacing-large);
        margin: var(--syn-spacing-large);
        border-radius: var(--syn-border-radius-medium);
        background-color: var(--syn-color-neutral-0);
        overflow-y: auto;
      }
    </style>
  `,
};

export const Indentation: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('side-nav', 'indentation'),
      },
    },
  },
  render: () => html`
    <syn-header class="header-indentation" label="Side Navigation"></syn-header>
    <main class="main-indentation">
      <syn-side-nav class="side-nav-indentation" open>
        <syn-nav-item open>
          <syn-icon name="wallpaper" slot="prefix"></syn-icon>
          Navigation Item
          <!-- second-level -->
          <syn-nav-item slot="children" open>
            <syn-icon name="wallpaper" slot="prefix"></syn-icon>
            Navigation Item
            <!-- third-level -->
            <syn-nav-item slot="children" current>
              <syn-icon name="wallpaper" slot="prefix"></syn-icon>
              Navigation Item
            </syn-nav-item>
            <!-- /third-level -->
          </syn-nav-item>
          <!-- /second-level -->
        </syn-nav-item>
        <syn-nav-item divider>
          <syn-icon name="wallpaper" slot="prefix"></syn-icon>
          Navigation Item
        </syn-nav-item>
        <syn-nav-item divider>
          <syn-icon name="wallpaper" slot="prefix"></syn-icon>
          Navigation Item
        </syn-nav-item>
      </syn-side-nav>
    </main>
    <script type="module">
      // Only needed to have correct behavior in our documentation "Docs" page
      const header = document.querySelector('#storybook-docs .header-indentation') || document.querySelector('.header-indentation');
      const sideNav = document.querySelector('#storybook-docs .side-nav-indentation') || document.querySelector('.side-nav-indentation');
      if(sideNav && header){
        header.connectSideNavigation(sideNav);
      }
    </script>
    ${createDummyActiveNavItemListener('.side-nav-indentation')}
    <style>
      .main-indentation {
        position: relative;
        height: 500px;
        background-color: var(--syn-color-neutral-200);
      }
    </style>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Rail,
  Sticky,
  Footer,
  Fixed,
  Shrink,
  Indentation,
}, 700);
/* eslint-enable sort-keys */
