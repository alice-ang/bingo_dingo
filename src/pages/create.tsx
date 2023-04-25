/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-vars */
import { Disclosure } from '@headlessui/react';
import { ref } from 'firebase/storage';
import { useState } from 'react';
import { FieldValues, useFieldArray, useForm } from 'react-hook-form';
import { MdArrowDropDown, MdDelete } from 'react-icons/md';
import { v4 } from 'uuid';

import { classNames, Question } from '@/lib';

import {
  DashboardCard,
  FloatingInput,
  FloatingLabel,
  FloatingSelect,
  FloatingTextArea,
  ImageUpload,
  Layout,
  MapContainer,
  QuestionOptions,
  Seo,
  Toggle,
} from '@/components';

import { storage } from '@/config/firebase';
import { useAuth } from '@/context/auth';
export default function CreatePage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [markers, setMarkers] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    getValues,
    formState: { errors },
  } = useForm({});

  const watchQuestions = watch('questions') as Question[];

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
    rules: { minLength: 1 },
  });

  const onSubmitQuiz = handleSubmit(async (data: FieldValues) => {
    const imageRef = ref(storage, `quiz/images/${user?.uid}/${v4()}`);

    //   uploadBytes(imageRef, data.media[0]).then(async () => {
    //     const downloadURL = await getDownloadURL(imageRef);

    //     await addDoc(quizzesCollectionRef, {
    //       media: downloadURL,
    //       name: data.name,
    //       distance: data.distance,
    //       description: data.description,
    //       isPublic: data.isPublic,
    //       isContributing: data.isContributing,
    //       userId: user?.uid,
    //     }).then(async (document) => {
    //       await Promise.all(
    //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //         data.questions.map((question: any) => {
    //           const mediaRef = ref(storage, `quiz/images/${user?.uid}/${v4()}`);
    //           // TODO: Fix this if - puts questions in wrong order
    //           if (question.media.length > 0) {
    //             uploadBytes(mediaRef, question.media[0]).then(async () => {
    //               const mediaUrl = await getDownloadURL(mediaRef);
    //               await updateDoc(doc(db, 'quizzes', document.id), {
    //                 questions: arrayUnion({
    //                   media: mediaUrl,
    //                   title: question.title,
    //                   options: question.options,
    //                 }),
    //               });
    //             });
    //           } else {
    //             updateDoc(doc(db, 'quizzes', document.id), {
    //               questions: arrayUnion({
    //                 media: '',
    //                 title: question.title,
    //                 options: question.options,
    //               }),
    //             });
    //           }
    //         })
    //       ).finally(() => {
    //         // TODO: add this back in
    //         // reset();

    //         console.log('Quiz uploaded!');
    //       });
    //     });
    //   });
  });

  return (
    <Layout>
      <Seo templateTitle='Skapa quiz' />

      <section>
        <h2 className='text-center text-4xl font-normal text-gray-900'>
          Skapa quiz
        </h2>
        <p className='text-center text-sm text-gray-500'>
          Lorem ipsum dolor sit amet
        </p>
        <form onSubmit={onSubmitQuiz}>
          <section className='pb-3'>
            <span className='flex items-baseline justify-between'>
              <h3 className='pb-2 text-2xl font-normal text-gray-900'>Quiz</h3>
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
                placeholder='Ange quiz namn'
                className='col-span-6'
                register={register}
                rules={{
                  required: 'Ange ett namn',
                }}
                errors={errors}
              />
              <FloatingInput
                id='distance'
                type='number'
                name='distance'
                step='0.1'
                label='Distans'
                placeholder='Distans i km'
                className='col-span-3 md:col-span-2'
                register={register}
                rules={{
                  required: 'Ange distans',
                }}
                errors={errors}
              />
              <FloatingSelect
                name='type'
                label='Typ'
                placeholder='Typ av runda'
                className='col-span-3 md:col-span-2'
                register={register}
                rules={{
                  required: 'Ange typ',
                }}
                options={[
                  { value: 'map', text: 'Karta' },
                  { value: 'distance', text: 'Distans' },
                  { value: 'live', text: 'Live' },
                  { value: 'sitting', text: 'Stilla sittande' },
                ]}
                errors={errors}
              />

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
                label='Bidra till aktivitetsbanken'
                name='isContributing'
              />
              <Toggle
                control={control}
                label='Dela inom organisationen'
                name='isShared'
              />
            </div>
          </section>

          <section className='my-3 border-y border-black py-3'>
            <h3 className='text-2xl font-normal text-gray-900'>Frågor</h3>

            {fields.map((item, index) => {
              return (
                <Disclosure as='div' key={item.id} className='my-2' defaultOpen>
                  {({ open }) => (
                    <>
                      <dt>
                        <Disclosure.Button className='flex w-full items-start justify-between rounded-lg bg-black p-4 text-left'>
                          <span className='flex w-full items-center justify-between text-base font-semibold text-white'>
                            {`Fråga ${index + 1}`}
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
                        className='grid grid-cols-8 gap-4 bg-white p-4 shadow md:p-6'
                      >
                        <FloatingInput
                          id='question'
                          type='text'
                          name={`questions[${index}].title`}
                          label='Fråga'
                          placeholder='Skriv fråga'
                          className='col-span-8'
                          register={register}
                          rules={{
                            required: 'Ange fråga',
                          }}
                          errors={errors}
                        />

                        <FloatingLabel label='Media' className=' col-span-8 '>
                          <DashboardCard className='min-h-[100px]'>
                            <ImageUpload
                              name={`questions[${index}].media`}
                              register={register}
                              errors={errors}
                            />
                          </DashboardCard>
                        </FloatingLabel>

                        <QuestionOptions
                          nestIndex={index}
                          {...{ control, register, errors }}
                          className='col-span-8'
                          rules={{
                            required: 'Ange svarsalternativ',
                            minLength: 2,
                          }}
                          errors={errors}
                        />
                        <DashboardCard className='col-span-8 min-h-[360px]'>
                          <MapContainer
                            control={control}
                            name={`questions[${index}].marker`}
                            onMapChange={(point) => console.log(point)}
                            markers={watchQuestions
                              .filter((item) => !!item.marker)
                              .map((question) => ({
                                location: new window.google.maps.LatLng({
                                  ...question.marker,
                                }),
                              }))}
                          />
                        </DashboardCard>

                        <div className='col-span-8 flex justify-end'>
                          <button
                            className='flex items-center rounded-md border border-black bg-red-500 px-4 py-2 hover:bg-red-600'
                            onClick={() => remove(index)}
                          >
                            <p className='mr-2 text-sm font-semibold'>
                              Ta bort fråga
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
                Lägg till fråga
              </button>
            </div>
          </section>
          <div className='mx-auto w-full md:w-1/2'>
            <button
              type='submit'
              className='text-medium inline-flex w-full justify-center rounded-md border border-black bg-palette-yellow px-4 py-3 font-semibold shadow-sm hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
            >
              Skapa quiz
            </button>
          </div>
        </form>
      </section>
    </Layout>
  );
}
