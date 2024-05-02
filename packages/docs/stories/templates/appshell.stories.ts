import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { html } from 'lit';
import storyBookPreviewConfig from '../../.storybook/preview.js';
import { generateStoryDescription } from '../../src/helpers/component.js';
// import { getTranslation } from '../../src/translations.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

import '../../../components/src/components/header/header.js';
import '../../../components/src/components/prio-nav/prio-nav.js';
import '../../../components/src/components/side-nav/side-nav.js';
import '../../../components/src/components/nav-item/nav-item.js';
import '../../../components/src/components/icon/icon.js';

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
      min-height: 400px;
    }

    .synergy-demo-content {
      background: var(--syn-color-neutral-100);
      display: flex;
      flex: 1 0 auto;
      flex-direction: column;
      height: 1%;
      position: relative;
    }

    .synergy-demo-main {
      align-items: center;
      border: 1px dashed #9747FF;
      border-radius: var(--syn-border-radius-medium);
      display: flex;
      color: #9747FF;
      flex: 1 0 auto;
      font: var(--syn-body-small-bold);
      justify-content: center;
      margin: var(--syn-spacing-2x-large) var(--syn-spacing-2x-large) 0;
    }

    .synergy-demo-footer > nav {
      align-items: center;
      display: flex;
      height: var(--syn-spacing-3x-large);
      font: var(--syn-body-x-small-regular);
      gap: var(--syn-spacing-large);
      justify-content: center;
    }

    .synergy-demo-footer :is(a, strong) {
      color: var(--syn-input-help-text-color);
    }
  </style>
`;

const createSideNav = () => html`
  <syn-side-nav>
    <syn-nav-item>
      <syn-icon name="home" slot="prefix"></syn-icon>
      Start
    </syn-nav-item>
    <syn-nav-item>
      <syn-icon name="spoke" slot="prefix"></syn-icon>
      Workspaces
    </syn-nav-item>
    <syn-nav-item>
      <syn-icon name="insert_drive_file" slot="prefix"></syn-icon>
      Document
    </syn-nav-item>
    <syn-nav-item>
      <syn-icon name="wb_cloudy" slot="prefix"></syn-icon>
      Cloud
    </syn-nav-item>
    <syn-nav-item>
      <syn-icon name="volunteer_activism" slot="prefix"></syn-icon>
      Feedback
    </syn-nav-item>

    <syn-nav-item slot="footer">
      <syn-icon name="settings" slot="prefix"></syn-icon>
      Settings
    </syn-nav-item>
    <syn-nav-item slot="footer">
      <syn-icon name="logout" slot="prefix"></syn-icon>
      Logout
    </syn-nav-item>
  </syn-side-nav>
`;

const createMainContent = () => html`
  <main class="synergy-demo-main">
    Replace this slot
  </main>
`;

const createFooter = () => html`
  <footer class="synergy-demo-footer">
    <nav>
      <a href="#">Impressum</a>
      <a href="#">AGB</a>
      <a href="#">Nutzungsbedingungen</a>
      <a href="#">Datenschutzerklärung</a>
      <strong>© 2024 SICK AG</strong>
    </nav>
  </footer>
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
        component: generateStoryDescription('templates', 'default'),
      },
      xstory: {
        height: '400px',
      },
    },
  },
  title: 'Templates/AppShell',
};
export default meta;

export const SideNavigation: Story = {
  render: () => html`
    <!-- .synergy-demo-application -->
    <div class="synergy-demo-application">
      <syn-header>
        Synergy
      </syn-header>
      
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
  `,
};
