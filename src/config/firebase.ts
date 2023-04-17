import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBnfwwDBuIUenJbHqaEyf7rHEKbqpC-UVg',
  authDomain: 'quizzly-e98c0.firebaseapp.com',
  projectId: 'quizzly-e98c0',
  storageBucket: 'quizzly-e98c0.appspot.com',
  messagingSenderId: '392397419926',
  appId: '1:392397419926:web:c56a430b79a090eae399b7',
  measurementId: 'G-5HS8J5QWSJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
