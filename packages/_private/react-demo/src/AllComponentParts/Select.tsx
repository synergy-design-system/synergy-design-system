import { useEffect, useState } from 'react';
import { type SelectItem, mockAsyncData } from '@synergy-design-system/demo-utilities';

export const Select = () => {
  const [levels, setLevels] = useState<SelectItem[]>([]);
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
      <syn-select data-testid="select-level-813" label="Experience" help-text="Please tell us your skill level." value="2">
        {levels.map((level) => (
          <syn-option key={level.value} value={level.value}>
            {level.label}
          </syn-option>
        ))}
      </syn-select>

      <form>
        <syn-select data-testid="select-form-813" value="option-1">
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-select>
        <syn-button type="reset">Reset</syn-button>
      </form>
    </>
  );
};
