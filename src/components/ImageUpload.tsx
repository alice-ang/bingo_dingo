import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';
import { MdPhotoCamera } from 'react-icons/md';

type FormInputProps<TFormValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register: UseFormRegister<FieldValues>;
  errors?: FieldValues;
  className?: string;
};

export const ImageUpload = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  errors,
  className,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  return (
    <div className={className}>
      <div className='flex justify-center rounded-lg border border-dashed border-gray-900/25 py-6'>
        <div className='text-center'>
          <MdPhotoCamera
            className='mx-auto h-12 w-12 text-gray-300'
            aria-hidden='true'
          />
          <p className='text-xs leading-5 text-gray-600'>
            PNG, JPG, GIF upp till 10MB
          </p>
          <div className='mx-auto mt-4 flex text-sm leading-6 text-gray-600'>
            <label
              htmlFor={name}
              className='hover:text-grey-700 relative cursor-pointer rounded-md bg-white font-semibold text-green focus-within:outline-none focus-within:ring-2 focus-within:ring-green focus-within:ring-offset-2'
            >
              <input
                type='file'
                id={name}
                {...register(name, rules)}
                {...props}
              />
            </label>
          </div>

          {errors && (
            <p className='text-sm text-red-500'> {errors[name]?.message}</p>
          )}
        </div>
      </div>
      {/* {media ? (
        <>
          <Image
            src={URL.createObjectURL(media)}
            alt='bild'
            fill
            className=' cursor-pointer object-cover p-4 hover:opacity-75 md:object-contain'
            onClick={() => setMedia(null)}
          />
        </>
      ) : (
        <div className='flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
          <div className='text-center'>
            <MdPhotoCamera
              className='mx-auto h-12 w-12 text-gray-300'
              aria-hidden='true'
            />
            <p className='text-xs leading-5 text-gray-600'>
              PNG, JPG, GIF upp till 10MB
            </p>
            <div className='mx-auto mt-4 flex text-sm leading-6 text-gray-600'>
              <label
                htmlFor={name}
                className='hover:text-grey-700 relative cursor-pointer rounded-md bg-white font-semibold text-green focus-within:outline-none focus-within:ring-2 focus-within:ring-green focus-within:ring-offset-2'
              >
                <input
                  type='file'
                  id={name}
                  {...register(name, rules)}
                  {...props}
                />
              </label>
            </div>

            {errors && (
              <p className='text-sm text-red-500'> {errors[name]?.message}</p>
            )}
          </div>
        </div>
      )} */}
    </div>
  );
};
