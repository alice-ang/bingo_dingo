import { useModal } from '@/lib/useModal';

import { Modal } from '@/components';

export default function Login() {
  const { isShown, toggle } = useModal();

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <button onClick={toggle}>Open modal</button>
        <Modal
          isShown={isShown}
          toggle={toggle}
          modalContent={<p>hehehdkewuhf weiufh iwu</p>}
        />
      </div>
    </>
  );
}
