import { Switch } from '@headlessui/react';
import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { MdCheck } from 'react-icons/md';

import { classNames } from '@/lib';

type Props<TFormValues> = {
  label: string;
  name: Path<TFormValues>;
  control: Control<FieldValues>;
};

export const Toggle = <TFormValues extends Record<string, unknown>>({
  name,
  control,
  label,
}: Props<TFormValues>): JSX.Element => {
  return (
    <Switch.Group as='div' className='flex items-center '>
      <Switch.Label
        as='label'
        className='mr-3 transition-all duration-200 ease-in-out'
        passive
      >
        {label}
      </Switch.Label>
      <Controller
        control={control}
        name={name}
        render={({ field: { ...field } }) => (
          <Switch
            checked={field.value || false}
            onChange={field.onChange}
            ref={field.ref}
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
                field.value ? 'bg-green' : 'bg-gray-200',
                'pointer-events-none absolute mx-auto h-5 w-11 rounded-full border border-black transition-colors duration-200 ease-in-out'
              )}
            />
            <span
              aria-hidden='true'
              className={classNames(
                field.value ? 'translate-x-5' : '-translate-x-1',
                'pointer-events-none absolute left-0 inline-flex h-6 w-6 transform items-center justify-center rounded-full border border-black bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
              )}
            >
              {field.value && <MdCheck className='' />}
            </span>
          </Switch>
        )}
      />
    </Switch.Group>
  );
};
