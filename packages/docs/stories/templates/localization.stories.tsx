import React from 'react';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import {
  Description,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import { html } from 'lit';
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
        height: '500px',
        inline: false,
      },
    },
  },
  tags: ['i18n', 'localization', 'translations'],
  title: 'Templates/Localization',
};
export default meta;

const availableLocalizations = Object.values(getAvailableLocalizations());
const defaultLocale = availableLocalizations.find(locale => locale.$code === 'de') || availableLocalizations[0];
const localizedValues = availableLocalizations.map(locale => ({
  code: locale.$code,
  dir: locale.$dir,
  name: locale.$name,
}));

export const DynamicallySetLocalizations: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: generateStoryDescription('localization', 'dynamicallySetLocalizations', 'templates'),
      },
    },
    synergy: {
      customImports: availableLocalizations
        .filter(locale => locale.$code === 'en' || locale.$code === 'de') // @todo: Remove this filter once all translations are available, currently we only have English and German translations ready.
        .map(locale => `https://esm.sh/@synergy-design-system/components@latest/dist/translations/${locale.$code}.js`),
    },
  },
  render: () => html`
    <!-- .synergy-demo-application -->
    <div id="localization-demo-story" class="synergy-demo-application">
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
            <syn-menu>
              ${availableLocalizations.map(locale => html`
                <syn-menu-item
                  ?checked=${defaultLocale.$code === locale.$code}
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
              <span data-current-language>${defaultLocale.$name}</span>
            </h1>
            <p>
              The following example demonstrates the usage of the <code>&lt;syn-file&gt;</code> component with different language settings.
              The first item will adapt to the currently selected language, while the second one uses a fixed <code>lang="en"</code> attribute, making it fixed to English regardless of the selected language.
            </p>
            <p>
              Try changing the language using the dropdown in the header to see how the first file input updates its translations accordingly.
            </p>
            <div class="form">
              <syn-file droparea></syn-file>
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
          flex-direction: row;
          gap: var(--syn-spacing-medium);
          
          syn-file {
            flex-basis: calc(50% - var(--syn-spacing-medium) / 2);
          }
        }
      }
    </style>

    <script type="module">
    const localizations = ${JSON.stringify(localizedValues, null, 2)};
    const root = document.querySelector('#localization-demo-story');
    const menu = root?.querySelector('#localization-demo-story syn-menu');
    const languageLabel = root?.querySelector('[data-current-language]');

    if (menu && languageLabel) {
      const applyLocale = localeCode => {
        const locale = localizations.find(({ code }) => code === localeCode);
        if (!locale) {
          return;
        }

        document.documentElement.setAttribute('lang', locale.code);
        document.documentElement.setAttribute('dir', locale.dir);
        languageLabel.textContent = locale.name;

        menu
          .querySelectorAll('syn-menu-item')
          .forEach(item => {
            item.toggleAttribute('checked', item.getAttribute('value') === locale.code);
          });
      };

      applyLocale('${defaultLocale.$code}');

      menu.addEventListener('syn-select', event => {
        const selectedLocaleCode = event.detail?.item?.getAttribute('value') || '${defaultLocale.$code}';
        applyLocale(selectedLocaleCode);
      });
    }
    </script>
    `,
};
