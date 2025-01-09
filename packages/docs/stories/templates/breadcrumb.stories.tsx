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

const meta: Meta = {
  parameters: {
    design: generateFigmaPluginObject('23524-12912'),
    docs: {
      description: {
        component: generateStoryDescription('templates', 'breadcrumb'),
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
  title: 'Templates/Breadcrumb',
};
export default meta;

export const Breadcrumb = {
  parameters: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    chromatic: {
      ...storyBookPreviewConfig?.parameters?.chromatic,
      disableSnapshot: false,
    },
  },
  render: () => html`
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
 <style>
    /**
     * Styling for medium 
     **/
    .truncated syn-icon-button::part(base) {
      padding: 0;
    }
    .truncated syn-icon-button {
      vertical-align: middle;
    }

    @media (max-width: 768px) and (min-width: 480px) {
      /* Hide the two breadcrumbs, which should be shown in the drop down */
      syn-breadcrumb-item:nth-of-type(3),
      syn-breadcrumb-item:nth-of-type(4) {
        display: none;
      }
    }


    /**
     * Styling for large and small 
     **/
    @media (min-width: 768px), (max-width: 480px) {
      /* Hide the breadcrumb with drop down */
      .truncated {
        display: none;
      }
    }


    /**
     * Styling for large and medium 
     **/
    @media (min-width: 480px) {
      /* Hide the back icon for the medium and large size */
      .back-icon {
        display: none;
      }
    }


    /**
     * Styling for small 
     **/
    @media (max-width: 480px) {
      /* Hide the separator of the breadcrumb */
      syn-breadcrumb-item::part(separator){
        display: none;
      }

      /* Only show the previous page breadcrumb */
      syn-breadcrumb-item:not(:nth-last-of-type(2)) {
        display: none;
      }
    }
  </style>
  `,
};

export const BreadCrumbTablet = {
  ...Breadcrumb,
  name: '↳ Tablet',
  parameters: {
    controls: {
      exclude: ['default'],
    },
    docs: {
      disable: true,
    },
    viewport: {
      defaultViewport: 'pixel',
    },
  },
};

export const BreadCrumbMobile = {
  ...Breadcrumb,
  name: '↳ Mobile',
  parameters: {
    controls: {
      exclude: ['default'],
    },
    docs: {
      disable: true,
    },
    viewport: {
      defaultViewport: 'iphonexr',
    },
  },
};
