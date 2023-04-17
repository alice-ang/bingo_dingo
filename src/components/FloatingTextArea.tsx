import React from 'react';

import { classNames } from '@/lib';

type Props = {
  name: string;
  defaultValue?: string;
  className?: string;
};

export const FloatingTextArea = ({ name, defaultValue, className }: Props) => {
  return (
    <div className={classNames(className, 'relative')}>
      <label
        htmlFor={name}
        className='absolute -top-2 left-2 inline-block bg-white px-1 text-sm font-medium text-gray-900'
      >
        {name}
      </label>

      <textarea
        rows={4}
        name={name}
        id={name.toLowerCase()}
        className='block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow sm:text-sm sm:leading-6'
        defaultValue={defaultValue}
      />
    </div>
  );
};
