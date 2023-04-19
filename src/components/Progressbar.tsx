import React, { useEffect, useState } from 'react';

import { classNames } from '@/lib';

type Props = {
  progress: number;
};

export const Progressbar = ({ progress = 0 }: Props) => {
  const [updated, setUpdated] = useState(progress);

  useEffect(() => {
    setUpdated(progress);
  }, [progress]);

  return (
    <div className='flex h-4 w-full items-center overflow-hidden rounded-full border border-black'>
      {updated > 0 && (
        <div
          className={classNames(
            updated ? `w-[${updated}%]` : 'w-[0%]',
            'h-3  translate-x-0.5 rounded-l-full border-r border-black bg-green'
          )}
        />
      )}
    </div>
  );
};
