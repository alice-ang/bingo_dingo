/* eslint-disable no-console */
import React from 'react';
import { RiEmotionHappyFill } from 'react-icons/ri';

import { RoundedButton } from './RoundedButton';

export const AdBanner = () => {
  return (
    <div className='flex-col items-center justify-center rounded border border-black bg-palette-beige p-4 text-center '>
      <div className='flex justify-center pb-2'>
        <RiEmotionHappyFill className='text-black' size={28} />
      </div>
      <p className='text-l font-semibold text-yellow-700'>
        Uppgradera till premium
      </p>
      <p className='pb-4 text-xs font-medium'>
        Få tillgång till fler funktioner.
      </p>

      <RoundedButton onClick={() => console.log('click')}>
        Uppgradera
      </RoundedButton>
    </div>
  );
};
