/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import '../../../components/src/components/side-nav/side-nav.js';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import {
  generateScreenshotStory,
  generateStoryDescription,
  storybookDefaults,
  storybookHelpers,
  storybookTemplate,
} from '../../src/helpers/component.js';
import { DisableFocusTrap } from '../../src/DisableFocusTrap.js';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-side-nav');
const { overrideArgs } = storybookHelpers('syn-side-nav');
const { generateTemplate } = storybookTemplate('syn-side-nav');

const meta: Meta = {
  args: overrideArgs([], defaultArgs),
  argTypes,
  component: 'syn-side-nav',
  parameters: {
    docs: {
      container: DisableFocusTrap,
      description: {
        component: generateStoryDescription('side-nav', 'default'),
      },
    },
  },
  title: 'Components/syn-side-nav',
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
      name: 'default',
      type: 'slot',
      value: `
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
      `,
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
  render: (args: unknown) => html`
  <syn-header>Side Navigation</syn-header>
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
  <syn-header class="header-rail">Side Navigation</syn-header>
  <main class="main-rail">
    <syn-side-nav class="side-nav-rail" rail>
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
    </syn-side-nav>
    <div class="content-rail">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.    
    </div>
  </main>
  <script type="module">
    const header = document.querySelector('.header-rail');
    const sideNav = document.querySelector('.side-nav-rail');
    header.connectSideNavigation(sideNav);
  </script>
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

export const Footer: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('side-nav', 'footer'),
      },
    },
  },
  render: () => html`
  <syn-header class="header-footer">Side Navigation</syn-header>
  <main class="main-footer">
    <syn-side-nav class="side-nav-footer" open>
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
    const header = document.querySelector('.header-footer');
    const sideNav = document.querySelector('.side-nav-footer');
    header.connectSideNavigation(sideNav);
  </script>
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
    <syn-header class="header-fixed">Side Navigation</syn-header>
    <main class="main-fixed">
      <syn-side-nav class="side-nav-fixed" open>
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
      </syn-side-nav>
      <div class="content-fixed">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
        At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.     
      </div>
    </main>
  </div>
  <script type="module">
    const header = document.querySelector('.header-fixed');
    const sideNav = document.querySelector('.side-nav-fixed');
    header.connectSideNavigation(sideNav);
  </script>
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
  <syn-header class="header-shrink">Side Navigation</syn-header>
   <main class="main-shrink">
    <syn-side-nav open class="side-nav-shrink" no-focus-trapping>
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
    </syn-side-nav>
    <div class="content-shrink">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   
    </div>
  </main>
  <script type="module">
    const header = document.querySelector('.header-shrink');
    const sideNav = document.querySelector('.side-nav-shrink');
    header.connectSideNavigation(sideNav);
  </script>
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
  <syn-header class="header-indentation">Side Navigation</syn-header>
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
    const header = document.querySelector('.header-indentation');
    const sideNav = document.querySelector('.side-nav-indentation');
    header.connectSideNavigation(sideNav);
  </script>
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
  Footer,
  Fixed,
  Shrink,
  Indentation,
}, 700);
/* eslint-enable sort-keys */
