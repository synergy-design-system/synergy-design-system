import { useEffect, useState } from 'react';
import { type SelectItem, mockAsyncData, mockData } from '@synergy-design-system/demo-utilities';

const numericItems = mockData('selectItemsMixedId');

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
        {levels.map(level => (
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

      <div>
        <syn-select
          data-testid="select-805-single-select"
          help-text="Please tell us your skill level."
          label="Mixed integer and string values (Single Select)"
          value={1}
        >
          {numericItems.map(item => (
            <syn-option key={item.id} value={item.id} disabled={item.disabled}>
              {item.label}
            </syn-option>
          ))}
        </syn-select>

        <syn-select
          data-testid="select-805-multi-select"
          help-text="Please tell us your skill level."
          label="Mixed integer and string values (multi Select)"
          multiple
          value={[1, 'three']}
        >
          {numericItems.map(item => (
            <syn-option key={item.id} value={item.id} disabled={item.disabled}>
              {item.label}
            </syn-option>
          ))}
        </syn-select>
      </div>

      <syn-select
        data-testid="select-540-delimiter"
        delimiter="|"
        help-text="This select uses a custom delimiter"
        label="Multiple with custom delimiter"
        multiple
        value="1|2"
      >
        {levels.map(level => (
          <syn-option key={level.value} value={level.value}>
            {level.label}
          </syn-option>
        ))}
      </syn-select>

      <syn-select
        data-testid="select-851-multiple"
        help-text="Normal value binding and async options"
        label="Multiple with async options"
        multiple
        value="1 2"
      >
        {levels.map(level => (
          <syn-option key={level.value} value={level.value}>
            {level.label}
          </syn-option>
        ))}
      </syn-select>
    </>
  );
};
