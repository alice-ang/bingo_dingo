import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';
import { MdPhotoCamera } from 'react-icons/md';

import { Progressbar } from '@/components';

type FormInputProps<TFormValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register: UseFormRegister<FieldValues>;
  errors?: FieldValues;
  className?: string;
  upload?: number;
};

export const ImageUpload = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  errors,
  className,
  upload = 0,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  const [media, setMedia] = useState<File | null>();
  const [uploadProgress, setUploadProgress] = useState(upload);

  useEffect(() => {
    setUploadProgress(upload);
  }, [upload]);

  return (
    <div className={className}>
      {media ? (
        <>
          <Image
            src={URL.createObjectURL(media)}
            alt='bild'
            fill
            className=' cursor-pointer object-cover p-4 hover:opacity-75 md:object-contain'
            onClick={() => setMedia(null)}
          />
        </>
      ) : uploadProgress > 0 ? (
        <Progressbar progress={uploadProgress} />
      ) : (
        <>
          <div className='flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
            <div className='text-center'>
              <MdPhotoCamera
                className='mx-auto h-12 w-12 text-gray-300'
                aria-hidden='true'
              />
              <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                <label
                  htmlFor={name}
                  className='hover:text-grey-700 relative cursor-pointer rounded-md bg-white font-semibold text-green focus-within:outline-none focus-within:ring-2 focus-within:ring-green focus-within:ring-offset-2'
                >
                  {/* <input
                    id='file-upload'
                    name='file-upload'
                    type='file'
                    className='sr-only'
                    onChange={(e) => setMedia(e?.target?.files?.[0])}
                  /> */}

                  <input
                    type='file'
                    id={name}
                    {...register(name, rules)}
                    {...props}
                    onChange={(e) => setMedia(e?.target?.files?.[0])}
                  />
                </label>
              </div>
              <p className='text-xs leading-5 text-gray-600'>
                PNG, JPG, GIF upp till 10MB
              </p>
              {errors && (
                <p className='text-sm text-red-500'> {errors[name]?.message}</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
