import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

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
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  return (
    <div className={className}>
      <div className='relative'>
        <label
          htmlFor={name}
          className='absolute -top-2 left-2 inline-block bg-slate-50 px-1 text-sm font-medium text-gray-900'
        >
          {props.label}
        </label>

        <textarea
          rows={4}
          name={name}
          id={name.toLowerCase()}
          className='block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow sm:text-sm sm:leading-6'
          defaultValue={defaultValue}
          {...(register && register(name, rules))}
        />
      </div>
      {errors && (
        <p className='text-sm text-red-500'> {errors[name]?.message}</p>
      )}
    </div>
  );
};
