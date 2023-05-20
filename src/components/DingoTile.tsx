import React, { useState } from 'react';

import { classNames } from '@/lib';

type TileProps = {
  text: string;
  onClick: (text: string) => void;
};

export const DingoTile = ({ text, onClick }: TileProps) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div
      className={classNames(
        isClicked ? 'bg-palette-yellow' : 'bg-gray-200',
        ' flex h-[25vw] max-h-[300px] w-full items-center justify-center overflow-hidden border border-black p-2 text-center'
      )}
      onClick={() => {
        onClick(text);
        setIsClicked(!isClicked);
      }}
    >
      <p className='line-clamp-2 text-xs font-semibold md:text-lg'>{text}</p>
    </div>
  );
};
