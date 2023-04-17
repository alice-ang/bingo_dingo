import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  name?: string;
  label?: string;
  className?: string;
};

export const FloatingLabel = ({ name, label, children, className }: Props) => {
  return (
    <div className={className}>
      <div className='relative'>
        <label
          htmlFor={name}
          className='z-100 absolute -top-2 left-2 inline-block bg-slate-50 px-1 text-sm font-medium text-gray-900 md:-top-3 md:text-base'
        >
          {label}
        </label>

        {children}
      </div>
    </div>
  );
};
