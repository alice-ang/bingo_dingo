/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-console */
import { addDoc } from 'firebase/firestore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { quizSettings, quizzesCollectionRef } from '@/lib';
import useModal from '@/lib/useModal';

import {
  CategoryItem,
  DashboardCard,
  FloatingInput,
  FloatingLabel,
  FloatingTextArea,
  Modal,
  RoundedButton,
  Seo,
  Stats,
  Tabs,
  Toggle,
} from '@/components';

export default function CreatePage() {
  const { isOpen, toggle } = useModal();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    reset((formValues) => ({
      ...formValues,
      isContributing: false,
      isPublic: false,
      code: 'TEST',
      questions: questions,
    }));
  }, [reset, questions]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const doc = await addDoc(quizzesCollectionRef, {
        ...data,
      });
      console.log(doc);
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

        <Tabs
          tabs={[
            {
              title: 'Skapa',
              tab: (
                <>
                  <section className='pb-3'>
                    <span className='flex items-baseline justify-between'>
                      <h3 className='pb-2 text-2xl font-normal text-gray-900'>
                        Quiz inställningar
                      </h3>
                    </span>
                    <form onSubmit={onSubmit}>
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

                        <FloatingLabel
                          label='Omslagsbild'
                          className=' col-span-6 '
                        >
                          <DashboardCard className='min-h-[200px]'>
                            <Image
                              src='https://source.unsplash.com/1920x1080/?forrest'
                              alt='bild'
                              fill
                              className=' cursor-pointer object-cover p-4 hover:opacity-75'
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
                          label='Distans (km)'
                          placeholder='Ange distans på rundan'
                          className='col-span-2'
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
                          <Toggle
                            control={control}
                            label='Öppet'
                            name='isPublic'
                          />
                          <Toggle
                            control={control}
                            label='Bidra till aktivitetsbanken'
                            name='isContributing'
                          />
                          <RoundedButton type='submit' color='bg-green'>
                            Skapa quiz
                          </RoundedButton>
                        </div>
                      </div>
                    </form>
                  </section>
                  <section>
                    <h3 className='my-3 text-base font-semibold text-gray-900'>
                      Frågor
                    </h3>
                    {questions.length == 0 && <p>Inga frågor</p>}

                    <div className='grid grid-cols-4 gap-4 text-center'>
                      {questions.map((i) => (
                        <FloatingLabel
                          key={i}
                          className='col-span-2 md:col-span-1'
                          label={`Fråga ${i}`}
                        >
                          <DashboardCard>
                            <p className='py-2 text-base text-gray-700'>
                              Lorem ipsum dolor sit amet?
                            </p>
                          </DashboardCard>
                        </FloatingLabel>
                      ))}
                    </div>
                    <div className='my-4 flex justify-center'>
                      <RoundedButton onClick={toggle}>
                        Lägg till fråga
                      </RoundedButton>
                    </div>
                  </section>
                </>
              ),
            },
            {
              title: 'Översikt',
              tab: (
                <>
                  <h3 className='my-3 text-2xl font-normal text-gray-900'>
                    Quiz namn
                  </h3>
                  <div className='mt-5 grid grid-cols-3 gap-4 md:grid-cols-4'>
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
                  <div className='my-3 '>
                    <Stats />
                  </div>
                  <h3 className='my-3 text-base font-semibold text-gray-900'>
                    Frågor
                  </h3>
                  <div className='grid grid-cols-4 gap-4 text-center'>
                    {[1, 2, 3].map((i) => (
                      <DashboardCard
                        key={i}
                        className='col-span-2 md:col-span-1'
                      >
                        <p className='font-semibold'>{`Fråga ${i}`}</p>
                        <p className='py-2 text-base text-gray-700'>
                          Lorem ipsum dolor sit amet?
                        </p>
                      </DashboardCard>
                    ))}
                    <DashboardCard className='col-span-2 md:col-span-1'>
                      <p className='font-semibold'>Utslagningsfråga</p>
                      <p className='py-2 text-base text-gray-700'>
                        Lorem ipsum dolor sit amet?
                      </p>
                    </DashboardCard>
                  </div>
                  <div className='my-4 flex justify-center'>
                    <RoundedButton onClick={() => console.log('hej')}>
                      Lägg till fråga
                    </RoundedButton>
                  </div>
                </>
              ),
            },
          ]}
        />
      </section>
      <Modal isOpen={isOpen} toggle={toggle}>
        <>
          <span className='flex items-baseline justify-between'>
            <h3 className='pb-2 text-2xl font-normal text-gray-900'>
              Skapa ny fråga
            </h3>
            <p className='text-sm text-gray-500 '>Välj från quizbanken</p>
          </span>

          <div className='grid grid-cols-8 gap-4'>
            <FloatingInput
              id='question'
              type='text'
              name='question'
              label='Fråga'
              placeholder='Skriv fråga'
              className='col-span-8'
              register={register}
              rules={{
                required: 'Ange fråga',
              }}
              errors={errors}
            />
            <FloatingInput
              id='option1'
              type='text'
              name='option'
              label='Alternativ 1'
              placeholder='Skriv alternativ'
              className='col-span-4'
              register={register}
              errors={errors}
            />
            <FloatingInput
              id='option2'
              type='text'
              name='option'
              label='Alternativ 2'
              placeholder='Skriv alternativ'
              className='col-span-4'
              register={register}
              errors={errors}
            />
            <FloatingInput
              id='option3'
              type='text'
              name='option'
              label='Alternativ 3'
              placeholder='Skriv alternativ'
              className='col-span-4'
              register={register}
              errors={errors}
            />
            <FloatingInput
              id='option4'
              type='text'
              name='option'
              label='Alternativ 4'
              placeholder='Skriv alternativ'
              className='col-span-4'
              register={register}
              errors={errors}
            />
            <DashboardCard className='relative col-span-8 md:col-span-4'>
              <Image
                src='https://source.unsplash.com/1920x1080/?nature,water'
                alt='bild'
                fill
                className='cursor-pointer object-cover p-4 hover:opacity-75'
              />
            </DashboardCard>
            <DashboardCard className='col-span-8 md:col-span-4'>
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
            <DashboardCard className='col-span-8 row-span-2 md:col-span-4'>
              <h3 className='text-base font-semibold leading-6 text-gray-900'>
                Språk, max antal deltagare, tillåta gäster, öppet / privat quiz,
                priser
              </h3>
            </DashboardCard>
            <DashboardCard className='col-span-8'>
              <h3 className='text-base font-semibold leading-6 text-gray-900'>
                Språk, max antal deltagare, tillåta gäster, öppet / privat quiz,
                priser
              </h3>
            </DashboardCard>
          </div>
        </>
      </Modal>
    </>
  );
}
