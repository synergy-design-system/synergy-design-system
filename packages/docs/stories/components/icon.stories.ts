/* eslint-disable import/no-relative-packages */

import '../../../components/src/components/icon/icon';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { storybookDefaults, storybookHelpers, storybookTemplate } from '../../src/helpers/component.js';
import { registerIconLibrary } from '../../../components/src/utilities/icon-library.js';
import { defaultIcons } from '../../../assets/src/default-icons.js';

const { args, argTypes } = storybookDefaults('syn-icon');
const { overrideArgs } = storybookHelpers('syn-icon');
const { generateTemplate } = storybookTemplate('syn-icon');

const iconDocumentation = `
## Libraries
You can register additional icons to use with the <syn-icon> component through icon libraries.
Icon files can exist locally or on a CORS-enabled endpoint (e.g. a CDN).
There is no limit to how many icon libraries you can register and there is no cost associated with registering them, as individual icons are only requested when they're used.
The default icon library contains all of the icons by Synergy Design System, which are based on the [Material Icons](https://fonts.google.com/icons).

### How to use the Synergy Design System icons

The default base path of the icon library is set to __assets/icons/__.
To make the <syn-icon> work out of the box, without configuring anything, the used icons can be copied to this path in you application.
This can either be done manually or with the help of the bundler.

#### Angular + Webpack
Including assets from another library can be achieved in angular via configuring the assets configuration in the angular.json file.
For more information have a look at the [angular documentation](https://angular.io/guide/workspace-config#asset-config).

Here's an example that copies the Synergy icons to the path __assets/icons/__ of an angular project:

\`\`\`json
"assets": [
  {
    "glob": "**/*",
    "input": "./node_modules/@synergy-design-system/assets/src/icons",
    "output": "/assets/icons"
  }
],
\`\`\`


#### Vite
Including assets from another library in vite project can be achieved via using the [vite-plugin-static-copy plugin](https://www.npmjs.com/package/vite-plugin-static-copy). 
Here's an example with adapted vite.config.ts that copies the Synergy icons to the path __assets/icons/__ of a vite project:

  \`\`\`js
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/@synergy-design-system/assets/src/icons/*',
          dest: './assets/icons/',
        },
      ]
    }),
  ],
})
\`\`\`

### How to use a custom icon library
To register an additional icon library, use the \`registerIconLibrary()\` function that's exported from \`utilities/icon-library.js\`.
At a minimum, you must provide a name and a resolver function. The resolver function translates an icon name to a URL where the corresponding SVG file exists.
Refer to the examples below to better understand how it works.

If necessary, a mutator function can be used to mutate the SVG element before rendering. This is necessary for some libraries due to the many possible ways SVGs are crafted.
For example, icons should ideally inherit the current text color via currentColor, so you may need to apply fill="currentColor" or stroke="currentColor" to the SVG element using this function.

#### Custom icon library provided locally
Here's an example that registers an icon library located in the /assets/icons directory.

\`\`\`html
<script type="module">
  import { registerIconLibrary } from '@synergy-design-system/components';

  registerIconLibrary('my-icons', {
    resolver: name => \`/assets/icons/\${name}.svg\`,
    mutator: svg => svg.setAttribute('fill', 'currentColor')
  });
</script>
\`\`\`

To display an icon, set the library and name attributes of an syn-icon element.

\`\`\`html
<!-- This will show the icon located at /assets/icons/smile.svg -->
<syn-icon library="my-icons" name="smile"></syn-icon>
\`\`\`
`;

const meta: Meta = {
  component: 'icon',
  args: overrideArgs({ type: 'attribute', value: 'notifications', name: 'name' }, args),
  argTypes,
  parameters: {
    docs: {
      description: {
        // The documentation has to be added like this as template string and not as block comment above, because otherwise the example of the angular+webpack glob pattern would not work.
        // The "*/" of "glob": "**/*" would close the block comment.
        // It could be escaped by doing "glob": "**\/*" but then the users would see the backslash and also would copy it with the example.
        component: iconDocumentation,
      },
    },
  },
  title: 'Components/syn-icon',
};
export default meta;

type Story = StoryObj;

/**
 * This shows the syn-icon in its default state
 */
export const Default = {
  render: (args: any) => {
    return generateTemplate({ args });
  },
} as Story;


/**
 * Icons inherit their color from the current text color. Thus, you can set the color property on the <syn-icon> element or an ancestor to change the color.
 */
export const Colors: Story = {
  render: () => html`<div style="color: #4a90e2;">
  <syn-icon name="warning"></syn-icon>
  <syn-icon name="inventory"></syn-icon>
  <syn-icon name="battery_charging_full"></syn-icon>
  <syn-icon name="notifications"></syn-icon>
</div>
<div style="color: #9013fe;">
  <syn-icon name="schedule"></syn-icon>
  <syn-icon name="cloud"></syn-icon>
  <syn-icon name="download"></syn-icon>
  <syn-icon name="description"></syn-icon>
</div>
<div style="color: #417505;">
  <syn-icon name="flag"></syn-icon>
  <syn-icon name="favorite"></syn-icon>
  <syn-icon name="image"></syn-icon>
  <syn-icon name="bolt"></syn-icon>
</div>
<div style="color: #f5a623;">
  <syn-icon name="mic"></syn-icon>
  <syn-icon name="search"></syn-icon>
  <syn-icon name="star_border"></syn-icon>
  <syn-icon name="delete"></syn-icon>
</div>`,
};

/**
 * Icons are sized relative to the current font size. To change their size, set the font-size property on the icon itself or on a parent element as shown below.
 */
export const Sizing: Story = {
  render: () => html`<div style="font-size: 32px;">
  <syn-icon name="warning"></syn-icon>
  <syn-icon name="inventory"></syn-icon>
  <syn-icon name="battery_charging_full"></syn-icon>
  <syn-icon name="notifications"></syn-icon>
  <syn-icon name="schedule"></syn-icon>
  <syn-icon name="cloud"></syn-icon>
  <syn-icon name="download"></syn-icon>
  <syn-icon name="description"></syn-icon>
  <syn-icon name="flag"></syn-icon>
  <syn-icon name="favorite"></syn-icon>
  <syn-icon name="image"></syn-icon>
  <syn-icon name="bolt"></syn-icon>
  <syn-icon name="mic"></syn-icon>
  <syn-icon name="search"></syn-icon>
  <syn-icon name="star_border"></syn-icon>
  <syn-icon name="delete"></syn-icon>
</div>`,
};

/**
 * For non-decorative icons, use the label attribute to announce it to assistive devices.
 */
export const Labels: Story = {
  render: () => html`<syn-icon name="star" label="Add to favorites"></syn-icon>`,
};

/**
 * Custom icons can be loaded individually with the src attribute. Only SVGs on a local or CORS-enabled endpoint are supported.
 * If you're using more than one custom icon, it might make sense to register a custom icon library.
 */
export const CustomIcons: Story = {
  render: () => html`<syn-icon src="/logo-claim.svg" style="font-size: 10rem;"></syn-icon>`,
};

/**
 * Icon libraries, which are provided via CDN, can also be registered.
 *
 * The following example demonstrates how to register the open source icon library [Font Awesome](https://fontawesome.com/) using the jsDelivr CDN.
 * Icons in this library are licensed under the [Font Awesome Free License](https://github.com/FortAwesome/Font-Awesome/blob/master/LICENSE.txt).
 * Some of the icons that appear on the Font Awesome website require a license and are therefore not available in the CDN.
 *
 * This library has three variations: regular (far-*), solid (fas-*), and brands (fab-*). A mutator function is required to set the SVG’s fill to currentColor. 
 *
 * Feel free to adapt the code as you see fit to use your own origin or naming conventions.
 *
 * ```html
 * <script type="module">
 *   import { registerIconLibrary } from '@synergy-design-system/components';
 *
 *    registerIconLibrary('fa', {
 *      resolver: name => {
 *        const filename = name.replace(/^fa[rbs]-/, '');
 *        let folder = 'regular';
 *        if (name.substring(0, 4) === 'fas-') folder = 'solid';
 *        if (name.substring(0, 4) === 'fab-') folder = 'brands';
 *        return `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.1/svgs/${folder}/${filename}.svg`;
 *      },
 *      mutator: svg => svg.setAttribute('fill', 'currentColor')
 *    });
 *  </script>
 *
 *  <div>
 *    <syn-icon library="fa" name="far-bell"></syn-icon>
 *    <syn-icon library="fa" name="far-comment"></syn-icon>
 *    <syn-icon library="fa" name="far-hand-point-right"></syn-icon>
 *    <br />
 *    <syn-icon library="fa" name="fas-archive"></syn-icon>
 *    <syn-icon library="fa" name="fas-book"></syn-icon>
 *    <syn-icon library="fa" name="fas-chess-knight"></syn-icon>
 *    <br />
 *    <syn-icon library="fa" name="fab-apple"></syn-icon>
 *    <syn-icon library="fa" name="fab-chrome"></syn-icon>
 *    <syn-icon library="fa" name="fab-edge"></syn-icon>
 *  </div>
 * ```
 * If an icon is used before registration occurs, it will be empty initially but shown when registered.
 * Check out the example below or the [Shoelace Docs](https://shoelace.style/components/icon?id=icon-libraries)
 * to see how to handle this.
 */
export const CDNIconLibrary: Story = {
  render: () => {
    registerIconLibrary('fa', {
      resolver: name => {
        const filename = name.replace(/^fa[rbs]-/, '');
        let folder = 'regular';
        if (name.substring(0, 4) === 'fas-') folder = 'solid';
        if (name.substring(0, 4) === 'fab-') folder = 'brands';
        return `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.1/svgs/${folder}/${filename}.svg`;
      },
      mutator: svg => svg.setAttribute('fill', 'currentColor'),
    });
    return html`<div style="font-size: 24px;">
  <syn-icon library="fa" name="far-bell"></syn-icon>
  <syn-icon library="fa" name="far-comment"></syn-icon>
  <syn-icon library="fa" name="far-hand-point-right"></syn-icon>
  <br />
  <syn-icon library="fa" name="fas-archive"></syn-icon>
  <syn-icon library="fa" name="fas-book"></syn-icon>
  <syn-icon library="fa" name="fas-chess-knight"></syn-icon>
  <br />
  <syn-icon library="fa" name="fab-apple"></syn-icon>
  <syn-icon library="fa" name="fab-chrome"></syn-icon>
  <syn-icon library="fa" name="fab-edge"></syn-icon>
</div>`;
  },
};

/**
* The package [@synergy-design-system/assets](https://github.com/SickDesignSystem/synergy/tree/main/packages/assets) provides the possibility to get all default icons via a bundled file.
*
* > **Warning:** Please keep in mind that via this way of using icons **all** icons will be bundled into your application and it will create larger bundle sizes!
*
* ```html
* <script type="module">
* import { registerIconLibrary } from '@synergy-design-system/components';
* import { defaultIcons } from '@synergy-design-system/assets';
*
* registerIconLibrary('bundled-default', {
*   resolver: (name) => {
*     if (name in defaultIcons) {
*       const defaultName = name as keyof typeof defaultIcons;
*       return `data:image/svg+xml,${encodeURIComponent(defaultIcons[defaultName])}`;
*     }
*     return '';
*   },
*   mutator: svg => svg.setAttribute('fill', 'currentColor'),
* });
* </script>
*
* <div style="font-size: 24px;">
*   <syn-icon name="warning"></syn-icon>
*   <syn-icon name="inventory"></syn-icon>
*   <syn-icon name="battery_charging_full"></syn-icon>
*   <syn-icon name="notifications"></syn-icon>
* </div>
* ```
*/
export const BundledIconLibrary: Story = {
  render: () => {
    registerIconLibrary('bundled-default', {
      resolver: (name) => {
        if (name in defaultIcons) {
          const defaultName = name as keyof typeof defaultIcons;
          return `data:image/svg+xml,${encodeURIComponent(defaultIcons[defaultName])}`;
        }
        return '';
      },
      mutator: svg => svg.setAttribute('fill', 'currentColor'),
    });

    return html`<div style="font-size: 24px;">
  <syn-icon library="bundled-default" name="warning"></syn-icon>
  <syn-icon library="bundled-default" name="inventory"></syn-icon>
  <syn-icon library="bundled-default" name="battery_charging_full"></syn-icon>
  <syn-icon library="bundled-default" name="notifications"></syn-icon>
</div>`;
  },
};
