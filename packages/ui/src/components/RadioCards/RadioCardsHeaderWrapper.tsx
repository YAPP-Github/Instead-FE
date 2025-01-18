import { ReactNode } from 'react';
import { headerWrapperStyle } from './RadioCards.css';

export type RadioCardsHeaderWrapperProps = {
  children: ReactNode;
};

export const RadioCardsHeaderWrapper = ({
  children,
}: RadioCardsHeaderWrapperProps) => {
  return <div className={headerWrapperStyle}>{children}</div>;
};

RadioCardsHeaderWrapper.displayName = 'RadioCards.HeaderWrapper';
