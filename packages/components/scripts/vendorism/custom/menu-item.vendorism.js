import { addSectionsAfter, addSectionsBefore, replaceSections } from '../replace-section.js';

const FILES_TO_TRANSFORM = [
  'menu-item.test.ts',
  'menu-item.component.ts',
];

const transformTests = (path, originalContent) => {
  // #854 calledOnce is flaky in Chrome on CI
  let content = replaceSections([
    [
      "it('should emit the slotchange event when the label changes'",
      "it.skip('should emit the slotchange event when the label changes'",
    ],
    [
      'expect(slotChangeHandler).to.have.been.calledOnce;',
      'expect(slotChangeHandler.callCount).to.equal(1);',
    ],
    [
      'expect(selectHandler).to.have.been.calledOnce;',
      'expect(selectHandler.callCount).to.equal(1);',
    ],
    [
      'expect(focusHandler).to.have.been.calledOnce;',
      'expect(focusHandler.callCount).to.equal(1);',
    ],
  ], originalContent);

  // Skip the failing tests on ci.
  // Seems to be an issue with the current playwright version + docker image.
  // This is known, but not fixed yet in web-test-runner playwright
  content = addSectionsAfter([
    [
      "it('should focus on first menuitem of submenu if ArrowRight is pressed on parent menuitem', async () => {",
      '    if (process.env.CI) { return; }',
    ],
    [
      "it('should focus on outer menu if ArrowRight is pressed on nested menuitem', async () => {",
      '    if (process.env.CI) { return; }',
    ],
  ], content);

  return {
    content,
    path,
  };
};

/**
 * Transform the component code
 * @param {String} path
 * @param {String} originalContent
 * @returns
 */
const transformComponent = (path, originalContent) => {
  // We are using chevron-down from the system icon library and
  // add a css transform on it to make sure its placement is correct.
  // This is done as our chevrons are exactly the same and we are
  // able to lessen the amount of shipped icons
  const contentWithRTLAdjusted = originalContent.replaceAll(
    // eslint-disable-next-line no-template-curly-in-string
    "name=${isRtl ? 'chevron-left' : 'chevron-right'}",
    'name="chevron-down"',
  );

  // Add support for sending change events via decorator
  const content = addSectionsBefore([
    // Add the import for the decorator
    [
      "import type { CSSResultGroup } from 'lit';",
      "import { emitEventForPropertyUpdates } from '../../internal/watchEvent.js';",
    ],
    // Add the decorator to the class
    [
      'export default class SynMenuItem',
      `@emitEventForPropertyUpdates(['type', 'loading'], {
  waitUntilFirstUpdated: true,
})`,
    ],
  ], contentWithRTLAdjusted);

  return {
    content,
    path,
  };
};

export const vendorMenuItem = (path, content) => {
  const output = { content, path };

  // Skip for non select
  const isValidFile = !!FILES_TO_TRANSFORM.find(p => path.includes(p));

  if (!isValidFile) {
    return output;
  }

  if (path.endsWith('menu-item.test.ts')) {
    return transformTests(path, content);
  }

  if (path.endsWith('menu-item.component.ts')) {
    return transformComponent(path, content);
  }

  return output;
};
