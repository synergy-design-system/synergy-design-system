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

const { args: defaultArgs, argTypes } = storybookDefaults('syn-side-nav');
const { overrideArgs } = storybookHelpers('syn-side-nav');
const { generateTemplate } = storybookTemplate('syn-side-nav');

const meta: Meta = {
  args: overrideArgs([
  ], defaultArgs),
  argTypes,
  component: 'syn-side-nav',
  parameters: {
    docs: {
      description: {
        component: generateStoryDescription('nav-item', 'default'),
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
      <syn-nav-item vertical>
        <syn-icon name="home" slot="prefix"></syn-icon>
        Home
      </syn-nav-item>
      <syn-nav-item divider vertical>
        <syn-icon name="settings" slot="prefix"></syn-icon>
        Settings
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
        story: generateStoryDescription('nav-item', 'default'),
      },
    },
  },
  render: (args: unknown) => html`
  <syn-button class="side-nav-default-story-opener">Toggle Side-Nav</syn-button>
  <main style="position: relative; height: 500px;" class="side-nav-default">
    ${generateTemplate({ args })}
  </main> 
  <script type="module">
    const openButton = document.querySelector('.side-nav-default-story-opener');
    const sideNav = document.querySelector('.side-nav-default > syn-side-nav');
    
    openButton.addEventListener('click', () => {
      sideNav.open = !sideNav.open;
    });
  </script>
`,
};

export const Fixed: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('nav-item', 'labels'),
      },
    },
  },
  render: () => html`
  <syn-button class="toggle">Toggle Side-Nav</syn-button>
  <main class="main">
    <syn-side-nav open>
      <syn-nav-item vertical>
        <syn-icon name="home" slot="prefix"></syn-icon>
        Home
      </syn-nav-item>
      <syn-nav-item divider vertical>
        <syn-icon name="settings" slot="prefix"></syn-icon>
        Settings
      </syn-nav-item>
      <syn-nav-item divider vertical open>
        <syn-icon name="area_chart" slot="suffix"></syn-icon>
        <syn-icon name="add_alarm" slot="prefix"></syn-icon>
        Children
        <!-- second-level -->
        <nav slot="children">
          <syn-nav-item divider vertical current>
            <syn-icon name="area_chart" slot="prefix"></syn-icon>
            Item 1.1
          </syn-nav-item>
          <syn-nav-item divider vertical>
            <syn-icon name="area_chart" slot="prefix"></syn-icon>
            Item 1.2
          </syn-nav-item>
        </nav>
        <!-- /second-level -->
      </syn-nav-item>
      <syn-nav-item disabled divider vertical>
        <syn-icon name="area_chart" slot="prefix"></syn-icon>
        Disabled option
      </syn-nav-item>
      <syn-nav-item divider vertical>
        <syn-icon name="area_chart" slot="prefix"></syn-icon>
        <syn-icon name="area_chart" slot="suffix"></syn-icon>
        Other Option
      </syn-nav-item>
      <nav slot="footer">
        <syn-nav-item vertical slot="footer">
          <syn-icon name="area_chart" slot="prefix"></syn-icon>
          Footer Option
        </syn-nav-item>
        <syn-nav-item divider vertical slot="footer">
          <syn-icon name="area_chart" slot="prefix"></syn-icon>
          Footer Option 2
        </syn-nav-item>
      </nav>
    </syn-side-nav>
    <div class="content">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   
      Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan
      et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,      
    </div>
  </main>
  <script type="module">
    const sideNav = document.querySelector('syn-side-nav');
    const toggleButton = document.querySelector('syn-button');
    toggleButton.addEventListener('click', () => sideNav.open = !sideNav.open);
  </script>
  <style>
    .main{
      position: relative;
      height: 500px;
    }
  </style>
  `,
};

export const Rail: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('nav-item', 'labels'),
      },
    },
  },
  render: () => html`
  <main class="main">
    <syn-side-nav rail>
      <syn-nav-item vertical>
        <syn-icon name="home" slot="prefix"></syn-icon>
        Home
      </syn-nav-item>
      <syn-nav-item divider vertical>
        <syn-icon name="settings" slot="prefix"></syn-icon>
        Settings
      </syn-nav-item>
      <syn-nav-item divider vertical open>
        <syn-icon name="area_chart" slot="suffix"></syn-icon>
        <syn-icon name="add_alarm" slot="prefix"></syn-icon>
        Children
        <!-- second-level -->
        <nav slot="children">
          <syn-nav-item divider vertical>
            <syn-icon name="area_chart" slot="prefix" current></syn-icon>
            Item 1.1
          </syn-nav-item>
          <syn-nav-item divider vertical>
            <syn-icon name="area_chart" slot="prefix"></syn-icon>
            Item 1.2
          </syn-nav-item>
        </nav>
        <!-- /second-level -->
      </syn-nav-item>
      <syn-nav-item disabled divider vertical>
        <syn-icon name="area_chart" slot="prefix"></syn-icon>
        Disabled option
      </syn-nav-item>
      <syn-nav-item divider vertical>
        <syn-icon name="area_chart" slot="prefix"></syn-icon>
        <syn-icon name="area_chart" slot="suffix"></syn-icon>
        Other Option
      </syn-nav-item>
      <nav slot="footer">
        <syn-nav-item vertical slot="footer">
          <syn-icon name="area_chart" slot="prefix"></syn-icon>
          Footer Option
        </syn-nav-item>
        <syn-nav-item divider vertical slot="footer">
          <syn-icon name="area_chart" slot="prefix"></syn-icon>
          Footer Option 2
        </syn-nav-item>
      </nav>
    </syn-side-nav>
    <div class="content">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   
      Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan
      et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,      
    </div>
  </main>
  <style>
    .main{
      position: relative;
      height: 500px;
    }
  </style>
  `,
};

export const Shrink: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('nav-item', 'labels'),
      },
    },
  },
  render: () => html`
  <syn-button class="toggle">Toggle Side-Nav</syn-button>
   <main class="main">
    <syn-side-nav open class="shrink" no-focus-trapping>
      <syn-nav-item vertical>
        <syn-icon name="home" slot="prefix"></syn-icon>
        Home
      </syn-nav-item>
      <syn-nav-item divider vertical>
        <syn-icon name="settings" slot="prefix"></syn-icon>
        Settings
      </syn-nav-item>
      <syn-nav-item divider vertical open>
        <syn-icon name="area_chart" slot="suffix"></syn-icon>
        <syn-icon name="add_alarm" slot="prefix"></syn-icon>
        Children
        <!-- second-level -->
        <nav slot="children">
          <syn-nav-item divider vertical current>
            <syn-icon name="area_chart" slot="prefix"></syn-icon>
            Item 1.1
          </syn-nav-item>
          <syn-nav-item divider vertical>
            <syn-icon name="area_chart" slot="prefix"></syn-icon>
            Item 1.2
          </syn-nav-item>
        </nav>
        <!-- /second-level -->
      </syn-nav-item>
      <syn-nav-item disabled divider vertical>
        <syn-icon name="area_chart" slot="prefix"></syn-icon>
        Disabled option
      </syn-nav-item>
      <syn-nav-item divider vertical>
        <syn-icon name="area_chart" slot="prefix"></syn-icon>
        <syn-icon name="area_chart" slot="suffix"></syn-icon>
        Other Option
      </syn-nav-item>
      <nav slot="footer">
        <syn-nav-item vertical slot="footer">
          <syn-icon name="area_chart" slot="prefix"></syn-icon>
          Footer Option
        </syn-nav-item>
        <syn-nav-item divider vertical slot="footer">
          <syn-icon name="area_chart" slot="prefix"></syn-icon>
          Footer Option 2
        </syn-nav-item>
      </nav>
    </syn-side-nav>
    <div class="content">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   
      Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan
      et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,    
    </div>
  </main>
  <script type="module">
    const sideNav = document.querySelector('.shrink');
    const size = getComputedStyle(sideNav).getPropertyValue('--side-nav-width');
    const content = document.querySelector('.content');
    const toggleButton = document.querySelector('syn-button');

    toggleButton.addEventListener('click', () => sideNav.open = !sideNav.open);

    // Initial shrinking if side-nav is open
    if(sideNav.open) {
      content.style.marginLeft = size;
    }

    // Start animation
    sideNav.addEventListener('syn-show', () => {
      content.animate([{marginLeft: 0}, {marginLeft: size}], { duration: 250,  });
    });

    // Fix left margin after animation end
    sideNav.addEventListener('syn-after-show', () => {
      content.style.marginLeft = size;
    });

    // Start animation
    sideNav.addEventListener('syn-hide', () => {
      content.animate([{marginLeft: size}, {marginLeft: 0}], { duration: 250});
    });

    // Fix left margin after animation end
    sideNav.addEventListener('syn-after-hide', () => {
      content.style.marginLeft = 0;
    });
  </script>
  <style>
    .main {
      position: relative;
      height: 500px;
    }

    .shrink::part(overlay) {
      display: none;
    }
    
    .content {
      padding: 0 var(--syn-spacing-large);
      overflow: auto;
      height: 100%;
    }
  </style>
  `,
};

export const Footer: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('nav-item', 'labels'),
      },
    },
  },
  render: () => html`
  <syn-button class="toggle">Toggle Side-Nav</syn-button>
  <main class="main">
    <syn-side-nav open>
      <syn-nav-item vertical>
        <syn-icon name="home" slot="prefix"></syn-icon>
        Home
      </syn-nav-item>
      <syn-nav-item divider vertical>
        <syn-icon name="settings" slot="prefix"></syn-icon>
        Settings
      </syn-nav-item>
      <syn-nav-item divider vertical open>
        <syn-icon name="area_chart" slot="suffix"></syn-icon>
        <syn-icon name="add_alarm" slot="prefix"></syn-icon>
        Children
        <!-- second-level -->
        <nav slot="children">
          <syn-nav-item divider vertical>
            <syn-icon name="area_chart" slot="prefix"></syn-icon>
            Item 1.1
          </syn-nav-item>
          <syn-nav-item divider vertical>
            <syn-icon name="area_chart" slot="prefix"></syn-icon>
            Item 1.2
          </syn-nav-item>
        </nav>
        <!-- /second-level -->
      </syn-nav-item>
      <syn-nav-item disabled divider vertical>
        <syn-icon name="area_chart" slot="prefix"></syn-icon>
        Disabled option
      </syn-nav-item>
      <syn-nav-item divider vertical>
        <syn-icon name="area_chart" slot="prefix"></syn-icon>
        <syn-icon name="area_chart" slot="suffix"></syn-icon>
        Other Option
      </syn-nav-item>
      <nav slot="footer">
        <syn-nav-item vertical slot="footer">
          <syn-icon name="area_chart" slot="prefix"></syn-icon>
          Footer Option
        </syn-nav-item>
        <syn-nav-item divider vertical slot="footer">
          <syn-icon name="area_chart" slot="prefix"></syn-icon>
          Footer Option 2
        </syn-nav-item>
      </nav>
    </syn-side-nav>
    <div class="content">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   
      Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan
      et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,      
    </div>
  </main>
  <script type="module">
    const sideNav = document.querySelector('syn-side-nav');
    const toggleButton = document.querySelector('syn-button');
    toggleButton.addEventListener('click', () => sideNav.open = !sideNav.open);
  </script>
  <style>
    .main{
      position: relative;
      height: 500px;
    }
  </style>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  // Rail,
  // Footer,
});
/* eslint-enable sort-keys */
