import React, { useState } from 'react';

import { classNames } from '@/lib';

type Props = {
  items: string[];
  onClick?: () => void;
};

export const Badges = ({ items, onClick }: Props) => {
  const [selected, setSelected] = useState<string>(items[0]);
  return (
    <>
      <div className='flex items-center overflow-x-auto'>
        {items.map((item, i) => (
          <>
            <div
              key={i}
              onClick={() => {
                onClick;
                setSelected(item);
              }}
              className={classNames(
                selected == item ? 'bg-palette-yellow font-bold' : 'bg-white',
                ' my-2 mr-3 rounded-full border border-black py-1 px-4 hover:bg-palette-yellow'
              )}
            >
              {item}
            </div>
            {/* <div className='relative top-0 right-0 z-10 flex h-5 w-5 items-center justify-center rounded-full border border-black bg-white text-xs font-bold'>
              3
            </div> */}
          </>
        ))}
      </div>
    </>
  );
};
