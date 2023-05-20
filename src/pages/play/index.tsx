import { getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import * as React from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { Dingo, dingosCollectionRef } from '@/lib';

import { FloatingSelect, Layout, Seo } from '@/components';

type PageProps = {
  data: Dingo[];
};

const GeneratePage = ({ data }: PageProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({});

  const onGenerate = handleSubmit(async (docData: FieldValues) => {
    router.push(`/play/${docData.dingoId}`);
  });

  return (
    <Layout>
      <Seo templateTitle='Generera' />

      <section>
        <form onSubmit={onGenerate}>
          <section className='pb-3'>
            <span className='flex items-baseline justify-between'>
              <h3 className='pb-2 text-2xl font-normal text-gray-900'>Välj</h3>
            </span>

            <div className='grid grid-cols-6 gap-4'>
              <FloatingSelect
                name='dingoId'
                label='Dingo'
                placeholder='Välj dingo'
                className='col-span-3 '
                register={register}
                rules={{
                  required: 'Ange dingo du vill använda',
                }}
                options={data.map((doc) => ({
                  value: doc.id,
                  text: doc.name,
                }))}
                errors={errors}
              />
              <FloatingSelect
                name='type'
                label='Typ'
                placeholder='Typ av dingo'
                className='col-span-3'
                register={register}
                rules={{
                  required: 'Ange typ',
                }}
                options={[
                  { value: 'bingo', text: 'Bingo' },
                  { value: 'rules', text: 'Regler' },
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
              Generera dingo
            </button>
          </div>
        </form>
      </section>
    </Layout>
  );
};

export async function getServerSideProps() {
  const dingoSnapshot = await getDocs(
    query(dingosCollectionRef, where('isShared', '==', true))
  );

  const filteredData = dingoSnapshot.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        id: doc.id,
      } as Dingo)
  );

  return {
    props: { data: filteredData ?? [] },
  };
}
export default GeneratePage;
