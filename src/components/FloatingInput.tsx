import React from 'react';
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

import { FloatingLabel } from '@/components';

type FormInputProps<TFormValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register: UseFormRegister<FieldValues>;
  errors?: FieldValues;
  className?: string;
  id: string;
  type: string;
  label?: string;
  placeholder?: string;
  step?: number | string;
  defaultValue?: string;
};

export const FloatingInput = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  errors,
  className,
  step,
  defaultValue,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  return (
    <div className={className}>
      <FloatingLabel label={props.label} name={name}>
        <input
          defaultValue={defaultValue}
          step={step}
          aria-invalid={!!errors}
          className='block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow sm:text-sm sm:leading-6'
          {...props}
          {...register(name, rules)}
          min={0}
        />
      </FloatingLabel>
      {errors && (
        <p className='text-sm text-red-500'> {errors[name]?.message}</p>
      )}
    </div>
  );
};
