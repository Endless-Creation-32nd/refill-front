import { useRouter } from 'next/router';
import { PropsWithChildren, ReactNode } from 'react';

interface PropsType {
  middleChild?: ReactNode | JSX.Element;
}

const SignupHeader = ({ middleChild }: PropsWithChildren<PropsType>) => {
  const router = useRouter();
  const onClickBack = () => {
    if (
      confirm(
        '뒤로가기를 하면 작성중인 내용이 사라집니다.\n그래도 나가겠습니까?'
      )
    ) {
      router.replace('/login');
    }
  };
  return (
    <header className='fixed top-0 left-0 z-[99] flex h-16 w-full items-center justify-between bg-white px-4'>
      <div id='left-child' className='flex flex-1 justify-start'>
        <button onClick={onClickBack}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15 19l-7-7 7-7'
            />
          </svg>
        </button>
      </div>
      <div id='middle-child'>{middleChild || <></>}</div>
      <div id='right-child' className='flex flex-1 justify-end'></div>
    </header>
  );
};
export default SignupHeader;
