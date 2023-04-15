/* eslint-disable no-console */
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '@/config/firebase';

export const signIn = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    console.log(auth?.currentUser?.email);
  } catch (err) {
    console.log(err);
  }
};
