import React, { HTMLInputTypeAttribute } from 'react';

import { classNames } from '@/lib';

type Props = {
  type: HTMLInputTypeAttribute;
  name: string;
  placeholder?: string;
  className?: string;
};

export const FloatingInput = ({
  name,
  placeholder,
  type,
  className,
}: Props) => {
  return (
    <div className={classNames(className, 'relative')}>
      <label
        htmlFor={name}
        className=' absolute -top-2 left-2 inline-block bg-white px-1 font-medium text-gray-900'
      >
        {name}
      </label>
      <input
        type={type}
        id={name.toLowerCase()}
        className='block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow sm:leading-6'
        placeholder={placeholder}
      />
    </div>
  );
};
