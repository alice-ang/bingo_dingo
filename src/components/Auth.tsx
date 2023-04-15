/* eslint-disable no-console */
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { useState } from 'react';

import { auth, googleProvider } from '@/config/firebase';

export const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log(auth?.currentUser?.email);
    } catch (err) {
      console.log(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log(auth?.currentUser?.email);
    } catch (err) {
      console.log(err);
    }
  };
  const logOut = async () => {
    try {
      await signOut(auth);
      console.log(auth?.currentUser?.email);
    } catch (err) {
      console.log(err);
    }
  };

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
