import { ReactNode } from 'react';

import { classNames } from '@/lib';

type Props = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  color?: string;
};

export const RoundedButton = ({
  children,
  className,
  onClick,
  color,
  type = 'button',
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(
        className,
        color ? color : 'bg-palette-yellow',
        'cursor-pointer rounded-full border border-black py-2 px-4 font-medium transition delay-100 ease-in-out hover:bg-black hover:text-white'
      )}
    >
      {children}
    </button>
  );
};
