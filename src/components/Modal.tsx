import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment } from 'react';
import ReactDOM from 'react-dom';

export type ModalProps = {
  isShown: boolean;
  toggle: () => void;
  modalContent: JSX.Element;
};

export const Modal: FC<ModalProps> = ({ isShown, toggle, modalContent }) => {
  const modal = (
    <Transition.Root show={isShown} as={Fragment}>
      <Dialog as='div' className='z-100 absolute' onClose={toggle}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative w-full transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6 md:max-w-xl'>
                {modalContent}
                <div className='mt-5 sm:mt-6'>
                  <button
                    type='button'
                    className='inline-flex w-full justify-center rounded-md border border-black bg-palette-yellow px-3 py-2  text-sm  font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
                    onClick={() => toggle()}
                  >
                    Klar{' '}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );

  return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};
