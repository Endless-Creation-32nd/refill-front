import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/layout';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import BackButton from '../components/BackButton';

interface FormType {
  groupName: string;
  introduction: string;
  tagList: string[];
  maxMember: number;
  dateRange: (Date | null)[];
  perWeek: number;
  penalty: boolean;
}
const MakeGroup = () => {
  const initialState = {
    groupName: '',
    introduction: '',
    tagList: [],
    maxMember: 2,
    dateRange: [new Date(), new Date()],
    perWeek: 1,
    penalty: false,
  };
  const [form, setForm] = useState<FormType>(initialState);
  const [startDate, endDate] = form.dateRange;

  const router = useRouter();

  // const onSubmit = (e) => {
  //   e.preventDefault();
  // };

  const goBack = () => {
    router.back();
  };
  const middleChild = <h2 className='text-xl font-bold'>그룹 만들기</h2>;
  const rightChild = (
    <button
      onClick={() => console.log('compoleted')}
      className='rounded-full bg-mint-main px-3 py-1'
    >
      완료
    </button>
  );
  return (
    <Layout
      leftChild={<BackButton />}
      middleChild={middleChild}
      rightChild={rightChild}
      hasNav={false}
    >
      <form className='flex flex-col'>
        <div className='relative'>
          <label htmlFor='group-name' className='w-full'>
            그룹이름
          </label>
          <input
            type='text'
            name='groupName'
            id='group-name'
            placeholder='그룹이름을 입력해주세요.'
            value={form.groupName}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, groupName: e.target.value }))
            }
            required
            minLength={2}
            maxLength={10}
            className='w-full rounded-lg border-[1px] py-2 px-3'
          />
          <div className='flex justify-end text-sm text-[#666666]'>{`${form.groupName.length}/10`}</div>
        </div>

        <div>
          <label htmlFor='introduction' className='w-full'>
            그룹소개
          </label>
          <textarea
            name='introduction'
            id='introduction'
            placeholder='간단히 그룹을 소개해 주세요.'
            value={form.introduction}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, introduction: e.target.value }))
            }
            maxLength={48}
            className='w-full rounded-lg border-[1px] py-2 px-3'
          ></textarea>
          <div className='flex justify-end text-sm text-[#666666]'>{`${form.introduction.length}/48`}</div>
        </div>

        <div className=''>
          <label htmlFor='custom-input-number' className='w-full'>
            최대인원
          </label>
          <div className='relative mt-1 flex h-10 w-full flex-row rounded-lg border-[1px] bg-transparent'>
            <button
              data-action='decrement'
              className=' h-full w-20 cursor-pointer rounded-l outline-none hover:bg-gray-400 hover:text-gray-700'
            >
              <span className='m-auto text-2xl font-thin'>−</span>
            </button>
            <input
              type='number'
              className='text-md md:text-basecursor-default flex w-full items-center text-center font-semibold text-gray-700  outline-none hover:text-black focus:text-black focus:outline-none'
              name='custom-input-number'
              value='0'
            ></input>
            <button
              data-action='increment'
              className='h-full w-20 cursor-pointer rounded-r hover:bg-gray-400 hover:text-gray-700'
            >
              <span className='m-auto text-2xl font-thin'>+</span>
            </button>
          </div>
        </div>

        <div>
          <label htmlFor='perWeek' className='w-full'>
            한 주 필사 횟수
          </label>
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setForm((prev) => ({ ...prev, dateRange: update }));
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
                <span className='text-lg text-gray-700'>
                  {dayjs(date).format('YYYY MMMM DD')}
                </span>

                <div className='space-x-2'>
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                    type='button'
                    className={`
                                            ${
                                              prevMonthButtonDisabled &&
                                              'cursor-not-allowed opacity-50'
                                            }
                                            inline-flex rounded border border-gray-300 bg-white p-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0
                                        `}
                  >
                    {'<'}
                  </button>

                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                    type='button'
                    className={`
                                            ${
                                              nextMonthButtonDisabled &&
                                              'cursor-not-allowed opacity-50'
                                            }
                                            inline-flex rounded border border-gray-300 bg-white p-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0
                                        `}
                  >
                    {'>'}
                  </button>
                </div>
              </div>
            )}
          />
        </div>
      </form>
    </Layout>
  );
};
export default MakeGroup;
