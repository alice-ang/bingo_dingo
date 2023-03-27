import { CategoryItem, DashboardCard, Seo } from '@/components';

const list = [
  { title: '12', subtitle: 'Kilometer', icon: '🏃‍♀️', color: 'bg-beige' },
  { title: '8', subtitle: 'Frågor', icon: '✏️', color: 'bg-green' },
  { title: '2', subtitle: 'Priser', icon: '🏆', color: 'bg-purple' },
  { title: '24', subtitle: 'Deltagare', icon: '🏁', color: 'bg-pink' },
];

export default function CreatePage() {
  return (
    <>
      <Seo templateTitle='Skapa quiz' />

      <section>
        <h2 className='text-4xl font-normal text-gray-900'>Skapa quiz</h2>
        <h3 className='py-4 text-base font-semibold leading-6 text-gray-900'>
          Lorem ipsum dolor
        </h3>
        <h3 className='my-3 text-2xl font-normal text-gray-900'>
          Inställningar
        </h3>
        <div className='mt-5 grid grid-cols-2 gap-5 md:grid-cols-4'>
          {list.map((item, i) => (
            <CategoryItem
              className={item.color}
              key={i}
              subtitle={item.subtitle}
              title={item.title}
            >
              {item.icon}
            </CategoryItem>
          ))}
        </div>
        <h3 className='my-3 text-2xl font-normal text-gray-900'>Frågor</h3>
        <div className='grid grid-cols-4 gap-4 text-center'>
          {[1, 2, 3, 4].map((i) => (
            <DashboardCard key={i} className='col-span-2 md:col-span-1'>
              <p className='font-semibold'>{`Fråga ${i}`}</p>
              <p className='py-2 text-base text-gray-700'>
                Lorem ipsum dolor sit amet?
              </p>
            </DashboardCard>
          ))}
        </div>
        {/* <div className='grid grid-cols-8 grid-rows-4 gap-4'>
          <DashboardCard className='col-span-8 row-span-4 md:col-span-3'>
            hej
          </DashboardCard>
          <DashboardCard className='relative col-span-8 md:col-span-5'>
            <Image
              src='https://source.unsplash.com/1920x1080/?nature,water'
              alt='bild'
              fill
              className='object-cover p-4'
            />
          </DashboardCard>
          <DashboardCard className='col-span-8 md:col-span-5'>
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
          <DashboardCard className='col-span-8 row-span-2 md:col-span-5'>
            <h3 className='text-base font-semibold leading-6 text-gray-900'>
              Lorem ipsum dolor
            </h3>
          </DashboardCard>
        </div> */}
      </section>
    </>
  );
}
