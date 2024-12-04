/* eslint-disable no-template-curly-in-string */
import { removeSections } from '../remove-section.js';
import {
  addSectionBefore,
  addSectionsAfter, replaceSection, replaceSections,
} from '../replace-section.js';

const FILES_TO_TRANSFORM = [
  'tab-group.component.ts',
  'tab-group.styles.ts',
  'tab-group.test.ts',
];

/**
 * Transform the component code
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => {
  let content = replaceSections([
    // We use a default icon of "chevron-right" and rotate it depending on localization direction
    [
      "name=${isRtl ? 'chevron-right' : 'chevron-left'}",
      'name="chevron-right"',
    ],
    [
      "name=${isRtl ? 'chevron-left' : 'chevron-right'}",
      'name="chevron-right"',
    ],

    // we don`t want the 'bottom' placement, therefore we remove it
    [
      "['top', 'bottom']",
      "['top']",
    ],
    [
      "@property() placement: 'top' | 'bottom' | 'start' | 'end' = 'top';",
      "@property() placement: 'top' | 'start' | 'end' = 'top';",
    ],
    [
      "@property() placement: 'top' | 'bottom' | 'start' | 'end' = 'top';",
      "@property() placement: 'top' | 'start' | 'end' = 'top';",
    ],

    // adapt indicator styling for 'sharp' and 'contained' tabs
    [
      'this.indicator.style.width = `${width}px`;',
      "this.indicator.style.width = `calc(${width}px - ${ (this.contained || this.sharp) ? '2 * var(--syn-spacing-large)' : '0px' })`;",
    ],
    [
      'this.indicator.style.translate = isRtl ? `${-1 * offset.left}px` : `${offset.left}px`;',
      "this.indicator.style.translate = `calc(${isRtl ? '-' : ''}1 * (${offset.left}px + ${ (this.contained || this.sharp) ? 'var(--syn-spacing-large)' : '0px' }))`;",
    ],
    [
      'this.indicator.style.height = `${height}px`;',
      "this.indicator.style.height = `calc(${height}px - ${ (this.contained || this.sharp) ? '2 * var(--syn-spacing-small)' : '0px' })`;",
    ],
    [
      'this.indicator.style.translate = `0 ${offset.top}px`;',
      "this.indicator.style.translate = `0 calc(${offset.top}px + ${ (this.contained || this.sharp) ? 'var(--syn-spacing-small)' : '0px' })`;",
    ],
  ], originalContent);

  content = removeSections([
    // isRtl check is no longer needed, as it is used nowhere
    [
      'render() {',
      "const isRtl = this.localize.dir() === 'rtl';", { preserveStart: true, removePrecedingWhitespace: false },
    ],

    // remove 'bottom' placement
    [
      "case 'bottom'",
      ':',
    ],
    [
      "'tab-group--bottom': this.placement === 'bottom'",
      ',',
    ],
  ], content);

  content = addSectionsAfter([
    // Add 'contained' and 'sharp' property
    [
      "@property({ attribute: 'no-scroll-controls', type: Boolean }) noScrollControls = false;",
    `/** Draws the tab group as a contained element. */
  @property({ type: Boolean }) contained = false;
  
  /** Draws the tab group with edges instead of roundings. Takes only effect if used with the 'contained' property */
  @property({ type: Boolean }) sharp = false;`,
    { newlinesBeforeInsertion: 2, tabsBeforeInsertion: 1 },
    ],

    // Add 'contained' and 'sharp' classes
    [
      "'tab-group--has-scroll-controls': this.hasScrollControls",
      `,
          'tab-group--contained': this.contained,
          'tab-group--sharp': this.sharp,`,
      { newlinesBeforeInsertion: 0 },
    ],

    // Add a new css variable '--indicator-width' to the component
    [
      '* @cssproperty --indicator-color - The color of the active tab indicator.',
      ' * @cssproperty --indicator-width - The width of the active tab indicator.',
    ],

    // Improve documentation of syn-tab-show event
    [
      '@event {{ name: String }} syn-tab-show - Emitted when a tab is shown.',
      ' The payload of the event returns the "panel" attribute of the shown tab.',
      { newlinesBeforeInsertion: 0 },
    ],

    // Improve documentation of syn-tab-hide event
    [
      '@event {{ name: String }} syn-tab-hide - Emitted when a tab is hidden.',
      ' The payload of the event returns the "panel" attribute of the hidden tab.',
      { newlinesBeforeInsertion: 0 },
    ],

    // Fix active tab is not settable with active property
    [
      `if (mutations.some(m => m.attributeName === 'disabled')) {
        this.syncTabsAndPanels();`,
        `      // sync tabs when active state changed programmatically
      } else if(mutations.some(m => m.attributeName === 'active')){
        const tabs = mutations.filter(m => m.attributeName === 'active' && (m.target as HTMLElement).tagName.toLowerCase() === 'syn-tab').map(m => m.target as SynTab);  
        const newActiveTab = tabs.find(tab => tab.active);

        if(newActiveTab){
          this.setActiveTab(newActiveTab);
        }`,
    ],
  ], content);

  return {
    content,
    path,
  };
};

const transformStyles = (path, originalContent) => {
  const content = removeSections([
    // Remove 'bottom' placement styling
    [
      '* Bottom',
      '* Start',
      { preserveEnd: true, removePrecedingWhitespace: false },
    ],
  ], originalContent);

  return {
    content,
    path,
  };
};

const transformTests = (path, originalContent) => {
  let content = removeSections([
    // Remove 'bottom' placement test
    [
      "it('shows the header below the tabs by setting placement to bottom'",
      '});',
    ],

  ], originalContent);

  // Add +1 to navigation position, as we augmented the navigation into the body for 1px
  // to avoid the hiding of the focus styling and of the white hiding border
  content = replaceSection([
    'expect(clientRectangles.body?.top).to.be.greaterThanOrEqual(clientRectangles.navigation?.bottom || -Infinity);',
    'expect(clientRectangles.body?.top).to.be.greaterThanOrEqual((clientRectangles.navigation?.bottom! - 1) || -Infinity);',
  ], content);

  content = addSectionBefore(
    content,
    "it('does not change if the active tab is reselected'",
`it('selects a tab by changing it via active property', async () => {
      const tabGroup = await fixture<SynTabGroup>(html\`
        <syn-tab-group>
          <syn-tab slot="nav" panel="general" data-testid="general-header">General</syn-tab>
          <syn-tab slot="nav" panel="custom" data-testid="custom-header">Custom</syn-tab>
          <syn-tab-panel name="general">This is the general tab panel.</syn-tab-panel>
          <syn-tab-panel name="custom" data-testid="custom-tab-content">This is the custom tab panel.</syn-tab-panel>
        </syn-tab-group>
      \`);

      const customHeader = queryByTestId<SynTab>(tabGroup, 'custom-header')!;
      const generalHeader = await waitForHeaderToBeActive(tabGroup, 'general-header');
      generalHeader.focus();

      expect(customHeader).not.to.have.attribute('active');

      const showEventPromise = oneEvent(tabGroup, 'syn-tab-show') as Promise<SynTabShowEvent>;
      customHeader.active = true;

      await tabGroup.updateComplete;
      expect(customHeader).to.have.attribute('active');
      await expectPromiseToHaveName(showEventPromise, 'custom');
      return expectOnlyOneTabPanelToBeActive(tabGroup, 'custom-tab-content');
    });`,
{
  newlinesAfterInsertion: 2,
  tabsAfterInsertion: 2,
},
  );

  return {
    content,
    path,
  };
};

export const vendorTabGroup = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('tab-group.component.ts')) {
    return transformComponent(path, content);
  }

  if (path.endsWith('tab-group.styles.ts')) {
    return transformStyles(path, content);
  }

  if (path.endsWith('tab-group.test.ts')) {
    return transformTests(path, content);
  }

  return output;
};
