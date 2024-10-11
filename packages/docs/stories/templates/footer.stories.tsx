import React from 'react';
import type { Meta } from '@storybook/web-components';
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

const createFooter = () => html`
  <!-- footer -->
  <style>
          .synergy-footer-demo {
            container-type: inline-size;
          }

          .footer-content {
            align-items: center;
            display: flex;
            flex-direction: row;
            gap: var(--syn-spacing-x-large);
            justify-content: space-between;
            padding: var(--syn-spacing-large) var(--syn-spacing-2x-large);
          }

          .copyright {
            color: var(--syn-typography-color-text);
            font: var(--syn-body-small-bold);
            margin: 0;
          }

          .link-wrapper {
            display: flex;
            gap: var(--syn-spacing-large);
            justify-content: center;
            list-style: none;
            margin: 0;
            padding: 0;
          }

          @container (max-width: 768px) {
            .link-wrapper {
              flex-direction: column;
              gap: var(--syn-spacing-small);
            }

            .footer-content {
              align-items: flex-start;
              flex-direction: column;
              padding: var(--syn-spacing-large) var(--syn-spacing-medium);
            }
          }
      </style>
      <footer class="synergy-footer-demo">
        <div class="footer-content">
          <nav>
            <ul class="link-wrapper">
              <li>
                <a class="syn-link syn-link--medium syn-link--quiet" href="${getTranslation('footer.linksHref.imprint')}">${getTranslation('footer.linksName.imprint')}</a>
              </li>
              <li>
                <a class="syn-link syn-link--medium syn-link--quiet" href="${getTranslation('footer.linksHref.termsConditions')}">${getTranslation('footer.linksName.termsConditions')}</a>
              </li>
              <li>
                <a class="syn-link syn-link--medium syn-link--quiet" href="${getTranslation('footer.linksHref.termsOfUse')}">${getTranslation('footer.linksName.termsOfUse')}</a>
              </li>
              <li>
                <a class="syn-link syn-link--medium syn-link--quiet" href="${getTranslation('footer.linksHref.privacyPolicy')}">${getTranslation('footer.linksName.privacyPolicy')}</a>
              </li>
            </ul>
          </nav>
          <p class="copyright">&copy; 2024 SICK AG</p>
        </div>
      </footer>
  <!-- /footer -->
`;

const meta: Meta = {
  parameters: {
    design: generateFigmaPluginObject('25171-45729'),
    docs: {
      description: {
        component: generateStoryDescription('templates', 'footer'),
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
        inline: true,
      },
    },
  },
  title: 'Templates/Footer',
};
export default meta;

export const Footer = {
  parameters: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    chromatic: {
      ...storyBookPreviewConfig?.parameters?.chromatic,
      disableSnapshot: false,
    },
  },
  render: () => createFooter(),
};

export const FooterTablet = {
  ...Footer,
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


export const FooterWithinAppshell = {
  parameters: {
    chromatic: {
      ...storyBookPreviewConfig?.parameters?.chromatic,
      disableSnapshot: false,
    },
  },
  render: () => html`
<div class="synergy-demo-application" id="appshell-side-navigation">
  <!-- header -->
  <syn-header label="Synergy">
  </syn-header>
  <!-- /header -->

  <!-- .synergy-demo-content -->
  <div class="synergy-demo-content">
    <!-- side-navigation -->
    <syn-side-nav>
      <syn-nav-item current="">
        <syn-icon name="home" slot="prefix"></syn-icon>
        Start
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon name="spoke" slot="prefix"></syn-icon>
        Workspaces
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon name="insert_drive_file" slot="prefix"></syn-icon>
        Documents
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon name="wb_cloudy" slot="prefix"></syn-icon>
        Cloud
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon name="volunteer_activism" slot="prefix"></syn-icon>
        Feedback
      </syn-nav-item>

      <syn-nav-item slot="footer">
        <syn-icon name="settings" slot="prefix"></syn-icon>
        Settings
      </syn-nav-item>
      <syn-nav-item slot="footer" divider="">
        <syn-icon name="logout" slot="prefix"></syn-icon>
        Logout
      </syn-nav-item>
    </syn-side-nav>
    <!-- /side-navigation -->

    <main class="synergy-demo-main">
      <h1>Start Page Content</h1>
      Replace this slot
    </main>

    <!-- footer -->
   ${createFooter()}
    <!-- /footer -->
  </div>
  <!-- /.synergy-demo-content -->
</div>
<!-- /.synergy-demo-application -->

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
    container-type: inline-size;
  }

  .synergy-demo-content-inner {
    display: flex;
    flex: 1 1 auto;
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
    padding: 0 var(--syn-spacing-small);
  }

  .synergy-demo-main h1 {
    color: var(--syn-typography-color-text);
    font: var(--syn-heading-large);
    margin: 0;
    text-align: center;
  }

  @container (max-width: 768px) {
    .synergy-demo-main {
      margin: var(--syn-spacing-medium) var(--syn-spacing-medium) 0;
    }
  }
</style>

<script type="module">
  // This is only done because in storybooks
  // doc overview multiple side-navs and headers exist.
  // Per default, the header will connect to the first side-nav automatically.
  const elm = document.getElementById('appshell-side-navigation');
  const header = elm.querySelector('syn-header');
  const sideNav = elm.querySelector('syn-side-nav');
  if (sideNav && header) {
    header.connectSideNavigation(sideNav);
  }
</script>

<script type="module">
  // This emulates a click on the side-nav and updates the main content
  // This will usually be provided by the application itself, e.g. via
  // built in routing functions like angular-router, react-router or vue-router
  const elm = document.getElementById('appshell-side-navigation');
  const nav = elm.querySelector('syn-side-nav');
  const mainContent = elm.querySelector('main');
  const headline = mainContent.querySelector('h1');

  // Hide the header in case we are using the top navigation
  if ('syn-side-nav' === 'syn-prio-nav') {
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
  `,
};


export const FooterWithinAppshellTablet = {
  ...FooterWithinAppshell,
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
