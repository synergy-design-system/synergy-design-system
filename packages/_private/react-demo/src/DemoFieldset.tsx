import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode,
  legend: string;
};

export const DemoFieldset: FC<Props> = ({ children, legend = '' }) => (
  <fieldset className="syn-fieldset">
    {legend && (
      <legend className="syn-legend">{legend}</legend>
    )}
    {children}
  </fieldset>
);
