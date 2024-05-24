import React from 'react';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import {
  Description,
  Stories,
  Subtitle,
  Title,
} from '@storybook/blocks';
import { html } from 'lit';
import storyBookPreviewConfig from '../../.storybook/preview.js';
import { generateStoryDescription } from '../../src/helpers/component.js';
import { getTranslation } from '../../src/translations.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

/**
 * Create shared styles for all stories
 */
const createSharedStyles = () => html`
  <style>
    body {
      margin: 0 !important;
      padding: 0 !important;
    }

    #storybook-root,
    #root-inner {
      height: 100%;
    }

    .synergy-demo-application {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 550px;
    }

    .synergy-demo-content {
      background: var(--syn-color-neutral-100);
      display: flex;
      flex: 1 0 auto;
      flex-direction: column;
      height: 1%;
      position: relative;
    }

    .synergy-demo-content-inner {
      display: flex;
      flex: 1 0 auto;
      flex-direction: column;
    }

    .synergy-demo-main {
      align-items: center;
      border: 1px dashed #9747FF;
      border-radius: var(--syn-border-radius-medium);
      color: #9747FF;
      display: flex;
      flex: 1 0 auto;
      flex-direction: column;
      font: var(--syn-body-small-bold);
      justify-content: center;
      margin: var(--syn-spacing-2x-large) var(--syn-spacing-2x-large) 0;
    }

    .synergy-demo-main h1 {
      color: var(--syn-typography-color-text);
      font: var(--syn-heading-large);
      margin: 0;
    }

    .synergy-demo-footer > nav {
      align-items: center;
      display: flex;
      font: var(--syn-body-x-small-regular);
      gap: var(--syn-spacing-large);
      height: var(--syn-spacing-3x-large);
      justify-content: center;
    }

    .synergy-demo-footer :is(a, strong) {
      color: var(--syn-input-help-text-color);
    }

    .synergy-demo-footer a:hover {
      color: var(--syn-color-primary-600);
    }

    .synergy-demo-footer a:active {
      color: var(--syn-color-primary-700);
    }

    .synergy-demo-footer a:focus {
      outline: var(--syn-focus-ring);
      outline-offset: var(--syn-focus-ring-offset);
    }
  </style>
`;

/**
 * Create the defaut syn-prio-nav for all stories
 */
const createPrioNav = () => html`
  <!-- prio-nav -->
  <syn-prio-nav slot="navigation">
    <syn-nav-item current horizontal>${getTranslation('appShell.navigation.home')}</syn-nav-item>
    <syn-nav-item horizontal>${getTranslation('appShell.navigation.documents')}</syn-nav-item>
    <syn-nav-item horizontal>${getTranslation('appShell.navigation.applications')}</syn-nav-item>
    <syn-nav-item horizontal>${getTranslation('appShell.navigation.teams')}</syn-nav-item>
  </syn-prio-nav>
  <!-- /prio-nav -->
`;

/**
 * Create a header with optional prio-nav
 */
const createHeader = ({
  withMetaNavigation = false,
} = {}) => html`
  <!-- header -->
  <syn-header>
    ${getTranslation('appShell.appName')}
    
    ${withMetaNavigation ? createPrioNav() : ''}

    <!-- meta-navigation -->
    <nav slot="meta-navigation">
      <syn-dropdown>
        <syn-icon-button
          color="neutral"
          name="more_vert"
          label="More"
          slot="trigger"
        ></syn-icon-button>
        <syn-menu>
          <syn-menu-item>${getTranslation('appShell.metaNavigation.menuItem')}</syn-menu-item>
          <syn-menu-item>${getTranslation('appShell.metaNavigation.menuItem')}</syn-menu-item>
          <syn-menu-item>${getTranslation('appShell.metaNavigation.menuItem')}</syn-menu-item>
          <syn-menu-item>${getTranslation('appShell.metaNavigation.menuItem')}</syn-menu-item>
          <syn-menu-item>${getTranslation('appShell.metaNavigation.menuItem')}</syn-menu-item>
        </syn-menu>
      </syn-dropdown>
    </nav>
    <!-- /meta-navigation -->
  </syn-header>
  <!-- /header -->
`;

/**
 * Create a side navigation with an optional rail mode
 */
const createSideNav = ({
  noFocusTrapping = false,
  open = false,
  rail = false,
} = {}) => html`
  <!-- side-navigation -->
  <syn-side-nav
    ?no-focus-trapping=${noFocusTrapping}
    ?open=${open}
    ?rail=${rail}
  >
    <syn-nav-item current>
      <syn-icon name="home" slot="prefix"></syn-icon>
      ${getTranslation('appShell.navigation.start')}
    </syn-nav-item>
    <syn-nav-item divider>
      <syn-icon name="spoke" slot="prefix"></syn-icon>
      ${getTranslation('appShell.navigation.workspaces')}
    </syn-nav-item>
    <syn-nav-item divider>
      <syn-icon name="insert_drive_file" slot="prefix"></syn-icon>
      ${getTranslation('appShell.navigation.documents')}
    </syn-nav-item>
    <syn-nav-item divider>
      <syn-icon name="wb_cloudy" slot="prefix"></syn-icon>
      ${getTranslation('appShell.navigation.cloud')}
    </syn-nav-item>
    <syn-nav-item divider>
      <syn-icon name="volunteer_activism" slot="prefix"></syn-icon>
      ${getTranslation('appShell.navigation.feedback')}
    </syn-nav-item>

    <syn-nav-item slot="footer">
      <syn-icon name="settings" slot="prefix"></syn-icon>
      ${getTranslation('appShell.navigation.settings')}
    </syn-nav-item>
    <syn-nav-item slot="footer" divider>
      <syn-icon name="logout" slot="prefix"></syn-icon>
      ${getTranslation('appShell.navigation.logout')}
    </syn-nav-item>
  </syn-side-nav>
  <!-- /side-navigation -->
`;

/**
 * Create the shared main content area
 */
const createMainContent = () => html`
  <main class="synergy-demo-main">
    <h1>Start Page Content</h1>
    ${getTranslation('appShell.mainSlot')}
  </main>
`;

/**
 * Create the main shared footer
 */
const createFooter = () => html`
  <!-- footer -->
  <footer class="synergy-demo-footer">
    <nav>
      <a href="https://www.sick.com/de/en/impressum/w/imprint/" target="_blank">${getTranslation('appShell.footer.imprint')}</a>
      <a href="https://www.sick.com/de/en/nutzungsbedingungen/w/terms-of-use/" target="_blank">${getTranslation('appShell.footer.conditions')}</a>
      <a href="https://www.sick.com/de/en/w/terms-of-use" target="_blank">${getTranslation('appShell.footer.terms')}</a>
      <a href="https://www.sick.com/de/en/w/dataprotection" target="_blank">${getTranslation('appShell.footer.privacy')}</a>
      <strong>${getTranslation('appShell.footer.copyright')}</strong>
    </nav>
  </footer>
  <!-- /footer -->
`;

/**
 * Creates a connection from header to sidebar for the given id
 * @param {string} id ID of the stories main element
 */
const createSidebarConnector = (id: string) => html`
  <script type="module">
    // This is only done because in storybooks
    // doc overview multiple side-navs and headers exist.
    // Per default, the header will connect to the first side-nav automatically.
    const elm = document.getElementById('${id}');
    const header = elm.querySelector('syn-header');
    const sideNav = elm.querySelector('syn-side-nav');
    if (sideNav && header) {
      header.connectSideNavigation(sideNav);
    }
  </script>
`;

/**
 * Creates a demo event listener that "activates" the given link
 * and also updates the stories main content
 * @param {string} id ID of the stories main element
 */
const createDemoNavigation = (
  id: string,
  navElementType: 'syn-side-nav' | 'syn-prio-nav' = 'syn-side-nav',
) => html`
  <script type="module">
    // This emulates a click on the side-nav and updates the main content
    // This will usually be provided by the application itself, e.g. via
    // built in routing functions like angular-router, react-router or vue-router
    const elm = document.getElementById('${id}');
    const nav = elm.querySelector('${navElementType}');
    const mainContent = elm.querySelector('main');
    const headline = mainContent.querySelector('h1');

    // Hide the header in case we are using the top navigation
    if ('${navElementType}' === 'syn-prio-nav') {
      const header = elm.querySelector('syn-header');
      header.showBurgerMenu = false;
    }

    /**
     * This function will handle the click events on all syn-nav-items
     */
    const navItemClickEvent = (e) => {
      const target = e.target.closest('syn-nav-item');
      if (!target) {
        return;
      }
      
      // Update the main page headline to reflect the change
      const navItemText = target.innerText.trim();
      headline.innerText = navItemText + ' Page Content';

      // Update the current indicator
      nav.querySelectorAll('syn-nav-item').forEach(item => {
        item.removeAttribute('current');
        if (item === target) {
          item.setAttribute('current', '');
        }
      });      
    };

    // Add the listener to the given navigation
    nav.addEventListener('click', navItemClickEvent);
  </script>
`;

const meta: Meta = {
  parameters: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    chromatic: {
      ...storyBookPreviewConfig?.parameters?.chromatic,
      disableSnapshot: false,
    },
    design: generateFigmaPluginObject('8462-8334'),
    docs: {
      description: {
        component: generateStoryDescription('templates', 'application-shell'),
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Stories title="" />
        </>
      ),
      story: {
        iframeHeight: 550,
      },
    },
  },
  title: 'Templates/AppShell',
};
export default meta;

export const SideNavigation: Story = {
  render: () => html`
    <!-- .synergy-demo-application -->
    <div class="synergy-demo-application" id="appshell-side-navigation">
      ${createHeader()}
      
      <!-- .synergy-demo-content -->
      <div class="synergy-demo-content">
        ${createSideNav()}
        ${createMainContent()}
        ${createFooter()}
      </div>
      <!-- /.synergy-demo-content -->
    </div>
    <!-- /.synergy-demo-application -->
    ${createSharedStyles()}
    ${createSidebarConnector('appshell-side-navigation')}
    ${createDemoNavigation('appshell-side-navigation')}
  `,
};

export const SideNavigationShrinkingContent: Story = {
  render: () => html`
    <!-- .synergy-demo-application -->
    <div class="synergy-demo-application" id="appshell-shrink">
      ${createHeader()}
      
      <!-- .synergy-demo-content -->
      <div class="synergy-demo-content">
        ${createSideNav({ noFocusTrapping: true, open: true })}
        <div class="synergy-demo-content-inner">
          ${createMainContent()}
          ${createFooter()}
        </div>
      </div>
      <!-- /.synergy-demo-content -->

    </div>
    <!-- /.synergy-demo-application -->
    ${createSharedStyles()}
    <style>
      #appshell-shrink {
        /**
         * Set this variable to the wanted size of the side-nav
         * Make sure the value stays in sync, otherwise the parts my overlap
         */
        --appshell-shrink-nav-open-width: 25rem;

        syn-side-nav::part(overlay) {
          display: none;
        }

        .synergy-demo-content-inner {
          /**
           * Set the initial margin left. Needed because we
           * create the page with the side-bar open
           */
          margin-left: var(--appshell-shrink-nav-open-width);
        }

        /**
         * Show a transition effect for users that do not have reduced motion enabled
         */
        @media (prefers-reduced-motion: no-preference) {
          .synergy-demo-content-inner {
            transition: margin-left 250ms;
          }
        }
      }
    </style>
    ${createSidebarConnector('appshell-shrink')}
    ${createDemoNavigation('appshell-shrink')}

    <script type="module">
      // This script will make sure the margin of the content area
      // is adjusted when the side-bar is opened or closed.
      // Make sure to use the same value as in the css variable above
      const sideNav = document.getElementById('appshell-shrink').querySelector('syn-side-nav');
      const demoContent = document.getElementById('appshell-shrink').querySelector('.synergy-demo-content-inner');
      sideNav.addEventListener('syn-show', () => {
        demoContent.style.marginLeft = 'var(--appshell-shrink-nav-open-width)';
      });
      sideNav.addEventListener('syn-hide', () => {
        demoContent.style.marginLeft = '0px';
      });
    </script>
  `,
};

export const RailNavigationDesktop: Story = {
  name: 'Rail Navigation (Desktop)',
  parameters: {
  },
  render: () => html`
    <!-- .synergy-demo-application -->
    <div class="synergy-demo-application" id="appshell-rail-desktop">
      ${createHeader()}
      
      <!-- .synergy-demo-content -->
      <div class="synergy-demo-content">
        ${createSideNav({ rail: true })}
        <div class="synergy-demo-content-inner">
          ${createMainContent()}
          ${createFooter()}
        </div>
      </div>
      <!-- /.synergy-demo-content -->

    </div>
    <!-- /.synergy-demo-application -->
    ${createSharedStyles()}
    ${createSidebarConnector('appshell-rail-desktop')}
    ${createDemoNavigation('appshell-rail-desktop')}

    <style>
      #appshell-rail-desktop .synergy-demo-content {
        flex-direction: row;
      }

      #appshell-rail-desktop .synergy-demo-footer {
        container-type: inline-size;
      }

      @media(max-width: 420px) {
        #appshell-rail-desktop syn-side-nav {
          --side-nav-open-width: 306px;
        }
      }

      @container (max-width: 400px) {
        #appshell-rail-desktop .synergy-demo-footer a {
          display: none;
        }
      }
    </style>
  `,
};

export const RailNavigationMobile: Story = {
  ...RailNavigationDesktop,
  name: '↳ Tablet',
  parameters: {
    controls: {
      exclude: ['default'],
    },
    docs: {
      disable: true,
    },
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
};

export const TopNavigation: Story = {
  render: () => html`
    <!-- .synergy-demo-application -->
    <div class="synergy-demo-application" id="appshell-top-navigation">
      ${createHeader({ withMetaNavigation: true })}
      
      <!-- .synergy-demo-content -->
      <div class="synergy-demo-content">
        ${createMainContent()}
        ${createFooter()}
      </div>
      <!-- /.synergy-demo-content -->

    </div>
    <!-- /.synergy-demo-application -->
    ${createSharedStyles()}
    ${createDemoNavigation('appshell-top-navigation', 'syn-prio-nav')}
  `,
};

export const WhiteBackground: Story = {
  render: () => html`
    <!-- .synergy-demo-application -->
    <div class="synergy-demo-application" id="appshell-white-background">
      ${createHeader({ withMetaNavigation: true })}
      
      <!-- .synergy-demo-content -->
      <div class="synergy-demo-content">
        ${createMainContent()}
        ${createFooter()}
      </div>
      <!-- /.synergy-demo-content -->

    </div>
    <!-- /.synergy-demo-application -->
    ${createSharedStyles()}
    ${createDemoNavigation('appshell-white-background', 'syn-prio-nav')}
    <style>
      #appshell-white-background .synergy-demo-content {
        background: var(--syn-color-neutral-0);
      }
    </style>
  `,
};
