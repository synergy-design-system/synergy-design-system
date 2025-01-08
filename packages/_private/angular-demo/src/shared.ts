import { setGlobalDefaultSettings } from '@synergy-design-system/components';

export const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);

export const setGlobalSize = (size: 'small' | 'medium' | 'large') => {
  setGlobalDefaultSettings({
    size: {
      SynButton: size,
      SynCheckbox: size,
      SynCombobox: size,
      SynFile: size,
      SynIconButton: size,
      SynInput: size,
      SynRadio: size,
      SynRadioGroup: size,
      SynRange: size,
      SynSelect: size,
      SynSwitch: size,
      SynTextarea: size,
    },
  });
};
