import React, { type FC } from 'react';
import docsTokens from '../../tokens/src/figma-tokens/_docs.json';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const pathToDoc = (p: string) => p.concat('.value').split('.').reduce((o, i) => o[i], docsTokens);

type DocTokenTextProps = {
  path: string;
};

export const DocTokenText: FC<DocTokenTextProps> = ({ path }) => (
  <>{pathToDoc(path)}</>
);
