import { useEffect, useState } from 'react';
import type { SynCombobox } from '@synergy-design-system/components';
import { type SelectItem, mockAsyncData } from '@synergy-design-system/demo-utilities';

export const Combobox = () => {
  const [levels, setLevels] = useState<SelectItem[]>([]);
  const [cb632Value, setcb632Value] = useState<string>('');
  useEffect(() => {
    const fetchLevels = async () => {
      const items = await mockAsyncData('selectItems');
      setLevels(items);
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchLevels();
  }, []);
  return (
    <>
      <syn-combobox data-testid="combobox-797" value="option-2">
        <syn-option value="option-1">Option 1</syn-option>
        <syn-option value="option-2">Option 2</syn-option>
        <syn-option value="option-3">Option 3</syn-option>
      </syn-combobox>

      <syn-combobox data-testid="combobox-level-813" label="Experience" help-text="Please tell us your skill level." value="2">
        {levels.map((level) => (
          <syn-option key={level.value} value={level.value}>
            {level.label}
          </syn-option>
        ))}
      </syn-combobox>

      <form>
        <syn-combobox data-testid="combobox-form-813" value="option-1">
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-combobox>
        <syn-button type="reset">Reset</syn-button>
      </form>

      <syn-combobox
        data-testid="combobox-632"
        label="Keyboard Interaction test #632"
        value={cb632Value}
        onsyn-change={(e) => setcb632Value((e.target as SynCombobox).value)}
      >
        <syn-option value="option-1">Lorem</syn-option>
        <syn-option value="option-2">ipsum</syn-option>
        <syn-option value="option-3">dolor</syn-option>
      </syn-combobox>

      <syn-combobox
        data-testid="combobox-626"
        label="'Restricted' feature #626"
        restricted
      >
        <syn-option value="option-1">Lorem</syn-option>
        <syn-option value="option-2">ipsum</syn-option>
        <syn-option value="option-3">dolor</syn-option>
      </syn-combobox>

      <syn-combobox
        data-testid="combobox-626-async"
        label="'Restricted' feature #626 async"
        restricted
        value="3"
      >
        {levels.map(level => (
          <syn-option key={level.value} value={level.value}>
            {level.label}
          </syn-option>
        ))}
      </syn-combobox>
    </>
  );
};
