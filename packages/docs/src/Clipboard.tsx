// eslint-disable-next-line import/no-extraneous-dependencies
import React, { FC, ReactNode } from 'react';
import '../../components/src/components/icon-button/icon-button.js';

// Make sure ts is not sad about custom elements
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      ['syn-icon-button']: unknown;
    }
  }
}

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
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
    }}
    title={`Click to copy "${value}" to the clipboard`}
  >
    <div
      style={{
        flex: '1 1 auto',
      }}
    >
      {children}
    </div>
    <syn-icon-button name="content_copy" label="Copy to Clipboard" size="small"></syn-icon-button>
  </div>
);
