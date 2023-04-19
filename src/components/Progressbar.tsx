import React, { useEffect, useState } from 'react';

import { classNames } from '@/lib';

type Props = {
  progress: number;
};

export const Progressbar = ({ progress }: Props) => {
  const [updated, setUpdated] = useState(50);

  useEffect(() => {
    setUpdated(progress);
  }, [progress]);

  return (
    <div className='flex h-4 w-full items-center overflow-hidden rounded-full border border-black'>
      <div
        className={classNames(
          `w-[${updated}%]`,
          'h-3  translate-x-0.5 rounded-l-full border-r border-black bg-green'
        )}
      />
    </div>
  );
};
