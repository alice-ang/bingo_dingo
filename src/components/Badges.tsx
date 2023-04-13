import React, { useState } from 'react';

import { classNames } from '@/lib';

type Props = {
  items: string[];
  onClick?: () => void;
};

export const Badges = ({ items, onClick }: Props) => {
  const [selected, setSelected] = useState<string>(items[0]);
  return (
    <div className='flex flex-wrap items-center'>
      {items.map((item, i) => (
        <div
          key={i}
          onClick={() => {
            onClick;
            setSelected(item);
          }}
          className={classNames(
            selected == item ? 'bg-yellow font-bold' : 'bg-white',
            'my-2 mr-3 rounded-full border border-black py-1 px-4'
          )}
        >
          {item}
        </div>
      ))}
    </div>
  );
};
