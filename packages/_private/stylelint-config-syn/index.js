import { getBaseline } from '@synergy-design-system/browser-baseline';

const browsers = getBaseline('v3_0_0');

export default {
  extends: './.stylelintrc.json',
  rules: {
    'plugin/no-unsupported-browser-features': [
      true,
      {
        browsers,
        ignore: [
          'css-font-rendering-controls',
          'css-sticky',
          'css-overflow',
          'css-focus-visible',
          'css-logical-props',
          'flexbox-gap',
          'css3-cursors',
          'css-display-contents',
        ],
        severity: 'warning',
      },
    ],
  },
};
