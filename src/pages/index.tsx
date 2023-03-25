import * as React from 'react';

import { DashboardCard, Seo, Stats } from '@/components';

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
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <Seo templateTitle='Översikt' />

      <main className='min-h-screen flex-1 bg-gray-50'>
        <div className='py-6 px-6 sm:px-6 md:px-16 md:py-12 '>
          <div className='mx-auto max-w-7xl '>
            <h2 className=' text-4xl font-normal text-gray-900'>
              Välkommen <span className='text-yellow'>Företaget AB</span>
            </h2>
            <p className='font-l text-sm text-gray-500 '>
              Lorem ipsum dolor sit amet
            </p>
          </div>
          <div className='mx-auto max-w-7xl pt-12'>
            <div className='my-6 '>
              <Stats />
            </div>

            <div className='grid grid-cols-3 gap-5'>
              <DashboardCard className='col-span-3 min-h-[260px]'>
                {' '}
                MAP
              </DashboardCard>

              <DashboardCard>
                <p className='text-lg font-semibold'>Lorem ipsum</p>
                <p className='text-sm text-gray-500'>
                  Lorem ipsum dolor sit amet
                </p>
              </DashboardCard>

              <DashboardCard className='col-span-2'>
                <p className='text-lg font-semibold'>Lorem ipsum</p>
                <p className='text-sm text-gray-500'>
                  Lorem ipsum dolor sit amet
                </p>
                Uppgradera
              </DashboardCard>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
