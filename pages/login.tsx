import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { errorTypes } from '../utils';
import { axiosPublic } from '../utils/axiosPublic';

import Kakao from '../assets/kakao_logo.svg';
import Google from '../assets/google_logo.svg';
import Head from 'next/head';

const Login: NextPage = () => {
  const initialState = {
    email: '',
    password: '',
  };
  const [form, setForm] = useState(initialState);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const router = useRouter();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    onChange(e);

    if (!value.match(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)) {
      setIsValidEmail(false);
      return;
    }
    setIsValidEmail(true);
  };
  const onChangePassWord = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    onChange(e);

    if (!value.match(/^[a-zA-Z0-9]{8,}$/)) {
      setIsValidPassword(false);
      return;
    }
    setIsValidPassword(true);
  };
  const onSubmit = useCallback(() => {
    const { email, password } = form;
    if (!email || !email.trim() || !password || !password.trim()) {
      alert('빈칸을 모두 입력해주세요.');
      return;
    }
    if (!isValidEmail) {
      alert('이메일 형식을 확인해주세요.(example@domain.com)');
      return;
    }
    if (!isValidPassword) {
      alert('비밀번호 형식을 확인해주세요.\n(8글자 이상 대소문자, 숫자 포함)');
      setForm((prev) => ({ ...prev, password: '' }));
      return;
    }

    axiosPublic
      .post('/api/auth/login', { email, password })
      .then((response) => {
        const {
          data: { data },
        } = response;
        if (response.status === 200) {
          localStorage.setItem('accessToken', data.accessToken);
          setForm((prev) => ({
            ...prev,
            email: '',
            password: '',
          }));
          router.replace('/');
        }
      })
      .catch((error) => {
        const {
          data: { errorType },
        } = error.response;
        if (errorType === errorTypes.E014) {
          alert('해당 사용자를 찾을 수 없습니다. 다시 시도해보세요.');
          setForm((prev) => ({
            ...prev,
            email: '',
            password: '',
          }));
        } else if (errorType === errorTypes.E022) {
          alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
          setForm((prev) => ({
            ...prev,
            password: '',
          }));
        }
      });
  }, [form, isValidEmail, isValidPassword, router]);

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onSubmit();
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [onSubmit]);

  return (
    <>
      <Head>
        <title>Refill 로그인</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
        />
      </Head>
      <div className='flex h-full w-full flex-col items-center justify-center bg-white p-6'>
        <div className='relative z-10 mb-[81px] h-[35px] w-[112px]'>
          <Image
            src='/images/logo_mint.png'
            alt='logo'
            layout='fill'
            objectFit='cover'
          />
        </div>
        <form className='mb-32 flex w-full flex-col gap-2'>
          <input
            id='email'
            type='email'
            name='email'
            autoComplete='username'
            required
            value={form.email}
            onChange={onChangeEmail}
            placeholder='이메일'
            className='w-full rounded-md border border-light-gray px-4 py-3 text-sm'
          />
          <input
            id='password'
            type='password'
            name='password'
            required
            value={form.password}
            onChange={onChangePassWord}
            placeholder='비밀번호'
            autoComplete='current-password'
            className='w-full rounded-md border border-light-gray px-4 py-3 text-sm'
          />
          <div className='flex w-full justify-between'>
            <label className='flex items-center'>
              <input type='checkbox' />
              <span className='ml-2 text-xs text-[#707070]'>아이디 저장</span>
            </label>
            <button type='button' className='text-xs text-[#707070]'>
              비밀번호 찾기
            </button>
          </div>
        </form>
        <div className='flex w-full flex-col items-center gap-2'>
          <button
            type='submit'
            onClick={onSubmit}
            className='h-12 w-full rounded-md bg-black py-3 text-lg text-mint-main'
          >
            로그인
          </button>
          <button
            type='button'
            className='flex h-12 w-full items-center justify-center gap-2 rounded-md border border-[#FFE600] text-sm'
          >
            <Kakao />
            카카오톡으로 로그인
          </button>
          <button
            type='button'
            className='flex h-12 w-full items-center justify-center gap-2 rounded-md border border-light-gray text-sm'
          >
            <Google />
            Google로 로그인
          </button>
          <div className='text-xs'>
            <span className='opacity-50'>아직 회원이 아니라면?</span>
            <Link href='/signup'>
              <a className='ml-1 underline'>회원가입하기</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
