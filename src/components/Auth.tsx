/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-console */
import { useState } from 'react';

import {
  classNames,
  signIn,
  signInWithFacebook,
  signInWithGoogle,
  signUp,
} from '@/lib';

import { FloatingInput } from '@/components/FloatingInput';

type Props = {
  type?: 'login' | 'signup';
};
export const Auth = ({ type = 'login' }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='flex flex-col '>
      <FloatingInput
        id='email'
        type='email'
        name='email'
        label='E-postadress'
        placeholder='Ange e-post'
      />
      <FloatingInput
        id='password'
        type='password'
        name='password'
        label='Lösenord'
        placeholder='Ange lösenord'
        className='my-3'
      />
      <button
        type='submit'
        onClick={() => {
          switch (type) {
            case 'login':
              signIn(email, password);
              break;

            case 'signup':
              signUp(email, password);
              break;
          }
        }}
        className={classNames(
          'mx-auto w-fit rounded-xl border border-black bg-palette-pink py-4 px-4 font-semibold'
        )}
      >
        {type == 'login' ? 'Logga in' : 'Registrera konto'}
      </button>
      <div className='flex items-center justify-center py-6'>
        <p className='px-2'>Eller fortsätt med </p>
      </div>
      <button
        type='button'
        onClick={signInWithGoogle}
        className={classNames(
          'rounded-xl border border-black bg-palette-yellow py-4 px-4 font-semibold'
        )}
      >
        Logga in med Google
      </button>
      <button
        type='button'
        onClick={signInWithFacebook}
        className={classNames(
          'my-2 rounded-xl border border-black bg-palette-purple py-4 px-4 font-semibold'
        )}
      >
        Logga in med Facebook
      </button>
      <button
        type='button'
        onClick={signInWithGoogle}
        className={classNames(
          'rounded-xl border border-black bg-black py-4 px-4 font-semibold text-white'
        )}
      >
        Logga in med Apple
      </button>
    </div>
  );
};
