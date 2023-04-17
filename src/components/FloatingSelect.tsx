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
  id: string;
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
      <div className='relative'>
        <label
          htmlFor={name}
          className='absolute -top-2 left-2 inline-block bg-slate-50 px-1 text-sm font-medium text-gray-900'
        >
          {props.label}
        </label>

        <select
          {...(register && register(name, rules))}
          id={name.toLowerCase()}
          name={name.toLowerCase()}
          className='block  w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow sm:text-sm sm:leading-6'
        >
          {options.map((option, i) => (
            <option key={i} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </div>
      {errors && (
        <p className='text-sm text-red-500'> {errors[name]?.message}</p>
      )}
    </div>
  );
};
