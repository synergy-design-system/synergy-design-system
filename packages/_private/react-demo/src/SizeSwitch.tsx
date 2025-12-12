import { useState } from 'react';
import {
  SynButtonGroup,
  SynIconButton,
  SynTooltip,
} from '@synergy-design-system/react';
import {
  type AllowedSizes,
  setGlobalSize,
} from '@synergy-design-system/demo-utilities';

export const SizeSwitch = () => {
  const [size, setSize] = useState<AllowedSizes>('medium');

  const handleSizeChange = (newSize: AllowedSizes) => {
    setSize(newSize);
    setGlobalSize(newSize);
  };

  return (
    <SynButtonGroup>
      <SynTooltip content="Set element size to small">
        <SynIconButton
          color={size === 'small' ? 'primary' : 'currentColor'}
          data-size="small"
          name="density_small"
          label="Set element size to small"
          size="small"
          onClick={() => handleSizeChange('small')}
        />
      </SynTooltip>
      <SynTooltip content="Set element size to medium">
        <SynIconButton
          color={size === 'medium' ? 'primary' : 'currentColor'}
          data-size="medium"
          name="density_medium"
          label="Set element size to medium"
          size="small"
          onClick={() => handleSizeChange('medium')}
        />
      </SynTooltip>
      <SynTooltip content="Set element size to large">
        <SynIconButton
          color={size === 'large' ? 'primary' : 'currentColor'}
          data-size="large"
          name="density_large"
          label="Set element size to large"
          size="small"
          onClick={() => handleSizeChange('large')}
        />
      </SynTooltip>
    </SynButtonGroup>
  );
};
