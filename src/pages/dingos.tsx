/* eslint-disable no-console */
import { getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { Dingo, dingosCollectionRef } from '@/lib';

import { Layout, Seo } from '@/components';
import DingoList from '@/components/DingoList';

import { useAuth } from '@/context/auth';

export default function ContributionsPage() {
  const { user } = useAuth();
  const [dingoList, setDingoList] = useState<Dingo[]>([]);

  useEffect(() => {
    const getDingoList = async () => {
      try {
        // TODO: Exclude your own dingos
        const dingo = await getDocs(
          query(dingosCollectionRef, where('userId', '==', user?.uid))
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
      <Seo templateTitle='Mina dingos' />
      <section>
        <h2 className='text-4xl font-normal text-gray-900'>Mina bidrag</h2>
        <DingoList dingos={dingoList} user={user} />
      </section>
    </Layout>
  );
}
