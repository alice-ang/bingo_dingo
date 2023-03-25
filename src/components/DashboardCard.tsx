import React, { ReactNode } from 'react';

import { classNames } from '@/lib';

type DashboardCardProps = {
  children: ReactNode;
  className?: string;
};

export const DashboardCard = ({ children, className }: DashboardCardProps) => {
  return (
    <div
      className={classNames(
        className,
        'flex-1 rounded-lg border border-black bg-white p-4 '
      )}
    >
      {children}
    </div>
  );
};
