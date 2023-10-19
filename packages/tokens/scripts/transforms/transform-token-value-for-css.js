// Transformer for modifying token values to CSS variable format
export const transformTokenValueForCss = {
  matcher: (token) => {
    return !token?.name.includes('syn-color') &&
      typeof token?.original?.value === 'string' &&
      token.original.value.includes('{');
  },
  name: 'syn/transform-token-value-for-css',
  transformer: (token) => {
    if (matcher(token)) {
      token.value = `var(--syn-${token.original.type === 'color' && !token.original.value.includes('color') ? 'color-' : ''}${token.original.value
        .replace('{', '')
        .replace('}', '')
        .replace('.', '-')
        })`;
    }
    return token.value;
  },
  type: 'value',
};
