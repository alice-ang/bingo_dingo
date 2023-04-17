import React from 'react';

import { classNames } from '@/lib';

type Props = {
  name: string;
  options: string[];
  className?: string;
};

export const FloatingSelect = ({ name, options, className }: Props) => {
  return (
    <div className={classNames(className, 'relative')}>
      <label
        htmlFor={name}
        className=' absolute -top-2 left-2 inline-block bg-white px-1 font-medium text-gray-900'
      >
        {name}
      </label>
      <select
        id={name.toLowerCase()}
        name={name.toLowerCase()}
        className='block  w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow sm:text-sm sm:leading-6'
      >
        {options.map((option, i) => (
          <option key={i}>{option}</option>
        ))}
      </select>
    </div>
  );
};
