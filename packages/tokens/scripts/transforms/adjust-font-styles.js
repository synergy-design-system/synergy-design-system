/**
 * Custom transformation to adjust synergies typography tokens
 * It will skip all tokens of type "typography" that do not include
 * "regular" as name
 */
export const adjustFontStylesValues = {
  matcher: (token) => {
    // Only work on typo tokens
    if (token.type !== 'typography') {
      return false;
    }

    // Only work on regular tokens, not -bold ones
    if (!token.name.endsWith('-regular')) {
      return false;
    }

    return true;
  },
  name: 'syn/adjust-font-styles-values',
  transformer: ({ original }) => {
    const { fontFamily, fontSize, lineHeight } = original.value;

    // Create the font style, but do so using synergies tokens
    const output = `${fontSize}/${lineHeight} ${fontFamily}`;
    console.log(output);
    return 'here - ' + output;
  },
  // We do not use transitive as we want the raw values!
  transitive: true,
  type: 'value',
};
