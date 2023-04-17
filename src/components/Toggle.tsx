import { Switch } from '@headlessui/react';
import React, { useState } from 'react';
import { MdCheck } from 'react-icons/md';

import { classNames } from '@/lib';

type Props = {
  label: string;
};

export const Toggle = ({ label }: Props) => {
  const [enabled, setEnabled] = useState(false);

  const toggle = () => {
    setEnabled(!enabled);
  };

  return (
    <div className='flex items-center '>
      <label
        className={classNames(
          enabled ? 'font-semibold' : '',
          'mr-3 transition-all duration-200 ease-in-out'
        )}
      >
        {label}
      </label>
      <Switch
        checked={enabled}
        onChange={toggle}
        className='group relative inline-flex h-5 w-11 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-4 '
      >
        <span className='sr-only'>{label}</span>
        <span
          aria-hidden='true'
          className='pointer-events-none absolute h-full w-full rounded-md  bg-white'
        />

        <span
          aria-hidden='true'
          className={classNames(
            enabled ? 'bg-green' : 'bg-gray-200',
            'pointer-events-none absolute mx-auto h-5 w-11 rounded-full border border-black transition-colors duration-200 ease-in-out'
          )}
        />
        <span
          aria-hidden='true'
          className={classNames(
            enabled ? 'translate-x-5' : '-translate-x-1',
            'pointer-events-none absolute left-0 inline-flex h-6 w-6 transform items-center justify-center rounded-full border border-black bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
          )}
        >
          {enabled && <MdCheck className='' />}
        </span>
      </Switch>
    </div>
  );
};
