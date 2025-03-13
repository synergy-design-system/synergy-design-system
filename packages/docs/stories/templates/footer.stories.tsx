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
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';
import {
  createDemoNavigation, createFooter, createHeader,
  createMainContent, createSharedStyles, createSideNav,
  createSidebarConnector,
} from '../../src/shared-components/appshell.js';

const meta: Meta = {
  parameters: {
    design: generateFigmaPluginObject('25171-45729'),
    docs: {
      description: {
        component: generateStoryDescription('footer', 'default', 'templates'),
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    chromatic: {
      ...storyBookPreviewConfig?.parameters?.chromatic,
      disableSnapshot: false,
    },
  },
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
    ${createDemoNavigation('appshell-side-navigation')}
    ${createSidebarConnector('appshell-side-navigation')}
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
