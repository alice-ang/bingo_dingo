import Image from 'next/image';

import { Auth, Tabs } from '@/components';
import { Footer } from '@/components/layout/Footer';
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
    <>
      <main className='mx-auto min-h-screen max-w-2xl py-6 px-6 sm:px-6 md:px-16 md:py-12'>
        {/* <div className='absolute -top-40 -right-40 -z-20 h-[360px] w-[360px] rounded-full border border-black bg-palette-purple '></div> */}
        {/* <div className='absolute -bottom-60 -left-40 -z-10 h-[360px] w-[360px] rounded-full border border-black bg-palette-green'></div> */}
        <section className='mx-auto'>
          <Image
            src='/images/dingo.png'
            alt='quizzly logo'
            width='0'
            height='0'
            sizes='100vw'
            className='mx-auto  h-auto w-full max-w-[260px] rounded-2xl'
          />
          <div className='py-6 text-center'>
            <h2 className='text-4xl'>Bingo Dingo</h2>
            <p className='py-1 text-sm'>Get the Party Started</p>
          </div>

          <Tabs tabs={tabs} />
        </section>
      </main>
      <Footer />
    </>
  );
}
