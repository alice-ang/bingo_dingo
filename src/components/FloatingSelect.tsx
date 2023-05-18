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
  label?: string;
  placeholder?: string;
  options: {
    value: string;
    text: string;
  }[];
};

export const FloatingSelect = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  errors,
  options,
  className,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  return (
    <div className={className}>
      <FloatingLabel label={props.label} name={name}>
        <select
          defaultValue={options[0].text}
          {...register(name, rules)}
          className='focus:ring-yellow  block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </FloatingLabel>
      {errors && (
        <p className='text-sm text-red-500'> {errors[name]?.message}</p>
      )}
    </div>
  );
};
