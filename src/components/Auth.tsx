/* eslint-disable no-console */
import { useState } from 'react';

import { logOut, signIn, signInWithGoogle } from '@/lib';

export const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <input
        placeholder='email'
        type='email'
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder='password'
        type='password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='button' onClick={() => signIn(email, password)}>
        Sign in
      </button>
      <button type='button' onClick={signInWithGoogle} className='bg-red-500'>
        Sign in with google
      </button>
      <button type='button' onClick={logOut} className='bg-blue-500'>
        Log out
      </button>
    </div>
  );
};
