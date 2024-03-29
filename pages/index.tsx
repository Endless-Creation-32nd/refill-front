import dayjs from 'dayjs';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { ReactElement } from 'react';
import useSWR from 'swr';
import fetchData from '../utils/fetchData';

import GroupItem from '../components/GroupItem';
import Header from '../components/header';
import HomeLayout from '../components/home-layout';
import CustomAvatar from '../components/CustomAvatar';

import { IGroup } from '../types/IGroup';

import Period from '../assets/group_period.svg';
import Notice from '../assets/home_notice.svg';
import Character from '../assets/character.svg';

const Home = () => {
  const { data: userData } = useSWR('/api/auth', fetchData);
  const { data: groupData, error } = useSWR<IGroup[]>(
    '/api/group/recommendation',
    fetchData
  );
  const { data: myGroupData } = useSWR<IGroup>('/api/group', fetchData);

  if (!userData) {
    return null;
  }

  return (
    <>
      <Head>
        <title>홈 - 환영합니다.</title>
      </Head>
      <div className='bg-black'>
        <div className='relative mx-6 flex items-end justify-between pt-16 pb-8'>
          <div className='text-white'>
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
                안녕하세요{' '}
                <span className='text-mint-main'>{userData.nickname}</span>님,
              </p>
              <p>오늘도 필사해볼까요?</p>
            </div>
          </div>
          <Character className='relative -bottom-6' width={78} height={139} />
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
          {!myGroupData && (
            <div className='mb-4'>
              <h3 className='mb-2 text-xl font-semibold'>추천그룹</h3>
              {groupData &&
                (groupData.length !== 0 ? (
                  <ul className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                    {groupData.map((group) => {
                      return <GroupItem key={group.groupId} group={group} />;
                    })}
                  </ul>
                ) : (
                  <p className='text-center'>
                    추천그룹을 조회하기 위한 그룹 수가 부족합니다.
                    <br />
                    <span className='italic'>그룹을 직접 생성해보세요!</span>
                  </p>
                ))}
            </div>
          )}

          {myGroupData && (
            <dl>
              <dt className='mb-2 text-xl font-semibold'>내 그룹</dt>
              <Link href={`/mygroup/${myGroupData.groupId}`}>
                <a>
                  <div className='flex flex-col gap-4 rounded-lg border p-4'>
                    <div className='flex'>
                      <span className='flex-1 text-xl font-semibold'>
                        {myGroupData.name}
                      </span>
                      <dd className='flex justify-end -space-x-3'>
                        {myGroupData.participationMembers
                          .slice(0, 4)
                          .map((member) => {
                            return (
                              <CustomAvatar
                                key={member.memberId}
                                image={member.image}
                                nickname={member.nickname}
                                width={'w-8'}
                                height={'h-8'}
                                size={'32'}
                              />
                            );
                          })}
                      </dd>
                    </div>
                    <dd className='flex items-center gap-1'>
                      <Period width={24} height={24} />
                      <span className='text-middle-gray'>
                        {dayjs(myGroupData.startTime).format('YYYY.MM.DD')} ~{' '}
                        {dayjs(myGroupData.endTime).format('YYYY.MM.DD')}
                      </span>
                    </dd>
                    <dd className='flex items-center gap-1'>
                      <Notice width={24} height={24} />
                      <span className='text-middle-gray'>
                        일주일 {myGroupData.perWeek}개 업로드
                      </span>
                    </dd>
                    <button className='flex w-full justify-center rounded-lg bg-black py-2 font-semibold text-mint-main'>
                      + 필사 올리기
                    </button>
                  </div>
                </a>
              </Link>
            </dl>
          )}
        </div>
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <HomeLayout>
      <Header style={'bg-black'} />
      <main className='main bg-white'>
        <div className='bg-white pt-16'>{page}</div>
      </main>
    </HomeLayout>
  );
};

export default Home;
