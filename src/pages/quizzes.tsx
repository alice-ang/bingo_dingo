/* eslint-disable no-console */
import { Disclosure } from '@headlessui/react';
import { getDocs, query, where } from 'firebase/firestore';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MdArrowDropDown, MdDelete, MdModeEdit } from 'react-icons/md';

import { Quiz, quizzesCollectionRef } from '@/lib';
import useModal from '@/lib/useModal';

import { DashboardCard, Modal, Seo, Stats } from '@/components';

import { useAuth } from '@/context/auth';

export default function QuizzesPage() {
  const user = useAuth();
  const { isOpen, toggle } = useModal();
  const [quizList, setQuizList] = useState<Quiz[]>([]);

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
    <>
      <Seo templateTitle='Mina quiz' />

      <section>
        <h2 className='text-4xl font-normal text-gray-900'>Mina quiz</h2>
        <h3 className='py-4 text-base font-semibold leading-6 text-gray-900'>
          Lorem ipsum dolor
        </h3>
        {/* <Badges items={['Aktiva', 'Arkiverade', 'Längst runda', 'A-Ö']} /> */}
        <dl className='mt-6 space-y-6 divide-y divide-gray-900/10'>
          {quizList.map((quiz, i) => (
            <Disclosure as='div' key={i} className='my-2'>
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
                        <Image
                          src={quiz.media}
                          alt='bild'
                          fill
                          className='object-cover p-4'
                        />
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
                              <DashboardCard
                                key={question.id}
                                className='col-span-2 cursor-pointer hover:bg-yellow md:col-span-1'
                                onClick={toggle}
                              >
                                <p className='font-semibold'>{`${question.title}`}</p>
                                <p className='py-2 text-sm text-gray-700'>
                                  {question.title}
                                </p>
                              </DashboardCard>
                            ))
                          ) : (
                            <h3>Inga quiz</h3>
                          )}
                          {/* <DashboardCard className='col-span-2 cursor-pointer hover:bg-yellow md:col-span-1'>
                            <p className='font-semibold'>Utslagningsfråga</p>
                            <p className='py-2 text-sm text-gray-700'>
                              {quiz.elimination.question}
                            </p>
                          </DashboardCard> */}
                        </div>
                      </div>
                      <div className='col-span-6'>
                        <Stats />
                      </div>
                      <div className='col-span-6 flex justify-end'>
                        <MdModeEdit
                          className='mx-4 h-6 w-6 hover:text-green'
                          aria-hidden='false'
                        />
                        <MdDelete
                          className='h-6 w-6 hover:text-red-500'
                          aria-hidden='false'
                        />
                      </div>
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </dl>
      </section>
      <Modal isOpen={isOpen} toggle={toggle}>
        <h2>hej</h2>
      </Modal>
    </>
  );
}
