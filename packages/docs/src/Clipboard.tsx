import React, { FC, ReactNode } from 'react';

type ClipboardProps = {
  children: ReactNode;
  value?: string;
};

export const CopyToClipBoard: FC<ClipboardProps> = ({ children, value = '' }) => (
  <div
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onClick={async () => {
      try {
        await navigator.clipboard.writeText(value);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Could not copy value to clipboard. Error was:', e);
      }
    }}
    style={{
      cursor: 'pointer',
      display: 'flex',
    }}
    title={`Click to copy "${value}" to the clipboard`}
  >
    <div
      style={{
        flex: '1 0 auto',
      }}
    >
      {children}
    </div>
    <div
      style={{
        cursor: 'pointer',
        display: 'inline-block',
        marginLeft: '5px',
        textAlign: 'center',
      }}
    >
      💾
    </div>
  </div>
);
