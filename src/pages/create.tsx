/* eslint-disable no-console */
import Image from 'next/image';

import { quizSettings } from '@/lib';

import {
  CategoryItem,
  DashboardCard,
  RoundedButton,
  Seo,
  Stats,
  Tabs,
} from '@/components';

const tabs = [
  {
    title: 'Skapa',
    tab: (
      <>
        <span className='flex items-baseline justify-between'>
          <h3 className='text-2xl font-normal text-gray-900'>Skapa ny fråga</h3>
          <p className='text-sm text-gray-500 '>Välj från quizbanken</p>
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
              className='object-cover p-4'
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
    ),
  },
  {
    title: 'Översikt',
    tab: (
      <>
        <h3 className='my-3 text-2xl font-normal text-gray-900'>Quiz namn</h3>
        <div className='mt-5 grid grid-cols-3 gap-4 md:grid-cols-4'>
          {quizSettings.map((item, i) => (
            <CategoryItem
              className={item.color}
              key={i}
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
        <h3 className='my-3 text-base font-semibold text-gray-900'>Frågor</h3>
        <div className='grid grid-cols-4 gap-4 text-center'>
          {[1, 2, 3].map((i) => (
            <DashboardCard key={i} className='col-span-2 md:col-span-1'>
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
];

export default function CreatePage() {
  return (
    <>
      <Seo templateTitle='Skapa quiz' />

      <section>
        <h2 className='text-4xl font-normal text-gray-900'>Skapa quiz</h2>
        <p className='text-sm text-gray-500 '>Lorem ipsum dolor sit amet</p>

        <Tabs tabs={tabs} />
      </section>
    </>
  );
}
