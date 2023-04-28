/* eslint-disable no-console */
import { Disclosure } from '@headlessui/react';
import { getDocs, query, where } from 'firebase/firestore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  MdArrowDropDown,
  MdCheckCircle,
  MdDelete,
  MdEdit,
} from 'react-icons/md';

import { classNames, deleteItem, Quiz, quizzesCollectionRef } from '@/lib';
import { useModal } from '@/lib/useModal';

import { DashboardCard, Layout, Modal, Seo } from '@/components';

import { useAuth } from '@/context/auth';

export default function QuizzesPage() {
  const { user } = useAuth();
  const [quizList, setQuizList] = useState<Quiz[]>([]);
  const { isShown, toggle } = useModal();

  useEffect(() => {
    const getQuizList = async () => {
      try {
        const quiz = await getDocs(
          query(quizzesCollectionRef, where('userId', '==', user?.uid))
        );

        const filteredData = quiz.docs.map(
          (doc) =>
            ({
              ...doc.data(),
              id: doc.id,
            } as Quiz)
        );

        setQuizList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getQuizList();
  }, [user?.uid]);

  return (
    <Layout>
      <Seo templateTitle='Mina quiz' />

      <section>
        <h2 className='text-4xl font-normal text-gray-900'>Mina quiz</h2>
        <h3 className='py-4 text-base font-semibold leading-6 text-gray-900'>
          Lorem ipsum dolor
        </h3>
        {/* <Badges items={['Aktiva', 'Arkiverade', 'Längst runda', 'A-Ö']} /> */}
        <dl className='mt-6 space-y-6 divide-y divide-gray-900/10'>
          {quizList.map((quiz) => (
            <Disclosure as='div' key={quiz.id} className='my-2'>
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button className='flex w-full items-start justify-between rounded-lg bg-black p-4 text-left'>
                      <span className='flex w-full items-center justify-between text-base font-semibold text-white'>
                        <span>{quiz.name}</span>
                        <span className='text-sm'>
                          {quiz.distance}km | {quiz?.questions.length ?? 0}{' '}
                          frågor
                        </span>
                      </span>
                      <span className='ml-6 flex h-7 items-center'>
                        {open ? (
                          <MdArrowDropDown
                            className='h-6 w-6 text-white'
                            aria-hidden='true'
                          />
                        ) : (
                          <MdArrowDropDown
                            className='h-6 w-6 -rotate-90 text-white'
                            aria-hidden='true'
                          />
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel
                    as='dd'
                    className='bg-white p-4 shadow md:p-6'
                  >
                    <div className='grid grid-cols-6 gap-4'>
                      <DashboardCard className='relative col-span-6 min-h-[280px] md:col-span-3'>
                        {/* <Image
                          src={quiz.media}
                          alt='bild'
                          fill
                          className='object-cover p-4'

                        /> */}

                        {quiz.media && (
                          <Image
                            src={quiz.media}
                            alt={quiz.name}
                            width='0'
                            height='0'
                            sizes='100vw'
                            className='h-auto w-full'
                          />
                        )}
                      </DashboardCard>
                      <p className='col-span-6 text-base leading-7 text-gray-600 md:col-span-3'>
                        {quiz.description}
                      </p>
                      <div className='col-span-6'>
                        <h3 className='my-3 text-base font-semibold text-gray-900'>
                          Frågor
                        </h3>
                        <div className='grid grid-cols-4 gap-4 text-center'>
                          {quiz.questions.length > 0 ? (
                            quiz.questions.map((question) => (
                              <>
                                <DashboardCard
                                  key={question.id}
                                  className='col-span-4 shadow md:col-span-1'
                                  onClick={toggle}
                                >
                                  {question.media && (
                                    <div className='relative min-h-[180px]'>
                                      <Image
                                        src={question.media}
                                        alt={question.title}
                                        width='0'
                                        height='0'
                                        sizes='100vw'
                                        className='h-auto w-full'
                                      />
                                    </div>
                                  )}

                                  <p className='font-semibold'>{`${question.title}`}</p>

                                  {question.options.map((option) => (
                                    <div
                                      key={option.text}
                                      className={classNames(
                                        'flex items-center justify-between border-b text-left'
                                      )}
                                    >
                                      <p
                                        className={classNames(
                                          option.isCorrect
                                            ? 'text-green font-semibold'
                                            : '',
                                          ''
                                        )}
                                      >
                                        {option.text}
                                      </p>
                                      {option.isCorrect && (
                                        <MdCheckCircle className='text-green' />
                                      )}
                                    </div>
                                  ))}
                                </DashboardCard>
                                <Modal
                                  isShown={isShown}
                                  toggle={toggle}
                                  modalContent={
                                    <>
                                      <DashboardCard className=''>
                                        <Image
                                          src={question.media}
                                          alt={question.title}
                                          width='0'
                                          height='0'
                                          sizes='100vw'
                                          className='h-auto w-full '
                                        />
                                      </DashboardCard>
                                      <h2>{question.title}</h2>
                                    </>
                                  }
                                />
                              </>
                            ))
                          ) : (
                            <h3>Inga quiz</h3>
                          )}
                        </div>
                      </div>
                      <div className='col-span-8 flex justify-center md:justify-end'>
                        <button
                          className='mr-3 flex items-center rounded-md border border-black bg-palette-yellow px-4 py-2 hover:opacity-75'
                          onClick={() => console.log(quiz.id)}
                        >
                          <p className='mr-2 text-sm font-semibold'>
                            Uppdatera
                          </p>
                          <MdEdit className='text-black ' size={22} />
                        </button>
                        <button
                          className='flex items-center rounded-md border border-black bg-red-500 px-4 py-2 hover:bg-red-600'
                          onClick={() => deleteItem('quizzes', quiz.id)}
                        >
                          <p className='mr-2 text-sm font-semibold'>Ta bort</p>
                          <MdDelete className='text-black ' size={22} />
                        </button>
                      </div>
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </dl>
      </section>
    </Layout>
  );
}
