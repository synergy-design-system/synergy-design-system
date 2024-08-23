/* eslint-disable react/require-default-props */
import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode,
  id?: string;
  legend: string;
};

export const DemoFieldset: FC<Props> = ({ children, id, legend = '' }) => (
  <fieldset className="syn-fieldset" id={id}>
    {legend && (
      <legend className="syn-legend">{legend}</legend>
    )}
    {children}
  </fieldset>
);
