// eslint-disable-next-line import/no-extraneous-dependencies
import React, { FC } from 'react';
import { CopyToClipBoard } from './Clipboard.js';
import { getRawValueFromToken } from './helpers/colors.js';

type Props = {
  value?: string;
};

export const CopyRawHexValue: FC<Props> = ({ value = '' }) => (
  <CopyToClipBoard value={getRawValueFromToken(value)}>
    {getRawValueFromToken(value)}
  </CopyToClipBoard>
);
