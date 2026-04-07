import React from 'react';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import {
  Description,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import { type SynSelectEvent } from '@synergy-design-system/components';
import { html, render } from 'lit';
import storyBookPreviewConfig from '../../.storybook/preview.js';
import { generateStoryDescription } from '../../src/helpers/component.js';
import { Chromatic_Modes_All } from '../../.storybook/modes.js';
import { getAvailableLocalizations } from '../../src/helpers/localization.js';
import '../../../components/src/components/prio-nav/prio-nav.js';
import '../../../components/src/components/card/card.js';
import '../../../components/src/components/dropdown/dropdown.js';
import '../../../components/src/components/file/file.js';
import '../../../components/src/components/header/header.js';
import '../../../components/src/components/icon-button/icon-button.js';
import '../../../components/src/components/menu/menu.js';
import '../../../components/src/components/menu-item/menu-item.js';
import '../../../components/src/components/tooltip/tooltip.js';

const meta: Meta = {
  parameters: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    chromatic: {
      ...storyBookPreviewConfig?.parameters?.chromatic,
      disableSnapshot: false,
      modes: Chromatic_Modes_All,
    },
    docs: {
      description: {
        component: generateStoryDescription('localization', 'default', 'templates'),
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
        height: '550px',
        inline: false,
      },
    },
  },
  tags: ['i18n', 'localization', 'translations'],
  title: 'Templates/Localization',
};
export default meta;

export const DynamicallySetLocalizations: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('localization', 'dynamicallySetLocalizations', 'templates'),
      },
    },
  },
  render: () => {
    const availableLocalizations = Object.values(getAvailableLocalizations());

    let state = {
      availableLocalizations,
      currentLocale: availableLocalizations.find(locale => locale.$code === 'de') || availableLocalizations[0],
    };

    // Action type definitions
    type Actions = {
      changeLanguage: (e: SynSelectEvent) => void;
    };

    // Pure view function that takes state and actions as parameters
    const renderView = (currentState: typeof state, actions: Actions) => html`
      <!-- .synergy-demo-application -->
      <div class="synergy-demo-application" id="appshell-side-navigation">
        <!-- header -->
        <syn-header label="Localization Demo" sticky>
          <!-- meta-navigation -->
          <nav slot="meta-navigation">
            <syn-dropdown>
              <div slot="trigger">
                <syn-tooltip content="Change language" placement="bottom">
                  <syn-icon-button
                    color="neutral"
                    name="language"
                    label="Choose language"
                  ></syn-icon-button>
                </syn-tooltip>
              </div>
              <syn-menu @syn-select=${actions.changeLanguage}>
                ${currentState.availableLocalizations.map(locale => html`
                  <syn-menu-item
                    ?checked=${currentState.currentLocale.$code === locale.$code}
                    type="checkbox"
                    value=${locale.$code}
                  >${locale.$name}</syn-menu-item>
                `)}
              </syn-menu>
            </syn-dropdown>
          </nav>
          <!-- /meta-navigation -->
        </syn-header>
        <!-- /header -->

        <!-- .synergy-demo-content -->
        <div class="synergy-demo-content">
          <main class="synergy-demo-main">
            <syn-card shadow>
              <h1 class="syn-heading--3x-large">
                Current selected language:
                ${currentState.currentLocale.$name}
              </h1>
              <p>
                The following example demonstrates the usage of the <code>syn-file</code> component with different language settings.
                The first two file inputs will adapt to the currently selected language, while the third one is fixed to English regardless of the selected language.
              </p>
              <p>
                Try changing the language using the dropdown in the header to see how the first two file inputs update their translations accordingly.
              </p>
              <div class="form">
                <syn-file droparea></syn-file>
                <syn-file droparea webkitdirectory></syn-file>
                <syn-file droparea lang="en"></syn-file>
              </div>
            </syn-card>
          </main>
          <!-- /.synergy-demo-main -->
        </div>
        <!-- /.synergy-demo-content -->
      </div>
      <!-- /.synergy-demo-application -->

      <style>
        body {
          margin: 0 !important;
          padding: 0 !important;
        }

        .synergy-demo-application {
          display: flex;
          flex-direction: column;
        }

        .synergy-demo-content {
          background: var(--syn-page-background-color-muted);
        }

        .synergy-demo-main {
          display: flex;
          flex-direction: column;
          font: var(--syn-body-medium);
          margin: var(--syn-spacing-medium);

          h1 {
            margin: 0 0 var(--syn-spacing-medium);
          }

          .form {
            display: flex;
            flex-direction: column;
            gap: var(--syn-spacing-medium);
          }
        }
      </style>
    `;

    // Create container
    const container = document.createElement('div');

    const createUpdateableView = () => {
      let currentActions: Actions;

      const rerender = () => {
        render(renderView(state, currentActions), container);
      };

      const updateState = (newState: Partial<typeof state>) => {
        state = { ...state, ...newState };
        rerender();
      };

      const actions: Actions = {
        changeLanguage: (e: SynSelectEvent) => {
          const { detail } = e;
          const { item } = detail;

          const selectedLocaleCode = item.getAttribute('value') || 'en';
          const currentLocale = state.availableLocalizations.find(
            locale => locale.$code === selectedLocaleCode,
          );

          document.documentElement.setAttribute('lang', selectedLocaleCode);
          updateState({ currentLocale });
        },
      };

      // Inject actions into the system
      currentActions = actions;

      // Initial render
      document.documentElement.setAttribute('lang', state.currentLocale.$code);
      rerender();

      return {
        actions,
        rerender,
      };
    };

    createUpdateableView();

    return container;
  },
};
