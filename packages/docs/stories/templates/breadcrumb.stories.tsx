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

      syn-header {
        margin-bottom: var(--syn-spacing-x-large);
      }

      .synergy-demo-application {
        display: flex;
        flex-direction: column;
      }

      .synergy-demo-application syn-breadcrumb {
        margin-left: var(--syn-spacing-large);
      }
  </style>
`;

const meta: Meta = {
  parameters: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    chromatic: {
      ...storyBookPreviewConfig?.parameters?.chromatic,
      disableSnapshot: false,
    },
    design: generateFigmaPluginObject('23524-12912'),
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
    },
  },
  title: 'Templates/Bread',
};
export default meta;

export const BreadcrumbResponsive = {
  render: () => html`
    <div id="responsive" class="synergy-demo-application">
      <syn-header label="Synergy"></syn-header>
      <syn-breadcrumb>
        <syn-breadcrumb-item>Home</syn-breadcrumb-item>
        <syn-breadcrumb-item class="truncated">
          <syn-dropdown>
            <syn-icon-button slot="trigger" size="small" label="More options" name="more_horiz">
            </syn-icon-button>
            <syn-menu>
              <syn-menu-item>Service and support</syn-menu-item>
              <syn-menu-item>Service category</syn-menu-item>
            </syn-menu>
          </syn-dropdown>
        </syn-breadcrumb-item>
        <syn-breadcrumb-item>Service and support</syn-breadcrumb-item>
        <syn-breadcrumb-item>Service category</syn-breadcrumb-item>
        <syn-breadcrumb-item>
          <syn-icon class="back-icon" name="arrow_back" slot="prefix"></syn-icon>
          Service
        </syn-breadcrumb-item>
        <syn-breadcrumb-item>Current service page</syn-breadcrumb-item>
      </syn-breadcrumb>
    </div>
    ${createSharedStyles()}
    <style>
      #responsive {
        container-type: inline-size;
      }

      /**
      * Styling for medium 
      **/
      #responsive .truncated syn-icon-button::part(base) {
        padding: 0;
      }
      #responsive .truncated syn-icon-button {
        vertical-align: middle;
      }

      @container (max-width: 640px) and (min-width: 480px) {
        /* Hide the two breadcrumbs, which should be shown in the drop down */
        #responsive syn-breadcrumb-item:nth-of-type(3),
        #responsive syn-breadcrumb-item:nth-of-type(4) {
          display: none;
        }
      }

      /**
      * Styling for large
      **/
      @container (min-width: 640px) {
        #responsive .truncated {
          display: none;
        }
      }

      /**
      * Styling for large and medium 
      **/
      @container (min-width: 480px) {
        /* Hide the back icon for the medium and large size */
        #responsive .back-icon {
          display: none;
        }
      }

      /**
      * Styling for small 
      **/
      @container (max-width: 480px) {
        /* Hide the separator of the breadcrumb */
        #responsive syn-breadcrumb-item::part(separator){
          display: none;
        }

        /* Only show the previous page breadcrumb */
        #responsive syn-breadcrumb-item:not(:nth-last-of-type(2)) {
          display: none;
        }
      }
    </style>
  `,
};

export const BreadCrumbTruncated = {
  render: () => html`
    <div id="truncated" class="synergy-demo-application">
      <syn-header label="Synergy"></syn-header>
      <syn-breadcrumb>
        <syn-breadcrumb-item>Home</syn-breadcrumb-item>
        <syn-breadcrumb-item class="truncated">
          <syn-dropdown>
            <syn-icon-button slot="trigger" size="small" label="More options" name="more_horiz">
              </syn-icon-button>
              <syn-menu>
                <syn-menu-item>Service and support</syn-menu-item>
                <syn-menu-item>Service category</syn-menu-item>
              </syn-menu>
            </syn-dropdown>
          </syn-breadcrumb-item>
          <syn-breadcrumb-item>
            Service
          </syn-breadcrumb-item>
          <syn-breadcrumb-item>Current service page</syn-breadcrumb-item>
        </syn-breadcrumb>
    </div>
    ${createSharedStyles()}
    <style>
      #truncated .truncated syn-icon-button::part(base) {
        padding: 0;
      }
      #truncated .truncated syn-icon-button {
        vertical-align: middle;
      }
    </style>
 `,
};

export const BreadcrumbShort = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => html`
    <div id="short" class="synergy-demo-application">
      <syn-header label="Synergy"></syn-header>
      <syn-breadcrumb >
        <syn-breadcrumb-item>Home</syn-breadcrumb-item>
        <syn-breadcrumb-item>Service and support</syn-breadcrumb-item>
        <syn-breadcrumb-item>Service category</syn-breadcrumb-item>
        <syn-breadcrumb-item>
          <syn-icon class="back-icon" name="arrow_back" slot="prefix"></syn-icon>
          Service
        </syn-breadcrumb-item>
        <syn-breadcrumb-item>Current service page</syn-breadcrumb-item>
      </syn-breadcrumb>
    </div>
    ${createSharedStyles()}
    <style>
      /* Hide the separator of the breadcrumb */
      #short syn-breadcrumb-item::part(separator){
        display: none;
      }

      /* Only show the previous page breadcrumb */
      #short syn-breadcrumb-item:not(:nth-last-of-type(2)) {
        display: none;
      }
    </style>
 `,
};
