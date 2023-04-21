import { AppProps } from 'next/app';

import '@/styles/globals.css';

import { Layout } from '@/components';

import { AuthProvider, ProtectedRoute } from '@/context/auth';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <Layout>
          <Component {...pageProps} />
          <div id='modal'></div>
        </Layout>
      </ProtectedRoute>
    </AuthProvider>
  );
}

export default MyApp;
