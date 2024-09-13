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
// import { generateStoryDescription } from '../../src/helpers/component.js';
import { getTranslation } from '../../src/translations.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

const meta: Meta = {
  parameters: {
    design: generateFigmaPluginObject('25171-45729'),
    docs: {
      description: {
        // TODO: add description as soon as docs tokens are available
        // component: generateStoryDescription('templates', 'footer'),
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
        // iframeHeight: 1600,
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
    </style>
    <footer class="synergy-footer-demo">
      <nav>
        <ul>
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
      <p>&copy; 2014 SpaceBears Inc</p>
    </footer>
  `,
};
// hreflang??
// footer --> role="contentinfo"
// nav --> role="navigation"
// nav with role="navigation"?
// aria-label on footer?

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
