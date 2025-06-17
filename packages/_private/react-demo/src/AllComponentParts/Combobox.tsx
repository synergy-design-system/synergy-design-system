import { useEffect, useState } from 'react';
import type { SynCombobox } from '@synergy-design-system/components';

export const Combobox = () => {
  const [levels, setLevels] = useState<Array<{ value: string, label: string }>>([]);
  const [cb632Value, setcb632Value] = useState<string>('');
  useEffect(() => {
    setTimeout(() => {
      setLevels([
        { label: 'Novice', value: '1' },
        { label: 'Intermediate', value: '2' },
        { label: 'Advanced', value: '3' },
      ]);
    }, 0);
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
    </>
  );
};
