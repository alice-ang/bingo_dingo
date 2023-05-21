/* eslint-disable no-console */

import { getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { Dingo, dingosCollectionRef } from '@/lib';

import { Layout, Seo } from '@/components';
import DingoList from '@/components/DingoList';

import { useAuth } from '@/context/auth';

const ContributionsPage = () => {
  const [dingos, setDingos] = useState<Dingo[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const getDingos = async () => {
      try {
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
        setDingos(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    getDingos();
  }, [user?.uid]);

  return (
    <Layout>
      <Seo templateTitle='Mina dingos' />
      <section>
        <h2 className='text-4xl font-normal text-gray-900'>Mina bidrag</h2>
        <DingoList dingos={dingos} />
      </section>
    </Layout>
  );
};

export default ContributionsPage;
