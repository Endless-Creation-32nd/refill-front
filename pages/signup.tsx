import { FormEvent, ReactElement, useContext } from 'react';
import { ChangeEvent, useState } from 'react';
import SignupLayout from '../components/signup-layout';
import { SignupFormContext } from '../libs/SignupFormContext';
import type { SignupFormContextType } from '../libs/SignupFormContext';
import type { NextPageWithLayout } from './_app';
import axios from 'axios';
import { useRouter } from 'next/router';
import { errorTypes } from '../utils';
import Header from '../components/header';
import { axiosPublic } from '../utils/axiosPublic';

const Signup: NextPageWithLayout = () => {
  const context = useContext(SignupFormContext) as SignupFormContextType;
  const { form, setForm } = context;
  const [isDuplicatedNickname, setIsDuplicatedNickname] = useState(false);
  const [isDuplicatedEmail, setIsDuplicatedEmail] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidNickname, setValidNickname] = useState(false);
  const [isSamePassword, setIsSamePassword] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidPasswordConfirm, setIsValidPasswordConfirm] = useState(true);
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
  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    onChange(e);

    if (!value || !value.trim()) return;
    setValidNickname(!!value.match(/^[ㄱ-ㅎ|가-힣|]{2,8}$/));
  };

  const onChangePassWord = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    onChange(e);

    if (!value.match(/^[a-zA-Z0-9]{8,}$/)) {
      setIsValidPassword(false);
      return;
    }
    setIsValidPassword(true);
    if (form.passwordConfirm && form.passwordConfirm.trim()) {
      if (form.passwordConfirm !== value) {
        setIsSamePassword(false);
        return;
      }
      setIsSamePassword(true);
    }
  };

  const onChangePasswordConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    onChange(e);

    if (!value.match(/^[a-zA-Z0-9]{8,}$/)) {
      setIsValidPasswordConfirm(false);
      return;
    }
    setIsValidPasswordConfirm(true);
    if (form.password !== value) {
      setIsSamePassword(false);
      return;
    }
    setIsSamePassword(true);
  };

  const onClickNextStep = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { email, password, passwordConfirm, nickname } = form;
    if (
      !email ||
      !email.trim() ||
      !password ||
      !password.trim() ||
      !passwordConfirm ||
      !passwordConfirm.trim() ||
      !nickname ||
      !nickname.trim()
    ) {
      alert('빈칸을 모두 입력해주세요.');
      return;
    }

    if (!isValidEmail) {
      alert('이메일 형식을 확인해주세요.(example@domain.com)');
      return;
    }
    if (!isSamePassword) {
      alert('비밀번호를 다시한번 확인해주세요.');
      return;
    }
    if (!isValidPassword || !isValidPasswordConfirm) {
      alert('비밀번호 형식을 확인해주세요.\n(8글자 이상 대소문자, 숫자 포함)');
      return;
    }

    if (!isValidNickname) {
      alert('닉네임 형식을 확인해주세요.\n(2~8글자 한글만)');
      return;
    }

    setIsDuplicatedEmail(false);
    setIsDuplicatedNickname(false);

    axiosPublic
      .get(
        encodeURI(
          `/api/member/check?nickname=${form.nickname}&email=${form.email}`
        )
      )
      .then((response) => {
        setIsDuplicatedEmail(false);
        setIsDuplicatedNickname(false);

        router.push('/keyword');
      })
      .catch((error) => {
        const {
          data: { errorType },
        } = error.response;
        if (errorType === errorTypes.E021) {
          setIsDuplicatedEmail(true);
        } else if (errorType === errorTypes.E020) {
          setIsDuplicatedNickname(true);
        }
      });
  };
  return (
    <>
      <form className='relative flex h-full flex-col p-6'>
        <label htmlFor='email' className='flex flex-col'>
          <span className='mb-2 font-bold text-mint-main'>이메일</span>
          <input
            id='email'
            type='email'
            name='email'
            required
            value={form.email}
            onChange={onChangeEmail}
            placeholder='이메일을 입력해 주세요.'
            className='rounded-md border border-light-gray px-4 py-3 text-sm'
          />
          <p className='mt-2 h-6 text-xs text-warning'>
            {isDuplicatedEmail && '이미 사용중인 이메일입니다.'}
          </p>
        </label>
        <label htmlFor='password' className='mb-5 flex flex-col'>
          <span className='mb-2 font-bold text-mint-main'>비밀번호</span>
          <input
            id='password'
            type='password'
            name='password'
            required
            value={form.password}
            onChange={onChangePassWord}
            placeholder='비밀번호를 입력해 주세요.'
            className='rounded-md border border-light-gray px-4 py-3 text-sm'
          />
          <input
            id='passwordConfirm'
            type='password'
            name='passwordConfirm'
            required
            value={form.passwordConfirm}
            onChange={onChangePasswordConfirm}
            placeholder='비밀번호를 확인해 주세요.'
            className='mt-2 rounded-md border border-light-gray px-4 py-3 text-sm'
          />
          <p className='mt-2 h-6 text-xs text-warning'>
            {!isSamePassword && '비밀번호가 일치하지 않습니다.'}
          </p>
        </label>
        <label htmlFor='nickname' className='flex flex-col'>
          <span className='mb-2 font-bold text-mint-main'>닉네임</span>
          <input
            id='nickname'
            type='text'
            name='nickname'
            required
            value={form.nickname}
            onChange={onChangeNickname}
            placeholder='최소 2글자에서 8글자로 입력해주세요.'
            className='rounded-md border border-light-gray px-4 py-3 text-sm'
          />
          <p className='mt-2 h-6 text-xs'>
            <span className='text-mint-main'>
              {isValidNickname &&
                !isDuplicatedNickname &&
                '사용가능한 닉네임입니다.'}
            </span>
            <span className='text-warning'>
              {isDuplicatedNickname && '이미 사용 중인 닉네임입니다.'}
            </span>
          </p>
        </label>
        <div className='flex flex-1 items-end'>
          <button
            type='submit'
            onClick={onClickNextStep}
            className='h-12 w-full rounded-md bg-black py-3 text-lg text-mint-main'
          >
            다음 단계
          </button>
        </div>
      </form>
    </>
  );
};

Signup.getLayout = function getLayout(page: ReactElement) {
  return <SignupLayout middleChild={<>회원가입</>}>{page}</SignupLayout>;
};
export default Signup;
