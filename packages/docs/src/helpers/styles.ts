import { html, unsafeStatic } from 'lit/static-html.js';

export type RenderArgs = {
  'default-slot': string;
};

/**
 * Default renderer for styles
 * @param args The default arguments
 * @param tag The tag to use. Defaults to "span"
 * @returns The rendered HTML
 */
export const renderStyles = (
  args: RenderArgs,
  tag: string = 'span',
) => {
  const {
    'default-slot': defaultSlot,
    ...rest
  } = args;

  // Add support for optional utility classes
  const additionalClasses = Object
    .entries(rest)
    .map(([key, value]) => {
      if (typeof value === 'boolean') {
        return value ? key : null;
      }
      return value;
    })
    .filter(Boolean);

  const classes = additionalClasses.join(' ');
  const usedTag = unsafeStatic(tag);

  return html`
    <${usedTag} class=${classes}>
      ${defaultSlot}
    </${usedTag}>
  `;
};
