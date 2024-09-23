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
  render: () => html`
    <style>
        .synergy-footer-demo {
          align-items: center;
          display: flex;
          gap: var(--syn-spacing-x-large);
          justify-content: space-between;
          padding: var(--syn-spacing-large) var(--syn-spacing-2x-large);
        }

        .synergy-footer-demo .copyright {
          color: var(--syn-typography-color-text);
          font: var(--syn-body-small-bold);
          margin: 0;
        }

        .synergy-footer-demo .link-wrapper {
          display: flex;
          gap: var(--syn-spacing-large);
          justify-content: center;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        /* TODO: may do something with container query. I tried it, but together with display: flex some strange things happened */
        @media only screen and (max-width: 640px) {
          .link-wrapper {
            flex-direction: column;
            gap: var(--syn-spacing-small);
          }

          .synergy-footer-demo {
            align-items: flex-start;
            flex-direction: column;
            padding: var(--syn-spacing-large) var(--syn-spacing-medium);
          }
        }

    </style>
    <footer class="synergy-footer-demo">
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
    </footer>
  `,
};

// TODO: I don't know why, but for some reason it does not switch the viewport to mobile2
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
