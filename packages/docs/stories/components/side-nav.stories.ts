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
  render: (args: unknown) => generateTemplate({ args }),
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
  <main>
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
          <syn-nav-item divider vertical>
            <syn-icon name="area_chart" slot="prefix"></syn-icon>
            Itemsdf
              <nav slot="children">
                <syn-nav-item divider vertical>
                  <syn-icon name="area_chart" slot="prefix"></syn-icon>
                  Item 1.1
                </syn-nav-item>
                <syn-nav-item divider vertical>
                  <syn-icon name="area_chart" slot="prefix"></syn-icon>
                  Item 1.2
                </syn-nav-item>
                <syn-nav-item divider vertical current>
                  <syn-icon name="area_chart" slot="prefix"></syn-icon>
                  Items
                  
          </syn-nav-item>
        </nav>
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

          Other Option
        </syn-nav-item>
        <syn-nav-item divider vertical slot="footer">
        <syn-icon name="area_chart" slot="prefix"></syn-icon>

          Other Option
        </syn-nav-item>
      </nav>
    </syn-side-nav>
    <div>
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
  <syn-side-nav rail >
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
        <syn-nav-item divider vertical>
          <syn-icon name="area_chart" slot="prefix"></syn-icon>
          Itemsdf
            <nav slot="children">
              <syn-nav-item divider vertical>
                <syn-icon name="area_chart" slot="prefix"></syn-icon>
                Item 1.1
              </syn-nav-item>
              <syn-nav-item divider vertical>
                <syn-icon name="area_chart" slot="prefix"></syn-icon>
                Item 1.2
              </syn-nav-item>
              <syn-nav-item divider vertical current>
                <syn-icon name="area_chart" slot="prefix"></syn-icon>
                Items
                
        </syn-nav-item>
      </nav>
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

        Other Option
      </syn-nav-item>
      <syn-nav-item divider vertical slot="footer">
      <syn-icon name="area_chart" slot="prefix"></syn-icon>

        Other Option
      </syn-nav-item>
    </nav>
  </syn-side-nav>
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
  <button id="toggle">click</button>
  <main class="main">
    <syn-side-nav open class="shrink">
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
          <syn-nav-item divider vertical>
            <syn-icon name="area_chart" slot="prefix"></syn-icon>
            Itemsdf
              <nav slot="children">
                <syn-nav-item divider vertical>
                  <syn-icon name="area_chart" slot="prefix"></syn-icon>
                  Item 1.1
                </syn-nav-item>
                <syn-nav-item divider vertical>
                  <syn-icon name="area_chart" slot="prefix"></syn-icon>
                  Item 1.2
                </syn-nav-item>
                <syn-nav-item divider vertical current>
                  <syn-icon name="area_chart" slot="prefix"></syn-icon>
                  Items
                  
          </syn-nav-item>
        </nav>
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

          Other Option
        </syn-nav-item>
        <syn-nav-item divider vertical slot="footer">
        <syn-icon name="area_chart" slot="prefix"></syn-icon>

          Other Option
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
    const size = getComputedStyle(sideNav).getPropertyValue('--side-nav-size');
    const content = document.querySelector('.content');

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

    document.getElementById('toggle').addEventListener('click', () => {
      sideNav.open = !sideNav.open;
    });
  </script>
  <style>
    .main {
      position: relative;
    }

    .shrink::part(overlay) {
      display: none;
    }
    
    .content {
      padding: 0 var(--syn-spacing-large);
    }
  </style>
  `,
};

export const Methods: Story = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('nav-item', 'labels'),
      },
    },
  },
  render: () => html`
  <div style="position: relative; height:300px;">
  <syn-side-nav class="methods" open >
    <syn-nav-item vertical>
      <syn-icon name="home" slot="prefix"></syn-icon>
      Home
    </syn-nav-item>
    <syn-nav-item current divider vertical>
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
        <syn-nav-item divider vertical>
          <syn-icon name="area_chart" slot="prefix"></syn-icon>
          Itemsdf
          <nav slot="children">
        <syn-nav-item divider vertical>
          <syn-icon name="area_chart" slot="prefix"></syn-icon>
          Item 1.1
        </syn-nav-item>
        <syn-nav-item divider vertical>
          <syn-icon name="area_chart" slot="prefix"></syn-icon>
          Item 1.2
        </syn-nav-item>
        <syn-nav-item divider vertical>
          <syn-icon name="area_chart" slot="prefix"></syn-icon>
          Itemsdf
          <nav slot="children">
        <syn-nav-item divider vertical>
          <syn-icon name="area_chart" slot="prefix"></syn-icon>
          Item 1.1
        </syn-nav-item>
        <syn-nav-item divider vertical>
          <syn-icon name="area_chart" slot="prefix"></syn-icon>
          Item 1.2
        </syn-nav-item>
        <syn-nav-item divider vertical>
          <syn-icon name="area_chart" slot="prefix"></syn-icon>
          Itemsdf
          
        </syn-nav-item>
      </nav>
        </syn-nav-item>
      </nav>
        </syn-nav-item>
      </nav>
      <!-- /second-level -->
    </syn-nav-item>
    <syn-nav-item disabled divider vertical>
      <syn-icon name="area_chart" slot="prefix"></syn-icon>
      Disabled option
    </syn-nav-item>
    <syn-nav-item divider vertical>
      <!-- <span slot="prefix">sdf</span> -->
      <syn-icon name="area_chart" slot="prefix"></syn-icon>
      <syn-icon name="area_chart" slot="suffix"></syn-icon>

      Other Option
    </syn-nav-item>
    <nav slot="footer">
      <syn-nav-item vertical slot="footer">
      <syn-icon name="area_chart" slot="prefix"></syn-icon>

        Other Option
      </syn-nav-item>
      <syn-nav-item divider vertical slot="footer">
      <syn-icon name="area_chart" slot="prefix"></syn-icon>

        Other Option
      </syn-nav-item>
    </nav>
  </syn-side-nav>
</div>
  <button id="show">show</button>
  <button id="hide">hide</button>
  <script type="module">
    const sideNav = document.querySelector('.methods');
    sideNav.addEventListener('syn-show', () => console.log('syn-show'));
    sideNav.addEventListener('syn-hide', () => console.log('syn-hide'));
    sideNav.addEventListener('syn-after-show', () => console.log('syn-after-show'));
    sideNav.addEventListener('syn-after-hide', () => console.log('syn-after-hide'));
    document.getElementById('show').addEventListener('click', () => sideNav.show());
    document.getElementById('hide').addEventListener('click', () => sideNav.hide());
  </script>
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
  <syn-side-nav open>
  <syn-nav-item vertical>
        <syn-icon name="home" slot="prefix"></syn-icon>
        Home
      </syn-nav-item>
      <syn-nav-item current divider vertical>
        <syn-icon name="settings" slot="prefix"></syn-icon>
        Settings
      </syn-nav-item>
      <syn-nav-item divider vertical>
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
          <syn-nav-item divider vertical>
            <syn-icon name="area_chart" slot="prefix"></syn-icon>
            Itemsdf
            <nav slot="children">
          <syn-nav-item divider vertical>
            <syn-icon name="area_chart" slot="prefix"></syn-icon>
            Item 1.1
          </syn-nav-item>
          <syn-nav-item divider vertical>
            <syn-icon name="area_chart" slot="prefix"></syn-icon>
            Item 1.2
          </syn-nav-item>
          <syn-nav-item divider vertical>
            <syn-icon name="area_chart" slot="prefix"></syn-icon>
            Itemsdf
            <nav slot="children">
          <syn-nav-item divider vertical>
            <syn-icon name="area_chart" slot="prefix"></syn-icon>
            Item 1.1
          </syn-nav-item>
          <syn-nav-item divider vertical>
            <syn-icon name="area_chart" slot="prefix"></syn-icon>
            Item 1.2
          </syn-nav-item>
          <syn-nav-item divider vertical>
            <syn-icon name="area_chart" slot="prefix"></syn-icon>
            Itemsdf
            
          </syn-nav-item>
        </nav>
          </syn-nav-item>
        </nav>
          </syn-nav-item>
        </nav>
        <!-- /second-level -->
      </syn-nav-item>
      <syn-nav-item disabled divider vertical>
        <syn-icon name="area_chart" slot="prefix"></syn-icon>
        Disabled option
      </syn-nav-item>
      <syn-nav-item divider vertical>
        <!-- <span slot="prefix">sdf</span> -->
        <syn-icon name="area_chart" slot="prefix"></syn-icon>
        <syn-icon name="area_chart" slot="suffix"></syn-icon>

        Other Option
      </syn-nav-item>
      <syn-nav-item vertical slot="footer">
      <syn-icon name="area_chart" slot="prefix"></syn-icon>
        Other Option
      </syn-nav-item>
      <syn-nav-item divider vertical slot="footer">
      <syn-icon name="area_chart" slot="prefix"></syn-icon>
        Other Option
      </syn-nav-item>
  </syn-side-nav>
  `,
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Rail,
  Footer,
});
/* eslint-enable sort-keys */
