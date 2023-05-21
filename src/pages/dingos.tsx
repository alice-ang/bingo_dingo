/* eslint-disable no-console */

import { Layout, Seo } from '@/components';

const ContributionsPage = () => {
  return (
    <Layout>
      <Seo templateTitle='Mina dingos' />
      <section>
        <h2 className='text-4xl font-normal text-gray-900'>Mina bidrag</h2>
        {/* <DingoList dingos={data.dingoList} /> */}
      </section>
    </Layout>
  );
};

export async function getServerSideProps() {
  // const dingo = await getDocs(
  //   query(dingosCollectionRef, where('userId', '==', user?.uid))
  // );

  // const filteredData = dingo.docs.map(
  //   (doc) =>
  //     ({
  //       ...doc.data(),
  //       id: doc.id,
  //     } as Dingo)
  // );

  return {
    props: { data: [] },
  };
}
export default ContributionsPage;
