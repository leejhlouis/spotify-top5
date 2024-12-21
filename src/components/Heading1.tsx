import { ReactNode } from 'react';

interface Heading1Props {
  children: ReactNode;
  withMarginBottom?: boolean;
}

export default function Heading1({ children, withMarginBottom = true }: Heading1Props) {
  return (
    <h1 className={`text-2xl lg:text-4xl font-bold mb-6 ${withMarginBottom && 'lg:mb-12'}`}>{children}</h1>
  )
}