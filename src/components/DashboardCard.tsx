import React, { ReactNode } from 'react';

import { classNames } from '@/lib';

type DashboardCardProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export const DashboardCard = ({
  children,
  className,
  onClick,
}: DashboardCardProps) => {
  return (
    <div
      className={classNames(
        className,
        'flex-1 rounded-lg border border-black bg-white p-4 '
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
