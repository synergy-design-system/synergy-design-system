/**
 * A type representing a single select item.
 * Mainly for usage in in select tests
 */
export type SelectItem = {
  value: string;
  label: string;
};

/**
 * A type representing a single select item with mixed id types.
 */
export type SelectItemMixedId = {
  disabled: boolean,
  id: string | number,
  label: string,
};

export type DemoFormData = {
  code: string;
  comment: string;
  date: string;
  donations: string;
  email: string;
  files: FileList | undefined;
  gender: string;
  happiness: string;
  name: string;
  nationality: string;
  newsletterAngular: boolean;
  newsletterBeta: boolean;
  newsletterReact: boolean;
  newsletterStandard: boolean;
  newsletterVanilla: boolean;
  newsletterVue: boolean;
  password: string;
  phone: string;
  role: string;
  topics: string[];
};

/**
 * A type representing the different types of side navigation.
 */
export type SideNavTypes = 'default' | 'rail' | 'sticky';

/**
 * A type representing the allowed themes for an application.
 */
export type AllowedThemes = 'brand25' | 'synergy';

/**
 * A type representing the allowed modes for the theme.
 */
export type AllowedModes = 'light' | 'dark';
