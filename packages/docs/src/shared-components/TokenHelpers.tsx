import React, {
  FC,
} from 'react';

type TokenProps = {
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: string;
  borderWidth?: string;
  boxShadow?: string;
  height?: string;
  width?: string;
};

export const TokenDemo: FC<TokenProps> = ({
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

type Demo = {
  className?: string;
  value: string;
};

export const ColorSwatch: FC<Demo> = ({ value, ...props }) => (
  <TokenDemo backgroundColor={value} borderColor={value} {...props} />
);

export const BorderRadius: FC<Demo> = ({ value, ...props }) => (
  <TokenDemo borderRadius={value} {...props} />
);

export const BorderWidth: FC<Demo> = ({ value, ...props }) => (
  <TokenDemo borderWidth={value} backgroundColor="var(--syn-color-neutral-0)" {...props} />
);

export const Shadow: FC<Demo> = ({ value, ...props }) => (
  <TokenDemo
    boxShadow={value}
    backgroundColor="var(--syn-color-neutral-0)"
    borderColor="var(--syn-color-neutral-0)"
    {...props}
  />
);

export const Spacing: FC<Demo> = ({ value, ...props }) => (
  <TokenDemo
    borderRadius="var(--syn-border-radius-none)"
    height={value}
    width={value}
    {...props}
  />
);

export const MultiLineDescription: FC<{ value: string; }> = ({ value }) => (
  <>
    {value.split('\n\n').map((line, i) => (
      <p key={i}>{line}</p>
    ))}
  </>
);
