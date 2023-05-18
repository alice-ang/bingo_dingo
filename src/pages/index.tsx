import { Layout, Seo } from '@/components';

import { useAuth } from '@/context/auth';

export default function HomePage() {
  const { user } = useAuth();
  return (
    <Layout>
      <Seo templateTitle='Översikt' />
      <h2 className=' text-4xl font-normal text-gray-900'>
        Välkommen{' '}
        <span className='text-palette-green'>
          {user?.displayName ?? user?.email}
        </span>
      </h2>
    </Layout>
  );
}
