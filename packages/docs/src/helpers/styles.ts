import { html, unsafeStatic } from 'lit/static-html.js';

export type RenderArgs = {
  className: string;
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
    className, 'default-slot':
    defaultSlot,
  } = args;

  const usedTag = unsafeStatic(tag);

  return html`
    <${usedTag} class=${className}>
      ${defaultSlot}
    </${usedTag}>
  `;
};
