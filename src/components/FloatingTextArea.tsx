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
  register?: UseFormRegister<FieldValues>;
  errors?: FieldValues;
  className?: string;
  defaultValue?: string;
  id: string;
  label?: string;
};

export const FloatingTextArea = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  defaultValue,
  rules,
  errors,
  className,
  id,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  return (
    <div className={className}>
      <FloatingLabel label={props.label} name={name}>
        <textarea
          rows={4}
          name={name}
          id={id}
          className='block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow sm:text-sm sm:leading-6'
          defaultValue={defaultValue}
          {...(register && register(name, rules))}
        />
      </FloatingLabel>
      {errors && (
        <p className='text-sm text-red-500'> {errors[name]?.message}</p>
      )}
    </div>
  );
};
