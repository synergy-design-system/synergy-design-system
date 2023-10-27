/**
 * This transformer is only used for easier debugging and can be activated when needed
 */
export const log = {
  matcher: () => true,
  name: 'syn/log',
  transformer: (token) => token.value,
  type: 'value',
};
