// Transformer for modifying token values
export const transformTokenValueForScss = {
  matcher: (token) => {
    return token?.original?.value &&
      typeof token.original.value === 'string' &&
      token.original.value.includes('{');
  },
  name: 'syn/transform-token-value-for-scss',
  transformer: (token) => {
    let tokenName = token.path.join('-');
    if (token.original.type === 'color') {
      tokenName = 'color-' + tokenName;
    }
    token.value = `var(--syn-${tokenName})`;
    return token.value;
  },
  type: 'value',
};
