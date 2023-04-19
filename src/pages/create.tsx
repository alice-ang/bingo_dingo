/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-vars */
import { Disclosure } from '@headlessui/react';
import { useState } from 'react';
import { FieldValues, useFieldArray, useForm } from 'react-hook-form';
import { MdArrowDropDown, MdDelete } from 'react-icons/md';

import { quizSettings } from '@/lib';

import {
  CategoryItem,
  DashboardCard,
  FloatingInput,
  FloatingLabel,
  FloatingTextArea,
  ImageUpload,
  QuestionOptions,
  RoundedButton,
  Seo,
  Toggle,
} from '@/components';

import { useAuth } from '@/context/auth';

export default function CreatePage() {
  const user = useAuth();
  const [uploadProgress, setUploadProgress] = useState(0);

  const {
    register,
    handleSubmit,
    control,

    formState: { errors },
  } = useForm({});

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
    rules: { minLength: 1 },
  });

  const onSubmitQuiz = handleSubmit(async (data: FieldValues) => {
    try {
      console.log(data);
      // await addDoc(quizzesCollectionRef, {
      //   ...data,
      //   userId: user?.uid,
      // });
    } catch (error) {
      console.error(error);
    }
  });

  // const onSubmitQuestion = handleSubmitQuestion(async (data: FieldValues) => {
  //   try {
  //     if (data.media) {
  //       const uploadTask = uploadBytesResumable(
  //         ref(storage, `quiz/images/${user?.uid}/${v4()}`),
  //         data.media[0]
  //       );

  //       uploadTask.on(
  //         'state_changed',
  //         (snapshot) => {
  //           const progress =
  //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //           console.log('Upload is ' + progress + '% done');
  //           setUploadProgress(progress);
  //           switch (snapshot.state) {
  //             case 'paused':
  //               console.log('Upload is paused');
  //               break;
  //             case 'running':
  //               console.log('Upload is running');
  //               break;
  //           }
  //         },
  //         (error) => {
  //           // Handle unsuccessful uploads
  //           console.error(error);
  //         },
  //         () => {
  //           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //             console.log('File available at', downloadURL);
  //             addDoc(questionsCollectionRef, {
  //               media: downloadURL,
  //               options: [
  //                 data.option1,
  //                 data.option2,
  //                 data.option3,
  //                 data.option4,
  //               ],
  //               userId: user?.uid,
  //               quizParent: data.quizParent,
  //             }).then((res) => console.log('created: ', res));
  //           });
  //         }
  //       );
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });

  return (
    <>
      <Seo templateTitle='Skapa quiz' />

      <section>
        <h2 className='text-4xl font-normal text-gray-900'>Skapa quiz</h2>
        <p className='text-sm text-gray-500 '>Lorem ipsum dolor sit amet</p>
        <form onSubmit={onSubmitQuiz}>
          <section className='pb-3'>
            <span className='flex items-baseline justify-between'>
              <h3 className='pb-2 text-2xl font-normal text-gray-900'>
                Quiz inställningar
              </h3>
            </span>
            <div className='grid grid-cols-6 gap-4'>
              <div className='col-span-6 grid grid-cols-3 gap-4 md:grid-cols-4'>
                {quizSettings.map((item) => (
                  <CategoryItem
                    className={item.color}
                    key={item.title}
                    subtitle={item.subtitle}
                    title={item.title}
                  >
                    {item.icon}
                  </CategoryItem>
                ))}
              </div>

              <FloatingLabel label='Omslagsbild' className=' col-span-6 '>
                <DashboardCard className='min-h-[200px]'>
                  <ImageUpload
                    upload={uploadProgress}
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
                  required: 'Ange distrans',
                }}
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
              <div className='col-span-6 flex flex-wrap items-center justify-between'>
                <Toggle control={control} label='Öppet' name='isPublic' />
                <Toggle
                  control={control}
                  label='Bidra till aktivitetsbanken'
                  name='isContributing'
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className='pb-2 text-2xl font-normal text-gray-900'>Frågor</h3>

            {fields.map((item, index) => {
              return (
                <Disclosure as='div' key={item.id} className='my-2'>
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
                          defaultValue={item.title}
                          errors={errors}
                        />

                        <FloatingLabel label='Media' className=' col-span-8 '>
                          <DashboardCard className='min-h-[200px]'>
                            <ImageUpload
                              upload={uploadProgress}
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
                        />
                        <div className='col-span-8 flex justify-end'>
                          <span className='flex items-center'>
                            <p className='mr-2 text-sm'>Ta bort fråga</p>
                            <MdDelete
                              className='text-gray-600 hover:text-red-600'
                              size={22}
                              onClick={() => remove(index)}
                            />
                          </span>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              );
            })}

            <div className='my-4 flex justify-center'>
              <RoundedButton
                onClick={() => {
                  append({
                    title: 'Din fråga',
                  });
                }}
              >
                Lägg till fråga
              </RoundedButton>
            </div>
          </section>
          <div className='mx-auto w-full md:w-1/2'>
            <button
              type='submit'
              className='text-medium inline-flex w-full justify-center rounded-md border border-black bg-black px-4 py-3 font-semibold text-white shadow-sm hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
            >
              Skapa quiz
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
