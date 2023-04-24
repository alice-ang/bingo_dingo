import { AppProps } from 'next/app';

import '@/styles/globals.css';

import { AuthProvider } from '@/context/auth';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <div id='modal'></div>
    </AuthProvider>
  );
}

export default MyApp;
