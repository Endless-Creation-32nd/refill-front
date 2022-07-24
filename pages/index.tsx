import dayjs from 'dayjs';
import Image from 'next/image';
import { ReactElement } from 'react';
import useSWR from 'swr';
import GroupItem from '../components/GroupItem';
import Header from '../components/header';
import HomeLayout from '../components/home-layout';
import { IGroup } from '../types/IGroup';
import { IGroupDetail } from '../types/IMyGroup';
import fetchData from '../utils/fetchData';
import Period from '../assets/group_period.svg';
import Avatar from 'react-avatar';

// const myGroupData: IGroupDetail = {
//   groupId: 10,
//   name: '오정진바보',
//   description: '바보오정진놀리는그룹입니다 수공',
//   penalty: true,
//   maxMember: 5,
//   adminId: 2,
//   perWeek: 5,
//   startTime: '2022-08-30T15:00:00',
//   endTime: '2022-09-01T15:00:00',
//   tagList: ['정진아', '밥은먹고', '개발하니'],
//   participationMembers: [
//     {
//       memberId: 2,
//       nickname: '테스터둘',
//       image: null,
//     },
//     {
//       memberId: 3,
//       nickname: '테스터둘',
//       image: 'http://www.kpipa.or.kr/upload/book/KP0062/1384146725763_4162.jpg',
//     },
//     {
//       memberId: 4,
//       nickname: '테스터둘',
//       image: 'http://www.kpipa.or.kr/upload/book/KP0062/1384146725763_4162.jpg',
//     },
//     {
//       memberId: 5,
//       nickname: '테스터둘',
//       image: null,
//     },
//     {
//       memberId: 6,
//       nickname: '테스터둘',
//       image: 'http://www.kpipa.or.kr/upload/book/KP0062/1384146725763_4162.jpg',
//     },
//   ],
//   createdAt: '2022-07-24T17:10:58.500799',
//   updatedAt: '2022-07-24T17:10:58.500799',
// };
const Home = () => {
  const { data: groupData } = useSWR<IGroup[]>(
    '/api/group/recommendation',
    fetchData
  );
  const { data: myGroupData } = useSWR<IGroupDetail>('/api/group', fetchData);

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
            안녕하세요 <span className='text-mint-main'>알로하</span>님,
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
        {myGroupData === null && (
          <div className='mb-4'>
            <h3 className='mb-2 text-xl font-semibold'>추천그룹</h3>
            <ul className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
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
        )}

        {myGroupData && (
          <dl>
            <dt className='mb-2 text-xl font-semibold'>내 그룹</dt>
            <div className='flex flex-col gap-4 rounded-lg border p-4'>
              <div className='flex'>
                <span className='flex-1 text-xl font-semibold'>
                  {myGroupData.name}
                </span>
                <dd className='flex justify-end -space-x-3'>
                  {myGroupData.participationMembers.map((member) => {
                    return (
                      <div
                        key={member.memberId}
                        className='relative h-8 w-8 rounded-full bg-light-gray'
                      >
                        {member.image === null ? (
                          <Avatar
                            name={member.nickname}
                            size='32'
                            round={true}
                          />
                        ) : (
                          <Image
                            src={member.image}
                            alt='member'
                            objectFit='cover'
                            layout='fill'
                            className='rounded-full'
                          />
                        )}
                      </div>
                    );
                  })}
                </dd>
              </div>
              <dd className='flex items-center gap-1'>
                <Period />
                <span className='text-middle-gray'>
                  {dayjs(myGroupData.startTime).format('YY.MM.DD')}-
                  {dayjs(myGroupData.endTime).format('YY.MM.DD')}
                </span>
              </dd>
              <dd className='flex items-center gap-1'>
                <Period />
                <span className='text-middle-gray'>
                  일주일 {myGroupData.perWeek}개 업로드
                </span>
              </dd>
              <button
                type='button'
                className='flex w-full justify-center rounded-lg bg-black py-2 font-semibold text-mint-main'
              >
                + 필사 올리기
              </button>
            </div>
          </dl>
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
