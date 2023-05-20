import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';

import { classNames } from '@/lib';

type TileProps = {
  text: string;
  onClick: (text: string) => void;
  color?: string;
};

export const DingoTile = ({ text, onClick }: TileProps) => {
  const [isClicked, setIsClicked] = useState(false);
  // const [isAssinged, setIsAssined] = useState(false);
  return (
    <div
      className={classNames(
        'bg-gray-20 flex h-[25vw] max-h-[300px] w-full items-center justify-center overflow-hidden border border-black p-2 text-center'
      )}
      onClick={() => {
        onClick(text);
        setIsClicked(!isClicked);
      }}
      // onDoubleClick={() => {
      //   setIsAssined(!isAssinged);
      // }}
    >
      <div className='relative flex items-center justify-center'>
        <p className='line-clamp-2 text-xs font-semibold md:text-lg'>{text}</p>
        {isClicked && (
          <MdClose
            className='-z absolute text-palette-green opacity-70'
            size={90}
          />
        )}
      </div>
    </div>
  );
};
