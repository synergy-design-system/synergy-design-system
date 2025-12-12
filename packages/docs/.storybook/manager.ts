import { addons } from 'storybook/manager-api';
import { light } from './synergy-theme.js';
import {
  defaultConfig,
  type TagBadgeParameters,
} from 'storybook-addon-tag-badges'

addons.setConfig({
  theme: light,
  tagBadges: [
    {
      tags: 'SICK2018',
      badge: {
        text: 'SICK 2018',
        style: {
          backgroundColor: '#007cc1',
          color: '#fff',
        },
        tooltip: 'This component is available for theme SICK 2018',
      },
      display: {
        sidebar: false,
        toolbar: true,
        mdx: true,
      },
    },
    {
      tags: 'SICK2025',
      badge: {
        text: 'SICK 2025',
        style: {
          backgroundColor: '#005AFF',
          color: '#fff',
        },
        tooltip: 'This component is available for theme SICK 2025',
      },
      display: {
        sidebar: false,
        toolbar: true,
        mdx: true,
      },
    },
    // Place the default config after your custom matchers.
    ...defaultConfig,
  ] satisfies TagBadgeParameters,
})

