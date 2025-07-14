import type { SynInput } from '@synergy-design-system/components';
import { useLayoutEffect, useRef, useState } from 'react';

export const Validate = () => {
  const [errorMsg, setError] = useState<string>('');
  const inputRef = useRef<SynInput>(null);
  useLayoutEffect(() => {
    inputRef.current?.dispatchEvent(new CustomEvent('revalidate'));
  }, [errorMsg]);

  return (
    <>
      <syn-validate eager variant="inline" on="live">
        <syn-input
          label="Invalid input"
          type="email"
          value=""
          required
        />
      </syn-validate>

      <syn-validate data-testid="validate-915" on="revalidate" customValidationMessage={errorMsg} variant="inline">
        <syn-input label="Incorrect state with custom event #915" ref={inputRef} onsyn-change={() => setError('Invalid value')} />
      </syn-validate>
    </>
  );
};
