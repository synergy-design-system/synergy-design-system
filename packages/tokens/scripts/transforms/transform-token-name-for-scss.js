// Transformer for modifying token names
export const transformTokenNameForScss = {
  matcher: (token) => {
    return token?.original?.value &&
      typeof token.original.value === 'string' &&
      token.original.value.includes('{');
  },
  name: 'syn/transform-token-name-for-scss',
  transformer: (token) => {
    let tokenName = token.path.join('-');
    if (token.original.type === 'color') {
      tokenName = 'color-' + tokenName;
    }
    token.name = `--syn-${tokenName}`;
    return token.name;
  },
  type: 'name',
};
