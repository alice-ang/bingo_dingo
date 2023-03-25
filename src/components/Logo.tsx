import React from 'react';

type LogoProps = {
  size?: number;
  showText?: boolean;
};
export const Logo = ({ showText = true }: LogoProps) => {
  return (
    <span className='flex items-center'>
      {/* <NextImage
        src='/bostadsbetyg.svg'
        alt='logga'
        height={size}
        width={size}
      /> */}
      {showText && (
        <p className='ml-2 text-xl font-bold text-gray-800'>quizzly.se</p>
      )}
    </span>
  );
};
