import {
  Auth,
  CategoryItem,
  DashboardCard,
  Layout,
  SeeAllHeading,
  Seo,
} from '@/components';

export default function HomePage() {
  return (
    <Layout>
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
      <SeeAllHeading title='Mina rundor' hasSeeAll />

      <div className='grid grid-cols-6 gap-4'>
        {[1, 2].map((i) => (
          <DashboardCard className='col-span-3' key={i}>
            <p className='text-lg font-semibold'>{`Runda ${i}`}</p>
            <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet</p>
            <p className='pt-2'>5km | 8 frågor | 26 deltagare</p>
          </DashboardCard>
        ))}
        <DashboardCard className='col-span-6 min-h-[260px]'>
          {/* <MapContainer /> */}
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
    </Layout>
  );
}
