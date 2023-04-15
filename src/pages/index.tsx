/* eslint-disable no-console */
import * as React from 'react';

import {
  Auth,
  CategoryItem,
  DashboardCard,
  SeeAllHeading,
  Seo,
} from '@/components';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <>
      <Seo templateTitle='Home' />
      <Seo />

      <Seo templateTitle='Översikt' />

      <h2 className=' text-4xl font-normal text-gray-900'>
        Välkommen <span className='text-green'>Företaget AB</span>
      </h2>
      <p className='text-sm text-gray-500 '>Lorem ipsum dolor sit amet</p>
      <div className='mt-5 grid grid-cols-3 gap-5 py-10 md:grid-cols-4'>
        {[1, 2, 3, 4].map((item, i) => (
          <CategoryItem
            className='bg-beige'
            key={i}
            subtitle='3 medlemmar'
            title='Gruppnamn'
          >
            👨‍👩‍👧
          </CategoryItem>
        ))}
      </div>
      <SeeAllHeading
        title='Mina rundor'
        hasSeeAll
        onClick={() => console.log('Se all')}
      />

      <div className='grid grid-cols-6 gap-4'>
        {[1, 2].map((i) => (
          <DashboardCard className='col-span-3' key={i}>
            <p className='text-lg font-semibold'>{`Runda ${i}`}</p>
            <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet</p>
            <p className='pt-2'>5km | 8 frågor | 26 deltagare</p>
          </DashboardCard>
        ))}
        <DashboardCard className='col-span-6 min-h-[260px]'>
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

        <DashboardCard className='col-span-6 md:col-span-2'>
          <p className='text-lg font-semibold'>Lorem ipsum</p>
          <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet</p>
        </DashboardCard>

        <DashboardCard className='col-span-6 md:col-span-4'>
          <p className='text-lg font-semibold'>Lorem ipsum</p>
          <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet</p>
          Uppgradera
        </DashboardCard>
      </div>
      <Auth />
    </>
  );
}
