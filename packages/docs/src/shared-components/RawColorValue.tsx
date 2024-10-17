// eslint-disable-next-line import/no-extraneous-dependencies
import React, {
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CopyToClipBoard } from './Clipboard.js';
import { getRawValueFromCssProperty, getRawValueFromToken } from '../helpers/tokens.js';

type Props = {
  value?: string;
};

export const CopyRawValue: FC<Props> = ({
  value = '',
}) => (
  <CopyToClipBoard value={value}>
    {value}
  </CopyToClipBoard>
);

export const CopyRawHexValue: FC<Props> = ({ value = '' }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [tokenColor, setTokenColor] = useState('');

  useEffect(() => {
    setTokenColor(getRawValueFromToken(value, wrapperRef.current!));
  }, []);

  return (
    <div style={{ display: 'contents' }} ref={wrapperRef}>
      <CopyRawValue value={tokenColor} />
    </div>
  );
};

type CssValueProps = {
  value?: string;
  cssProperty?: string;
};

export const CopyRawCssPropValue: FC<CssValueProps> = ({ value = '', cssProperty = '' }) => {
  const [cssValue, setCssValue] = useState('');

  useEffect(() => {
    const element = document.querySelector(`.${value}`) as HTMLElement;
    setCssValue(getRawValueFromCssProperty(cssProperty, element));
  }, []);

  return (
    <div style={{ display: 'contents' }}>
      <CopyRawValue value={cssValue} />
    </div>
  );
};
