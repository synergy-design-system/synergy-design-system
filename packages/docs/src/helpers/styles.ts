import { html, unsafeStatic } from 'lit/static-html.js';

export type RenderArgs = {
  'default-slot': string;
};

/**
 * Default renderer for styles
 * @param args The default arguments
 * @param tag The tag to use. Defaults to "span"
 * @param tagAttributes Optional attributes to use on the tag
 * @returns The rendered HTML
 */
export const renderStyles = (
  args: RenderArgs,
  tag: string = 'span',
  tagAttributes: Record<string, string> = {},
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

  // Build a dynamic map of all attributes
  const attributeObj = Object.entries(tagAttributes);
  let attributeMap = '';

  // Add support for classes
  if (attributeObj.length === 0) {
    attributeMap = `class="${classes}"`;
  } else {
    attributeMap = attributeObj.reduce((acc, [key, value]) => {
      const finalValue = key === 'class' ? `${value} ${classes}` : value;
      return `${acc} ${key}="${finalValue}"`;
    }, '');
  }

  const finalAttributes = attributeMap.length > 0
    ? unsafeStatic(attributeMap)
    : '';

  return html`
    <${usedTag} ${finalAttributes}>
      ${unsafeStatic(defaultSlot)}
    </${usedTag}>
  `;
};
