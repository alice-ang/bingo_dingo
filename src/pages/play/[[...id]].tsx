/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-console */
import { useRouter } from 'next/router';
import * as React from 'react';
import { FieldValues, useFieldArray, useForm } from 'react-hook-form';

import { FloatingSelect, Layout, Seo } from '@/components';

export default function PlayPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'rules',
    rules: { minLength: 1 },
  });

  const onSubmitDingo = handleSubmit(async (data: FieldValues) => {
    console.log(data);
  });

  return (
    <Layout>
      <Seo templateTitle='Spela' />

      <section>
        <div className=''>
          <h2 className='pb-12  text-4xl font-normal text-gray-900'>Spela</h2>
        </div>
        <form onSubmit={onSubmitDingo}>
          <section className='pb-3'>
            <span className='flex items-baseline justify-between'>
              <h3 className='pb-2 text-2xl font-normal text-gray-900'>Dingo</h3>
            </span>
            <div className='grid grid-cols-6 gap-4'>
              <FloatingSelect
                name='type'
                label='Typ'
                placeholder='Typ av regel'
                className='col-span-3 md:col-span-2'
                register={register}
                rules={{
                  required: 'Ange typ av regel',
                }}
                options={[
                  { value: 'sip', text: 'Sips' },
                  { value: 'shot', text: 'Shots' },
                ]}
                errors={errors}
              />
              <FloatingSelect
                name='type'
                label='Typ'
                placeholder='Typ av regel'
                className='col-span-3 md:col-span-2'
                register={register}
                rules={{
                  required: 'Ange typ av regel',
                }}
                options={[
                  { value: 'sip', text: 'Sips' },
                  { value: 'shot', text: 'Shots' },
                ]}
                errors={errors}
              />
              <FloatingSelect
                name='type'
                label='Typ'
                placeholder='Typ av regel'
                className='col-span-3 md:col-span-2'
                register={register}
                rules={{
                  required: 'Ange typ av regel',
                }}
                options={[
                  { value: 'sip', text: 'Sips' },
                  { value: 'shot', text: 'Shots' },
                ]}
                errors={errors}
              />
            </div>
          </section>

          <div className='mx-auto w-full md:w-1/2'>
            <button
              type='submit'
              className='text-medium inline-flex w-full justify-center rounded-md border border-black bg-palette-yellow px-4 py-3 font-semibold shadow-sm hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
            >
              Skapa
            </button>
          </div>
        </form>
      </section>
    </Layout>
  );
}
