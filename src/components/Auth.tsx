import { FieldValues, useForm } from 'react-hook-form';

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = handleSubmit(async (data: FieldValues) => {
    const { email, password } = data;

    switch (type) {
      case 'login':
        signIn(email, password);
        break;

      case 'signup':
        signUp(email, password);
        break;
    }
  });

  return (
    <div className='flex flex-col '>
      <form onSubmit={onSubmit}>
        <FloatingInput
          id='email'
          type='email'
          name='email'
          label='E-postadress'
          placeholder='Ange e-post'
          register={register}
          rules={{
            required: 'Ange e-postadress',
          }}
          errors={errors}
        />
        <FloatingInput
          id='password'
          type='password'
          name='password'
          label='Lösenord'
          placeholder='Ange lösenord'
          className='my-3'
          register={register}
          rules={{
            required: 'Ange lösenord',
          }}
          errors={errors}
        />
        <div className='mx-auto w-fit'>
          <button
            type='submit'
            className={classNames(
              'rounded-xl border border-black bg-palette-pink py-4 px-4 font-semibold hover:opacity-75'
            )}
          >
            {type == 'login' ? 'Logga in' : 'Registrera konto'}
          </button>
        </div>
      </form>
      <div className='flex items-center justify-center py-6'>
        <p className='px-2'>Eller fortsätt med </p>
      </div>
      <button
        type='button'
        onClick={signInWithGoogle}
        className={classNames(
          'rounded-xl border border-black bg-palette-yellow py-4 px-4 font-semibold hover:opacity-75'
        )}
      >
        Logga in med Google
      </button>
      <button
        type='button'
        onClick={signInWithFacebook}
        className={classNames(
          'my-2 rounded-xl border border-black bg-palette-purple py-4 px-4 font-semibold hover:opacity-75'
        )}
      >
        Logga in med Facebook
      </button>
      <button
        type='button'
        onClick={signInWithGoogle}
        className={classNames(
          'rounded-xl border border-black bg-black py-4 px-4 font-semibold text-white hover:opacity-75'
        )}
      >
        Logga in med Apple
      </button>
    </div>
  );
};
