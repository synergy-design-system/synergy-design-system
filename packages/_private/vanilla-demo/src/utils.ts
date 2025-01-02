import { setGlobalDefaultSettings } from '@synergy-design-system/components';

export type AvailableSizes = 'small' | 'medium' | 'large';

export const noop = () => null;

export const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);

export const setGlobalSize = (size: AvailableSizes) => {
  setGlobalDefaultSettings({
    size: {
      SynButton: size,
      SynCombobox: size,
      SynInput: size,
      SynRadioGroup: size,
      SynRange: size,
      SynSelect: size,
      SynSwitch: size,
      SynTextarea: size,
    },
  });
};
