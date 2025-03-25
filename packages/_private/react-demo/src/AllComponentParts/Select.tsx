import { useEffect, useState } from 'react';

export const Select = () => {
  const [levels, setLevels] = useState<Array<{ value: string, label: string }>>([]);
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
      <syn-select id="level" label="Experience" help-text="Please tell us your skill level." value="2">
        {levels.map((level) => (
          <syn-option key={level.value} value={level.value}>
            {level.label}
          </syn-option>
        ))}
      </syn-select>

      <form>
        <syn-select id="form" value="option-1">
          <syn-option value="option-1">Option 1</syn-option>
          <syn-option value="option-2">Option 2</syn-option>
          <syn-option value="option-3">Option 3</syn-option>
        </syn-select>
        <syn-button type="reset">Reset</syn-button>
      </form>
    </>
  );
};
