import React from 'react';
import {
  Control,
  FieldValues,
  RegisterOptions,
  useFieldArray,
  UseFormRegister,
} from 'react-hook-form';
import { MdDelete } from 'react-icons/md';

import { classNames, Option } from '@/lib';

import { FloatingInput } from '@/components';

type FormInputProps = {
  control?: Control<FieldValues> | undefined;
  register: UseFormRegister<FieldValues>;
  errors?: FieldValues;
  nestIndex: number;
  className?: string;
  rules?: RegisterOptions;
};
export const QuestionOptions = ({
  register,
  errors,
  control,
  nestIndex,
  className,
  rules,
}: FormInputProps): JSX.Element => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `questions[${nestIndex}].options`,
  });

  return (
    <div className={className}>
      <div className='grid grid-cols-6 gap-4'>
        <h3 className='col-span-6'>Svarsalternativ</h3>
        {fields.map((item, idx) => {
          return (
            <span key={item.id} className='col-span-6 mb-4 md:col-span-3'>
              <span className=' flex items-center '>
                <FloatingInput
                  id='option'
                  type='text'
                  name={`questions[${nestIndex}].options[${idx}].text`}
                  label={`Alternativ ${idx + 1}`}
                  placeholder='Skriv alternativ'
                  className=' flex-1'
                  register={register}
                  errors={errors}
                  rules={rules}
                />
                <span className='mx-3 flex flex-col items-center'>
                  <input
                    id='option'
                    {...register(
                      `questions[${nestIndex}].options[${idx}].isCorrect`
                    )}
                    type='checkbox'
                    aria-invalid={!!errors}
                    defaultChecked={idx == 0 ?? false}
                    className='h-4 w-4 border-black text-green focus:ring-green'
                  />
                </span>

                <span onClick={() => remove(idx)}>
                  <MdDelete
                    className='text-gray-600 hover:text-red-600'
                    size={22}
                  />
                </span>
              </span>
              {errors && (
                <p className='text-sm text-red-500'>
                  {errors[`questions[${nestIndex}].options[${idx}].text`]
                    ?.message ||
                    errors[`questions[${nestIndex}].options[${idx}].isCorrect`]
                      ?.message}
                </p>
              )}
            </span>
          );
        })}

        <div className='col-span-6 text-center'>
          <button
            disabled={fields.length == 4}
            type='button'
            className={classNames(
              fields.length == 4 ? 'cursor-not-allowed	' : ' hover:text-green',
              ' w-fit justify-center text-center underline '
            )}
            onClick={() => {
              append({ text: '', isCorrect: false } as Option);
            }}
          >
            Lägg till alternativ
          </button>
        </div>
      </div>
    </div>
  );
};
