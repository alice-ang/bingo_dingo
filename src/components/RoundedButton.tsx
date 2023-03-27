import { ReactNode } from 'react';

import { classNames } from '@/lib';

type Props = {
  children: ReactNode;
  className?: string;
};

export const RoundedButton = ({ children, className }: Props) => {
  return (
    <button
      className={classNames(
        className,
        'rounded-full border border-black bg-yellow py-2 px-4 '
      )}
    >
      {children}
    </button>
  );
};
