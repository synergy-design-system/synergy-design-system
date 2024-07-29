import { useEffect, useState } from 'react';
import { type SynInput as SynInputType, setupAutocomplete } from '@synergy-design-system/components';
// @ts-expect-error autoComplete.js does not have types
import autoComplete from '@tarekraafat/autocomplete.js';

/* eslint-disable */
export const useAutoComplete = (ref: React.RefObject<SynInputType>, autoCompleteConfig: any) => {
  const [autoCompleteInstance, setAutoCompleteInstance] = useState<any>(null);
  useEffect(() => {
    if (!ref.current || ref.current.dataset.autocomplete === 'true') return;
    ref.current.dataset.autocomplete = 'true';
    Promise.all([customElements.whenDefined('syn-input'), customElements.whenDefined('syn-popup')]).then(() => {
      const { config } = setupAutocomplete(ref.current);
      let autoCompleteInstance = new autoComplete({
        ...config,
        ...autoCompleteConfig
      });
      setAutoCompleteInstance(autoCompleteInstance);
    });
  }, [ref]);
  return autoCompleteInstance;
};
/* eslint-enable */
