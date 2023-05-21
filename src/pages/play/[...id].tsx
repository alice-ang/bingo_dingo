/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-console */
import { doc, DocumentData, getDoc } from 'firebase/firestore';
import { NextPageContext } from 'next';
import Link from 'next/link';
import * as React from 'react';

import { DingoTile, Seo } from '@/components';

import { db } from '@/config/firebase';

const numbers = [
  ['B1', 'I16', 'N31', 'G46'],
  ['B2', 'I17', 'N32', 'G47'],
  ['B3', 'I18', 'N33', 'G48'],
  ['B4', 'I19', 'N34', 'G49'],
];

const PlayPage = (data: DocumentData) => {
  const { name, rules, media } = data.data;

  return (
    <div className='min-h-screen bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 py-12'>
      {/* {media && (
        <Image
          src={media}
          alt='bingo background'
          width='0'
          height='0'
          sizes='100vw'
          className='absolute -z-10 h-full w-full object-contain'
        />
      )} */}

      <Seo templateTitle='Spela' />

      <h2 className='pb-12 text-center text-4xl text-gray-900'>{name}</h2>

      <section className='mx-auto max-w-7xl'>
        <div className='justify-space-between'>
          <Link href='/play'>Generate a new dingo</Link>
        </div>
        <div className='grid grid-cols-4 border border-black'>
          {[0, 1, 2, 3].map((row, rowIndex) => (
            <div key={rowIndex}>
              {[0, 1, 2, 3].map((colIndex) => (
                <DingoTile
                  key={colIndex}
                  text={
                    // rules[
                    //   Math.floor(Math.random() * rules.length)
                    // ].title.replaceAll('"', '') ?? ''
                    [colIndex, rowIndex].toString()
                  }
                  onClick={(text) => console.log(text)}
                />
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const docRef = doc(db, 'dingos', context.query['id']?.toString() ?? '');
  const docSnap = await getDoc(docRef);

  return {
    props: { data: docSnap.data() ?? [] },
  };
}
export default PlayPage;
