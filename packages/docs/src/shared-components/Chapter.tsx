import '../../../components/src/components/divider/divider.js';
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
      <h4
        className="syn-heading--large"
        style={{
          flexShrink: 0,
          width: '10em',
        }}
      >{title}</h4>
      <div>
        {children}
      </div>
    </div>
    <br />
    <syn-divider />
  </>
);

export const SymbolLine: FC<Props> = ({ title, children }) => (
  <div style={{ alignItems: 'center', display: 'flex' }}>{title} &nbsp; {children} <br /></div>
);
