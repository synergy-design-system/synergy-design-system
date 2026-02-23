/**
 * A type representing a single select item.
 * Mainly for usage in in select tests
 */
export type SelectItem = {
  value: string;
  label: string;
};

/**
 * A type representing a single select item with mixed value types.
 */
export type SelectItemMixedValue = {
  disabled: boolean,
  value: string | number,
  label: string,
};

export type DemoFormData = {
  code: string;
  comment: string;
  date: string;
  donations: string;
  email: string;
  experience: number;
  files: FileList | undefined;
  gender: string;
  happiness: string;
  name: string;
  nationality: string;
  newsletterAngular: boolean;
  newsletterBeta: boolean;
  newsletterReact: boolean;
  newsletterStandard: boolean;
  newsletterUI: boolean;
  newsletterUX: boolean;
  newsletterVanilla: boolean;
  newsletterVue: boolean;
  password: string;
  phone: string;
  previousRoles: string[];
  role: string;
  testing: string[];
  topics: string[];
};

/**
 * A type representing the different types of side navigation.
 */
export type SideNavTypes = 'default' | 'rail' | 'sticky';

/**
 * A type representing the allowed themes for an application.
 */
export type AllowedThemes = '2018' | '2025';

/**
 * A type representing the allowed modes for the theme.
 */
export type AllowedModes = 'light' | 'dark';

/**
 * A type representing the allowed sizes for components.
 */
export type AllowedSizes = 'small' | 'medium' | 'large';

/**
 * A type representing the status of a form, including an optional icon, a message, and a type.
 */
export type FormStatus = {
  icon?: string;
  message: string;
  type: 'success' | 'warning' | 'danger';
};

/**
 * Represents a theme, including the theme information
 */
export type Theme = {
  modes: AllowedModes[];
  name: AllowedThemes;
  title: string;
};
