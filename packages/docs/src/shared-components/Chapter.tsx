// eslint-disable-next-line import/no-extraneous-dependencies
import React, {
  FC,
  ReactNode,
} from 'react';

type Props = {
  title: string;
  children: ReactNode;
};

export const Chapter: FC<Props> = ({ title, children }) => (
  <>
    <div className='sb-unstyled docs-syn-style' style={{ display: 'flex' }}>
      <div style={{
        flexShrink: 0, fontSize: '24px', fontWeight: 'bold', width: '10em',
      }}>{title}</div>
      <div>
        {children}
      </div>
    </div>
    <br />
    <hr />
  </>
);

export const SymbolLine: FC<Props> = ({ title, children }) => (
  <div style={{ alignItems: 'center', display: 'flex' }}>{title} &nbsp; {children} <br /></div>
);
