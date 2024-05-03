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

    syn-side-nav {
      --side-nav-open-width: 320px;
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
      font: var(--syn-body-small-bold);
      justify-content: center;
      margin: var(--syn-spacing-2x-large) var(--syn-spacing-2x-large) 0;
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
  </style>
`;

/**
 * Create the defaut syn-prio-nav for all stories
 */
const createPrioNav = () => html`
  <!-- prio-nav -->
  <syn-prio-nav slot="navigation">
    <syn-nav-item current>${getTranslation('appShell.navigation.home')}</syn-nav-item>
    <syn-nav-item>${getTranslation('appShell.navigation.documents')}</syn-nav-item>
    <syn-nav-item>${getTranslation('appShell.navigation.applications')}</syn-nav-item>
    <syn-nav-item>${getTranslation('appShell.navigation.teams')}</syn-nav-item>
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
  rail = false,
} = {}) => html`
  <!-- side-navigation -->
  <syn-side-nav no-focus-trapping .rail=${rail}>
    <syn-nav-item current>
      <syn-icon name="home" slot="prefix"></syn-icon>
      ${getTranslation('appShell.navigation.start')}
    </syn-nav-item>
    <syn-nav-item>
      <syn-icon name="spoke" slot="prefix"></syn-icon>
      ${getTranslation('appShell.navigation.workspaces')}
    </syn-nav-item>
    <syn-nav-item>
      <syn-icon name="insert_drive_file" slot="prefix"></syn-icon>
      ${getTranslation('appShell.navigation.documents')}
    </syn-nav-item>
    <syn-nav-item>
      <syn-icon name="wb_cloudy" slot="prefix"></syn-icon>
      ${getTranslation('appShell.navigation.cloud')}
    </syn-nav-item>
    <syn-nav-item>
      <syn-icon name="volunteer_activism" slot="prefix"></syn-icon>
      ${getTranslation('appShell.navigation.feedback')}
    </syn-nav-item>

    <syn-nav-item slot="footer">
      <syn-icon name="settings" slot="prefix"></syn-icon>
      ${getTranslation('appShell.navigation.settings')}
    </syn-nav-item>
    <syn-nav-item slot="footer">
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
      <a href="#">${getTranslation('appShell.footer.imprint')}</a>
      <a href="#">${getTranslation('appShell.footer.conditions')}</a>
      <a href="#">${getTranslation('appShell.footer.terms')}</a>
      <a href="#">${getTranslation('appShell.footer.privacy')}</a>
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
    const elm = document.getElementById('${id}');
    const header = elm.querySelector('syn-header');
    const sideNav = elm.querySelector('syn-side-nav');
    if (sideNav && header) {
      header.connectSideNavigation(sideNav);
    }
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
        inline: false,
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
  `,
};

export const SideNavigationShrinkingContent: Story = {
  render: () => html`
    <!-- .synergy-demo-application -->
    <div class="synergy-demo-application" id="appshell-shrink">
      ${createHeader()}
      
      <!-- .synergy-demo-content -->
      <div class="synergy-demo-content">
        ${createSideNav()}
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
      #appshell-shrink syn-side-nav::part(overlay) {
        display: none;
      }

      #appshell-shrink .synergy-demo-content {
        flex-direction: row;
      }
    </style>
    ${createSidebarConnector('appshell-shrink')}
  `,
};

export const RailNavigationOnMouseHover: Story = {
  name: 'Rail Navigation (On Mouse Hover)',
  render: () => html`
    <!-- .synergy-demo-application -->
    <div class="synergy-demo-application" id="appshell-rail-on-mouse-hover">
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
    <style>
      #appshell-rail-on-mouse-hover .synergy-demo-content {
        flex-direction: row;
      }
    </style>
    ${createSidebarConnector('appshell-rail-on-mouse-hover')}
  `,
};

export const TopNavigation: Story = {
  render: () => html`
    <!-- .synergy-demo-application -->
    <div class="synergy-demo-application">
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
    <style>
      #appshell-white-background .synergy-demo-content {
        background: var(--syn-color-neutral-0);
      }
    </style>
  `,
};
