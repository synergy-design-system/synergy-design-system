import { replaceSections } from '../replace-section.js';

const FILES_TO_TRANSFORM = [
  'breadcrumb-item.component.ts',
  'breadcrumb-item.test.ts',
];

/**
 * Transform the component code
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => {
  /* eslint-disable @typescript-eslint/quotes */
  // This replace section add support for using dropdowns in breadrumb-item default slots
  // This may be removed completely when https://github.com/shoelace-style/shoelace/discussions/2011 is merged into shoelace
  const content = replaceSections([
    // Add support for query and state
    [
      `import { property } from 'lit/decorators.js';`,
      `import { property, query, state } from 'lit/decorators.js';
import { watch } from '../../internal/watch.js';`,
    ],
    // Add query and state decorators for rendering
    [
      `HasSlotController(this, 'prefix', 'suffix');`,
      `HasSlotController(this, 'prefix', 'suffix');

  @query('slot:not([name])') defaultSlot: HTMLSlotElement;

  @state() private renderType: 'button' | 'link' | 'drop-down' = 'button';`,
    ],
    // Add the slotchange listener
    [
      `'noreferrer noopener';`,
      `'noreferrer noopener';

  private setRenderType() {
    const hasDropdown =
      this.defaultSlot.assignedElements({ flatten: true }).filter(i => i.tagName.toLowerCase() === 'syn-dropdown')
        .length > 0;

    this.renderType = this.href ? 'link' : hasDropdown ? 'drop-down' : 'button';
  }

  @watch('href', { waitUntilFirstUpdate: true })
  hrefChanged() {
    this.setRenderType();
  }

  handleSlotChange() {
    this.setRenderType();
  }`,
    ],
    // Add slotchange to the default link and button slots
    [
      '<slot></slot>',
      // eslint-disable-next-line no-template-curly-in-string
      '<slot @slotchange=${this.handleSlotChange}></slot>',
    ],

    // Remove original "isLink" check
    [
      '    const isLink = this.href ? true : false;\n\n',
      '',
    ],

    // Use the renderType to determine the type of element to render for link
    [
      '${isLink',
      '${this.renderType === \'link\'',
    ],

    // Close renderType link
    [
      '</a>\n            `',
      '</a>\n            `\n          : \'\'}',
    ],

    // Handle renderType button
    [
      ': html`',
      '${this.renderType === \'button\' ? html`',
    ],
    [
      '</button>\n            `}',
      '</button>\n            ` : \'\'}',
    ],

    // Add support for new render type drop-down
    [
      `            \` : ''}`,
      `            \` : ''}

          \${this.renderType === 'drop-down'
            ? html\`
                <div part="label" class="breadcrumb-item__label breadcrumb-item__label--drop-down">
                  <slot @slotchange=\${this.handleSlotChange}></slot>
                </div>
              \`
            : ''}`,
    ],
  ], originalContent);
  /* eslint-enable @typescript-eslint/quotes */

  return {
    content,
    path,
  };
};

/**
 * Transform the components tests
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformTest = (path, originalContent) => {
  const content = replaceSections([
    // Adjust accessability tests to make sure they ignore the color contrast
    // Newer versions of the axe plugin need a direct variable in the closure and do NOT work
    // with the `el` reference, so make sure to use a dummy var.
    [
      'await expect(el).to.be.accessible();',
      'const x = await el; await expect(x).to.be.accessible({ ignoredRules: ["color-contrast"] });',
    ],
    // Add tests for the new renderType drop-down
    [
      'describe(\'when provided an element in the slot "prefix" to support prefix icons\', () => {',
      `describe('when rendering a syn-dropdown in the default slot', () => {
      it('should not render a link or button tag, but a div wrapper', async () => {
        el = await fixture<SynBreadcrumbItem>(html\`
          <syn-breadcrumb-item>
            <syn-dropdown>
              <syn-button slot="trigger" size="small" circle>
                <syn-icon label="More options" name="three-dots"></syn-icon>
              </syn-button>
              <syn-menu>
                <syn-menu-item type="checkbox" checked>Web Design</syn-menu-item>
                <syn-menu-item type="checkbox">Web Development</syn-menu-item>
                <syn-menu-item type="checkbox">Marketing</syn-menu-item>
              </syn-menu>
            </syn-dropdown>
          </syn-breadcrumb-item>
        \`);
  
        await expect(el).to.be.accessible();
        expect(el.shadowRoot!.querySelector('a')).to.be.null;
        expect(el.shadowRoot!.querySelector('button')).to.be.null;
        expect(el.shadowRoot!.querySelector('div.breadcrumb-item__label--drop-down')).not.to.be.null;
      });
    });

  describe('when provided an element in the slot "prefix" to support prefix icons', () => {`,
    ],
  ], originalContent);

  return {
    content,
    path,
  };
};

export const vendorBreadcrumbItem = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('breadcrumb-item.component.ts')) {
    return transformComponent(path, content);
  }

  if (path.endsWith('breadcrumb-item.test.ts')) {
    return transformTest(path, content);
  }

  return output;
};
