/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-vars */
import { Disclosure } from '@headlessui/react';
import { addDoc, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FieldValues, useFieldArray, useForm } from 'react-hook-form';
import { MdArrowDropDown, MdDelete } from 'react-icons/md';
import { v4 } from 'uuid';

import { classNames, dingosCollectionRef, Rule } from '@/lib';

import {
  DashboardCard,
  FloatingInput,
  FloatingLabel,
  FloatingSelect,
  FloatingTextArea,
  ImageUpload,
  Layout,
  Seo,
  Toggle,
} from '@/components';

import { db, storage } from '@/config/firebase';
import { useAuth } from '@/context/auth';
export default function CreatePage() {
  const { user, isAuthenticated, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    getValues,
    formState: { errors },
  } = useForm({});

  const watchRules = watch('rules') as Rule[];

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'rules',
    rules: { minLength: 1 },
  });

  const onSubmitDingo = handleSubmit(async (data: FieldValues) => {
    console.log('Submit');
    const imageRef = ref(storage, `dingo/images/${user?.uid}/${v4()}`);

    uploadBytes(imageRef, data.media[0]).then(async () => {
      const downloadURL = await getDownloadURL(imageRef);

      await addDoc(dingosCollectionRef, {
        media: downloadURL,
        name: data.name,
        description: data.description,
        isPublic: data.isPublic,
        isShared: data.isShared,
        userId: user?.uid,
      }).then(async (document) => {
        await Promise.all(
          data.rules.map((rule: Rule) => {
            updateDoc(doc(db, 'dingos', document.id), {
              rules: arrayUnion({
                title: rule.title,
                amount: rule.amount,
                type: rule.type,
                assign: rule.assign,
              }),
            });
          })
        ).finally(() => {
          // TODO: add this back in
          // reset();

          console.log('Dingo is uploaded!');
        });
      });
    });
  });

  return (
    <Layout>
      <Seo templateTitle='Skapa ny' />

      <section>
        <h2 className='text-center text-4xl font-normal text-gray-900'>
          Skapa nytt Dingo
        </h2>
        <p className='text-center text-sm text-gray-500'>
          Lorem ipsum dolor sit amet
        </p>
        <form onSubmit={onSubmitDingo}>
          <section className='pb-3'>
            <span className='flex items-baseline justify-between'>
              <h3 className='pb-2 text-2xl font-normal text-gray-900'>Dingo</h3>
            </span>
            <div className='grid grid-cols-6 gap-4'>
              <FloatingLabel label='Omslagsbild' className=' col-span-6 '>
                <DashboardCard className='min-h-[100px]'>
                  <ImageUpload
                    name='media'
                    register={register}
                    errors={errors}
                  />
                </DashboardCard>
              </FloatingLabel>

              <FloatingInput
                id='name'
                type='text'
                name='name'
                label='Namn'
                placeholder='Ange namn'
                className='col-span-6'
                register={register}
                rules={{
                  required: 'Ange ett namn',
                }}
                errors={errors}
              />
              {/*  
              <FloatingSelect
                name='type'
                label='Typ'
                placeholder='Typ av runda'
                className='col-span-3 md:col-span-2'
                register={register}
                rules={{
                  required: 'Ange typ',
                }}
                options={[{ value: 'bingo', text: 'Bingo' }]}
                errors={errors}
              /> */}

              <FloatingTextArea
                id='description'
                name='description'
                label='Beskrivning'
                className='col-span-6'
                register={register}
                rules={{
                  required: 'Ange en beskrivning',
                }}
                errors={errors}
              />
            </div>
            <div className='col-span-6 flex flex-wrap items-center justify-between pt-3'>
              <Toggle control={control} label='Öppet' name='isPublic' />
              <Toggle
                control={control}
                label='Dela med andra'
                name='isShared'
              />
            </div>
          </section>

          <section className='my-3 border-y border-black py-3'>
            <h3 className='text-2xl font-normal text-gray-900'>Regler</h3>

            {fields.map((item, index) => {
              return (
                <Disclosure as='div' key={item.id} className='my-2' defaultOpen>
                  {({ open }) => (
                    <>
                      <dt>
                        <Disclosure.Button className='flex w-full items-start justify-between rounded-lg bg-black p-4 text-left'>
                          <span className='flex w-full items-center justify-between text-base font-semibold text-white'>
                            {`Regel ${index + 1}`}
                          </span>
                          <span className='ml-6 flex h-7 items-center'>
                            {open ? (
                              <MdArrowDropDown
                                className='h-6 w-6 text-white'
                                aria-hidden='true'
                              />
                            ) : (
                              <MdArrowDropDown
                                className='h-6 w-6 -rotate-90 text-white'
                                aria-hidden='true'
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel
                        as='dd'
                        className='grid grid-cols-6 gap-4 bg-white p-4 shadow md:p-6'
                      >
                        <FloatingInput
                          id='rule'
                          type='text'
                          name={`rules[${index}].title`}
                          label='Regel'
                          placeholder='Skriv regel'
                          className='col-span-6'
                          register={register}
                          rules={{
                            required: 'Ange regel',
                          }}
                          errors={errors}
                        />
                        <FloatingInput
                          id='amount'
                          type='number'
                          name={`rules[${index}].amount`}
                          step='1'
                          label='Mängd'
                          placeholder='Mängd'
                          className='col-span-3 md:col-span-2'
                          register={register}
                          rules={{
                            required: 'Ange mängd',
                          }}
                          errors={errors}
                        />

                        <FloatingSelect
                          name={`rules[${index}].type`}
                          label='Typ'
                          placeholder='Typ av regel'
                          className='col-span-3 md:col-span-2'
                          register={register}
                          rules={{
                            required: 'Ange typ av regel',
                          }}
                          options={[
                            { value: 'shot', text: 'Shots' },
                            { value: 'sip', text: 'Sips' },
                          ]}
                          errors={errors}
                        />
                        <FloatingInput
                          id='assign'
                          type='text'
                          name={`rules[${index}].assign`}
                          label='Tilldela'
                          placeholder='Tilldela spelare'
                          className='col-span-6 md:col-span-2'
                          register={register}
                        />
                        <div className='col-span-6 flex justify-end'>
                          <button
                            className='flex items-center rounded-md border border-black bg-red-500 px-4 py-2 hover:bg-red-600'
                            onClick={() => remove(index)}
                          >
                            <p className='mr-2 text-sm font-semibold'>
                              Ta bort regel
                            </p>
                            <MdDelete className='text-black ' size={22} />
                          </button>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              );
            })}

            <div className='my-4 flex justify-center '>
              <button
                type='button'
                className={classNames(
                  'hover:text-green w-fit justify-center text-center underline'
                )}
                onClick={() => {
                  append({});
                }}
              >
                Lägg till regel
              </button>
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
