import { PropsWithChildren, ReactNode, useState } from 'react';
import { SignupFormContext } from '../libs/SignupFormContext';
import type { ISignupForm } from '../libs/SignupFormContext';
import SignupHeader from './signup-header';
import Head from 'next/head';

interface PropsType {
  middleChild?: ReactNode | JSX.Element;
}
const SignupLayout = ({
  children,
  middleChild,
}: PropsWithChildren<PropsType>) => {
  const initialState = {
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    tagList: [],
  };
  const [form, setForm] = useState<ISignupForm>(initialState);

  return (
    <>
      <Head>
        <title>회원가입</title>
      </Head>
      <SignupFormContext.Provider value={{ form, setForm }}>
        <SignupHeader middleChild={middleChild} />
        <main className='bg-gray-200'>
          <div className='relative mx-auto my-0 h-[1px] min-h-screen bg-white pt-16 shadow-lg md:w-3/4 lg:w-[768px]'>
            {children}
          </div>
        </main>
      </SignupFormContext.Provider>
    </>
  );
};

export default SignupLayout;
