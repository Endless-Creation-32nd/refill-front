import { useRouter } from 'next/router';
import { FormEvent, ReactElement, useState } from 'react';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import BackButton from '../components/BackButton';
import GroupLayout from '../components/group-layout';
import Header from '../components/header';
import Period from '../assets/group_period.svg';
import Head from 'next/head';
import axios from 'axios';
import { errorTypes } from '../utils';
import { axiosPrivate } from '../utils/axiosPrivate';

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

interface FormType {
  name: string;
  description: string;
  tagList: string[];
  maxMember: number;
  startTime: Date | null;
  endTime: Date | null;
  perWeek: number;
  penalty: boolean;
}
const MakeGroup = () => {
  const initialState = {
    name: '',
    description: '',
    tagList: [],
    maxMember: 2,
    startTime: new Date(),
    endTime: new Date(),
    perWeek: 1,
    penalty: false,
  };
  const [form, setForm] = useState<FormType>(initialState);
  const [selectedKeyword, setSelectedKeyword] = useState<{
    [key: string]: boolean;
  }>({});

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
  const onSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    axiosPrivate
      .post('/api/group', form)
      .then((response) => {
        if (response.status === 200) {
          router.replace('/group');
        }
      })
      .catch((error) => {
        const {
          data: { errorType },
        } = error.response;
        if (errorType === errorTypes.E024) {
          alert('2개 이상의 그룹을 만들 수 없습니다.');
          router.back();
        }
      });
  };
  const middleChild = <h1 className='tab-middle-title'>그룹 만들기</h1>;
  const rightChild = (
    <button
      type='submit'
      onClick={onSubmit}
      className='rounded-full bg-mint-main px-3 py-1 text-sm'
    >
      완료
    </button>
  );
  return (
    <>
      <Head>
        <title>그룹 만들기</title>
      </Head>
      <Header
        leftChild={<BackButton />}
        middleChild={middleChild}
        rightChild={rightChild}
        style={'bg-white'}
      />
      <main className='main bg-white'>
        <div className='bg-white pt-16'>
          <form className='flex flex-col gap-4 p-6'>
            <label htmlFor='group-name' className='w-full'>
              <span>그룹이름</span>
              <input
                type='text'
                name='name'
                id='group-name'
                placeholder='그룹이름을 입력해주세요.'
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                required
                minLength={2}
                maxLength={10}
                className='w-full rounded-lg border-[1px] py-2 px-3 text-sm'
              />
              <div className='flex justify-end text-sm text-[#666666]'>{`${form.name.length}/10`}</div>
            </label>

            <label htmlFor='description' className='w-full'>
              <span>그룹소개</span>
              <textarea
                name='description'
                id='description'
                placeholder='간단히 그룹을 소개해 주세요.'
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
                maxLength={48}
                className='w-full rounded-lg border-[1px] py-2 px-3 text-sm'
              ></textarea>
              <div className='flex justify-end text-sm text-[#666666]'>{`${form.description.length}/48`}</div>
            </label>

            <div>
              <span>목적</span>
              <ul className='flex flex-wrap gap-2'>
                {KEYWORD_LIST.map((keyword, index) => {
                  return (
                    <li
                      key={index}
                      className={`cursor-pointer rounded-md border py-1 px-3 text-sm ${
                        selectedKeyword[keyword]
                          ? 'border-black bg-black text-mint-main'
                          : 'border-light-gray bg-white text-light-gray'
                      }`}
                    >
                      <button
                        type='button'
                        onClick={() => onAddKeyword(keyword)}
                      >
                        # {keyword}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <label htmlFor='custom-input-number' className='w-full'>
              <span>최대인원</span>
              <div className='relative mt-1 flex h-10 w-full flex-row rounded-lg border-[1px] bg-transparent'>
                <button
                  type='button'
                  data-action='decrement'
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      maxMember: prev.maxMember - 1,
                    }))
                  }
                  className=' h-full w-20 cursor-pointer rounded-l outline-none hover:bg-gray-400 hover:text-gray-700'
                >
                  <span className='m-auto text-2xl font-thin'>-</span>
                </button>
                <input
                  type='number'
                  className='md:text-basecursor-default flex w-full items-center text-center text-sm font-semibold text-gray-700  outline-none hover:text-black focus:text-black focus:outline-none'
                  name='custom-input-number'
                  value={form.maxMember}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      maxMember: Number(e.target.value),
                    }))
                  }
                />
                <button
                  type='button'
                  data-action='increment'
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      maxMember: prev.maxMember + 1,
                    }))
                  }
                  className='h-full w-20 cursor-pointer rounded-r hover:bg-gray-400 hover:text-gray-700'
                >
                  <span className='m-auto text-2xl font-thin'>+</span>
                </button>
              </div>
            </label>

            <label htmlFor='perWeek' className='w-full'>
              <span>기간</span>
              <DatePicker
                selectsRange={true}
                startDate={form.startTime}
                endDate={form.endTime}
                onChange={(update) => {
                  setForm((prev) => ({
                    ...prev,
                    startTime: update[0],
                    endTime: update[1],
                  }));
                }}
                required
                renderCustomHeader={({
                  date,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div className='flex items-center justify-between px-2 py-2'>
                    <span className='text-sm text-gray-700'>
                      {dayjs(date).format('YYYY MMMM DD')}
                    </span>

                    <div className='space-x-2'>
                      <button
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                        type='button'
                        className={`${
                          prevMonthButtonDisabled &&
                          'cursor-not-allowed opacity-50'
                        } inline-flex rounded border border-gray-300 bg-white p-1 text-sm font-medium text-gray-700
                    shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0`}
                      >
                        {'<'}
                      </button>

                      <button
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                        type='button'
                        className={`${
                          nextMonthButtonDisabled &&
                          'cursor-not-allowed opacity-50'
                        } inline-flex rounded border border-gray-300 bg-white p-1 text-sm font-medium text-gray-700
                    shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0`}
                      >
                        {'>'}
                      </button>
                    </div>
                  </div>
                )}
              />
            </label>

            <label htmlFor='custom-input-number' className='w-full'>
              <span>한 주 필사 횟수</span>
              <div className='relative mt-1 flex h-10 w-full flex-row rounded-lg border-[1px] bg-transparent'>
                <button
                  type='button'
                  data-action='decrement'
                  onClick={() =>
                    setForm((prev) => ({ ...prev, perWeek: prev.perWeek - 1 }))
                  }
                  className=' h-full w-20 cursor-pointer rounded-l outline-none hover:bg-gray-400 hover:text-gray-700'
                >
                  <span className='m-auto text-2xl font-thin'>-</span>
                </button>
                <input
                  type='number'
                  className='md:text-basecursor-default flex w-full items-center text-center text-sm font-semibold text-gray-700  outline-none hover:text-black focus:text-black focus:outline-none'
                  name='custom-input-number'
                  value={form.perWeek}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      perWeek: Number(e.target.value),
                    }))
                  }
                />
                <button
                  type='button'
                  data-action='increment'
                  onClick={() =>
                    setForm((prev) => ({ ...prev, perWeek: prev.perWeek + 1 }))
                  }
                  className='h-full w-20 cursor-pointer rounded-r hover:bg-gray-400 hover:text-gray-700'
                >
                  <span className='m-auto text-2xl font-thin'>+</span>
                </button>
              </div>
            </label>

            <div>
              <span>패널티</span>
              <div className='flex gap-2'>
                <button
                  type='button'
                  onClick={(e) =>
                    setForm((prev) => ({ ...prev, penalty: true }))
                  }
                  className={`flex-1 rounded-lg border border-light-gray py-1 ${
                    form.penalty ? 'bg-gray-200' : 'bg-white'
                  }`}
                >
                  O
                </button>
                <button
                  type='button'
                  onClick={(e) =>
                    setForm((prev) => ({ ...prev, penalty: false }))
                  }
                  className={`flex-1 rounded-lg border border-light-gray py-1 ${
                    !form.penalty ? 'bg-gray-200' : 'bg-white'
                  }`}
                >
                  X
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

MakeGroup.getLayout = function getLayout(page: ReactElement) {
  return <GroupLayout>{page}</GroupLayout>;
};
export default MakeGroup;
