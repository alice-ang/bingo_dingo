/* eslint-disable no-console */
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { FieldValues } from 'react-hook-form';

import { db } from '@/config/firebase';
import { auth, googleProvider } from '@/config/firebase';

export const quizzesCollectionRef = collection(db, 'quizzes');
export const questionsCollectionRef = collection(db, 'questions');

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

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const generateString = (length: number) => {
  let result = ' ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export const createQuiz = async (
  data: FieldValues,
  downloadURL: string,
  userId: string
) => {
  return await addDoc(quizzesCollectionRef, {
    media: downloadURL,
    name: data.name,
    distance: data.distance,
    description: data.description,
    isPublic: data.isPublic,
    isContributing: data.isContributing,
    userId: userId,
  });
};

export const deleteItem = async (collectionName: string, docId: string) => {
  return deleteDoc(doc(db, collectionName, docId))
    .then(() => {
      console.log('Entire Document has been deleted successfully.');
    })
    .catch((error) => {
      console.log(error);
    });
};
