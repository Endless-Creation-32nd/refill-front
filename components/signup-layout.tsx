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
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
        />
      </Head>
      <SignupFormContext.Provider value={{ form, setForm }}>
        <SignupHeader middleChild={middleChild} />
        <main className='main h-[1px] bg-white'>
          <div className='h-full bg-white pt-16'>{children}</div>
        </main>
      </SignupFormContext.Provider>
    </>
  );
};

export default SignupLayout;
