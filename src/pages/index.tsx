/* eslint-disable no-console */
import { getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { Dingo, dingosCollectionRef } from '@/lib';

import { Layout, Seo } from '@/components';
import DingoList from '@/components/DingoList';

import { useAuth } from '@/context/auth';
export default function HomePage() {
  const { user } = useAuth();
  const [dingoList, setDingoList] = useState<Dingo[]>([]);

  useEffect(() => {
    const getDingoList = async () => {
      try {
        const dingo = await getDocs(
          query(dingosCollectionRef, where('isShared', '==', true))
        );

        const filteredData = dingo.docs.map(
          (doc) =>
            ({
              ...doc.data(),
              id: doc.id,
            } as Dingo)
        );

        setDingoList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getDingoList();
  }, [user?.uid]);

  return (
    <Layout>
      <Seo templateTitle='Översikt' />

      <h2 className=' text-4xl font-normal text-gray-900'>
        Välkommen{' '}
        <span className='text-palette-green'>
          {user?.displayName ?? user?.email}
        </span>
      </h2>
      <section>
        <h2 className='mt-6 text-2xl font-normal text-gray-900'>
          Delade dingos
        </h2>
        <DingoList dingos={dingoList} />
      </section>
    </Layout>
  );
}
