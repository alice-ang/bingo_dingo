/* eslint-disable no-console */
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

import { db } from '@/config/firebase';
import { auth, googleProvider } from '@/config/firebase';

export const dingosCollectionRef = collection(db, 'dingos');
export const rulesCollectionRef = collection(db, 'rules');

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

export const deleteItem = async (collectionName: string, docId: string) => {
  return deleteDoc(doc(db, collectionName, docId))
    .then(() => {
      console.log('Entire Document has been deleted successfully.');
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getDocumentsByUser = async (
  collectionRef: CollectionReference<DocumentData>,
  uid?: string
) => {
  try {
    const quiz = await getDocs(
      query(collectionRef, where('userId', '==', uid))
    );

    return quiz.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  } catch (err) {
    console.error(err);
  }
};
