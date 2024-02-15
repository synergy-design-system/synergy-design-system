// eslint-disable-next-line import/no-extraneous-dependencies
import React, {
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CopyToClipBoard } from './Clipboard.js';
import { getRawValueFromToken } from './helpers/colors.js';

type Props = {
  value?: string;
};

export const CopyRawHexValue: FC<Props> = ({ value = '' }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [tokenColor, setTokenColor] = useState('');

  useEffect(() => {
    setTokenColor(getRawValueFromToken(value, wrapperRef.current!));
  }, []);

  return (
    <div style={{ display: 'contents' }} ref={wrapperRef}>
      <CopyToClipBoard value={tokenColor}>
        {tokenColor}
      </CopyToClipBoard>
    </div>
  );
};
