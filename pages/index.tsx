import dayjs from 'dayjs';
import Image from 'next/image';
import { ReactElement } from 'react';
import useSWR from 'swr';
import GroupItem from '../components/GroupItem';
import Header from '../components/header';
import HomeLayout from '../components/home-layout';
import { IGroup } from '../types/IGroup';
import { IMyGroup } from '../types/IMyGroup';
import fetchData from '../utils/fetchData';
import Period from '../assets/group_period.svg';

const myGroupData: IMyGroup = {
  groupId: 10,
  name: '오정진바보',
  description: '바보오정진놀리는그룹입니다 수공',
  penalty: true,
  maxMember: 5,
  adminId: 2,
  perWeek: 5,
  startTime: '2022-08-30T15:00:00',
  endTime: '2022-09-01T15:00:00',
  tagList: ['정진아', '밥은먹고', '개발하니'],
  participationMembers: [
    {
      memberId: 2,
      nickname: '테스터둘',
      image: null,
    },
  ],
  createdAt: '2022-07-24T17:10:58.500799',
  updatedAt: '2022-07-24T17:10:58.500799',
};
const Home = () => {
  const { data: groupData } = useSWR<IGroup[]>(
    '/api/group/recommendation',
    fetchData
  );
  // const { data: myGroupData } = useSWR<IMyGroup>('/api/group', fetchData);

  return (
    <div className='h-screen bg-black'>
      <div className='mx-6 pt-16 pb-8 text-white'>
        <h1 className='relative mb-4 h-10 w-32'>
          <Image
            src='/images/logo_white.png'
            alt='logo'
            objectFit='cover'
            layout='fill'
          />
        </h1>
        <div className='text-xl'>
          <p>
            안녕하세요 <span className='text-mint-main'>USER NAME</span>님,
          </p>
          <p>오늘도 필사해볼까요?</p>
        </div>
      </div>

      <div className='h-full max-h-min rounded-t-xl bg-white p-6'>
        <div className='mb-4'>
          <h3 className='mb-2 text-xl font-semibold'>오늘의 글감</h3>
          <div className='rounded-lg bg-[#efefef] p-4'>
            <h3 className='flex justify-between'>
              <span>터널을 지날 때</span>
              <span className='rounded-[4px] bg-mint-main px-2 py-1 text-xs text-white'>
                기타
              </span>
            </h3>
            <span className='text-xs text-middle-gray'>이동진</span>
          </div>
        </div>

        <div className='mb-4'>
          <h3 className='mb-2 text-xl font-semibold'>추천그룹</h3>
          <ul className='grid grid-cols-2 gap-3'>
            {groupData &&
              (groupData.length !== 0 ? (
                groupData.map((group) => {
                  return <GroupItem key={group.groupId} group={group} />;
                })
              ) : (
                <p>추천 그룹 없음</p>
              ))}
          </ul>
        </div>

        {myGroupData && (
          <div>
            <h3 className='mb-2 text-xl font-semibold'>내 그룹</h3>
            <div className='flex flex-col gap-4 rounded-lg border p-4'>
              <div className='flex'>
                <span className='flex-1 text-xl font-semibold'>
                  {myGroupData.name}
                </span>
                <ul>이미지들</ul>
              </div>
              <div className='flex items-center gap-1'>
                <Period />
                <span className='text-middle-gray'>
                  {dayjs(myGroupData.startTime).format('YY.MM.DD')}-
                  {dayjs(myGroupData.endTime).format('YY.MM.DD')}
                </span>
              </div>
              <div className='flex items-center gap-1'>
                <Period />
                <span className='text-middle-gray'>
                  일주일 {myGroupData.perWeek}개 업로드
                </span>
              </div>
              <button
                type='button'
                className='flex w-full justify-center rounded-lg bg-black py-2 font-semibold text-mint-main'
              >
                + 필사 올리기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <HomeLayout>
      <Header style={'bg-black'} />
      <main className='bg-gray-100'>
        <div className='common-layout bg-white'>{page}</div>
      </main>
    </HomeLayout>
  );
};

export default Home;
