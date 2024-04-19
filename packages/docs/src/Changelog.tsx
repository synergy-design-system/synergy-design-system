import React, {
  FC,
} from 'react';
import { Markdown } from '@storybook/blocks';

type Props = {
  children: string;
};

export const ChangelogFormatter: FC<Props> = ({ children }) => (
  <>
    <h1>Changelog</h1>
    <hr></hr>

    <Markdown
      options={{
        overrides: {
          h1: {
            component: 'h2',
            props: {
              style: {
                'font-size': 'var(--syn-font-size-medium)',
                margin: 'var(--syn-spacing-x-large) 0 var(--syn-spacing-x-small) 0',
              },
            },
          },
          h3: {
            component: 'h4',
            props: {
              style: {
                'font-size': 'var(--syn-font-size-small)',
                margin: '0 0 var(--syn-spacing-2x-small) 0',
              },

            },
          },
          ul: {
            props: {
              style: {
                'margin-top': '0',
              },
            },
          },
        },
      }}
    >
      {children}
    </Markdown>
  </>
);
