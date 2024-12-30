import { useState } from 'react';
import {
  SynButtonGroup,
  SynIconButton,
  SynTooltip,
} from '@synergy-design-system/react';
import { setGlobalSize } from './shared';

type AvailableSizes = 'small' | 'medium' | 'large';

export const SizeSwitch = () => {
  const [size, setSize] = useState<AvailableSizes>('medium');

  const handleSizeChange = (newSize: AvailableSizes) => {
    setSize(newSize);
    setGlobalSize(newSize);
  };

  return (
    <SynButtonGroup>
      <SynTooltip content="Set element size to small">
        <SynIconButton
          color={size === 'small' ? 'primary' : 'currentColor'}
          name="density_small"
          label="Set element size to small"
          size="small"
          onClick={() => handleSizeChange('small')}
        />
      </SynTooltip>
      <SynTooltip content="Set element size to medium">
        <SynIconButton
          color={size === 'medium' ? 'primary' : 'currentColor'}
          name="density_medium"
          label="Set element size to medium"
          size="small"
          onClick={() => handleSizeChange('medium')}
        />
      </SynTooltip>
      <SynTooltip content="Set element size to large">
        <SynIconButton
          color={size === 'large' ? 'primary' : 'currentColor'}
          name="density_large"
          label="Set element size to large"
          size="small"
          onClick={() => handleSizeChange('large')}
        />
      </SynTooltip>
    </SynButtonGroup>
  );
};
