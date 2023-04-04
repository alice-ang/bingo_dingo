import React, { ReactNode } from 'react';

import { classNames } from '@/lib';

type Props = {
  title: string;
  subtitle: string;
  children: ReactNode;
  className?: string;
};
export const CategoryItem = ({
  children,
  className,
  title,
  subtitle,
}: Props) => {
  return (
    <div className='mx-auto w-fit flex-col items-center justify-center text-center'>
      <div
        className={classNames(
          className,
          'flex h-20 w-20 items-center justify-center rounded-full border border-black text-4xl'
        )}
      >
        {children}
      </div>
      <p className='mt-2 font-semibold'>{title}</p>
      <p className='text-sm'>{subtitle}</p>
    </div>
  );
};
