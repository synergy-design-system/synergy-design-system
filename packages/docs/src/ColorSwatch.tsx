import React, {
  FC,
} from 'react';

type Props = {
  backgroundColor: string;
  borderColor: string;
  borderRadius: string;
  borderWidth: string;
  boxShadow: string;
  height: string;
  width: string;
};

export const ColorSwatch: FC<Props> = ({
  backgroundColor = 'var(--syn-color-primary-500)',
  borderColor = 'var(--syn-color-primary-500)',
  borderRadius = 'var(--syn-border-radius-small)',
  borderWidth = 'var(--syn-border-width-small)',
  boxShadow = 'var(--syn-shadow-large)',
  height = 'var(--syn-spacing-2x-large)',
  width = 'var(--syn-spacing-2x-large)',
  ...props
}) => (
  <div
    style={{
      backgroundColor,
      borderColor,
      borderRadius,
      borderStyle: 'solid',
      borderWidth,
      boxShadow,
      height,
      width,
    }}
    {...props}
  >
  </div>
);
