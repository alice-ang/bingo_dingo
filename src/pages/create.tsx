/* eslint-disable no-console */
import Image from 'next/image';
import { useForm } from 'react-hook-form';

import { quizSettings } from '@/lib';

import {
  CategoryItem,
  DashboardCard,
  FloatingInput,
  FloatingSelect,
  FloatingTextArea,
  RoundedButton,
  Seo,
  Stats,
  Tabs,
  Toggle,
} from '@/components';

export default function CreatePage() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
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
                        <div className=' col-span-6 '>
                          <h3 className='text-base font-semibold text-gray-900'>
                            Omslagsbild
                          </h3>
                          <DashboardCard className='relative min-h-[250px]'>
                            <Image
                              src='https://source.unsplash.com/1920x1080/?forrest'
                              alt='bild'
                              fill
                              className='cursor-pointer object-cover p-4 hover:opacity-75'
                            />
                          </DashboardCard>
                        </div>

                        {/* <FloatingInput
                          type='text'
                          placeholder='Ange quiz namn'iel
                          className='col-span-6'
                          
                          label='Namn'
                   
                        /> */}

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
                            { value: 'en', text: '🇺🇸 - engelska' },
                          ]}
                          id='lang'
                          name='lang'
                          label='Språk'
                          className='col-span-3'
                          register={register}
                          rules={{
                            required: 'Välj språk',
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
                          <Toggle label='Öppet' />{' '}
                          <Toggle label='Bidra till aktivitetsbanken' />
                          <RoundedButton type='submit'>
                            Skapa quiz
                          </RoundedButton>
                        </div>
                      </div>
                    </form>
                  </section>

                  <span className='flex items-baseline justify-between'>
                    <h3 className='pb-2 text-2xl font-normal text-gray-900'>
                      Skapa ny fråga
                    </h3>
                    <p className='text-sm text-gray-500 '>
                      Välj från quizbanken
                    </p>
                  </span>

                  <div className='grid grid-cols-8 grid-rows-4 gap-4'>
                    <DashboardCard className='col-span-8 row-span-4 md:col-span-4'>
                      Lorem ipsum dolor sit amet?
                    </DashboardCard>
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
                        Språk, max antal deltagare, tillåta gäster, öppet /
                        privat quiz, priser
                      </h3>
                    </DashboardCard>
                    <DashboardCard className='col-span-8'>
                      <h3 className='text-base font-semibold leading-6 text-gray-900'>
                        Språk, max antal deltagare, tillåta gäster, öppet /
                        privat quiz, priser
                      </h3>
                    </DashboardCard>
                  </div>
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
    </>
  );
}
