import { AppProps } from 'next/app';

import '@/styles/globals.css';

import { Layout } from '@/components';

import { AuthProvider } from '@/context/auth';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
