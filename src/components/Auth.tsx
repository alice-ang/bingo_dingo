/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-console */
import { useState } from 'react';

import { classNames, signInWithFacebook, signInWithGoogle } from '@/lib';

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
        onClick={() => console.log(type)}
        className={classNames('mx-auto w-fit bg-palette-pink')}
      >
        {type == 'login' ? 'Logga in' : 'Registrera konto'}
      </button>
      <div className='flex items-center justify-center py-6'>
        <p className='px-2'>Eller fortsätt med </p>
      </div>
      <button
        type='button'
        onClick={signInWithGoogle}
        className={classNames('bg-palette-yellow')}
      >
        Sign in with Google
      </button>
      <button
        type='button'
        onClick={signInWithFacebook}
        className={classNames('my-2 bg-palette-purple')}
      >
        Sign in with Facebook
      </button>
      <button
        type='button'
        onClick={signInWithGoogle}
        className={classNames('bg-black text-white')}
      >
        Sign in with apple
      </button>
    </div>
  );
};
