import { setGlobalDefaultSettings } from '@synergy-design-system/components';

export const setGlobalSize = (size: 'small' | 'medium' | 'large') => {
  const SynAccordion = size === 'small' ? 'medium' : size;
  const SynDetails = size === 'small' ? 'medium' : size;

  setGlobalDefaultSettings({
    size: {
      SynAccordion,
      SynButton: size,
      SynCheckbox: size,
      SynCombobox: size,
      SynDetails,
      SynFile: size,
      SynIconButton: size,
      SynInput: size,
      SynRadio: size,
      SynRadioGroup: size,
      SynRange: size,
      SynSelect: size,
      SynSwitch: size,
      SynTag: size,
      SynTextarea: size,
    },
  });
};
