import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode,
  legend: string;
};

export const Fieldset: FC<Props> = ({ children, legend = '' }) => (
  <fieldset className="syn-fieldset">
    {legend && (
      <legend className="syn-legend">Personal Information</legend>
    )}
    {children}
  </fieldset>
);
