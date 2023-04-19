/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-console */
import { getDocs, query, where } from 'firebase/firestore';
import { useRef, useState } from 'react';
import { FieldValues, useFieldArray, useForm } from 'react-hook-form';
import { MdDelete } from 'react-icons/md';

import { classNames, Quiz, quizSettings, quizzesCollectionRef } from '@/lib';
import useModal from '@/lib/useModal';

import {
  CategoryItem,
  DashboardCard,
  FloatingInput,
  FloatingLabel,
  FloatingTextArea,
  ImageUpload,
  Modal,
  RoundedButton,
  Seo,
  Toggle,
} from '@/components';

import { useAuth } from '@/context/auth';

export default function CreatePage() {
  const { isOpen, toggle } = useModal();
  const [coverImg, setCoverImg] = useState<File | null>();
  const [media, setMedia] = useState<File | null>();
  const [userQuizzes, setUserQuizzes] = useState<Quiz[]>([]);
  const user = useAuth();
  const [uploadProgress, setUploadProgress] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const {
    fields: questionFields,
    append: questionAppend,
    remove: questionRemove,
  } = useFieldArray({ control, name: 'questions', rules: { minLength: 1 } });
  const {
    fields: optionFields,
    append: optionAppend,
    remove: optionRemove,
  } = useFieldArray({
    control,
    name: 'options',
    rules: { minLength: 2, maxLength: 4 },
  });

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

  const onSubmitQuiz = handleSubmit(async (data: FieldValues) => {
    try {
      const { quiz } = data;
      console.log(quiz);
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
                    name='quiz.media'
                    register={register}
                    errors={errors}
                  />
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
                name='quiz.name'
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
                id='quiz.distance'
                type='number'
                name='quiz.distance'
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
                id='quiz.description'
                name='quiz.description'
                label='Beskrivning'
                className='col-span-6'
                register={register}
                rules={{
                  required: 'Ange en beskrivning',
                }}
                errors={errors}
              />
              <div className='col-span-6 flex flex-wrap items-center justify-between'>
                <Toggle control={control} label='Öppet' name='quiz.isPublic' />
                <Toggle
                  control={control}
                  label='Bidra till aktivitetsbanken'
                  name='quiz.isContributing'
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className='pb-2 text-2xl font-normal text-gray-900'>Frågor</h3>

            {questionFields.map((item, index) => {
              return (
                <li key={item.id}>
                  <Modal
                    isOpen={isOpen}
                    toggle={toggle}
                    onSubmit={() => questionAppend({ name: 'test' })}
                  >
                    <>
                      <span className='flex items-baseline justify-between'>
                        <h3 className='pb-2 text-2xl font-normal text-gray-900'>
                          Skapa ny fråga
                        </h3>
                        <p className='text-sm text-gray-500 '>
                          Välj från quizbanken
                        </p>
                      </span>

                      <div className='grid grid-cols-8 gap-4'>
                        <FloatingLabel label='Media' className=' col-span-8 '>
                          <DashboardCard className='min-h-[200px]'>
                            <ImageUpload
                              upload={uploadProgress}
                              name={`quiz.questions[${index}].media`}
                              register={register}
                              errors={errors}
                            />
                          </DashboardCard>
                        </FloatingLabel>
                        <FloatingInput
                          id='question'
                          type='text'
                          name={`quiz.questions[${index}].title`}
                          label='Fråga'
                          placeholder='Skriv fråga'
                          className='col-span-8'
                          register={register}
                          rules={{
                            required: 'Ange fråga',
                          }}
                          errors={errors}
                        />
                        <h4 className='col-span-8'>Alternativ</h4>
                        {optionFields.map((option, idx) => {
                          return (
                            <span
                              className='col-span-8 flex items-center'
                              key={option.id}
                            >
                              <FloatingInput
                                id='option'
                                type='text'
                                name={`quiz.questions[${index}].options[${idx}].text`}
                                label={`${idx + 1}`}
                                placeholder='Skriv alternativ'
                                className='flex-1'
                                register={register}
                                errors={errors}
                              />
                              <span className='mx-3 flex flex-col items-center'>
                                <input
                                  id='option'
                                  {...register(
                                    `quiz.questions[${index}].options[${idx}].isCorrect`
                                  )}
                                  type='checkbox'
                                  defaultChecked={idx == 0 ?? false}
                                  className='h-4 w-4 border-black text-green focus:ring-green'
                                />
                              </span>

                              <span onClick={() => optionRemove(idx)}>
                                <MdDelete
                                  className='text-gray-600 hover:text-red-600'
                                  size={22}
                                />
                              </span>
                            </span>
                          );
                        })}

                        <div className='col-span-8 mx-auto'>
                          <button
                            disabled={optionFields.length == 4}
                            type='button'
                            className={classNames(
                              optionFields.length == 4
                                ? 'cursor-not-allowed	'
                                : ' hover:text-green',
                              ' w-fit justify-center text-center underline '
                            )}
                            onClick={() => {
                              optionAppend({ text: '', isCorrect: false });
                            }}
                          >
                            Lägg till fråga
                          </button>
                        </div>

                        {/* <FloatingLabel
                          label='Kartpunkt'
                          className=' col-span-8 '
                        >
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
                        </FloatingLabel> */}
                      </div>
                    </>
                  </Modal>
                  {/* {item.id}
                  <button type='button' onClick={() => questionRemove(index)}>
                    Delete
                  </button> */}
                </li>
              );
            })}
            <button
              type='button'
              onClick={() => {
                questionAppend({ name: '' });
              }}
            >
              append food
            </button>
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
              <RoundedButton onClick={toggle}>Skapa fråga</RoundedButton>
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
