import Image from 'next/image';

import { Auth, Tabs } from '@/components';
const tabs = [
  {
    title: 'Logga in',
    tab: (
      <>
        <Auth type='login' />
      </>
    ),
  },
  {
    title: 'Registrera konto',
    tab: (
      <>
        <Auth type='signup' />
      </>
    ),
  },
];
export default function Login() {
  return (
    <div className='min-h-screen overflow-hidden'>
      <div className='absolute -top-40 -right-40 -z-10 h-[360px] w-[360px] rounded-full border border-black bg-palette-purple'></div>
      <div className='absolute -bottom-60 -left-40 -z-10 h-[360px] w-[360px] rounded-full border border-black bg-palette-green'></div>

      <main className='mx-auto max-w-2xl py-6 px-6 sm:px-6 md:px-16 md:py-12'>
        <section className='mx-auto'>
          <Image
            src='/images/quizzly.png'
            alt='quizzly logo'
            width='0'
            height='0'
            sizes='100vw'
            className='mx-auto h-auto w-full max-w-[260px] rounded-lg border border-black'
          />
          <div className='py-4 text-center'>
            <h2 className='text-4xl'>Quizzly</h2>
            <p className='text-sm'>Digitala aktiviteter för alla</p>
          </div>

          <Tabs tabs={tabs} />
        </section>
      </main>
    </div>
  );
}
