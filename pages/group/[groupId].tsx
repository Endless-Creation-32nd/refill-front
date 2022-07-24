import dayjs from 'dayjs';
import { ReactElement } from 'react';
import BackButton from '../../components/BackButton';
import GroupLayout from '../../components/group-layout';
import Header from '../../components/header';
import Person from '../../assets/group_person.svg';
import Count from '../../assets/group_count.svg';
import Period from '../../assets/group_period.svg';
import Warning from '../../assets/group_warn.svg';
import Image from 'next/image';

const profileUrl =
  'http://www.kpipa.or.kr/upload/book/KP0062/1384146696326_4110.jpg';

const GroupDetail = () => {
  return (
    <>
      <div className='bg-white p-6'>
        <h3 className='mb-4 text-xl font-semibold'>그룹이름글훕일흠</h3>
        <ul className='mb-2 flex flex-wrap gap-2'>
          <li className='rounded-[4px] bg-mint-main px-2 py-1 text-xs'>
            # {'문학'}
          </li>
          <li className='rounded-[4px] bg-mint-main px-2 py-1 text-xs'>
            # {'문학'}
          </li>
          <li className='rounded-[4px] bg-mint-main px-2 py-1 text-xs'>
            # {'문학'}
          </li>
        </ul>
        <p className='mb-2 rounded-md border border-light-gray py-4 px-[14px] text-sm'>
          아무말 아무ㅜ뭄말 아ㅏ무무말 얼른 자고 싶다아무말 아무ㅜ뭄말
          아ㅏ무무말 얼른 자고 싶다
        </p>
        <ul className='flex flex-wrap gap-2'>
          <li className='flex items-center gap-2'>
            <Person />
            <span className='text-xs text-middle-gray'>4/6명</span>
          </li>
          <li className='flex items-center gap-2'>
            <Count />
            <span className='text-xs text-middle-gray'>주 {2}회</span>
          </li>
          <li className='flex items-center gap-2'>
            <Period />
            <span className='text-xs text-middle-gray'>
              {dayjs('2022.5.1').format('YYYY.MM.DD')} -{' '}
              {dayjs('2022.5.1').format('YYYY.MM.DD')}
            </span>
          </li>
          <li className='flex items-center gap-2'>
            <Warning />
            <span className='text-xs text-middle-gray'>
              규칙에 따른 패널티가 존재
            </span>
          </li>
        </ul>
      </div>
      <div className='p-6'>
        <h3 className='mb-4 text-xl font-semibold'>함께 하고 있는 멤버</h3>
        <ul className='grid  grid-cols-3 gap-3'>
          <li className='flex flex-col items-center gap-2 rounded-lg border border-light-gray py-4 px-[14px] shadow-lg'>
            <div className='relative h-[61px] w-[61px]'>
              <div className='absolute -top-1 right-1/2 z-[1] translate-x-1/2 rounded-full bg-black py-[2px] px-1 text-[8px] text-mint-main'>
                방장
              </div>
              <Image
                src={profileUrl}
                alt='프로필'
                objectFit='cover'
                layout='fill'
                className='rounded-full'
              />
            </div>
            <span className='text-sm font-semibold'>프루아</span>
            <button className='rounded-[4px] bg-mint-main px-4 py-1 text-xs'>
              필사기록
            </button>
          </li>
          <li className='flex flex-col items-center gap-2 rounded-lg border border-light-gray py-4 px-[14px] shadow-lg'>
            <div className='relative h-[61px] w-[61px]'>
              <Image
                src={profileUrl}
                alt='프로필'
                objectFit='cover'
                layout='fill'
                className='rounded-full'
              />
            </div>
            <span className='text-sm font-semibold'>프루아</span>
            <button className='rounded-[4px] bg-mint-main px-4 py-1 text-xs'>
              필사기록
            </button>
          </li>
          <li className='flex flex-col items-center gap-2 rounded-lg border border-light-gray py-4 px-[14px] shadow-lg'>
            <div className='relative h-[61px] w-[61px]'>
              <Image
                src={profileUrl}
                alt='프로필'
                objectFit='cover'
                layout='fill'
                className='rounded-full'
              />
            </div>
            <span className='text-sm font-semibold'>프루아</span>
            <button className='rounded-[4px] bg-mint-main px-4 py-1 text-xs'>
              필사기록
            </button>
          </li>
          <li className='flex flex-col items-center gap-2 rounded-lg border border-light-gray py-4 px-[14px] shadow-lg'>
            <div className='relative h-[61px] w-[61px]'>
              <Image
                src={profileUrl}
                alt='프로필'
                objectFit='cover'
                layout='fill'
                className='rounded-full'
              />
            </div>
            <span className='text-sm font-semibold'>프루아</span>
            <button className='rounded-[4px] bg-mint-main px-4 py-1 text-xs'>
              필사기록
            </button>
          </li>
        </ul>
      </div>
      <span className='sticky inset-x-0 bottom-0 flex justify-center bg-black py-4 text-xl font-bold text-mint-main'>
        그룹 신청하기
      </span>
    </>
  );
};

GroupDetail.getLayout = function getLayout(page: ReactElement) {
  const middleChild = <h1 className='tab-middle-title'>그룹</h1>;

  return (
    <GroupLayout>
      <Header
        leftChild={<BackButton />}
        middleChild={middleChild}
        style={'bg-white'}
      />
      <main className='bg-gray-200'>
        <div className='common-layout bg-bgColor'>{page}</div>
      </main>
    </GroupLayout>
  );
};
export default GroupDetail;
