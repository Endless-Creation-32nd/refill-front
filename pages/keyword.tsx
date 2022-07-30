import { ReactElement, useContext, useState } from 'react';
import SignupLayout from '../components/signup-layout';
import { SignupFormContext } from '../libs/SignupFormContext';
import type { SignupFormContextType } from '../libs/SignupFormContext';
import axios from 'axios';
import { errorTypes } from '../utils';
import { useRouter } from 'next/router';
import { axiosPublic } from '../utils/axiosPublic';

const KEYWORD_LIST = [
  '문학',
  '취준',
  '취미',
  '소설',
  '시',
  '수필',
  '영어공부',
  '시사뉴스',
  '칼럼',
];

const Keyword = () => {
  const [selectedKeyword, setSelectedKeyword] = useState<{
    [key: string]: boolean;
  }>({});
  const context = useContext(SignupFormContext) as SignupFormContextType;
  const { form, setForm } = context;
  const router = useRouter();

  const onAddKeyword = (keyword: string) => {
    const { tagList } = form;
    if (
      (!(keyword in selectedKeyword) || !selectedKeyword[keyword]) &&
      tagList.length >= 5
    ) {
      alert('1개 이상 5개 이하의 키워드를 설정해주세요!');
      return;
    }

    if (!(keyword in selectedKeyword)) {
      setSelectedKeyword((prev) => ({
        ...prev,
        [keyword]: true,
      }));
      setForm((prev) => ({
        ...prev,
        tagList: prev.tagList.concat(keyword),
      }));
    } else {
      if (selectedKeyword[keyword]) {
        setSelectedKeyword((prev) => ({
          ...prev,
          [keyword]: false,
        }));
        setForm((prev) => ({
          ...prev,
          tagList: prev.tagList.filter((tag) => tag !== keyword),
        }));
      } else {
        setSelectedKeyword((prev) => ({
          ...prev,
          [keyword]: true,
        }));
        setForm((prev) => ({
          ...prev,
          tagList: prev.tagList.concat(keyword),
        }));
      }
    }
  };

  const onSubmit = () => {
    const { email, password, nickname, tagList } = form;
    if (
      !email ||
      !email.trim() ||
      !password ||
      !password.trim() ||
      !nickname ||
      !nickname.trim()
    ) {
      alert('기존 입력값을 다시 입력해주세요.');
      setForm({ ...form, tagList: [] });
      router.replace('/signup');
      return;
    }

    if (tagList.length < 1 || tagList.length > 5) {
      alert('1개 이상 5개 이하의 키워드를 설정해주세요!');
      return;
    }

    axiosPublic
      .post('/api/member', { email, password, nickname, tagList })
      .then((response) => {
        if (response.status === 201) {
          alert('가입을 축하합니다!');

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
                  passwordConfirm: '',
                  nickname: '',
                  tagList: [],
                }));
                router.replace('/');
              }
            });
        }
      })
      .catch((error) => {
        const {
          data: { errorType },
        } = error.response;
        if (errorType === errorTypes.E021) {
          alert('이미 사용중인 이메일입니다.');
          router.replace('/signup');
        } else if (errorType === errorTypes.E020) {
          alert('이미 사용중인 닉네임입니다.');
          router.replace('/signup');
        }
      });
  };
  return (
    <div className='flex h-full w-full flex-col p-6'>
      <p className='mb-12 text-xl'>
        관심있는 <span className='text-mint-main'>키워드</span>를 선택해주세요.
      </p>
      <ul className='flex flex-wrap gap-3'>
        {KEYWORD_LIST.map((keyword, index) => {
          return (
            <li
              key={index}
              className={`cursor-pointer rounded-md border py-1 px-3 text-xl ${
                selectedKeyword[keyword]
                  ? 'border-black bg-black text-mint-main'
                  : 'border-light-gray bg-white text-light-gray'
              }`}
            >
              <button type='button' onClick={() => onAddKeyword(keyword)}>
                # {keyword}
              </button>
            </li>
          );
        })}
      </ul>
      <div className='flex flex-1 items-end'>
        <button
          onClick={onSubmit}
          className='h-12 w-full rounded-md bg-black py-3 text-lg text-mint-main'
        >
          가입완료
        </button>
      </div>
    </div>
  );
};
Keyword.getLayout = function getLayout(page: ReactElement) {
  return <SignupLayout middleChild={<>관심정보</>}>{page}</SignupLayout>;
};
export default Keyword;
