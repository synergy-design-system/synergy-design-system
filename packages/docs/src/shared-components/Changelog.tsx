import React, {
  type FC,
} from 'react';
import { Markdown } from '@storybook/addon-docs/blocks';

type Props = {
  children: string;
};

export const ChangelogFormatter: FC<Props> = ({ children }) => (
  <Markdown
    className="syn-body--medium"
    options={{
      overrides: {
        h1: {
          props: {
            className: 'syn-heading--3x-large',
          },
        },
        h2: {
          props: {
            className: 'syn-heading--2x-large',
          },
        },
        h3: {
          props: {
            className: 'syn-heading--large',
          },
        },
        ul: {
          props: {
            style: {
              marginTop: 0,
            },
          },
        },
      },
    }}
  >
    {children}
  </Markdown>
);
