import { ReactElement, useContext } from 'react';
import SignupLayout from '../components/signup-layout';
import { SignupFormContext } from '../libs/SignupFormContext';
import type { SignupFormContextType } from '../libs/SignupFormContext';
import axios from 'axios';
import { errorTypes } from '../utils';
import { useRouter } from 'next/router';

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
  const context = useContext(SignupFormContext) as SignupFormContextType;
  const { form, setForm } = context;
  const router = useRouter();

  const onAddKeyword = (keyword: string) => {
    console.log(form.tagList, keyword);
    setForm((prev) => ({
      ...prev,
      tagList: prev.tagList.concat(keyword),
    }));
  };

  const onSubmit = () => {
    const { email, password, nickname, tagList } = form;
    if (tagList.length < 1 || tagList.length > 5) {
      alert('1개 이상 5개 이하의 키워드를 설정해주세요!');
      return;
    }

    axios
      .post('/api/member', { email, password, nickname, tagList })
      .then((response) => {
        if (response.status === 201) {
          setForm((prev) => ({
            ...prev,
            email: '',
            password: '',
            passwordConfirm: '',
            nickname: '',
            tagList: [],
          }));
          alert('가입을 축하합니다!');
          router.replace('/');
        }
      })
      .catch((error) => {
        const {
          data: { errorType },
        } = error.response;
        if (errorType === errorTypes.INVALID_INPUT) {
          alert('기존 입력값이 초기화 되었습니다.');
          setForm({ ...form, tagList: [] });
          router.replace('/signup');
        }
      });
  };
  return (
    <>
      <p>관심있는 키워드를 선택해주세요.</p>
      <ul className='flex flex-wrap'>
        {KEYWORD_LIST.map((keyword, index) => {
          return (
            <li key={index} className='cursor-pointer'>
              <button type='button' onClick={() => onAddKeyword(keyword)}>
                # {keyword}
              </button>
            </li>
          );
        })}
      </ul>
      <button onClick={onSubmit}>가입완료</button>
    </>
  );
};
Keyword.getLayout = function getLayout(page: ReactElement) {
  return <SignupLayout middleChild={<>관심정보</>}>{page}</SignupLayout>;
};
export default Keyword;
