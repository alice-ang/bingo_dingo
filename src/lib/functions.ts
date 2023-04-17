/* eslint-disable no-console */
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

import { auth, googleProvider } from '@/config/firebase';

export const signIn = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    console.log(auth?.currentUser?.email);
  } catch (err) {
    console.log(err);
  }
};

export const logOut = async () => {
  console.log('log out');
  try {
    await signOut(auth);
    console.log(auth?.currentUser?.email);
  } catch (err) {
    console.log(err);
  }
};

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    console.log(auth?.currentUser?.email);
  } catch (err) {
    console.log(err);
  }
};
