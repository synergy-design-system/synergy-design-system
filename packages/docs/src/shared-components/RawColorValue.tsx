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

/**
 * This component searches the DOM for an element with the specified CSS class,
 * retrieves the computed value of the specified CSS property from that element,
 * and displays it with copy-to-clipboard functionality.
 *
 * @example
 * ```tsx
 * // Get the background-color of an element with class "my-button"
 * <CopyRawCssPropValue
 *   value="my-button"
 *   cssProperty="background-color"
 * />
 *
 * ```
 *
 * @param props.value - The CSS class name of the element to search for (without the leading dot)
 * @param props.cssProperty - The CSS property name to retrieve the value from
 */
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
