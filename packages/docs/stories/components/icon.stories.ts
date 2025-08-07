/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import '../../../components/src/components/icon/icon.js';
import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import {
  generateScreenshotStory, storybookDefaults, storybookHelpers, storybookTemplate,
} from '../../src/helpers/component.js';
import { registerIconLibrary } from '../../../components/src/utilities/icon-library.js';
import { defaultIcons } from '../../../assets/src/default-icons.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';

// We use this type of include to have a valid markdown file
// that can be used by the MCP.
import iconDocs from '../../src/static/icon-usage.md?raw';

const { args: defaultArgs, argTypes } = storybookDefaults('syn-icon');
const { overrideArgs } = storybookHelpers('syn-icon');
const { generateTemplate } = storybookTemplate('syn-icon');

const iconDocumentation = `
${iconDocs}

---

`;

const meta: Meta = {
  args: overrideArgs({ name: 'name', type: 'attribute', value: 'wallpaper' }, defaultArgs),
  argTypes,
  component: 'syn-icon',
  parameters: {
    design: generateFigmaPluginObject('1616-1512'),
    docs: {
      description: {
        // The documentation has to be added like this as template string
        // and not as block comment above, because otherwise the example of the
        // angular+webpack glob pattern would not work.
        // The "*/" of "glob": "**/*" would close the block comment.
        // It could be escaped by doing "glob": "**\/*" but then the users would see the backslash
        // and also would copy it with the example.
        component: iconDocumentation,
      },
    },
  },
  tags: ['Icons'],
  title: 'Components/syn-icon',
};
export default meta;

type Story = StoryObj;

/**
 * This shows the syn-icon in its default state
 */
export const Default: Story = {
  parameters: {
    controls: {
      disable: false,
    },
  },
  render: args => generateTemplate({ args }),
};

/**
 * Icons inherit their color from the current text color.
 * Thus, you can set the color property on the <syn-icon> element or an ancestor to change color.
 */
export const Colors: Story = {
  render: () => html`<div style="color: var(--syn-color-primary-600);">
  <syn-icon name="warning"></syn-icon>
  <syn-icon name="inventory"></syn-icon>
  <syn-icon name="battery_charging_full"></syn-icon>
  <syn-icon name="notifications"></syn-icon>
</div>
<div style="color: var(--syn-color-neutral-800);">
  <syn-icon name="schedule"></syn-icon>
  <syn-icon name="cloud"></syn-icon>
  <syn-icon name="download"></syn-icon>
  <syn-icon name="description"></syn-icon>
</div>
<div style="color: var(--syn-color-error-700);">
  <syn-icon name="mic"></syn-icon>
  <syn-icon name="search"></syn-icon>
  <syn-icon name="star_border"></syn-icon>
  <syn-icon name="delete"></syn-icon>
</div>`,
};

/**
 * Icons are sized relative to the current font size.
 * To change their size, set the font-size property on the icon itself
 * or on a parent element as shown below.
 */
export const Sizing: Story = {
  render: () => html`<div style="font-size: var(--syn-font-size-2x-large);">
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
 * Custom icons can be loaded individually with the src attribute.
 * Only SVGs on a local or CORS-enabled endpoint are supported.
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
 * Some of the icons that appear on the Font Awesome website require a license
 * and are therefore not available in the CDN.
 *
 * This library has three variations: regular (far-*), solid (fas-*), and brands (fab-*).
 * A mutator function is required to set the SVG’s fill to currentColor.
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
 * If an icon is used before registration occurs, it will be empty initially,
 * but shown when registered.
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
    return html`<div style="font-size: var(--syn-font-size-x-large);">
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
* The package [@synergy-design-system/assets](https://github.com/synergy-design-system/synergy-design-system/tree/main/packages/assets) provides the possibility to get all default icons via a bundled file.
*
* > **Warning:** Please keep in mind that via this way of using icons **all** icons
* will be bundled into your application and it will create larger bundle sizes!
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
* <div style="font-size: var(--syn-font-size-x-large);">
*   <syn-icon library="bundled-default" name="warning"></syn-icon>
*   <syn-icon library="bundled-default" name="inventory"></syn-icon>
*   <syn-icon library="bundled-default" name="battery_charging_full"></syn-icon>
*   <syn-icon library="bundled-default" name="notifications"></syn-icon>
* </div>
* ```
*/
export const BundledIconLibrary: Story = {
  render: () => {
    registerIconLibrary('bundled-default', {
      mutator: svg => svg.setAttribute('fill', 'currentColor'),
      resolver: (name) => {
        if (name in defaultIcons) {
          const defaultName = name as keyof typeof defaultIcons;
          return `data:image/svg+xml,${encodeURIComponent(defaultIcons[defaultName])}`;
        }
        return '';
      },
    });

    return html`<div style="font-size: var(--syn-font-size-x-large);">
  <syn-icon library="bundled-default" name="warning"></syn-icon>
  <syn-icon library="bundled-default" name="inventory"></syn-icon>
  <syn-icon library="bundled-default" name="battery_charging_full"></syn-icon>
  <syn-icon library="bundled-default" name="notifications"></syn-icon>
</div>`;
  },
};

/**
* To improve performance you can use a SVG sprites to avoid multiple trips for each SVG.
* The browser will load the sprite sheet once and
* then you reference the particular SVG within the sprite sheet using hash selector.
*
* As always, make sure to benchmark these changes. When using HTTP/2, it may in fact be more
* bandwidth-friendly to use multiple small requests instead of 1 large sprite sheet.
*
* > **Warning:** When using sprite sheets, the syn-load and syn-error events will not fire.
*
* > **Warning:** For security reasons, browsers may apply the same-origin policy on <use> elements
* located in the <syn-icon> shadow DOM and may refuse to load a cross-origin URL.
* There is currently no defined way to set a cross-origin policy for <use> elements.
* For this reason, sprite sheets should only be used if you’re self-hosting them.
*
* ```html
* <script type="module">
* import { registerIconLibrary } from '@synergy-design-system/components';
*
* registerIconLibrary('sprite', {
*     resolver: name => `/assets/images/sprite.svg#${name}`,
*     mutator: svg => svg.setAttribute('fill', 'currentColor'),
*     spriteSheet: true,
* });
* </script>
*
* <div style="font-size: var(--syn-font-size-x-large);">
*   <syn-icon library="sprite" name="settings"></syn-icon>
*   <syn-icon library="sprite" name="refresh"></syn-icon>
* </div>
* ```
*/
export const SpriteSheetUsage: Story = {
  render: () => {
    registerIconLibrary('sprite', {
      mutator: svg => svg.setAttribute('fill', 'currentColor'),
      resolver: name => `/sprite.svg#${name}`,
      spriteSheet: true,
    });

    return html`<div style="font-size: var(--syn-font-size-x-large);">
  <syn-icon library="sprite" name="settings"></syn-icon>
  <syn-icon library="sprite" name="refresh"></syn-icon>
</div>`;
  },
};

/* eslint-disable sort-keys */
export const Screenshot: Story = generateScreenshotStory({
  Default,
  Colors,
  Sizing,
  Labels,
  CustomIcons,
  CDNIconLibrary,
  BundledIconLibrary,
  SpriteSheetUsage,
});
/* eslint-enable sort-keys */
