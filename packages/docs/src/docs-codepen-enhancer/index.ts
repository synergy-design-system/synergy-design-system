/* eslint-disable no-param-reassign */
import { StoryContext } from '@storybook/web-components';

export default function docsCodepenEnhancer(code: string, storyContext: StoryContext) {
  // We hijack the formatter to keep track of every story's code change
  // and add a button to edit it on CodePen
  const storiesOnDocsPage = document.querySelectorAll(`#anchor--${storyContext.id}`);
  const packageVersionString = import.meta.env.VITE_PACKAGE_VERSIONS as string;
  const packageVersions = JSON.parse(packageVersionString) as Record<string, string>;

  // Unfortunately, the editable story in a docs page has the same ID as the first story.
  storiesOnDocsPage.forEach((story) => {
    const showCodeButton = story.querySelector('.docblock-code-toggle');
    if (showCodeButton) {
      const editCodeButton = showCodeButton.cloneNode(true) as HTMLElement;
      editCodeButton.textContent = 'Edit on CodePen';
      editCodeButton.classList.add('docblock-codepen-button');

      const isEditableStory = story.querySelector('.sb-bar');

      // We want to remove old buttons, but as described two stories share the same ID.
      // This leads to this little hack to make sure that always the correct button is
      // visible for every story.
      //
      // Part 1: For the editable story (with '.sb-bar') remove all buttons except the last one
      //         as this could contain the correct button for the editable story
      if (isEditableStory) {
        story.querySelectorAll('.docblock-codepen-button:not(:last-of-type)').forEach((el) => {
          el.remove();
        });
      } else {
        story.querySelectorAll('.docblock-codepen-button').forEach((el) => {
          el.remove();
        });
      }

      // Add the button to the end
      showCodeButton.parentElement!.appendChild(editCodeButton);

      // Part 2: Hide the last button, because the one before the last is the correct one
      //         for the editable story
      if (isEditableStory) {
        story.querySelectorAll<HTMLElement>('.docblock-codepen-button:not(:last-of-type)').forEach((el) => {
          el.style.display = 'block';
          el.style.borderRight = 'none';
        });
        story.querySelector<HTMLElement>('.docblock-codepen-button:last-of-type')!.style.display = 'none';
      }

      // Finally add the event listener to the button
      editCodeButton.addEventListener('click', () => {
        const form = document.createElement('form');
        form.action = 'https://codepen.io/pen/define';
        form.method = 'POST';
        form.target = '_blank';

        // Docs: https://blog.codepen.io/documentation/prefill/
        const data = {
          css: `/* Import theme */
@import url("https://esm.sh/@synergy-design-system/tokens@${packageVersions['@synergy-design-system/tokens']}/dist/themes/light.css");

/* Import utilities */
@import url("https://esm.sh/@synergy-design-system/components@${packageVersions['@synergy-design-system/components']}/dist/styles/index.css");

/* Import styles */
@import url("https://esm.sh/@synergy-design-system/styles@${packageVersions['@synergy-design-system/styles']}/dist/index.css");

body {
  font-family: var(--syn-font-sans);
}`,
          css_external: '',
          description: '',
          editors: 1110,
          head: '<meta name="viewport" content="width=device-width">',
          html: code,
          js: `import * as components from "https://esm.sh/@synergy-design-system/components@${packageVersions['@synergy-design-system/components']}/dist/synergy.js";

// Override to make icons work with CDN
const { registerIconLibrary } = components;

registerIconLibrary("default", {
resolver: (name) =>
\`https://esm.sh/@synergy-design-system/assets@${packageVersions['@synergy-design-system/assets']}/src/icons/\${name}.svg\`
});`,
          js_external: '',
          js_module: true,
          js_pre_processor: 'none',
          tags: ['synergy-design-system', 'web components'],
          title: '',
        };

        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'data';
        input.value = JSON.stringify(data);
        form.append(input);

        document.documentElement.append(form);
        form.submit();
        form.remove();
      });
    }
  });
  return code;
}
