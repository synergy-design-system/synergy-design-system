import { setGlobalDefaultSettings } from '@synergy-design-system/components';

export type AvailableSizes = 'small' | 'medium' | 'large';

export const setGlobalSize = (size: AvailableSizes) => {
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
