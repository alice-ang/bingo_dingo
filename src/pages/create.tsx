/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-console */
import { addDoc, getDocs, query, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { MdPhotoCamera } from 'react-icons/md';
import { v4 } from 'uuid';

import {
  questionsCollectionRef,
  Quiz,
  quizSettings,
  quizzesCollectionRef,
} from '@/lib';
import useModal from '@/lib/useModal';

import {
  CategoryItem,
  DashboardCard,
  FloatingInput,
  FloatingLabel,
  FloatingSelect,
  FloatingTextArea,
  Modal,
  RoundedButton,
  Seo,
  Toggle,
} from '@/components';

import { storage } from '@/config/firebase';
import { useAuth } from '@/context/auth';

export default function CreatePage() {
  const { isOpen, toggle } = useModal();
  const [coverImg, setCoverImg] = useState<File | null>();
  const [media, setMedia] = useState<File | null>();
  const [userQuizzes, setUserQuizzes] = useState<Quiz[]>([]);
  const user = useAuth();
  const {
    register: registerQuestion,
    handleSubmit: handleSubmitQuestion,
    getValues,
    formState: { errors: errorsQuestion },
  } = useForm();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const inputFileRef = useRef<HTMLInputElement>(null);

  const getQuizzes = async () => {
    try {
      const data = await getDocs(
        query(quizzesCollectionRef, where('userId', '==', user?.uid))
      );
      const filtered = data.docs.map(
        (doc) =>
          ({
            ...doc.data(),
            id: doc.id,
          } as Quiz)
      );
      setUserQuizzes(filtered);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    reset((formValues) => ({
      ...formValues,
      isContributing: false,
      isPublic: false,
      code: 'TEST',
    }));
  }, [reset]);

  const onSubmitQuiz = handleSubmit(async (data: FieldValues) => {
    try {
      await addDoc(quizzesCollectionRef, {
        ...data,
        userId: user?.uid,
      });
    } catch (error) {
      console.error(error);
    }
  });

  const onSubmitQuestion = handleSubmitQuestion(async (data: FieldValues) => {
    try {
      if (data.media) {
        const uploadTask = uploadBytesResumable(
          ref(storage, `quiz/images/${user?.uid}/${v4()}`),
          data.media[0]
        );

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            console.error(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              addDoc(questionsCollectionRef, {
                media: downloadURL,
                options: [
                  data.option1,
                  data.option2,
                  data.option3,
                  data.option4,
                ],
                userId: user?.uid,
                quizParent: data.quizParent,
              }).then((res) => console.log('created: ', res));
            });
          }
        );
      }

      //       uploadBytes(
      //         ref(storage, `quiz/images/${user?.uid}/${v4()}`),
      //         data.media[0]
      //       ).then((snapshot) => {
      //         console.log('Uploaded a blob or file!');

      //         addDoc(questionsCollectionRef, {
      //           media: getDownloadURL(snapshot.ref),
      //           options: [data.option1, data.option2, data.option3, data.option4],
      //           userId: user?.uid,
      //           quizParent: data.quizParent,
      //         }).then((res) => console.log('created: ', res));
      //       });
      //     }
    } catch (error) {
      console.error(error);
    }
  });

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
                  {coverImg ? (
                    <>
                      <Image
                        src={URL.createObjectURL(coverImg)}
                        alt='bild'
                        fill
                        className=' cursor-pointer object-cover p-4 hover:opacity-75'
                        onClick={() => setCoverImg(null)}
                      />
                    </>
                  ) : (
                    <div className='flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                      <div className='text-center'>
                        <MdPhotoCamera
                          className='mx-auto h-12 w-12 text-gray-300'
                          aria-hidden='true'
                        />
                        <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                          <label
                            htmlFor='file-upload'
                            className='hover:text-grey-700 relative cursor-pointer rounded-md bg-white font-semibold text-purple focus-within:outline-none focus-within:ring-2 focus-within:ring-purple focus-within:ring-offset-2'
                          >
                            <span>Upload a file</span>

                            <input
                              id='file-upload'
                              name='file-upload'
                              ref={inputFileRef}
                              type='file'
                              className='sr-only'
                              onChange={(e) =>
                                setCoverImg(e?.target?.files?.[0])
                              }
                            />
                          </label>
                          <p className='pl-1'>or drag and drop</p>
                        </div>
                        <p className='text-xs leading-5 text-gray-600'>
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </DashboardCard>
              </FloatingLabel>

              {/* <FloatingLabel label='QR Kod' className='col-span-3'>
                          <DashboardCard>QR code</DashboardCard>
                        </FloatingLabel>
                        <FloatingLabel label='Kod' className='col-span-3'>
                          <DashboardCard>
                            <h3 className='text-2xl font-normal text-gray-900'>
                              <input
                                {...register('code')}
                                type='hidden'
                                id='code'
                                name='code'
                              />
                              {code}
                            </h3>
                          </DashboardCard>
                        </FloatingLabel> */}

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
              {/* 
                        <FloatingInput
                          id='startDate'
                          type='date'
                          name='startDate'
                          label='Start'
                          className='col-span-3'
                          register={register}
                          errors={errors}
                        />
                        <FloatingInput
                          id='endDate'
                          type='date'
                          name='endDate'
                          label='Slut'
                          className='col-span-3'
                          register={register}
                          errors={errors}
                        />
                        <FloatingSelect
                          options={[
                            { value: 'sv', text: '🇸🇪 - svenska' },
                            { value: 'en', text: '🇺🇸 - english' },
                          ]}
                          name='lang'
                          label='Språk'
                          className='col-span-3'
                          register={register}
                          rules={{
                            required: 'Välj språk',
                          }}
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
            {/* {questions.length == 0 && <p>Inga frågor</p>}

            <div className='grid grid-cols-4 gap-4 text-center'>
              {questions.map((question, i) => (
                <FloatingLabel
                  key={i}
                  className='col-span-2 md:col-span-1'
                  label={`Fråga ${i}`}
                >
                  <DashboardCard>
                    <p className='py-2 text-base text-gray-700'>
                      {question.id}
                    </p>
                  </DashboardCard>
                </FloatingLabel>
              ))}
            </div> */}
            <div className='my-4 flex justify-center'>
              <RoundedButton
                onClick={() => {
                  toggle();
                  getQuizzes();
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
      <form onSubmit={onSubmitQuestion}>
        <Modal isOpen={isOpen} toggle={toggle} onSubmit={onSubmitQuestion}>
          <>
            <span className='flex items-baseline justify-between'>
              <h3 className='pb-2 text-2xl font-normal text-gray-900'>
                Skapa ny fråga
              </h3>
              <p className='text-sm text-gray-500 '>Välj från quizbanken</p>
            </span>

            <div className='grid grid-cols-8 gap-4'>
              <FloatingLabel label='Media' className=' col-span-8 '>
                <DashboardCard className='min-h-[200px]'>
                  {media ? (
                    <>
                      <Image
                        src={URL.createObjectURL(media)}
                        alt='bild'
                        fill
                        className=' cursor-pointer object-cover p-4 hover:opacity-75'
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
                        <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                          <label
                            htmlFor='media'
                            className='hover:text-grey-700 relative cursor-pointer rounded-md bg-white font-semibold text-green focus-within:outline-none focus-within:ring-2 focus-within:ring-green focus-within:ring-offset-2'
                          >
                            <span>Upload a file</span>

                            <input
                              id='media'
                              {...registerQuestion('media')}
                              type='file'
                              className='sr-only'
                              onChange={(e) => setMedia(e?.target?.files?.[0])}
                            />
                          </label>
                          <p className='pl-1'>or drag and drop</p>
                        </div>
                        <p className='text-xs leading-5 text-gray-600'>
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </DashboardCard>
              </FloatingLabel>
              <FloatingInput
                id='question'
                type='text'
                name='question'
                label='Fråga'
                placeholder='Skriv fråga'
                className='col-span-8'
                register={registerQuestion}
                rules={{
                  required: 'Ange fråga',
                }}
                errors={errorsQuestion}
              />
              <span
                className='
               col-span-4 flex items-center '
              >
                <FloatingInput
                  id='option1'
                  type='text'
                  name='option1.text'
                  label='Alternativ 1'
                  placeholder='Skriv alternativ'
                  className='flex-1'
                  register={registerQuestion}
                  errors={errorsQuestion}
                />
                <input
                  id='option1'
                  {...registerQuestion('option1.isCorrect')}
                  type='checkbox'
                  defaultChecked={false}
                  className='h-4 w-4 border-black text-green focus:ring-green'
                />
              </span>

              <span className=' col-span-4  flex items-center '>
                <FloatingInput
                  id='option2'
                  type='text'
                  name='option2.text'
                  label='Alternativ 2'
                  placeholder='Skriv alternativ'
                  className='flex-1'
                  register={registerQuestion}
                  errors={errorsQuestion}
                />

                <input
                  id='isCorrect'
                  {...registerQuestion('option2.isCorrect')}
                  type='checkbox'
                  defaultChecked={false}
                  className='h-4 w-4 border-black text-green focus:ring-green'
                />
              </span>
              <span className=' col-span-4  flex items-center '>
                <FloatingInput
                  id='option3'
                  type='text'
                  name='option3.text'
                  label='Alternativ 3'
                  placeholder='Skriv alternativ'
                  className='flex-1'
                  register={registerQuestion}
                  errors={errorsQuestion}
                />

                <input
                  id='isCorrect'
                  {...registerQuestion('option3.isCorrect')}
                  type='checkbox'
                  defaultChecked={false}
                  className='h-4 w-4 border-black text-green focus:ring-green'
                />
              </span>
              <span className=' col-span-4  flex items-center '>
                <FloatingInput
                  id='option4'
                  type='text'
                  name='option4.text'
                  label='Alternativ 4'
                  placeholder='Skriv alternativ'
                  className='flex-1'
                  register={registerQuestion}
                  errors={errorsQuestion}
                />
                <input
                  id='isCorrect'
                  {...registerQuestion('option4.isCorrect')}
                  type='checkbox'
                  defaultChecked={false}
                  className='h-4 w-4 border-black text-green focus:ring-green'
                />
              </span>
              <FloatingLabel label='Kartpunkt' className=' col-span-8 '>
                <DashboardCard>
                  <iframe
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8364.976577639782!2d13.836858432796966!3d58.38928326703061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465b023d3a4c413d%3A0x817d30b9033d4604!2zU2vDtnZkZQ!5e0!3m2!1ssv!2sse!4v1678730360113!5m2!1ssv!2sse'
                    width='100%'
                    height='100%'
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    aria-hidden='false'
                    tabIndex={0}
                  />
                </DashboardCard>
              </FloatingLabel>
              <FloatingSelect
                options={userQuizzes.map((quiz) => ({
                  value: quiz.id,
                  text: quiz.name,
                }))}
                name='quizParent'
                label='Koppla quiz'
                className='col-span-3'
                register={registerQuestion}
                rules={{
                  required: 'Koppla frågan till ett quiz',
                }}
                errors={errorsQuestion}
              />
            </div>
          </>
        </Modal>
      </form>
    </>
  );
}
